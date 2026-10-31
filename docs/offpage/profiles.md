# Profily mimo webu (#64)

Texty na skopírovanie do Google Business Profile, LinkedInu a katalógov.
Všetko vychádza z textov webu a `app/utils/pricing.ts`. Keď sa zmenia
ceny alebo služby, uprav aj tieto profily.

## 1. Rovnaké údaje všade (NAP)

Google aj AI asistenti spájajú zmienky o firme podľa zhody mena, adresy
a kontaktu. Používaj presne tieto tvary, bez skratiek a variácií:

| Pole | Hodnota |
|---|---|
| Značka | ProjentIQ |
| Prevádzkovateľ | AJRONIK s.r.o. |
| Sídlo (register, faktúry, katalógy) | Clementisova 1997/11, 955 01 Topoľčany |
| Miesto pôsobenia (profily a texty) | Bratislava |
| IČO / DIČ | 55304052 / 2121943153 |
| E-mail | info@projentiq.com |
| Web | https://projentiq.com/sk/ (SK profily), https://projentiq.com/ (EN profily) |
| Kontaktná osoba | Juraj Paluš |
| Telefón | doplň, ak chceš; potom ho uvádzaj všade rovnako |

Pri katalógoch, ktoré chcú názov firmy, uveď „ProjentIQ (AJRONIK s.r.o.)“.
Logo: `public/icon-512.png`.

## 2. Popisy

### Krátky (do 160 znakov, katalógy, LinkedIn tagline)

- **SK:** AI automatizácia faktúr, dokumentov a procesov pre malé a stredné firmy. Napojenie na Pohodu, Omegu a iDoklad. Demo na vašich dátach zdarma.
- **CS:** AI automatizace faktur, dokumentů a procesů pro malé a střední firmy. Napojení na Pohodu, Omegu a iDoklad. Demo na vašich datech zdarma.
- **EN:** AI automation of invoices, documents and processes for SMEs in Slovakia and Czechia. Connects to Pohoda, Omega and iDoklad. Free demo on your data.

### Dlhý (LinkedIn „O nás“, Clutch; pre Google profil je samostatný text v sekcii 3)

**SK:**

> ProjentIQ navrhuje a nasadzuje AI riešenia pre malé a stredné firmy na Slovensku a v Česku. Automatizujeme spracovanie faktúr a iných dokladov so zápisom do Pohody, Omegy či iDokladu, staviame AI chatboty, ktoré odpovedajú z firemných dokumentov s citáciou zdroja, a AI agentov pre e-maily, objednávky a reporty.
>
> Riešenia pracujú s vašimi dátami a systémami, spracovanie prebieha v EÚ a sporné prípady vždy schvaľuje človek. Začíname bezplatným demom na vašich dátach, potom nasleduje pilot s pevnou cenou na jednom procese. Cenu pilotu odpočítame z implementácie, ak pokračujete.

**EN:**

> ProjentIQ designs and deploys AI solutions for small and mid-sized companies in Slovakia and Czechia. We automate the processing of invoices and other documents with entry into Pohoda, Omega or iDoklad, build AI chatbots that answer from company documents and cite the source, and AI agents for email, orders and reports.
>
> Our solutions work with your own data and systems, processing stays in the EU and a person always approves unclear cases. We start with a free demo on your data, followed by a fixed-price pilot on one process. If you continue, the pilot price is deducted from the implementation.

## 3. Google Business Profile

**Najprv over nárok.** Google dáva profil len firmám, ktoré sa so
zákazníkmi stretávajú osobne. Čisto online firmy nárok nemajú. Ak chodíš
za klientmi (analýza procesu, nasadenie), založ profil ako **firmu
s oblasťou pôsobnosti** a **adresu skry**. Zobrazí sa len oblasť. Ak sa
s klientmi osobne nestretávaš, profil nezakladaj, lebo hrozí jeho
pozastavenie. Virtuálne sídlo ani coworking ako adresa neprejdú.

- **Hlavná kategória:** Softvérová spoločnosť (Software company)
- **Ďalšie kategórie:** Poradca v oblasti IT (Computer consultant), Vývojár webových aplikácií alebo podobná, ak ju Google ponúkne
- **Oblasť pôsobnosti:** Bratislava a západné Slovensko, teda Bratislavský, Trnavský, Nitriansky a Trenčiansky kraj (Google odporúča do cca 2 hodín jazdy od základne)
- **Adresa v profile:** bratislavská adresa, odkiaľ reálne pracuješ, skrytá pred verejnosťou
- **Popis (do 750 znakov):** Google v popise nepovoľuje ceny, akcie, ponuky zdarma ani odkazy, tie patria do príspevkov a služieb:

  > ProjentIQ navrhuje a nasadzuje AI riešenia pre malé a stredné firmy, najmä v Bratislave a na západnom Slovensku. Po dohode prídeme kamkoľvek na Slovensku aj do Česka. Automatizujeme spracovanie faktúr a iných dokladov so zápisom do Pohody, Omegy či iDokladu, staviame AI chatboty, ktoré odpovedajú z firemných dokumentov s citáciou zdroja, a AI agentov pre e-maily, objednávky a reporty.
  >
  > Riešenia pracujú s vašimi dátami a systémami, spracovanie prebieha v EÚ a sporné prípady vždy schvaľuje človek. Spoluprácu začíname analýzou procesu a ukážkou na vašich dátach, potom riešenie overíme na jednom procese.

