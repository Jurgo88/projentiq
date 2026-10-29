// Slug = názov súboru.
export default defineBlogPost({
  datePublished: '2026-11-10',
  cover: {
    sk: {
      tag: 'Ochrana dát',
      card: { badge: 'AI', label: 'Kam idú firemné dáta', text: 'Kam idú moje dáta, keď použijem AI?' },
      headline: 'Opýtajte sa skôr, ako nahráte dokument.',
      highlight: 'Kde sa spracuje a kto ho uvidí?',
      footnote: '5 otázok o dátach pred nasadením AI.'
    },
    cs: {
      tag: 'Ochrana dat',
      card: { badge: 'AI', label: 'Kam jdou firemní data', text: 'Kam jdou moje data, když použiji AI?' },
      headline: 'Zeptejte se dřív, než nahrajete dokument.',
      highlight: 'Kde se zpracuje a kdo ho uvidí?',
      footnote: '5 otázek o datech před nasazením AI.'
    },
    en: {
      tag: 'Data privacy',
      card: { badge: 'AI', label: 'Where company data goes', text: 'Where does my data go when I use AI?' },
      headline: 'Ask before you upload a document.',
      highlight: 'Where is it processed, and who sees it?',
      footnote: '5 data questions before you adopt AI.'
    }
  },
  imageAlt: {
    sk: 'Tmavá grafika ProjentIQ s otázkou, kam idú moje dáta, keď použijem AI, a odpoveďou: opýtajte sa skôr, ako nahráte dokument. Kde sa spracuje a kto ho uvidí?',
    cs: 'Tmavá grafika ProjentIQ s otázkou, kam jdou moje data, když použiji AI, a odpovědí: zeptejte se dřív, než nahrajete dokument. Kde se zpracuje a kdo ho uvidí?',
    en: 'Dark ProjentIQ graphic asking where my data goes when I use AI, with the answer: ask before you upload a document. Where is it processed, and who sees it?'
  },
  tags: ['AI', 'Data privacy', 'Security'],
  content: {
    sk: {
      title: 'Kam idú vaše dáta, keď používate AI: 5 otázok pred nasadením',
      perex: 'Keď zamestnanec vloží faktúru alebo zmluvu do AI nástroja, dokument opúšťa firmu. Päť otázok vám pomôže zistiť, kam sa dostane a kto k nemu má prístup.',
      sections: [
        {
          heading: 'Dokument v AI nástroji nie je „len text“',
          paragraphs: [
            'Faktúra obsahuje IČO, bankový účet a sumy. Zmluva obsahuje podmienky, ktoré nechcete zdieľať s konkurenciou. Personálny e-mail obsahuje osobné údaje zamestnancov. Keď to vložíte do AI nástroja, spracuje sa to niekde na cudzom serveri.',
            'Neznamená to, že AI treba zakázať. Treba vedieť, kde sa dáta spracujú, ako dlho sa uchovajú a či sa dajú použiť na iné účely. Tento článok nie je právna rada. Pri osobných údajoch a zmluvných povinnostiach sa poraďte s právnikom alebo zodpovednou osobou pre ochranu údajov.'
          ]
        },
        {
          heading: 'Päť otázok, ktoré položte dodávateľovi',
          ordered: true,
          items: [
            { title: 'Kde sa dáta spracúvajú', text: 'V rámci EÚ, alebo mimo nej? Požiadajte o odpoveď písomne, nie len z marketingovej stránky.' },
            { title: 'Kto k dátam má prístup', text: 'Posielajú sa dokumenty ďalším firmám, napríklad poskytovateľom modelov alebo hostingu? Ak áno, ktorým a prečo?' },
            { title: 'Ako dlho sa dáta uchovávajú', text: 'Zostanú dokumenty uložené po spracovaní? Dá sa to vypnúť alebo si môžete vyžiadať vymazanie?' },
            { title: 'Používajú sa dáta na ďalšie účely', text: 'Napríklad na trénovanie modelov. Zmluva alebo podmienky služby by to mali upraviť jasne.' },
            { title: 'Čo sa stane pri incidente', text: 'Ako vás dodávateľ upozorní, ak dôjde k úniku, a kto nesie zodpovednosť podľa zmluvy?' }
          ]
        },
        {
          heading: 'Spracovanie v EÚ a vlastná infraštruktúra sú dve rôzne veci',
          paragraphs: [
            'Spracovanie v EÚ znamená, že dáta zostávajú v európskom prostredí, no stále ich spracúva služba dodávateľa. Je to často rozumný kompromis medzi pohodlím a kontrolou.',
            'Nasadenie na vlastnej infraštruktúre znamená, že riešenie beží na serveroch firmy alebo v jej cloude. Dokumenty tak neopúšťajú prostredie, ktoré firma sama spravuje. Vyžaduje to však správu serverov a aktualizácie, preto sa oplatí pre citlivejšie dáta alebo prísnejšie interné pravidlá.'
          ]
        },
        {
          heading: 'Zmapujte, čo sa už dnes nahráva',
          paragraphs: [
            'Najväčšie riziko často nie je nový projekt, ale nástroje, ktoré zamestnanci používajú bez vášho vedomia. Opýtajte sa ľudí, aké AI nástroje používajú a aké dokumenty do nich vkladajú. Cieľom nie je hľadať vinníka, ale zistiť skutočný stav.',
            'Potom rozdeľte dokumenty na tri skupiny: bežné, citlivé a také, ktoré sa do externých nástrojov nesmú dostať vôbec. Pre každú skupinu určte, ktorý nástroj je povolený.'
          ]
        },
        {
          heading: 'Čo má robiť človek aj pri bezpečnom nasadení',
          paragraphs: [
            'Ani dobre nastavené spracovanie dát nerieši, či je výstup správny. Sporné polia má vždy skontrolovať človek a do firemného systému sa nemá nič zapísať bez schválenia. Oprávnenia nastavte tak, aby riešenie videlo len dokumenty, ktoré potrebuje.',
            'My v ProjentIQ spracúvame dáta v rámci EÚ, dokumenty klientov nezdieľame s tretími stranami a riešenie vieme nasadiť aj priamo na infraštruktúru klienta.'
          ]
        }
      ],
      takeaway: 'Skôr než do AI nástroja nahráte prvý dokument, zistite, kde sa spracuje, kto k nemu má prístup a ako dlho zostane uložený. Odpovede si nechajte napísať.'
    },
    cs: {
      title: 'Kam jdou vaše data, když používáte AI: 5 otázek před nasazením',
      perex: 'Když zaměstnanec vloží fakturu nebo smlouvu do AI nástroje, dokument opouští firmu. Pět otázek vám pomůže zjistit, kam se dostane a kdo k němu má přístup.',
      sections: [
        {
          heading: 'Dokument v AI nástroji není „jen text“',
          paragraphs: [
            'Faktura obsahuje IČO, bankovní účet a částky. Smlouva obsahuje podmínky, které nechcete sdílet s konkurencí. Personální e-mail obsahuje osobní údaje zaměstnanců. Když to vložíte do AI nástroje, zpracuje se to někde na cizím serveru.',
            'Neznamená to, že AI je potřeba zakázat. Je potřeba vědět, kde se data zpracují, jak dlouho se uchovají a zda je lze použít k jiným účelům. Tento článek není právní poradenství. U osobních údajů a smluvních povinností se poraďte s právníkem nebo pověřencem pro ochranu osobních údajů.'
          ]
        },
        {
          heading: 'Pět otázek, které položte dodavateli',
          ordered: true,
          items: [
            { title: 'Kde se data zpracovávají', text: 'V rámci EU, nebo mimo ni? Požádejte o odpověď písemně, ne jen z marketingové stránky.' },
            { title: 'Kdo má k datům přístup', text: 'Posílají se dokumenty dalším firmám, například poskytovatelům modelů nebo hostingu? Pokud ano, kterým a proč?' },
            { title: 'Jak dlouho se data uchovávají', text: 'Zůstanou dokumenty uložené po zpracování? Dá se to vypnout, nebo si můžete vyžádat smazání?' },
            { title: 'Používají se data k dalším účelům', text: 'Například k trénování modelů. Smlouva nebo podmínky služby by to měly upravit jasně.' },
            { title: 'Co se stane při incidentu', text: 'Jak vás dodavatel upozorní, pokud dojde k úniku, a kdo nese odpovědnost podle smlouvy?' }
          ]
        },
        {
          heading: 'Zpracování v EU a vlastní infrastruktura jsou dvě různé věci',
          paragraphs: [
            'Zpracování v EU znamená, že data zůstávají v evropském prostředí, ale stále je zpracovává služba dodavatele. Je to často rozumný kompromis mezi pohodlím a kontrolou.',
            'Nasazení na vlastní infrastruktuře znamená, že řešení běží na serverech firmy nebo v jejím cloudu. Dokumenty tak neopouštějí prostředí, které firma sama spravuje. Vyžaduje to ale správu serverů a aktualizace, proto se vyplatí u citlivějších dat nebo přísnějších interních pravidel.'
          ]
        },
        {
          heading: 'Zmapujte, co se už dnes nahrává',
          paragraphs: [
            'Největší riziko často není nový projekt, ale nástroje, které zaměstnanci používají bez vaší vědomosti. Zeptejte se lidí, jaké AI nástroje používají a jaké dokumenty do nich vkládají. Cílem není hledat viníka, ale zjistit skutečný stav.',
            'Poté rozdělte dokumenty do tří skupin: běžné, citlivé a takové, které se do externích nástrojů nesmějí dostat vůbec. Pro každou skupinu určete, který nástroj je povolený.'
          ]
        },
        {
          heading: 'Co má dělat člověk i při bezpečném nasazení',
          paragraphs: [
            'Ani dobře nastavené zpracování dat neřeší, zda je výstup správný. Sporná pole má vždy zkontrolovat člověk a do firemního systému se nemá nic zapsat bez schválení. Oprávnění nastavte tak, aby řešení vidělo jen dokumenty, které potřebuje.',
            'My v ProjentIQ zpracováváme data v rámci EU, dokumenty klientů nesdílíme s třetími stranami a řešení umíme nasadit i přímo na infrastrukturu klienta.'
          ]
        }
      ],
      takeaway: 'Než do AI nástroje nahrajete první dokument, zjistěte, kde se zpracuje, kdo k němu má přístup a jak dlouho zůstane uložený. Odpovědi si nechte napsat.'
    },
    en: {
      title: 'Where does your data go when you use AI: 5 questions before you start',
      perex: 'When an employee pastes an invoice or a contract into an AI tool, the document leaves your company. Five questions help you find out where it ends up and who can access it.',
      sections: [
        {
          heading: 'A document in an AI tool is not “just text”',
          paragraphs: [
            'An invoice contains company IDs, bank accounts and amounts. A contract contains terms you do not want to share with competitors. An HR email contains employees’ personal data. When you paste any of it into an AI tool, it is processed on someone else’s server.',
            'That does not mean AI should be banned. You need to know where the data is processed, how long it is kept and whether it can be used for other purposes. This article is not legal advice. For personal data and contractual obligations, consult a lawyer or your data protection officer.'
          ]
        },
        {
          heading: 'Five questions to ask your supplier',
          ordered: true,
          items: [
            { title: 'Where is the data processed', text: 'Within the EU or outside it? Ask for the answer in writing, not just from a marketing page.' },
            { title: 'Who can access the data', text: 'Are documents passed on to other companies, such as model or hosting providers? If so, which ones and why?' },
            { title: 'How long is the data kept', text: 'Do documents stay stored after processing? Can that be switched off, or can you request deletion?' },
            { title: 'Is the data used for other purposes', text: 'For example, to train models. The contract or terms of service should say so clearly.' },
            { title: 'What happens in an incident', text: 'How will the supplier tell you about a breach, and who is responsible under the contract?' }
          ]
        },
        {
          heading: 'EU processing and your own infrastructure are two different things',
          paragraphs: [
            'Processing in the EU means the data stays in a European environment, but it is still handled by the supplier’s service. It is often a sensible compromise between convenience and control.',
            'Deployment on your own infrastructure means the solution runs on your servers or in your cloud. Documents never leave an environment you manage yourself. It does require server maintenance and updates, so it is worth considering for more sensitive data or stricter internal rules.'
          ]
        },
        {
          heading: 'Map what is already being uploaded',
          paragraphs: [
            'The biggest risk is often not a new project but the tools employees already use without your knowledge. Ask people which AI tools they use and which documents they paste into them. The aim is not to find someone to blame, but to learn the real situation.',
            'Then sort documents into three groups: ordinary, sensitive and those that must never go into external tools. For each group, decide which tool is allowed.'
          ]
        },
        {
          heading: 'What a person should still do with a secure setup',
          paragraphs: [
            'Even well-configured data processing does not settle whether the output is correct. A person should always review uncertain fields, and nothing should be written to a company system without approval. Set permissions so the solution sees only the documents it needs.',
            'At ProjentIQ, we process data within the EU, we do not share client documents with third parties, and we can deploy the solution directly on the client’s infrastructure.'
          ]
        }
      ],
      takeaway: 'Before you upload the first document to an AI tool, find out where it is processed, who can access it and how long it stays stored. Get the answers in writing.'
    }
  }
})
