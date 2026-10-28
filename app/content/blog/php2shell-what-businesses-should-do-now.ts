// Slug = názov súboru.
export default defineBlogPost({
  datePublished: '2026-10-23',
  cover: {
    sk: {
      tag: 'Bezpečnosť',
      card: { badge: 'PHP', label: 'Kritická zraniteľnosť PHP2Shell', text: 'Beží váš web alebo e-shop na PHP?' },
      headline: 'Overte verziu ešte dnes.',
      highlight: 'Jediná úplná oprava je aktualizácia.',
      footnote: 'Čo urobiť, ak web spravuje hosting alebo agentúra.'
    },
    cs: {
      tag: 'Bezpečnost',
      card: { badge: 'PHP', label: 'Kritická zranitelnost PHP2Shell', text: 'Běží váš web nebo e-shop na PHP?' },
      headline: 'Ověřte verzi ještě dnes.',
      highlight: 'Jedinou úplnou opravou je aktualizace.',
      footnote: 'Co dělat, když web spravuje hosting nebo agentura.'
    },
    en: {
      tag: 'Security',
      card: { badge: 'PHP', label: 'Critical PHP2Shell vulnerability', text: 'Does your website or online shop run on PHP?' },
      headline: 'Check the version today.',
      highlight: 'The only complete fix is an update.',
      footnote: 'What to do if a host or agency runs your site.'
    }
  },
  reel: {
    hook: 'Beží váš web alebo e-shop na PHP?',
    scenes: [
      {
        text: 'Projekt PHP 21. októbra opravil dve kritické chyby.',
        highlight: 'Útočník cez ne môže bez prihlásenia spustiť na serveri vlastný kód.'
      },
      { text: 'Prvý pokus o zneužitie zaznamenali už 17. októbra.', highlight: 'Štyri dni pred zverejnením opráv.' },
      { text: 'Nová verzia WordPressu ani pluginov nepomôže.', highlight: 'Aktualizovať treba samotné PHP na serveri.' }
    ],
    steps: {
      title: 'Čo urobiť ešte dnes',
      items: [
        'Spíšte všetko, čo vám beží na PHP.',
        'Opýtajte sa hostingu, akú verziu PHP máte.',
        'Nechajte skontrolovať záznamy servera od 17. októbra.'
      ]
    },
    cta: 'Opravené verzie a celý postup nájdete v článku.'
  },
  imageAlt: {
    sk: 'Tmavá grafika ProjentIQ: Beží váš web alebo e-shop na PHP? Overte verziu ešte dnes. Jediná úplná oprava je aktualizácia.',
    cs: 'Tmavá grafika ProjentIQ: Běží váš web nebo e-shop na PHP? Ověřte verzi ještě dnes. Jedinou úplnou opravou je aktualizace.',
    en: 'Dark ProjentIQ graphic: Does your website or online shop run on PHP? Check the version today. The only complete fix is an update.'
  },
  tags: ['Security', 'PHP', 'AI'],
  sources: [
    { label: 'PHP: Security release advisory, 2026-10-21', url: 'https://www.php.net/archive/2026.php#2026-10-21-5' },
    { label: 'SK-CERT: Kritické zraniteľnosti v PHP, 2026-10-21', url: 'https://www.sk-cert.sk/sk/17345-2/index.html' },
    {
      label: 'NÚKIB: NÚKIB upozorňuje na kritické zranitelnosti v PHP – jediným řešením je aktualizace, 2026-10-21',
      url: 'https://nukib.gov.cz/cs/infoservis/aktuality/2470-nukib-upozornuje-na-kriticke-zranitelnosti-v-php/'
    },
    {
      label: 'Amazon Threat Intelligence: PHP2Shell exploitation prior to public disclosure, 2026-10-21',
      url: 'https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/'
    },
    { label: 'Wiz Research: PHP2Shell – AI uncovers critical RCE vulnerabilities, 2026-10-21', url: 'https://wiz.io/blog/php2shell-php-rce' }
  ],
  content: {
    sk: {
      title: 'PHP2Shell: kritická chyba v PHP a čo má vaša firma urobiť teraz',
      perex: 'Projekt PHP 21. októbra opravil dve kritické chyby, cez ktoré môže útočník bez prihlásenia spustiť na serveri vlastný kód. Ukážeme, čo si overiť a na čo sa opýtať správcu webu.',
      sections: [
        {
          heading: 'Čo sa stalo',
          paragraphs: [
            'PHP je programovací jazyk, na ktorom beží veľká časť webov: WordPress, mnohé e-shopy, klientske portály aj webové rozhrania interných systémov. Projekt PHP 21. októbra 2026 vydal bezpečnostné aktualizácie, ktoré opravujú dve kritické zraniteľnosti s označením CVE-2026-109618 a CVE-2026-109619. Spolu sa im hovorí PHP2Shell.',
            'Obe majú skóre závažnosti 9,2 z 10. Útočník ich môže zneužiť na diaľku a bez prihlásenia a spustiť na serveri vlastný kód. Chyba je v samotnom PHP, nie v konkrétnom webe alebo plugine. Ohrozená je preto každá neaktualizovaná inštalácia PHP, ktorá obsluhuje webové požiadavky.'
          ]
        },
        {
          heading: 'Prečo to nemožno odložiť',
          paragraphs: [
            'Informácie o chybách unikli ešte pred vydaním opráv. Bezpečnostný tím spoločnosti Amazon zaznamenal prvý pokus o zneužitie už 17. októbra, štyri dni pred zverejnením. Ukážky útoku sa objavili ešte v deň vydania opráv a odvtedy tím hlási rozsiahle pokusy o zneužitie.',
            'Nie je jasné, koľko pokusov bolo úspešných. SK-CERT v deň vydania opráv aktívne zneužívanie nepotvrdil. Pri takto rozšírenej chybe však treba počítať s tým, že sa pokusy o útok dostanú aj k vášmu serveru.',
            'Chyby navyše našli výskumníci s pomocou AI modelov. Podľa nich im AI pomohla aj vyvinúť funkčné útoky a za niekoľko hodín ich prispôsobiť rôznym aplikáciám. Zložitosť zneužitia preto podľa nich prestáva byť spoľahlivou prekážkou.'
          ]
        },
        {
          heading: 'Ktoré verzie sú opravené',
          paragraphs: [
            'Opravené sú verzie PHP `8.5.12`, `8.4.27`, `8.3.36` a `8.2.35`. Čo to znamená pre váš server, závisí od toho, akú verziu PHP dnes používa.'
          ],
          items: [
            { title: 'PHP 8.2 až 8.5', text: 'Stačí aktualizovať na najnovšiu verziu v rámci tej istej vetvy. PHP 8.2 však dostáva bezpečnostné opravy len do 31. decembra 2026, preto naplánujte aj prechod na novšiu vetvu.' },
            { title: 'PHP 8.1 a staršie', text: 'Projekt PHP pre tieto verzie oficiálnu aktualizáciu nevydal. Opravu môžu ponúkať niektoré linuxové distribúcie alebo dodávatelia s rozšírenou podporou. Inak je jediným riešením prechod na podporovanú verziu.' },
            { title: 'Aktualizácia webu nestačí', text: 'Nová verzia WordPressu, e-shopu alebo pluginov chybu neopraví. Aktualizovať treba samotné PHP na serveri a potom reštartovať všetky jeho procesy.' },
            { title: 'Dočasné opatrenia len získajú čas', text: 'Podľa projektu PHP žiadna zmena konfigurácie chybu úplne neodstráni. Dočasné nastavenia a pravidlá webového firewallu riziko znižujú, aktualizáciu však nenahradia.' }
          ]
        },
        {
          heading: 'Čo urobiť ešte dnes',
          ordered: true,
          paragraphs: [
            'Mnohé firmy server samy nespravujú. Web majú u hostingu, e-shop na hotovej platforme alebo ich spravuje agentúra. Vašou úlohou je zistiť, kto je za ktorý systém zodpovedný, a dostať od neho jasnú odpoveď.'
          ],
          items: [
            { title: 'Spíšte všetko, čo beží na PHP', text: 'Firemný web, e-shop, klientsky portál, intranet aj webové rozhrania interných systémov. Patria sem aj hotové produkty, ktoré PHP obsahujú.' },
            { title: 'Opýtajte sa správcu', text: 'Hostingu, agentúry alebo IT dodávateľa sa opýtajte: Akú verziu PHP používame? Kedy bola aktualizovaná na opravenú verziu? Boli potom reštartované všetky procesy PHP?' },
            { title: 'Overte hotové platformy', text: 'Ak máte web alebo e-shop na platforme, ktorú prevádzkuje dodávateľ, aktualizáciu rieši on. Overte si, či ju potvrdil.' },
            { title: 'Ak sa nedá aktualizovať hneď', text: 'Zvážte dočasné odstavenie služby alebo obmedzenie prístupu k nej z internetu. SK-CERT to odporúča najmä pri citlivých systémoch a pri službách, ktoré nemožno rýchlo aktualizovať.' },
            { title: 'Hľadajte stopy útoku', text: 'Požiadajte správcu, aby prešiel záznamy servera aspoň od 17. októbra a hľadal neočakávané súbory, procesy či nové účty. Pri podozrení zmeňte heslá a prístupové kľúče uložené na serveri.' }
          ]
        },
        {
          heading: 'Ako sa pripraviť na ďalšiu chybu',
          paragraphs: [
            'PHP2Shell nebude posledná kritická chyba. Rozhoduje, ako rýchlo dokážete reagovať: či viete, kde vám čo beží, kto to spravuje a ako rýchlo vie nasadiť opravu.',
            'Dohodnite sa so správcom webu a s dodávateľmi, v akom čase nasadzujú kritické bezpečnostné opravy, a majte prehľad o verziách softvéru, na ktorých stoja vaše systémy. Systém, ktorý nemožno aktualizovať, berte ako technický dlh s termínom a zodpovednou osobou, nie ako stav, ktorý môže počkať.'
          ]
        }
      ],
      takeaway: 'Chyba je v samotnom PHP, nie vo vašom webe, a jedinou úplnou opravou je aktualizácia. Ešte dnes zistite, čo vo vašej firme beží na PHP, a od správcu si vyžiadajte potvrdenie, že je aktualizované.'
    },
    cs: {
      title: 'PHP2Shell: kritická chyba v PHP a co má vaše firma udělat hned teď',
      perex: 'Projekt PHP 21. října opravil dvě kritické chyby, přes které může útočník bez přihlášení spustit na serveru vlastní kód. Ukážeme, co si ověřit a na co se zeptat správce webu.',
      sections: [
        {
          heading: 'Co se stalo',
          paragraphs: [
            'PHP je programovací jazyk, na kterém běží velká část webů: WordPress, mnoho e-shopů, klientské portály i webová rozhraní interních systémů. Projekt PHP 21. října 2026 vydal bezpečnostní aktualizace, které opravují dvě kritické zranitelnosti s označením CVE-2026-109618 a CVE-2026-109619. Společně se jim říká PHP2Shell.',
            'Obě mají skóre závažnosti 9,2 z 10. Útočník je může zneužít na dálku a bez přihlášení a spustit na serveru vlastní kód. Chyba je v samotném PHP, ne v konkrétním webu nebo pluginu. Ohrožená je proto každá neaktualizovaná instalace PHP, která obsluhuje webové požadavky.'
          ]
        },
        {
          heading: 'Proč to nelze odkládat',
          paragraphs: [
            'Informace o chybách unikly ještě před vydáním oprav. Bezpečnostní tým společnosti Amazon zaznamenal první pokus o zneužití už 17. října, čtyři dny před zveřejněním. Ukázky útoku se objevily ještě v den vydání oprav a od té doby tým hlásí rozsáhlé pokusy o zneužití.',
            'Není jasné, kolik pokusů bylo úspěšných. NÚKIB upozornil, že informace umožňující zneužití jsou veřejně dostupné. U takto rozšířené chyby je proto třeba počítat s tím, že se pokusy o útok dostanou i k vašemu serveru.',
            'Chyby navíc našli výzkumníci s pomocí AI modelů. Podle nich jim AI pomohla také vyvinout funkční útoky a během několika hodin je přizpůsobit různým aplikacím. Složitost zneužití proto podle nich přestává být spolehlivou překážkou.'
          ]
        },
        {
          heading: 'Které verze jsou opravené',
          paragraphs: [
            'Opravené jsou verze PHP `8.5.12`, `8.4.27`, `8.3.36` a `8.2.35`. Co to znamená pro váš server, záleží na tom, jakou verzi PHP dnes používá.'
          ],
          items: [
            { title: 'PHP 8.2 až 8.5', text: 'Stačí aktualizovat na nejnovější verzi v rámci stejné větve. PHP 8.2 však dostává bezpečnostní opravy jen do 31. prosince 2026, proto naplánujte i přechod na novější větev.' },
            { title: 'PHP 8.1 a starší', text: 'Projekt PHP pro tyto verze oficiální aktualizaci nevydal. Opravu mohou nabízet některé linuxové distribuce nebo dodavatelé s rozšířenou podporou. Jinak je jediným řešením přechod na podporovanou verzi.' },
            { title: 'Aktualizace webu nestačí', text: 'Nová verze WordPressu, e-shopu nebo pluginů chybu neopraví. Aktualizovat je potřeba samotné PHP na serveru a poté restartovat všechny jeho procesy.' },
            { title: 'Dočasná opatření jen získají čas', text: 'Podle projektu PHP žádná změna konfigurace chybu zcela neodstraní. Dočasná nastavení a pravidla webového firewallu riziko snižují, aktualizaci ale nenahradí.' }
          ]
        },
        {
          heading: 'Co udělat ještě dnes',
          ordered: true,
          paragraphs: [
            'Mnoho firem server samo nespravuje. Web mají u hostingu, e-shop na hotové platformě, nebo je spravuje agentura. Vaším úkolem je zjistit, kdo je za který systém odpovědný, a dostat od něj jasnou odpověď.'
          ],
          items: [
            { title: 'Sepište vše, co běží na PHP', text: 'Firemní web, e-shop, klientský portál, intranet i webová rozhraní interních systémů. Patří sem i hotové produkty, které PHP obsahují.' },
            { title: 'Zeptejte se správce', text: 'Hostingu, agentury nebo IT dodavatele se zeptejte: Jakou verzi PHP používáme? Kdy byla aktualizována na opravenou verzi? Byly poté restartovány všechny procesy PHP?' },
            { title: 'Ověřte hotové platformy', text: 'Pokud máte web nebo e-shop na platformě, kterou provozuje dodavatel, aktualizaci řeší on. Ověřte si, zda ji potvrdil.' },
            { title: 'Pokud nelze aktualizovat hned', text: 'Zvažte dočasné odstavení služby nebo omezení přístupu k ní z internetu. Slovenský SK-CERT to doporučuje zejména u citlivých systémů a služeb, které nelze rychle aktualizovat.' },
            { title: 'Hledejte stopy útoku', text: 'Požádejte správce, aby prošel záznamy serveru alespoň od 17. října a hledal neočekávané soubory, procesy nebo nové účty. Při podezření změňte hesla a přístupové klíče uložené na serveru.' }
          ]
        },
        {
          heading: 'Jak se připravit na další chybu',
          paragraphs: [
            'PHP2Shell nebude poslední kritická chyba. Rozhoduje, jak rychle dokážete reagovat: zda víte, kde vám co běží, kdo to spravuje a jak rychle umí nasadit opravu.',
            'Domluvte se se správcem webu a s dodavateli, v jakém čase nasazují kritické bezpečnostní opravy, a mějte přehled o verzích softwaru, na kterých stojí vaše systémy. Systém, který nelze aktualizovat, berte jako technický dluh s termínem a odpovědnou osobou, ne jako stav, který může počkat.'
          ]
        }
      ],
      takeaway: 'Chyba je v samotném PHP, ne ve vašem webu, a jedinou úplnou opravou je aktualizace. Ještě dnes zjistěte, co ve vaší firmě běží na PHP, a od správce si vyžádejte potvrzení, že je aktualizované.'
    },
    en: {
      title: 'PHP2Shell: a critical PHP flaw and what your business should do now',
      perex: 'On 21 October, the PHP project fixed two critical flaws that let an attacker run their own code on a server without logging in. Here is what to check and what to ask whoever runs your website.',
      sections: [
        {
          heading: 'What happened',
          paragraphs: [
            'PHP is the programming language behind a large share of the web: WordPress, many online shops, customer portals and the web interfaces of internal systems. On 21 October 2026, the PHP project released security updates fixing two critical vulnerabilities, CVE-2026-109618 and CVE-2026-109619, together known as PHP2Shell.',
            'Both are rated 9.2 out of 10 for severity. An attacker can exploit them remotely, without logging in, and run their own code on the server. The flaw is in PHP itself, not in a particular website or plugin, so every unpatched PHP installation that serves web requests is at risk.'
          ]
        },
        {
          heading: 'Why this can’t wait',
          paragraphs: [
            'Details leaked before the fixes were released. Amazon’s threat intelligence team saw the first exploitation attempt on 17 October, four days before disclosure. Proof-of-concept exploits appeared on the day the fixes came out, and the team has since reported broad exploitation attempts.',
            'It is not clear how many attempts succeeded. Slovakia’s national CSIRT, SK-CERT, had not confirmed active exploitation on the day of release. With a flaw this widespread, though, you should assume attack attempts will reach your server too.',
            'The flaws were also found by researchers using AI models. According to them, AI also helped them develop working exploits and adapt them to different applications within hours. In their view, complexity is ceasing to be a reliable barrier against exploitation.'
          ]
        },
        {
          heading: 'Which versions are fixed',
          paragraphs: [
            'The fixed versions are PHP `8.5.12`, `8.4.27`, `8.3.36` and `8.2.35`. What that means for your server depends on which PHP version it runs today.'
          ],
          items: [
            { title: 'PHP 8.2 to 8.5', text: 'Update to the latest release in the same branch. PHP 8.2 only receives security fixes until 31 December 2026, so also plan a move to a newer branch.' },
            { title: 'PHP 8.1 and older', text: 'The PHP project has not released an official update for these versions. Some Linux distributions and extended-support vendors may offer a fix. Otherwise, the only solution is to move to a supported version.' },
            { title: 'Updating your website is not enough', text: 'A new version of WordPress, your shop software or plugins will not fix the flaw. PHP itself must be updated on the server, and all its processes restarted.' },
            { title: 'Workarounds only buy time', text: 'According to the PHP project, no configuration change fully removes the flaw. Temporary settings and web application firewall rules reduce the risk, but they do not replace the update.' }
          ]
        },
        {
          heading: 'What to do today',
          ordered: true,
          paragraphs: [
            'Many companies do not run their own servers. Their website sits with a hosting provider, their shop on a ready-made platform, or an agency manages both. Your job is to find out who is responsible for each system and get a clear answer from them.'
          ],
          items: [
            { title: 'List everything that runs on PHP', text: 'Your company website, online shop, customer portal, intranet and the web interfaces of internal systems. This also includes off-the-shelf products that contain PHP.' },
            { title: 'Ask whoever runs it', text: 'Ask your hosting provider, agency or IT supplier: Which PHP version do we use? When was it updated to a fixed version? Were all PHP processes restarted afterwards?' },
            { title: 'Check hosted platforms', text: 'If your website or shop runs on a platform operated by a provider, the provider handles the update. Check that they have confirmed it.' },
            { title: 'If you can’t update right away', text: 'Consider taking the service offline temporarily or restricting access to it from the internet. SK-CERT recommends this especially for sensitive systems and services that cannot be updated quickly.' },
            { title: 'Look for signs of an attack', text: 'Ask your administrator to review server logs from at least 17 October, looking for unexpected files, processes or new accounts. If anything looks suspicious, change the passwords and access keys stored on the server.' }
          ]
        },
        {
          heading: 'How to prepare for the next flaw',
          paragraphs: [
            'PHP2Shell will not be the last critical vulnerability. What matters is how quickly you can respond: whether you know what runs where, who manages it and how fast they can deploy a fix.',
            'Agree with your website administrator and suppliers on how quickly they deploy critical security fixes, and keep track of the software versions your systems depend on. Treat a system that cannot be updated as technical debt with a deadline and an owner, not as something that can wait.'
          ]
        }
      ],
      takeaway: 'The flaw is in PHP itself, not in your website, and the only complete fix is an update. Find out today what runs on PHP in your company, and ask whoever manages it to confirm that it has been updated.'
    }
  }
})
