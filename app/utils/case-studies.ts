// Referencie (prípadové štúdie). Nový projekt = nový záznam v poli —
// podstránka aj karta na úvodnej stránke sa vygenerujú samé.
//
// Klient je zámerne anonymný: bez názvu produktu a bez odkazu naň.
// Čísla sú reálne (DB + Netlify/cloud metriky). Nevymýšľať, len aktualizovať.

export type CaseStudyLocale = 'sk' | 'cs' | 'en'

export interface CaseStudyContent {
  title: string
  lead: string
  cardLead: string
  metrics: { value: string; label: string }[]
  brief: string
  delivered: { title: string; text: string }[]
  processLead: string
  process: { title: string; text: string }[]
  stack: string[]
}

export interface CaseStudy {
  slug: string
  icon: string
  datePublished: string
  processIcons: string[]
  content: Record<CaseStudyLocale, CaseStudyContent>
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'subscription-pwa',
    icon: 'tabler:device-mobile',
    datePublished: '2026-09-25',
    processIcons: ['tabler:file-description', 'tabler:code', 'tabler:shield-check', 'tabler:user-check'],
    content: {
      sk: {
        title: 'Predplatiteľská webová aplikácia pre zahraničného klienta',
        lead: 'Od zadania po produkčnú prevádzku: aplikácia s dvoma typmi používateľov, predplatným, komunikáciou v reálnom čase a moderovaním obsahu, ktorú si ľudia inštalujú priamo do telefónu.',
        cardLead: 'Mobilná aplikácia s predplatným, komunikáciou v reálnom čase a administráciou, vyvíjaná s AI agentmi. 1000+ používateľov zo 70+ krajín za prvý týždeň prevádzky.',
        metrics: [
          { value: '1000+', label: 'používateľov za prvý týždeň prevádzky' },
          { value: '70+', label: 'krajín' },
          { value: '110 000+', label: 'spracovaných requestov za 24 hodín (API a cloud)' },
          { value: '99,8 %', label: 'úspešnosť API volaní' }
        ],
        brief: 'Klient potreboval aplikáciu, v ktorej sa spájajú dva typy používateľov a navzájom na seba reagujú v reálnom čase. Mala fungovať na mobile ako natívna aplikácia, zarábať cez predplatné a dať klientovi nástroje na správu používateľov a moderovanie obsahu.',
        delivered: [
          { title: 'Real-time vrstva', text: 'Zmeny stavu sa cez WebSocket kanály (broadcast) okamžite prenesú ku všetkým, ktorí ich sledujú. Online stav používateľov (presence), živé chaty a živý feed udalostí na verejných stránkach.' },
          { title: 'Progresívna webová aplikácia (PWA)', text: 'Service worker s offline cache, inštalácia do telefónu, push notifikácie cez Web Push.' },
          { title: 'Predplatné a platby', text: 'Stripe Checkout, mesačný aj ročný plán, spracovanie udalostí cez overené webhooky. Kartové údaje neprechádzajú našimi servermi.' },
          { title: 'Hybridný rendering', text: 'Verejné stránky sa predgenerujú alebo renderujú na serveri s cache na edge CDN, súkromná časť beží ako SPA mimo indexu vyhľadávačov.' },
          { title: 'Administrácia', text: 'Tri úrovne oprávnení, správa používateľov, moderovanie nahlásení, audit log a prehľad tržieb.' },
          { title: 'Bezpečnosť', text: 'Prístup k dátam vynucuje priamo databáza (row-level security), zápisy idú len cez overené serverové API. Rate limiting je uložený v databáze, takže funguje aj pri serverless architektúre.' }
        ],
        processLead: 'AI agentov sme zapojili do každej fázy vývoja. Rozhodnutia ostali na človeku.',
        process: [
          { title: 'Špecifikácia', text: 'Každú časť systému sme najprv popísali štruktúrovanou špecifikáciou. Tá je pre AI agentov kontextom, z ktorého pri práci vychádzajú.' },
          { title: 'Implementácia', text: 'Agenti píšu kód podľa špecifikácie a zadania úlohy, v rámci jasne danej architektúry.' },
          { title: 'Kontrola', text: 'Každú zmenu automaticky posúdi jazykový model v CI/CD pipeline. Bezpečnosť databázy a API preveril samostatný audit s AI a regresné testy strážia, aby sa nájdené chyby nevrátili.' },
          { title: 'Schválenie', text: 'Do produkcie ide len to, čo prejde ľudskou kontrolou vývojára.' }
        ],
        stack: ['Nuxt', 'TypeScript', 'Cloud (PostgreSQL, real-time, autentifikácia, úložisko)', 'Serverless funkcie', 'Edge CDN', 'Stripe', 'Web Push', 'AI agenti']
      },
      cs: {
        title: 'Předplatitelská webová aplikace pro zahraničního klienta',
        lead: 'Od zadání po produkční provoz: aplikace se dvěma typy uživatelů, předplatným, komunikací v reálném čase a moderováním obsahu, kterou si lidé instalují přímo do telefonu.',
        cardLead: 'Mobilní aplikace s předplatným, komunikací v reálném čase a administrací, vyvíjená s AI agenty. 1000+ uživatelů ze 70+ zemí za první týden provozu.',
        metrics: [
          { value: '1000+', label: 'uživatelů za první týden provozu' },
          { value: '70+', label: 'zemí' },
          { value: '110 000+', label: 'zpracovaných requestů za 24 hodin (API a cloud)' },
          { value: '99,8 %', label: 'úspěšnost API volání' }
        ],
        brief: 'Klient potřeboval aplikaci, ve které se propojují dva typy uživatelů a navzájem na sebe reagují v reálném čase. Měla fungovat na mobilu jako nativní aplikace, vydělávat přes předplatné a dát klientovi nástroje pro správu uživatelů a moderování obsahu.',
        delivered: [
          { title: 'Real-time vrstva', text: 'Změny stavu se přes WebSocket kanály (broadcast) okamžitě přenesou ke všem, kdo je sledují. Online stav uživatelů (presence), živé chaty a živý feed událostí na veřejných stránkách.' },
          { title: 'Progresivní webová aplikace (PWA)', text: 'Service worker s offline cache, instalace do telefonu, push notifikace přes Web Push.' },
          { title: 'Předplatné a platby', text: 'Stripe Checkout, měsíční i roční plán, zpracování událostí přes ověřené webhooky. Údaje o kartách neprocházejí našimi servery.' },
          { title: 'Hybridní rendering', text: 'Veřejné stránky se předgenerují nebo renderují na serveru s cache na edge CDN, soukromá část běží jako SPA mimo index vyhledávačů.' },
          { title: 'Administrace', text: 'Tři úrovně oprávnění, správa uživatelů, moderování nahlášení, audit log a přehled tržeb.' },
          { title: 'Bezpečnost', text: 'Přístup k datům vynucuje přímo databáze (row-level security), zápisy jdou jen přes ověřené serverové API. Rate limiting je uložený v databázi, takže funguje i při serverless architektuře.' }
        ],
        processLead: 'AI agenty jsme zapojili do každé fáze vývoje. Rozhodnutí zůstala na člověku.',
        process: [
          { title: 'Specifikace', text: 'Každou část systému jsme nejprve popsali strukturovanou specifikací. Ta je pro AI agenty kontextem, ze kterého při práci vycházejí.' },
          { title: 'Implementace', text: 'Agenti píší kód podle specifikace a zadání úkolu, v rámci jasně dané architektury.' },
          { title: 'Kontrola', text: 'Každou změnu automaticky posoudí jazykový model v CI/CD pipeline. Bezpečnost databáze a API prověřil samostatný audit s AI a regresní testy hlídají, aby se nalezené chyby nevrátily.' },
          { title: 'Schválení', text: 'Do produkce jde jen to, co projde lidskou kontrolou vývojáře.' }
        ],
        stack: ['Nuxt', 'TypeScript', 'Cloud (PostgreSQL, real-time, autentizace, úložiště)', 'Serverless funkce', 'Edge CDN', 'Stripe', 'Web Push', 'AI agenti']
      },
      en: {
        title: 'Subscription web app for an international client',
        lead: 'From brief to production: an app with two types of users, subscriptions, real-time communication and content moderation, installed by people straight to their phones.',
        cardLead: 'A mobile app with subscriptions, real-time communication and an admin panel, built with AI agents. 1,000+ users from 70+ countries in the first week of operation.',
        metrics: [
          { value: '1,000+', label: 'users in the first week of operation' },
          { value: '70+', label: 'countries' },
          { value: '110,000+', label: 'requests processed in 24 hours (API and cloud)' },
          { value: '99.8%', label: 'API call success rate' }
        ],
        brief: 'The client needed an app that connects two types of users who react to each other in real time. It had to work on mobile like a native app, earn through subscriptions and give the client tools to manage users and moderate content.',
        delivered: [
          { title: 'Real-time layer', text: 'State changes reach everyone watching instantly over WebSocket channels (broadcast). User online status (presence), live chats and a live event feed on public pages.' },
          { title: 'Progressive web app (PWA)', text: 'Service worker with offline cache, installable to the phone, push notifications via Web Push.' },
          { title: 'Subscriptions and payments', text: 'Stripe Checkout, monthly and yearly plans, events processed through verified webhooks. Card data never touches our servers.' },
          { title: 'Hybrid rendering', text: 'Public pages are prerendered or server-rendered with edge CDN caching; the private area runs as an SPA outside search indexes.' },
          { title: 'Admin panel', text: 'Three permission levels, user management, report moderation, an audit log and a revenue overview.' },
          { title: 'Security', text: 'Data access is enforced by the database itself (row-level security); writes go only through the verified server API. Rate limiting lives in the database, so it works in a serverless architecture too.' }
        ],
        processLead: 'We brought AI agents into every phase of development. Decisions stayed with a human.',
        process: [
          { title: 'Specification', text: 'We first described every part of the system in a structured specification. It is the context the AI agents work from.' },
          { title: 'Implementation', text: 'Agents write code from the specification and the task brief, within a clearly defined architecture.' },
          { title: 'Review', text: 'A language model automatically reviews every change in the CI/CD pipeline. A separate AI-assisted audit checked database and API security, and regression tests make sure the issues found stay fixed.' },
          { title: 'Approval', text: 'Only what passes the developer’s human review goes to production.' }
        ],
        stack: ['Nuxt', 'TypeScript', 'Cloud (PostgreSQL, real-time, auth, storage)', 'Serverless functions', 'Edge CDN', 'Stripe', 'Web Push', 'AI agents']
      }
    }
  }
]

export function findCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
