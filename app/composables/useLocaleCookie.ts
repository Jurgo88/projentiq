// Zapamätá si jazyk, ktorý používateľ vybral v prepínači. Číta ho
// netlify/edge-functions/locale-router.ts a explicitná voľba tam prebíja
// geolokáciu aj Accept-Language — bez tohto by edge function vracala
// návštevníka späť na automaticky zvolenú mutáciu pri každej návšteve "/".
//
// Funkčná cookie: zapisuje sa výlučne na priamy úkon používateľa,
// nepodlieha súhlasu podľa ePrivacy. Je uvedená v zásadách (privacy-content.ts).
export const LOCALE_COOKIE = 'projentiq_locale'

export function useLocaleCookie() {
  const cookie = useCookie<string | null>(LOCALE_COOKIE, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/'
  })

  // voláme z @click na jazykovom odkaze, pred samotnou navigáciou
  function remember(code: string) {
    cookie.value = code
  }

  return { remember }
}
