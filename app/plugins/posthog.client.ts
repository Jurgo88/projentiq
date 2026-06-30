import posthog from 'posthog-js'

export default defineNuxtPlugin({
  name: 'posthog',
  async setup() {
    console.log('[PostHog] plugin setup starting')

    const posthogClient = posthog.init('phc_rqJBqzYqxj8Gq3aASMmgJUUwNjVTPNTnWmMBX26n597W', {
      api_host: 'https://eu.i.posthog.com',
      defaults: '2026-05-30',
      capture_pageview: false,
      capture_pageleave: true,
      loaded: (ph) => {
        console.log('[PostHog] loaded OK, distinct_id:', ph.get_distinct_id())
        if (import.meta.dev) ph.debug()
      }
    })

    console.log('[PostHog] init returned:', posthogClient)
    console.log('[PostHog] posthog.__loaded:', posthog.__loaded)

    const router = useRouter()
    router.afterEach((to) => {
      console.log('[PostHog] capturing $pageview for:', to.fullPath)
      posthog.capture('$pageview', { current_url: to.fullPath })
    })

    return {
      provide: {
        posthog: () => posthogClient
      }
    }
  }
})
