# Blog ProjentIQ — návod na písanie článkov

Pre každého, kto píše článok — človeka aj AI agenta. Vzorové články:
`app/content/blog/how-to-choose-your-first-process-to-automate.ts` a
`app/content/blog/ai-code-security.ts`. Keď je niečo nejasné, rob to ako ony.

## Pre koho píšeme

Majitelia, konatelia a manažéri malých a stredných firiem na Slovensku a v
Česku (účtovníctvo, výroba, obchod, služby). Nie sú to programátori. Zaujíma
ich ušetrený čas, menej chýb, bezpečnosť dát a koľko to stojí. Článok im má
pomôcť rozhodnúť sa alebo niečo urobiť — aj keby si nás nikdy nenajali.

## Tón

- Vecný, pokojný, praktický. Žiadny hype („revolúcia“, „game-changer“,
  „AI zmení všetko“), žiadne superlatívy, žiadne emoji.
- Vykáme („vyberte“, „zmerajte“). My = ProjentIQ.
- Krátke vety, konkrétne príklady z firmy (faktúry, e-maily, smernice,
  objednávky) namiesto abstrakcií.
- Poctivo aj o limitoch: kedy AI nepoužiť, čo môže zlyhať, kde musí
  rozhodnúť človek. To je naša pozícia, nie slabina.
- O ProjentIQ najviac jedna sekcia alebo zmienka na konci; článok nesmie
  byť reklama. Výzvu na demo pridáva stránka sama (CTA pod článkom).

## Štruktúra

Súbor `app/content/blog/<slug>.ts`, tvar podľa `BlogPostSource` v
`app/utils/blog-types.ts`:

- **slug** = názov súboru, anglicky, kebab-case, 3–8 slov
  (`how-to-choose-your-first-process-to-automate`).
- **title**: konkrétny, ideálne s prínosom alebo číslom bodov
  („…: 5 otázok, ktoré si položiť“). Max. ~70 znakov.
- **perex**: 1–2 vety, čo sa čitateľ dozvie. Max. ~200 znakov (je to aj
  meta description).
- **sections**: 4–6 sekcií. Nadpis je tvrdenie alebo pokyn, nie jedno slovo.
  Odsek 2–4 vety. Zoznam (`items`) tam, kde ide o kroky alebo kritériá;
  `title` položky bez dvojbodky (pridá ju šablóna).
- **takeaway**: 1–3 vety, čo si má čitateľ zapamätať.
- Dĺžka: ~400–600 slov v slovenčine. Čas čítania sa dopočíta sám.
- **tags**: 2–4 z: `Automation`, `AI`, `Processes`, `Security`, `Documents`,
  `Knowledge base`, `Data privacy`, `Pricing`, `Supabase`, `PHP`.
- **sources**: pri aktuálnych témach povinné (pozri nižšie), inak vynechaj.

## Jazyky

Najprv slovenčina, potom čeština a angličtina. Preklad nie je doslovný —
má znieť, akoby ho písal rodený hovorca (čeština nie je „poslovenčená“,
angličtina je britsko-americky neutrálna, bez slovakizmov). Všetky tri
jazyky majú rovnaké sekcie v rovnakom poradí.

Typografia: slovenské a české úvodzovky „…“, anglické “…”, pomlčka – medzi
číslami a vo vetách, apostrof ’ v angličtine.

## Čo smie článok tvrdiť o ProjentIQ

Len toto (zdroj: web, cenník, case study). Čokoľvek iné o našej práci,
klientoch, výsledkoch alebo tíme **nepíš**.

- Navrhujeme a nasadzujeme AI agentov, RAG znalostné systémy a automatizáciu
  procesov pre malé a stredné firmy na Slovensku a v Česku.
- Riešenia staviame na dokumentoch, dátach a systémoch, ktoré firma už používa.
- Spracovanie prebieha v rámci EÚ a dokumenty klientov nezdieľame s tretími
  stranami. Riešenie vieme nasadiť aj priamo na infraštruktúru klienta.
- Napájame sa na Pohodu, Omegu, iDoklad a ďalšie účtovné systémy cez API
  alebo import; ďalej ERP, CRM, SharePoint, Google Drive, e-mail, databázy, API.
- Sporné polia sú vždy zvýraznené na kontrolu a nič sa nezapíše bez
  schválenia človekom. Systém sa učí z opráv.
- Spolupráca: analýza procesu → návrh riešenia → pilot na reálnych
  dokumentoch → produkčné používanie po schválení.
