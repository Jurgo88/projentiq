const CONSENT_KEY = 'ph-consent'

export function useCookieConsent() {
  const { $posthog } = useNuxtApp()
  // zdieľaný stav — reset() z inej stránky musí otvoriť lištu v CookieConsent
  const showBanner = useState('cookie-consent-banner', () => false)

  onMounted(() => {
    showBanner.value = localStorage.getItem(CONSENT_KEY) === null
    // if user already declined in a previous visit, honour it in PostHog too
    if (localStorage.getItem(CONSENT_KEY) === 'no') {
      try { $posthog()?.opt_out_capturing() } catch {}
    }
  })

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'yes')
    try {
      $posthog()?.opt_in_capturing()
      // PostHog je do súhlasu vypnutý, pageview aktuálnej stránky sa nezachytil
      $posthog()?.capture('$pageview', { current_url: window.location.pathname })
    } catch {}
    showBanner.value = false
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'no')
    try { $posthog()?.opt_out_capturing() } catch {}
    showBanner.value = false
  }

  // odvolanie/zmena súhlasu (stránka ochrany osobných údajov) — zabudne voľbu
  // a znovu zobrazí lištu
  function reset() {
    localStorage.removeItem(CONSENT_KEY)
    try { $posthog()?.opt_out_capturing() } catch {}
    showBanner.value = true
  }

  return { showBanner, accept, decline, reset }
}
