<script setup lang="ts">
defineI18nRoute({
  paths: {
    sk: '/automatizacia-faktur',
    cs: '/automatizace-faktur',
    en: '/invoice-automation'
  }
})

const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const content = computed(() => INVOICE_AUTOMATION[locale.value as ServicePageLocale] ?? INVOICE_AUTOMATION.en)

// automatizácia procesov = karta 3 v utils/pricing.ts
const AUTOMATION_SERVICE_ID = 3
const price = servicePrice(AUTOMATION_SERVICE_ID)!

const localeMap: Record<string, string> = { sk: 'sk-SK', cs: 'cs-CZ', en: 'en-US' }
const formatPrice = (value: number) => value.toLocaleString(localeMap[locale.value] ?? 'sk-SK')
const pricingText = computed(() =>
  content.value.pricing.text
    .replace('{setup}', formatPrice(price.setup))
    .replace('{monthly}', formatPrice(price.monthly))
    .replace('{pilot}', formatPrice(PRICING.pilot))
)

// článok o Pohode sa zobrazí, až keď je publikovaný (BLOG_POSTS filtruje dátum buildu)
const relatedPost = findBlogPost('automatic-invoice-processing-into-pohoda')

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
            '@type': 'Service',
            name: content.value.eyebrow,
            serviceType: content.value.eyebrow,
            description: content.value.metaDescription,
            url: absoluteUrl(route.path),
            provider: { '@id': ORG_ID },
            areaServed: [
              { '@type': 'Country', name: 'Slovakia' },
              { '@type': 'Country', name: 'Czech Republic' }
            ],
            offers: serviceOffers(price.setup, price.monthly)
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
        <div class="service__cta">
          <a href="#demo" class="btn-primary">{{ t('nav.cta_demo') }}</a>
          <a href="#ukazka" class="btn-secondary">{{ content.ctaTry }}</a>
        </div>
      </div>
    </header>

    <section class="service__section">
      <div class="service__inner service__narrow">
        <h2>{{ content.problem.heading }}</h2>
        <p v-for="p in content.problem.paragraphs" :key="p" class="service__text">{{ p }}</p>
      </div>
    </section>

    <section class="service__section service__section--alt">
      <div class="service__inner">
        <h2>{{ content.steps.heading }}</h2>
        <ol class="service__steps">
          <li v-for="(step, i) in content.steps.items" :key="step.title">
            <span class="service__step-number" aria-hidden="true">{{ i + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section id="ukazka" class="service__section">
      <div class="service__inner">
        <div class="service__center">
          <h2>{{ content.demo.heading }}</h2>
          <p class="service__text">{{ content.demo.lead }}</p>
        </div>
        <LazyDemosDemoInvoice />
      </div>
    </section>

    <section class="service__section service__section--alt">
      <div class="service__inner service__columns">
        <div>
          <h2>{{ content.fields.heading }}</h2>
          <ul class="service__checks">
            <li v-for="item in content.fields.items" :key="item">
              <Icon name="tabler:check" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
        <div>
          <h2>{{ content.fields.inputsHeading }}</h2>
          <ul class="service__checks">
            <li v-for="item in content.fields.inputs" :key="item">
              <Icon name="tabler:file-invoice" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="service__section">
      <div class="service__inner">
        <h2>{{ content.integrations.heading }}</h2>
        <p class="service__text">{{ content.integrations.lead }}</p>
        <ul class="service__cards">
          <li v-for="item in content.integrations.items" :key="item.title">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="service__section service__section--alt">
      <div class="service__inner">
        <h2>{{ content.control.heading }}</h2>
        <ul class="service__cards service__cards--three">
          <li v-for="item in content.control.items" :key="item.title">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="service__section">
      <div class="service__inner service__narrow">
        <h2>{{ content.pricing.heading }}</h2>
        <p class="service__text service__text--strong">{{ pricingText }}</p>
        <p class="service__note">{{ content.pricing.note }}</p>
        <NuxtLink
          v-if="relatedPost"
          :to="localePath({ name: 'blog-slug', params: { slug: relatedPost.slug } })"
          class="service__related"
        >
          {{ content.related }}
          <Icon name="tabler:arrow-right" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>

    <section class="service__section service__section--alt" aria-labelledby="service-faq-title">
      <div class="service__inner service__narrow">
        <h2 id="service-faq-title">{{ content.faq.heading }}</h2>
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

<style scoped>
.service__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.service__narrow {
  max-width: 48rem;
}

.service__hero {
  padding: calc(var(--section-y) * 0.9) 1.5rem calc(var(--section-y) * 0.7);
  background: var(--glow-accent), var(--color-bg);
}

.service__hero-inner {
  max-width: 52rem;
}

.service__breadcrumbs ol {
  display: flex;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.service__breadcrumbs li + li::before {
  content: '›';
  margin: 0 0.5rem;
}

.service__breadcrumbs a {
  color: inherit;
  text-decoration: none;
}

.service__breadcrumbs a:hover,
.service__breadcrumbs a:focus-visible {
  color: var(--color-text);
  text-decoration: underline;
}

.service h1 {
  font-size: var(--fs-3xl);
  letter-spacing: var(--tracking-tight);
  line-height: var(--lh-tight);
  margin: 0 0 1.25rem;
}

.service__lead {
  max-width: 44rem;
  margin: 0 0 2rem;
  color: var(--color-text-muted);
  font-size: var(--fs-md);
  line-height: var(--lh-base);
}

.service__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.service__section {
  padding: var(--section-y) 1.5rem;
  background: var(--color-bg);
}

.service__section--alt {
  background: var(--color-surface-1);
}

.service h2 {
  font-size: var(--fs-2xl);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 1rem;
}

.service__text {
  max-width: 44rem;
  margin: 0 0 1rem;
  color: var(--color-text-body);
  font-size: var(--fs-md);
  line-height: var(--lh-reading);
}

.service__text--strong {
  color: var(--color-text);
}

.service__center {
  max-width: 44rem;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.service__center .service__text {
  margin-inline: auto;
}

.service__steps {
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  gap: 1.5rem;
}

.service__step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-bottom: 0.75rem;
  border-radius: 50%;
  background: var(--color-accent-soft);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-sm);
}

.service__steps h3,
.service__cards h3 {
  font-size: var(--fs-lg);
  margin: 0 0 0.4rem;
}

.service__steps p,
.service__cards p {
  margin: 0;
  color: var(--color-text-muted);
  line-height: var(--lh-base);
}

.service__columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
  gap: 2.5rem;
}

.service__checks {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.service__checks li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: var(--color-text-body);
  font-size: var(--fs-md);
}

.service__checks :deep(svg) {
  flex-shrink: 0;
  margin-top: 0.2em;
  color: var(--color-accent);
}

.service__cards {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1.25rem;
}

.service__cards li {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-surface-1);
}

.service__section--alt .service__cards li {
  background: var(--color-bg);
}

.service__note {
  margin: 0 0 1.5rem;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.service__related {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-accent);
  font-weight: var(--fw-semibold);
  text-decoration: none;
}

.service__related:hover {
  text-decoration: underline;
}

.service__faq {
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  background: var(--color-bg);
  overflow: hidden;
}

.service__faq details + details {
  border-top: 1px solid var(--color-border);
}

.service__faq summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  font-weight: var(--fw-semibold);
  cursor: pointer;
  list-style: none;
}

.service__faq summary::-webkit-details-marker {
  display: none;
}

.service__chevron {
  flex-shrink: 0;
  color: var(--color-accent);
  transition: transform 0.2s ease;
}

.service__faq details[open] .service__chevron {
  transform: rotate(180deg);
}

.service__faq details p {
  margin: 0;
  padding: 0 1.25rem 1.25rem;
  color: var(--color-text-muted);
  line-height: var(--lh-base);
}

@media (prefers-reduced-motion: reduce) {
  .service__chevron {
    transition: none;
  }
}
</style>
