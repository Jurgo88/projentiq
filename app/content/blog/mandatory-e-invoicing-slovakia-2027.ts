// Slug = názov súboru.
// Aktuálna téma (#59): fakty len z Finančnej správy SR (stránka eFaktúra,
// FAQ 9/DPH/2025/IM z 11. 9. 2026, tlačová správa z 29. 7. 2026) a Európskej
// komisie. Pri zmene pravidiel aktualizovať text a doplniť dateModified.
export default defineBlogPost({
  datePublished: '2026-10-28',
  cover: {
    sk: {
      tag: 'E-faktúra',
      card: { badge: '2027', label: 'Povinná e-faktúra od 1. 1. 2027', text: 'Viete od januára prijímať eFaktúry?' },
      headline: 'Prijímať ich musí každý podnikateľ.',
      highlight: 'Vystavovať platitelia DPH.',
      footnote: 'Čo pripraviť do konca roka a čo platí do roku 2030.'
    },
    cs: {
      tag: 'E-faktura',
      card: { badge: '2027', label: 'Povinná e-faktura na Slovensku od 2027', text: 'Umíte od ledna přijímat eFaktury?' },
      headline: 'Přijímat je musí každý podnikatel.',
      highlight: 'Vystavovat plátci DPH.',
      footnote: 'Co připravit do konce roku a co platí do roku 2030.'
    },
    en: {
      tag: 'E-invoicing',
      card: { badge: '2027', label: 'Mandatory e-invoicing in Slovakia', text: 'Can you receive e-invoices from January?' },
      headline: 'Every business must receive them.',
      highlight: 'VAT payers must issue them.',
      footnote: 'What to prepare by year-end and what applies until 2030.'
    }
  },
  reel: {
    hook: 'Viete od januára prijímať eFaktúry?',
    scenes: [
      {
        text: 'Od 1. januára 2027 ich musí prijímať každý podnikateľ na Slovensku.',
        highlight: 'Aj živnostník, ktorý nie je platiteľom DPH.'
      },
      { text: 'Platitelia DPH ich budú posielať ako XML cez sieť Peppol.', highlight: 'PDF ani sken už eFaktúrou nie je.' },
      {
        text: 'Faktúry doručuje certifikovaný digitálny poštár.',
        highlight: 'Finančná správa odhaduje cenu na 5 až 12 € mesačne.'
      }
    ],
    steps: {
      title: 'Čo urobiť do konca roka',
      items: [
        'Overte, či váš účtovný program zvládne eFaktúry.',
        'Vyberte si certifikovaného digitálneho poštára.',
        'Vyskúšajte posielanie aj prijímanie.'
      ]
    },
    cta: 'Koho sa to týka, čo platí do roku 2030 a aké sú pokuty, je v článku.'
  },
  imageAlt: {
    sk: 'Tmavá grafika ProjentIQ: Povinná e-faktúra od 1. 1. 2027. Viete od januára prijímať eFaktúry? Prijímať ich musí každý podnikateľ, vystavovať platitelia DPH.',
    cs: 'Tmavá grafika ProjentIQ: Povinná e-faktura na Slovensku od 2027. Umíte od ledna přijímat eFaktury? Přijímat je musí každý podnikatel, vystavovat plátci DPH.',
    en: 'Dark ProjentIQ graphic: Mandatory e-invoicing in Slovakia. Can you receive e-invoices from January? Every business must receive them, VAT payers must issue them.'
  },
  tags: ['Documents', 'Processes', 'Automation'],
  content: {
    sk: {
      title: 'Povinná e-faktúra od 1. januára 2027: čo musí vaša firma urobiť',
      perex: 'Od januára musia platitelia DPH posielať firmám faktúry ako elektronický XML súbor a prijímať ich musí každý podnikateľ. Zhrnuli sme, koho sa to týka a čo pripraviť do konca roka.',
      sections: [
        {
          heading: 'Čo sa mení od 1. januára 2027',
          paragraphs: [
            'Novela zákona o DPH zavádza povinnú elektronickú fakturáciu. Platitelia DPH budú faktúry za tuzemské dodania firmám a verejnej správe vyhotovovať ako eFaktúru. Je to štruktúrovaný súbor `XML` podľa európskej normy EN 16931, nie PDF ani naskenovaný dokument. Účtovný program ho vie načítať bez ručného prepisovania.',
            'Faktúry sa budú posielať cez európsku sieť Peppol prostredníctvom certifikovaných poskytovateľov doručovacej služby, ktorým finančná správa hovorí digitálni poštári. Údaje z faktúry sa pri tom automaticky oznámia finančnej správe.'
          ]
        },
        {
          heading: 'Koho sa to týka',
          items: [
            { title: 'Platitelia DPH', text: 'Od 1. januára 2027 vystavujú eFaktúry pri tuzemských dodaniach firmám (B2B) aj verejnej správe (B2G).' },
            { title: 'Všetci podnikatelia', text: 'eFaktúry musí vedieť prijímať každá právnická osoba a každý podnikateľ, aj neplatiteľ DPH: živnostníci, slobodné povolania aj prenajímatelia nehnuteľností.' },
            { title: 'Spotrebitelia', text: 'Faktúr pre bežných ľudí (B2C) sa povinnosť netýka.' },
            { title: 'Zahraniční partneri', text: 'Systém je zatiaľ určený len pre tuzemské faktúry. Cezhraničná elektronická fakturácia v rámci EÚ sa plánuje od 1. júla 2030.' }
          ]
        },
        {
          heading: 'Čo urobiť do konca roka',
          ordered: true,
          paragraphs: ['Finančná správa odporúča pripraviť sa v roku 2026. Postup pre firmu:'],
          items: [
            { title: 'Overte účtovný program', text: 'Opýtajte sa dodávateľa, či program vie vystaviť a prijať faktúru vo formáte Peppol BIS. Mnohým firmám postačí aktualizácia.' },
            { title: 'Vyberte si digitálneho poštára', text: 'Zmluvu uzavriete priamo alebo cez dodávateľa účtovného programu. [Zoznam certifikovaných poskytovateľov](https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-pridanej-hodnoty/e-faktura) zverejňuje finančná správa.' },
            { title: 'Otestujte posielanie aj prijímanie', text: 'Do systému sa dá zapojiť dobrovoľne už teraz, pred spustením povinnosti.' },
            { title: 'Dohodnite sa s odberateľmi a dodávateľmi', text: 'Zistite, kto bude faktúry posielať cez digitálneho poštára a s kým sa dohodnete na inom spôsobe.' },
            { title: 'Upravte archiváciu', text: 'Platiteľ DPH musí eFaktúry archivovať v pôvodnom formáte `XML`, nie len ako PDF.' }
          ]
        },
        {
          heading: 'Prechodné obdobie, pokuty a náklady',
          paragraphs: [
            'Do 30. júna 2030 platí prechodné obdobie. Faktúru možno poslať aj inak ako cez digitálneho poštára, napríklad cez EDI alebo e-mailom, ak s tým príjemca súhlasí. Súhlas môže byť aj nepriamy, napríklad keď odberateľ faktúru prijme a zaplatí. Stále však musí ísť o štruktúrovaný súbor podľa normy EN 16931 a príjemca musí vedieť prijímať faktúry aj cez digitálneho poštára.',
            'Od 1. júla 2030 sa ruší kontrolný a súhrnný výkaz. Údaje z faktúr bude finančná správa dostávať priebežne.',
            'Za neoznámené, nesprávne alebo oneskorene oznámené údaje hrozí pokuta do 10 000 eur, pri opakovanom porušení do 100 000 eur. Podľa finančnej správy sa nepokutuje zrejmý omyl, ktorý hneď opravíte, ani preukázateľné zlyhanie digitálneho poštára, ak údaje oznámite hneď po odstránení poruchy.',
            'Cenu služby určuje poskytovateľ. Finančná správa predpokladá, že jednoduchá aplikácia digitálneho poštára nebude stáť viac ako priemer v EÚ, teda približne 5 až 12 eur mesačne.'
          ]
        },
        {
          heading: 'Čo to znamená pre prijaté faktúry',
          paragraphs: [
            'eFaktúra odstráni prepisovanie pri tuzemských faktúrach od platiteľov DPH: údaje prídu v štruktúrovanej podobe a účtovný program ich načíta sám. Ostatné doklady však budú chodiť ďalej ako PDF alebo na papieri: faktúry od zahraničných dodávateľov, od neplatiteľov DPH, ktorí sa do systému nezapoja, aj pokladničné doklady. Tie bude treba spracovať ako doteraz.',
            'Tento článok je prehľad podľa informácií finančnej správy, nie daňové poradenstvo. Pri konkrétnej situácii sa poraďte s účtovníkom alebo daňovým poradcom.'
          ]
        }
      ],
      takeaway: 'Od 1. januára 2027 musí každý podnikateľ vedieť prijímať eFaktúry a platitelia DPH ich musia vystavovať. Do konca roka overte účtovný program, vyberte si digitálneho poštára a vyskúšajte posielanie aj prijímanie.'
    },
    cs: {
      title: 'Povinná e-faktura na Slovensku od roku 2027: co musí udělat vaše firma',
      perex: 'Od ledna musí slovenští plátci DPH posílat firmám faktury jako elektronický XML soubor a přijímat je musí každý podnikatel na Slovensku. Shrnuli jsme, koho se to týká a co připravit do konce roku.',
      sections: [
        {
          heading: 'Co se mění od 1. ledna 2027',
          paragraphs: [
            'Novela slovenského zákona o DPH zavádí povinnou elektronickou fakturaci. Plátci DPH budou faktury za tuzemská dodání firmám a veřejné správě vystavovat jako eFakturu. Je to strukturovaný soubor `XML` podle evropské normy EN 16931, ne PDF ani naskenovaný dokument. Účetní program ho umí načíst bez ručního přepisování.',
            'Faktury se budou posílat přes evropskou síť Peppol prostřednictvím certifikovaných poskytovatelů doručovací služby, kterým slovenská finanční správa říká digitální pošťáci. Údaje z faktury se přitom automaticky oznámí finanční správě.'
          ]
        },
        {
          heading: 'Koho se to týká',
          items: [
            { title: 'Plátci DPH', text: 'Od 1. ledna 2027 vystavují eFaktury při tuzemských dodáních firmám (B2B) i veřejné správě (B2G).' },
            { title: 'Všichni podnikatelé', text: 'eFaktury musí umět přijímat každá právnická osoba a každý podnikatel, i neplátce DPH: živnostníci, svobodná povolání i pronajímatelé nemovitostí.' },
            { title: 'Spotřebitelé', text: 'Faktur pro běžné lidi (B2C) se povinnost netýká.' },
            { title: 'Zahraniční partneři', text: 'Systém je zatím určen jen pro tuzemské slovenské faktury. Přeshraniční elektronická fakturace v rámci EU se plánuje od 1. července 2030.' }
          ]
        },
        {
          heading: 'Co udělat do konce roku',
          ordered: true,
          paragraphs: ['Slovenská finanční správa doporučuje připravit se v roce 2026. Postup pro firmu:'],
          items: [
            { title: 'Ověřte účetní program', text: 'Zeptejte se dodavatele, zda program umí vystavit a přijmout fakturu ve formátu Peppol BIS. Mnoha firmám postačí aktualizace.' },
            { title: 'Vyberte si digitálního pošťáka', text: 'Smlouvu uzavřete přímo nebo přes dodavatele účetního programu. [Seznam certifikovaných poskytovatelů](https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-pridanej-hodnoty/e-faktura) zveřejňuje slovenská finanční správa.' },
            { title: 'Otestujte odesílání i přijímání', text: 'Do systému se lze zapojit dobrovolně už teď, před spuštěním povinnosti.' },
            { title: 'Domluvte se s odběrateli a dodavateli', text: 'Zjistěte, kdo bude faktury posílat přes digitálního pošťáka a s kým se dohodnete na jiném způsobu.' },
            { title: 'Upravte archivaci', text: 'Plátce DPH musí eFaktury archivovat v původním formátu `XML`, ne jen jako PDF.' }
          ]
        },
        {
          heading: 'Přechodné období, pokuty a náklady',
          paragraphs: [
            'Do 30. června 2030 platí přechodné období. Fakturu lze poslat i jinak než přes digitálního pošťáka, například přes EDI nebo e-mailem, pokud s tím příjemce souhlasí. Souhlas může být i nepřímý, například když odběratel fakturu přijme a zaplatí. Stále však musí jít o strukturovaný soubor podle normy EN 16931 a příjemce musí umět přijímat faktury i přes digitálního pošťáka.',
            'Od 1. července 2030 se ruší kontrolní a souhrnný výkaz. Údaje z faktur bude finanční správa dostávat průběžně.',
            'Za neoznámené, nesprávné nebo opožděně oznámené údaje hrozí pokuta do 10 000 eur, při opakovaném porušení do 100 000 eur. Podle finanční správy se nepokutuje zjevný omyl, který hned opravíte, ani prokazatelné selhání digitálního pošťáka, pokud údaje oznámíte hned po odstranění poruchy.',
            'Cenu služby určuje poskytovatel. Finanční správa předpokládá, že jednoduchá aplikace digitálního pošťáka nebude stát víc než průměr v EU, tedy přibližně 5 až 12 eur měsíčně.'
          ]
        },
        {
          heading: 'Co to znamená pro přijaté faktury',
          paragraphs: [
            'eFaktura odstraní přepisování u tuzemských faktur od plátců DPH: údaje přijdou ve strukturované podobě a účetní program je načte sám. Ostatní doklady ale budou chodit dál jako PDF nebo na papíře: faktury od zahraničních dodavatelů, od neplátců DPH, kteří se do systému nezapojí, i pokladní doklady. Ty bude potřeba zpracovat jako dosud.',
            'Tento článek je přehled podle informací slovenské finanční správy, ne daňové poradenství. U konkrétní situace se poraďte s účetním nebo daňovým poradcem.'
          ]
        }
      ],
      takeaway: 'Od 1. ledna 2027 musí každý podnikatel na Slovensku umět přijímat eFaktury a plátci DPH je musí vystavovat. Do konce roku ověřte účetní program, vyberte si digitálního pošťáka a vyzkoušejte odesílání i přijímání.'
    },
    en: {
      title: 'Mandatory e-invoicing in Slovakia from 2027: what your business must do',
      perex: 'From January, Slovak VAT payers must send business invoices as XML files, and every business in Slovakia must be able to receive them. Who it affects and what to prepare by year-end.',
      sections: [
        {
          heading: 'What changes on 1 January 2027',
          paragraphs: [
            'An amendment to the Slovak VAT Act introduces mandatory electronic invoicing. VAT payers will issue invoices for domestic supplies to businesses and public bodies as an e-invoice. That is a structured `XML` file under the European standard EN 16931, not a PDF or a scanned document. Accounting software can read it without retyping.',
            'Invoices will travel over the European Peppol network through certified delivery service providers, which the Slovak Financial Administration calls digital postmen. The invoice data is reported to the Financial Administration automatically along the way.'
          ]
        },
        {
          heading: 'Who it affects',
          items: [
            { title: 'VAT payers', text: 'From 1 January 2027 they issue e-invoices for domestic supplies to businesses (B2B) and public bodies (B2G).' },
            { title: 'All businesses', text: 'Every legal entity and every entrepreneur must be able to receive e-invoices, including those not registered for VAT: sole traders, liberal professions and property landlords.' },
            { title: 'Consumers', text: 'Invoices to private individuals (B2C) are not covered.' },
            { title: 'Foreign partners', text: 'For now the system covers domestic Slovak invoices only. Cross-border e-invoicing within the EU is planned from 1 July 2030.' }
          ]
        },
        {
          heading: 'What to do by the end of the year',
          ordered: true,
          paragraphs: ['The Financial Administration recommends preparing during 2026. Steps for a business:'],
          items: [
            { title: 'Check your accounting software', text: 'Ask your vendor whether it can issue and receive invoices in the Peppol BIS format. For many businesses an update is enough.' },
            { title: 'Choose a digital postman', text: 'Sign up directly or through your accounting software vendor. The Financial Administration publishes the [list of certified providers](https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-pridanej-hodnoty/e-faktura).' },
            { title: 'Test sending and receiving', text: 'You can join the system voluntarily now, before the obligation starts.' },
            { title: 'Agree with customers and suppliers', text: 'Find out who will send invoices through a digital postman and with whom you agree on another method.' },
            { title: 'Adjust your archiving', text: 'VAT payers must archive e-invoices in the original `XML` format, not only as PDFs.' }
          ]
        },
        {
          heading: 'Transition period, penalties and costs',
          paragraphs: [
            'A transition period runs until 30 June 2030. An invoice may be sent other than through a digital postman, for example via EDI or email, if the recipient agrees. Consent can be implicit, for example when the customer accepts and pays the invoice. It must still be a structured file under EN 16931, and the recipient must still be able to receive invoices through a digital postman.',
            'From 1 July 2030 the VAT control statement and the EC sales list are abolished. The Financial Administration will receive invoice data continuously instead.',
            'Missing, incorrect or late reporting can be fined up to €10,000, and up to €100,000 for repeated breaches. According to the Financial Administration, an obvious mistake you correct right away is not fined, and neither is a provable failure of the digital postman if you report the data as soon as it is fixed.',
            'Providers set their own prices. The Financial Administration expects a simple digital postman app to cost no more than the EU average, roughly €5 to €12 per month.'
          ]
        },
        {
          heading: 'What it means for incoming invoices',
          paragraphs: [
            'E-invoicing removes retyping for domestic invoices from VAT payers: the data arrives structured and your accounting software reads it. Other documents will keep arriving as PDFs or on paper: invoices from foreign suppliers, from non-VAT payers who do not join the system, and cash receipts. Those still need processing as before.',
            'This article is an overview based on information from the Slovak Financial Administration, not tax advice. For your specific situation, consult your accountant or tax adviser.'
          ]
        }
      ],
      takeaway: 'From 1 January 2027 every business in Slovakia must be able to receive e-invoices, and VAT payers must issue them. By year-end, check your accounting software, choose a digital postman and test both sending and receiving.'
    }
  },
  sources: [
    {
      label: 'Finančná správa SR: eFaktúra – informácie, príručky a zoznam poskytovateľov doručovacej služby, 2026-10-27',
      url: 'https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-pridanej-hodnoty/e-faktura'
    },
    {
      label: 'Finančné riaditeľstvo SR: Najčastejšie otázky a odpovede k eFaktúre (9/DPH/2025/IM), 2026-09-11',
      url: 'https://www.financnasprava.sk/_img/pfsedit/Dokumenty_PFS/Podnikatelia/Dan_z_pridanej_hodnoty/efaktura/2026/2026.09.11_FAQ_eFaktura.pdf'
    },
    {
      label: 'Finančná správa SR: Najčastejšie mýty o elektronickej fakturácii, 2026-07-29',
      url: 'https://www.financnasprava.sk/sk/pre-media/novinky/archiv-noviniek/detail-novinky/_myty-efak-ts/bc'
    },
    {
      label: 'European Commission: eInvoicing in Slovakia, 2026-10-14',
      url: 'https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108899/eInvoicing+in+Slovakia'
    }
  ]
})
