# Spec: ProjentIQ — dizajnový systém & vizuálne spracovanie

> Cieľ: povýšiť existujúcu stránku z „developer default" na produkt, ktorý pôsobí
> presne, dôveryhodne a moderne. NEMENÍŠ obsah ani copy (tie sedia) — meníš
> vizuálny jazyk: tokeny, typografiu, hĺbku, ikony, rytmus, mikrointerakcie.
> Stack ostáva: Nuxt 4, scoped CSS v komponentoch + globálne tokeny v main.css.

---

## 0. Dizajnový smer (drž sa toho pri každom rozhodnutí)

Estetika: **„engineered & trustworthy"** — pokojná, presná, s jemnou hĺbkou.
Referencia tónu: Linear / Vercel / Stripe, ale o niečo teplejšie a prístupnejšie,
lebo publikum sú aj netechnickí majitelia firiem. Žiadny startupový cirkus.

Tri princípy:
1. **Hĺbka namiesto plochých rámikov** — vrstvené povrchy, jemné tiene, svetlý
   horný okraj na tmavých kartách. Nie všade 1px border.
2. **Hierarchia vedie k jednému CTA** — akcentová farba je rezervovaná pre hlavnú
   akciu a kľúčové detaily. Neriediť ju.
3. **Vzdušnosť a rytmus** — väčšie medzery, striedanie pozadí sekcií, konzistentný
   kontajner. Nech obsah dýcha.

---

## 1. Dizajnové tokeny (nahraď nimi obsah `main.css` `:root` a `.light`)

### Farby — tmavá (primárna)
```css
--color-bg:           #07070b;
--color-surface-1:    #0e0e16;
--color-surface-2:    #14141f;
--color-surface-3:    #1b1b28;   /* hover / zdvihnuté */
--color-border:       #20202e;
--color-border-strong:#2c2c3d;
--color-text:         #f4f4f7;
--color-text-muted:   #9a9aa8;
--color-text-subtle:  #6a6a78;
--color-accent:       #5b8cff;
--color-accent-hover: #6f9bff;
--color-accent-soft:  rgba(91,140,255,0.12);
--color-accent-border:rgba(91,140,255,0.28);
--color-success:      #3ecf8e;
--color-success-soft: rgba(62,207,142,0.14);
--gradient-accent:    linear-gradient(135deg,#5b8cff 0%,#8b6fff 100%);
--gradient-text:      linear-gradient(120deg,#9bb8ff 0%,#b89bff 100%);
--glow-accent:        radial-gradient(60% 60% at 50% 0%,rgba(91,140,255,0.18),transparent 70%);
```

### Farby — svetlá
```css
--color-bg:           #ffffff;
--color-surface-1:    #f7f8fa;
--color-surface-2:    #eef1f5;
--color-surface-3:    #e7ebf1;
--color-border:       #e3e6eb;
--color-border-strong:#d4d8df;
--color-text:         #0d0d14;
--color-text-muted:   #545a66;
--color-text-subtle:  #8b909c;
--color-accent:       #2f6bff;
--color-accent-hover: #1f5cf0;
--color-accent-soft:  rgba(47,107,255,0.08);
--color-accent-border:rgba(47,107,255,0.22);
--color-success:      #1a9d63;
--color-success-soft: rgba(26,157,99,0.10);
--gradient-text:      linear-gradient(120deg,#2f6bff 0%,#7a4dff 100%);
--glow-accent:        radial-gradient(60% 60% at 50% 0%,rgba(47,107,255,0.10),transparent 70%);
```

### Typografia — škála a váhy
```css
--fs-xs: 0.75rem;   --fs-sm: 0.875rem;  --fs-base: 1rem;
--fs-md: 1.125rem;  --fs-lg: 1.375rem;  --fs-xl: 1.75rem;
--fs-2xl: 2.25rem;  --fs-3xl: 3rem;
--lh-tight: 1.1;    --lh-snug: 1.3;     --lh-base: 1.6;
--tracking-tight: -0.025em;   --tracking-wide: 0.12em;
--fw-regular:400; --fw-medium:500; --fw-semibold:600; --fw-bold:700;
```

