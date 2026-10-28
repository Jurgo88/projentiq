<script setup lang="ts">
const route = useRoute()
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()

const post = findBlogPost(String(route.params.slug))
if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

const localeMap: Record<string, string> = { sk: 'sk-SK', cs: 'cs-CZ', en: 'en-US' }
const content = computed(() => post.content[locale.value as BlogLocale] ?? post.content.en)
const image = computed(() => post.image[locale.value as BlogLocale] ?? post.image.en)
const imageAlt = computed(() => post.imageAlt[locale.value as BlogLocale] ?? post.imageAlt.en)
const readingMinutes = computed(() => post.readingMinutes[locale.value as BlogLocale] ?? post.readingMinutes.en)
const inlineImageAlt = computed(() => post.inlineImage?.alt[locale.value as BlogLocale] ?? post.inlineImage?.alt.en ?? '')
const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(localeMap[locale.value] ?? 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
const date = computed(() => formatDate(post.datePublished))
const modifiedDate = computed(() => (post.dateModified ? formatDate(post.dateModified) : ''))
// štítok kategórie je lokalizovaný v texte titulného obrázka
const category = computed(() => post.cover?.[locale.value as BlogLocale]?.tag)
const homePath = computed(() => localePath('index'))
const isSecurityPost = post.tags.includes('Security')

// id nadpisu sekcie pre odkaz na ňu: bez diakritiky, slová spojené pomlčkou
function sectionId(heading: string) {
  return heading
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// najviac 3 ďalšie články: najprv tie s najviac spoločnými tagmi, pri zhode
// novšie (BLOG_POSTS je zoradený od najnovšieho a sort je stabilný)
const related = computed(() =>
  BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .map((p) => ({ post: p, shared: p.tags.filter((tag) => post.tags.includes(tag)).length }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map(({ post: p }) => ({
      slug: p.slug,
      title: (p.content[locale.value as BlogLocale] ?? p.content.en).title,
      image: p.image[locale.value as BlogLocale] ?? p.image.en,
      imageAlt: p.imageAlt[locale.value as BlogLocale] ?? p.imageAlt.en,
      datePublished: p.datePublished,
      date: formatDate(p.datePublished)
    }))
)

const SITE_URL = 'https://projentiq.com'
const ORG_ID = `${SITE_URL}/#organization`
const imageUrl = computed(() => `${SITE_URL}${image.value}`)
// kanonické URL majú lomku na konci (nuxt.config.ts → trailingSlash)
const absoluteUrl = (path: string) => `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`

const inLanguage = computed(() => {
  const current = locales.value.find((l) => l.code === locale.value)
  return (current && 'language' in current ? current.language : undefined) ?? locale.value
})

const pageTitle = computed(() => `${content.value.title} – ProjentIQ`)

useSeoMeta({
  title: () => pageTitle.value,
  description: () => content.value.perex,
  ogSiteName: 'ProjentIQ',
  ogTitle: () => content.value.title,
  ogDescription: () => content.value.perex,
  ogType: 'article',
  ogImage: () => imageUrl.value,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => imageAlt.value,
  articlePublishedTime: post.datePublished,
  articleModifiedTime: post.dateModified,
  twitterCard: 'summary_large_image',
  twitterTitle: () => content.value.title,
  twitterDescription: () => content.value.perex,
  twitterImage: () => imageUrl.value,
  twitterImageAlt: () => imageAlt.value
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            headline: content.value.title,
            description: content.value.perex,
            inLanguage: inLanguage.value,
            datePublished: post.datePublished,
            ...(post.dateModified && { dateModified: post.dateModified }),
            mainEntityOfPage: absoluteUrl(route.path),
            image: imageUrl.value,
            keywords: post.tags.join(', '),
            author: { '@id': ORG_ID },
            publisher: { '@id': ORG_ID }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ProjentIQ', item: absoluteUrl(localePath('index')) },
              { '@type': 'ListItem', position: 2, name: t('nav.blog'), item: absoluteUrl(localePath('blog')) },
              { '@type': 'ListItem', position: 3, name: content.value.title, item: absoluteUrl(route.path) }
            ]
          }
        ]
      })
    }
  ]
}))
</script>

