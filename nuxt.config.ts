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

  // Bez explicitných defaults @nuxt/fonts žiada od Google Fonts iba hrúbku
  // 400 (+ kurzívu a všetky abecedy) a 600/700 prehliadač stučňuje umelo.
  // Inter aj JetBrains Mono sú variabilné — jeden súbor pokryje 400–700.
  fonts: {
    defaults: {
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext']
    }
  },

  icon: {
    provider: 'server',
    serverBundle: { collections: ['tabler'] }
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      meta: [{ name: 'theme-color', content: '#0a0a0f' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  // Netlify servíruje cs/index.html ako /cs/ a /cs presmeruje (301) —
  // canonical, hreflang, sitemap aj interné odkazy musia mať lomku na konci
  site: {
    url: 'https://projentiq.com',
    name: 'ProjentIQ',
    trailingSlash: true
  },

  experimental: {
    defaults: {
      nuxtLink: { trailingSlash: 'append' }
    }
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
    trailingSlash: true,
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
