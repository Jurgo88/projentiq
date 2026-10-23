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

// Tvar súboru app/content/blog/<slug>.ts. Slug a čas čítania sa dopočítajú.
export interface BlogPostSource {
  // YYYY-MM-DD. Budúci dátum = článok čaká a vyjde pri prvom builde v ten deň.
  datePublished: string
  // Len ak treba prebiť automatický odhad (READING_WPM v blog-posts.ts).
  readingMinutes?: number
  image: string
  imageAlt: Record<BlogLocale, string>
  inlineImage?: {
    src: string
    alt: Record<BlogLocale, string>
    afterSection: number
  }
  tags: string[]
  content: Record<BlogLocale, BlogPostContent>
}

export interface BlogPost extends Omit<BlogPostSource, 'readingMinutes'> {
  slug: string
  readingMinutes: Record<BlogLocale, number>
}

export function defineBlogPost(post: BlogPostSource): BlogPostSource {
  return post
}
