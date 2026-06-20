<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('meta.title'),
  description: t('meta.description')
})
</script>

<template>
  <HeroSection />
  <HowItWorks />
  <ProductCards />
  <WhyProjentIQ />
  <Testimonials />
  <FaqSection />
  <CtaBand />
  <!-- TODO: kontaktný formulár pridaný v issue #5 -->
</template>
