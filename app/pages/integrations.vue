<script setup lang="ts">
defineI18nRoute({
  paths: {
    sk: '/integracie',
    cs: '/integrace',
    en: '/integrations'
  }
})

const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const content = computed(() => INTEGRATIONS[locale.value as IntegrationsLocale] ?? INTEGRATIONS.en)

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
            '@type': 'WebPage',
            name: content.value.title,
            description: content.value.metaDescription,
            url: absoluteUrl(route.path),
            inLanguage: inLanguage.value,
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
        <div class="service__cta">
          <a href="#demo" class="btn-primary">{{ t('nav.cta_demo') }}</a>
          <NuxtLink :to="localePath('invoice-automation')" class="btn-secondary">{{ content.invoiceLink }}</NuxtLink>
        </div>
      </div>
    </header>

    <section class="service__section">
      <div class="service__inner service__columns">
        <div>
          <h2>{{ content.principle.heading }}</h2>
          <p v-for="p in content.principle.paragraphs" :key="p" class="service__text">{{ p }}</p>
        </div>
        <div>
          <h2>{{ content.agendas.heading }}</h2>
          <p class="service__text">{{ content.agendas.lead }}</p>
          <ul class="service__checks">
            <li v-for="item in content.agendas.items" :key="item">
              <Icon name="tabler:check" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="service__section service__section--alt">
      <div class="service__inner">
        <h2>{{ content.systems.heading }}</h2>
        <ul class="service__cards">
          <li v-for="system in content.systems.items" :id="system.id" :key="system.id">
            <h3>{{ system.name }}</h3>
            <p class="service__method">
              <span>{{ content.systems.methodLabel }}:</span> {{ system.method }}
            </p>
            <p>{{ system.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="service__section">
      <div class="service__inner">
        <h2>{{ content.process.heading }}</h2>
        <ol class="service__steps">
          <li v-for="(step, i) in content.process.items" :key="step.title">
            <span class="service__step-number" aria-hidden="true">{{ i + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="service__section service__section--alt" aria-labelledby="integrations-faq-title">
      <div class="service__inner service__narrow">
        <h2 id="integrations-faq-title">{{ content.faq.heading }}</h2>
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