- **Služby** (názov a krátky popis, cena len v poli na cenu):
  - Automatizácia spracovania faktúr: vyťaženie údajov z PDF, skenov a XML a zápis do Pohody, Omegy alebo iDokladu
  - AI chatbot pre firmy (RAG): odpovede z firemných dokumentov s citáciou zdroja
  - AI agenti: e-maily, objednávky, zákaznícka podpora, reporty
  - Pilotný projekt: overenie riešenia na jednom procese (cena 490 € v poli na cenu)
- **Web:** https://projentiq.com/sk/
- **Fotky:** logo, titulný obrázok (`public/og-image.png`), screenshoty dem z webu
- **Recenzie:** po prvých pilotoch požiadaj klientov o recenziu priamo cez odkaz z profilu

## 4. LinkedIn

### Firemná stránka

- **Názov:** ProjentIQ
- **URL:** linkedin.com/company/projentiq
- **Tagline:** krátky popis SK alebo EN (vyššie)
- **O nás:** dlhý popis. Na LinkedIne môžeš dať SK aj EN verziu pod seba.
- **Odvetvie:** IT Services and IT Consulting
- **Veľkosť:** 1 – 10 zamestnancov
- **Lokalita:** Bratislava, Slovensko
- **Špecializácie:** AI automatizácia, spracovanie faktúr, RAG, AI agenti, AI chatbot, Pohoda, Omega, iDoklad, e-faktúra

### Osobný profil zakladateľa

- **Headline (návrh):** Zakladateľ ProjentIQ · AI automatizácia faktúr a procesov pre slovenské firmy
- **Pracovná pozícia:** pridaj ProjentIQ ako aktuálnu pozíciu, aby sa firemná stránka prepojila s profilom
- **Sekcia „Odporúčané“:** stránka automatizácie faktúr, kalkulačka nákladov, článok o e-faktúre 2027

### Témy príspevkov (1 – 2 týždenne)

Z existujúceho obsahu, každá téma na jeden príspevok s odkazom:

1. Povinná e-faktúra od 1. 1. 2027: čo musí urobiť aj neplatiteľ DPH (článok)
2. Koľko stojí ručný prepis 100 faktúr mesačne: výpočet z kalkulačky
3. Prečo AI faktúry neschvaľuje sama: kontrola sporných polí človekom
4. Ako sa faktúra dostane do Pohody cez XML import (článok o Pohode)
5. Krátke video z dema na webe (spracovanie faktúry, odpoveď chatbota s citáciou)
6. Čo e-faktúra nevyrieši: zahraničné faktúry, bloky, doklady od neplatiteľov
7. RAG jednoducho: ako chatbot odpovedá len z vašich dokumentov
8. Ako prebieha pilot a čo je kritérium úspechu
9. Bezpečnosť: kde sa spracúvajú dáta a kto k nim má prístup
10. Skúsenosti z prvých pilotov, keď budú (#62)

## 5. Katalógy a profily

| Kde | Stav | Poznámka |
|---|---|---|
| FinStat (finstat.sk) | vzniká automaticky | over správnosť, doplň web a popis, ak to profil dovolí |
| Firmy.sk | založiť | len bezplatný zápis |
| Zlaté stránky (zlatestranky.sk) | založiť | len bezplatný zápis |
| Clutch.co | založiť | anglický popis; neskôr recenzie od klientov |
| Firmy.cz (Seznam) | po prvom českom klientovi | český popis |
| Bing Places | import z Google profilu | ak Google profil vznikne |

**Pozor na „registre“ a katalógy, ktoré po zápise posielajú faktúru**
(rádovo desiatky eur ročne). Zápis v nich nie je povinný a pre SEO nemá
hodnotu. Nič neplať a neposielaj podpísané formuláre.

## 6. Po založení profilov

Pošli mi odkazy na LinkedIn stránku, Google profil a Clutch. Doplním ich
do `sameAs` v JSON-LD organizácie (`app/pages/index.vue`). Google tak
prepojí web s profilmi ako jednu firmu.
