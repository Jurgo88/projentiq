// Generuje titulné obrázky blogu (1200×630 PNG) z poľa `cover` v
// app/content/blog/<slug>.ts. Vzhľad zodpovedá ručne robeným obrázkom:
// logo, štítok, karta s otázkou, veľký nadpis s akcentom a pätička.
//
// Spustenie:
//   node scripts/generate-blog-covers.mjs              # chýbajúce obrázky
//   node scripts/generate-blog-covers.mjs <slug> ...   # len vybrané články
//   node scripts/generate-blog-covers.mjs --force      # prepíše existujúce
//   node scripts/generate-blog-covers.mjs --out <dir>  # náhľad mimo public/
//
// Súbory článkov sú TypeScript — Node (>= 23.6) z nich typy odstráni sám.

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import satori from 'satori'
import sharp from 'sharp'
import { C, FONT_SUBSETS, h, loadFonts, loadPosts } from './blog-graphics.mjs'

const WIDTH = 1200
const HEIGHT = 630

// Dlhší text sa do 1200×630 nezmestí (satori by ho vykreslil cez okraj),
// preto radšej chyba s jasnou správou.
const LIMITS = {
  tag: (c) => c.tag,
  'card.label': (c) => c.card.label,
  'card.text': (c) => c.card.text,
  'headline + highlight': (c) => c.headline + (c.highlight ?? ''),
  footnote: (c) => c.footnote ?? ''
}
const MAX_LENGTH = { tag: 20, 'card.label': 40, 'card.text': 70, 'headline + highlight': 95, footnote: 60 }

function validateCover(slug, cover) {
  const errors = Object.entries(LIMITS)
    .map(([field, get]) => [field, get(cover).length])
    .filter(([field, length]) => length > MAX_LENGTH[field])
    .map(([field, length]) => `${field}: ${length} znakov (max. ${MAX_LENGTH[field]})`)
  if (errors.length) throw new Error(`${slug}: príliš dlhý text obrázka\n  ${errors.join('\n  ')}`)
}

function headlineSize(cover) {
  const length = cover.headline.length + (cover.highlight?.length ?? 0)
  if (length > 90) return 42
  if (length > 60) return 48
  return 54
}

function coverTree(cover) {
  const size = headlineSize(cover)
  const headlineStyle = { fontSize: size, fontWeight: 700, lineHeight: 1.16, letterSpacing: -1 }

  // padding na vnútornom bloku — na koreni by sa pripočítal k 1200×630
  return h(
    'div',
    { width: WIDTH, height: HEIGHT, display: 'flex' },
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: '56px 72px 60px',
        fontFamily: Object.values(FONT_SUBSETS).join(', '),
        color: C.text,
        backgroundColor: C.bg,
        backgroundImage:
          'radial-gradient(circle at 75% 0%, rgba(91, 140, 255, 0.16), transparent 55%), radial-gradient(circle at 100% 100%, rgba(122, 85, 230, 0.10), transparent 45%)'
      },
      // logo + štítok
      h(
        'div',
        { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
        h(
          'div',
          { display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: -0.5 },
          h('span', {}, 'Projent'),
          h('span', { color: C.accent }, 'IQ')
        ),
        h(
          'div',
          {
            display: 'flex',
            padding: '10px 18px',
            borderRadius: 999,
            border: `1.5px solid ${C.accentBorder}`,
            backgroundColor: 'rgba(91, 140, 255, 0.06)',
            color: C.accentText,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2.5,
            textTransform: 'uppercase'
          },
          cover.tag
        )
      ),
      // karta
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          width: 880,
          marginTop: 44,
          padding: '30px 36px 34px',
          borderRadius: 20,
          border: `1px solid ${C.border}`,
          backgroundColor: C.surface
        },
        h(
          'div',
          { display: 'flex', alignItems: 'center' },
          h(
            'div',
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 36,
              height: 36,
              padding: '0 8px',
              marginRight: 14,
              borderRadius: 8,
              border: `1px solid ${C.accentBorder}`,
              backgroundColor: C.accentSoft,
              color: C.accentText,
              fontSize: 14,
              fontWeight: 700
            },
            cover.card.badge
          ),
          h('div', { display: 'flex', color: C.muted, fontSize: 18, fontWeight: 500 }, cover.card.label)
        ),
        h(
          'div',
          { display: 'flex', marginTop: 18, fontSize: 32, fontWeight: 700, lineHeight: 1.25, letterSpacing: -0.5 },
          cover.card.text
        )
      ),
      // nadpis
      h(
        'div',
        { display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, paddingTop: 8 },
        h('div', { display: 'flex', ...headlineStyle }, cover.headline),
        cover.highlight &&
          h(
            'div',
            {
              display: 'flex',
              ...headlineStyle,
              backgroundImage: C.gradientText,
              backgroundClip: 'text',
              color: 'transparent'
            },
            cover.highlight
          )
      ),
      // pätička
      h(
        'div',
        { display: 'flex', justifyContent: 'space-between', color: C.muted, fontSize: 18 },
        h('div', { display: 'flex' }, cover.footnote ?? ''),
        h('div', { display: 'flex' }, 'projentiq.com')
      )
    )
  )
}

async function main() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const outIndex = args.indexOf('--out')
  const outDir = outIndex >= 0 ? args[outIndex + 1] : null
  const slugs = args.filter((a, i) => !a.startsWith('--') && i !== outIndex + 1)

  const posts = (await loadPosts()).filter((p) => p.cover && (!slugs.length || slugs.includes(p.slug)))
  if (slugs.length) {
    const missing = slugs.filter((s) => !posts.some((p) => p.slug === s))
    if (missing.length) throw new Error(`Bez článku alebo bez \`cover\`: ${missing.join(', ')}`)
  }

  const fonts = loadFonts()
  let written = 0
  for (const post of posts) {
    const image = post.image ?? `/blog/${post.slug}.png`
    const target = outDir ? join(outDir, `${post.slug}.png`) : join('public', image)
    if (!outDir && existsSync(target) && !force) continue

    validateCover(post.slug, post.cover)
    const svg = await satori(coverTree(post.cover), { width: WIDTH, height: HEIGHT, fonts })
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer())
    console.log(`✔ ${target}`)
    written++
  }
  if (!written) console.log('Nič na generovanie (obrázky existujú — použi --force).')
}

main().catch((err) => {
  console.error(err.message ?? err)
  process.exit(1)
})
