<script setup lang="ts">
defineI18nRoute({
  paths: {
    sk: '/ai-agenti',
    cs: '/ai-agenti',
    en: '/ai-agents'
  }
})

const { locale } = useI18n()
const content = computed(() => AI_AGENTS[locale.value as ServiceLandingLocale] ?? AI_AGENTS.en)

// AI agenti = karta 1 v utils/pricing.ts
const AGENTS_SERVICE_ID = 1
</script>

<template>
  <ServiceLanding :content="content" :service-id="AGENTS_SERVICE_ID">
    <template #demo>
      <LazyDemosDemoAutomation />
    </template>
  </ServiceLanding>
</template>
