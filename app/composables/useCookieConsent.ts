export const CONSENT_KEY = 'ph-consent'

export function useCookieConsent() {
  const { $posthog, $gtag } = useNuxtApp()
  // zdieľaný stav — reset() z inej stránky musí otvoriť lištu v CookieConsent
  const showBanner = useState('cookie-consent-banner', () => false)

  onMounted(() => {
    showBanner.value = localStorage.getItem(CONSENT_KEY) === null
    // if user already declined in a previous visit, honour it in PostHog too
    if (localStorage.getItem(CONSENT_KEY) === 'no') {
      try { $posthog()?.opt_out_capturing() } catch {}
    }
  })

  // GA4 beží v Consent Mode — až tento update mu povolí zapisovať cookies
  function setGtagConsent(state: 'granted' | 'denied') {
    try { $gtag?.()?.('consent', 'update', { analytics_storage: state }) } catch {}
  }

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'yes')
    try { $posthog()?.opt_in_capturing() } catch {}
    setGtagConsent('granted')
    showBanner.value = false
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'no')
    try { $posthog()?.opt_out_capturing() } catch {}
    setGtagConsent('denied')
    showBanner.value = false
  }

  // zmena voľby (stránka ochrany osobných údajov) — zabudne voľbu
  // a znovu zobrazí lištu
  function reset() {
    localStorage.removeItem(CONSENT_KEY)
    showBanner.value = true
  }

  return { showBanner, accept, decline, reset }
}
