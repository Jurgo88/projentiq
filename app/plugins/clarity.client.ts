// Microsoft Clarity — heatmapy a nahrávanie relácií.
//
// Surový snippet z Clarity konzoly tu zámerne nie je: spustil by nahrávanie
// hneď pri načítaní stránky, teda ešte pred rozhodnutím v lište súhlasu.
//
// Clarity je prísnejšie ako GA: kým GA v režime „denied“ posiela len
// bezcookie pingy, Clarity nahráva priebeh návštevy. Preto ho nenačítame
// vôbec, kým návštevník neklikne na „Prijať“ — súhlas je podmienkou, nie
// dodatočným prepínačom.

const CLARITY_ID = 'ym1o8dxiph'

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] }

declare global {
  interface Window {
    clarity: ClarityFn
  }
}

export default defineNuxtPlugin({
  name: 'clarity',
  setup() {
    let started = false

    function start() {
      if (started) return
      started = true

      // fronta pre volania, ktoré prídu skôr, než sa stihne stiahnuť knižnica
      if (!window.clarity) {
        const stub: ClarityFn = function () {
          // eslint-disable-next-line prefer-rest-params
          ;(stub.q = stub.q || []).push(arguments)
        }
        window.clarity = stub
      }

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
      document.head.appendChild(script)

      // Clarity má vlastný signál súhlasu — bez neho sa v projektoch
      // so zapnutým cookie consent nespustí nahrávanie
      window.clarity('consent')
    }

    function revoke() {
      try { window.clarity?.('consent', false) } catch {}
    }

    if (localStorage.getItem(CONSENT_KEY) === 'yes') start()

    return {
      provide: {
        clarity: () => ({ start, revoke })
      }
    }
  }
})
