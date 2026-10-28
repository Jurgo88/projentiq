// Slug = názov súboru.
export default defineBlogPost({
  datePublished: '2026-11-03',
  cover: {
    sk: {
      tag: 'Automatizácia',
      card: { badge: 'AI', label: 'Faktúry do Pohody', text: 'Kto skontroluje doklad, ktorý AI neprečíta?' },
      headline: 'Najprv kontrola,',
      highlight: 'až potom zápis do Pohody.',
      footnote: 'Ako funguje tok faktúry a kde sú jeho limity.'
    },
    cs: {
      tag: 'Automatizace',
      card: { badge: 'AI', label: 'Faktury do Pohody', text: 'Kdo zkontroluje doklad, který AI nepřečte?' },
      headline: 'Nejprve kontrola,',
      highlight: 'teprve potom zápis do Pohody.',
      footnote: 'Jak funguje tok faktury a kde jsou jeho limity.'
    },
    en: {
      tag: 'Automation',
      card: { badge: 'AI', label: 'Invoices into Pohoda', text: 'Who checks the document the AI cannot read?' },
      headline: 'Review first,',
      highlight: 'only then write to Pohoda.',
      footnote: 'How the invoice flow works and where its limits are.'
    }
  },
  imageAlt: {
    sk: 'Tmavá grafika ProjentIQ: Kto skontroluje doklad, ktorý AI neprečíta? Najprv kontrola, až potom zápis do Pohody.',
    cs: 'Tmavá grafika ProjentIQ: Kdo zkontroluje doklad, který AI nepřečte? Nejprve kontrola, teprve potom zápis do Pohody.',
    en: 'Dark ProjentIQ graphic: Who checks the document the AI cannot read? Review first, only then write to Pohoda.'
  },
  tags: ['Automation', 'AI', 'Documents'],
  content: {
    sk: {
      title: 'Faktúry do Pohody automaticky: ako to funguje a kde sú limity',
      perex: 'Automatické spracovanie faktúr nie je čierna skrinka, do ktorej doklad vhodíte a výsledok sa objaví v účtovníctve. Ukážeme celý tok a miesta, kde musí rozhodnúť človek.',
      sections: [
        {
          heading: 'Tok má päť krokov, nie jeden',
          paragraphs: ['Dobre navrhnuté spracovanie nejde priamo z dokladu do účtovného systému. Medzi nimi sú dve kontroly:'],
          items: [
            { title: 'Doklad príde', text: 'z e-mailu, zdieľaného disku alebo skenera, ako PDF či obrázok.' },
            { title: 'Extrakcia', text: 'systém z dokladu prečíta dodávateľa, číslo, dátumy, sumy a položky.' },
            { title: 'Kontrola sporných hodnôt', text: 'čo sa nedá prečítať alebo nesedí, sa označí.' },
            { title: 'Schválenie človekom', text: 'účtovník vidí doklad vedľa vyťažených údajov a potvrdí alebo opraví.' },
            { title: 'Zápis do Pohody', text: 'až schválený záznam sa odovzdá účtovnému systému.' }
          ]
        },
        {
          heading: 'Čo má systém z dokladu vedieť prečítať',
          paragraphs: [
            'Základ sú údaje, ktoré účtovník prepisuje každý deň: dodávateľ a jeho IČO, číslo dokladu, dátum vystavenia a splatnosti, variabilný symbol, základ dane, DPH a celková suma.',
            'Ťažšie sú položky faktúry. Majú rôzny počet riadkov, rôzne rozloženie a každý dodávateľ ich uvádza inak. Preto je práve tu kontrola najdôležitejšia.'
          ]
        },
        {
          heading: 'Sporné polia sa zvýraznia, nepreskočia',
          paragraphs: [
            'Systém, ktorý si je istý všetkým, je podozrivý. Dobrý systém povie, ktorému poľu neverí: nečitateľná suma, IČO, ktoré neexistuje, súčet položiek, ktorý nesedí s celkom, dodávateľ, ktorého ešte nepozná.',
            'Účtovník nemusí kontrolovať všetko od nuly. Pozrie sa na označené polia, porovná ich s dokladom a rozhodne. Rozhodnutie má vždy človek.'
          ]
        },
        {
          heading: 'Kde sú limity',
          items: [
            { title: 'Zlá kvalita', text: 'rozmazaný sken, odfotený doklad pod uhlom, pečiatka cez text alebo ručné poznámky na okraji.' },
            { title: 'Neštandardné doklady', text: 'zahraničné faktúry, zálohové faktúry, dobropisy či zmluvné dokumenty s nezvyčajným rozložením.' },
            { title: 'Účtovné rozhodnutia', text: 'na ktorý účet a do akého obdobia doklad patrí, rozhoduje pravidlo firmy a účtovník, nie odhad modelu.' },
            { title: 'Nový dodávateľ', text: 'prvé doklady od neznámeho dodávateľa potrebujú viac opráv než tie od stálych.' }
          ]
        },
        {
          heading: 'Ako si overiť, či to vo vašej firme bude fungovať',
          paragraphs: [
            'Nespoliehajte sa na ukážkové dokumenty. Vezmite vzorku skutočných dokladov z posledných mesiacov vrátane tých horších: skenov, fotiek a výnimiek.',
            'Pre každé pole spočítajte, koľkokrát bolo vyťažené správne, koľkokrát ho systém označil ako sporné a koľkokrát sa pomýlil bez upozornenia. Posledné číslo je to, na ktorom záleží najviac. Namerané hodnoty sú vaše vlastné a platia pre vaše doklady.'
          ]
        },
        {
          heading: 'Ako to riešime my',
          paragraphs: ['Spracovanie staviame na dokladoch a systémoch, ktoré firma už používa, a napájame ho na Pohodu, Omegu, iDoklad či iné účtovné systémy cez API alebo import. Sporné polia sú zvýraznené na kontrolu, nič sa nezapíše bez schválenia človekom a systém sa učí z opráv. Pred ostrým použitím ho vyskúšame v pilote na reálnych dokladoch.']
        }
      ],
      takeaway: 'Dobrá automatizácia faktúr človeka nevynecháva, ale presne mu ukáže, čo má skontrolovať. Skúste to najprv na vzorke vlastných dokladov a sledujte najmä chyby, ktoré systém neoznačil.'
    },
    cs: {
      title: 'Faktury do Pohody automaticky: jak to funguje a kde jsou limity',
      perex: 'Automatické zpracování faktur není černá skříňka, do které doklad vhodíte a výsledek se objeví v účetnictví. Ukážeme celý tok a místa, kde musí rozhodnout člověk.',
      sections: [
        {
          heading: 'Tok má pět kroků, ne jeden',
          paragraphs: ['Dobře navržené zpracování nevede přímo z dokladu do účetního systému. Mezi nimi jsou dvě kontroly:'],
          items: [
            { title: 'Doklad dorazí', text: 'z e-mailu, sdíleného disku nebo skeneru, jako PDF či obrázek.' },
            { title: 'Extrakce', text: 'systém z dokladu přečte dodavatele, číslo, data, částky a položky.' },
            { title: 'Kontrola sporných hodnot', text: 'co nelze přečíst nebo nesedí, se označí.' },
            { title: 'Schválení člověkem', text: 'účetní vidí doklad vedle vytěžených údajů a potvrdí nebo opraví.' },
            { title: 'Zápis do Pohody', text: 'teprve schválený záznam se předá účetnímu systému.' }
          ]
        },
        {
          heading: 'Co má systém z dokladu umět přečíst',
          paragraphs: [
            'Základem jsou údaje, které účetní přepisuje každý den: dodavatel a jeho IČO, číslo dokladu, datum vystavení a splatnosti, variabilní symbol, základ daně, DPH a celková částka.',
            'Těžší jsou položky faktury. Mají různý počet řádků, různé rozložení a každý dodavatel je uvádí jinak. Právě tady je kontrola nejdůležitější.'
          ]
        },
        {
          heading: 'Sporná pole se zvýrazní, nepřeskočí',
          paragraphs: [
            'Systém, který si je jistý vším, je podezřelý. Dobrý systém řekne, kterému poli nevěří: nečitelná částka, IČO, které neexistuje, součet položek, který nesedí s celkem, dodavatel, kterého ještě nezná.',
            'Účetní nemusí kontrolovat všechno od nuly. Podívá se na označená pole, porovná je s dokladem a rozhodne. Rozhodnutí má vždy člověk.'
          ]
        },
        {
          heading: 'Kde jsou limity',
          items: [
            { title: 'Špatná kvalita', text: 'rozmazaný sken, doklad vyfocený pod úhlem, razítko přes text nebo ruční poznámky na okraji.' },
            { title: 'Nestandardní doklady', text: 'zahraniční faktury, zálohové faktury, dobropisy nebo smluvní dokumenty s neobvyklým rozložením.' },
            { title: 'Účetní rozhodnutí', text: 'na který účet a do jakého období doklad patří, rozhoduje pravidlo firmy a účetní, ne odhad modelu.' },
            { title: 'Nový dodavatel', text: 'první doklady od neznámého dodavatele potřebují víc oprav než ty od stálých.' }
          ]
        },
        {
          heading: 'Jak si ověřit, jestli to ve vaší firmě bude fungovat',
          paragraphs: [
            'Nespoléhejte na ukázkové dokumenty. Vezměte vzorek skutečných dokladů z posledních měsíců včetně těch horších: skenů, fotek a výjimek.',
            'U každého pole spočítejte, kolikrát bylo vytěženo správně, kolikrát ho systém označil jako sporné a kolikrát se spletl bez upozornění. Poslední číslo je to, na kterém záleží nejvíc. Naměřené hodnoty jsou vaše vlastní a platí pro vaše doklady.'
          ]
        },
        {
          heading: 'Jak to řešíme my',
          paragraphs: ['Zpracování stavíme na dokladech a systémech, které firma už používá, a napojujeme ho na Pohodu, Omegu, iDoklad či jiné účetní systémy přes API nebo import. Sporná pole jsou zvýrazněná ke kontrole, nic se nezapíše bez schválení člověkem a systém se učí z oprav. Před ostrým použitím ho vyzkoušíme v pilotu na reálných dokladech.']
        }
      ],
      takeaway: 'Dobrá automatizace faktur člověka nevynechává, ale přesně mu ukáže, co má zkontrolovat. Zkuste to nejdřív na vzorku vlastních dokladů a sledujte hlavně chyby, které systém neoznačil.'
    },
    en: {
      title: 'Invoices into Pohoda automatically: how it works and where the limits are',
      perex: 'Automated invoice processing is not a black box where you drop in a document and the result appears in your books. Here is the whole flow and the points where a person has to decide.',
      sections: [
        {
          heading: 'The flow has five steps, not one',
          paragraphs: ['Well-designed processing does not go straight from the document to the accounting system. There are two checks in between:'],
          items: [
            { title: 'The document arrives', text: 'from email, a shared drive or a scanner, as a PDF or an image.' },
            { title: 'Extraction', text: 'the system reads the supplier, number, dates, amounts and line items from the document.' },
            { title: 'Checking doubtful values', text: 'anything unreadable or inconsistent is flagged.' },
            { title: 'Approval by a person', text: 'the accountant sees the document next to the extracted data and confirms or corrects it.' },
            { title: 'Writing to Pohoda', text: 'only the approved record is handed to the accounting system.' }
          ]
        },
        {
          heading: 'What the system should be able to read',
          paragraphs: [
            'The basics are the details an accountant retypes every day: the supplier and their company ID, document number, issue and due dates, variable symbol, tax base, VAT and total amount.',
            'Invoice line items are harder. They have a varying number of rows and different layouts, and every supplier presents them differently. That is exactly where the check matters most.'
          ]
        },
        {
          heading: 'Doubtful fields are highlighted, not skipped',
          paragraphs: [
            'A system that is sure of everything is suspect. A good system tells you which field it doesn’t trust: an illegible amount, a company ID that doesn’t exist, line items that don’t add up to the total, a supplier it hasn’t seen before.',
            'The accountant doesn’t have to check everything from scratch. They look at the flagged fields, compare them with the document and decide. The decision always stays with a person.'
          ]
        },
        {
          heading: 'Where the limits are',
          items: [
            { title: 'Poor quality', text: 'a blurry scan, a document photographed at an angle, a stamp over the text or handwritten notes in the margin.' },
            { title: 'Non-standard documents', text: 'foreign invoices, advance invoices, credit notes or contract documents with an unusual layout.' },
            { title: 'Accounting decisions', text: 'which account and which period a document belongs to is decided by company rules and the accountant, not by a model’s guess.' },
            { title: 'A new supplier', text: 'the first documents from an unknown supplier need more corrections than those from regular ones.' }
          ]
        },
        {
          heading: 'How to check whether it will work in your company',
          paragraphs: [
            'Don’t rely on sample documents. Take a batch of real documents from recent months, including the worse ones: scans, photos and exceptions.',
            'For each field, count how often it was extracted correctly, how often the system flagged it as doubtful and how often it got it wrong without warning. The last number matters most. The measured values are your own and apply to your documents.'
          ]
        },
        {
          heading: 'How we approach it',
          paragraphs: ['We build processing on the documents and systems a company already uses and connect it to Pohoda, Omega, iDoklad or other accounting systems via API or import. Doubtful fields are highlighted for review, nothing is written without approval by a person, and the system learns from corrections. Before live use, we try it in a pilot on real documents.']
        }
      ],
      takeaway: 'Good invoice automation doesn’t cut people out; it shows them exactly what to check. Try it first on a batch of your own documents and pay most attention to the errors the system did not flag.'
    }
  }
})
