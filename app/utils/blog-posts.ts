// Blog. Nový článok = nový záznam v poli, najnovší hore. Zoznam aj detail
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
  inlineImage?: {
    src: string
    alt: Record<BlogLocale, string>
    afterSection: number
  }
  tags: string[]
  content: Record<BlogLocale, BlogPostContent>
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-choose-your-first-process-to-automate',
    datePublished: '2026-10-15',
    readingMinutes: 5,
    image: '/blog/first-process-to-automate.png',
    imageAlt: {
      sk: 'Tmavá grafika ProjentIQ s otázkou, ktorý proces automatizovať ako prvý, a odpoveďou: ten, ktorý sa opakuje.',
      cs: 'Tmavá grafika ProjentIQ s otázkou, který proces automatizovat jako první, a odpovědí: ten, který se opakuje.',
      en: 'Dark ProjentIQ graphic asking which process to automate first, with the answer: the one that repeats.'
    },
    inlineImage: {
      src: '/blog/first-process-automation-inline.webp',
      afterSection: 3,
      alt: {
        sk: 'Doklady prechádzajú automatizovaným spracovaním a človek kontroluje výsledok na tablete.',
        cs: 'Doklady procházejí automatizovaným zpracováním a člověk kontroluje výsledek na tabletu.',
        en: 'Documents move through an automated workflow while a person reviews the result on a tablet.'
      }
    },
    tags: ['Automation', 'AI', 'Processes'],
    content: {
      sk: {
        title: 'Ako vybrať prvý proces na automatizáciu: 5 otázok, ktoré si položiť',
        perex: 'Najlepší prvý projekt nemusí byť najväčší ani najmodernejší. Hľadajte úlohu, ktorá sa často opakuje, má jasný výsledok a dá sa bezpečne skontrolovať.',
        sections: [
          {
            heading: 'Začnite problémom, nie technológiou',
            paragraphs: [
              'Keď sa vo firme začne hovoriť o AI, ľahko vznikne tlak automatizovať niečo veľké. Praktickejšie je najprv pomenovať prácu, ktorá ľuďom pravidelne berie čas: prepisovanie údajov z faktúr, triedenie e-mailov alebo hľadanie odpovedí v dokumentoch.',
              'Dobrý kandidát sa dá opísať jednou vetou: „Keď príde X, niekto musí urobiť Y, aby vzniklo Z.“ Ak sa v tom opise stráca priveľa výnimiek alebo nejasných rozhodnutí, začnite menšou časťou procesu.'
            ]
          },
          {
            heading: 'Položte si týchto päť otázok',
            items: [
              { title: 'Opakuje sa úloha často', text: 'Každodenná práca má väčší potenciál na úsporu než úloha, ktorá sa objaví raz za štvrťrok.' },
              { title: 'Je výsledok jasný', text: 'Viete určiť, ako vyzerá správne vyplnený záznam, vybavený e-mail alebo nájdená odpoveď?' },
              { title: 'Sú vstupy dostupné', text: 'Sú potrebné dokumenty a údaje na mieste, ku ktorému sa riešenie môže bezpečne pripojiť?' },
              { title: 'Dajú sa oddeliť výnimky', text: 'Viete označiť prípady, ktoré má systém spracovať automaticky, a tie, ktoré má poslať človeku na kontrolu?' },
              { title: 'Viete zmerať výsledok', text: 'Dokážete porovnať čas, počet chýb alebo rýchlosť vybavenia pred zmenou a po nej?' }
            ]
          },
          {
            heading: 'Zmerajte dnešný stav ešte pred pilotom',
            paragraphs: [
              'Počas jedného alebo dvoch týždňov si zapisujte približný počet prípadov, čas potrebný na spracovanie a bežné dôvody, prečo sa práca vráti na opravu. Stačí jednoduchá tabuľka. Cieľom nie je dokonalá štúdia, ale poctivý východiskový bod.',
              'Do výpočtu zahrňte aj kontrolu výsledku a riešenie výnimiek. Samotné vytiahnutie údajov z dokumentu môže trvať sekundy, no človek stále potrebuje overiť správnosť a odovzdať údaje do ďalšieho systému.'
            ]
          },
          {
            heading: 'Pilot navrhnite tak, aby bolo jasné, čo znamená úspech',
            paragraphs: [
              'Vyberte jeden proces, obmedzený súbor vstupov a človeka, ktorý pozná dnešný postup. Vopred sa dohodnite na meradle úspechu. Môže ním byť napríklad kratší čas spracovania pri rovnakej alebo lepšej presnosti. Určte aj prípady, ktoré musí systém vždy posunúť na kontrolu.',
              'Pri faktúrach to môže znamenať automaticky predvyplniť dodávateľa, sumy a dátumy, ale nechať schválenie na účtovníkovi. Pri e-mailoch môže systém navrhnúť kategóriu a odpoveď, pričom človek správu pred odoslaním potvrdí.'
            ]
          },
          {
            heading: 'Kedy radšej ešte neautomatizovať',
            paragraphs: [
              'Ak sa postup mení každý týždeň, nikto nevie povedať, čo je správny výsledok, alebo chýbajú spoľahlivé vstupné údaje, automatizácia môže iba zrýchliť vznik chýb. Najprv zjednodušte a ustáľte proces. Až potom vyberajte technológiu.'
            ]
          }
        ],
        takeaway: 'Začnite malým, častým a merateľným procesom. Dobrá prvá automatizácia odstráni rutinu, ukáže výsledok a ponechá človeku kontrolu tam, kde je potrebný úsudok.'
      },
      cs: {
        title: 'Jak vybrat první proces k automatizaci: 5 otázek, které si položit',
        perex: 'Nejlepší první projekt nemusí být největší ani nejmodernější. Hledejte úkol, který se často opakuje, má jasný výsledek a lze ho bezpečně zkontrolovat.',
        sections: [
          {
            heading: 'Začněte problémem, ne technologií',
            paragraphs: [
              'Když se ve firmě začne mluvit o AI, snadno vznikne tlak automatizovat něco velkého. Praktičtější je nejprve pojmenovat práci, která lidem pravidelně bere čas: přepisování údajů z faktur, třídění e-mailů nebo hledání odpovědí v dokumentech.',
              'Dobrý kandidát se dá popsat jednou větou: „Když přijde X, někdo musí udělat Y, aby vzniklo Z.“ Pokud se v tom popisu ztrácí příliš mnoho výjimek nebo nejasných rozhodnutí, začněte menší částí procesu.'
            ]
          },
          {
            heading: 'Položte si těchto pět otázek',
            items: [
              { title: 'Opakuje se úkol často', text: 'Každodenní práce má větší potenciál úspory než úkol, který se objeví jednou za čtvrt roku.' },
              { title: 'Je výsledek jasný', text: 'Víte určit, jak vypadá správně vyplněný záznam, vyřízený e-mail nebo nalezená odpověď?' },
              { title: 'Jsou vstupy dostupné', text: 'Jsou potřebné dokumenty a údaje na místě, ke kterému se řešení může bezpečně připojit?' },
              { title: 'Dají se oddělit výjimky', text: 'Umíte označit případy, které má systém zpracovat automaticky, a ty, které má předat člověku ke kontrole?' },
              { title: 'Umíte změřit výsledek', text: 'Dokážete porovnat čas, počet chyb nebo rychlost vyřízení před změnou a po ní?' }
            ]
          },
          {
            heading: 'Změřte dnešní stav ještě před pilotem',
            paragraphs: [
              'Během jednoho nebo dvou týdnů si zapisujte přibližný počet případů, čas potřebný ke zpracování a běžné důvody, proč se práce vrací k opravě. Stačí jednoduchá tabulka. Cílem není dokonalá studie, ale poctivý výchozí bod.',
              'Do výpočtu zahrňte také kontrolu výsledku a řešení výjimek. Samotné vytažení údajů z dokumentu může trvat sekundy, ale člověk stále musí ověřit správnost a předat údaje do dalšího systému.'
            ]
          },
          {
            heading: 'Pilot navrhněte tak, aby byl úspěch jasně měřitelný',
            paragraphs: [
              'Vyberte jeden proces, omezený soubor vstupů a člověka, který zná dnešní postup. Předem se dohodněte na měřítku úspěchu. Může jím být například kratší doba zpracování při stejné nebo lepší přesnosti. Určete také případy, které musí systém vždy předat ke kontrole.',
              'U faktur to může znamenat automaticky předvyplnit dodavatele, částky a data, ale schválení nechat na účetní. U e-mailů může systém navrhnout kategorii a odpověď, zatímco člověk zprávu před odesláním potvrdí.'
            ]
          },
          {
            heading: 'Kdy raději ještě neautomatizovat',
            paragraphs: [
              'Pokud se postup mění každý týden, nikdo neumí říct, co je správný výsledek, nebo chybějí spolehlivé vstupní údaje, automatizace může jen urychlit vznik chyb. Nejprve proces zjednodušte a ustalte. Teprve potom vybírejte technologii.'
            ]
          }
        ],
        takeaway: 'Začněte malým, častým a měřitelným procesem. Dobrá první automatizace odstraní rutinu, ukáže výsledek a ponechá člověku kontrolu tam, kde je potřeba úsudek.'
      },
      en: {
        title: 'How to choose your first process to automate: 5 questions to ask',
        perex: 'Your best first project does not have to be the biggest or most advanced. Look for a task that repeats often, has a clear outcome and can be checked safely.',
        sections: [
          {
            heading: 'Start with the problem, not the technology',
            paragraphs: [
              'When a company starts talking about AI, there can be pressure to automate something big. A more practical first step is to name the work that regularly takes people’s time: retyping invoice details, sorting emails or searching documents for answers.',
              'A good candidate fits in one sentence: “When X arrives, someone does Y so that Z happens.” If that description contains too many exceptions or unclear decisions, start with a smaller part of the process.'
            ]
          },
          {
            heading: 'Ask these five questions',
            items: [
              { title: 'Does the task happen often', text: 'Daily work has more potential for savings than a task that appears once a quarter.' },
              { title: 'Is the outcome clear', text: 'Can you describe what a correctly completed record, handled email or useful answer looks like?' },
              { title: 'Are the inputs available', text: 'Are the documents and data somewhere the solution can connect to securely?' },
              { title: 'Can exceptions be separated', text: 'Can you identify cases the system should handle automatically and those it should send to a person for review?' },
              { title: 'Can you measure the result', text: 'Can you compare time, error rates or turnaround time before and after the change?' }
            ]
          },
          {
            heading: 'Measure today’s process before the pilot',
            paragraphs: [
              'For a week or two, track the approximate number of cases, the time needed to handle them and common reasons work is sent back for correction. A simple spreadsheet is enough. The goal is not a perfect study; it is an honest baseline.',
              'Include review time and exception handling in your estimate. Extracting details from a document may take seconds, but someone still needs to verify them and pass the data to the next system.'
            ]
          },
          {
            heading: 'Design a pilot with a clear measure of success',
            paragraphs: [
              'Choose one process, a limited set of inputs and someone who knows the current workflow. Agree in advance on how to measure success. For example, you might aim for less processing time with the same or better accuracy. Also decide which cases must always go to a person for review.',
              'For invoices, that could mean filling in the supplier, amounts and dates automatically while leaving approval to the accountant. For email, the system could suggest a category and reply, with a person confirming the message before it is sent.'
            ]
          },
          {
            heading: 'When to wait before automating',
            paragraphs: [
              'If the workflow changes every week, nobody can define a correct outcome or the input data is unreliable, automation may only make errors happen faster. Simplify and stabilise the process first. Then choose the technology.'
            ]
          }
        ],
        takeaway: 'Start with a small, frequent and measurable process. A good first automation removes routine work, makes the result visible and keeps a person in control wherever judgment is needed.'
      }
    }
  },
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
