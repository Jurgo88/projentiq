// Google Analytics 4 s Consent Mode v2.
//
// Surový snippet z GA konzoly tu zámerne nie je: nastavuje cookies hneď pri
// načítaní, čím by obišiel lištu súhlasu aj to, čo sľubujú naše zásady.
// Namiesto toho deklarujeme súhlas ako odmietnutý ešte pred načítaním gtag.js
// a povolíme ho až kliknutím na „Prijať“ (useCookieConsent.ts).
//
// V stave „denied“ GA4 posiela len bezcookie pingy — meranie funguje
// v modelovanom režime, ale do prehliadača sa nič neukladá.

const GA_ID = 'G-XQZ0JDK8PQ'

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export default defineNuxtPlugin({
  name: 'gtag',
  setup() {
    // kto sledovanie odmietol, nemá dôvod gtag.js vôbec sťahovať
    if (localStorage.getItem(CONSENT_KEY) === 'no') return

    window.dataLayer = window.dataLayer || []

    // presne ako Google: do dataLayer patrí `arguments`, nie pole
    function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }

    const granted = localStorage.getItem(CONSENT_KEY) === 'yes'

    // musí ísť do dataLayer pred gtag.js, inak sa stihnú zapísať cookies
    gtag('consent', 'default', {
      analytics_storage: granted ? 'granted' : 'denied',
      // reklamné funkcie nepoužívame — zostávajú odmietnuté natrvalo
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    })

    gtag('js', new Date())
    gtag('config', GA_ID)

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    // Nuxt je po hydratácii SPA — gtag('config') pošle len úvodné zobrazenie,
    // ďalšie prechody musíme hlásiť ručne
    const router = useRouter()
    let lastPath = router.currentRoute.value.fullPath

    router.afterEach(async (to) => {
      if (to.fullPath === lastPath) return
      lastPath = to.fullPath
      await nextTick() // kým useHead prepíše <title>
      gtag('event', 'page_view', {
        page_location: window.location.href,
        page_title: document.title
      })
    })

    return {
      provide: {
        gtag: () => gtag
      }
    }
  }
})
