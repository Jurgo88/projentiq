// Text zásad ochrany osobných údajov. Je mimo i18n JSON, lebo vue-i18n
// interpretuje znaky ako @ a | (e-maily, zoznamy) ako syntax správ.
//
// Obsah zodpovedá tomu, čo web reálne robí: Netlify Forms (kontaktný
// formulár), Netlify + Cloudflare (hosting/CDN), PostHog EU (analytika
// a nahrávanie relácií, iba so súhlasom), localStorage (voľba súhlasu, téma).
// Pri zmene nástrojov treba text aktualizovať aj s dátumom účinnosti.

export const PRIVACY_EFFECTIVE_DATE = '2026-09-22'

export interface PrivacySection {
  heading: string
  paragraphs?: string[]
  items?: string[]
}

const c = COMPANY
const operator = `${c.legalName}, ${c.street}, ${c.postalCode} ${c.city}`

export const PRIVACY_CONTENT: Record<string, PrivacySection[]> = {
  sk: [
    {
      heading: '1. Prevádzkovateľ',
      paragraphs: [
        `Prevádzkovateľom webu projentiq.com a značky ${c.brand} je ${operator}, IČO: ${c.ico}, DIČ: ${c.dic}, zapísaná v Obchodnom registri Okresného súdu Nitra, oddiel Sro, vložka č. 59882/N.`,
        `V otázkach ochrany osobných údajov nás kontaktujte na ${c.email}. Zodpovednú osobu sme nevymenovali, keďže nám to právne predpisy neukladajú.`
      ]
    },
    {
      heading: '2. Kontaktný formulár a e-mailová komunikácia',
      paragraphs: [
        'Ak nás kontaktujete cez formulár alebo e-mailom, spracúvame údaje, ktoré nám poskytnete: meno, názov firmy, e-mailovú adresu a obsah správy.',
        'Účel: vybavenie vášho dopytu, príprava ukážky (dema) a prípadnej ponuky. Právny základ: váš súhlas (čl. 6 ods. 1 písm. a) GDPR) a vykonanie opatrení pred uzavretím zmluvy na vašu žiadosť (čl. 6 ods. 1 písm. b) GDPR).',
        'Doba uchovávania: počas vybavovania dopytu a najdlhšie 2 roky od poslednej komunikácie. Ak uzavrieme zmluvu, údaje uchovávame počas jej trvania a v lehotách, ktoré vyžadujú právne predpisy (napr. účtovné a daňové).'
      ]
    },
    {
      heading: '3. Analytika a nahrávanie relácií (iba so súhlasom)',
      paragraphs: [
        'Ak v lište na webe kliknete na „Prijať“, používame nástroj PostHog na meranie návštevnosti a zlepšovanie webu. Zaznamenáva navštívené stránky, interakcie (kliknutia, posun stránky), typ zariadenia a prehliadača, približnú polohu odvodenú z IP adresy a anonymný identifikátor návštevníka.',
        'Súčasťou je aj nahrávanie relácie (záznam priebehu návštevy). Záznam môže obsahovať aj text zadaný do kontaktného formulára; heslá sa nezaznamenávajú.',
        'Právny základ: váš súhlas (čl. 6 ods. 1 písm. a) GDPR a § 109 ods. 8 zákona o elektronických komunikáciách). Bez súhlasu sa PostHog nespustí a neukladá nič do vášho zariadenia. Súhlas môžete kedykoľvek odvolať tlačidlom nižšie; odvolanie nemá vplyv na zákonnosť spracúvania pred ním.',
        'Doba uchovávania: najdlhšie 12 mesiacov. Údaje sú uložené v dátovom centre PostHog v EÚ.'
      ]
    },
    {
      heading: '4. Cookies a úložisko v prehliadači',
      items: [
        'ph-consent (localStorage, nevyhnutné): pamätá si vašu voľbu v cookie lište, bez expirácie.',
        'nuxt-color-mode (localStorage, nevyhnutné): pamätá si zvolený svetlý alebo tmavý režim, bez expirácie.',
        'ph_… (cookie a localStorage, analytické, iba so súhlasom): identifikátor návštevníka a relácie nástroja PostHog, platnosť do 1 roka.'
      ],
      paragraphs: [
        'Úložisko môžete kedykoľvek vymazať v nastaveniach prehliadača.'
      ]
    },
    {
      heading: '5. Príjemcovia a sprostredkovatelia',
      items: [
        'Netlify, Inc. (USA): hosting webu a príjem správ z kontaktného formulára.',
        'Cloudflare, Inc. (USA): doručovanie obsahu (CDN) a ochrana webu pred útokmi.',
        'PostHog Inc.: analytika a nahrávanie relácií, údaje uložené v EÚ (iba so súhlasom).',
        'Poskytovateľ e-mailových služieb, prostredníctvom ktorého s vami komunikujeme.'
      ],
      paragraphs: [
        'Pri prenose do USA sa spoliehame na rozhodnutie Európskej komisie o primeranosti (EU–US Data Privacy Framework) alebo na štandardné zmluvné doložky. Osobné údaje nepredávame a nepoužívame na automatizované rozhodovanie ani profilovanie s právnymi účinkami.'
      ]
    },
    {
      heading: '6. Vaše práva',
      items: [
        'prístup k osobným údajom a získanie ich kópie,',
        'oprava nesprávnych údajov,',
        'vymazanie („právo na zabudnutie“),',
        'obmedzenie spracúvania,',
        'prenosnosť údajov,',
        'namietanie proti spracúvaniu,',
        'kedykoľvek odvolať udelený súhlas.'
      ],
      paragraphs: [
        `Práva si môžete uplatniť e-mailom na ${c.email}. Odpovieme bez zbytočného odkladu, najneskôr do jedného mesiaca.`,
        'Máte tiež právo podať sťažnosť dozornému orgánu: Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava, dataprotection.gov.sk, alebo dozornému orgánu v štáte vášho bydliska.'
      ]
    }
  ],

  cs: [
    {
      heading: '1. Správce',
      paragraphs: [
        `Provozovatelem webu projentiq.com a značky ${c.brand} je ${operator}, Slovenská republika, IČO: ${c.ico}, DIČ: ${c.dic}, zapsaná v obchodním rejstříku Okresního soudu Nitra, oddíl Sro, vložka č. 59882/N.`,
        `V otázkách ochrany osobních údajů nás kontaktujte na ${c.email}. Pověřence pro ochranu osobních údajů jsme nejmenovali, protože nám to právní předpisy neukládají.`
      ]
    },
    {
      heading: '2. Kontaktní formulář a e-mailová komunikace',
      paragraphs: [
        'Pokud nás kontaktujete přes formulář nebo e-mailem, zpracováváme údaje, které nám poskytnete: jméno, název firmy, e-mailovou adresu a obsah zprávy.',
        'Účel: vyřízení vašeho dotazu, příprava ukázky (dema) a případné nabídky. Právní základ: váš souhlas (čl. 6 odst. 1 písm. a) GDPR) a provedení opatření před uzavřením smlouvy na vaši žádost (čl. 6 odst. 1 písm. b) GDPR).',
        'Doba uchování: po dobu vyřizování dotazu a nejdéle 2 roky od poslední komunikace. Pokud uzavřeme smlouvu, údaje uchováváme po dobu jejího trvání a ve lhůtách, které vyžadují právní předpisy (např. účetní a daňové).'
      ]
    },
    {
      heading: '3. Analytika a nahrávání relací (pouze se souhlasem)',
      paragraphs: [
        'Pokud v liště na webu kliknete na „Přijmout“, používáme nástroj PostHog k měření návštěvnosti a zlepšování webu. Zaznamenává navštívené stránky, interakce (kliknutí, posun stránky), typ zařízení a prohlížeče, přibližnou polohu odvozenou z IP adresy a anonymní identifikátor návštěvníka.',
        'Součástí je i nahrávání relace (záznam průběhu návštěvy). Záznam může obsahovat i text zadaný do kontaktního formuláře; hesla se nezaznamenávají.',
        'Právní základ: váš souhlas (čl. 6 odst. 1 písm. a) GDPR a pravidla pro ukládání údajů do koncového zařízení). Bez souhlasu se PostHog nespustí a do vašeho zařízení nic neukládá. Souhlas můžete kdykoli odvolat tlačítkem níže; odvolání nemá vliv na zákonnost zpracování před ním.',
        'Doba uchování: nejdéle 12 měsíců. Údaje jsou uloženy v datovém centru PostHog v EU.'
      ]
    },
    {
      heading: '4. Cookies a úložiště v prohlížeči',
      items: [
        'ph-consent (localStorage, nezbytné): pamatuje si vaši volbu v cookie liště, bez expirace.',
        'nuxt-color-mode (localStorage, nezbytné): pamatuje si zvolený světlý nebo tmavý režim, bez expirace.',
        'ph_… (cookie a localStorage, analytické, pouze se souhlasem): identifikátor návštěvníka a relace nástroje PostHog, platnost až 1 rok.'
      ],
      paragraphs: [
        'Úložiště můžete kdykoli vymazat v nastavení prohlížeče.'
      ]
    },
    {
      heading: '5. Příjemci a zpracovatelé',
      items: [
        'Netlify, Inc. (USA): hosting webu a příjem zpráv z kontaktního formuláře.',
        'Cloudflare, Inc. (USA): doručování obsahu (CDN) a ochrana webu před útoky.',
        'PostHog Inc.: analytika a nahrávání relací, údaje uložené v EU (pouze se souhlasem).',
        'Poskytovatel e-mailových služeb, jehož prostřednictvím s vámi komunikujeme.'
      ],
      paragraphs: [
        'Při předávání do USA se spoléháme na rozhodnutí Evropské komise o odpovídající ochraně (EU–US Data Privacy Framework) nebo na standardní smluvní doložky. Osobní údaje neprodáváme a nepoužíváme k automatizovanému rozhodování ani profilování s právními účinky.'
      ]
    },
    {
      heading: '6. Vaše práva',
      items: [
        'přístup k osobním údajům a získání jejich kopie,',
        'oprava nesprávných údajů,',
        'výmaz („právo být zapomenut“),',
        'omezení zpracování,',
        'přenositelnost údajů,',
        'vznesení námitky proti zpracování,',
        'kdykoli odvolat udělený souhlas.'
      ],
      paragraphs: [
        `Práva můžete uplatnit e-mailem na ${c.email}. Odpovíme bez zbytečného odkladu, nejpozději do jednoho měsíce.`,
        'Máte také právo podat stížnost u dozorového úřadu: Úrad na ochranu osobných údajov Slovenskej republiky (dataprotection.gov.sk), nebo u úřadu ve státě vašeho bydliště, v České republice Úřad pro ochranu osobních údajů (uoou.gov.cz).'
      ]
    }
  ],

  en: [
    {
      heading: '1. Controller',
      paragraphs: [
        `The website projentiq.com and the ${c.brand} brand are operated by ${operator}, Slovakia, Company ID (IČO): ${c.ico}, Tax ID (DIČ): ${c.dic}, registered in the Commercial Register of the District Court of Nitra, section Sro, file no. 59882/N.`,
        `For any data protection questions, contact us at ${c.email}. We have not appointed a Data Protection Officer, as we are not legally required to.`
      ]
    },
    {
      heading: '2. Contact form and email communication',
      paragraphs: [
        'When you contact us via the form or by email, we process the data you provide: your name, company name, email address, and the content of your message.',
        'Purpose: handling your request and preparing a demo and, where relevant, a quote. Legal basis: your consent (Art. 6(1)(a) GDPR) and steps taken at your request prior to entering into a contract (Art. 6(1)(b) GDPR).',
        'Retention: while we handle your request and for no longer than 2 years after our last communication. If we enter into a contract, we keep the data for its duration and for the periods required by law (e.g. accounting and tax).'
      ]
    },
    {
      heading: '3. Analytics and session recording (consent only)',
      paragraphs: [
        'If you click “Accept” in the banner, we use PostHog to measure traffic and improve the website. It records visited pages, interactions (clicks, scrolling), device and browser type, approximate location derived from your IP address, and an anonymous visitor identifier.',
        'This includes session recording (a replay of your visit). A recording may include text typed into the contact form; passwords are never recorded.',
        'Legal basis: your consent (Art. 6(1)(a) GDPR and the ePrivacy rules on storing data on your device). Without consent, PostHog does not run and stores nothing on your device. You can withdraw consent at any time using the button below; withdrawal does not affect the lawfulness of processing before it.',
        'Retention: no longer than 12 months. Data is stored in PostHog’s EU data center.'
      ]
    },
    {
      heading: '4. Cookies and browser storage',
      items: [
        'ph-consent (localStorage, strictly necessary): remembers your choice in the cookie banner, no expiry.',
        'nuxt-color-mode (localStorage, strictly necessary): remembers your light or dark mode preference, no expiry.',
        'ph_… (cookie and localStorage, analytics, consent only): PostHog visitor and session identifier, valid for up to 1 year.'
      ],
      paragraphs: [
        'You can clear this storage at any time in your browser settings.'
      ]
    },
    {
      heading: '5. Recipients and processors',
      items: [
        'Netlify, Inc. (USA): website hosting and receiving contact form submissions.',
        'Cloudflare, Inc. (USA): content delivery (CDN) and protection against attacks.',
        'PostHog Inc.: analytics and session recording, data stored in the EU (consent only).',
        'The email service provider we use to communicate with you.'
      ],
      paragraphs: [
        'For transfers to the USA, we rely on the European Commission’s adequacy decision (EU–US Data Privacy Framework) or standard contractual clauses. We do not sell personal data or use it for automated decision-making or profiling with legal effects.'
      ]
    },
    {
      heading: '6. Your rights',
      items: [
        'access your personal data and obtain a copy,',
        'rectify inaccurate data,',
        'erasure (“right to be forgotten”),',
        'restrict processing,',
        'data portability,',
        'object to processing,',
        'withdraw your consent at any time.'
      ],
      paragraphs: [
        `You can exercise your rights by emailing ${c.email}. We will respond without undue delay and within one month at the latest.`,
        'You also have the right to lodge a complaint with a supervisory authority: the Office for Personal Data Protection of the Slovak Republic (dataprotection.gov.sk), or the authority in your country of residence.'
      ]
    }
  ]
}
