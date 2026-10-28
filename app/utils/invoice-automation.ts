// Texty stránky /sk/automatizacia-faktur/ (cs, en). Tvrdenia len podľa
// docs/blog/guide.md („Čo smie článok tvrdiť o ProjentIQ“) a odpovedí
// majiteľa: vstupy PDF, skeny a fotky, ISDOC/XML, zahraničné faktúry;
// zápis Pohoda XML import, Omega import, iDoklad API, iné systémy cez API.
// Ceny sa dopĺňajú z utils/pricing.ts ({setup}, {monthly}, {pilot}).

export type ServicePageLocale = 'sk' | 'cs' | 'en'

interface TitledText {
  title: string
  text: string
}

export interface ServicePageContent {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  ctaTry: string
  problem: { heading: string; paragraphs: string[] }
  steps: { heading: string; items: TitledText[] }
  demo: { heading: string; lead: string }
  fields: { heading: string; items: string[]; inputsHeading: string; inputs: string[] }
  integrations: { heading: string; lead: string; items: TitledText[] }
  control: { heading: string; items: TitledText[] }
  pricing: { heading: string; text: string; note: string }
  faq: { heading: string; items: { q: string; a: string }[] }
  related: string
}

export const INVOICE_AUTOMATION: Record<ServicePageLocale, ServicePageContent> = {
  sk: {
    metaTitle: 'Automatické spracovanie faktúr do Pohody, Omegy a iDokladu – ProjentIQ',
    metaDescription:
      'Faktúry z e-mailu, skenu aj ISDOC vyťažíme a po vašom schválení zapíšeme do Pohody, Omegy či iDokladu. Bezplatné demo na vašich dokladoch.',
    eyebrow: 'Automatizácia faktúr',
    title: 'Faktúry do účtovníctva bez ručného prepisovania',
    lead: 'Prijaté faktúry z e-mailu, skenu aj ISDOC prečítame, sporné polia označíme na kontrolu a po vašom schválení ich zapíšeme do Pohody, Omegy alebo iDokladu.',
    ctaTry: 'Vyskúšať ukážku',
    problem: {
      heading: 'Prepisovanie faktúr netreba robiť ručne',
      paragraphs: [
        'Každá prijatá faktúra znamená to isté: otvoriť prílohu, nájsť dodávateľa, IČO, dátumy, sumy a DPH a prepísať ich do účtovného programu. Pri desiatkach dokladov mesačne to zaberie hodiny a pri každom prepise môže vzniknúť preklep.',
        'Koľko času to stojí vo vašej firme, si zmeriate sami: spočítajte faktúry za mesiac a odmerajte, ako dlho trvá zápis jednej. S týmto číslom potom porovnáme pilot.'
      ]
    },
    steps: {
      heading: 'Ako spracovanie funguje',
      items: [
        { title: 'Doklad príde', text: 'E-mailom, zo zdieľaného disku alebo skenera: ako PDF, sken, fotka z mobilu alebo elektronická faktúra ISDOC či XML.' },
        { title: 'Vyťaženie údajov', text: 'Systém z dokladu prečíta dodávateľa, IČO, číslo faktúry, dátumy, sumy a DPH, aj pri zahraničných faktúrach.' },
        { title: 'Kontrola sporných polí', text: 'Čo sa nedá prečítať alebo nesedí, sa zvýrazní. Nič sa nepreskočí potichu.' },
        { title: 'Schválenie človekom', text: 'Účtovník vidí doklad vedľa vyťažených údajov a potvrdí ich alebo opraví. Systém sa z opráv učí.' },
        { title: 'Zápis do účtovníctva', text: 'Až schválený záznam sa odovzdá účtovnému systému: do Pohody ako XML import, do Omegy importom, do iDokladu cez API.' }
      ]
    },
    demo: {
      heading: 'Vyskúšajte si to na vzorovej faktúre',
      lead: 'Kliknite na „Spracovať doklad“ a pozrite, ktoré údaje systém vytiahne. Ukážka beží na vzorových dátach, nič sa neodosiela.'
    },
    fields: {
      heading: 'Čo systém z faktúry prečíta',
      items: [
        'Dodávateľ a jeho IČO',
        'Číslo faktúry',
        'Dátum vystavenia a splatnosti',
        'Základ dane, DPH a celková suma'
      ],
      inputsHeading: 'Aké doklady spracujeme',
      inputs: [
        'PDF faktúry z e-mailu',
        'Skeny a fotky papierových faktúr',
        'Elektronické faktúry ISDOC a XML',
        'Zahraničné faktúry v iných jazykoch a menách'
      ]
    },
    integrations: {
      heading: 'Napojenie na váš účtovný systém',
      lead: 'Údaje zapíšeme tam, kde už účtujete. Účtovný program meniť nemusíte.',
      items: [
        { title: 'Pohoda', text: 'Schválené doklady pripravíme ako XML na import do Pohody.' },
        { title: 'Omega', text: 'Doklady odovzdáme do Omegy importom.' },
        { title: 'iDoklad', text: 'Zápis prebieha cez API iDokladu.' },
        { title: 'Iné systémy', text: 'ERP alebo vlastný systém napojíme cez API podľa dohody.' }
      ]
    },
    control: {
      heading: 'Kontrolu máte vy',
      items: [
        { title: 'Nič sa nezapíše bez schválenia', text: 'Sporné polia sú vždy zvýraznené na kontrolu a do účtovníctva ide len to, čo potvrdíte.' },
        { title: 'Dáta ostávajú v EÚ', text: 'Spracovanie prebieha v rámci EÚ a doklady nezdieľame s tretími stranami. Pri citlivých prevádzkach vieme riešenie nasadiť priamo na vašu infraštruktúru.' },
        { title: 'Najprv pilot', text: 'Riešenie najprv overíme na vašich reálnych dokladoch a výsledok porovnáme s kritériom, ktoré si určíme vopred.' }
      ]
    },
    pricing: {
      heading: 'Koľko to stojí',
      text: 'Automatizácia jedného jasne ohraničeného procesu stojí od {setup} € jednorazovo alebo od {monthly} € mesačne. Pilot s pevnou cenou {pilot} € vám celý odpočítame od implementácie, ak sa rozhodnete pokračovať.',
      note: 'Ceny sú konečné, nie sme platiteľom DPH. Presný rozsah potvrdíme pred začiatkom.'
    },
    faq: {
      heading: 'Časté otázky o automatizácii faktúr',
      items: [
        { q: 'Spracuje aj naskenované a odfotené faktúry?', a: 'Áno. Okrem PDF z e-mailu spracujeme skeny aj fotky z mobilu. Polia, ktoré sa nedajú spoľahlivo prečítať, systém zvýrazní na kontrolu.' },
        { q: 'Zvládne zahraničné faktúry?', a: 'Áno, spracujeme aj faktúry v iných jazykoch a menách. Ako pri každom doklade, sporné hodnoty sa zvýraznia na kontrolu.' },
        { q: 'Funguje to s Pohodou?', a: 'Áno. Schválené doklady pripravíme ako XML na import do Pohody. Na Omegu sa napájame importom a na iDoklad cez API.' },
        { q: 'Čo ak systém údaj prečíta zle?', a: 'Sporné polia sú vždy zvýraznené na kontrolu a nič sa nezapíše bez vášho schválenia. Systém sa navyše učí z vašich opráv.' },
        { q: 'Ako rýchlo to vieme vyskúšať?', a: 'Prvé funkčné demo na vašich dokladoch máme zvyčajne do dvoch týždňov. Plné nasadenie závisí od rozsahu.' },
        { q: 'Kde sú naše doklady uložené?', a: 'Spracovanie prebieha v rámci EÚ a doklady nezdieľame s tretími stranami. Riešenie vieme nasadiť aj priamo na vašu infraštruktúru.' }
      ]
    },
    related: 'Podrobne: ako funguje tok faktúr do Pohody a kde sú jeho limity'
  },
  cs: {
    metaTitle: 'Automatické zpracování faktur do Pohody, Omegy a iDokladu – ProjentIQ',
    metaDescription:
      'Faktury z e-mailu, skenu i ISDOC vytěžíme a po vašem schválení zapíšeme do Pohody, Omegy či iDokladu. Demo zdarma na vašich dokladech.',
    eyebrow: 'Automatizace faktur',
    title: 'Faktury do účetnictví bez ručního přepisování',
    lead: 'Přijaté faktury z e-mailu, skenu i ISDOC přečteme, sporná pole označíme ke kontrole a po vašem schválení je zapíšeme do Pohody, Omegy nebo iDokladu.',
    ctaTry: 'Vyzkoušet ukázku',
    problem: {
      heading: 'Přepisování faktur není potřeba dělat ručně',
      paragraphs: [
        'Každá přijatá faktura znamená totéž: otevřít přílohu, najít dodavatele, IČO, data, částky a DPH a přepsat je do účetního programu. U desítek dokladů měsíčně to zabere hodiny a při každém přepisu může vzniknout překlep.',
        'Kolik času to stojí ve vaší firmě, si změříte sami: sečtěte faktury za měsíc a změřte, jak dlouho trvá zápis jedné. S tímto číslem pak porovnáme pilot.'
      ]
    },
    steps: {
      heading: 'Jak zpracování funguje',
      items: [
        { title: 'Doklad přijde', text: 'E-mailem, ze sdíleného disku nebo skeneru: jako PDF, sken, fotka z mobilu nebo elektronická faktura ISDOC či XML.' },
        { title: 'Vytěžení údajů', text: 'Systém z dokladu přečte dodavatele, IČO, číslo faktury, data, částky a DPH, i u zahraničních faktur.' },
        { title: 'Kontrola sporných polí', text: 'Co nejde přečíst nebo nesedí, se zvýrazní. Nic se nepřeskočí potichu.' },
        { title: 'Schválení člověkem', text: 'Účetní vidí doklad vedle vytěžených údajů a potvrdí je nebo opraví. Systém se z oprav učí.' },
        { title: 'Zápis do účetnictví', text: 'Až schválený záznam se předá účetnímu systému: do Pohody jako XML import, do Omegy importem, do iDokladu přes API.' }
      ]
    },
    demo: {
      heading: 'Vyzkoušejte si to na vzorové faktuře',
      lead: 'Klikněte na „Zpracovat doklad“ a podívejte se, které údaje systém vytáhne. Ukázka běží na vzorových datech, nic se neodesílá.'
    },
    fields: {
      heading: 'Co systém z faktury přečte',
      items: [
        'Dodavatel a jeho IČO',
        'Číslo faktury',
        'Datum vystavení a splatnosti',
        'Základ daně, DPH a celková částka'
      ],
      inputsHeading: 'Jaké doklady zpracujeme',
      inputs: [
        'PDF faktury z e-mailu',
        'Skeny a fotky papírových faktur',
        'Elektronické faktury ISDOC a XML',
        'Zahraniční faktury v jiných jazycích a měnách'
      ]
    },
    integrations: {
      heading: 'Napojení na váš účetní systém',
      lead: 'Údaje zapíšeme tam, kde už účtujete. Účetní program měnit nemusíte.',
      items: [
        { title: 'Pohoda', text: 'Schválené doklady připravíme jako XML pro import do Pohody.' },
        { title: 'Omega', text: 'Doklady předáme do Omegy importem.' },
        { title: 'iDoklad', text: 'Zápis probíhá přes API iDokladu.' },
        { title: 'Jiné systémy', text: 'ERP nebo vlastní systém napojíme přes API podle dohody.' }
      ]
    },
    control: {
      heading: 'Kontrolu máte vy',
      items: [
        { title: 'Nic se nezapíše bez schválení', text: 'Sporná pole jsou vždy zvýrazněná ke kontrole a do účetnictví jde jen to, co potvrdíte.' },
        { title: 'Data zůstávají v EU', text: 'Zpracování probíhá v rámci EU a doklady nesdílíme s třetími stranami. U citlivých provozů umíme řešení nasadit přímo na vaši infrastrukturu.' },
        { title: 'Nejdřív pilot', text: 'Řešení nejdřív ověříme na vašich reálných dokladech a výsledek porovnáme s kritériem, které si stanovíme předem.' }
      ]
    },
    pricing: {
      heading: 'Kolik to stojí',
      text: 'Automatizace jednoho jasně ohraničeného procesu stojí od {setup} € jednorázově nebo od {monthly} € měsíčně. Pilot s pevnou cenou {pilot} € vám celý odečteme od implementace, pokud se rozhodnete pokračovat.',
      note: 'Ceny jsou konečné, nejsme plátci DPH. Přesný rozsah potvrdíme před začátkem.'
    },
    faq: {
      heading: 'Časté otázky k automatizaci faktur',
      items: [
        { q: 'Zpracuje i naskenované a vyfocené faktury?', a: 'Ano. Kromě PDF z e-mailu zpracujeme skeny i fotky z mobilu. Pole, která nejde spolehlivě přečíst, systém zvýrazní ke kontrole.' },
        { q: 'Zvládne zahraniční faktury?', a: 'Ano, zpracujeme i faktury v jiných jazycích a měnách. Jako u každého dokladu se sporné hodnoty zvýrazní ke kontrole.' },
        { q: 'Funguje to s Pohodou?', a: 'Ano. Schválené doklady připravíme jako XML pro import do Pohody. Na Omegu se napojujeme importem a na iDoklad přes API.' },
        { q: 'Co když systém údaj přečte špatně?', a: 'Sporná pole jsou vždy zvýrazněná ke kontrole a nic se nezapíše bez vašeho schválení. Systém se navíc učí z vašich oprav.' },
        { q: 'Jak rychle to můžeme vyzkoušet?', a: 'První funkční demo na vašich dokladech máme obvykle do dvou týdnů. Plné nasazení záleží na rozsahu.' },
        { q: 'Kde jsou naše doklady uložené?', a: 'Zpracování probíhá v rámci EU a doklady nesdílíme s třetími stranami. Řešení umíme nasadit i přímo na vaši infrastrukturu.' }
      ]
    },
    related: 'Podrobně: jak funguje tok faktur do Pohody a kde má své limity'
  },
  en: {
    metaTitle: 'Automated invoice processing into Pohoda, Omega and iDoklad – ProjentIQ',
    metaDescription:
      'We extract invoices from email, scans and ISDOC and, once you approve them, write them to Pohoda, Omega or iDoklad. Free demo on your own documents.',
    eyebrow: 'Invoice automation',
    title: 'Invoices into your accounting without retyping',
    lead: 'We read incoming invoices from email, scans and ISDOC, flag uncertain fields for review and, once you approve, write them to Pohoda, Omega or iDoklad.',
    ctaTry: 'Try the demo',
    problem: {
      heading: 'Retyping invoices does not have to be manual work',
      paragraphs: [
        'Every incoming invoice means the same steps: open the attachment, find the supplier, company ID, dates, amounts and VAT, and type them into the accounting software. With dozens of documents a month that takes hours, and every retype is a chance for a typo.',
        'You can measure what it costs your company yourself: count last month’s invoices and time how long one entry takes. That number is what we compare the pilot against.'
      ]
    },
    steps: {
      heading: 'How the processing works',
      items: [
        { title: 'The document arrives', text: 'By email, from a shared drive or a scanner: as a PDF, a scan, a phone photo or an ISDOC or XML e-invoice.' },
        { title: 'Data extraction', text: 'The system reads the supplier, company ID, invoice number, dates, amounts and VAT, including on foreign invoices.' },
        { title: 'Uncertain fields are flagged', text: 'Anything that cannot be read or does not add up is highlighted. Nothing is skipped silently.' },
        { title: 'A person approves', text: 'The accountant sees the document next to the extracted data and confirms or corrects it. The system learns from the corrections.' },
        { title: 'Entry into accounting', text: 'Only approved records reach the accounting system: Pohoda via XML import, Omega via import, iDoklad via its API.' }
      ]
    },
    demo: {
      heading: 'Try it on a sample invoice',
      lead: 'Click “Process document” and see which data the system extracts. The demo runs on sample data and sends nothing.'
    },
    fields: {
      heading: 'What the system reads from an invoice',
      items: [
        'Supplier and company ID',
        'Invoice number',
        'Issue and due date',
        'Tax base, VAT and total'
      ],
      inputsHeading: 'Which documents we process',
      inputs: [
        'PDF invoices from email',
        'Scans and photos of paper invoices',
        'ISDOC and XML e-invoices',
        'Foreign invoices in other languages and currencies'
      ]
    },
    integrations: {
      heading: 'Connected to your accounting system',
      lead: 'We write the data where you already do your accounting. You do not need to switch software.',
      items: [
        { title: 'Pohoda', text: 'Approved documents are prepared as XML for import into Pohoda.' },
        { title: 'Omega', text: 'Documents are handed over to Omega via import.' },
        { title: 'iDoklad', text: 'Entries go through the iDoklad API.' },
        { title: 'Other systems', text: 'We connect your ERP or in-house system through an API, as agreed.' }
      ]
    },
    control: {
      heading: 'You stay in control',
      items: [
        { title: 'Nothing is written without approval', text: 'Uncertain fields are always highlighted for review, and only what you confirm goes into your accounting.' },
        { title: 'Data stays in the EU', text: 'Processing happens within the EU and we do not share documents with third parties. For sensitive operations we can deploy the solution on your own infrastructure.' },
        { title: 'Pilot first', text: 'We first test the solution on your real documents and compare the result with a success criterion we agree on up front.' }
      ]
    },
    pricing: {
      heading: 'What it costs',
      text: 'Automating one clearly defined process costs from €{setup} one-off or from €{monthly} per month. If you decide to continue, we deduct the full price of the fixed-price pilot (€{pilot}) from the implementation.',
      note: 'Prices are final; we are not VAT registered. We confirm the exact scope before we start.'
    },
    faq: {
      heading: 'Invoice automation FAQ',
      items: [
        { q: 'Does it handle scanned and photographed invoices?', a: 'Yes. Besides PDFs from email we process scans and phone photos. Fields that cannot be read reliably are highlighted for review.' },
        { q: 'Can it process foreign invoices?', a: 'Yes, we also process invoices in other languages and currencies. As with any document, uncertain values are highlighted for review.' },
        { q: 'Does it work with Pohoda?', a: 'Yes. Approved documents are prepared as XML for import into Pohoda. We connect to Omega via import and to iDoklad via its API.' },
        { q: 'What if the system reads a value wrong?', a: 'Uncertain fields are always highlighted for review and nothing is written without your approval. The system also learns from your corrections.' },
        { q: 'How fast can we try it?', a: 'The first working demo on your documents is usually ready within two weeks. Full deployment depends on the scope.' },
        { q: 'Where are our documents stored?', a: 'Processing happens within the EU and we do not share documents with third parties. We can also deploy the solution on your own infrastructure.' }
      ]
    },
    related: 'In depth: how the invoice flow into Pohoda works and where its limits are'
  }
}
