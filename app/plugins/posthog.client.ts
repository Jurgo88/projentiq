import posthog from 'posthog-js'

export default defineNuxtPlugin({
  name: 'posthog',
  async setup() {
    const posthogClient = posthog.init('phc_rqJBqzYqxj8Gq3aASMmgJUUwNjVTPNTnWmMBX26n597W', {
      api_host: 'https://eu.i.posthog.com',
      defaults: '2026-05-30',
      capture_pageview: false,
      capture_pageleave: true,
      // GDPR/ePrivacy: nič nezaznamenávať ani neukladať, kým návštevník
      // nedá súhlas v cookie lište (useCookieConsent → opt_in_capturing)
      opt_out_capturing_by_default: true,
      opt_out_persistence_by_default: true,
      session_recording: {
        maskAllInputs: false,
        maskInputOptions: { password: true },
      },
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
