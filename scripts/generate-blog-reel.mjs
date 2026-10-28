// Generuje textový reel na Instagram a Facebook (1080×1920 MP4, 30 fps) z poľa
// `reel` v app/content/blog/<slug>.ts. Vzhľad nadväzuje na titulné obrázky:
// rovnaké farby, písmo aj logo. Video je bez zvuku, hudba sa pridáva pri
// zverejnení priamo v aplikácii.
//
// Spustenie:
//   node scripts/generate-blog-reel.mjs <slug>                 # social/reels/<slug>.mp4
//   node scripts/generate-blog-reel.mjs <slug> --still 2,7,25  # PNG snímky v daných sekundách
//
// Potrebuje ffmpeg v PATH alebo cestu k nemu v premennej FFMPEG_PATH
// (Windows: winget install Gyan.FFmpeg).

import { spawn, spawnSync } from 'node:child_process'
import { once } from 'node:events'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import satori from 'satori'
import sharp from 'sharp'
import { C, FONT_SUBSETS, h, loadFonts, loadPosts } from './blog-graphics.mjs'

const OUT_DIR = 'social/reels'
const WIDTH = 1080
const HEIGHT = 1920
const FPS = 30
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg'
const BLOG_URL = 'projentiq.com/sk/blog'

// Okraje, ktoré v aplikácii prekrýva rozhranie (hlavička, tlačidlá vpravo,
// popis dole). Text ostáva vnútri.
const SAFE = { top: 250, right: 150, bottom: 420, left: 90 }
const CONTENT_WIDTH = WIDTH - SAFE.left - SAFE.right

// Časovanie v sekundách: nábeh prvku a odchod záberu. Záber trvá podľa
// množstva textu (CHARS_PER_SECOND), v medziach SCENE_MIN až SCENE_MAX.
const ENTER = 0.55
const EXIT = 0.35
const CHARS_PER_SECOND = 24
const SCENE_MIN = 2.8
const SCENE_MAX = 8

// Dlhší text sa na výšku nezmestí alebo sa nestihne prečítať.
const MAX_LENGTH = { hook: 60, text: 90, highlight: 90, stepsTitle: 30, step: 55, cta: 70 }

function validateReel(slug, reel) {
  const fields = [
    ['hook', reel.hook, MAX_LENGTH.hook],
    ...reel.scenes.flatMap((s, i) => [
      [`scenes[${i}].text`, s.text, MAX_LENGTH.text],
      [`scenes[${i}].highlight`, s.highlight ?? '', MAX_LENGTH.highlight]
    ]),
    ['steps.title', reel.steps?.title ?? '', MAX_LENGTH.stepsTitle],
    ...(reel.steps?.items ?? []).map((item, i) => [`steps.items[${i}]`, item, MAX_LENGTH.step]),
    ['cta', reel.cta, MAX_LENGTH.cta]
  ]
  const errors = fields
    .filter(([, text, max]) => text.length > max)
    .map(([field, text, max]) => `${field}: ${text.length} znakov (max. ${max})`)
  if ((reel.steps?.items.length ?? 0) > 3) errors.push(`steps.items: najviac 3 kroky (je ich ${reel.steps.items.length})`)
  if (errors.length) throw new Error(`${slug}: príliš dlhý text reelu\n  ${errors.join('\n  ')}`)
}

const clamp01 = (x) => Math.min(1, Math.max(0, x))
const easeOut = (x) => 1 - (1 - x) ** 3
const round = (x) => Math.round(x * 100) / 100

// číslo s bodkou („21. októbra“) a jednopísmenové predložky a spojky nesmú
// ostať na konci riadka
const typo = (text) =>
  text.replace(/(?<=^|\s)([AaIiKkOoSsUuVvZz])\s/g, '$1 ').replace(/(\d\.)\s/g, '$1 ')

const eyebrow = { fontSize: 30, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.accentText }
const big = (fontSize) => ({ fontSize, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.5 })
const gradient = { backgroundImage: C.gradientText, backgroundClip: 'text', color: 'transparent' }
const block = (content, style) => h('div', { display: 'flex', ...style }, typo(content))