<template>
  <article class="post">
    <header class="post__hero">
      <div class="post__inner">
        <nav class="post__breadcrumbs" :aria-label="t('blog.breadcrumbs')">
          <ol>
            <li><NuxtLink :to="localePath('index')">ProjentIQ</NuxtLink></li>
            <li><NuxtLink :to="localePath('blog')">{{ t('nav.blog') }}</NuxtLink></li>
            <li aria-current="page">{{ content.title }}</li>
          </ol>
        </nav>
        <p v-if="category" class="eyebrow">{{ category }}</p>
        <p class="post__meta">
          <time :datetime="post.datePublished">{{ date }}</time>
          · {{ t('blog.reading_time', { n: readingMinutes }) }}
          <template v-if="post.dateModified">
            · {{ t('blog.updated') }} <time :datetime="post.dateModified">{{ modifiedDate }}</time>
          </template>
        </p>
        <h1>{{ content.title }}</h1>
        <p class="post__perex">{{ content.perex }}</p>
      </div>
    </header>

    <div class="post__inner post__body">
      <img :src="image" :alt="imageAlt" width="1200" height="630" class="post__img" />

      <template v-for="(section, index) in content.sections" :key="section.heading">
        <section class="post__section">
          <h2 :id="sectionId(section.heading)">
            {{ section.heading }}
            <a
              :href="`#${sectionId(section.heading)}`"
              class="post__anchor"
              :aria-label="t('blog.section_link', { title: section.heading })"
            >#</a>
          </h2>
          <p v-for="p in section.paragraphs" :key="p">{{ p }}</p>
          <ul v-if="section.items" class="post__list">
            <li v-for="item in section.items" :key="item.text">
              <strong v-if="item.title">{{ item.title }}:</strong>
              {{ item.text }}
            </li>
          </ul>
        </section>

        <figure
          v-if="post.inlineImage && index + 1 === post.inlineImage.afterSection"
          class="post__inline-image"
        >
          <img :src="post.inlineImage.src" :alt="inlineImageAlt" width="1200" height="630" loading="lazy" />
        </figure>
      </template>

      <aside v-if="content.takeaway" class="post__takeaway">
        <p class="eyebrow">{{ t('blog.takeaway') }}</p>
        <p>{{ content.takeaway }}</p>
      </aside>

      <section v-if="post.sources?.length" class="post__sources">
        <h2>{{ t('blog.sources') }}</h2>
        <ul>
          <li v-for="source in post.sources" :key="source.url">
            <a :href="source.url" target="_blank" rel="noopener">{{ source.label }}</a>
          </li>
        </ul>
      </section>
    </div>

    <section v-if="related.length" class="post__related" aria-labelledby="related-title">
      <div class="post__related-inner">
        <h2 id="related-title">{{ t('blog.related') }}</h2>
        <ul class="post__related-list">
          <li v-for="item in related" :key="item.slug">
            <NuxtLink :to="localePath({ name: 'blog-slug', params: { slug: item.slug } })" class="post__related-card">
              <img :src="item.image" :alt="item.imageAlt" width="1200" height="630" loading="lazy" />
              <span class="post__related-body">
                <time :datetime="item.datePublished">{{ item.date }}</time>
                <strong>{{ item.title }}</strong>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="post__cta">
      <div class="post__cta-inner">
        <div>
          <h2>{{ isSecurityPost ? t('blog.cta_security_title') : t('blog.cta_title') }}</h2>
          <p>{{ isSecurityPost ? t('blog.cta_security_lead') : t('blog.cta_lead') }}</p>
        </div>
        <a :href="`${homePath}#demo`" class="btn-primary">{{ t('blog.cta_button') }}</a>
      </div>
    </section>
  </article>
</template>

<style scoped>
.post__inner {
  max-width: 68ch;
  margin: 0 auto;
}

.post__hero {
  padding: calc(var(--section-y) * 0.9) 1.5rem calc(var(--section-y) * 0.4);
  background: var(--glow-accent), var(--color-bg);
}