### Spacing (4px base), radius, tiene
```css
--sp-1:.25rem; --sp-2:.5rem; --sp-3:.75rem; --sp-4:1rem; --sp-6:1.5rem;
--sp-8:2rem; --sp-12:3rem; --sp-16:4rem; --sp-24:6rem; --sp-32:8rem;
--r-sm:6px; --r-md:10px; --r-lg:14px; --r-xl:20px; --r-full:999px;
--container: 72rem;
--section-y: clamp(4rem, 8vw, 7rem);   /* vertikálny padding sekcií */

--sh-sm: 0 1px 2px rgba(0,0,0,.4);
--sh-md: 0 4px 16px rgba(0,0,0,.30);
--sh-lg: 0 12px 40px rgba(0,0,0,.45);
--sh-glow: 0 0 0 1px var(--color-accent-border), 0 8px 40px rgba(91,140,255,.18);
--hairline-top: inset 0 1px 0 rgba(255,255,255,.06);  /* horný „lesk" na tmavých kartách; v light vynechať */
```

---

## 2. Typografia (font)

- Primárny font cez `@nuxt/fonts` (self-hosted, `font-display: swap`):
  **Geist** alebo **Inter** (oba výborné, geometrické, technické-ale-čisté).
  Nastav ako `--font-sans`.
- Mono akcent: **Geist Mono** alebo **JetBrains Mono** ako `--font-mono`. Použi ho
  na: eyebrow labely sekcií, názvy súborov v hero paneli, statusy, cenovky „od X €".
  Dáva to „engineered" pocit a odlišuje technické detaily od bežného textu.
- Nadpisy: `--fw-semibold`/`--fw-bold`, `letter-spacing: var(--tracking-tight)`,
  `line-height: var(--lh-tight)`.
- Telo: `--fw-regular`, `line-height: var(--lh-base)`, `color: var(--color-text-muted)`.
- H1 hero: `font-size: clamp(2.5rem, 5vw, 3.5rem)`.

---

## 3. Komponenty — čo na každom zmeniť

### Header
- Priehľadné pozadie + `backdrop-filter: blur(10px)` a `background:
  color-mix(in srgb, var(--color-bg) 80%, transparent)`. Nie plný surface.
- Spodný border len `1px` `--color-border`, objaví sa až po scrolle (`is-scrolled`).
- Logo: „Projent" v `--color-text`, „IQ" v `--color-accent`, `--fw-bold`.
- Nav linky `--color-text-muted` → hover `--color-text` s jemným podčiarknutím
  (animovaná spodná linka cez `::after`, `transform: scaleX`).
- Primárne CTA tlačidlo v navigácii: menšie (sm), gradient `--gradient-accent`.

### Hero
- Pozadie sekcie: vrstva `--glow-accent` hore v strede + veľmi jemná mriežka
  (`background-image` z dvoch lineárnych gradientov, opacity ~0.03). Statické,
  neanimované (LCP!).
- Eyebrow nad H1: mono, uppercase, `--tracking-wide`, `--color-accent`, s malou
  bodkou/čiarkou pred textom.
- H1: kľúčovú frázu zvýrazni cez `background: var(--gradient-text);
  -webkit-background-clip: text; color: transparent;`. H1 sa NEanimuje pri vstupe.
- Pod CTA pridaj **dôveru-mikrolinku** (UX/konverzia): mono/sm text napr.
  „Bezplatné demo na vašej faktúre · bez záväzku". Znižuje bariéru kliknutia.
- Tlačidlá: primárne gradient + `--sh-md` + hover `translateY(-1px)`; sekundárne
  ghost s borderom, hover akcentový border.

### Hero panel (pravá strana) — sprav z neho „mini-appku"
- Povrch `--color-surface-1`, `border-radius: var(--r-lg)`, `box-shadow:
  var(--sh-lg), var(--hairline-top)`. Pôsobí zdvihnuto, nie ploché.
