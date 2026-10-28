import type { PostHog } from 'posthog-js'

// posthog-js (~220 KB) sa načíta až po zobrazení stránky (onNuxtReady = po
// hydratácii, keď je prehliadač nečinný). Staticky importovaný bol v hlavnom
// JS balíku a na mobile odďaľoval vykreslenie (#8). Nastavenia ani správanie
// voči súhlasu sa nemenia — volania, ktoré prídu pred načítaním (napr.
// odmietnutie v lište), sa vykonajú hneď po ňom cez withPosthog().
export default defineNuxtPlugin({
  name: 'posthog',
  setup() {
    let client: PostHog | undefined
    const queue: ((posthog: PostHog) => void)[] = []

    function withPosthog(fn: (posthog: PostHog) => void) {
      if (client) fn(client)
      else queue.push(fn)
    }

    const router = useRouter()

    onNuxtReady(async () => {
      const { default: posthog } = await import('posthog-js')
      client = posthog.init('phc_rqJBqzYqxj8Gq3aASMmgJUUwNjVTPNTnWmMBX26n597W', {
        api_host: 'https://eu.i.posthog.com',
        defaults: '2026-05-30',
        capture_pageview: false,
        capture_pageleave: true,
        session_recording: {
          maskAllInputs: false,
          maskInputOptions: { password: true },
        },
      }) ?? posthog

      // čakajúce volania (súhlas, udalosti) pred prvým zobrazením stránky,
      // aby odmietnutie platilo už pre ňu
      for (const fn of queue.splice(0)) {
        try { fn(client) } catch {}
      }

      // úvodné zobrazenie — predtým ho zachytil afterEach pri prvej navigácii,
      // ktorá teraz prebehne skôr, než sa knižnica načíta
      posthog.capture('$pageview', { current_url: router.currentRoute.value.fullPath })
      router.afterEach((to) => {
        posthog.capture('$pageview', { current_url: to.fullPath })
      })
    })

    return {
      provide: {
        withPosthog
      }
    }
  }
})
