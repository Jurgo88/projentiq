// Texty stránok služieb AI chatbot (RAG) a AI agenti (komponent ServiceLanding).
// Tvrdenia len podľa docs/blog/guide.md („Čo smie článok tvrdiť o ProjentIQ“)
// a odpovedí majiteľa (október 2026):
// - chatbot: zdroje PDF/Word, SharePoint/Google Drive, web a intranet,
//   databázy a systémy cez API; kanály web/widget, Teams, Slack, e-mail;
//   citácia zdroja, prístup podľa oprávnení, povie keď nevie, SK/CZ/EN;
// - agenti: e-maily, objednávky, zákaznícka podpora, reporty a synchronizácia.
// Ceny sa dopĺňajú z utils/pricing.ts ({setup}, {monthly}, {pilot}).

export type ServiceLandingLocale = 'sk' | 'cs' | 'en'

interface TitledText {
  title: string
  text: string
}

export interface ServiceLandingContent {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  ctaTry: string
  problem: { heading: string; paragraphs: string[] }
  steps: { heading: string; items: TitledText[] }
  demo: { heading: string; lead: string }
  lists: { heading: string; items: string[] }[]
  cards: { heading: string; lead: string; items: TitledText[] }
  control: { heading: string; items: TitledText[] }
  pricing: { heading: string; text: string; note: string }
  faq: { heading: string; items: { q: string; a: string }[] }
}

const NOTE = {
  sk: 'Ceny sú konečné, nie sme platiteľom DPH. Presný rozsah potvrdíme pred začiatkom.',
  cs: 'Ceny jsou konečné, nejsme plátci DPH. Přesný rozsah potvrdíme před začátkem.',
  en: 'Prices are final; we are not VAT registered. We confirm the exact scope before we start.'
}

const DATA_FAQ = {
  sk: { q: 'Kde sú naše dáta?', a: 'Spracovanie prebieha v rámci EÚ a dokumenty nezdieľame s tretími stranami. Riešenie vieme nasadiť aj priamo na vašu infraštruktúru.' },
  cs: { q: 'Kde jsou naše data?', a: 'Zpracování probíhá v rámci EU a dokumenty nesdílíme s třetími stranami. Řešení umíme nasadit i přímo na vaši infrastrukturu.' },
  en: { q: 'Where is our data?', a: 'Processing happens within the EU and we do not share documents with third parties. We can also deploy the solution on your own infrastructure.' }
}

const DEMO_FAQ = {
  sk: { q: 'Ako rýchlo to vieme vyskúšať?', a: 'Prvé funkčné demo na vašich dátach máme zvyčajne do dvoch týždňov. Plné nasadenie závisí od rozsahu.' },
  cs: { q: 'Jak rychle to můžeme vyzkoušet?', a: 'První funkční demo na vašich datech máme obvykle do dvou týdnů. Plné nasazení záleží na rozsahu.' },
  en: { q: 'How fast can we try it?', a: 'The first working demo on your data is usually ready within two weeks. Full deployment depends on the scope.' }
}

