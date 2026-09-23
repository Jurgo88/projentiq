import type { Config, Context } from '@netlify/edge-functions'

// Smerovanie jazyka na holom "/". Angličtina je defaultLocale (nuxt.config.ts),
// takže žije priamo na / — presmerúvame len návštevníkov, ktorým patrí sk/cs.
//
// Beží zámerne LEN na "/": kto otvorí /sk/ alebo /privacy-policy/, dostane
// presne to, na čo klikol. Zdieľané odkazy musia zostať predvídateľné.

const PREFIXED = ['sk', 'cs']
const DEFAULT = 'en'
const COOKIE = 'projentiq_locale'
const BY_COUNTRY: Record<string, string> = { SK: 'sk', CZ: 'cs' }

// crawlery nepresmerúvame — na / majú vidieť x-default (EN),
// k ostatným mutáciám ich pustí hreflang
const BOT = /bot|crawler|spider|facebookexternalhit|slurp|bingpreview|duckduckbot|yandex|embedly|quora link preview|whatsapp|telegrambot|discordbot|linkedinbot/i

function fromAcceptLanguage(header: string | null): string | null {
  if (!header) return null

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      return { base: tag.toLowerCase().split('-')[0], q: q ? Number.parseFloat(q.split('=')[1]) : 1 }
    })
    .filter((l) => Number.isFinite(l.q))
    .sort((a, b) => b.q - a.q)

  for (const { base } of ranked) {
    if (base === DEFAULT || PREFIXED.includes(base)) return base
  }
  return null
}

export default async (request: Request, context: Context) => {
  if (BOT.test(request.headers.get('user-agent') ?? '')) return

  const chosen = context.cookies.get(COOKIE)

  const target =
    // 1. explicitná voľba v prepínači má absolútnu prednosť
    (chosen === DEFAULT || PREFIXED.includes(chosen ?? '') ? chosen : null) ??
    // 2. krajina — "Slovák dostane slovenčinu" platí aj s anglickým systémom,
    //    kde by Accept-Language vrátilo en s vyšším q než sk
    BY_COUNTRY[context.geo?.country?.code ?? ''] ??
    // 3. jazyk prehliadača — pokrýva Slováka/Čecha v zahraničí
    fromAcceptLanguage(request.headers.get('accept-language')) ??
    // 4. zvyšok sveta
    DEFAULT

  if (target === DEFAULT) return // angličtina žije na / — púšťame ďalej

  const url = new URL(request.url)
  url.pathname = `/${target}/`

  return new Response(null, {
    status: 302, // NIKDY 301 — odpoveď sa líši podľa návštevníka a prehliadač
    headers: {  //  by si trvalé presmerovanie uložil a prepínač by prestal fungovať
      location: url.toString(),
      'cache-control': 'no-store',
      vary: 'Accept-Language, Cookie, User-Agent'
    }
  })
}

export const config: Config = { path: '/' }
