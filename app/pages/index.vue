<script setup lang="ts">
const { t, locale, locales } = useI18n()

// pozri komentár nad <template>
const hydrateEarly = { rootMargin: '300px' }

const SITE_URL = 'https://projentiq.com'
const ORG_ID = `${SITE_URL}/#organization`
const OG_IMAGE = `${SITE_URL}/og-image.png`

const inLanguage = computed(() => {
  const current = locales.value.find((l) => l.code === locale.value)
  return (current && 'language' in current ? current.language : undefined) ?? locale.value
})

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogSiteName: 'ProjentIQ',
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => t('meta.og_image_alt'),
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('meta.title'),
  twitterDescription: () => t('meta.description'),
  twitterImage: OG_IMAGE,
  twitterImageAlt: () => t('meta.og_image_alt')
})

const areaServed = [
  { '@type': 'Country', name: 'Slovakia' },
  { '@type': 'Country', name: 'Czech Republic' }
]

const faqIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': ORG_ID,
            name: COMPANY.brand,
            legalName: COMPANY.legalName,
            url: `${SITE_URL}/`,
            description: t('footer.tagline'),
            email: COMPANY.email,
            taxID: COMPANY.dic,
            identifier: { '@type': 'PropertyValue', propertyID: 'IČO', value: COMPANY.ico },
            address: {
              '@type': 'PostalAddress',
              streetAddress: COMPANY.street,
              postalCode: COMPANY.postalCode,
              addressLocality: COMPANY.city,
              addressCountry: COMPANY.country
            },
            areaServed: [{ '@type': 'City', name: COMPANY.baseCity }, ...areaServed],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              email: COMPANY.email,
              areaServed: ['SK', 'CZ'],
              availableLanguage: ['sk', 'cs', 'en']
            }
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: 'ProjentIQ',
            url: `${SITE_URL}/`,
            inLanguage: inLanguage.value,
            publisher: { '@id': ORG_ID }
          },
          ...PRICING.services.map(({ id, setup, monthly }) => ({
            '@type': 'Service',
            name: t(`products.card_${id}_title`),
            serviceType: t(`products.card_${id}_title`),
            description: t(`products.card_${id}_desc`),
            provider: { '@id': ORG_ID },
            areaServed,
            offers: serviceOffers(setup, monthly)
          })),
          {
            '@type': 'FAQPage',
            inLanguage: inLanguage.value,
            mainEntity: faqIds.map((id) => ({
              '@type': 'Question',
              name: t(`faq.q${id}`),
              acceptedAnswer: { '@type': 'Answer', text: t(`faq.a${id}`) }
            }))
          }
        ]
      })
    }
  ]
}))
</script>

<!--
  Sekcie pod hero sa hydratujú až pred tým, ako sa dostanú na obrazovku
  (#8): HTML je predgenerované a viditeľné hneď, ale JS pre celú stránku pred
  prvým vykreslením na mobile odďaľoval LCP o niekoľko sekúnd. rootMargin
  300px = sekcia sa pripraví skôr, než ju návštevník uvidí, takže useReveal
  ju stihne skryť a animácia pri scrollovaní ostáva ako predtým.
-->
<template>
  <HeroSection />
  <TrustStrip />
  <LazyHowItWorks :hydrate-on-visible="hydrateEarly" />
  <LazyInteractiveDemos :hydrate-on-visible="hydrateEarly" />
  <LazyCaseStudies :hydrate-on-visible="hydrateEarly" />
  <LazyProductCards :hydrate-on-visible="hydrateEarly" />
  <LazyWhyProjentIQ :hydrate-on-visible="hydrateEarly" />
  <LazyTestimonials :hydrate-on-visible="hydrateEarly" />
  <LazyFaqSection :hydrate-on-visible="hydrateEarly" />
  <LazyContactForm :hydrate-on-visible="hydrateEarly" />
</template>
