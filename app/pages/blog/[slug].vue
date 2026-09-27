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
const imageAlt = computed(() => post.imageAlt[locale.value as BlogLocale] ?? post.imageAlt.en)
const date = computed(() =>
  new Date(post.datePublished).toLocaleDateString(localeMap[locale.value] ?? 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
)
const homePath = computed(() => localePath('index'))

const SITE_URL = 'https://projentiq.com'
const ORG_ID = `${SITE_URL}/#organization`
const IMAGE_URL = `${SITE_URL}${post.image}`

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
  ogImage: IMAGE_URL,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => imageAlt.value,
  articlePublishedTime: post.datePublished,
  twitterCard: 'summary_large_image',
  twitterTitle: () => content.value.title,
  twitterDescription: () => content.value.perex,
  twitterImage: IMAGE_URL,
  twitterImageAlt: () => imageAlt.value
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: content.value.title,
        description: content.value.perex,
        inLanguage: inLanguage.value,
        datePublished: post.datePublished,
        image: IMAGE_URL,
        keywords: post.tags.join(', '),
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID }
      })
    }
  ]
}))
</script>

<template>
  <article class="post">
    <header class="post__hero">
      <div class="post__inner">
        <NuxtLink :to="localePath('blog')" class="post__back">
          <Icon name="tabler:arrow-left" aria-hidden="true" />
          {{ t('blog.back') }}
        </NuxtLink>
        <p class="post__meta">
          <time :datetime="post.datePublished">{{ date }}</time>
          · {{ t('blog.reading_time', { n: post.readingMinutes }) }}
        </p>
        <h1>{{ content.title }}</h1>
        <p class="post__perex">{{ content.perex }}</p>
      </div>
    </header>

    <div class="post__inner post__body">
      <img :src="post.image" :alt="imageAlt" width="1200" height="630" class="post__img" />

      <section v-for="section in content.sections" :key="section.heading" class="post__section">
        <h2>{{ section.heading }}</h2>
        <p v-for="p in section.paragraphs" :key="p">{{ p }}</p>
        <ul v-if="section.items" class="post__list">
          <li v-for="item in section.items" :key="item.text">
            <strong v-if="item.title">{{ item.title }}:</strong>
            {{ item.text }}
          </li>
        </ul>
      </section>
    </div>

    <section class="post__cta">
      <div class="post__cta-inner">
        <div>
          <h2>{{ t('blog.cta_title') }}</h2>
          <p>{{ t('blog.cta_lead') }}</p>
        </div>
        <a :href="`${homePath}#demo`" class="btn-primary">{{ t('blog.cta_button') }}</a>
      </div>
    </section>
  </article>
</template>

<style scoped>
.post__inner {
  max-width: 46rem;
  margin: 0 auto;
}

.post__hero {
  padding: calc(var(--section-y) * 0.9) 1.5rem calc(var(--section-y) * 0.4);
  background: var(--glow-accent), var(--color-bg);
}

.post__back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  text-decoration: none;
}

.post__back:hover {
  color: var(--color-text);
}

.post__meta {
  margin: 0 0 0.75rem;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.post h1 {
  font-size: clamp(1.9rem, 4.5vw, 2.6rem);
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

.post__section {
  margin-bottom: 2.25rem;
}

.post__section h2 {
  font-size: clamp(1.3rem, 2.4vw, 1.6rem);
  margin: 0 0 0.85rem;
}

.post__section p,
.post__list li {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  line-height: var(--lh-base);
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
  font-size: clamp(1.3rem, 2.4vw, 1.7rem);
  margin: 0 0 0.5rem;
}

.post__cta p {
  margin: 0;
  color: var(--color-text-muted);
}
</style>
