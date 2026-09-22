<script setup lang="ts">
const { t, locale, locales } = useI18n()

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

// TODO: po potvrdení reálnych cien (ProductCards.vue) doplniť ku každej
// službe `offers` s priceSpecification — placeholder sumy do schémy nedávať
const serviceIds = [1, 2, 3]
const faqIds = [1, 2, 3, 4]

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
          ...serviceIds.map((id) => ({
            '@type': 'Service',
            name: t(`products.card_${id}_title`),
            serviceType: t(`products.card_${id}_title`),
            description: t(`products.card_${id}_desc`),
            provider: { '@id': ORG_ID },
            areaServed
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

<template>
  <HeroSection />
  <TrustStrip />
  <HowItWorks />
  <ProductCards />
  <InteractiveDemos />
  <WhyProjentIQ />
  <TrustSection />
  <Testimonials />
  <FaqSection />
  <CtaBand />
  <ContactForm />
</template>
