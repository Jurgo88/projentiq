<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('meta.title'),
  description: t('meta.description')
})
</script>

<template>
  <HeroSection />
  <!-- TODO: ďalšie sekcie pridané v ďalších fázach (issue #4) -->
</template>
