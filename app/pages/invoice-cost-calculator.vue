<script setup lang="ts">
defineI18nRoute({
  paths: {
    sk: '/kalkulacka-nakladov-na-faktury',
    cs: '/kalkulacka-nakladu-na-faktury',
    en: '/invoice-cost-calculator'
  }
})

const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const content = computed(() => INVOICE_CALCULATOR[locale.value as InvoiceCalculatorLocale] ?? INVOICE_CALCULATOR.en)

// články sa zobrazia, až keď sú publikované (BLOG_POSTS filtruje dátum buildu)
const relatedPosts = computed(() =>
  ['mandatory-e-invoicing-slovakia-2027', 'automatic-invoice-processing-into-pohoda']
    .map((slug) => findBlogPost(slug))
    .filter((post) => post !== undefined)
    .map((post) => ({
      slug: post.slug,
      title: (post.content[locale.value as BlogLocale] ?? post.content.en).title
    }))
)

const SITE_URL = 'https://projentiq.com'
const ORG_ID = `${SITE_URL}/#organization`
const OG_IMAGE = `${SITE_URL}/og-image.png`
const absoluteUrl = (path: string) => `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`

const inLanguage = computed(() => {
  const current = locales.value.find((l) => l.code === locale.value)
  return (current && 'language' in current ? current.language : undefined) ?? locale.value
})

useSeoMeta({
  title: () => content.value.metaTitle,
  description: () => content.value.metaDescription,
  ogSiteName: 'ProjentIQ',
  ogTitle: () => content.value.metaTitle,
  ogDescription: () => content.value.metaDescription,
  ogType: 'website',
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => t('meta.og_image_alt'),
  twitterCard: 'summary_large_image'
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: content.value.title,
            description: content.value.metaDescription,
            url: absoluteUrl(route.path),
            inLanguage: inLanguage.value,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: 0, priceCurrency: PRICING.currency },
            publisher: { '@id': ORG_ID }
          },
          {
            '@type': 'FAQPage',
            inLanguage: inLanguage.value,
            mainEntity: content.value.faq.items.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a }
            }))
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ProjentIQ', item: absoluteUrl(localePath('index')) },
              { '@type': 'ListItem', position: 2, name: content.value.eyebrow, item: absoluteUrl(route.path) }
            ]
          }
        ]
      })
    }
  ]
}))
</script>

<template>
  <div class="service">
    <header class="service__hero">
      <div class="service__inner service__hero-inner">
        <nav class="service__breadcrumbs" :aria-label="t('blog.breadcrumbs')">
          <ol>
            <li><NuxtLink :to="localePath('index')">ProjentIQ</NuxtLink></li>
            <li aria-current="page">{{ content.eyebrow }}</li>
          </ol>
        </nav>
        <p class="eyebrow">{{ content.eyebrow }}</p>
        <h1>{{ content.title }}</h1>
        <p class="service__lead">{{ content.lead }}</p>
      </div>
    </header>

    <section class="service__section" :aria-label="content.title">
      <div class="service__inner service__narrow">
        <SavingsCalculator compare />
      </div>
    </section>

    <section class="service__section service__section--alt">
      <div class="service__inner">
        <h2>{{ content.inputs.heading }}</h2>
        <ol class="service__steps">
          <li v-for="(item, i) in content.inputs.items" :key="item.title">
            <span class="service__step-number" aria-hidden="true">{{ i + 1 }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="service__section">
      <div class="service__inner service__columns">
        <div>
          <h2>{{ content.excluded.heading }}</h2>
          <p class="service__text">{{ content.excluded.lead }}</p>
          <ul class="service__checks">
            <li v-for="item in content.excluded.items" :key="item">
              <Icon name="tabler:plus" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
        <div>
          <h2>{{ content.related.heading }}</h2>
          <ul class="calc-page__links">
            <li>
              <NuxtLink :to="localePath('invoice-automation')" class="service__related">
                {{ content.related.invoiceAutomation }}
                <Icon name="tabler:arrow-right" aria-hidden="true" />
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('integrations')" class="service__related">
                {{ content.related.integrations }}
                <Icon name="tabler:arrow-right" aria-hidden="true" />
              </NuxtLink>
            </li>
            <li v-for="post in relatedPosts" :key="post.slug">
              <NuxtLink :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })" class="service__related">
                {{ post.title }}
                <Icon name="tabler:arrow-right" aria-hidden="true" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="service__section service__section--alt" aria-labelledby="calculator-faq-title">
      <div class="service__inner service__narrow">
        <h2 id="calculator-faq-title">{{ content.faq.heading }}</h2>
        <div class="service__faq">
          <details v-for="(item, i) in content.faq.items" :key="item.q" :open="i === 0">
            <summary>
              {{ item.q }}
              <Icon name="tabler:chevron-down" class="service__chevron" aria-hidden="true" />
            </summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <ContactForm />
  </div>
</template>

<style scoped src="~/assets/css/service-page.css"></style>

<style scoped>
.calc-page__links {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}
</style>
