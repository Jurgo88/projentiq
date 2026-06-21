<script setup lang="ts">
const { t, locale } = useI18n()

const localeMap: Record<string, string> = { sk: 'sk-SK', cs: 'cs-CZ', en: 'en-US' }

function formatPrice(value: number) {
  return value.toLocaleString(localeMap[locale.value] ?? 'sk-SK')
}

// TODO: placeholder jednorazové ceny za nasadenie (copy spec časť 5) —
// potvrdiť reálne sumy aj menu pre CS trh (€ vs Kč) pred spustením.
const cards = [
  { id: 1, flagship: true, price: 2000 },
  { id: 2, flagship: false, price: 4000 },
  { id: 3, flagship: false, price: 8000 }
]
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
          <h3>{{ t(`products.card_${card.id}_title`) }}</h3>
          <p class="products__desc">{{ t(`products.card_${card.id}_desc`) }}</p>
          <p class="products__examples">{{ t(`products.card_${card.id}_examples`) }}</p>
          <p class="products__price">
            {{ t('products.price_from') }} <strong>{{ formatPrice(card.price) }} {{ t('products.price_currency') }}</strong>
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding: 4rem 1.5rem;
}

.products__inner {
  max-width: 72rem;
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
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.75rem;
}

.products__card.is-flagship {
  border-color: var(--color-accent);
}

.products__badge {
  align-self: flex-start;
  margin: 0 0 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--color-accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.products__card h3 {
  margin: 0 0 0.6rem;
  font-size: 1.15rem;
}

.products__desc {
  margin: 0 0 0.75rem;
  font-size: 0.92rem;
}

.products__examples {
  margin: 0 0 0.75rem;
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.products__price {
  margin: auto 0 0;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.95rem;
}

.products__price strong {
  font-size: 1.2rem;
  color: var(--color-accent);
}

@media (max-width: 56rem) {
  .products__grid {
    grid-template-columns: 1fr;
  }
}
</style>
