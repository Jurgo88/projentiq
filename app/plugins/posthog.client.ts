import posthog from 'posthog-js'

export default defineNuxtPlugin({
  name: 'posthog',
  async setup() {
    const posthogClient = posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_HOST,
      capture_pageview: false,
      capture_pageleave: true,
      loaded: (ph) => {
        if (import.meta.dev) ph.debug()
      }
    })

    const router = useRouter()
    router.afterEach((to) => {
      posthog.capture('$pageview', { current_url: to.fullPath })
    })

    return {
      provide: {
        posthog: () => posthogClient
      }
    }
  }
})
