# Spec: ProjentIQ — interaktívne demá (3)

> Pridáva na web tri skriptované interaktívne ukážky, aby návštevník pochopil,
> čo znamená vyťažovanie faktúr, RAG znalostná báza a automatizácia — bez toho,
> aby poznal pojmy. Všetky sú skriptované (žiadne AI volanie, žiadny backend),
> takže vždy fungujú, nič nestoja a nedajú sa zneužiť.
> Stack: Nuxt 4 (`app/`), nuxt-icon (`<Icon name="tabler:..." />`), i18n
> (sk/cs/en), existujúce dizajnové tokeny. Plán pred kódom.

---

## 0. Cieľ a princíp

- **Úloha demá:** „aha moment" → návštevník klikne na kontakt. NIE je to produkt
  zadarmo. Demo beží na *vzorových* dátach, ktoré dodávame my.
- **Nedávame self-service „na vlastných dátach"** — to je predajný hák
  („Ukážeme vám to na vašej faktúre"), ostáva za kontaktom.
- Skriptované = vždy funguje, žiadne pomalé/chybné odpovede pred zákazníkom.

---

## 1. Umiestnenie a UX

- Demá patria do sekcie **Riešenia** (pod `ProductCards`), NIE do hero (kvôli LCP
  a výkonu).
- Vytvor novú sekciu `InteractiveDemos.vue` a vlož ju v `index.vue` hneď za
  `<ProductCards />`.
- Vzhľad sekcie: eyebrow (mono) „Vyskúšajte si to" + `<h2>` „Ako to funguje
  v praxi" + krátky lead + **3 záložky** (Faktúry · Znalostná báza · Automatizácia)
  + plocha s aktívnym demom pod nimi.
- Iba **jedno demo otvorené naraz** (záložky prepínajú). Default: prvá záložka
  (Faktúry) — ale demo sa **nespustí samo**, len sa zobrazí v „čaká" stave.
- **Prepojenie s kartami (voliteľné, odporúčané):** každá karta v `ProductCards`
  dostane tlačidlo „Vyskúšať ukážku ↓", ktoré nastaví príslušnú záložku a plynulo
  odscrolluje na sekciu demá (`scrollIntoView`, respektuj reduced-motion).

```
[ ProductCards — 3 karty (každá s „Vyskúšať ukážku ↓") ]
        │
        ▼
[ InteractiveDemos ]
  eyebrow + h2 + lead
  [ Faktúry ] [ Znalostná báza ] [ Automatizácia ]   ← záložky
  ┌─────────────────────────────────────────────┐
  │  aktívne demo (lazy-loaded)                   │
  └─────────────────────────────────────────────┘
```

---

## 2. Spoločné pravidlá pre všetky demá

- **Skriptované** — žiadne `fetch`, žiadna Netlify Function, žiadny API kľúč.
- **Jasné označenie** dole v každom demo (mono, stlmené): že ide o vzorové dáta.
  Napr. „Ukážka na vzorových dátach — nič sa neodosiela."
- **Reset** v každom deme („Znova").
- **Reduced-motion:** ak `prefers-reduced-motion: reduce`, preskoč animácie —
  zobraz koncový stav okamžite (žiadny scan, typing, postupné odhaľovanie).
- **Cleanup:** každý `setTimeout`/`setInterval` ulož a v `onUnmounted` (a pri
  resete/prepnutí záložky) zruš. Žiadne visiace timery.
- **Mobil:** demá musia fungovať na úzkej obrazovke (≤ 40rem) — viď poznámky
  pri jednotlivých demách.
- **Tokeny:** používaj existujúce (`--color-surface-1/2`, `--color-border`,
  `--r-lg/md/sm`, `--sh-lg/md`, `--hairline-top`, `--font-mono`, `--color-accent`,
  `--color-accent-soft`, `--color-accent-border`, `--color-success`,
  `--color-success-soft`, `--color-text-muted/subtle`). Žiadne nové farby.
- **Ikony:** `<Icon name="tabler:..." />`.

---

## 3. Architektúra komponentov

```
app/components/
  InteractiveDemos.vue        # obal: eyebrow/h2/lead + záložky + lazy render
  demos/
    DemoInvoice.vue           # Demo 1 — extrakcia faktúr
    DemoRagChat.vue           # Demo 2 — RAG chat
    DemoAutomation.vue        # Demo 3 — automatizačný workflow
```

- `InteractiveDemos.vue` drží `activeTab` ref a lazy renderuje:
  ```html
  <LazyDemosDemoInvoice    v-if="activeTab === 'invoice'" />
  <LazyDemosDemoRagChat    v-if="activeTab === 'rag'" />
  <LazyDemosDemoAutomation v-if="activeTab === 'automation'" />
  ```
  (Nuxt `Lazy` prefix + `v-if` = komponent sa stiahne až pri prvom otvorení.)
- Každé demo je samostatný komponent s vlastným stavom; po prepnutí záložky a
  návrate sa môže resetovať (jednoduchšie) alebo zachovať stav — stačí reset.

---

## 4. Demo 1 — Extrakcia faktúr (`DemoInvoice.vue`)

**Layout:** 2 stĺpce — vľavo vzorová faktúra (vizuál), vpravo extrakčný panel.
Nad tým prepínač 2 vzorových faktúr (Faktúra A / Faktúra B). Pod tým tlačidlo
„Spracovať doklad" + „Znova".

**Správanie po kliknutí „Spracovať doklad":**
1. Tlačidlo → spinner + „Spracúvam…"; badge panela → „spracúva sa" (accent).
2. Cez faktúru prebehne jemný „scan" prúžok (~1,1 s). (reduced-motion: vynechať.)
3. Panel: skry prázdny stav, postupne odhaľuj polia (jedno po ~380 ms), každé
   krátko bliká accent borderom.
4. Po poslednom poli: badge → „hotovo" (success), zobraz pásik „Pripravené na
   zápis do účtovníctva", tlačidlo → „Spracované" + check.

**Polia panela (poradie):** Dodávateľ, IČO, Dátum, Základ DPH, DPH 23 %,
Suma s DPH, Splatnosť. Číselné hodnoty mono, accent farba.

**Vzorové dáta:**
```js
[
  { logo:'Veľkoobchod Drevo s.r.o.', addr:'Priemyselná 12, 010 01 Žilina', num:'č. 2026/0892',
    ico:'36 712 345', date:'14. 6. 2026', due:'28. 6. 2026',
    base:'1 240,00 €', vat:'285,20 €', total:'1 525,20 €',
    items:[['Drevené hranoly 100×100','820,00 €'],['OSB dosky 18mm','420,00 €']] },
  { logo:'Telekom Slovakia a.s.', addr:'Bajkalská 28, 817 62 Bratislava', num:'č. 2026/14872',
    ico:'35 763 469', date:'1. 6. 2026', due:'15. 6. 2026',
    base:'115,77 €', vat:'26,63 €', total:'142,40 €',
    items:[['Mobilný program Biznis','89,00 €'],['Dátový balík 50GB','26,77 €']] }
]
```
> Pozn.: DPH 23 % zodpovedá aktuálnej SK sadzbe. Sumy si over (base+vat=total).

**Mobil:** stĺpce pod seba (faktúra hore, panel dole).

---

## 5. Demo 2 — RAG chat (`DemoRagChat.vue`)

**Layout:** hlavička s avatarom „Firemný asistent" + status „napojený na vaše
dokumenty". Pod tým pásik so zoznamom vzorových dokumentov (mono chipy). Telo
chatu (prázdny stav → správy). Dole sekcia „Skúste sa opýtať" s 3 klikateľnými
otázkami.

**Správanie po kliknutí na otázku:**
1. Tlačidlo otázky → disabled. Pridaj user bublinu (otázka) vpravo.
2. Zobraz „typing" indikátor (3 bodky) v bot bubline (~1,5 s).
   (reduced-motion: skráť/preskoč, rovno zobraz odpoveď.)
3. Nahraď ho bot bublinou: odpoveď + **citácia zdroja** (chip s názvom súboru
   a stranou/paragrafom) + mono meta „odpovedané · X sek.".
4. Auto-scroll tela na koniec po každej správe.

**Vzorové dokumenty (chipy):** `VOP_2025.pdf`, `Zmluva_Signa_2024.pdf`,
`Smernica_nakup_2025.pdf`.

**Otázky + odpovede + citácie:**
```js
[
  { q:'Aká je reklamačná lehota pre B2B klientov?',
    a:'Pre B2B klientov platí 30-dňová lehota na nahlásenie závady. Bežní zákazníci majú 14 dní.',
    src:'VOP_2025.pdf · §8', time:'2,1 sek.' },
  { q:'Kedy vyprší zmluva so Signou?',
    a:'Zmluva so Signou Slovakia je platná do 31. 3. 2026. Predlžuje sa automaticky o 12 mesiacov, ak ju nezrušíte najneskôr 60 dní pred koncom.',
    src:'Zmluva_Signa_2024.pdf · str. 3, čl. 4.2', time:'3,4 sek.' },
  { q:'Aké sú platobné podmienky pre nových dodávateľov?',
    a:'Splatnosť faktúr je 30 dní od doručenia. Pri objednávkach nad 5 000 € sa vyžaduje 30 % záloha vopred.',
    src:'Smernica_nakup_2025.pdf · str. 2', time:'1,9 sek.' }
]
```
**Citácia zdroja je povinná** v každej odpovedi — je to kľúčový dôkaz dôvery
(odpoveď nie je vymyslená).

**Mobil:** funguje 1-stĺpcovo prirodzene; telo chatu má `max-height` + scroll.

---

## 6. Demo 3 — Automatizačný workflow (`DemoAutomation.vue`)

**Layout:** hlavička (názov scenára „objednávka e-mailom"). Pod tým rad **4 uzlov**
spojených linkami. Pod tým „Priebeh" log. Tlačidlo „Spustiť automatizáciu" + „Znova".

**Uzly (poradie):** E-mail prijatý (`tabler:mail`) → Agent prečítal
(`tabler:robot`) → Záznam vytvorený (`tabler:database-plus`) → Potvrdenie
odoslané (`tabler:send`).

**Správanie po „Spustiť automatizáciu":**
1. Tlačidlo → spinner + „Beží…". Log sa vyprázdni.
2. Pre každý uzol postupne: stav „spracúva" (active, accent) na ~1,1 s →
   potom „done" (success), spojnica k ďalšiemu uzlu sa naplní accentom, do logu
   pribudne riadok s časom. (reduced-motion: zobraz všetky kroky naraz ako done.)
3. Na konci: pásik „Hotovo za 6 sekúnd — bez zásahu človeka.", tlačidlo → „Hotovo".

**Kroky (uzol, stav, log, čas):**
```js
[
  { node:0, status:'prijaté',   log:'Nová objednávka od ABC s.r.o.',                 t:'0,0s' },
  { node:1, status:'pochopené', log:'Rozpoznané: 3 položky, dodacia adresa, IČO',     t:'2,2s' },
  { node:2, status:'uložené',   log:'Objednávka #4821 vytvorená v systéme',           t:'4,1s' },
  { node:3, status:'odoslané',  log:'Potvrdzujúci e-mail odoslaný zákazníkovi',       t:'6,0s' }
]
```

**Mobil (≤ 40rem):** rad uzlov sa prepne na zvislý (`grid-template-columns: 1fr`),
spojnice skry. Log ostáva.

---

## 7. i18n kľúče (sk.json, cs.json, en.json)

Pridaj blok `demos`. Texty nech NEsú napevno v komponentoch — ťahaj cez `t()`.
(Skratka — uvádzam SK; cs/en dorob ekvivalentne.)

```json
"demos": {
  "eyebrow": "Vyskúšajte si to",
  "title": "Ako to funguje v praxi",
  "lead": "Kliknite a pozrite, čo riešenia reálne robia — na vzorových dátach.",
  "tab_invoice": "Faktúry",
  "tab_rag": "Znalostná báza",
  "tab_automation": "Automatizácia",
  "try_on_card": "Vyskúšať ukážku",
  "sample_note": "Ukážka na vzorových dátach — nič sa neodosiela.",
  "btn_reset": "Znova",

  "invoice": {
    "title": "Skúšobné spracovanie faktúry",
    "sample_a": "Faktúra A", "sample_b": "Faktúra B",
    "run": "Spracovať doklad", "running": "Spracúvam…", "done": "Spracované",
    "out_caption": "Vyťažené údaje",
    "status_wait": "čaká", "status_proc": "spracúva sa", "status_done": "hotovo",
    "empty": "Kliknite na „Spracovať doklad" a sledujte, čo systém vytiahne.",
    "result": "Pripravené na zápis do účtovníctva",
    "f_supplier": "Dodávateľ", "f_ico": "IČO", "f_date": "Dátum",
    "f_base": "Základ DPH", "f_vat": "DPH 23 %", "f_total": "Suma s DPH", "f_due": "Splatnosť"
  },

  "rag": {
    "name": "Firemný asistent",
    "status": "napojený na vaše dokumenty",
    "docs_label": "Pracuje s dokumentmi (ukážka)",
    "empty": "Vyberte otázku nižšie. Asistent odpovie na základe firemných dokumentov.",
    "suggest_label": "Skúste sa opýtať",
    "answered": "odpovedané"
  },

  "automation": {
    "title": "Automatizácia: objednávka e-mailom",
    "scenario": "scenár: príde objednávka → agent ju spracuje sám",
    "run": "Spustiť automatizáciu", "running": "Beží…", "done": "Hotovo",
    "log_caption": "Priebeh",
    "log_empty": "Kliknite na „Spustiť automatizáciu"…",
    "result": "Hotovo za 6 sekúnd — bez zásahu človeka.",
    "n_mail": "E-mail prijatý", "n_agent": "Agent prečítal",
    "n_record": "Záznam vytvorený", "n_confirm": "Potvrdenie odoslané",
    "note": "Ilustračná ukážka workflowu — konkrétne kroky prispôsobíme vášmu procesu."
  }
}
```
> Otázky/odpovede RAG a logy automatizácie môžu byť buď v i18n, alebo ako dáta
> v komponente (kratšie). Ak ich dáš do i18n, sprav z nich kľúče; ak do dát,
> aspoň viditeľné texty (q/a) nechaj prekladateľné.

---

## 8. Lazy-loading & výkon

- Demá sa **NEnačítavajú pri načítaní stránky** — len keď používateľ otvorí
  záložku (Nuxt `Lazy` prefix + `v-if`). Toto je kvôli CWV (JS payload, INP).
- Žiadne demo nesmie blokovať render ani byť LCP prvkom.
- Animácie len `transform`/`opacity` (žiadne layout-meniace) kvôli CLS a výkonu.
- Žiadne externé knižnice (žiadny GSAP) — čistý Vue + CSS + setTimeout.

---

## 9. Prístupnosť

**Pozor:** tieto demá sú INTERAKTÍVNE (na rozdiel od hero panela, ktorý je
dekoratívny `aria-hidden`). Preto:
- Záložky: `role="tablist"` / `role="tab"` / `role="tabpanel"`, `aria-selected`,
  ovládateľné klávesnicou (šípky + Enter).
- Tlačidlá (Spracovať, otázky, Spustiť, Znova) sú reálne `<button>` s jasným
  textom; focus-visible viditeľný.
- Chat: telo `aria-live="polite"`, aby čítačka oznámila novú odpoveď.
- Stavové zmeny (spracúva → hotovo) nech nie sú komunikované len farbou — drž aj
  text/ikonu.
- Reduced-motion: koncový stav dostupný okamžite, bez animácií.
- Kontrast AA v oboch témach.

---

## 10. Poradie implementácie (cez Claude Code)

1. i18n: pridaj blok `demos` do sk/cs/en (časť 7).
2. `InteractiveDemos.vue` — obal so záložkami + lazy render + sekčný layout.
3. `demos/DemoInvoice.vue` (časť 4).
4. `demos/DemoRagChat.vue` (časť 5).
5. `demos/DemoAutomation.vue` (časť 6).
6. Vlož `<InteractiveDemos />` do `index.vue` za `<ProductCards />`.
7. (Voliteľné) tlačidlá „Vyskúšať ukážku" v `ProductCards` → nastav záložku +
   scroll na sekciu.
8. Over: lazy-load funguje (demo sa stiahne až pri otvorení), reduced-motion,
   mobil (automatizácia zvislo), kontrast, klávesnica.

---

## 11. Čo NErobiť

- Žiadne reálne AI volania ani upload vlastných súborov (to je phase 2 + gated).
- Nenačítavať demá pri starte stránky (lazy-only).
- Neumiestňovať demá do hero (LCP).
- Nepoužívať GSAP ani iné animačné knižnice.
- Nevynechať „ukážka na vzorových dátach" označenie (dôvera).
- Nevynechať citáciu zdroja v RAG odpovediach.
- Nezabudnúť čistiť timery v `onUnmounted`.
```
