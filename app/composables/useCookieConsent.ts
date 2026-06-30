const CONSENT_KEY = 'ph-consent'

export function useCookieConsent() {
  const { $posthog } = useNuxtApp()
  const showBanner = ref(false)

  onMounted(() => {
    showBanner.value = localStorage.getItem(CONSENT_KEY) === null
    // if user already declined in a previous visit, honour it in PostHog too
    if (localStorage.getItem(CONSENT_KEY) === 'no') {
      try { $posthog()?.opt_out_capturing() } catch {}
    }
  })

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'yes')
    try { $posthog()?.opt_in_capturing() } catch {}
    showBanner.value = false
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'no')
    try { $posthog()?.opt_out_capturing() } catch {}
    showBanner.value = false
  }

  return { showBanner, accept, decline }
}
