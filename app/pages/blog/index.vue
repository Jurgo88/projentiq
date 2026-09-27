<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const localeMap: Record<string, string> = { sk: 'sk-SK', cs: 'cs-CZ', en: 'en-US' }

const posts = computed(() =>
  BLOG_POSTS.map((post) => ({
    slug: post.slug,
    image: post.image,
    imageAlt: post.imageAlt[locale.value as BlogLocale] ?? post.imageAlt.en,
    readingMinutes: post.readingMinutes,
    datePublished: post.datePublished,
    date: new Date(post.datePublished).toLocaleDateString(localeMap[locale.value] ?? 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    content: post.content[locale.value as BlogLocale] ?? post.content.en
  }))
)

useSeoMeta({
  title: () => `${t('blog.title')} – ProjentIQ`,
  description: () => t('blog.meta_description'),
  ogSiteName: 'ProjentIQ',
  ogTitle: () => `${t('blog.title')} – ProjentIQ`,
  ogDescription: () => t('blog.meta_description'),
  ogType: 'website',
  ogImage: 'https://projentiq.com/og-image.png'
})
</script>

<template>
  <div class="blog">
    <header class="blog__hero">
      <div class="blog__inner">
        <h1>{{ t('blog.title') }}</h1>
        <p class="blog__lead">{{ t('blog.lead') }}</p>
      </div>
    </header>

    <div class="blog__inner blog__list-wrap">
      <ul class="blog__list">
        <li v-for="post in posts" :key="post.slug">
          <NuxtLink :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })" class="blog__card">
            <img :src="post.image" :alt="post.imageAlt" width="1200" height="630" loading="lazy" class="blog__img" />
            <div class="blog__card-body">
              <p class="blog__meta">
                <time :datetime="post.datePublished">{{ post.date }}</time>
                · {{ t('blog.reading_time', { n: post.readingMinutes }) }}
              </p>
              <h2>{{ post.content.title }}</h2>
              <p class="blog__perex">{{ post.content.perex }}</p>
              <span class="blog__more">
                {{ t('blog.read_more') }}
                <Icon name="tabler:arrow-right" aria-hidden="true" />
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.blog__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.blog__hero {
  padding: calc(var(--section-y) * 0.9) 1.5rem calc(var(--section-y) * 0.5);
  background: var(--glow-accent), var(--color-bg);
}

.blog h1 {
  font-size: clamp(2rem, 4.5vw, 2.8rem);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 0.75rem;
}

.blog__lead {
  max-width: 40rem;
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--fs-md);
  line-height: var(--lh-base);
}

.blog__list-wrap {
  padding: 0 1.5rem var(--section-y);
  box-sizing: content-box;
}

.blog__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 22rem), 1fr));
  gap: 1.5rem;
}

.blog__card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-surface-1);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.blog__card:hover {
  border-color: var(--color-accent-border);
  transform: translateY(-2px);
}

.blog__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1200 / 630;
  border-bottom: 1px solid var(--color-border);
}

.blog__card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
}

.blog__meta {
  margin: 0 0 0.5rem;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.blog__card h2 {
  font-size: 1.2rem;
  line-height: var(--lh-snug);
  margin: 0 0 0.75rem;
}

.blog__perex {
  margin: 0 0 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: var(--lh-base);
}

.blog__more {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-accent);
  font-weight: var(--fw-semibold);
  font-size: 0.95rem;
}

@media (prefers-reduced-motion: reduce) {
  .blog__card {
    transition: none;
  }

  .blog__card:hover {
    transform: none;
  }
}
</style>
