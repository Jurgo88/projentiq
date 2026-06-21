<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('meta.title'),
  description: t('meta.description')
})
</script>

<template>
  <HeroSection />
  <TrustStrip />
  <HowItWorks />
  <ProductCards />
  <WhyProjentIQ />
  <TrustSection />
  <Testimonials />
  <FaqSection />
  <CtaBand />
  <ContactForm />
</template>
