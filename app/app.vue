<script setup lang="ts">
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
    <a href="#main" class="skip-link">Preskočiť na obsah</a>
    <NuxtLayout>
      <main id="main">
        <NuxtPage />
      </main>
    </NuxtLayout>
  </div>
</template>
