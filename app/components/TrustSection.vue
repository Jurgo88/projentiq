<script setup lang="ts">
const { t } = useI18n()
const { target, pending } = useReveal()

const whyItems = [
  { id: 1, icon: 'tabler:database' },
  { id: 2, icon: 'tabler:adjustments' },
  { id: 3, icon: 'tabler:eye-check' },
  { id: 4, icon: 'tabler:plug-connected' }
]
</script>

<template>
  <section id="approach" class="trust-section">
    <div ref="target" class="trust-section__inner reveal" :class="{ 'reveal--pending': pending }">
      <h2>{{ t('trust_section.title') }}</h2>
      <p>{{ t('trust_section.p1') }}</p>
      <p>{{ t('trust_section.p2') }}</p>
      <p>{{ t('trust_section.p3') }}</p>
      <p>{{ t('trust_section.p4') }}</p>

      <ul class="trust-section__why">
        <li v-for="item in whyItems" :key="item.id" class="trust-section__why-item">
          <span class="trust-section__why-icon">
            <Icon :name="item.icon" aria-hidden="true" />
          </span>
          <h3>{{ t(`why.item_${item.id}_title`) }}</h3>
          <p>{{ t(`why.item_${item.id}_desc`) }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.trust-section {
  padding: calc(var(--section-y) * 1.1) 1.5rem;
  background: var(--color-surface-2);
}

.trust-section__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.trust-section__inner > h2,
.trust-section__inner > p {
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.trust-section h2 {
  font-size: clamp(1.75rem, 3.5vw, 2.4rem);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 1.75rem;
}

.trust-section__inner > p {
  margin: 0 0 0.85rem;
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: var(--lh-base);
}

.trust-section__why {
  list-style: none;
  margin: 3rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.trust-section__why-item {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  padding: 1.5rem;
}

.trust-section__why-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 0.85rem;
  border-radius: var(--r-md);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 22px;
}

.trust-section__why-item h3 {
  font-size: 1rem;
  margin: 0 0 0.4rem;
}

.trust-section__why-item p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.92rem;
  text-align: left;
}

@media (max-width: 56rem) {
  .trust-section__why {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 36rem) {
  .trust-section__why {
    grid-template-columns: 1fr;
  }
}
</style>
