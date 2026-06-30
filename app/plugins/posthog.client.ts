import posthog from 'posthog-js'

export default defineNuxtPlugin({
  name: 'posthog',
  async setup() {
    const posthogClient = posthog.init('phc_rqJBqzYqxj8Gq3aASMmgJUUwNjVTPNTnWmMBX26n597W', {
      api_host: 'https://eu.i.posthog.com',
      defaults: '2026-05-30',
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
