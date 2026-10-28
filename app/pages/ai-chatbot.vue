<script setup lang="ts">
defineI18nRoute({
  paths: {
    sk: '/ai-chatbot-pre-firmy',
    cs: '/ai-chatbot-pro-firmy',
    en: '/ai-chatbot-for-business'
  }
})

const { locale } = useI18n()
const content = computed(() => KNOWLEDGE_ASSISTANT[locale.value as ServiceLandingLocale] ?? KNOWLEDGE_ASSISTANT.en)

// RAG znalostné systémy = karta 2 v utils/pricing.ts
const RAG_SERVICE_ID = 2
</script>

<template>
  <ServiceLanding :content="content" :service-id="RAG_SERVICE_ID">
    <template #demo>
      <LazyDemosDemoRagChat />
    </template>
  </ServiceLanding>
</template>
