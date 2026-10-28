// Texty samostatnej stránky kalkulačky /sk/kalkulacka-nakladov-na-faktury/
// (#60). Samotná kalkulačka je SavingsCalculator (texty v i18n calculator.*);
// tu je len obsah okolo nej. Bez sľúbeného percenta úspory — stránka
// ukazuje, čo stojí ručná práca dnes, úsporu overí pilot.

export type InvoiceCalculatorLocale = 'sk' | 'cs' | 'en'

export interface InvoiceCalculatorContent {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  inputs: { heading: string; items: { title: string; text: string }[] }
  excluded: { heading: string; lead: string; items: string[] }
  faq: { heading: string; items: { q: string; a: string }[] }
  related: { heading: string; invoiceAutomation: string; integrations: string }
}

export const INVOICE_CALCULATOR: Record<InvoiceCalculatorLocale, InvoiceCalculatorContent> = {
  sk: {
    metaTitle: 'Kalkulačka nákladov na ručný prepis faktúr – ProjentIQ',
    metaDescription:
      'Spočítajte si, koľko hodín a eur mesačne a ročne stojí ručný prepis faktúr vo vašej firme. Zadáte vlastné čísla, výpočet beží len vo vašom prehliadači.',
    eyebrow: 'Kalkulačka',
    title: 'Kalkulačka nákladov na ručný prepis faktúr',
    lead: 'Zadajte, koľko faktúr mesačne spracúvate, ako dlho trvá jedna a koľko stojí hodina práce. Uvidíte, koľko času a peňazí dnes ide na ručný zápis a ako sa to porovnáva s cenou automatizácie.',
    inputs: {
      heading: 'Ako zistiť vlastné čísla',
      items: [
        {
          title: 'Počet faktúr',
          text: 'Pozrite sa do účtovného systému, koľko prijatých faktúr a pokladničných dokladov pribudlo za posledný mesiac. Ak ich počet kolíše, vezmite priemer za tri mesiace.'
        },
        {
          title: 'Minúty na faktúru',
          text: 'Odmerajte si desať bežných faktúr od otvorenia prílohy po uloženie v systéme, vrátane kontroly a priradenia k dodávateľovi. Celkový čas vydeľte desiatimi.'
        },
        {
          title: 'Náklad na hodinu práce',
          text: 'Mesačnú cenu práce človeka, ktorý faktúry zapisuje (mzda vrátane odvodov zamestnávateľa), vydeľte počtom odpracovaných hodín za mesiac. Pri externej účtovníčke použite jej hodinovú sadzbu.'
        }
      ]
    },
    excluded: {
      heading: 'Čo výpočet nezahŕňa',
      lead: 'Kalkulačka počíta len čas samotného zápisu. Skutočné náklady ručného spracovania bývajú vyššie, lebo neobsahuje:',
      items: [
        'opravy preklepov a nesprávne zaúčtovaných dokladov',
        'čas na hľadanie faktúr v e-mailoch a dohľadávanie chýbajúcich údajov',
        'zmeškané splatnosti a penále za neskoré platby',
        'nárast počtu dokladov, keď firma rastie'
      ]
    },
    faq: {
      heading: 'Časté otázky ku kalkulačke',
      items: [
        {
          q: 'Aký presný je výsledok?',
          a: 'Presne taký, ako čísla, ktoré zadáte. Je to odhad nákladov na ručný zápis, nie audit. Najväčší vplyv má čas na jednu faktúru, preto sa ho oplatí odmerať, nie odhadnúť.'
        },
        {
          q: 'Koľko z toho ušetrí automatizácia?',
          a: 'Závisí to od toho, aké doklady dostávate: čitateľné PDF a XML sa spracujú takmer celé automaticky, zlé skeny a nezvyčajné faktúry treba skontrolovať. Preto nesľubujeme percento vopred, ale overíme ho na pilote s vašimi dokladmi.'
        },
        {
          q: 'Ukladáte čísla, ktoré zadám?',
          a: 'Nie. Výpočet beží len vo vašom prehliadači a nič sa neodosiela. Ak kliknete na tlačidlo pod výsledkom, čísla sa len vpíšu do kontaktného formulára a odošlú sa, iba ak formulár sami odošlete.'
        },
        {
          q: 'Zmení niečo povinná e-faktúra od roku 2027?',
          a: 'Faktúry od slovenských platiteľov DPH prídu ako štruktúrované XML, ktoré sa dá spracovať strojovo. Zahraničné faktúry, doklady od neplatiteľov DPH a pokladničné bloky však ostávajú, rovnako ako ich zápis do účtovného systému.'
        }
      ]
    },
    related: {
      heading: 'Súvisiace',
      invoiceAutomation: 'Ako funguje automatizácia faktúr',
      integrations: 'Napojenie na Pohodu, Omegu a iDoklad'
    }
  },
  cs: {
    metaTitle: 'Kalkulačka nákladů na ruční přepis faktur – ProjentIQ',
    metaDescription:
      'Spočítejte si, kolik hodin a eur měsíčně a ročně stojí ruční přepis faktur ve vaší firmě. Zadáte vlastní čísla, výpočet běží jen ve vašem prohlížeči.',
    eyebrow: 'Kalkulačka',
    title: 'Kalkulačka nákladů na ruční přepis faktur',
    lead: 'Zadejte, kolik faktur měsíčně zpracováváte, jak dlouho trvá jedna a kolik stojí hodina práce. Uvidíte, kolik času a peněz dnes jde na ruční zápis a jak si to stojí proti ceně automatizace.',
    inputs: {
      heading: 'Jak zjistit vlastní čísla',
      items: [
        {
          title: 'Počet faktur',
          text: 'Podívejte se do účetního systému, kolik přijatých faktur a pokladních dokladů přibylo za poslední měsíc. Pokud počet kolísá, vezměte průměr za tři měsíce.'
        },
        {
          title: 'Minuty na fakturu',
          text: 'Změřte si deset běžných faktur od otevření přílohy po uložení v systému, včetně kontroly a přiřazení k dodavateli. Celkový čas vydělte deseti.'
        },
        {
          title: 'Náklad na hodinu práce',
          text: 'Měsíční cenu práce člověka, který faktury zapisuje (mzda včetně odvodů zaměstnavatele), vydělte počtem odpracovaných hodin za měsíc. U externí účetní použijte její hodinovou sazbu.'
        }
      ]
    },
    excluded: {
      heading: 'Co výpočet nezahrnuje',
      lead: 'Kalkulačka počítá jen čas samotného zápisu. Skutečné náklady ručního zpracování bývají vyšší, protože neobsahuje:',
      items: [
        'opravy překlepů a chybně zaúčtovaných dokladů',
        'čas na hledání faktur v e-mailech a dohledávání chybějících údajů',
        'zmeškané splatnosti a penále za pozdní platby',
        'nárůst počtu dokladů, když firma roste'
      ]
    },
    faq: {
      heading: 'Časté otázky ke kalkulačce',
      items: [
        {
          q: 'Jak přesný je výsledek?',
          a: 'Přesně tak, jak čísla, která zadáte. Je to odhad nákladů na ruční zápis, ne audit. Největší vliv má čas na jednu fakturu, proto se vyplatí ho změřit, ne odhadnout.'
        },
        {
          q: 'Kolik z toho ušetří automatizace?',
          a: 'Záleží na tom, jaké doklady dostáváte: čitelné PDF a XML se zpracují téměř celé automaticky, špatné skeny a neobvyklé faktury je třeba zkontrolovat. Proto neslibujeme procento předem, ale ověříme ho na pilotu s vašimi doklady.'
        },
        {
          q: 'Ukládáte čísla, která zadám?',
          a: 'Ne. Výpočet běží jen ve vašem prohlížeči a nic se neodesílá. Pokud kliknete na tlačítko pod výsledkem, čísla se jen vepíšou do kontaktního formuláře a odešlou se, jen pokud formulář sami odešlete.'
        },
        {
          q: 'Změní něco povinná e-faktura na Slovensku od roku 2027?',
          a: 'Faktury od slovenských plátců DPH přijdou jako strukturované XML, které lze zpracovat strojově. Zahraniční faktury, doklady od neplátců DPH a pokladní účtenky ale zůstávají, stejně jako jejich zápis do účetního systému.'
        }
      ]
    },
    related: {
      heading: 'Související',
      invoiceAutomation: 'Jak funguje automatizace faktur',
      integrations: 'Napojení na Pohodu, Omegu a iDoklad'
    }
  },
  en: {
    metaTitle: 'Manual invoice entry cost calculator – ProjentIQ',
    metaDescription:
      'Work out how many hours and euros manual invoice entry costs your company per month and per year. Enter your own numbers; the calculation runs only in your browser.',
    eyebrow: 'Calculator',
    title: 'Manual invoice entry cost calculator',
    lead: 'Enter how many invoices you process per month, how long one takes and what an hour of work costs. You will see how much time and money goes into manual entry today and how that compares with the price of automation.',
    inputs: {
      heading: 'How to find your own numbers',
      items: [
        {
          title: 'Number of invoices',
          text: 'Check your accounting system for how many received invoices and cash receipts were added last month. If the number varies, take the average of three months.'
        },
        {
          title: 'Minutes per invoice',
          text: 'Time ten typical invoices from opening the attachment to saving them in the system, including checking and matching the supplier. Divide the total by ten.'
        },
        {
          title: 'Cost of one work hour',
          text: 'Divide the monthly cost of the person who enters invoices (salary including employer contributions) by the hours they work per month. For an external accountant, use their hourly rate.'
        }
      ]
    },
    excluded: {
      heading: 'What the calculation leaves out',
      lead: 'The calculator counts only the time spent on entry itself. The real cost of manual processing is usually higher, because it does not include:',
      items: [
        'fixing typos and incorrectly booked documents',
        'time spent finding invoices in email and chasing missing details',
        'missed due dates and late payment penalties',
        'more documents as the company grows'
      ]
    },
    faq: {
      heading: 'Calculator FAQ',
      items: [
        {
          q: 'How accurate is the result?',
          a: 'Exactly as accurate as the numbers you enter. It is an estimate of manual entry cost, not an audit. Time per invoice has the biggest effect, so it is worth measuring rather than guessing.'
        },
        {
          q: 'How much of this will automation save?',
          a: 'It depends on the documents you receive: readable PDFs and XML are processed almost entirely automatically, while poor scans and unusual invoices need a check. That is why we do not promise a percentage up front but verify it in a pilot with your documents.'
        },
        {
          q: 'Do you store the numbers I enter?',
          a: 'No. The calculation runs only in your browser and nothing is sent. If you click the button below the result, the numbers are only filled into the contact form and are sent only if you submit the form yourself.'
        },
        {
          q: 'Does mandatory e-invoicing in Slovakia from 2027 change anything?',
          a: 'Invoices from Slovak VAT payers will arrive as structured XML that can be processed by machine. Foreign invoices, documents from non-VAT payers and cash receipts remain, and so does entering them into the accounting system.'
        }
      ]
    },
    related: {
      heading: 'Related',
      invoiceAutomation: 'How invoice automation works',
      integrations: 'Connecting to Pohoda, Omega and iDoklad'
    }
  }
}
