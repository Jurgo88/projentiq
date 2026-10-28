<script setup lang="ts">
const { t } = useI18n()
const i18nHead = useLocaleHead({ addSeoAttributes: true })
const colorMode = useColorMode()

// i18n generuje root ako "https://projentiq.com" bez lomky — zjednotiť so
// sitemapou a ostatnými jazykmi (canonical/hreflang/og:url s lomkou na konci)
const SITE_URL = 'https://projentiq.com'
const withRootSlash = (value?: string) => (value === SITE_URL ? `${SITE_URL}/` : value)

useHead({
  htmlAttrs: computed(() => i18nHead.value.htmlAttrs),
  link: computed(() => i18nHead.value.link.map((l) => ({ ...l, href: withRootSlash(l.href) }))),
  meta: computed(() => i18nHead.value.meta.map((m) => ({ ...m, content: withRootSlash(m.content) })))
})

// farba lišty prehliadača na mobile = pozadie aktuálnej témy (--color-bg),
// nie systémová preferencia — web je predvolene tmavý (nuxt.config.ts → colorMode)
useHead({
  meta: [{ name: 'theme-color', content: () => (colorMode.value === 'light' ? '#ffffff' : '#07070b') }]
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
