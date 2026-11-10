// Slug = názov súboru.
export default defineBlogPost({
  datePublished: '2026-11-17',
  cover: {
    sk: {
      tag: 'Znalostná báza',
      card: { badge: 'RAG', label: 'Firemný chatbot', text: 'Chatbot odpovedal sebaisto. A bolo to celé inak.' },
      headline: 'Chatbot bez zdroja si odpoveď vymýšľa.',
      highlight: 'RAG odpovedá z vašich dokumentov.',
      footnote: 'Čo je RAG a ako ho otestovať.'
    },
    cs: {
      tag: 'Znalostní báze',
      card: { badge: 'RAG', label: 'Firemní chatbot', text: 'Chatbot odpověděl sebejistě. A bylo to celé jinak.' },
      headline: 'Chatbot bez zdroje si odpověď vymýšlí.',
      highlight: 'RAG odpovídá z vašich dokumentů.',
      footnote: 'Co je RAG a jak ho otestovat.'
    },
    en: {
      tag: 'Knowledge base',
      card: { badge: 'RAG', label: 'Company chatbot', text: 'The chatbot sounded sure. It was completely wrong.' },
      headline: 'A chatbot with no source makes answers up.',
      highlight: 'RAG answers from your documents.',
      footnote: 'What RAG is and how to test it.'
    }
  },
  imageAlt: {
    sk: 'Tmavá grafika ProjentIQ s kartou: Chatbot odpovedal sebaisto, a bolo to celé inak. Nadpis: Chatbot bez zdroja si odpoveď vymýšľa. RAG odpovedá z vašich dokumentov.',
    cs: 'Tmavá grafika ProjentIQ s kartou: Chatbot odpověděl sebejistě, a bylo to celé jinak. Nadpis: Chatbot bez zdroje si odpověď vymýšlí. RAG odpovídá z vašich dokumentů.',
    en: 'Dark ProjentIQ graphic with a card: The chatbot sounded sure. It was completely wrong. Headline: A chatbot with no source makes answers up. RAG answers from your documents.'
  },
  tags: ['AI', 'Knowledge base', 'Security'],
  content: {
    sk: {
      title: 'Čo je RAG a prečo je firemný chatbot bez neho riskantný',
      perex: 'Bežný chatbot odpovedá z toho, čo sa naučil, nie z vašich smerníc. RAG mu pri každej otázke podá správne dokumenty a nechá ho uviesť zdroj.',
      sections: [
        {
          heading: 'Chatbot bez zdroja odpovie vždy, aj keď odpoveď nepozná',
          paragraphs: [
            'Jazykový model skladá vety, ktoré znejú pravdepodobne. Nevie, čo je napísané vo vašej smernici o cestovných náhradách alebo v zmluve s dodávateľom. Ak sa ho na to opýtate, často odpovie sebaisto a plynulo, aj keď si obsah vymyslel.',
            'Pre zamestnanca, ktorý hľadá postup, to je horšie ako žiadna odpoveď. Verí jej, lebo znie vierohodne, a nemá ako zistiť, odkiaľ sa vzala.'
          ]
        },
        {
          heading: 'RAG: najprv nájsť dokument, potom odpovedať',
          paragraphs: [
            'Skratka znamená generovanie odpovede doplnené o vyhľadávanie. V praxi to ide po krokoch a na poradí záleží.'
          ],
          ordered: true,
          items: [
            { title: 'Otázka', text: 'Zamestnanec sa opýta napríklad, koľko dní dovolenky možno preniesť do ďalšieho roka.' },
            { title: 'Vyhľadanie', text: 'Systém prehľadá firemné dokumenty a vyberie pasáže, ktoré s otázkou súvisia.' },
            { title: 'Odpoveď z nájdeného', text: 'Model dostane len tieto pasáže a má odpovedať z nich, nie zo svojej pamäte.' },
            { title: 'Zdroj', text: 'K odpovedi systém uvedie dokument a miesto, odkiaľ ju vzal, aby si ju človek mohol overiť.' }
          ]
        },
        {
          heading: 'Dobrý systém povie „v dokumentoch to nie je“',
          paragraphs: [
            'Najdôležitejšia vlastnosť nie je, že odpovie, ale že vie neodpovedať. Ak vyhľadávanie nenájde nič relevantné, systém to má povedať, nie hádať.',
            'Ani RAG nie je zárukou správnosti. Ak sú dokumenty zastarané alebo si protirečia, odpoveď bude rovnako chybná. Preto zdroj pri odpovedi nie je ozdoba: je to spôsob, ako chybu rýchlo odhaliť.'
          ]
        },
        {
          heading: 'Otestujte to sami ešte pred nasadením',
          paragraphs: [
            'Nemusíte rozumieť technike. Stačí pripraviť otázky, na ktoré poznáte správnu odpoveď, a skontrolovať, čo systém vráti.'
          ],
          items: [
            { title: 'Otázky s jasnou odpoveďou', text: 'Vyberte otázky, ktoré zamestnanci kladú najčastejšie, a skontrolujte, či sa odpoveď zhoduje s dokumentom.' },
            { title: 'Otázka, na ktorú odpoveď neexistuje', text: 'Opýtajte sa na niečo, čo vo vašich dokumentoch nie je. Správna reakcia je „neviem“, nie vymyslený postup.' },
            { title: 'Dve verzie jednej smernice', text: 'Skúste, ako systém naloží so starou a novou verziou. Mal by uprednostniť platnú alebo na rozpor upozorniť.' },
            { title: 'Overenie zdroja', text: 'Otvorte uvedený dokument a nájdite v ňom danú pasáž. Ak tam nie je, systému neverte.' }
          ]
        },
        {
          heading: 'Čo k tomu povedať o nás',
          paragraphs: [
            'My v ProjentIQ navrhujeme a nasadzujeme RAG znalostné systémy pre malé a stredné firmy na Slovensku a v Česku a stavíme ich na dokumentoch, ktoré firma už používa.'
          ]
        }
      ],
      takeaway: 'Firemný chatbot má odpovedať z vašich dokumentov a uviesť zdroj. Skôr než mu uveríte, opýtajte sa ho na niečo, čo v nich nie je.'
    },
    cs: {
      title: 'Co je RAG a proč je firemní chatbot bez něj riskantní',
      perex: 'Běžný chatbot odpovídá z toho, co se naučil, ne z vašich směrnic. RAG mu při každé otázce předloží správné dokumenty a nechá ho uvést zdroj.',
      sections: [
        {
          heading: 'Chatbot bez zdroje odpoví vždy, i když odpověď nezná',
          paragraphs: [
            'Jazykový model skládá věty, které znějí pravděpodobně. Neví, co je napsáno ve vaší směrnici o cestovních náhradách nebo ve smlouvě s dodavatelem. Když se ho na to zeptáte, často odpoví sebejistě a plynule, i když si obsah vymyslel.',
            'Pro zaměstnance, který hledá postup, je to horší než žádná odpověď. Věří jí, protože zní důvěryhodně, a nemá jak zjistit, odkud se vzala.'
          ]
        },
        {
          heading: 'RAG: nejdřív najít dokument, potom odpovědět',
          paragraphs: [
            'Zkratka znamená generování odpovědi doplněné o vyhledávání. V praxi to jde po krocích a na pořadí záleží.'
          ],
          ordered: true,
          items: [
            { title: 'Otázka', text: 'Zaměstnanec se zeptá například, kolik dní dovolené lze převést do dalšího roku.' },
            { title: 'Vyhledání', text: 'Systém prohledá firemní dokumenty a vybere pasáže, které s otázkou souvisejí.' },
            { title: 'Odpověď z nalezeného', text: 'Model dostane jen tyto pasáže a má odpovídat z nich, ne ze své paměti.' },
            { title: 'Zdroj', text: 'K odpovědi systém uvede dokument a místo, odkud ji vzal, aby si ji člověk mohl ověřit.' }
          ]
        },
        {
          heading: 'Dobrý systém řekne „v dokumentech to není“',
          paragraphs: [
            'Nejdůležitější vlastnost není, že odpoví, ale že umí neodpovědět. Pokud vyhledávání nenajde nic relevantního, systém to má říct, ne hádat.',
            'Ani RAG není zárukou správnosti. Pokud jsou dokumenty zastaralé nebo si odporují, bude odpověď stejně chybná. Proto zdroj u odpovědi není ozdoba: je to způsob, jak chybu rychle odhalit.'
          ]
        },
        {
          heading: 'Otestujte to sami ještě před nasazením',
          paragraphs: [
            'Nemusíte rozumět technice. Stačí připravit otázky, na které znáte správnou odpověď, a zkontrolovat, co systém vrátí.'
          ],
          items: [
            { title: 'Otázky s jasnou odpovědí', text: 'Vyberte otázky, které zaměstnanci kladou nejčastěji, a zkontrolujte, zda se odpověď shoduje s dokumentem.' },
            { title: 'Otázka, na kterou odpověď neexistuje', text: 'Zeptejte se na něco, co ve vašich dokumentech není. Správná reakce je „nevím“, ne vymyšlený postup.' },
            { title: 'Dvě verze jedné směrnice', text: 'Zkuste, jak systém naloží se starou a novou verzí. Měl by upřednostnit platnou, nebo na rozpor upozornit.' },
            { title: 'Ověření zdroje', text: 'Otevřete uvedený dokument a najděte v něm danou pasáž. Pokud tam není, systému nevěřte.' }
          ]
        },
        {
          heading: 'Co k tomu říct o nás',
          paragraphs: [
            'My v ProjentIQ navrhujeme a nasazujeme RAG znalostní systémy pro malé a střední firmy na Slovensku a v Česku a stavíme je na dokumentech, které firma už používá.'
          ]
        }
      ],
      takeaway: 'Firemní chatbot má odpovídat z vašich dokumentů a uvést zdroj. Než mu uvěříte, zeptejte se ho na něco, co v nich není.'
    },
    en: {
      title: 'What is RAG, and why a company chatbot without it is risky',
      perex: 'An ordinary chatbot answers from what it learned, not from your policies. RAG hands it the right documents for every question and makes it cite the source.',
      sections: [
        {
          heading: 'A chatbot with no source always answers, even when it does not know',
          paragraphs: [
            'A language model strings together sentences that sound likely. It does not know what your travel expenses policy or your supplier contract says. Ask it, and it will often answer fluently and with confidence, even if it has made the content up.',
            'For an employee looking for a procedure, that is worse than no answer. They trust it because it sounds credible, and they have no way to tell where it came from.'
          ]
        },
        {
          heading: 'RAG: find the document first, then answer',
          paragraphs: [
            'The abbreviation stands for retrieval-augmented generation. In practice it works step by step, and the order matters.'
          ],
          ordered: true,
          items: [
            { title: 'Question', text: 'An employee asks, for example, how many days of leave can be carried over to the next year.' },
            { title: 'Retrieval', text: 'The system searches company documents and picks the passages related to the question.' },
            { title: 'Answer from what was found', text: 'The model receives only those passages and has to answer from them, not from its memory.' },
            { title: 'Source', text: 'The system names the document and the place it took the answer from, so a person can verify it.' }
          ]
        },
        {
          heading: 'A good system says “this is not in the documents”',
          paragraphs: [
            'The most important quality is not that it answers, but that it can decline to. If retrieval finds nothing relevant, the system should say so instead of guessing.',
            'RAG does not guarantee correctness either. If documents are outdated or contradict each other, the answer will be just as wrong. That is why the source next to an answer is not decoration: it is how you spot an error quickly.'
          ]
        },
        {
          heading: 'Test it yourself before rollout',
          paragraphs: [
            'You do not need to understand the technology. Prepare questions whose correct answer you know and check what the system returns.'
          ],
          items: [
            { title: 'Questions with a clear answer', text: 'Pick the questions employees ask most often and check that the answer matches the document.' },
            { title: 'A question with no answer', text: 'Ask about something that is not in your documents. The right reaction is “I don’t know”, not an invented procedure.' },
            { title: 'Two versions of one policy', text: 'See how the system handles an old and a new version. It should prefer the current one or point out the conflict.' },
            { title: 'Source check', text: 'Open the cited document and find the passage. If it is not there, do not trust the system.' }
          ]
        },
        {
          heading: 'A word about us',
          paragraphs: [
            'At ProjentIQ, we design and deploy RAG knowledge systems for small and medium-sized companies in Slovakia and the Czech Republic, built on the documents the company already uses.'
          ]
        }
      ],
      takeaway: 'A company chatbot should answer from your documents and cite the source. Before you trust it, ask it something that is not in them.'
    }
  }
})
