<script setup lang="ts">
const { t } = useI18n()
const i18nHead = useLocaleHead({ addSeoAttributes: true })

useHead({
  htmlAttrs: computed(() => i18nHead.value.htmlAttrs),
  link: computed(() => i18nHead.value.link),
  meta: computed(() => i18nHead.value.meta)
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <a href="#main-content" class="skip-link">{{ t('a11y.skip_link') }}</a>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