.post__breadcrumbs ol {
  display: flex;
  min-width: 0;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.post__breadcrumbs li {
  flex-shrink: 0;
  white-space: nowrap;
}

.post__breadcrumbs li + li::before {
  content: '›';
  margin: 0 0.5rem;
}

/* dlhý názov článku sa skráti, odkazy ostanú celé */
.post__breadcrumbs li[aria-current] {
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post__breadcrumbs a {
  color: inherit;
  text-decoration: none;
}

.post__breadcrumbs a:hover,
.post__breadcrumbs a:focus-visible {
  color: var(--color-text);
  text-decoration: underline;
}

.post__meta {
  margin: 0 0 0.75rem;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.post h1 {
  font-size: var(--fs-3xl);
  letter-spacing: var(--tracking-tight);
  line-height: var(--lh-tight);
  margin: 0 0 1rem;
}

.post__perex {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--fs-md);
  line-height: var(--lh-base);
}

.post__body {
  padding: 0 1.5rem var(--section-y);
  box-sizing: content-box;
}

.post__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1200 / 630;
  margin: 0 0 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
}

.post__inline-image {
  margin: 0 0 2.25rem;
}

.post__inline-image img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
}

.post__section {
  margin-bottom: 2.25rem;
}

.post__section h2 {
  font-size: var(--fs-content-h2);
  margin: 0 0 0.85rem;
}

.post__anchor {
  margin-left: 0.35rem;
  color: var(--color-accent);
  font-weight: var(--fw-regular);
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.post__section h2:hover .post__anchor,
.post__anchor:focus-visible {
  opacity: 1;
}

/* na dotykových zariadeniach nie je hover — odkaz ostane jemne viditeľný */
@media (hover: none) {
  .post__anchor {
    opacity: 0.5;
  }
}

.post__section p,
.post__list li {
  color: var(--color-text-body);
  font-size: var(--fs-md);
  line-height: var(--lh-reading);
}

.post__section p {
  margin: 0 0 0.85rem;
}

.post__list {
  margin: 0;
  padding-left: 1.25rem;
}

.post__list li {
  margin-bottom: 0.6rem;
}

.post__list li::marker {
  color: var(--color-accent);
}

.post__list strong {
  color: var(--color-text);
  font-weight: var(--fw-semibold);
}

.post__takeaway {
  margin: 2.75rem 0 0;
  padding: 1.5rem 1.75rem;
  background: var(--color-accent-soft);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--r-md);
  color: var(--color-text);
  font-size: var(--fs-lg);
  font-weight: var(--fw-semibold);
  line-height: var(--lh-base);
}

.post__takeaway p {
  margin: 0;
}

.post__takeaway .eyebrow {
  margin-bottom: 0.6rem;
}

.post__sources {
  margin-top: 2.5rem;
}

.post__sources h2 {
  font-size: var(--fs-md);
  margin: 0 0 0.75rem;
}

.post__sources ul {
  margin: 0;
  padding-left: 1.25rem;
}

.post__sources li {
  margin-bottom: 0.4rem;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  line-height: var(--lh-base);
  overflow-wrap: anywhere;
}

.post__sources a {
  color: inherit;
}

.post__sources a:hover {
  color: var(--color-text);
}

.post__related {
  padding: 0 1.5rem var(--section-y);
}

.post__related-inner {
  max-width: var(--container);
  margin: 0 auto;
}

.post__related h2 {
  font-size: var(--fs-content-h2);
  margin: 0 0 1.25rem;
}

.post__related-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
  gap: 1.25rem;
}

.post__related-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-surface-1);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease;
}

.post__related-card:hover {
  border-color: var(--color-accent-border);
}

.post__related-card img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1200 / 630;
  border-bottom: 1px solid var(--color-border);
}

.post__related-body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem 1.25rem 1.25rem;
}

.post__related-body time {
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.post__related-body strong {
  font-size: var(--fs-base);
  line-height: var(--lh-snug);
}

.post__cta {
  padding: calc(var(--section-y) * 0.85) 1.5rem;
  background: var(--color-accent-soft);
  border-top: 1px solid var(--color-accent-border);
  border-bottom: 1px solid var(--color-accent-border);
}

.post__cta-inner {
  max-width: var(--container);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.post__cta h2 {
  max-width: 36rem;
  font-size: var(--fs-content-h2);
  margin: 0 0 0.5rem;
}

.post__cta p {
  margin: 0;
  color: var(--color-text-muted);
}
</style>
