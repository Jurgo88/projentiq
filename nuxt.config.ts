// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/sitemap'
  ],

  css: ['~/assets/css/main.css'],

  icon: {
    provider: 'server',
    serverBundle: { collections: ['tabler'] }
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      meta: [{ name: 'theme-color', content: '#0a0a0f' }]
    }
  },

  site: {
    url: 'https://projentiq.com'
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },

  i18n: {
    baseUrl: 'https://projentiq.com',
    defaultLocale: 'sk',
    strategy: 'prefix_except_default',
    // spec časť 2: žiadny vynútený redirect/switch podľa Accept-Language —
    // jazyk si používateľ vyberá explicitne cez LangSwitcher
    detectBrowserLanguage: false,
    locales: [
      { code: 'sk', language: 'sk-SK', name: 'Slovensky', file: 'sk.json' },
      { code: 'cs', language: 'cs-CZ', name: 'Česky', file: 'cs.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ]
  }
})
