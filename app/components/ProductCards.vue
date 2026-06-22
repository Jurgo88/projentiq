<script setup lang="ts">
const { t, locale } = useI18n()

const localeMap: Record<string, string> = { sk: 'sk-SK', cs: 'cs-CZ', en: 'en-US' }

function formatPrice(value: number) {
  return value.toLocaleString(localeMap[locale.value] ?? 'sk-SK')
}

// TODO: placeholder jednorazové ceny za nasadenie (copy spec časť 5) —
// potvrdiť reálne sumy aj menu pre CS trh (€ vs Kč) pred spustením.
const cards = [
  { id: 1, flagship: true, price: 2000, icon: 'tabler:robot' },
  { id: 2, flagship: false, price: 4000, icon: 'tabler:brain' },
  { id: 3, flagship: false, price: 8000, icon: 'tabler:settings-automation' }
]

function examples(id: number) {
  return t(`products.card_${id}_examples`).split(' · ')
}
</script>

<template>
  <section id="solutions" class="products">
    <div class="products__inner">
      <h2>{{ t('products.title') }}</h2>

      <div id="pricing" class="products__grid">
        <article
          v-for="card in cards"
          :key="card.id"
          class="products__card"
          :class="{ 'is-flagship': card.flagship }"
        >
          <p v-if="card.flagship" class="products__badge">{{ t('products.flagship_badge') }}</p>
          <span class="products__icon">
            <Icon :name="card.icon" aria-hidden="true" />
          </span>
          <h3>{{ t(`products.card_${card.id}_title`) }}</h3>
          <p class="products__desc">{{ t(`products.card_${card.id}_desc`) }}</p>
          <ul class="products__tags">
            <li v-for="example in examples(card.id)" :key="example" class="products__tag">{{ example }}</li>
          </ul>
          <p class="products__price">
            {{ t('products.price_from') }} <strong>{{ formatPrice(card.price) }} {{ t('products.price_currency') }}</strong>
          </p>
          <a href="#demo" class="products__cta">
            {{ t('nav.cta_demo') }}
            <Icon name="tabler:arrow-right" aria-hidden="true" />
          </a>
        </article>
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
  font-size: clamp(1.6rem, 3vw, 2.1rem);
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

.products__badge {
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
}

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
  font-size: 1.15rem;
}

.products__desc {
  margin: 0 0 1rem;
  font-size: 0.92rem;
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
  font-size: 0.75rem;
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

.products__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.85rem;
  color: var(--color-accent);
  font-size: 0.9rem;
  font-weight: var(--fw-semibold);
  text-decoration: none;
}

.products__cta :deep(svg) {
  width: 16px;
  height: 16px;
  transition: transform 0.15s ease;
}

.products__cta:hover :deep(svg) {
  transform: translateX(2px);
}

@media (max-width: 56rem) {
  .products__grid {
    grid-template-columns: 1fr;
  }
}
</style>
