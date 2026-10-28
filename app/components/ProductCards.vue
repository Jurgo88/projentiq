<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { target, pending } = useReveal()

const localeMap: Record<string, string> = { sk: 'sk-SK', cs: 'cs-CZ', en: 'en-US' }

function formatPrice(value: number) {
  return value.toLocaleString(localeMap[locale.value] ?? 'sk-SK')
}

const icons: Record<number, string> = {
  1: 'tabler:robot',
  2: 'tabler:brain',
  3: 'tabler:settings-automation'
}

// poradie a ceny z utils/pricing.ts — vstupný produkt (automatizácia) prvý a zvýraznený
const cards = PRICING.services.map((s, i) => ({ ...s, flagship: i === 0, icon: icons[s.id] }))

function examples(id: number) {
  return t(`products.card_${id}_examples`).split(' · ')
}
</script>

<template>
  <section id="solutions" class="products">
    <div ref="target" class="products__inner reveal" :class="{ 'reveal--pending': pending }">
      <h2>{{ t('products.title') }}</h2>

      <div id="pricing" class="products__grid">
        <article
          v-for="card in cards"
          :id="`solution-${card.id}`"
          :key="card.id"
          class="products__card"
          :class="{ 'is-flagship': card.flagship }"
        >
          <!-- <p v-if="card.flagship" class="products__badge">{{ t('products.flagship_badge') }}</p> -->
          <span class="products__icon">
            <Icon :name="card.icon" aria-hidden="true" />
          </span>
          <h3>{{ t(`products.card_${card.id}_title`) }}</h3>
          <p class="products__desc">{{ t(`products.card_${card.id}_desc`) }}</p>
          <ul class="products__tags">
            <li v-for="item in examples(card.id)" :key="item" class="products__tag">{{ item }}</li>
          </ul>
          <NuxtLink v-if="card.id === 3" :to="localePath('invoice-automation')" class="products__more">
            {{ t('products.card_3_more') }}
            <Icon name="tabler:arrow-right" aria-hidden="true" />
          </NuxtLink>
          <p class="products__price">
            {{ t('products.price_from') }} <strong>{{ formatPrice(card.setup) }} {{ t('products.price_currency') }}</strong>
            <span class="products__monthly">
              {{ t('products.price_or') }} {{ t('products.price_from') }} <strong>{{ formatPrice(card.monthly) }} {{ t('products.price_currency') }}</strong> {{ t('products.price_monthly') }}
            </span>
          </p>
          <a href="#demo" class="products__cta">
            {{ t('nav.cta_demo') }}
          </a>
        </article>
      </div>

      <div class="products__notes">
        <section class="products__pilot" :aria-label="t('products.pilot_title')">
          <div class="products__pilot-content">
            <p class="products__pilot-eyebrow">{{ t('products.pilot_label') }}</p>
            <h3>{{ t('products.pilot_title') }}</h3>
            <p class="products__pilot-desc">{{ t('products.pilot_desc') }}</p>
            <p class="products__pilot-credit">{{ t('products.pilot_credit') }}</p>
          </div>
          <div class="products__pilot-price">
            <!-- <span>{{ t('products.price_fixed') }}</span> -->
            <strong>{{ formatPrice(PRICING.pilot) }} {{ t('products.price_currency') }}</strong>
          </div>
        </section>
        <p class="products__vat">{{ t('products.price_note') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding: var(--section-y) 1.5rem;
  background: var(--color-surface-1);
}

.products__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.products h2 {
  font-size: var(--fs-2xl);
  margin: 0 0 2rem;
}

.products__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.products__card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  padding: 1.75rem;
  box-shadow: var(--hairline-top);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.products__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: var(--r-lg);
  right: var(--r-lg);
  height: 2px;
  background: var(--gradient-accent, var(--color-accent-strong));
  border-radius: var(--r-full);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.products__card:hover {
  transform: translateY(-3px);
  box-shadow: var(--sh-lg), var(--hairline-top);
}

.products__card:hover::before {
  opacity: 1;
}

.products__card.is-flagship {
  border-color: var(--color-accent-border);
  box-shadow: var(--sh-glow), var(--hairline-top);
}

/* .products__badge {
  align-self: flex-start;
  margin: 0 0 1rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--r-full);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
} */

.products__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 1rem;
  border-radius: var(--r-md);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 22px;
}

.products__card h3 {
  margin: 0 0 0.6rem;
  font-size: var(--fs-lg);
}

.products__desc {
  margin: 0 0 1rem;
  font-size: var(--fs-base);
}

.products__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 1.25rem;
  padding: 0;
  list-style: none;
}

.products__tag {
  padding: 0.2rem 0.55rem;
  border-radius: var(--r-full);
  background: var(--color-surface-3);
  color: var(--color-text-muted);
  font-size: var(--fs-xs);
}

.products__more {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: -0.25rem 0 1rem;
  color: var(--color-accent);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  text-decoration: none;
}

.products__more:hover {
  text-decoration: underline;
}

.products__price {
  margin: auto 0 0;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.products__price strong {
  font-size: 1.1rem;
  font-weight: var(--fw-semibold);
  color: var(--color-accent);
}

.products__monthly {
  display: block;
  margin-top: 0.55rem;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.products__monthly strong {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.products__notes {
  margin-top: 3rem;
}

.products__pilot {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 1rem;
  width: 100%;
  margin: 0;
  padding: 1.75rem 2rem;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  box-shadow: var(--hairline-top);
}

.products__pilot-content {
  min-width: 0;
}

.products__pilot-eyebrow {
  margin: 0 0 1.25rem;
  color: var(--color-accent);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: 0.6em;
  text-transform: uppercase;
}

.products__pilot h3 {
  margin: 0 0 0.4rem;
  font-size: var(--fs-lg);
}

.products__pilot-desc,
.products__pilot-credit {
  margin: 0;
  font-size: var(--fs-base);
}

.products__pilot-credit {
  margin-top: 0.4rem;
  color: var(--color-text-muted);
}

.products__pilot-price {
  display: grid;
  gap: 0.15rem;
  justify-items: end;
  white-space: nowrap;
  font-size: var(--fs-xs);
  color: var(--color-text-muted);
}

.products__pilot-price strong {
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 1.15rem;
  font-weight: var(--fw-semibold);
}

.products__vat {
  margin: 1.5rem 0 0;
  color: var(--color-text-muted);
  font-size: var(--fs-xs);
}

.products__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 2.75rem;
  margin-top: 0.85rem;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--color-accent-border);
  border-radius: var(--r-md);
  color: var(--color-accent);
  font-size: var(--fs-base);
  font-weight: var(--fw-semibold);
  text-decoration: none;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.products__cta:hover {
  background: var(--color-accent-soft);
  border-color: var(--color-accent);
}

@media (max-width: 56rem) {
  .products__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 38rem) {
  .products__pilot {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }

  .products__pilot-price {
    justify-items: start;
  }
}
</style>
