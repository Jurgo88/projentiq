import posthog from 'posthog-js'

export default defineNuxtPlugin({
  name: 'posthog',
  async setup() {
    const runtimeConfig = useRuntimeConfig()

    const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
      api_host: runtimeConfig.public.posthogHost,
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