function stepRow(n, content) {
  return h(
    'div',
    { display: 'flex', alignItems: 'flex-start' },
    h(
      'div',
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 76,
        height: 76,
        marginRight: 28,
        borderRadius: 18,
        border: `2px solid ${C.accentBorder}`,
        backgroundColor: C.accentSoft,
        color: C.accentText,
        fontSize: 36,
        fontWeight: 700
      },
      String(n)
    ),
    // odznak 76 px + rámik 2 × 2 px (satori ho pripočíta k šírke) + medzera 28 px
    block(content, { width: CONTENT_WIDTH - 108, paddingTop: 6, fontSize: 50, fontWeight: 500, lineHeight: 1.28 })
  )
}

// Záber = prvky, ktoré postupne nabehnú (`at` = sekunda od začiatku záberu).
function buildScenes({ cover: { sk: cover }, reel }) {
  const duration = (chars, extra = 0) =>
    Math.min(SCENE_MAX, Math.max(SCENE_MIN, 1.2 + chars / CHARS_PER_SECOND + extra))

  const scenes = [
    {
      duration: duration(reel.hook.length),
      elements: [
        { at: 0.15, node: block(cover.card.label, eyebrow) },
        { at: 0.35, node: block(reel.hook, big(104)), style: { marginTop: 36 } }
      ]
    },
    ...reel.scenes.map(({ text, highlight }) => ({
      duration: duration(text.length + (highlight?.length ?? 0)),
      elements: [
        { at: 0.1, node: block(text, big(80)) },
        // pointa nabehne, až keď divák stihne prečítať úvod
        highlight && {
          at: 0.1 + Math.min(1.6, text.length / 35),
          node: block(highlight, { ...big(66), ...gradient }),
          style: { marginTop: 48 }
        }
      ].filter(Boolean)
    }))
  ]

  if (reel.steps) {
    const { title, items } = reel.steps
    scenes.push({
      duration: duration(title.length + items.join('').length, items.length * 0.4),
      elements: [
        { at: 0.1, node: block(title, eyebrow) },
        ...items.map((item, i) => ({ at: 0.5 + i * 0.9, node: stepRow(i + 1, item), style: { marginTop: i ? 34 : 44 } }))
      ]
    })
  }

  scenes.push({
    duration: duration(reel.cta.length + BLOG_URL.length, 1),
    last: true,
    elements: [
      { at: 0.1, node: block(reel.cta, big(72)) },
      { at: 0.8, node: block(BLOG_URL, { ...big(62), ...gradient }), style: { marginTop: 48 } }
    ]
  })

  let start = 0
  for (const scene of scenes) {
    scene.start = start
    start += scene.duration
  }
  return scenes
}

// pomaly sa posúvajúca žiara, aby pozadie nebolo úplne statické
function background(t) {
  const x = round(68 + 14 * Math.sin(t / 4))
  const y = round(6 + 5 * Math.cos(t / 3))
  return (
    `radial-gradient(circle at ${x}% ${y}%, rgba(91, 140, 255, 0.2), transparent 50%), ` +
    `radial-gradient(circle at ${round(100 - x / 4)}% 100%, rgba(122, 85, 230, 0.13), transparent 45%)`
  )
}

function header(tag, t) {
  return h(
    'div',
    { display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: round(easeOut(clamp01(t / ENTER))) },
    h(
      'div',
      { display: 'flex', fontSize: 48, fontWeight: 700, letterSpacing: -0.5 },
      h('span', {}, 'Projent'),
      h('span', { color: C.accent }, 'IQ')
    ),
    h(
      'div',
      {
        display: 'flex',
        padding: '12px 24px',
        borderRadius: 999,
        border: `2px solid ${C.accentBorder}`,
        backgroundColor: 'rgba(91, 140, 255, 0.06)',
        color: C.accentText,
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: 3,
        textTransform: 'uppercase'
      },
      tag
    )
  )
}

// nábeh zospodu a zo stratena, odchod mierne nahor (posledný záber ostáva)
function animate(element, local, scene) {
  const enter = easeOut(clamp01((local - element.at) / ENTER))
  const exit = scene.last ? 0 : clamp01((local - scene.duration + EXIT) / EXIT) ** 2
  return h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      ...element.style,
      opacity: round(enter * (1 - exit)),
      transform: `translateY(${round((1 - enter) * 48 - exit * 32)}px)`
    },
    element.node
  )
}

