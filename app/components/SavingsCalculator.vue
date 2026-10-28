<script setup lang="ts">
// Kalkulačka nákladov na ručný prepis faktúr (#60). Ukazuje len to, čo dnes
// stojí ručná práca z čísel, ktoré zadá návštevník — žiadne sľúbené percento
// úspory (docs/blog/guide.md: čísla bez zdroja nepíšeme). Koľko z toho
// automatizácia ušetrí, overí pilot.
const { t, locale } = useI18n()

// vzorové hodnoty, návštevník ich prepíše
const invoices = ref(100)
const minutes = ref(5)
const hourly = ref(20)

const localeMap: Record<string, string> = { sk: 'sk-SK', cs: 'cs-CZ', en: 'en-US' }
const format = (value: number, digits = 0) =>
  value.toLocaleString(localeMap[locale.value] ?? 'sk-SK', { maximumFractionDigits: digits })
// „167 €“ v sk/cs, „€167“ v en
const formatEur = (value: number) =>
  value.toLocaleString(localeMap[locale.value] ?? 'sk-SK', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  })

// prázdne alebo záporné pole počíta ako 0
const positive = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0)

const hours = computed(() => (positive(invoices.value) * positive(minutes.value)) / 60)
const monthlyCost = computed(() => hours.value * positive(hourly.value))

// predvyplní správu v kontaktnom formulári (ContactForm číta ten istý stav)
const prefill = useState<string>('contact-prefill', () => '')
function prefillContact() {
  prefill.value = t('calculator.prefill', {
    invoices: format(positive(invoices.value)),
    minutes: format(positive(minutes.value), 1)
  })
}
</script>

<template>
  <div class="calc">
    <div class="calc__inputs">
      <label class="calc__field">
        <span>{{ t('calculator.invoices') }}</span>
        <input v-model.number="invoices" type="number" min="0" step="1" inputmode="numeric" />
      </label>
      <label class="calc__field">
        <span>{{ t('calculator.minutes') }}</span>
        <input v-model.number="minutes" type="number" min="0" step="0.5" inputmode="decimal" />
      </label>
      <label class="calc__field">
        <span>{{ t('calculator.hourly') }}</span>
        <input v-model.number="hourly" type="number" min="0" step="1" inputmode="decimal" />
      </label>
    </div>

    <dl class="calc__results" aria-live="polite">
      <div>
        <dt>{{ t('calculator.result_hours') }}</dt>
        <dd>{{ t('calculator.hours_value', { n: format(hours, 1) }) }}</dd>
      </div>
      <div>
        <dt>{{ t('calculator.result_month') }}</dt>
        <dd>{{ formatEur(monthlyCost) }}</dd>
      </div>
      <div>
        <dt>{{ t('calculator.result_year') }}</dt>
        <dd>{{ formatEur(monthlyCost * 12) }}</dd>
      </div>
    </dl>

    <div class="calc__footer">
      <a href="#demo" class="btn-primary" @click="prefillContact">{{ t('calculator.cta') }}</a>
      <p class="calc__note">{{ t('calculator.note') }}</p>
    </div>
  </div>
</template>

<style scoped>
.calc {
  padding: 1.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  background: var(--color-surface-1);
}

.calc__inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  gap: 1rem;
}

.calc__field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: var(--fw-semibold);
}

.calc__field input {
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  background: var(--color-surface-2);
  color: var(--color-text);
  font: inherit;
  font-weight: var(--fw-regular);
  font-size: var(--fs-md);
}

.calc__field input:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 1px;
}

.calc__results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));
  gap: 1rem;
  margin: 1.5rem 0 0;
}

.calc__results div {
  padding: 1rem 1.1rem;
  border: 1px solid var(--color-accent-border);
  border-radius: var(--r-md);
  background: var(--color-accent-soft);
}

.calc__results dt {
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.calc__results dd {
  margin: 0.25rem 0 0;
  font-size: var(--fs-xl);
  font-weight: var(--fw-bold);
}

.calc__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: 1.5rem;
}

.calc__note {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}
</style>
