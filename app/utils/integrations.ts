// Texty stránky /sk/integracie/ (cs, en). Podľa odpovedí majiteľa: zápis do
// Pohody cez XML import, do Omegy importom, do iDokladu cez API, iné systémy
// cez API; agendy prijaté a vydané faktúry, pokladničné doklady, objednávky
// a adresár. Napojenia zatiaľ neboli nasadené u klienta — texty preto
// opisujú, ako napojenie funguje, nie referencie ani výsledky.

export type IntegrationsLocale = 'sk' | 'cs' | 'en'

export interface IntegrationSystem {
  id: string
  name: string
  method: string
  text: string
}

export interface IntegrationsContent {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  principle: { heading: string; paragraphs: string[] }
  agendas: { heading: string; lead: string; items: string[] }
  systems: { heading: string; methodLabel: string; items: IntegrationSystem[] }
  process: { heading: string; items: { title: string; text: string }[] }
  faq: { heading: string; items: { q: string; a: string }[] }
  invoiceLink: string
}

export const INTEGRATIONS: Record<IntegrationsLocale, IntegrationsContent> = {
  sk: {
    metaTitle: 'Napojenie na Pohodu, Omegu a iDoklad – ProjentIQ',
    metaDescription:
      'Ako zapisujeme spracované doklady do Pohody (XML import), Omegy (import) a iDokladu (API): prijaté a vydané faktúry, pokladničné doklady, objednávky a adresár.',
    eyebrow: 'Integrácie',
    title: 'Napojenie na Pohodu, Omegu a iDoklad',
    lead: 'Spracované doklady zapíšeme priamo do účtovného systému, ktorý už používate. Bez nového programu a bez ručného prepisovania, vždy až po vašom schválení.',
    principle: {
      heading: 'Ako napojenie funguje',
      paragraphs: [
        'Napojenie je posledný krok spracovania. Doklad najprv prečítame, sporné polia označíme na kontrolu a až schválený záznam odovzdáme účtovnému systému v podobe, ktorej rozumie: ako súbor na import alebo cez jeho API.',
        'Účtovný systém ostáva hlavným miestom, kde účtujete. Nič v ňom nemeníme mimo agend, na ktorých sa dohodneme, a do účtovníctva ide len to, čo potvrdíte.'
      ]
    },
    agendas: {
      heading: 'Čo vieme zapisovať',
      lead: 'Rozsah napojenia dohodneme podľa toho, čo vo firme prepisujete najviac.',
      items: ['Prijaté faktúry', 'Vydané faktúry', 'Pokladničné doklady a bloky', 'Objednávky a adresár firiem']
    },
    systems: {
      heading: 'Podporované systémy',
      methodLabel: 'Spôsob zápisu',
      items: [
        {
          id: 'pohoda',
          name: 'Pohoda',
          method: 'XML import',
          text: 'Schválené doklady pripravíme ako XML, ktoré Pohoda načíta cez import. V Pohode tak vznikne bežný doklad v zvolenej agende, ktorý môžete ďalej spracovať ako ktorýkoľvek iný.'
        },
        {
          id: 'omega',
          name: 'Omega',
          method: 'Import',
          text: 'Doklady odovzdáme do Omegy importom. Formát a agendy, do ktorých sa importuje, nastavíme podľa toho, ako máte Omegu zariadenú.'
        },
        {
          id: 'idoklad',
          name: 'iDoklad',
          method: 'API',
          text: 'Do iDokladu zapisujeme cez jeho API. Schválený doklad sa v iDoklade objaví bez exportu a importu súborov.'
        },
        {
          id: 'ine',
          name: 'Iné systémy',
          method: 'API',
          text: 'ERP, CRM alebo vlastný systém napojíme cez API podľa dohody. Rovnaký postup platí pre ďalšie účtovné programy.'
        }
      ]
    },
    process: {
      heading: 'Ako napojenie prebieha',
      items: [
        { title: 'Analýza', text: 'Zistíme, ktoré doklady a agendy prepisujete a v akom systéme a verzii účtujete.' },
        { title: 'Návrh', text: 'Navrhneme spôsob zápisu (import alebo API) a čo presne sa bude zapisovať.' },
        { title: 'Pilot', text: 'Napojenie otestujeme na vašich reálnych dokladoch. Prvé funkčné demo máme zvyčajne do dvoch týždňov.' },
        { title: 'Prevádzka', text: 'Po vašom schválení sa napojenie stane súčasťou bežnej práce.' }
      ]
    },
    faq: {
      heading: 'Časté otázky o napojení',
      items: [
        { q: 'Musíme meniť účtovný program?', a: 'Nie. Doklady zapíšeme do systému, ktorý už používate: Pohoda, Omega, iDoklad alebo iný cez API.' },
        { q: 'Do ktorých agend viete zapisovať?', a: 'Prijaté a vydané faktúry, pokladničné doklady a bloky, objednávky a adresár firiem. Rozsah dohodneme podľa vašich potrieb.' },
        { q: 'Zapíše sa niečo bez môjho súhlasu?', a: 'Nie. Sporné polia sú vždy zvýraznené na kontrolu a do účtovníctva ide len to, čo potvrdíte.' },
        { q: 'Čo ak používame iný účtovný systém?', a: 'Iné systémy napájame cez API alebo import podľa dohody. Napíšte nám, aký systém používate, a pozrieme sa na možnosti.' },
        { q: 'Kde sú naše dáta?', a: 'Spracovanie prebieha v rámci EÚ a doklady nezdieľame s tretími stranami. Riešenie vieme nasadiť aj priamo na vašu infraštruktúru.' }
      ]
    },
    invoiceLink: 'Ako funguje automatické spracovanie faktúr'
  },
  cs: {
    metaTitle: 'Napojení na Pohodu, Omegu a iDoklad – ProjentIQ',
    metaDescription:
      'Jak zapisujeme zpracované doklady do Pohody (XML import), Omegy (import) a iDokladu (API): přijaté a vydané faktury, pokladní doklady, objednávky a adresář.',
    eyebrow: 'Integrace',
    title: 'Napojení na Pohodu, Omegu a iDoklad',
    lead: 'Zpracované doklady zapíšeme přímo do účetního systému, který už používáte. Bez nového programu a bez ručního přepisování, vždy až po vašem schválení.',
    principle: {
      heading: 'Jak napojení funguje',
      paragraphs: [
        'Napojení je poslední krok zpracování. Doklad nejdřív přečteme, sporná pole označíme ke kontrole a až schválený záznam předáme účetnímu systému v podobě, které rozumí: jako soubor pro import nebo přes jeho API.',
        'Účetní systém zůstává hlavním místem, kde účtujete. Nic v něm neměníme mimo agendy, na kterých se dohodneme, a do účetnictví jde jen to, co potvrdíte.'
      ]
    },
    agendas: {
      heading: 'Co umíme zapisovat',
      lead: 'Rozsah napojení dohodneme podle toho, co ve firmě přepisujete nejvíc.',
      items: ['Přijaté faktury', 'Vydané faktury', 'Pokladní doklady a účtenky', 'Objednávky a adresář firem']
    },
    systems: {
      heading: 'Podporované systémy',
      methodLabel: 'Způsob zápisu',
      items: [
        {
          id: 'pohoda',
          name: 'Pohoda',
          method: 'XML import',
          text: 'Schválené doklady připravíme jako XML, které Pohoda načte přes import. V Pohodě tak vznikne běžný doklad ve zvolené agendě, který můžete dál zpracovat jako kterýkoli jiný.'
        },
        {
          id: 'omega',
          name: 'Omega',
          method: 'Import',
          text: 'Doklady předáme do Omegy importem. Formát a agendy, do kterých se importuje, nastavíme podle toho, jak máte Omegu zařízenou.'
        },
        {
          id: 'idoklad',
          name: 'iDoklad',
          method: 'API',
          text: 'Do iDokladu zapisujeme přes jeho API. Schválený doklad se v iDokladu objeví bez exportu a importu souborů.'
        },
        {
          id: 'jine',
          name: 'Jiné systémy',
          method: 'API',
          text: 'ERP, CRM nebo vlastní systém napojíme přes API podle dohody. Stejný postup platí pro další účetní programy.'
        }
      ]
    },
    process: {
      heading: 'Jak napojení probíhá',
      items: [
        { title: 'Analýza', text: 'Zjistíme, které doklady a agendy přepisujete a v jakém systému a verzi účtujete.' },
        { title: 'Návrh', text: 'Navrhneme způsob zápisu (import nebo API) a co přesně se bude zapisovat.' },
        { title: 'Pilot', text: 'Napojení otestujeme na vašich reálných dokladech. První funkční demo máme obvykle do dvou týdnů.' },
        { title: 'Provoz', text: 'Po vašem schválení se napojení stane součástí běžné práce.' }
      ]
    },
    faq: {
      heading: 'Časté otázky k napojení',
      items: [
        { q: 'Musíme měnit účetní program?', a: 'Ne. Doklady zapíšeme do systému, který už používáte: Pohoda, Omega, iDoklad nebo jiný přes API.' },
        { q: 'Do kterých agend umíte zapisovat?', a: 'Přijaté a vydané faktury, pokladní doklady a účtenky, objednávky a adresář firem. Rozsah dohodneme podle vašich potřeb.' },
        { q: 'Zapíše se něco bez mého souhlasu?', a: 'Ne. Sporná pole jsou vždy zvýrazněná ke kontrole a do účetnictví jde jen to, co potvrdíte.' },
        { q: 'Co když používáme jiný účetní systém?', a: 'Jiné systémy napojujeme přes API nebo import podle dohody. Napište nám, jaký systém používáte, a podíváme se na možnosti.' },
        { q: 'Kde jsou naše data?', a: 'Zpracování probíhá v rámci EU a doklady nesdílíme s třetími stranami. Řešení umíme nasadit i přímo na vaši infrastrukturu.' }
      ]
    },
    invoiceLink: 'Jak funguje automatické zpracování faktur'
  },
  en: {
    metaTitle: 'Integration with Pohoda, Omega and iDoklad – ProjentIQ',
    metaDescription:
      'How we write processed documents to Pohoda (XML import), Omega (import) and iDoklad (API): received and issued invoices, receipts, orders and the contact directory.',
    eyebrow: 'Integrations',
    title: 'Integration with Pohoda, Omega and iDoklad',
    lead: 'We write processed documents straight into the accounting system you already use. No new software and no retyping, and always only after you approve.',
    principle: {
      heading: 'How the integration works',
      paragraphs: [
        'The integration is the last step of processing. We first read the document, flag uncertain fields for review, and only then hand the approved record to your accounting system in a form it understands: as an import file or through its API.',
        'Your accounting system stays the place where you do your accounting. We change nothing in it outside the areas we agree on, and only what you confirm goes into your books.'
      ]
    },
    agendas: {
      heading: 'What we can write',
      lead: 'We agree on the scope based on what your team retypes the most.',
      items: ['Received invoices', 'Issued invoices', 'Cash receipts', 'Orders and the company directory']
    },
    systems: {
      heading: 'Supported systems',
      methodLabel: 'How data is written',
      items: [
        {
          id: 'pohoda',
          name: 'Pohoda',
          method: 'XML import',
          text: 'Approved documents are prepared as XML that Pohoda loads through its import. Pohoda then holds a regular document in the chosen area that you can work with like any other.'
        },
        {
          id: 'omega',
          name: 'Omega',
          method: 'Import',
          text: 'Documents are handed over to Omega via import. We set the format and target areas to match how your Omega is configured.'
        },
        {
          id: 'idoklad',
          name: 'iDoklad',
          method: 'API',
          text: 'We write to iDoklad through its API. An approved document appears in iDoklad without exporting or importing files.'
        },
        {
          id: 'other',
          name: 'Other systems',
          method: 'API',
          text: 'We connect your ERP, CRM or in-house system through an API, as agreed. The same approach works for other accounting software.'
        }
      ]
    },
    process: {
      heading: 'How the integration is set up',
      items: [
        { title: 'Analysis', text: 'We find out which documents and areas you retype, and which system and version you use.' },
        { title: 'Design', text: 'We propose how data is written (import or API) and exactly what gets written.' },
        { title: 'Pilot', text: 'We test the integration on your real documents. The first working demo is usually ready within two weeks.' },
        { title: 'Operation', text: 'Once you approve, the integration becomes part of everyday work.' }
      ]
    },
    faq: {
      heading: 'Integration FAQ',
      items: [
        { q: 'Do we need to change our accounting software?', a: 'No. We write documents to the system you already use: Pohoda, Omega, iDoklad, or another one through an API.' },
        { q: 'Which areas can you write to?', a: 'Received and issued invoices, cash receipts, orders and the company directory. We agree on the scope based on your needs.' },
        { q: 'Is anything written without my approval?', a: 'No. Uncertain fields are always highlighted for review, and only what you confirm goes into your books.' },
        { q: 'What if we use a different accounting system?', a: 'We connect other systems through an API or import, as agreed. Tell us which system you use and we will look at the options.' },
        { q: 'Where is our data?', a: 'Processing happens within the EU and we do not share documents with third parties. We can also deploy the solution on your own infrastructure.' }
      ]
    },
    invoiceLink: 'How automated invoice processing works'
  }
}