function frameTree(post, scenes, t) {
  const scene = scenes.find((s) => t < s.start + s.duration) ?? scenes.at(-1)
  return h(
    'div',
    { width: WIDTH, height: HEIGHT, display: 'flex' },
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: `${SAFE.top}px ${SAFE.right}px ${SAFE.bottom}px ${SAFE.left}px`,
        fontFamily: Object.values(FONT_SUBSETS).join(', '),
        color: C.text,
        backgroundColor: C.bg,
        backgroundImage: background(t)
      },
      header(post.cover.sk.tag, t),
      h(
        'div',
        { display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 },
        scene.elements.map((element) => animate(element, t - scene.start, scene))
      )
    )
  )
}

async function main() {
  const args = process.argv.slice(2)
  const stillIndex = args.indexOf('--still')
  const stills = stillIndex >= 0 ? args[stillIndex + 1].split(',').map(Number) : null
  const slug = args.find((a, i) => !a.startsWith('--') && (stillIndex < 0 || i !== stillIndex + 1))
  if (!slug) throw new Error('Použitie: node scripts/generate-blog-reel.mjs <slug> [--still 2,7,25]')

  const post = (await loadPosts()).find((p) => p.slug === slug)
  if (!post?.reel || !post.cover) throw new Error(`${slug}: článok neexistuje alebo nemá \`reel\` a \`cover\``)
  validateReel(slug, post.reel)

  const scenes = buildScenes(post)
  const total = scenes.at(-1).start + scenes.at(-1).duration
  const fonts = loadFonts()
  const render = async (t) =>
    sharp(Buffer.from(await satori(frameTree(post, scenes, t), { width: WIDTH, height: HEIGHT, fonts })))
  mkdirSync(OUT_DIR, { recursive: true })

  if (stills) {
    for (const t of stills) {
      const target = join(OUT_DIR, `${slug}-${t}s.png`)
      writeFileSync(target, await (await render(t)).png().toBuffer())
      console.log(`✔ ${target}`)
    }
    return
  }

  if (spawnSync(FFMPEG, ['-version']).error) {
    throw new Error('ffmpeg sa nenašiel. Nainštaluj ho (Windows: winget install Gyan.FFmpeg) alebo nastav FFMPEG_PATH.')
  }
  const target = join(OUT_DIR, `${slug}.mp4`)
  // Surové RGB snímky idú do ffmpeg cez stdin. H.264 v yuv420p prehrá každý
  // telefón; jemný šum a aq-mode=3 tlmia pásy v tmavom prechode pozadia, ktoré
  // by Instagram pri ďalšej kompresii ešte zvýraznil.
  const ffmpeg = spawn(
    FFMPEG,
    [
      '-y', '-loglevel', 'error',
      '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', `${WIDTH}x${HEIGHT}`, '-r', String(FPS), '-i', '-',
      '-vf', 'noise=alls=3:allf=t+u,format=yuv420p',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-tune', 'film', '-x264-params', 'aq-mode=3',
      '-movflags', '+faststart',
      target
    ],
    { stdio: ['pipe', 'inherit', 'inherit'] }
  )
  const closed = once(ffmpeg, 'close')

  const frames = Math.round(total * FPS)
  for (let f = 0; f < frames; f++) {
    const rgb = await (await render(f / FPS)).removeAlpha().raw().toBuffer()
    if (!ffmpeg.stdin.write(rgb)) await once(ffmpeg.stdin, 'drain')
    if (f % (FPS * 5) === 0) console.log(`  ${Math.round(f / FPS)} / ${Math.round(total)} s`)
  }
  ffmpeg.stdin.end()
  const [code] = await closed
  if (code !== 0) throw new Error(`ffmpeg skončil s kódom ${code}`)
  console.log(`✔ ${target} (${total.toFixed(1)} s)`)
}

main().catch((err) => {
  console.error(err.message ?? err)
  process.exit(1)
})
