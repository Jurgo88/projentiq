<script setup lang="ts">
const { t } = useI18n()

const prefersReducedMotion = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches
  mq.addEventListener('change', (e) => { prefersReducedMotion.value = e.matches })
})

const SAMPLES = [
  {
    logo: 'Veľkoobchod Drevo s.r.o.',
    addr: 'Priemyselná 12, 010 01 Žilina',
    num: 'č. 2026/0892',
    ico: '36 712 345',
    date: '14. 6. 2026',
    due: '28. 6. 2026',
    base: '1 240,00 €',
    vat: '285,20 €',
    total: '1 525,20 €',
    items: [['Drevené hranoly 100×100', '820,00 €'], ['OSB dosky 18mm', '420,00 €']] as [string, string][],
  },
  {
    logo: 'Telekom Slovakia a.s.',
    addr: 'Bajkalská 28, 817 62 Bratislava',
    num: 'č. 2026/14872',
    ico: '35 763 469',
    date: '1. 6. 2026',
    due: '15. 6. 2026',
    base: '115,77 €',
    vat: '26,63 €',
    total: '142,40 €',
    items: [['Mobilný program Biznis', '89,00 €'], ['Dátový balík 50GB', '26,77 €']] as [string, string][],
  },
]

const selectedIdx = ref(0)
const inv = computed(() => SAMPLES[selectedIdx.value])

type Status = 'idle' | 'processing' | 'done'
const status = ref<Status>('idle')
const isScanning = ref(false)
const revealCount = ref(0)
const flashIdx = ref<number | null>(null)

const timers: ReturnType<typeof setTimeout>[] = []

const FIELDS = [
  { labelKey: 'demos.invoice.f_supplier', valueKey: 'logo'  as const },
  { labelKey: 'demos.invoice.f_ico',      valueKey: 'ico'   as const },
  { labelKey: 'demos.invoice.f_date',     valueKey: 'date'  as const },
  { labelKey: 'demos.invoice.f_base',     valueKey: 'base'  as const, mono: true },
  { labelKey: 'demos.invoice.f_vat',      valueKey: 'vat'   as const, mono: true },
  { labelKey: 'demos.invoice.f_total',    valueKey: 'total' as const, mono: true, accent: true },
  { labelKey: 'demos.invoice.f_due',      valueKey: 'due'   as const },
]

function clearTimers() {
  timers.forEach(clearTimeout)
  timers.length = 0
}

function reset() {
  clearTimers()
  status.value = 'idle'
  isScanning.value = false
  revealCount.value = 0
  flashIdx.value = null
}

function selectSample(idx: number) {
  if (status.value !== 'idle') reset()
  selectedIdx.value = idx
}

function process() {
  if (status.value !== 'idle') return
  status.value = 'processing'

  if (prefersReducedMotion.value) {
    revealCount.value = FIELDS.length
    status.value = 'done'
    return
  }

  isScanning.value = true
  timers.push(setTimeout(() => {
    isScanning.value = false
    FIELDS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        revealCount.value = i + 1
        flashIdx.value = i
        timers.push(setTimeout(() => {
          flashIdx.value = null
          if (i === FIELDS.length - 1) status.value = 'done'
        }, 350))
      }, i * 380))
    })
  }, 1100))
}

onUnmounted(clearTimers)
</script>

