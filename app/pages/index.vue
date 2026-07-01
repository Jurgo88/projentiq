<script setup lang="ts">
const { t, locale, locales } = useI18n()

const SITE_URL = 'https://projentiq.com'
const OG_IMAGE = `${SITE_URL}/og-image.png`

const inLanguage = computed(() => {
  const current = locales.value.find((l) => l.code === locale.value)
  return (current && 'language' in current ? current.language : undefined) ?? locale.value
})

useSeoMeta({
  title: t('meta.title'),
  description: t('meta.description'),
  ogTitle: t('meta.title'),
  ogDescription: t('meta.description'),
  ogType: 'website',
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: t('meta.title'),
  twitterDescription: t('meta.description'),
  twitterImage: OG_IMAGE
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'Projentiq',
            url: SITE_URL,
            description: t('meta.description'),
            inLanguage: inLanguage.value
          },
          {
            '@type': 'Service',
            name: t('meta.service_name'),
            provider: { '@id': `${SITE_URL}/#organization` },
            description: t('meta.description'),
            areaServed: ['SK', 'CZ'],
            inLanguage: inLanguage.value
          }
        ]
      })
    }
  ]
}))
</script>

<template>
  <HeroSection />
  <TrustSection />
  <HowItWorks />
  <InteractiveDemos />
  <ProductCards />
  <Testimonials />
  <FaqSection />
  <CtaBand />
  <ContactForm />
</template>