- Hlavička panela: mono caption + malý živý „● ukážka" štítok (success farba,
  pulzujúca bodka, rešpektuj reduced-motion).
- Riadky: ikona vľavo (typ akcie), názov/súbor `--font-mono`, status chip vpravo.
  Status „Hotovo" = success chip (zelená bodka + text), „Prebieha" = accent chip.
- Jemné oddelenie riadkov hairline borderom, hover na riadku zvýši surface.

### Trust strip → „Napojenie & dôvera" band
- Samostatný pruh medzi hero a How-it-works, pozadie `--color-surface-1`.
- Každý prvok = chip s ikonou + textom (ikona v `--color-accent`).
- DÔLEŽITÉ: nepoužívaj reálne logá firiem (Pohoda, Google…) — sú chránené.
  Použi neutrálne textové chipy alebo generické ikony (plug, shield, lock, globe).

### How it works (4 kroky)
- Každý krok: číslovaný „token" (kruh/štvorec s gradientom alebo accent-soft
  pozadím a accent číslom), ikona, nadpis, popis.
- Na desktope spoj kroky jemnou prerušovanou spojnicou (dashed line / šípky)
  medzi tokenmi — vizuálne to rozpráva „tok". Na mobile spojnicu skry.
- Pozadie sekcie `--color-surface-1` (striedanie s `--color-bg`).

### Product cards (Riešenia a ceny)
- 3 karty, `--color-surface-1`, `--r-lg`, `--hairline-top`, hover: `translateY(-3px)`
  + `--sh-lg` + accent horný 2px pruh (`::before`, fade-in).
- **Hlavný produkt vizuálne odlíš**: silnejší accent border + jemný `--sh-glow`
  + malý badge „Hlavný produkt" (mono, accent-soft pozadie) hore.
- Štruktúra karty: ikona v accent-soft štvorci → nadpis → 1 veta → zoznam
  pod-použití ako malé tagy/odrážky → cena `od X €` (mono, `--fw-semibold`,
  accent) → jemné „→" CTA.
- Ikony: AI agenti `ti-robot`, RAG `ti-brain`/`ti-books`, Automatizácia
  `ti-settings-automation`/`ti-mail-cog`.

### Why ProjentIQ (4 dôvody)
- Grid 2×2, každý item: accent-soft ikonový štvorec + nadpis + popis.
- Pozadie `--color-bg`. Ikony: `ti-database`, `ti-adjustments`, `ti-eye-check`,
  `ti-plug-connected`.