<template>
  <div class="inv-demo">

    <!-- Demo header: title left, A/B switcher right -->
    <div class="inv-top">
      <div class="inv-title-row">
        <Icon name="tabler:table-import" class="inv-title-icon" aria-hidden="true" />
        <span class="inv-title">{{ t('demos.invoice.title') }}</span>
      </div>
      <div class="inv-switcher" role="group" :aria-label="t('demos.invoice.title')">
        <button
          v-for="(_, i) in SAMPLES"
          :key="i"
          class="inv-sample-btn"
          :class="{ 'is-active': selectedIdx === i }"
          :aria-pressed="selectedIdx === i"
          @click="selectSample(i)"
        >
          {{ i === 0 ? t('demos.invoice.sample_a') : t('demos.invoice.sample_b') }}
        </button>
      </div>
    </div>

    <!-- 2-column body -->
    <div class="inv-body">

      <!-- Left: invoice paper (decorative — same info in panel) -->
      <div class="inv-preview-col" aria-hidden="true">
        <div class="inv-paper">

          <!-- Paper header: company left, FAKTÚRA label right -->
          <div class="inv-paper-top">
            <div class="inv-paper-company">
              <p class="inv-cname">{{ inv.logo }}</p>
              <p class="inv-caddr">{{ inv.addr }}</p>
            </div>
            <div class="inv-paper-label">
              <p class="inv-faktura-label">FAKTÚRA</p>
              <p class="inv-num">{{ inv.num }}</p>
            </div>
          </div>

          <hr class="inv-hr" />

          <!-- Meta rows: IČO, dátum, splatnosť -->
          <div class="inv-meta">
            <div class="inv-meta-row">
              <span class="inv-meta-lbl">IČO:</span>
              <span class="inv-meta-val">{{ inv.ico }}</span>
            </div>
            <div class="inv-meta-row">
              <span class="inv-meta-lbl">Dátum vystavenia:</span>
              <span class="inv-meta-val">{{ inv.date }}</span>
            </div>
            <div class="inv-meta-row">
              <span class="inv-meta-lbl">Splatnosť:</span>
              <span class="inv-meta-val">{{ inv.due }}</span>
            </div>
          </div>

          <hr class="inv-hr" />

          <!-- Items table -->
          <table class="inv-items-tbl">
            <thead>
              <tr>
                <th class="inv-th">Položka</th>
                <th class="inv-th inv-th-r">Suma</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="([name, price], j) in inv.items" :key="j">
                <td class="inv-td">{{ name }}</td>
                <td class="inv-td inv-price">{{ price }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Totals -->
          <div class="inv-totals">
            <div class="inv-total-row">
              <span>Základ DPH:</span>
              <span class="inv-total-val">{{ inv.base }}</span>
            </div>
            <div class="inv-total-row">
              <span>DPH 23 %:</span>
              <span class="inv-total-val">{{ inv.vat }}</span>
            </div>
            <div class="inv-total-row inv-grand">
              <span>Spolu:</span>
              <span class="inv-total-val">{{ inv.total }}</span>
            </div>
          </div>

          <!-- Scan overlay -->
          <div class="inv-scan" :class="{ 'is-scanning': isScanning }" aria-hidden="true" />
        </div>
      </div>

      <!-- Right: extraction panel -->
      <div class="inv-panel" role="region" :aria-label="t('demos.invoice.out_caption')">
        <div class="inv-panel-hdr">
          <span class="inv-panel-caption">{{ t('demos.invoice.out_caption') }}</span>
          <span class="inv-badge" :class="`badge-${status}`">
            <Icon v-if="status === 'processing'" name="tabler:loader-2" class="icon-spin" aria-hidden="true" />
            <Icon v-else-if="status === 'done'" name="tabler:check" aria-hidden="true" />
            <span>{{
              status === 'idle'       ? t('demos.invoice.status_wait')
              : status === 'processing' ? t('demos.invoice.status_proc')
              : t('demos.invoice.status_done')
            }}</span>
          </span>
        </div>

        <p v-if="status === 'idle'" class="inv-empty">{{ t('demos.invoice.empty') }}</p>

        <div v-else class="inv-fields" aria-live="polite">
          <div
            v-for="(field, i) in FIELDS"
            v-show="i < revealCount"
            :key="field.valueKey"
            class="inv-field-row"
            :class="{ 'is-flash': flashIdx === i }"
          >
            <span class="inv-field-lbl">{{ t(field.labelKey) }}</span>
            <span class="inv-field-val" :class="{ mono: field.mono, 'is-accent': (field as any).accent }">
              {{ inv[field.valueKey] }}
            </span>
          </div>

          <div v-if="status === 'done'" class="inv-result">
            <Icon name="tabler:circle-check" aria-hidden="true" />
            {{ t('demos.invoice.result') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="inv-actions">
      <button class="inv-btn-primary" :disabled="status !== 'idle'" @click="process">
        <Icon v-if="status === 'processing'" name="tabler:loader-2" class="icon-spin" aria-hidden="true" />
        <Icon v-else-if="status === 'done'" name="tabler:check" aria-hidden="true" />
        {{
          status === 'idle'       ? t('demos.invoice.run')
          : status === 'processing' ? t('demos.invoice.running')
          : t('demos.invoice.done')
        }}
      </button>
      <button v-if="status !== 'idle'" class="inv-btn-ghost" @click="reset">
        {{ t('demos.btn_reset') }}
      </button>
    </div>

    <p class="demo-note">{{ t('demos.sample_note') }}</p>
  </div>
</template>

<style scoped>
.inv-demo {
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  background: var(--color-surface-2);
  box-shadow: var(--hairline-top);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Top row: title + switcher */
.inv-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.inv-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.inv-title-icon {
  color: var(--color-accent);
  font-size: 1.1rem;
  flex-shrink: 0;
}
.inv-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
}
.inv-switcher { display: flex; gap: 0.5rem; }
.inv-sample-btn {
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-surface-1);
  color: var(--color-text-muted);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.inv-sample-btn:hover { color: var(--color-text); border-color: var(--color-accent-border); }
.inv-sample-btn.is-active {
  background: var(--color-accent-soft);
  border-color: var(--color-accent-border);
  color: var(--color-accent);
}
.inv-sample-btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

/* 2-column body */
.inv-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: start;
}
@media (max-width: 40rem) {
  .inv-body { grid-template-columns: 1fr; }
}

/* Invoice paper */
.inv-preview-col { position: relative; }
.inv-paper {
  position: relative;
  background: #fff;
  color: #1a1a1a;
  border-radius: var(--r-md);
  box-shadow: 0 2px 12px rgba(0,0,0,.12);
  padding: 1.1rem 1.25rem;
  font-size: 0.8rem;
  overflow: hidden;
  line-height: 1.4;
}

/* Paper header: company (left) + FAKTÚRA (right) */
.inv-paper-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.inv-paper-company { flex: 1; min-width: 0; }
.inv-cname { font-weight: 700; font-size: 0.875rem; margin: 0 0 0.2rem; }
.inv-caddr { margin: 0; color: #666; font-size: 0.725rem; line-height: 1.4; }
.inv-paper-label { text-align: right; flex-shrink: 0; }
.inv-faktura-label { font-weight: 700; font-size: 0.8rem; letter-spacing: 0.05em; margin: 0 0 0.15rem; }
.inv-num { font-family: var(--font-mono); font-size: 0.7rem; color: #666; margin: 0; white-space: nowrap; }

.inv-hr { border: none; border-top: 1px solid #e5e5e5; margin: 0.6rem 0; }

/* Meta rows */
.inv-meta { display: flex; flex-direction: column; gap: 0.2rem; margin-bottom: 0.25rem; }
.inv-meta-row { display: flex; justify-content: space-between; gap: 0.5rem; font-size: 0.75rem; }
.inv-meta-lbl { color: #888; }
.inv-meta-val { font-family: var(--font-mono); color: #1a1a1a; white-space: nowrap; }

/* Items table */
.inv-items-tbl { width: 100%; border-collapse: collapse; margin: 0.4rem 0; }
.inv-th { font-size: 0.7rem; color: #888; font-weight: 500; padding: 0 0 0.3rem; text-align: left; }
.inv-th-r { text-align: right; }
.inv-td { padding: 0.2rem 0; font-size: 0.775rem; vertical-align: top; }
.inv-price { text-align: right; font-family: var(--font-mono); white-space: nowrap; }

/* Totals */
.inv-totals {
  border-top: 1px solid #e5e5e5;
  padding-top: 0.45rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.inv-total-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #666;
}
.inv-total-val { font-family: var(--font-mono); white-space: nowrap; }
.inv-grand {
  font-weight: 700;
  color: #1a1a1a;
  font-size: 0.875rem;
  padding-top: 0.3rem;
  border-top: 1px solid #ccc;
  margin-top: 0.15rem;
}

/* Scan overlay */
.inv-scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--color-accent-soft) 43%,
    var(--color-accent-border) 50%,
    var(--color-accent-soft) 57%,
    transparent 100%
  );
  transform: translateY(-110%);
  pointer-events: none;
  opacity: 0.7;
}
.inv-scan.is-scanning {
  transform: translateY(110%);
  transition: transform 1.1s linear;
}

/* Extraction panel */
.inv-panel {
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-surface-1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 14rem;
}
.inv-panel-hdr { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.inv-panel-caption { font-size: var(--fs-xs); font-weight: var(--fw-semibold); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: var(--tracking-wide); }

/* Badge */
.inv-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  padding: 0.2rem 0.55rem;
  border-radius: var(--r-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface-2);
  color: var(--color-text-subtle);
  white-space: nowrap;
}
.badge-processing {
  border-color: var(--color-accent-border);
  background: var(--color-accent-soft);
  color: var(--color-accent);
}
.badge-done {
  border-color: var(--color-success, #16a34a);
  background: var(--color-success-soft, #dcfce7);
  color: var(--color-success, #16a34a);
}

.inv-empty { font-size: 0.875rem; color: var(--color-text-subtle); margin: 0; line-height: 1.55; }

/* Fields */
.inv-fields { display: flex; flex-direction: column; gap: 0.35rem; }
.inv-field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.6rem;
  border-radius: var(--r-sm);
  border: 1px solid transparent;
  transition: border-color 0.2s;
}
.inv-field-row.is-flash {
  border-color: var(--color-accent-border);
  animation: field-flash 0.4s ease;
}
@keyframes field-flash {
  0%, 100% { background: transparent; }
  40%       { background: var(--color-accent-soft); }
}
.inv-field-lbl {
  font-size: var(--fs-xs);
  color: var(--color-text-muted);
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
.inv-field-val {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: right;
  white-space: nowrap;
}
.inv-field-val.mono { font-family: var(--font-mono); }
.inv-field-val.is-accent { color: var(--color-accent); }

/* Result strip */
.inv-result {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.25rem;
  padding: 0.65rem 0.85rem;
  border-radius: var(--r-sm);
  background: var(--color-success-soft, #dcfce7);
  color: var(--color-success, #16a34a);
  font-size: 0.875rem;
  font-weight: 500;
}

/* Actions */
.inv-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.inv-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.1rem;
  background: var(--gradient-accent, var(--color-accent-strong));
  color: #fff;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
  font-size: 0.95rem;
  font-weight: var(--fw-semibold);
  cursor: pointer;
  box-shadow: var(--sh-md);
  transition: transform 0.15s ease, filter 0.15s ease;
}
.inv-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; }
.inv-btn-primary:not(:disabled):hover { filter: brightness(1.08); transform: translateY(-1px); }
.inv-btn-primary:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }

.inv-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.1rem;
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  font-size: 0.95rem;
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.inv-btn-ghost:hover { border-color: var(--color-accent); color: var(--color-accent); }
.inv-btn-ghost:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }

.icon-spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.demo-note {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-subtle);
  margin: 0;
}
</style>
