// Slug = názov súboru.
export default defineBlogPost({
  datePublished: '2026-11-24',
  cover: {
    sk: {
      tag: 'Cena',
      card: { badge: '€', label: 'Cena AI automatizácie', text: 'Koľko to bude stáť a čo je už v cene?' },
      headline: 'Cena má dve časti.',
      highlight: 'Opýtajte sa na obe.',
      footnote: 'Jednorazovo, mesačne a ako to porovnať.'
    },
    cs: {
      tag: 'Cena',
      card: { badge: '€', label: 'Cena AI automatizace', text: 'Kolik to bude stát a co už je v ceně?' },
      headline: 'Cena má dvě části.',
      highlight: 'Zeptejte se na obě.',
      footnote: 'Jednorázově, měsíčně a jak to porovnat.'
    },
    en: {
      tag: 'Pricing',
      card: { badge: '€', label: 'The cost of AI automation', text: 'What will it cost and what is already included?' },
      headline: 'The price has two parts.',
      highlight: 'Ask about both.',
      footnote: 'One-off, monthly and how to compare.'
    }
  },
  imageAlt: {
    sk: 'Tmavá grafika ProjentIQ s otázkou, koľko stojí AI automatizácia a čo je už v cene, a odpoveďou: cena má dve časti, opýtajte sa na obe.',
    cs: 'Tmavá grafika ProjentIQ s otázkou, kolik stojí AI automatizace a co už je v ceně, a odpovědí: cena má dvě části, zeptejte se na obě.',
    en: 'Dark ProjentIQ graphic asking what AI automation costs and what is already included, with the answer: the price has two parts, ask about both.'
  },
  tags: ['Pricing', 'Automation', 'AI'],
  content: {
    sk: {
      title: 'Koľko stojí AI automatizácia pre malú firmu a z čoho sa skladá cena',
      perex: 'Cena AI riešenia sa zvyčajne skladá z jednorazovej implementácie a mesačného poplatku. Pozrite sa, čo sa v nich skrýva a ako ich porovnať s dnešnými nákladmi.',
      sections: [
        {
          heading: 'Cena zvyčajne nie je jedno číslo, ale dve',
          paragraphs: [
            'Pri AI automatizácii sa najčastejšie stretnete s jednorazovou cenou za zavedenie a s mesačným poplatkom za prevádzku. Ak vám dodávateľ pošle len jedno číslo, opýtajte sa, ktorú časť vidíte.',
            'Pre firmu je dôležité obe čísla sčítať za rozumné obdobie, napríklad za prvý rok. Lacná implementácia s drahou prevádzkou môže vyjsť inak než vyššia jednorazová cena s nízkym poplatkom.'
          ]
        },
        {
          heading: 'Jednorazová časť: za čo platíte pred spustením',
          paragraphs: [
            'Ide o prácu, ktorá vedie k fungujúcemu riešeniu. Pýtajte sa, čo presne obsahuje a kde sa končí.'
          ],
          items: [
            { text: 'Analýza procesu: kto čo dnes robí, aké sú výnimky a kde sa rozhoduje.' },
            { text: 'Návrh riešenia a napojenie na systémy, ktoré už používate.' },
            { text: 'Nastavenie a testovanie na vašich reálnych dokumentoch.' },
            { text: 'Zaškolenie ľudí, ktorí budú výsledky kontrolovať.' }
          ]
        },
        {
          heading: 'Mesačný poplatok: čo má pokrývať',
          paragraphs: [
            'Riešenie po spustení nezostane bez údržby. Zmenia sa formuláre dodávateľov, pribudnú nové dokumenty a niekto musí sledovať, či systém robí chyby. Vo férovom poplatku by ste mali nájsť štyri veci.'
          ],
          items: [
            { title: 'Prevádzka', text: 'Servery, úložisko a bežný chod riešenia.' },
            { title: 'Náklady na AI', text: 'Pozor, niekde sa účtujú zvlášť podľa objemu. Opýtajte sa, či sú v poplatku a čo sa stane pri väčšom objeme.' },
            { title: 'Monitoring', text: 'Niekto sleduje chyby a výpadky skôr než vy.' },
            { title: 'Podpora', text: 'Viete, na koho sa obrátiť a ako rýchlo sa dočkáte odpovede.' }
          ]
        },
        {
          heading: 'Čo cenu zvyšuje alebo znižuje',
          paragraphs: [
            'Cenu najviac ovplyvňuje rozsah. Jeden jasne ohraničený proces stojí inak než asistent, ktorý číta viac zdrojov dokumentov a pracuje vo viacerých systémoch. Cenu zvyšujú aj nezvyčajné požiadavky, napríklad nasadenie na vlastnej infraštruktúre, a množstvo výnimiek, pri ktorých musí rozhodnúť človek.',
            'Preto je rozumné začať jedným procesom. Cena je potom lepšie predvídateľná a výsledok sa dá porovnať s východiskovým stavom.'
          ]
        },
        {
          heading: 'Porovnajte cenu s dnešnými nákladmi na vlastný výpočet',
          paragraphs: [
            'Zapíšte si, koľko prípadov mesačne spracúvate, koľko minút trvá jeden vrátane kontroly a opráv a aká je hodinová cena práce zamestnanca. Dnešný mesačný náklad je počet prípadov × minúty na prípad ÷ 60 × hodinová cena.',
            'Počítajte aj s časom, ktorý ľudia budú venovať kontrole výsledkov, lebo človek ju bude robiť aj po automatizácii. Zostávajúci čas porovnajte s dnešným nákladom a s tým, čo zaplatíte mesačne a jednorázovo za zvolené obdobie. Úsporu neberte ako istotu, overte ju na pilote.'
          ]
        },
        {
          heading: 'Ako to vyzerá u nás',
          paragraphs: [
            'U ProjentIQ sa ceny skladajú z jednorazovej implementácie a mesačného poplatku, ktorý zahŕňa prevádzku, náklady na AI, monitoring a podporu. Automatizácia jedného jasne ohraničeného procesu začína od 990 € a 79 € mesačne, znalostný systém od 1 490 € a 99 € mesačne, AI agent pre jeden pracovný proces od 2 500 € a 199 € mesačne. Ceny sú konečné, nie sme platcami DPH.',
            'Pilot s pevnou cenou 490 € vám umožní overiť riešenie skôr, než sa rozhodnete. Ak budete pokračovať, jeho cena sa odpočíta z ceny implementácie.'
          ]
        }
      ],
      takeaway: 'Pýtajte sa na jednorazovú cenu aj mesačný poplatok a na to, čo je v nich zahrnuté. Pred rozhodnutím si zmerajte dnešné náklady a porovnajte ich s oboma číslami.'
    },
    cs: {
      title: 'Kolik stojí AI automatizace pro malou firmu a z čeho se skládá cena',
      perex: 'Cena AI řešení se obvykle skládá z jednorázové implementace a měsíčního poplatku. Podívejte se, co se v nich skrývá a jak je porovnat s dnešními náklady.',
      sections: [
        {
          heading: 'Cena obvykle není jedno číslo, ale dvě',
          paragraphs: [
            'U AI automatizace se nejčastěji setkáte s jednorázovou cenou za zavedení a s měsíčním poplatkem za provoz. Pokud vám dodavatel pošle jen jedno číslo, zeptejte se, kterou část vidíte.',
            'Pro firmu je důležité obě čísla sečíst za rozumné období, například za první rok. Levná implementace s drahým provozem může vyjít jinak než vyšší jednorázová cena s nízkým poplatkem.'
          ]
        },
        {
          heading: 'Jednorázová část: za co platíte před spuštěním',
          paragraphs: [
            'Jde o práci, která vede k fungujícímu řešení. Ptejte se, co přesně obsahuje a kde končí.'
          ],
          items: [
            { text: 'Analýza procesu: kdo co dnes dělá, jaké jsou výjimky a kde se rozhoduje.' },
            { text: 'Návrh řešení a napojení na systémy, které už používáte.' },
            { text: 'Nastavení a testování na vašich skutečných dokumentech.' },
            { text: 'Zaškolení lidí, kteří budou výsledky kontrolovat.' }
          ]
        },
        {
          heading: 'Měsíční poplatek: co má pokrývat',
          paragraphs: [
            'Řešení po spuštění nezůstane bez údržby. Změní se formuláře dodavatelů, přibudou nové dokumenty a někdo musí sledovat, jestli systém nedělá chyby. Ve férovém poplatku byste měli najít čtyři věci.'
          ],
          items: [
            { title: 'Provoz', text: 'Servery, úložiště a běžný chod řešení.' },
            { title: 'Náklady na AI', text: 'Pozor, někde se účtují zvlášť podle objemu. Zeptejte se, zda jsou v poplatku a co se stane při větším objemu.' },
            { title: 'Monitoring', text: 'Někdo sleduje chyby a výpadky dřív než vy.' },
            { title: 'Podpora', text: 'Víte, na koho se obrátit a jak rychle se dočkáte odpovědi.' }
          ]
        },
        {
          heading: 'Co cenu zvyšuje nebo snižuje',
          paragraphs: [
            'Cenu nejvíce ovlivňuje rozsah. Jeden jasně vymezený proces stojí jinak než asistent, který čte více zdrojů dokumentů a pracuje ve více systémech. Cenu zvyšují i nestandardní požadavky, například nasazení na vlastní infrastruktuře, a množství výjimek, u nichž musí rozhodnout člověk.',
            'Proto je rozumné začít jedním procesem. Cena je pak lépe předvídatelná a výsledek lze porovnat s výchozím stavem.'
          ]
        },
        {
          heading: 'Porovnejte cenu s dnešními náklady podle vlastního výpočtu',
          paragraphs: [
            'Zapište si, kolik případů měsíčně zpracováváte, kolik minut trvá jeden včetně kontroly a oprav a jaká je hodinová cena práce zaměstnance. Dnešní měsíční náklad je počet případů × minuty na případ ÷ 60 × hodinová cena.',
            'Počítejte také s časem, který lidé budou věnovat kontrole výsledků, protože ji bude dělat člověk i po automatizaci. Zbývající čas porovnejte s dnešním nákladem a s tím, co zaplatíte měsíčně a jednorázově za zvolené období. Úsporu neberte jako jistotu, ověřte ji na pilotu.'
          ]
        },
        {
          heading: 'Jak to vypadá u nás',
          paragraphs: [
            'U ProjentIQ se ceny skládají z jednorázové implementace a měsíčního poplatku, který zahrnuje provoz, náklady na AI, monitoring a podporu. Automatizace jednoho jasně vymezeného procesu začíná od 990 € a 79 € měsíčně, znalostní systém od 1 490 € a 99 € měsíčně, AI agent pro jeden pracovní proces od 2 500 € a 199 € měsíčně. Ceny jsou konečné, nejsme plátci DPH.',
            'Pilot s pevnou cenou 490 € vám umožní ověřit řešení dřív, než se rozhodnete. Pokud budete pokračovat, jeho cena se odečte z ceny implementace.'
          ]
        }
      ],
      takeaway: 'Ptejte se na jednorázovou cenu i měsíční poplatek a na to, co je v nich zahrnuto. Před rozhodnutím si změřte dnešní náklady a porovnejte je s oběma čísly.'
    },
    en: {
      title: 'What AI automation costs a small business and what the price includes',
      perex: 'The price of an AI solution usually combines a one-off implementation and a monthly fee. Here is what each part covers and how to compare it with your current costs.',
      sections: [
        {
          heading: 'The price is usually two numbers, not one',
          paragraphs: [
            'With AI automation you will most often see a one-off price for setting it up and a monthly fee for running it. If a supplier gives you only one number, ask which part you are looking at.',
            'What matters to your business is both numbers added together over a reasonable period, such as the first year. A cheap implementation with expensive running costs can work out differently from a higher one-off price with a low monthly fee.'
          ]
        },
        {
          heading: 'The one-off part: what you pay for before launch',
          paragraphs: [
            'This is the work that leads to a working solution. Ask what exactly it includes and where it ends.'
          ],
          items: [
            { text: 'Process analysis: who does what today, what the exceptions are and where decisions are made.' },
            { text: 'Solution design and connection to the systems you already use.' },
            { text: 'Setup and testing on your real documents.' },
            { text: 'Training the people who will review the results.' }
          ]
        },
        {
          heading: 'The monthly fee: what it should cover',
          paragraphs: [
            'A solution does not stay maintenance-free after launch. Suppliers change their invoice layouts, new document types appear, and someone has to watch for mistakes. A fair fee should cover four things.'
          ],
          items: [
            { title: 'Operation', text: 'Servers, storage and the day-to-day running of the solution.' },
            { title: 'AI costs', text: 'Be careful, as some suppliers bill these separately by volume. Ask whether they are in the fee and what happens when volumes grow.' },
            { title: 'Monitoring', text: 'Someone spots errors and outages before you do.' },
            { title: 'Support', text: 'You know whom to contact and how quickly you will get an answer.' }
          ]
        },
        {
          heading: 'What pushes the price up or down',
          paragraphs: [
            'Scope has the biggest effect. One clearly defined process costs a different amount from an assistant that reads several document sources and works across several systems. Unusual requirements, such as deployment on your own infrastructure, and a large number of exceptions that a person has to decide also raise the price.',
            'That is why it makes sense to start with one process. The price is easier to predict, and the result can be compared with your starting point.'
          ]
        },
        {
          heading: 'Compare the price with your current costs using your own calculation',
          paragraphs: [
            'Write down how many cases you handle each month, how many minutes one takes including checking and corrections, and the hourly cost of an employee’s time. Your current monthly cost is cases × minutes per case ÷ 60 × hourly cost.',
            'Also allow for the time people will still spend reviewing the results, because a person will do that after automation too. Compare the remaining time with your current cost and with what you would pay monthly and one-off over your chosen period. Do not treat savings as certain; verify them in a pilot.'
          ]
        },
        {
          heading: 'How it looks at ProjentIQ',
          paragraphs: [
            'At ProjentIQ, prices consist of a one-off implementation and a monthly fee that covers operation, AI costs, monitoring and support. Automating one clearly defined process starts from €990 and €79 a month, a knowledge system from €1,490 and €99 a month, and an AI agent for one work process from €2,500 and €199 a month. Prices are final; we are not VAT payers.',
            'A fixed-price pilot at €490 lets you test the solution before you decide. If you continue, its price is deducted from the implementation price.'
          ]
        }
      ],
      takeaway: 'Ask about both the one-off price and the monthly fee, and what each includes. Before deciding, measure your current costs and compare them with both numbers.'
    }
  }
})
