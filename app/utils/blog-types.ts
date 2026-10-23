// Typy blogu. Oddelené od blog-posts.ts, aby súbory článkov (ktoré volajú
// defineBlogPost) neimportovali modul, ktorý ich sám načítava cez glob.

export type BlogLocale = 'sk' | 'cs' | 'en'

export interface BlogSection {
  heading: string
  paragraphs?: string[]
  items?: { title?: string; text: string }[]
}

export interface BlogPostContent {
  title: string
  perex: string
  sections: BlogSection[]
  // Zvýraznený záverečný odsek pod sekciami (bez nadpisu).
  takeaway?: string
}

// Text titulného obrázka 1200×630. Vykreslí ho
// node scripts/generate-blog-covers.mjs do public/blog/<slug>.png. Texty sú
// po slovensky (jeden obrázok pre všetky jazyky); max. dĺžky v znakoch sú v
// komentároch, dlhší text skript odmietne.
export interface BlogCover {
  // Štítok vpravo hore, napr. 'Automatizácia' (20).
  tag: string
  // Karta pod logom: badge 2–3 znaky ('01', 'AI'), label (40), text (70).
  card: { badge: string; label: string; text: string }
  // Veľký nadpis; highlight pokračuje na novom riadku v akcentovej farbe
  // (spolu 95).
  headline: string
  highlight?: string
  // Pätička vľavo dole (60).
  footnote?: string
}

// Tvar súboru app/content/blog/<slug>.ts. Slug a čas čítania sa dopočítajú.
export interface BlogPostSource {
  // YYYY-MM-DD. Budúci dátum = článok čaká a vyjde pri prvom builde v ten deň.
  datePublished: string
  // Len ak treba prebiť automatický odhad (READING_WPM v blog-posts.ts).
  readingMinutes?: number
  // Predvolene /blog/<slug>.png (výstup generátora z `cover`).
  image?: string
  cover?: BlogCover
  imageAlt: Record<BlogLocale, string>
  inlineImage?: {
    src: string
    alt: Record<BlogLocale, string>
    afterSection: number
  }
  tags: string[]
  content: Record<BlogLocale, BlogPostContent>
}

export interface BlogPost extends Omit<BlogPostSource, 'readingMinutes' | 'image'> {
  slug: string
  image: string
  readingMinutes: Record<BlogLocale, number>
}

export function defineBlogPost(post: BlogPostSource): BlogPostSource {
  return post
}
