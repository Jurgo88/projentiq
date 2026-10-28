<script setup lang="ts">
// Spoločná šablóna stránok služieb (AI chatbot, AI agenti). Texty sú
// v utils/service-landings.ts, demo sa vkladá cez slot `demo`.
// Stránka faktúr má vlastnú šablónu (kalkulačka, integrácie).
const props = defineProps<{
  content: ServiceLandingContent
  serviceId: number
}>()

const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const price = servicePrice(props.serviceId)!

const localeMap: Record<string, string> = { sk: 'sk-SK', cs: 'cs-CZ', en: 'en-US' }
const formatPrice = (value: number) => value.toLocaleString(localeMap[locale.value] ?? 'sk-SK')
const pricingText = computed(() =>
  props.content.pricing.text
    .replace('{setup}', formatPrice(price.setup))
    .replace('{monthly}', formatPrice(price.monthly))
    .replace('{pilot}', formatPrice(PRICING.pilot))
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
  title: () => props.content.metaTitle,
  description: () => props.content.metaDescription,
  ogSiteName: 'ProjentIQ',
  ogTitle: () => props.content.metaTitle,
  ogDescription: () => props.content.metaDescription,
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
            name: props.content.eyebrow,
            serviceType: props.content.eyebrow,
            description: props.content.metaDescription,
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
            mainEntity: props.content.faq.items.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a }
            }))
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ProjentIQ', item: absoluteUrl(localePath('index')) },
              { '@type': 'ListItem', position: 2, name: props.content.eyebrow, item: absoluteUrl(route.path) }
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
        <slot name="demo" />
      </div>
    </section>

    <section class="service__section service__section--alt">
      <div class="service__inner service__columns">
        <div v-for="list in content.lists" :key="list.heading">
          <h2>{{ list.heading }}</h2>
          <ul class="service__checks">
            <li v-for="item in list.items" :key="item">
              <Icon name="tabler:check" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="service__section">
      <div class="service__inner">
        <h2>{{ content.cards.heading }}</h2>
        <p class="service__text">{{ content.cards.lead }}</p>
        <ul class="service__cards">
          <li v-for="item in content.cards.items" :key="item.title">
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

<style scoped src="~/assets/css/service-page.css"></style>
