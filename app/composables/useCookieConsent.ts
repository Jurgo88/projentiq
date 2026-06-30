export function useCookieConsent() {
  const { $posthog } = useNuxtApp()
  const showBanner = ref(false)

  onMounted(() => {
    const ph = $posthog()
    showBanner.value = !ph.has_opted_in_capturing() && !ph.has_opted_out_capturing()
  })

  function accept() {
    $posthog().opt_in_capturing()
    showBanner.value = false
  }

  function decline() {
    $posthog().opt_out_capturing()
    showBanner.value = false
  }

  return { showBanner, accept, decline }
}
