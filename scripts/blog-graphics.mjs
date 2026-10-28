// Spoločný základ generátorov grafiky blogu (titulné obrázky aj reels):
// farby webu, písmo, pomocník na stromy pre satori a načítanie článkov.

import { readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const POSTS_DIR = 'app/content/blog'

export const C = {
  bg: '#07070b',
  surface: 'rgba(20, 20, 31, 0.78)',
  border: '#20202e',
  text: '#f4f4f7',
  muted: '#9a9aa8',
  accent: '#5b8cff',
  accentSoft: 'rgba(91, 140, 255, 0.12)',
  accentBorder: 'rgba(91, 140, 255, 0.32)',
  accentText: '#9bb8ff',
  gradientText: 'linear-gradient(120deg, #9bb8ff 0%, #b89bff 100%)'
}

// Inter z @fontsource: latin + latin-ext (diakritika), satori berie len woff/ttf.
// Podmnožiny musia mať rôzne mená — satori pri chýbajúcom znaku prechádza
// rodiny vo fontFamily, nie súbory s rovnakým menom.
export const FONT_SUBSETS = { latin: 'Inter', 'latin-ext': 'Inter Ext' }

export function loadFonts() {
  const dir = 'node_modules/@fontsource/inter/files'
  return [400, 500, 700].flatMap((weight) =>
    Object.entries(FONT_SUBSETS).map(([subset, name]) => ({
      name,
      weight,
      style: 'normal',
      data: readFileSync(join(dir, `inter-${subset}-${weight}-normal.woff`))
    }))
  )
}

// h('div', style, ...children) → strom, ktorý satori vie vykresliť
export function h(type, style, ...children) {
  const flat = children.flat().filter((c) => c !== null && c !== undefined && c !== false)
  return { type, props: { style, children: flat.length === 1 ? flat[0] : flat } }
}

// Súbory článkov sú TypeScript — Node (>= 23.6) z nich typy odstráni sám.
export async function loadPosts() {
  // súbory článkov volajú auto-importovaný defineBlogPost — tu stačí identita
  globalThis.defineBlogPost = (post) => post
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.ts'))
  return Promise.all(
    files.map(async (file) => {
      const mod = await import(pathToFileURL(join(POSTS_DIR, file)).href)
      return { slug: basename(file, '.ts'), ...mod.default }
    })
  )
}
