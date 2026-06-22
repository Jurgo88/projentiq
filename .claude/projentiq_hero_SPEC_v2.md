# Spec: ProjentIQ — Hero sekcia (variant A: Pred / Po) — v2

> AKTUALIZOVANÁ verzia, zladená so súčasným kódom v repozitári.
> Nahrádza projentiq_hero_SPEC.md. Plán pred kódom — prečítaj celé.
>
> Stav kódu (jún 2026): dizajnový systém, tokeny, glow, gradient nadpis, panel
> s tieňom, mono captions, status chipy aj `useReveal` composable sú už hotové.
> Hero copy a layout fungujú. JEDINÁ vecná zmena v tomto spec = prerobiť OBSAH
> pravého panela z dnešnej „zmiešanej" verzie na vizuál Pred / Po.

---

## 0. Čo NEMENÍŠ (už je hotové a správne)

- `.hero`, `.hero__bg` (glow + mriežka cez `::after`), `.hero__inner`,
  `.hero__copy`, `.hero__visual` — layout a pozadie ostávajú.
- Eyebrow, H1 s `.hero__title-gradient`, lead, rotátor (`.hero__rotator`),
  micro-trust (`.hero__trust-microcopy`) — ostávajú.
- CTA tlačidlá: `nav.cta_demo` („Požiadať o demo") + `hero.cta_contact`
  („Kontaktovať nás"). **NEMENIŤ** — celá stránka je na nich zjednotená.
- Tokeny (`--color-surface-1`, `--color-border`, `--r-lg`, `--sh-lg`,
  `--hairline-top`, `--font-mono`, `--fs-xs`, `--color-success-soft`,
  `--color-accent-soft`, `--color-accent-border`…) — používaj existujúce.
- Ikony: cez `<Icon name="tabler:..." />` (nuxt-icon), NIE `<i class="ti">`.

---

## 1. Jediná zmena: pravý panel → Pred / Po

### Čo nahrádzaš
V `HeroSection.vue` zmaž blok `panelItems` (script) a celý `.hero-panel`
markup (4 zmiešané riadky: agent/vyhľadávanie/automatizácia/dokument) vnútri
`.hero__visual`. Nahraď ho Pred/Po panelom nižšie.

Dôvod: dnešný panel mieša všetky tri služby do jedného zoznamu a návštevník za
5 sekúnd nepochopí, čo dostane. Pred/Po ukáže bolesť (vľavo) a úľavu (vpravo)
bez čítania.

### Nový script blok
```ts
const baRows = [
  {
    labelKey: 'hero.panel.invoices_label',
    beforeKey: 'hero.panel.invoices_before', beforeMetaKey: 'hero.panel.invoices_before_meta',
    afterKey:  'hero.panel.invoices_after',  afterMetaKey:  'hero.panel.invoices_after_meta'
  },
  {
    labelKey: 'hero.panel.contracts_label',
    beforeKey: 'hero.panel.contracts_before', beforeMetaKey: 'hero.panel.contracts_before_meta',
    afterKey:  'hero.panel.contracts_after',  afterMetaKey:  'hero.panel.contracts_after_meta'
  },
  {
    labelKey: 'hero.panel.orders_label',
    beforeKey: 'hero.panel.orders_before', beforeMetaKey: 'hero.panel.orders_before_meta',
    afterKey:  'hero.panel.orders_after',  afterMetaKey:  'hero.panel.orders_after_meta'
  }
]
```
> Rotátor a jeho logiku (`rotatingPhrases`, `startRotation`…) PONECHAJ.

### Nový markup (vnútri `.hero__visual`, ktoré ostáva `aria-hidden="true"`)
```html
<div class="hero-ba">
  <div class="hero-ba__header">
    <span class="hero-ba__tab hero-ba__tab--before">{{ t('hero.panel.tab_before') }}</span>
    <span class="hero-ba__tab hero-ba__tab--after">{{ t('hero.panel.tab_after') }}</span>
  </div>

  <div class="hero-ba__grid">
    <div class="hero-ba__col hero-ba__col--before">
      <div v-for="(row, i) in baRows" :key="`b-${i}`" class="hero-ba__row hero-ba__row--before">
        <p class="hero-ba__label">{{ t(row.labelKey) }}</p>
        <p class="hero-ba__text">{{ t(row.beforeKey) }}</p>
        <p class="hero-ba__meta">{{ t(row.beforeMetaKey) }}</p>
      </div>
    </div>
    <div class="hero-ba__col hero-ba__col--after">
      <div v-for="(row, i) in baRows" :key="`a-${i}`" class="hero-ba__row hero-ba__row--after">
        <p class="hero-ba__label">{{ t(row.labelKey) }}</p>
        <p class="hero-ba__text">{{ t(row.afterKey) }}</p>
        <p class="hero-ba__meta">{{ t(row.afterMetaKey) }}</p>
      </div>
    </div>
  </div>

  <div class="hero-ba__footer">
    <Icon name="tabler:info-circle" class="hero-ba__footer-icon" />
    {{ t('hero.panel.disclaimer') }}
  </div>
</div>
```

### Štýl (scoped, používa existujúce tokeny)
```css
.hero-ba {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--sh-lg), var(--hairline-top);
}
.hero-ba__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--color-border);
}
.hero-ba__tab {
  padding: 0.6rem 1rem;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  text-align: center;
  letter-spacing: 0.04em;
}
.hero-ba__tab--before { background: var(--color-surface-2); color: var(--color-text-subtle); }
.hero-ba__tab--after  { background: var(--color-accent-soft); color: var(--color-accent);
                        border-left: 1px solid var(--color-accent-border); }

.hero-ba__grid { display: grid; grid-template-columns: 1fr 1fr; }
.hero-ba__col { padding: 0.875rem; }
.hero-ba__col--before { border-right: 1px solid var(--color-border); }

.hero-ba__row {
  padding: 0.625rem;
  border-radius: var(--r-sm);
  margin-bottom: 0.5rem;
  border: 1px solid var(--color-border);
}
.hero-ba__row:last-child { margin-bottom: 0; }
.hero-ba__row--before { background: var(--color-surface-2); }
.hero-ba__row--after  { background: var(--color-accent-soft); border-color: var(--color-accent-border); }

.hero-ba__label {
  margin: 0 0 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
.hero-ba__row--before .hero-ba__label { color: var(--color-text-subtle); }
.hero-ba__row--after  .hero-ba__label { color: var(--color-accent); }

.hero-ba__text {
  margin: 0;
  font-size: 0.8rem;
  font-weight: var(--fw-medium);
  line-height: 1.35;
  color: var(--color-text-muted);
}
.hero-ba__row--after .hero-ba__text { color: var(--color-text); }

.hero-ba__meta {
  margin: 0.2rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
}
.hero-ba__row--before .hero-ba__meta { color: var(--color-text-subtle); }
.hero-ba__row--after  .hero-ba__meta { color: var(--color-success); }

.hero-ba__footer {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.875rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-2);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--color-text-subtle);
}
.hero-ba__footer-icon { width: 14px; height: 14px; color: var(--color-accent); flex-shrink: 0; }

/* Responzív: panel zmizne na mobile (je dekoratívny, aria-hidden) */
@media (max-width: 40rem) {
  .hero__visual { display: none; }
}
```

---

## 2. i18n kľúče na DOPLNENIE (sk.json, cs.json, en.json)

Pridaj pod existujúci `hero.panel` blok (staré kľúče panela `kind_*`, `row_*`,
`status_*`, `live_badge`, `panel_caption` môžeš zmazať — už ich netreba):

```json
"hero": {
  "panel": {
    "tab_before": "← Predtým",
    "tab_after": "Potom →",
    "disclaimer": "Časy sú ilustračné — reálne výsledky závisia od procesu",

    "invoices_label": "Faktúry",
    "invoices_before": "Ručný prepis do účtovníctva",
    "invoices_before_meta": "~3 hod./deň",
    "invoices_after": "AI vytiahne údaje, vy schválite",
    "invoices_after_meta": "~8 sek./faktúra",

    "contracts_label": "Zmluvy",
    "contracts_before": "Hľadanie v zdieľanom disku",
    "contracts_before_meta": "~20 min./dotaz",
    "contracts_after": "Asistent odpovie s citáciou",
    "contracts_after_meta": "~4 sek./dotaz",

    "orders_label": "Objednávky",
    "orders_before": "Ručné zadávanie z e-mailov",
    "orders_before_meta": "každý deň",
    "orders_after": "Agent spracuje a zaeviduje",
    "orders_after_meta": "automaticky"
  }
}
```
> Preklady do cs.json a en.json dorob ekvivalentne (ponechaj „←/→" symboly).

---

## 3. Voliteľné (NEpovinné) — len ak chceš

Tieto NEROB automaticky, sú to návrhy na zváženie:

- **H1.** Dnešné „AI systémy, ktoré pracujú s vašimi dátami." je trochu
  produktové. Partnerskejšia alternatíva: „Zavedieme AI do vašej firmy. Od návrhu
  po prevádzku." (highlight = druhá veta). Rozhodni sa sám — ak meníš, uprav
  `hero.title_main` + `hero.title_highlight`.
- **Rotátor** nech rotuje cez tri OBLASTI služieb (agenti / znalostné bázy /
  automatizácia), nie cez jeden príklad extrakcie — aby neduplikoval panel.

---

## 4. Prístupnosť a výkon (zachovať)

- `.hero__visual` ostáva `aria-hidden="true"` — panel je dekoratívny, rovnaká
  informácia je v copy texte vľavo.
- H1 a lead sa NEanimujú pri vstupe (LCP). Ak je na nich `useReveal`/fade, odober.
  Panel (vpravo) sa animovať reveal-om môže.
- Kontrast textu AA v oboch témach — over `--color-text-subtle` na `surface-2`.
- `prefers-reduced-motion` rešpektuj (rotátor a pulz už to majú).

---

## 5. Čo NErobiť

- Nemeniť CTA tlačidlá ani ich kľúče (`nav.cta_demo`, `hero.cta_contact`).
- Nevytvárať nové i18n kľúče pre nadpis/lead — tie existujú (`title_main`,
  `title_highlight`, `lead`, `eyebrow`, `trust_microcopy`).
- Nerobiť Pred/Po záložky klikateľnými — je to vizuálna metafora, nie tab komponent.
- Neanimovať H1 (LCP).
- Nepoužívať `<i class="ti">` — projekt má nuxt-icon (`<Icon name="tabler:...">`).
- Disclaimer footer ponechať, kým nemáš reálne čísla od klienta.

---

## 6. Poradie implementácie

1. Doplň/uprav i18n kľúče `hero.panel.*` (časť 2) vo všetkých 3 jazykoch.
2. V `HeroSection.vue`: zmaž `panelItems` + starý `.hero-panel` markup.
3. Pridaj `baRows` + nový `.hero-ba` markup a scoped štýly (časť 1).
4. Responzív + over LCP (H1 bez animácie) + kontrast.
5. (Voliteľné) uprav rotátor/H1 podľa časti 3.
```
