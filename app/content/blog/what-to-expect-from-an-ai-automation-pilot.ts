// Slug = názov súboru.
export default defineBlogPost({
  datePublished: '2026-12-01',
  cover: {
    sk: {
      tag: 'Pilot',
      card: { badge: '3T', label: 'Pilot na 2–3 týždne', text: 'Ako poznáme, že pilot vyšiel?' },
      headline: 'Úspech určte pred štartom.',
      highlight: 'Nie po ňom.',
      footnote: 'Príprava, priebeh a vyhodnotenie pilotu.'
    },
    cs: {
      tag: 'Pilot',
      card: { badge: '3T', label: 'Pilot na 2–3 týdny', text: 'Jak poznáme, že pilot vyšel?' },
      headline: 'Úspěch určete před startem.',
      highlight: 'Ne po něm.',
      footnote: 'Příprava, průběh a vyhodnocení pilotu.'
    },
    en: {
      tag: 'Pilot',
      card: { badge: '3W', label: 'A 2–3 week pilot', text: 'How will you know the pilot worked?' },
      headline: 'Define success before the start.',
      highlight: 'Not after it.',
      footnote: 'Preparing, running and judging a pilot.'
    }
  },
  imageAlt: {
    sk: 'Tmavá grafika ProjentIQ s otázkou, ako poznáme, že pilot vyšiel, a odpoveďou: úspech určte pred štartom, nie po ňom.',
    cs: 'Tmavá grafika ProjentIQ s otázkou, jak poznáme, že pilot vyšel, a odpovědí: úspěch určete před startem, ne po něm.',
    en: 'Dark ProjentIQ graphic asking how you will know the pilot worked, with the answer: define success before the start, not after it.'
  },
  tags: ['Automation', 'Processes', 'AI'],
  content: {
    sk: {
      title: 'Pilot AI automatizácie na 2–3 týždne: čo pripraviť a ako ho vyhodnotiť',
      perex: 'Pilot má odpovedať na jednu otázku: oplatí sa tento proces automatizovať? Takto sa naň pripraviť, čo sledovať a ako sa po ňom rozhodnúť.',
      sections: [
        {
          heading: 'Pilot je test jedného procesu, nie malé nasadenie',
          paragraphs: [
            'Cieľom pilotu nie je mať hotové riešenie pre celú firmu. Je to krátky pokus na jednom procese a na reálnych dokumentoch, ktorý ukáže, či systém robí prácu dosť dobre a či sa to oplatí rozširovať.',
            'Dĺžka dvoch až troch týždňov je orientačná. Rozhoduje, či stihnete spracovať dosť prípadov na to, aby ste videli bežné aj ťažké situácie. Pri procese, ktorý sa objaví raz za mesiac, bude potrebné dlhšie obdobie.'
          ]
        },
        {
          heading: 'Čo pripraviť ešte pred štartom',
          items: [
            { title: 'Jeden jasne opísaný proces', text: 'Pomôže veta „keď príde X, niekto urobí Y, aby vzniklo Z“. Ak ju neviete napísať, začnite menšou časťou procesu.' },
            { title: 'Vzorka reálnych vstupov', text: 'Dokumenty alebo e-maily z bežnej prevádzky vrátane nepodarených skenov, nezvyčajných formulárov a výnimiek. Pilot na vyčistených ukážkach nič nedokáže.' },
            { title: 'Človek, ktorý proces pozná', text: 'Niekto, kto vie povedať, čo je správny výsledok, a má čas pravidelne kontrolovať výstupy.' },
            { title: 'Východiskové meranie', text: 'Týždeň či dva si zapisujte počet prípadov, čas na jeden prípad a dôvody opráv. Bez tohto čísla nebude s čím výsledok porovnať.' },
            { title: 'Prístupy a súhlasy', text: 'Kto povolí prístup k dokumentom a systémom a ktoré dáta sa pilotu nesmú dotknúť. Vyriešte to pred štartom, nie počas neho.' }
          ]
        },
        {
          heading: 'Ako môžu vyzerať tri týždne',
          ordered: true,
          items: [
            { title: 'Prvý týždeň: nastavenie', text: 'Spresníte pravidlá, napojíte vstupy a vyskúšate systém na malej dávke. Chyby v tejto fáze sú normálne a cenné.' },
            { title: 'Druhý týždeň: ostrejšia prevádzka', text: 'Systém spracúva bežné prípady, človek všetko kontroluje a zapisuje, čo opravil a prečo.' },
            { title: 'Tretí týždeň: vyhodnotenie', text: 'Prestanete meniť pravidlá, porovnáte výsledky s východiskovým stavom a rozhodnete sa, čo ďalej.' }
          ]
        },
        {
          heading: 'Ako pilot vyhodnotiť',
          paragraphs: [
            'Meradlá určte pred štartom a zapíšte ich. Užitočné sú tieto: čas na jeden prípad, podiel prípadov, ktoré človek musel opraviť, a podiel prípadov, ktoré systém správne poslal na kontrolu. Porovnávajte so svojím východiskovým meraním, nie s dojmom.',
            'Do času započítajte aj kontrolu výsledkov, lebo tú bude robiť človek aj po nasadení. Pozrite sa tiež na opakujúce sa chyby: ak ich spôsobuje jedno chýbajúce pravidlo alebo zlý vstup, dá sa to opraviť. Ak sú náhodné a časté, je to signál na opatrnosť.',
            'Jeden pilot nie je záruka budúcich výsledkov. Ukáže vám, ako sa systém správa na vašej vzorke, nič viac.'
          ]
        },
        {
          heading: 'Ako to robíme my',
          paragraphs: [
            'Spolupráca u nás ide od analýzy procesu cez návrh riešenia a pilot na reálnych dokumentoch až po produkčné používanie po schválení. Pilot s pevnou cenou 490 € sa pri pokračovaní odpočíta z ceny implementácie. Sporné polia sú vždy zvýraznené na kontrolu a nič sa nezapíše bez schválenia človekom.'
          ]
        }
      ],
      takeaway: 'Pilot je poctivý test na jednom procese. Pripravte reálne vstupy, zmerajte východiskový stav a vopred určte, čo znamená úspech. Potom sa rozhodnete podľa čísel, nie podľa dojmu.'
    },
    cs: {
      title: 'Pilot AI automatizace na 2–3 týdny: co připravit a jak ho vyhodnotit',
      perex: 'Pilot má odpovědět na jednu otázku: vyplatí se tento proces automatizovat? Takto se na něj připravit, co sledovat a jak se po něm rozhodnout.',
      sections: [
        {
          heading: 'Pilot je test jednoho procesu, ne malé nasazení',
          paragraphs: [
            'Cílem pilotu není mít hotové řešení pro celou firmu. Je to krátký pokus na jednom procesu a na skutečných dokumentech, který ukáže, jestli systém dělá práci dost dobře a jestli se vyplatí ho rozšiřovat.',
            'Délka dvou až tří týdnů je orientační. Rozhoduje, jestli stihnete zpracovat dost případů na to, abyste viděli běžné i složité situace. U procesu, který se objeví jednou za měsíc, bude potřeba delší období.'
          ]
        },
        {
          heading: 'Co připravit ještě před startem',
          items: [
            { title: 'Jeden jasně popsaný proces', text: 'Pomůže věta „když přijde X, někdo udělá Y, aby vzniklo Z“. Pokud ji nedokážete napsat, začněte menší částí procesu.' },
            { title: 'Vzorek skutečných vstupů', text: 'Dokumenty nebo e-maily z běžného provozu včetně nepovedených skenů, neobvyklých formulářů a výjimek. Pilot na vyčištěných ukázkách nic neprokáže.' },
            { title: 'Člověk, který proces zná', text: 'Někdo, kdo umí říct, co je správný výsledek, a má čas pravidelně kontrolovat výstupy.' },
            { title: 'Výchozí měření', text: 'Týden či dva si zapisujte počet případů, čas na jeden případ a důvody oprav. Bez tohoto čísla nebude s čím výsledek porovnat.' },
            { title: 'Přístupy a souhlasy', text: 'Kdo povolí přístup k dokumentům a systémům a kterých dat se pilot nesmí dotknout. Vyřešte to před startem, ne během něj.' }
          ]
        },
        {
          heading: 'Jak mohou vypadat tři týdny',
          ordered: true,
          items: [
            { title: 'První týden: nastavení', text: 'Upřesníte pravidla, napojíte vstupy a vyzkoušíte systém na malé dávce. Chyby v této fázi jsou normální a cenné.' },
            { title: 'Druhý týden: ostřejší provoz', text: 'Systém zpracovává běžné případy, člověk všechno kontroluje a zapisuje, co opravil a proč.' },
            { title: 'Třetí týden: vyhodnocení', text: 'Přestanete měnit pravidla, porovnáte výsledky s výchozím stavem a rozhodnete se, co dál.' }
          ]
        },
        {
          heading: 'Jak pilot vyhodnotit',
          paragraphs: [
            'Měřítka určete před startem a zapište je. Užitečná jsou tato: čas na jeden případ, podíl případů, které musel člověk opravit, a podíl případů, které systém správně poslal ke kontrole. Porovnávejte se svým výchozím měřením, ne s dojmem.',
            'Do času započítejte i kontrolu výsledků, protože tu bude dělat člověk i po nasazení. Podívejte se také na opakující se chyby: pokud je způsobuje jedno chybějící pravidlo nebo špatný vstup, dá se to opravit. Pokud jsou náhodné a časté, je to signál k opatrnosti.',
            'Jeden pilot není záruka budoucích výsledků. Ukáže vám, jak se systém chová na vašem vzorku, nic víc.'
          ]
        },
        {
          heading: 'Jak to děláme my',
          paragraphs: [
            'Spolupráce u nás vede od analýzy procesu přes návrh řešení a pilot na skutečných dokumentech až po produkční používání po schválení. Pilot s pevnou cenou 490 € se při pokračování odečte z ceny implementace. Sporná pole jsou vždy zvýrazněna ke kontrole a nic se nezapíše bez schválení člověkem.'
          ]
        }
      ],
      takeaway: 'Pilot je poctivý test na jednom procesu. Připravte skutečné vstupy, změřte výchozí stav a předem určete, co znamená úspěch. Pak se rozhodnete podle čísel, ne podle dojmu.'
    },
    en: {
      title: 'A 2–3 week AI automation pilot: what to prepare and how to judge it',
      perex: 'A pilot should answer one question: is this process worth automating? Here is how to prepare, what to track and how to decide afterwards.',
      sections: [
        {
          heading: 'A pilot tests one process; it is not a small rollout',
          paragraphs: [
            'The aim of a pilot is not a finished solution for the whole company. It is a short trial on one process and real documents that shows whether the system does the work well enough and whether it is worth extending.',
            'Two to three weeks is a rough guide. What matters is whether you can handle enough cases to see both ordinary and difficult situations. For a process that comes up once a month, you will need a longer period.'
          ]
        },
        {
          heading: 'What to prepare before the start',
          items: [
            { title: 'One clearly described process', text: 'It helps to write one sentence: “when X arrives, someone does Y to produce Z”. If you cannot write it, start with a smaller part of the process.' },
            { title: 'A sample of real inputs', text: 'Documents or emails from day-to-day work, including poor scans, unusual forms and exceptions. A pilot on cleaned-up samples proves nothing.' },
            { title: 'A person who knows the process', text: 'Someone who can say what a correct result looks like and has time to review outputs regularly.' },
            { title: 'A baseline measurement', text: 'For a week or two, note the number of cases, the time per case and the reasons for corrections. Without this figure there is nothing to compare the result with.' },
            { title: 'Access and approvals', text: 'Who grants access to documents and systems, and which data the pilot must not touch. Settle this before the start, not during it.' }
          ]
        },
        {
          heading: 'What three weeks can look like',
          ordered: true,
          items: [
            { title: 'Week one: setup', text: 'You refine the rules, connect the inputs and try the system on a small batch. Mistakes at this stage are normal and useful.' },
            { title: 'Week two: closer to real operation', text: 'The system handles ordinary cases, a person checks everything and records what they corrected and why.' },
            { title: 'Week three: evaluation', text: 'You stop changing the rules, compare the results with the baseline and decide what happens next.' }
          ]
        },
        {
          heading: 'How to judge the result',
          paragraphs: [
            'Set the measures before the start and write them down. A useful set is: the time per case, the share of cases a person had to correct, and the share of cases the system correctly sent for review. Compare them with your own baseline, not with an impression.',
            'Include the time spent reviewing results, because a person will do that after rollout too. Also look at repeated mistakes: if one missing rule or a bad input causes them, they can be fixed. If they are random and frequent, treat that as a reason for caution.',
            'A single pilot is no guarantee of future results. It shows how the system behaves on your sample, nothing more.'
          ]
        },
        {
          heading: 'How we approach it',
          paragraphs: [
            'Our collaboration runs from process analysis through solution design and a pilot on real documents to production use after approval. A fixed-price pilot at €490 is deducted from the implementation price if you continue. Uncertain fields are always highlighted for review, and nothing is written without a person’s approval.'
          ]
        }
      ],
      takeaway: 'A pilot is an honest test of one process. Prepare real inputs, measure today’s situation and define success in advance. Then decide on the numbers, not on an impression.'
    }
  }
})
