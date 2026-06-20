# Spec: ProjentIQ — landing page (Nuxt)

> Marketingová landing page pre ProjentIQ — AI automatizácia pre SK/CZ SME.
> Cieľ: získať demo requesty a kontakty. Stack: Nuxt (najnovšia stabilná
> verzia, aktuálne 4.x), SSG (`nuxt generate`).
> Tmavá téma primárna, svetlá prepínateľná. Jazykové mutácie SK/CS/EN.
> Prístupnosť WCAG AA. Plán pred kódom.

---

## 0. Dôležité — copywriting (čítaj prv než píšeš akýkoľvek text)

Texty na tejto stránke NESMÚ znieť ako AI-generated marketing. Konkrétne sa vyhni:
- prázdnym superlatívom: „revolučné", „inovatívne riešenia", „posuňte svoj biznis
  na ďalší level", „v dnešnej dobe", „svet sa mení"
- trojiciam prídavných mien („rýchle, spoľahlivé a bezpečné")
- vágnym sľubom bez čísla alebo konkrétneho výsledku
- emoji v nadpisoch, výkričníkom, frázam typu „a oveľa viac!"

Namiesto toho:
- píš konkrétne a vecne, ako keď vysvetľuješ kamarátovi čo robíš
- jeden konkrétny príklad > tri abstraktné výhody
- čísla iba reálne. Kým nie sú reálne referencie, NEPÍŠ vymyslené štatistiky
  (žiadne „80 %", „ušetríte 4 hodiny denne"). Radšej opíš mechanizmus:
  „prepíše údaje z faktúry za vás, vy len schválite."

**Jazykové mutácie (SK/CS/EN):**
- Slovenčina je zdrojový jazyk a master verzia obsahu (pozri časť 2).
- Čeština a angličtina NIE SÚ strojový/doslovný preklad slovenského textu —
  píš ich prirodzene v danom jazyku, ako by ich písal rodený hovorca daného
  trhu. Žiadne kalky (doslovne preložené slovenské frázy do CS/EN, ktoré
  znejú cudzo).
- Strojový preklad (Google Translate a pod.) je povolený maximálne ako draft
  na internú prácu, nikdy ako finálny text v kóde.

**Copy v tomto spec sú PRÍKLADY SMERU, nie finálne vety.** Nechaj v kóde
zrozumiteľné placeholdery tam, kde text závisí od reálnych dát (čísla, referencie,
mená klientov), a vizuálne ich označ (napr. komentár `<!-- TODO: reálne číslo -->`),
aby ich Jurgo vedel ľahko nájsť a doplniť. Toto platí pre všetky tri jazykové mutácie.

---

## 1. Technické nastavenie

- **Nuxt** (najnovšia stabilná verzia), režim `ssr: true`, build cez `nuxt generate` (SSG) — predgenerované
  statické HTML pre najlepšie SEO a rýchlosť. Žiadny bežiaci server netreba.
- Hosting: Netlify (Jurgo má pipeline). `nuxt generate` → deploy `dist/`.
- Žiadny ťažký CSS framework. Buď čisté CSS s CSS premennými (téma), alebo
  Tailwind ak Jurgo preferuje. Drž JS payload nízky — je to marketingová stránka.
- Fonty: jeden kvalitný sans-serif (napr. cez `@nuxt/fonts` alebo self-hosted kvôli
  rýchlosti a GDPR — žiadne priame volania na Google Fonts CDN).
- Obrázky cez `@nuxt/image` (lazy load, moderné formáty).
- Jazykové mutácie cez `@nuxtjs/i18n` (detaily v časti 2).

## 2. Jazykové mutácie (SK primárna, CS a EN)

- **SK je default a zdroj pravdy** pre obsah. CS a EN sú lokalizované mutácie
  odvodené z SK, ale písané prirodzene (pozri pravidlá v časti 0).
- Modul: `@nuxtjs/i18n`. Routing stratégia: `prefix_except_default` —
  SK beží na koreňovej doméne bez prefixu (`/`), CS na `/cs/`, EN na `/en/`.
  Aktuálne je k dispozícii len `.com` doména → subpath je na štart definitívne
  riešenie.
  > **Plánovaná migrácia:** neskôr prejde CS (a prípadne EN) na samostatnú
  > doménu/ccTLD (napr. `.cz`). Aby bol presun jednoduchší, drž jazykovo
  > špecifický obsah cez i18n routing oddelene už teraz (per-locale texty,
  > žiadne natvrdo zamiešané SK/CS reťazce v jednej komponente) — pri migrácii
  > pôjde najmä o zmenu `nuxt.config` i18n stratégie a DNS/redirecty (301 zo
  > starých `/cs/...` URL), nie o prepisovanie obsahu. `hreflang` a sitemap
  > entries budú treba pri migrácii prepočítať na nové domény.
- Texty mimo komponentov: per-locale súbory (`i18n/locales/sk.json`, `cs.json`,
  `en.json`), nie hardcoded reťazce v komponentoch. Ak sa použije `@nuxt/content`
  (časť 8), tak per-locale obsah (`content/sk/`, `content/cs/`, `content/en/`).
- `<html lang>` sa mení automaticky podľa aktívnej mutácie (rieši i18n modul).
- Prepínanie jazyka: `LangSwitcher.vue` v headeri vedľa `ThemeToggle.vue`.
  Užívateľ si jazyk vyberá explicitne — žiadny vynútený redirect podľa
  `Accept-Language`, max. jemný návrh/banner pri prvej návšteve.
- SEO per mutáciu: vlastné `useSeoMeta()` texty pre každý jazyk (title,
  description — nie strojový preklad), `<link rel="alternate" hreflang="...">`
  pre sk/cs/en + `x-default`, canonical URL per locale, sitemap so všetkými
  mutáciami (pozri časť 3).
- Demo formulár (časť 7) — labely, validačné a chybové hlášky aj potvrdenie
  po odoslaní musia existovať vo všetkých troch jazykoch.
- Build: `nuxt generate` prerenderuje všetky lokalizované routy ako statické HTML.

## 3. SEO (hlavný dôvod pre Nuxt — sprav to poriadne)

- `useSeoMeta()` na každej stránke a v každej jazykovej mutácii: title,
  description, ogTitle, ogDescription, ogImage, twitterCard.
- Title pattern: `ProjentIQ — AI automatizácia faktúr a dokumentov pre firmy`
  (a lokalizované ekvivalenty pre CS/EN).
- Description: konkrétna, ~150 znakov, s tým čo firma reálne robí — per locale.
- Jeden `<h1>` na stránke (hero). Sekcie `<h2>`, podsekcie `<h3>`.
- Sémantické HTML: `<header> <main> <section> <footer>`, nie samé `<div>`.
- `nuxt.config` → `app.head`: `lang` podľa aktívnej mutácie, viewport, theme-color.
- `og:image` — pripraviť 1200×630 obrázok (placeholder zatiaľ), spoločný alebo
  per locale ak bude text v obrázku.
- Structured data: JSON-LD `Organization` + `Service` v `<head>`, s `inLanguage`
  podľa aktívnej mutácie.
- `hreflang` alternáty (sk/cs/en + x-default) na každej stránke.
- `sitemap.xml` a `robots.txt` (modul `@nuxtjs/sitemap` alebo manuálne),
  sitemap pokrýva všetky jazykové mutácie.
- Canonical URL per locale.
- Cieľ: Lighthouse SEO 100, Performance 90+. Žiadny render-blocking JS.

## 4. Téma (dark primárna + light prepínač)

- CSS premenné na `:root` (dark) a `.light` (light), prepínač triedy na `<html>`.
- Prepínač: ulož voľbu (cookie kvôli SSG/SSR konzistencii alebo `useColorMode`
  z `@nuxtjs/color-mode` — preferuj modul, rieši FOUC aj SSR).
- Pozor na FOUC (flash) — modul color-mode vloží inline script do `<head>`.
- Dark paleta: pozadie ~`#0a0a0f`, povrch `#0f0f17`, akcent modrá `#5b8cff`.
- Light paleta: pozadie biela, akcent tmavšia modrá `#2f6bff` (kontrast).
- Kontrast textu musí prejsť WCAG AA v oboch témach (detaily a rozsah pozri
  časť 5 — Prístupnosť).

## 5. Prístupnosť (WCAG AA)

Toto je tvrdá požiadavka, nie „nice to have". Platí pre všetky jazykové
mutácie a obe témy.

- **Sémantika a štruktúra:** landmarks `<header> <nav> <main> <section> <footer>`,
  presne jeden `<h1>` na stránke, logická hierarchia nadpisov bez preskakovania
  úrovní (h2 → h3, nie h2 → h4).
- **Skip-link:** „Preskočiť na obsah" / lokalizovaný ekvivalent, prvý fokusovateľný
  prvok v `<body>`, viditeľný pri focuse, vedie na `<main>`.
- **Klávesnica:** všetko interaktívne (nav menu, ThemeToggle, LangSwitcher,
  FAQ accordion, demo formulár, CTA tlačidlá) ovládateľné cez Tab/Shift+Tab/
  Enter/Space/Esc, logický tab-order, žiadne klávesové pasce.
- **Viditeľný focus state:** vlastný outline/ring na všetkých fokusovateľných
  prvkoch, v oboch témach kontrastný voči pozadiu. Nikdy `outline: none`
  bez plnohodnotnej náhrady.
- **Kontrast:** min. 4.5:1 pre bežný text, 3:1 pre veľký text (≥24px alebo
  bold ≥19px) a pre UI komponenty/ikony — over nástrojom (axe, Lighthouse,
  alebo WebAIM kontrastný checker) pred deployom, v dark aj light téme.
- **Formulár (kontaktný/demo):** každé pole má viazaný `<label>` (nie len
  placeholder), chybové hlášky cez `aria-describedby` + `aria-invalid`,
  GDPR checkbox má prepojený label, chyby pri submite oznámené aj asistenčným
  technológiám (`aria-live="polite"`).
- **Obrázky:** zmysluplný `alt` text na informačných obrázkoch, `alt=""` na
  čisto dekoratívnych. Žiadny dôležitý text iba v obrázku bez textovej alternatívy.
- **Ikonové tlačidlá:** `ThemeToggle`, `LangSwitcher`, hamburger menu na mobile
  majú `aria-label` popisujúci akciu („Prepnúť na svetlú tému", nie len ikona).
- **`prefers-reduced-motion`:** animácie a prechody (theme prepínanie, scroll
  efekty, hover animácie) rešpektujú toto nastavenie.
- **Jazyk stránky:** `<html lang>` vždy zodpovedá aktívnej jazykovej mutácii
  (väzba na časť 2) — kritické pre správne čítanie screen readermi.
- Cieľ: Lighthouse Accessibility 100, žiadne kritické/serious nálezy v axe
  DevTools pred deployom.

## 6. Sekcie stránky (poradie zhora dole)

Vychádza z odsúhlaseného hybrid konceptu (layout B, modré akcenty, sans-serif).

1. **Header / nav** — logo „ProjentIQ", odkazy (Riešenia, Ceny, Referencie),
   primárne tlačidlo „Požiadať o demo", `ThemeToggle` a `LangSwitcher`.
   Sticky, zmenší sa pri scrolle.

2. **Hero** — `<h1>` + jeden odsek + 2 CTA („Požiadať o demo", „Napísať nám").
   Vpravo vizuál: panel „spracované dnes" so zoznamom dokladov (statická ukážka,
   NIE vymyslené živé čísla — je to ilustrácia produktu).
   - Copy smer pre h1: vecné, konkrétne. Napr. *„Faktúry a doklady prepíše za vás
     softvér, nie účtovníčka."* alebo *„Z faktúry do účtovníctva bez ručného
     prepisovania."* — finál doladí Jurgo, pre CS/EN prirodzená lokalizácia
     (pozri časť 0), nie preklad slovo za slovom.
   - Vyhni sa „na automate", „revolúcia", atď.

3. **Ako to funguje** — 3–4 kroky (nahrajte / odfotíte doklad → systém vyťaží
   údaje → skontrolujete → zapíše sa do účtovníctva). Konkrétne, bez omáčky.

4. **Produkty / služby** — 3 karty: Vyťažovanie dokladov (vlajkový),
   RAG znalostná báza, AI agenti & automatizácia. Každá: čo to je jednou vetou,
   pre koho, orientačná cena „od X €". Ceny ako placeholder na ladenie.

5. **Prečo ProjentIQ** — 3–4 vecné odlišovače: dáta zostávajú u klienta (EÚ/GDPR),
   integrácia na slovenské/české účtovné systémy (Pohoda, Omega, iDoklad), kvalitná
   lokálna jazyková podpora, funkčné demo na reálnych dátach pred objednávkou.

6. **Referencie** — zatiaľ PLACEHOLDER sekcia (Jurgo nemá referencie). Priprav
   štruktúru (citát, meno, firma, výsledok) ale označ jasne ako TODO a skry alebo
   nahraď textom „Pripravujeme" (lokalizovane) — NEVYMÝŠĽAJ falošné referencie.

7. **Často kladené otázky** — 4–6 reálnych otázok (Ako sú chránené naše dáta?
   Na aké účtovné systémy sa napájate? Koľko trvá nasadenie? Čo ak doklad
   nerozpozná správne?). Odpovede vecné, krátke. Accordion musí byť plne
   ovládateľný klávesnicou (pozri časť 5).

8. **Záverečný CTA band** — „Ukážeme vám to na vašej faktúre" + demo tlačidlo.

9. **Footer** — kontakt, IČO/sídlo (placeholder), odkazy, GDPR/cookies link.

## 7. Kontakt / demo formulár

- Polia: meno, firma, e-mail, krátka správa. Žiadne citlivé údaje.
- SSG → formulár potrebuje backend: Netlify Forms (najjednoduchšie, bez kódu)
  alebo Netlify Function + e-mail. Preferuj Netlify Forms na štart.
  > Pozor: Netlify Forms vyžaduje, aby `<form data-netlify="true">` (s name
  > atribútom a hidden `form-name` poľom) bol prítomný už v prerenderovanom
  > HTML, nie len v hydratovanej Vue komponente. Overiť hneď po implementácii,
  > pred ostatnými krokmi (pozri časť 9).
- Po odoslaní: jasné potvrdenie (lokalizované). Validácia na klientovi aj serveri.
- GDPR: checkbox so súhlasom + odkaz na zásady spracovania. NEpredvyplnený.
- Antispam: honeypot pole alebo Netlify spam ochrana.
- Labely, placeholdery, validačné a chybové hlášky aj potvrdenie po odoslaní:
  vo všetkých troch jazykoch (pozri časť 2), s a11y väzbami z časti 5.

## 8. Štruktúra komponentov (návrh)

```
components/
  TheHeader.vue        AppFooter.vue        ThemeToggle.vue
  LangSwitcher.vue      HeroSection.vue      HowItWorks.vue
  ProductCards.vue      WhyProjentIQ.vue     Testimonials.vue
  FaqSection.vue        CtaBand.vue          ContactForm.vue
pages/
  index.vue            (zloží sekcie + SEO meta, lokalizované cez i18n routing)
assets/css/
  main.css             (CSS premenné, téma, base)
i18n/
  locales/
    sk.json             cs.json              en.json
content/                (voliteľné — texty cez @nuxt/content, per-locale priečinky)
```

> Zvážiť `@nuxt/content`: texty v markdown/JSON mimo komponentov → Jurgo upravuje
> copy bez zásahu do kódu. Pri troch jazykových mutáciách je to ešte výhodnejšie
> (per-locale priečinky `content/sk/`, `content/cs/`, `content/en/`).

## 9. Poradie stavby (cez Claude Code)

1. Nuxt projekt + moduly (i18n, color-mode, image, fonts, sitemap), base CSS + téma.
2. Layout, header s prepínačom témy a jazyka, footer.
3. Hero (so statickým ukážkovým vizuálom), SK text ako prvý.
4. Ostatné sekcie zhora dole, SK placeholder copy podľa princípov z časti 0.
5. Kontaktný formulár + Netlify Forms — overiť hneď, že form funguje cez
   statický `nuxt generate` build (pozri poznámku v časti 7), nie až na konci.
6. Prístupnosť priebežne (skip-link, focus states, aria, klávesnica) — nie
   až ako posledný krok, je to ľahšie zabudovať od začiatku ako dolepiť.
7. CS a EN lokalizácia textov (po doladení SK verzie, aby sa neprekladalo
   dvakrát).
8. Vizuálne doladenie (design polish) — AŽ PO finalizácii copy s marketérom/
   copywriterom, keďže zmena textu mení nároky na layout. Typografická
   škála, spacing/rytmus sekcií, prepracovanejší hero vizuál (nielen
   generická karta), mikro-interakcie/hover stavy, vizuálna kontrola
   dark aj light témy. Doterajší vizuál (fázy 1-3) je funkčný štrukturálny
   návrh podľa technických požiadaviek (kontrast, sémantika), nie finálny
   dizajn.
9. SEO meta per locale, JSON-LD, hreflang, sitemap, robots, og:image.
10. Lighthouse + axe audit (SEO, Performance, Accessibility) → doladiť.
11. Deploy na Netlify cez `nuxt generate`.

## 10. Čo NErobiť
- Nevymýšľať čísla, referencie ani mená klientov.
- Nepoužívať generický AI marketing jazyk (časť 0) — v žiadnej z troch mutácií.
- Nepoužívať strojový preklad ako finálny CS/EN text bez ľudskej kontroly.
- Nevynucovať jazyk podľa `Accept-Language` redirectom — len ponúknuť.
- Nedávať tracking/analytics tretích strán bez cookie súhlasu (GDPR).
- Neťahať fonty/skripty z CDN tretích strán bez dôvodu (rýchlosť + súkromie).
- Neodkladať prístupnosť na koniec projektu ako „polish" krok.