export const KNOWLEDGE_ASSISTANT: Record<ServiceLandingLocale, ServiceLandingContent> = {
  sk: {
    metaTitle: 'AI chatbot nad firemnými dokumentmi – ProjentIQ',
    metaDescription:
      'Firemný AI asistent odpovedá zo smerníc, zmlúv a manuálov, vždy s odkazom na zdroj. Napojenie na SharePoint, Google Drive, Teams aj Slack. Bezplatné demo.',
    eyebrow: 'AI chatbot pre firmy',
    title: 'Odpovede z vašich dokumentov, pri každej so zdrojom',
    lead: 'Firemný asistent nájde odpoveď v smerniciach, zmluvách, manuáloch či na intranete a uvedie dokument, z ktorého vychádza. Ak odpoveď v dokumentoch nie je, povie to.',
    ctaTry: 'Vyskúšať ukážku',
    problem: {
      heading: 'Informácie vo firme sú, len ich treba nájsť',
      paragraphs: [
        'Postup, cenník, podmienky zmluvy alebo interná smernica sú niekde zapísané. Lenže v ktorom dokumente, na ktorom disku a v ktorej verzii? Ľudia sa preto pýtajú kolegov alebo prehľadávajú priečinky a odpoveď si overujú znova.',
        'Asistent nad firemnými dokumentmi odpovedá na otázky bežnou rečou a pri každej odpovedi ukáže, odkiaľ je. Odpoveď si tak overíte jedným kliknutím.'
      ]
    },
    steps: {
      heading: 'Ako asistent funguje',
      items: [
        { title: 'Napojenie zdrojov', text: 'Pripojíme dokumenty, firemné disky, intranet alebo systémy, z ktorých má asistent čerpať.' },
        { title: 'Otázka', text: 'Používateľ sa opýta bežnou rečou: na webe, v Microsoft Teams, v Slacku alebo e-mailom.' },
        { title: 'Vyhľadanie', text: 'Asistent nájde pasáže z dokumentov, ku ktorým má daný používateľ prístup.' },
        { title: 'Odpoveď so zdrojom', text: 'Odpovie na základe nájdených pasáží a uvedie dokument, z ktorého vychádza. Ak odpoveď nenájde, povie to.' }
      ]
    },
    demo: {
      heading: 'Vyskúšajte si firemného asistenta',
      lead: 'Vyberte otázku a pozrite, ako asistent odpovedá z ukážkových dokumentov. Ukážka beží na vzorových dátach.'
    },
    lists: [
      {
        heading: 'Z čoho asistent čerpá',
        items: ['PDF a Word dokumenty: smernice, zmluvy, manuály', 'SharePoint a Google Drive', 'Firemný web a intranet', 'Databázy a systémy cez API']
      },
      {
        heading: 'Kde ho ľudia používajú',
        items: ['Webová aplikácia alebo okno na webe', 'Microsoft Teams', 'Slack', 'E-mail']
      }
    ],
    cards: {
      heading: 'Na čo sa hodí',
      lead: 'Príklady použitia. Rozsah dohodneme podľa vašich dokumentov.',
      items: [
        { title: 'Firemná znalostná báza', text: 'Odpovede zo smerníc, postupov a interných pravidiel pre celý tím.' },
        { title: 'Technická dokumentácia', text: 'Rýchle vyhľadanie v manuáloch, špecifikáciách a návodoch.' },
        { title: 'Interné procesy', text: 'Ako sa čo robí, kto čo schvaľuje a kde je ktorý formulár.' },
        { title: 'Zákaznícka podpora', text: 'Odpovede pre podporu na základe produktovej dokumentácie.' }
      ]
    },
    control: {
      heading: 'Odpovede, ktoré si overíte',
      items: [
        { title: 'Zdroj pri každej odpovedi', text: 'Asistent uvedie dokument, z ktorého odpoveď vychádza, aby ste si ju mohli overiť.' },
        { title: 'Prístup podľa oprávnení', text: 'Používateľ dostane odpovede len z dokumentov, ku ktorým má prístup.' },
        { title: 'Keď nevie, povie to', text: 'Ak odpoveď v dokumentoch nie je, asistent to povie namiesto toho, aby hádal.' }
      ]
    },
    pricing: {
      heading: 'Koľko to stojí',
      text: 'Znalostný systém nad dohodnutým zdrojom dokumentov stojí od {setup} € jednorazovo alebo od {monthly} € mesačne. Pilot s pevnou cenou {pilot} € vám celý odpočítame od implementácie, ak sa rozhodnete pokračovať.',
      note: NOTE.sk
    },
    faq: {
      heading: 'Časté otázky o firemnom asistentovi',
      items: [
        { q: 'V akom jazyku asistent odpovedá?', a: 'V slovenčine, češtine aj angličtine, bez ohľadu na to, v akom jazyku je dokument napísaný.' },
        { q: 'Uvidí zamestnanec aj dokumenty, ku ktorým nemá prístup?', a: 'Nie. Asistent odpovedá len z dokumentov, ku ktorým má daný používateľ prístup.' },
        { q: 'Čo ak odpoveď v dokumentoch nie je?', a: 'Asistent to povie a nevymýšľa. Pri každej odpovedi navyše uvedie zdroj, takže si ju overíte.' },
        { q: 'Musíme dokumenty niekam presúvať?', a: 'Nie. Asistenta napojíme tam, kde dokumenty už máte: SharePoint, Google Drive, web, intranet alebo systémy cez API.' },
        DATA_FAQ.sk,
        DEMO_FAQ.sk
      ]
    }
  },
  cs: {
    metaTitle: 'AI chatbot nad firemními dokumenty – ProjentIQ',
    metaDescription:
      'Firemní AI asistent odpovídá ze směrnic, smluv a manuálů, vždy s odkazem na zdroj. Napojení na SharePoint, Google Drive, Teams i Slack. Demo zdarma.',
    eyebrow: 'AI chatbot pro firmy',
    title: 'Odpovědi z vašich dokumentů, u každé se zdrojem',
    lead: 'Firemní asistent najde odpověď ve směrnicích, smlouvách, manuálech či na intranetu a uvede dokument, ze kterého vychází. Pokud odpověď v dokumentech není, řekne to.',
    ctaTry: 'Vyzkoušet ukázku',
    problem: {
      heading: 'Informace ve firmě jsou, jen je třeba je najít',
      paragraphs: [
        'Postup, ceník, podmínky smlouvy nebo interní směrnice jsou někde zapsané. Jenže ve kterém dokumentu, na kterém disku a v jaké verzi? Lidé se proto ptají kolegů nebo prohledávají složky a odpověď si ověřují znovu.',
        'Asistent nad firemními dokumenty odpovídá na otázky běžnou řečí a u každé odpovědi ukáže, odkud je. Odpověď si tak ověříte jedním kliknutím.'
      ]
    },
    steps: {
      heading: 'Jak asistent funguje',
      items: [
        { title: 'Napojení zdrojů', text: 'Připojíme dokumenty, firemní disky, intranet nebo systémy, ze kterých má asistent čerpat.' },
        { title: 'Otázka', text: 'Uživatel se zeptá běžnou řečí: na webu, v Microsoft Teams, ve Slacku nebo e-mailem.' },
        { title: 'Vyhledání', text: 'Asistent najde pasáže z dokumentů, ke kterým má daný uživatel přístup.' },
        { title: 'Odpověď se zdrojem', text: 'Odpoví na základě nalezených pasáží a uvede dokument, ze kterého vychází. Pokud odpověď nenajde, řekne to.' }
      ]
    },
    demo: {
      heading: 'Vyzkoušejte si firemního asistenta',
      lead: 'Vyberte otázku a podívejte se, jak asistent odpovídá z ukázkových dokumentů. Ukázka běží na vzorových datech.'
    },
    lists: [
      {
        heading: 'Z čeho asistent čerpá',
        items: ['PDF a Word dokumenty: směrnice, smlouvy, manuály', 'SharePoint a Google Drive', 'Firemní web a intranet', 'Databáze a systémy přes API']
      },
      {
        heading: 'Kde ho lidé používají',
        items: ['Webová aplikace nebo okno na webu', 'Microsoft Teams', 'Slack', 'E-mail']
      }
    ],
    cards: {
      heading: 'K čemu se hodí',
      lead: 'Příklady použití. Rozsah dohodneme podle vašich dokumentů.',
      items: [
        { title: 'Firemní znalostní báze', text: 'Odpovědi ze směrnic, postupů a interních pravidel pro celý tým.' },
        { title: 'Technická dokumentace', text: 'Rychlé vyhledání v manuálech, specifikacích a návodech.' },
        { title: 'Interní procesy', text: 'Jak se co dělá, kdo co schvaluje a kde je který formulář.' },
        { title: 'Zákaznická podpora', text: 'Odpovědi pro podporu na základě produktové dokumentace.' }
      ]
    },
    control: {
      heading: 'Odpovědi, které si ověříte',
      items: [
        { title: 'Zdroj u každé odpovědi', text: 'Asistent uvede dokument, ze kterého odpověď vychází, abyste si ji mohli ověřit.' },
        { title: 'Přístup podle oprávnění', text: 'Uživatel dostane odpovědi jen z dokumentů, ke kterým má přístup.' },
        { title: 'Když neví, řekne to', text: 'Pokud odpověď v dokumentech není, asistent to řekne místo toho, aby hádal.' }
      ]
    },
    pricing: {
      heading: 'Kolik to stojí',
      text: 'Znalostní systém nad dohodnutým zdrojem dokumentů stojí od {setup} € jednorázově nebo od {monthly} € měsíčně. Pilot s pevnou cenou {pilot} € vám celý odečteme od implementace, pokud se rozhodnete pokračovat.',
      note: NOTE.cs
    },
    faq: {
      heading: 'Časté otázky k firemnímu asistentovi',
      items: [
        { q: 'V jakém jazyce asistent odpovídá?', a: 'Ve slovenštině, češtině i angličtině, bez ohledu na to, v jakém jazyce je dokument napsaný.' },
        { q: 'Uvidí zaměstnanec i dokumenty, ke kterým nemá přístup?', a: 'Ne. Asistent odpovídá jen z dokumentů, ke kterým má daný uživatel přístup.' },
        { q: 'Co když odpověď v dokumentech není?', a: 'Asistent to řekne a nevymýšlí si. U každé odpovědi navíc uvede zdroj, takže si ji ověříte.' },
        { q: 'Musíme dokumenty někam přesouvat?', a: 'Ne. Asistenta napojíme tam, kde dokumenty už máte: SharePoint, Google Drive, web, intranet nebo systémy přes API.' },
        DATA_FAQ.cs,
        DEMO_FAQ.cs
      ]
    }
  },
  en: {
    metaTitle: 'AI chatbot over your company documents – ProjentIQ',
    metaDescription:
      'A company AI assistant that answers from your policies, contracts and manuals, always citing the source. Works with SharePoint, Google Drive, Teams and Slack. Free demo.',
    eyebrow: 'AI chatbot for business',
    title: 'Answers from your documents, each with its source',
    lead: 'The company assistant finds answers in policies, contracts, manuals or the intranet and cites the document each answer comes from. If the answer is not in the documents, it says so.',
    ctaTry: 'Try the demo',
    problem: {
      heading: 'The information exists, it just has to be found',
      paragraphs: [
        'A procedure, a price list, contract terms or an internal policy are written down somewhere. But in which document, on which drive and in which version? So people ask colleagues or dig through folders, and then double-check the answer.',
        'An assistant over your company documents answers questions in plain language and shows where each answer comes from, so you can check it in one click.'
      ]
    },
    steps: {
      heading: 'How the assistant works',
      items: [
        { title: 'Connecting sources', text: 'We connect the documents, company drives, intranet or systems the assistant should draw on.' },
        { title: 'A question', text: 'A user asks in plain language: on the web, in Microsoft Teams, in Slack or by email.' },
        { title: 'Search', text: 'The assistant finds passages in the documents that this user has access to.' },
        { title: 'An answer with its source', text: 'It answers from the passages it found and cites the document. If it finds no answer, it says so.' }
      ]
    },
    demo: {
      heading: 'Try the company assistant',
      lead: 'Pick a question and see how the assistant answers from sample documents. The demo runs on sample data.'
    },
    lists: [
      {
        heading: 'What the assistant draws on',
        items: ['PDF and Word documents: policies, contracts, manuals', 'SharePoint and Google Drive', 'Company website and intranet', 'Databases and systems through an API']
      },
      {
        heading: 'Where people use it',
        items: ['A web app or a widget on your site', 'Microsoft Teams', 'Slack', 'Email']
      }
    ],
    cards: {
      heading: 'What it is good for',
      lead: 'Example uses. We agree on the scope based on your documents.',
      items: [
        { title: 'Company knowledge base', text: 'Answers from policies, procedures and internal rules for the whole team.' },
        { title: 'Technical documentation', text: 'Quick search across manuals, specifications and how-tos.' },
        { title: 'Internal processes', text: 'How things are done, who approves what and where each form is.' },
        { title: 'Customer support', text: 'Answers for your support team based on product documentation.' }
      ]
    },
    control: {
      heading: 'Answers you can check',
      items: [
        { title: 'A source with every answer', text: 'The assistant cites the document an answer comes from, so you can verify it.' },
        { title: 'Access by permission', text: 'Users only get answers from documents they have access to.' },
        { title: 'When it does not know, it says so', text: 'If the answer is not in the documents, the assistant says so instead of guessing.' }
      ]
    },
    pricing: {
      heading: 'What it costs',
      text: 'A knowledge system over an agreed set of documents costs from €{setup} one-off or from €{monthly} per month. If you decide to continue, we deduct the full price of the fixed-price pilot (€{pilot}) from the implementation.',
      note: NOTE.en
    },
    faq: {
      heading: 'Company assistant FAQ',
      items: [
        { q: 'Which language does the assistant answer in?', a: 'Slovak, Czech and English, regardless of the language the document is written in.' },
        { q: 'Will an employee see documents they have no access to?', a: 'No. The assistant only answers from documents the user has access to.' },
        { q: 'What if the answer is not in the documents?', a: 'The assistant says so and does not make things up. Every answer also cites its source, so you can check it.' },
        { q: 'Do we have to move our documents?', a: 'No. We connect the assistant where your documents already are: SharePoint, Google Drive, the website, the intranet or systems through an API.' },
        DATA_FAQ.en,
        DEMO_FAQ.en
      ]
    }
  }
}

