// Blog. Nový článok = nový záznam v poli (najnovší hore) — zoznam aj detail
// sa vygenerujú samé. Ikony píš ako celé reťazce 'tabler:…' (clientBundle scan).

export type BlogLocale = 'sk' | 'cs' | 'en'

export interface BlogSection {
  heading: string
  paragraphs?: string[]
  items?: { title?: string; text: string }[]
}

export interface BlogPostContent {
  title: string
  perex: string
  sections: BlogSection[]
  // Zvýraznený záverečný odsek pod sekciami (bez nadpisu).
  takeaway?: string
}

export interface BlogPost {
  slug: string
  datePublished: string
  readingMinutes: number
  image: string
  imageAlt: Record<BlogLocale, string>
  tags: string[]
  content: Record<BlogLocale, BlogPostContent>
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ai-code-security',
    datePublished: '2026-09-27',
    readingMinutes: 4,
    image: '/blog/ai-code-security.png',
    imageAlt: {
      sk: 'AI: „Kód je bezpečný. Všetko je v poriadku.“ AI vidí kód. Nevidí celú aplikáciu.',
      cs: 'AI: „Kód je bezpečný. Všetko je v pořádku.“ AI vidí kód. Nevidí celou aplikaci.',
      en: 'AI: “The code is secure. Everything is fine.” AI sees the code. It doesn’t see the whole application.'
    },
    tags: ['AI', 'Security', 'Supabase'],
    content: {
      sk: {
        title: 'AI povedala, že je kód bezpečný. Prečo jej to nestačí veriť',
        perex: 'AI nástroje dnes píšu a kontrolujú veľkú časť kódu. Sú rýchle a často presné. Keď však napíšu „bezpečnostné problémy som nenašiel“, znamená to len to, že ich nenašli v tom, čo videli.',
        sections: [
          {
            heading: 'Čo AI vidí a čo nie',
            paragraphs: ['Jazykový model hodnotí kód, ktorý dostane do kontextu. Mimo jeho zorného poľa často ostáva:'],
            items: [
              { text: 'konfigurácia databázy a prístupové pravidlá nastavené mimo repozitára,' },
              { text: 'nastavenia cloudových služieb, kľúče a oprávnenia,' },
              { text: 'správanie bežiacej aplikácie: čo reálne vráti server, keď príde nečakaná požiadavka.' }
            ]
          },
          {
            heading: 'Najčastejšia slepá škvrna: oprávnenia len v aplikácii',
            paragraphs: [
              'Moderné cloudové databázy (napríklad Supabase alebo Firebase) dovoľujú prehliadaču komunikovať s databázou priamo, pomocou verejného kľúča. Bezpečnosť vtedy stojí na pravidlách v samotnej databáze.',
              'Ak aplikácia kontroluje, kto smie čo robiť, ale databáza nie, stačí aplikáciu obísť. AI kontrola aplikačného kódu takú chybu ľahko prehliadne, lebo kód sám o sebe vyzerá správne.'
            ]
          },
          {
            heading: 'Prečo AI znie istejšie, než by mala',
            paragraphs: ['Modely sú trénované byť nápomocné a jasné. Odpoveď „všetko je v poriadku“ znie profesionálne, aj keď model nemal k dispozícii všetko potrebné. Istota v tóne nie je istota v obsahu.']
          },
          {
            heading: 'Ako to robíme my',
            items: [
              { title: 'Vývoj a kontrola s AI', text: 'Kód píšeme a kontrolujeme pomocou AI technológií. Každú zmenu automaticky posúdi jazykový model v CI/CD pipeline.' },
              { title: 'Pravidlá v databáze, nie len v aplikácii', text: 'Klient nemá zápisové práva tam, kde ich nepotrebuje.' },
              { title: 'Automatické bezpečnostné testy proti reálnej databáze', text: 'Overujú, že neprihlásený ani bežný používateľ sa nedostane k cudzím dátam.' },
              { title: 'Kritický nález blokuje nasadenie', text: 'Kým nie je opravený, zmena nejde do produkcie.' },
              { title: 'Kontrola bezpečnostným expertom', text: 'Pred nasadením prejde aplikáciu náš bezpečnostný expert a hľadá všetky možné chyby: v kóde, v databáze, v nastaveniach aj v tom, čo AI nevidí.' }
            ]
          }
        ],
        takeaway: 'AI je výborný nástroj na písanie aj kontrolu kódu. Nie je to však záruka bezpečnosti. Keď vám AI povie, že je všetko v poriadku, berte to ako prvý názor. Posledné slovo má u nás vždy bezpečnostný expert.'
      },
      cs: {
        title: 'AI řekla, že je kód bezpečný. Proč jí to nestačí věřit',
        perex: 'AI nástroje dnes píší a kontrolují velkou část kódu. Jsou rychlé a často přesné. Když však napíší „bezpečnostní problémy jsem nenašel“, znamená to jen to, že je nenašly v tom, co viděly.',
        sections: [
          {
            heading: 'Co AI vidí a co ne',
            paragraphs: ['Jazykový model hodnotí kód, který dostane do kontextu. Mimo jeho zorné pole často zůstává:'],
            items: [
              { text: 'konfigurace databáze a přístupová pravidla nastavená mimo repozitář,' },
              { text: 'nastavení cloudových služeb, klíče a oprávnění,' },
              { text: 'chování běžící aplikace: co server reálně vrátí, když přijde nečekaný požadavek.' }
            ]
          },
          {
            heading: 'Nejčastější slepá skvrna: oprávnění jen v aplikaci',
            paragraphs: [
              'Moderní cloudové databáze (například Supabase nebo Firebase) umožňují prohlížeči komunikovat s databází přímo, pomocí veřejného klíče. Bezpečnost pak stojí na pravidlech v samotné databázi.',
              'Pokud aplikace kontroluje, kdo smí co dělat, ale databáze ne, stačí aplikaci obejít. AI kontrola aplikačního kódu takovou chybu snadno přehlédne, protože kód sám o sobě vypadá správně.'
            ]
          },
          {
            heading: 'Proč AI zní jistěji, než by měla',
            paragraphs: ['Modely jsou trénované být nápomocné a jasné. Odpověď „vše je v pořádku“ zní profesionálně, i když model neměl k dispozici vše potřebné. Jistota v tónu není jistota v obsahu.']
          },
          {
            heading: 'Jak to děláme my',
            items: [
              { title: 'Vývoj a kontrola s AI', text: 'Kód píšeme a kontrolujeme pomocí AI technologií. Každou změnu automaticky posoudí jazykový model v CI/CD pipeline.' },
              { title: 'Pravidla v databázi, ne jen v aplikaci', text: 'Klient nemá práva zápisu tam, kde je nepotřebuje.' },
              { title: 'Automatické bezpečnostní testy proti reálné databázi', text: 'Ověřují, že se nepřihlášený ani běžný uživatel nedostane k cizím datům.' },
              { title: 'Kritický nález blokuje nasazení', text: 'Dokud není opravený, změna nejde do produkce.' },
              { title: 'Kontrola bezpečnostním expertem', text: 'Před nasazením projde aplikaci náš bezpečnostní expert a hledá všechny možné chyby: v kódu, v databázi, v nastavení i v tom, co AI nevidí.' }
            ]
          }
        ],
        takeaway: 'AI je výborný nástroj na psaní i kontrolu kódu. Není to však záruka bezpečnosti. Když vám AI řekne, že je vše v pořádku, berte to jako první názor. Poslední slovo má u nás vždy bezpečnostní expert.'
      },
      en: {
        title: 'The AI said the code is secure. Why that isn’t enough',
        perex: 'AI tools now write and review a large share of code. They are fast and often accurate. But when they say “I found no security issues”, it only means they found none in what they could see.',
        sections: [
          {
            heading: 'What AI sees, and what it doesn’t',
            paragraphs: ['A language model assesses the code it is given as context. What often stays outside its view:'],
            items: [
              { text: 'database configuration and access rules set up outside the repository,' },
              { text: 'cloud service settings, keys and permissions,' },
              { text: 'how the running application behaves: what the server actually returns when an unexpected request arrives.' }
            ]
          },
          {
            heading: 'The most common blind spot: permissions only in the app',
            paragraphs: [
              'Modern cloud databases (such as Supabase or Firebase) let the browser talk to the database directly, using a public key. Security then rests on rules in the database itself.',
              'If the application checks who may do what but the database doesn’t, it is enough to bypass the application. An AI review of application code can easily miss this, because the code on its own looks correct.'
            ]
          },
          {
            heading: 'Why AI sounds more certain than it should',
            paragraphs: ['Models are trained to be helpful and clear. “Everything is fine” sounds professional even when the model didn’t have everything it needed. Confidence in tone is not confidence in content.']
          },
          {
            heading: 'How we do it',
            items: [
              { title: 'Built and reviewed with AI', text: 'We write and review code using AI technologies. A language model automatically reviews every change in the CI/CD pipeline.' },
              { title: 'Rules in the database, not just the app', text: 'The client has no write access where it doesn’t need it.' },
              { title: 'Automated security tests against a real database', text: 'They verify that neither an anonymous nor a regular user can reach other people’s data.' },
              { title: 'A critical finding blocks deployment', text: 'Until it is fixed, the change does not go to production.' },
              { title: 'Review by a security expert', text: 'Before deployment, our security expert goes through the application looking for every possible issue: in the code, the database, the configuration, and in what AI can’t see.' }
            ]
          }
        ],
        takeaway: 'AI is an excellent tool for writing and reviewing code. It is not a guarantee of security. When AI tells you everything is fine, treat it as a first opinion. With us, the final word always belongs to a security expert.'
      }
    }
  }
]

export function findBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
