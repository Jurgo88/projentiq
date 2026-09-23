// Generuje favicon sadu z public/logo.png.
// Spustenie: node scripts/generate-favicons.mjs
//
// Značka v origináli zaberá len ~55 % plochy odznaku, takže na 16 px by
// z nej ostalo 9 px a „P“ by splynulo. Preto ju vyrežeme podľa skutočného
// rozsahu modrej a posadíme na kruh s výrazne menším okrajom — odznakový
// charakter loga zostáva, ale značka je čitateľná aj v lište prehliadača.

import { writeFileSync } from 'node:fs'
import sharp from 'sharp'

const SRC = 'public/logo.png'
const BADGE = '#00020e'   // farba kruhu v origináli
const FILL = 0.78         // podiel plochy, ktorý zaberie značka
const ICO_SIZES = [16, 32, 48]

// rozsah modrej značky v origináli — hľadáme za behu, aby script prežil
// výmenu loga za novú verziu
async function markBounds() {
  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H, channels: C } = info
  let x0 = W, y0 = H, x1 = -1, y1 = -1
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * C
      const r = data[i], b = data[i + 2]
      if (b > 90 && b - r > 40) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
    }
  }
  if (x1 < 0) throw new Error(`v ${SRC} sa nenašla modrá značka`)
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }
}

const bounds = await markBounds()
const mark = await sharp(SRC).extract(bounds).png().toBuffer()

// značka vycentrovaná na kruhu; rohy priehľadné, aby ikona nevyzerala
// ako čierny štvorec na svetlom paneli prehliadača
async function icon(size, { transparent = true } = {}) {
  const inner = Math.round(size * FILL)
  const scaled = await sharp(mark)
    .resize(inner, inner, { fit: 'inside', kernel: 'lanczos3' })
    .toBuffer()

  const circle = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${BADGE}"/></svg>`
  )

  const base = sharp({
    create: { width: size, height: size, channels: 4, background: transparent ? { r: 0, g: 0, b: 0, alpha: 0 } : BADGE }
  }).composite([
    ...(transparent ? [{ input: circle }] : []),
    { input: scaled, gravity: 'center' }
  ])

  return (transparent ? base : base.flatten({ background: BADGE }).removeAlpha()).png({ compressionLevel: 9 }).toBuffer()
}

// ICO kontajner s PNG dlaždicami (podporujú všetky moderné prehliadače)
function ico(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2) // typ 1 = ikona
  header.writeUInt16LE(images.length, 4)

  let offset = 6 + images.length * 16
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(size === 256 ? 0 : size, 0)
    e.writeUInt8(size === 256 ? 0 : size, 1)
    e.writeUInt16LE(1, 4)   // roviny
    e.writeUInt16LE(32, 6)  // bitov na pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)])
}

const meta = await sharp(SRC).metadata()
if (meta.width !== meta.height) throw new Error(`${SRC} musí byť štvorec, je ${meta.width}x${meta.height}`)
console.log(`značka v origináli: ${bounds.width}x${bounds.height} na pozícii ${bounds.left},${bounds.top}`)

const tiles = await Promise.all(ICO_SIZES.map(async (size) => ({ size, data: await icon(size) })))
writeFileSync('public/favicon.ico', ico(tiles))
console.log(`public/favicon.ico            ${ICO_SIZES.join(', ')} px`)

writeFileSync('public/favicon-96x96.png', await icon(96))
console.log('public/favicon-96x96.png      96 px')

// Apple si rohy zaobľuje sám a priehľadnosť skladá na bielu
writeFileSync('public/apple-touch-icon.png', await icon(180, { transparent: false }))
console.log('public/apple-touch-icon.png   180 px, nepriehľadné')