- Pozn.: text „Riešenie na mieru" je v copy-spec označený ako vata — zváž
  preformulovať na konkrétnejšie („Prispôsobené vášmu procesu").

### Filozofia band („Technológie predávame až…")
- Plnošírkový pruh s `--color-surface-2` alebo jemným gradientom, väčší typ,
  centrovaný, vzdušný. Funguje ako vizuálny „oddych" medzi hustejšími sekciami.

### References (placeholder)
- Ponechaj čestný text. Vizuálne: dashed border karta, stlmená, s ikonou
  `ti-quote`. Nech nepôsobí ako chyba, ale ako zámer.

### FAQ
- Accordion: každá položka karta/riadok s hairline. `summary` s `+` ktorý sa pri
  otvorení otočí na `−` (alebo chevron `transform: rotate`).
- Plynulé otváranie (grid-rows trik alebo details s CSS prechodom). Prvá otvorená.

### CTA band (záver)
- Výrazný pruh s `--color-accent-soft` pozadím a `--color-accent-border`, alebo
  jemný gradient. Nadpis + veta + 2 tlačidlá. Vizuálne najsilnejší blok pred pätou.

### Contact
- Dve kolóny: vľavo copy (nadpis + dôvera-microcopy „ozveme sa do 1 prac. dňa"),
  vpravo formulár v karte (`--color-surface-1`, `--sh-md`).
- Inputy: `--color-surface-2` pozadie, border `--color-border`, focus accent
  border + jemný accent glow ring. Label nad poľom. Honeypot ostáva skrytý.
- Submit: plná šírka, gradient, výrazné.

### Footer
- 3–4 kolóny (brand+popis | Riešenia | Firma | Kontakt), hairline hore.
- Brand logo rovnaký „IQ" accent trik. Spodný riadok: copyright + jazyky.
- Doplň reálne IČO/sídlo (teraz `TODO`).

---

## 4. Sekčný rytmus a pozadia
- Striedaj pozadia: `bg → surface-1 → bg → surface-1 …` pre oddelenie sekcií bez
  hrubých čiar.
- Každá sekcia: `padding-block: var(--section-y)`, obsah v `max-width: var(--container)`,
  bočný padding `clamp(1.25rem, 4vw, 2rem)`.
- Každá sekcia má eyebrow (mono accent label) + `<h2>` + voliteľný lead odsek.

## 5. Ikonografia
- Pridať `@nuxt/icon` s Tabler setom (`ti-*`) alebo Lucide. Konzistentný stroke,
  veľkosti 18–22px, farba `--color-accent` v accent-soft štvorcoch.
- Žiadne emoji ako ikony.

## 6. Pohyb / animácie (CSS-first, žiadny GSAP)
- Jemný „reveal" sekcií pri scrolle: `opacity 0→1` + `translateY(12px→0)` cez
  **Intersection Observer** (composable `useReveal`), trvanie ~0.5s, ease-out.
- Hover mikrointerakcie: karty `translateY(-3px)`, tlačidlá `-1px`, vždy len
  `transform`/`opacity` (kvôli CLS a výkonu).
- **LCP prvok (hero H1 + hlavný text) sa NEanimuje pri vstupe** — vykreslí sa hneď.
- Všetko zabaľ do `@media (prefers-reduced-motion: reduce)` výnimky (už máš základ).

## 7. Responzív
- Breakpointy: `≤56rem` (tablet → 1 stĺpec hero, 2 karty), `≤40rem` (mobil →
  1 stĺpec všade, header nav do „hamburger" alebo zabalí pod logo).
- Header na mobile: skry textovú nav za toggle, ponechaj logo + CTA + prepínače.
- Dotykové ciele min. 44×44px.

## 8. Prístupnosť (nestratiť pri prekreslení)
- Kontrast textu AA v oboch témach (over `--color-text-muted` na pozadiach —
  na surface-1 musí prejsť ≥4.5:1 pre bežný text).
- Zachovaj `:focus-visible` outline, skip-link, `aria-live` na rotátore.
- Gradientový text musí mať dostatočný kontrast aj ako fallback farba.

## 9. Výkon (Core Web Vitals)
- Font `display: swap`, self-hosted (žiadne CDN tretích strán).
- Neanimovať LCP. Žiadny render-blocking JS. Reveal cez IO, nie knižnica.
- Mriežka/glow v hero len CSS (žiadne veľké obrázky). `og-image` ostáva.
- Cieľ: Lighthouse Performance 90+, SEO 100, Accessibility 95+.

## 10. Poradie implementácie (cez Claude Code)
1. Tokeny do `main.css` (časť 1) + napojiť `@nuxt/fonts` (Geist/Inter + mono).
2. Pridať `@nuxt/icon`, globálne tlačidlá a utility (container, eyebrow, section).
3. Header → Hero (vrátane panela, glow, gradient nadpisu, dôvera-microcopy).
4. Trust band → How it works (so spojnicami) → Product cards (zvýraznený hlavný).
5. Why → Filozofia band → References → FAQ → CTA → Contact → Footer.
6. `useReveal` composable + jemné scroll animácie (reduced-motion safe).
7. Responzív pass + Lighthouse audit + kontrast kontrola.

## 11. Čo NErobiť
- Nemeniť texty/copy (riadia sa copy-spec) ani štruktúru sekcií.
- Nepoužívať GSAP ani veľké animačné knižnice.
- Nepoužívať chránené logá firiem ani stockové „AI" obrázky.
- Neriediť accent farbu na nedôležité prvky.
- Neanimovať hero nadpis (LCP).
```