export const AI_AGENTS: Record<ServiceLandingLocale, ServiceLandingContent> = {
  sk: {
    metaTitle: 'AI agenti pre firmy: e-maily, objednávky a podpora – ProjentIQ',
    metaDescription:
      'AI agent spracuje e-maily, objednávky či požiadavky zákazníkov podľa pravidiel, ktoré nastavíte, a zapíše výsledok do vašich systémov. Bezplatné demo.',
    eyebrow: 'AI agenti',
    title: 'AI agent, ktorý opakovanú prácu dotiahne do konca',
    lead: 'Agent prečíta e-mail alebo objednávku, postupuje podľa pravidiel, ktoré nastavíte, a zapíše výsledok do vašich systémov. Čo nevie spoľahlivo posúdiť, nechá na človeka.',
    ctaTry: 'Pozrieť ukážku',
    problem: {
      heading: 'Rovnaké úlohy každý deň',
      paragraphs: [
        'Prečítať e-mail, nájsť v ňom údaje, založiť záznam v systéme, poslať potvrdenie, preniesť dáta do reportu. Každá z týchto úloh je jednoduchá, ale dokopy zaberajú čas ľuďom, ktorí by mohli robiť niečo iné.',
        'AI agent takúto úlohu spracuje od začiatku do konca. Na rozdiel od pevne naprogramovanej automatizácie si poradí aj s textom, ktorý nemá vždy rovnakú podobu, napríklad s e-mailom napísaným vlastnými slovami.'
      ]
    },
    steps: {
      heading: 'Ako agent pracuje',
      items: [
        { title: 'Podnet', text: 'Príde e-mail, objednávka alebo požiadavka zákazníka, prípadne nastane čas na pravidelný report.' },
        { title: 'Porozumenie', text: 'Agent prečíta obsah a vytiahne údaje, ktoré úloha potrebuje.' },
        { title: 'Postup podľa pravidiel', text: 'Postupuje podľa pravidiel, ktoré nastavíte. Čo nevie spoľahlivo posúdiť, odovzdá človeku.' },
        { title: 'Výsledok v systéme', text: 'Založí záznam, pošle potvrdenie alebo pripraví odpoveď a výsledok zapíše do vašich systémov.' }
      ]
    },
    demo: {
      heading: 'Pozrite si agenta pri práci',
      lead: 'Ukážka na vzorovej objednávke e-mailom, od prijatia po potvrdenie. Konkrétne kroky prispôsobíme vášmu procesu.'
    },
    lists: [
      {
        heading: 'Čo agenti robia',
        items: [
          'E-maily: triedenie, záznamy v systéme, návrhy odpovedí',
          'Objednávky: spracovanie a zaevidovanie',
          'Zákaznícka podpora: odpovede alebo návrhy odpovedí',
          'Reporty a prenos dát medzi systémami'
        ]
      },
      {
        heading: 'Kam sa napájajú',
        items: ['ERP a CRM', 'E-mail', 'SharePoint a Google Drive', 'Databázy a iné systémy cez API']
      }
    ],
    cards: {
      heading: 'Typy agentov',
      lead: 'Agenta navrhneme pre jeden konkrétny pracovný proces.',
      items: [
        { title: 'E-mailový agent', text: 'Prečíta prichádzajúce e-maily, roztriedi ich, založí záznamy alebo pripraví odpoveď.' },
        { title: 'Agent pre objednávky', text: 'Spracuje objednávku z e-mailu a zaeviduje ju vo vašom systéme.' },
        { title: 'Agent zákazníckej podpory', text: 'Odpovie na bežné otázky alebo pripraví návrh odpovede pre kolegu.' },
        { title: 'Agent pre reporty', text: 'Pripraví pravidelné reporty a prenáša dáta medzi systémami.' }
      ]
    },
    control: {
      heading: 'Agent pracuje podľa vašich pravidiel',
      items: [
        { title: 'Pravidlá určujete vy', text: 'Agent postupuje podľa pravidiel, ktoré spolu dohodneme pri návrhu riešenia.' },
        { title: 'Sporné prípady rieši človek', text: 'Čo agent nevie spoľahlivo posúdiť, odovzdá na rozhodnutie človeku.' },
        { title: 'Najprv pilot', text: 'Agenta najprv overíme na vašom reálnom procese a výsledok porovnáme s kritériom, ktoré si určíme vopred.' }
      ]
    },
    pricing: {
      heading: 'Koľko to stojí',
      text: 'AI agent pre jeden pracovný proces stojí od {setup} € jednorazovo alebo od {monthly} € mesačne. Pilot s pevnou cenou {pilot} € vám celý odpočítame od implementácie, ak sa rozhodnete pokračovať.',
      note: NOTE.sk
    },
    faq: {
      heading: 'Časté otázky o AI agentoch',
      items: [
        { q: 'Rozhoduje agent sám?', a: 'Len v rámci pravidiel, ktoré nastavíte. Čo nevie spoľahlivo posúdiť, odovzdá človeku.' },
        { q: 'Odpovedá agent zákazníkom priamo?', a: 'Podľa dohody. Na bežné otázky môže odpovedať sám alebo pripraví návrh odpovede, ktorý kolega pred odoslaním schváli.' },
        { q: 'Na aké systémy sa agent napojí?', a: 'ERP, CRM, e-mail, SharePoint, Google Drive, databázy alebo iné systémy cez API.' },
        { q: 'Čím sa agent líši od bežnej automatizácie?', a: 'Bežná automatizácia potrebuje údaje vždy v rovnakej podobe. Agent si poradí aj s e-mailom alebo požiadavkou napísanou vlastnými slovami a podľa pravidiel rozhodne, čo s ňou.' },
        DATA_FAQ.sk,
        DEMO_FAQ.sk
      ]
    }
  },
  cs: {
    metaTitle: 'AI agenti pro firmy: e-maily, objednávky a podpora – ProjentIQ',
    metaDescription:
      'AI agent zpracuje e-maily, objednávky či požadavky zákazníků podle pravidel, která nastavíte, a zapíše výsledek do vašich systémů. Demo zdarma.',
    eyebrow: 'AI agenti',
    title: 'AI agent, který opakovanou práci dotáhne do konce',
    lead: 'Agent přečte e-mail nebo objednávku, postupuje podle pravidel, která nastavíte, a zapíše výsledek do vašich systémů. Co neumí spolehlivě posoudit, nechá na člověku.',
    ctaTry: 'Podívat se na ukázku',
    problem: {
      heading: 'Stejné úkoly každý den',
      paragraphs: [
        'Přečíst e-mail, najít v něm údaje, založit záznam v systému, poslat potvrzení, přenést data do reportu. Každý z těchto úkolů je jednoduchý, ale dohromady berou čas lidem, kteří by mohli dělat něco jiného.',
        'AI agent takový úkol zpracuje od začátku do konce. Na rozdíl od pevně naprogramované automatizace si poradí i s textem, který nemá vždy stejnou podobu, například s e-mailem napsaným vlastními slovy.'
      ]
    },
    steps: {
      heading: 'Jak agent pracuje',
      items: [
        { title: 'Podnět', text: 'Přijde e-mail, objednávka nebo požadavek zákazníka, případně nastane čas na pravidelný report.' },
        { title: 'Porozumění', text: 'Agent přečte obsah a vytáhne údaje, které úkol potřebuje.' },
        { title: 'Postup podle pravidel', text: 'Postupuje podle pravidel, která nastavíte. Co neumí spolehlivě posoudit, předá člověku.' },
        { title: 'Výsledek v systému', text: 'Založí záznam, pošle potvrzení nebo připraví odpověď a výsledek zapíše do vašich systémů.' }
      ]
    },
    demo: {
      heading: 'Podívejte se na agenta při práci',
      lead: 'Ukázka na vzorové objednávce e-mailem, od přijetí po potvrzení. Konkrétní kroky přizpůsobíme vašemu procesu.'
    },
    lists: [
      {
        heading: 'Co agenti dělají',
        items: [
          'E-maily: třídění, záznamy v systému, návrhy odpovědí',
          'Objednávky: zpracování a zaevidování',
          'Zákaznická podpora: odpovědi nebo návrhy odpovědí',
          'Reporty a přenos dat mezi systémy'
        ]
      },
      {
        heading: 'Kam se napojují',
        items: ['ERP a CRM', 'E-mail', 'SharePoint a Google Drive', 'Databáze a jiné systémy přes API']
      }
    ],
    cards: {
      heading: 'Typy agentů',
      lead: 'Agenta navrhneme pro jeden konkrétní pracovní proces.',
      items: [
        { title: 'E-mailový agent', text: 'Přečte příchozí e-maily, roztřídí je, založí záznamy nebo připraví odpověď.' },
        { title: 'Agent pro objednávky', text: 'Zpracuje objednávku z e-mailu a zaeviduje ji ve vašem systému.' },
        { title: 'Agent zákaznické podpory', text: 'Odpoví na běžné otázky nebo připraví návrh odpovědi pro kolegu.' },
        { title: 'Agent pro reporty', text: 'Připraví pravidelné reporty a přenáší data mezi systémy.' }
      ]
    },
    control: {
      heading: 'Agent pracuje podle vašich pravidel',
      items: [
        { title: 'Pravidla určujete vy', text: 'Agent postupuje podle pravidel, která spolu dohodneme při návrhu řešení.' },
        { title: 'Sporné případy řeší člověk', text: 'Co agent neumí spolehlivě posoudit, předá k rozhodnutí člověku.' },
        { title: 'Nejdřív pilot', text: 'Agenta nejdřív ověříme na vašem reálném procesu a výsledek porovnáme s kritériem, které si stanovíme předem.' }
      ]
    },
    pricing: {
      heading: 'Kolik to stojí',
      text: 'AI agent pro jeden pracovní proces stojí od {setup} € jednorázově nebo od {monthly} € měsíčně. Pilot s pevnou cenou {pilot} € vám celý odečteme od implementace, pokud se rozhodnete pokračovat.',
      note: NOTE.cs
    },
    faq: {
      heading: 'Časté otázky k AI agentům',
      items: [
        { q: 'Rozhoduje agent sám?', a: 'Jen v rámci pravidel, která nastavíte. Co neumí spolehlivě posoudit, předá člověku.' },
        { q: 'Odpovídá agent zákazníkům přímo?', a: 'Podle dohody. Na běžné otázky může odpovídat sám nebo připraví návrh odpovědi, který kolega před odesláním schválí.' },
        { q: 'Na jaké systémy se agent napojí?', a: 'ERP, CRM, e-mail, SharePoint, Google Drive, databáze nebo jiné systémy přes API.' },
        { q: 'Čím se agent liší od běžné automatizace?', a: 'Běžná automatizace potřebuje údaje vždy ve stejné podobě. Agent si poradí i s e-mailem nebo požadavkem napsaným vlastními slovy a podle pravidel rozhodne, co s ním.' },
        DATA_FAQ.cs,
        DEMO_FAQ.cs
      ]
    }
  },
  en: {
    metaTitle: 'AI agents for business: email, orders and support – ProjentIQ',
    metaDescription:
      'An AI agent handles emails, orders or customer requests by the rules you set and writes the result to your systems. Free demo.',
    eyebrow: 'AI agents',
    title: 'An AI agent that takes repetitive work all the way',
    lead: 'The agent reads an email or an order, follows the rules you set and writes the result to your systems. Whatever it cannot judge reliably, it leaves to a person.',
    ctaTry: 'See the demo',
    problem: {
      heading: 'The same tasks every day',
      paragraphs: [
        'Read an email, find the details in it, create a record in the system, send a confirmation, move data into a report. Each task is simple, but together they take time from people who could be doing something else.',
        'An AI agent handles such a task from start to finish. Unlike rigidly programmed automation, it copes with text that does not always look the same, such as an email written in someone’s own words.'
      ]
    },
    steps: {
      heading: 'How the agent works',
      items: [
        { title: 'A trigger', text: 'An email, an order or a customer request arrives, or it is time for a regular report.' },
        { title: 'Understanding', text: 'The agent reads the content and extracts the data the task needs.' },
        { title: 'Following the rules', text: 'It follows the rules you set. Whatever it cannot judge reliably, it hands over to a person.' },
        { title: 'Result in your system', text: 'It creates a record, sends a confirmation or drafts a reply, and writes the result to your systems.' }
      ]
    },
    demo: {
      heading: 'See the agent at work',
      lead: 'A demo with a sample order sent by email, from receipt to confirmation. We tailor the actual steps to your process.'
    },
    lists: [
      {
        heading: 'What agents do',
        items: [
          'Email: sorting, records in your system, draft replies',
          'Orders: processing and recording',
          'Customer support: replies or draft replies',
          'Reports and moving data between systems'
        ]
      },
      {
        heading: 'What they connect to',
        items: ['ERP and CRM', 'Email', 'SharePoint and Google Drive', 'Databases and other systems through an API']
      }
    ],
    cards: {
      heading: 'Types of agents',
      lead: 'We design an agent for one specific work process.',
      items: [
        { title: 'Email agent', text: 'Reads incoming emails, sorts them, creates records or drafts a reply.' },
        { title: 'Order agent', text: 'Processes an order from an email and records it in your system.' },
        { title: 'Support agent', text: 'Answers common questions or drafts a reply for a colleague.' },
        { title: 'Reporting agent', text: 'Prepares regular reports and moves data between systems.' }
      ]
    },
    control: {
      heading: 'The agent works by your rules',
      items: [
        { title: 'You set the rules', text: 'The agent follows the rules we agree on when designing the solution.' },
        { title: 'People handle the unclear cases', text: 'Whatever the agent cannot judge reliably, it hands over to a person to decide.' },
        { title: 'Pilot first', text: 'We first test the agent on your real process and compare the result with a success criterion we agree on up front.' }
      ]
    },
    pricing: {
      heading: 'What it costs',
      text: 'An AI agent for one work process costs from €{setup} one-off or from €{monthly} per month. If you decide to continue, we deduct the full price of the fixed-price pilot (€{pilot}) from the implementation.',
      note: NOTE.en
    },
    faq: {
      heading: 'AI agents FAQ',
      items: [
        { q: 'Does the agent decide on its own?', a: 'Only within the rules you set. Whatever it cannot judge reliably, it hands over to a person.' },
        { q: 'Does the agent reply to customers directly?', a: 'As agreed. It can answer common questions itself or draft a reply that a colleague approves before it is sent.' },
        { q: 'Which systems can the agent connect to?', a: 'ERP, CRM, email, SharePoint, Google Drive, databases or other systems through an API.' },
        { q: 'How is an agent different from regular automation?', a: 'Regular automation needs data in the same shape every time. An agent copes with an email or request written in someone’s own words and decides what to do with it according to the rules.' },
        DATA_FAQ.en,
        DEMO_FAQ.en
      ]
    }
  }
}