- Bezplatné demo na dátach klienta; prvé funkčné demo zvyčajne do dvoch týždňov.
- Ceny **len** z `app/utils/pricing.ts` (konečné ceny v EUR, nie sme
  platiteľom DPH; pilot s pevnou cenou sa odpočíta z ceny implementácie).
  Mesačný poplatok zahŕňa prevádzku, náklady na AI, monitoring a podporu.
  Nepoužívaj ceny z `public/llms.txt` ani z iných článkov.
- Kód píšeme a kontrolujeme s AI; každú zmenu posúdi jazykový model v CI/CD;
  bezpečnosť overujú automatické testy proti reálnej databáze a kritický nález
  blokuje nasadenie; pred nasadením aplikáciu preverí bezpečnostný expert.
- Fakty z case study v `app/utils/case-studies.ts` (bez mena klienta, ak tam nie je).

## Čo je zakázané

- **Čísla bez zdroja**: žiadne „ušetríte 70 % času“, „firmy strácajú
  X hodín týždenne“, „podľa štúdií…“. Nemáme vlastné merania. Namiesto čísla
  ukáž, ako si ho čitateľ zmeria sám.
- Citácie, štúdie, prieskumy, mená firiem a ľudí, referencie klientov.
- Mená AI poskytovateľov a modelov, ktoré používame (neuvádzame ich).
- Právne a daňové rady. Pri GDPR, AI Acte a pod. len všeobecne známe
  princípy a odporúčanie poradiť sa s odborníkom; žiadne čísla článkov zákona.
- Sľuby výsledkov („zaručene“, „bez chýb“, „100 %“).
- Útoky na konkurenciu a konkrétne produkty.

## Aktuálne témy (bezpečnostné incidenty, novinky)

Vzor: `app/content/blog/php2shell-what-businesses-should-do-now.ts`.

- Každé tvrdenie o udalosti musí mať zdroj v `sources`: najprv oficiálny
  (výrobca, SK-CERT/NBÚ, NÚKIB, CERT-EU), potom bezpečnostné firmy. Label =
  „Vydavateľ: názov, YYYY-MM-DD“.
- Tu smieš menovať firmy a úrady, ktoré sú zdrojom faktu, a uviesť čísla
  z týchto zdrojov (verzie, dátumy, skóre). Stále žiadne vymyslené čísla.
- Ak sa zdroje rozchádzajú (napr. či sa chyba už zneužíva), napíš to.
- Publikuj hneď: `datePublished` = deň zlúčenia, nie najbližší utorok.

## Titulný obrázok

Pole `cover` so sk, cs a en (limity v `BlogCover`), potom
`npm run blog:covers` → `public/blog/<slug>.png`, `<slug>.cs.png` a
`<slug>.en.png`. Každý jazyk má vlastný obrázok, preto texty prelož, nie len
skopíruj. Všetky tri obrázky si po vygenerovaní pozri; ak na poslednom riadku
ostane jedno slovo, text skráť. Štýl ako vzory: karta = otázka alebo citát,
ktorý si čitateľ kladie; headline + highlight = odpoveď alebo pointa článku;
footnote = čo v článku nájde.

`imageAlt` v troch jazykoch opisuje, čo je na obrázku daného jazyka (vrátane
textu).
`inlineImage` nepoužívaj.

## Dátum

`datePublished` = najbližší utorok, ktorý je po dnešku aj po dátume
najnovšieho článku v `app/content/blog/`. Článok s budúcim dátumom vyjde sám
ráno v ten deň (`.github/workflows/blog-scheduled-publish.yml`).

Ak vecne meníš už publikovaný článok (nová informácia, oprava faktu),
doplň `dateModified` = dnešný dátum. Pri preklepoch ho nemeň.

## Príspevok na Facebook

`social/facebook-<slug>.md` podľa `social/facebook-first-process.md`:
otázka/hák, 1–2 vety o článku, odkaz `https://projentiq.com/sk/blog/<slug>/`,
otázka do diskusie, cesta k obrázku. Po slovensky, bez hashtagov a emoji.

## Kontrola pred odovzdaním

1. Téma presunutá v `docs/blog/ideas.md` z „Na rade“ do „Napísané“.
2. Každé tvrdenie o ProjentIQ je v zozname vyššie; v texte nie je žiadne
   číslo bez zdroja.
3. `npm run blog:covers` prešiel a všetky tri obrázky vyzerajú dobre.
4. Lokálne prešiel `npm run generate`. V cloude, kde chýba prístup ku Google
   Fonts, stačí `npx tsc --noEmit -p .nuxt/tsconfig.app.json`; celý build
   overí Netlify náhľad v PR.
5. Všetky tri jazyky majú rovnaký počet sekcií a položiek.
