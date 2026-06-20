<script setup lang="ts">
const { t } = useI18n()

const panelItems = [
  { docKey: 'hero.panel.doc_invoice', vendor: 'Veľkoobchod Drevo s.r.o.', amount: '1 240,00 €', statusKey: 'hero.panel.status_done' },
  { docKey: 'hero.panel.doc_delivery', vendor: 'Stavebniny Krajná', amount: '—', statusKey: 'hero.panel.status_review' },
  { docKey: 'hero.panel.doc_invoice', vendor: 'IT Servis Plus', amount: '345,50 €', statusKey: 'hero.panel.status_done' }
]
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero__inner">
      <div class="hero__copy">
        <h1>{{ t('hero.title') }}</h1>
        <p>{{ t('hero.lead') }}</p>
        <div class="hero__cta">
          <a href="#demo" class="btn-primary">{{ t('nav.cta_demo') }}</a>
          <a href="#kontakt" class="btn-secondary">{{ t('hero.cta_contact') }}</a>
        </div>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="hero-panel">
          <p class="hero-panel__caption">{{ t('hero.panel_caption') }}</p>
          <ul class="hero-panel__list">
            <li v-for="(item, i) in panelItems" :key="i" class="hero-panel__row">
              <span class="hero-panel__doc">{{ t(item.docKey) }}</span>
              <span class="hero-panel__vendor">{{ item.vendor }}</span>
              <span class="hero-panel__amount">{{ item.amount }}</span>
              <span
                class="hero-panel__status"
                :class="{ 'is-review': item.statusKey.endsWith('status_review') }"
              >{{ t(item.statusKey) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 4rem 1.5rem;
}

.hero__inner {
  max-width: 72rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero__copy h1 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1.15;
  margin: 0 0 1.25rem;
}

.hero__copy p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  margin: 0 0 1.75rem;
  max-width: 38rem;
}

.hero__cta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.hero-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
}

.hero-panel__caption {
  margin: 0 0 1rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.hero-panel__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.hero-panel__row {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.85rem;
}

.hero-panel__doc {
  color: var(--color-text-muted);
  white-space: nowrap;
}

.hero-panel__vendor {
  font-weight: 600;
}

.hero-panel__amount {
  white-space: nowrap;
}

.hero-panel__status {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-accent);
  white-space: nowrap;
}

.hero-panel__status.is-review {
  color: var(--color-text-muted);
}

@media (max-width: 56rem) {
  .hero__inner {
    grid-template-columns: 1fr;
  }

  .hero-panel__row {
    grid-template-columns: auto 1fr;
    row-gap: 0.25rem;
  }
}
</style>
