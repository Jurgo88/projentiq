// Blog. Nový článok = nový súbor app/content/blog/<slug>.ts (export default
// defineBlogPost({...})), slug je názov súboru. Zoznam aj detail sa vygenerujú
// samé, zoradené od najnovšieho. Ikony píš ako celé reťazce 'tabler:…'
// (clientBundle scan).

import type { BlogLocale, BlogPost, BlogPostContent, BlogPostSource } from './blog-types'

// Dátum buildu (nuxt.config.ts → vite.define). Web je statický, takže o tom,
// či je článok vonku, rozhoduje build, nie prehliadač: inak by sa zoznam
// líšil od prerendrovaného HTML a budúci článok by nemal vygenerovanú stránku.
declare const __BLOG_BUILD_DATE__: string
// true v Netlify náhľade PR — naplánované články vidno pred zverejnením (aj v nuxt dev)
declare const __BLOG_SHOW_SCHEDULED__: boolean

const READING_WPM = 200

const sources = import.meta.glob<BlogPostSource>('../content/blog/*.ts', {
  eager: true,
  import: 'default'
})

function countWords(content: BlogPostContent) {
  const texts = [
    content.title,
    content.perex,
    ...content.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.items ?? []).flatMap((i) => [i.title ?? '', i.text])
    ]),
    content.takeaway ?? ''
  ]
  return texts.join(' ').split(/\s+/).filter(Boolean).length
}

function toPost(path: string, { readingMinutes, ...source }: BlogPostSource): BlogPost {
  const slug = path.split('/').pop()!.replace(/\.ts$/, '')
  const minutes = (locale: BlogLocale) =>
    readingMinutes ?? Math.max(1, Math.ceil(countWords(source.content[locale]) / READING_WPM))
  return {
    ...source,
    slug,
    image: source.image ?? `/blog/${slug}.png`,
    readingMinutes: { sk: minutes('sk'), cs: minutes('cs'), en: minutes('en') }
  }
}

export const BLOG_POSTS: BlogPost[] = Object.entries(sources)
  .map(([path, source]) => toPost(path, source))
  .filter((post) => import.meta.dev || __BLOG_SHOW_SCHEDULED__ || post.datePublished <= __BLOG_BUILD_DATE__)
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished) || a.slug.localeCompare(b.slug))

export function findBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
