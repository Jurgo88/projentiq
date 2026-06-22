<script setup lang="ts">
const { t } = useI18n()
const { target, pending } = useReveal()

const items = [
  { id: 1, icon: 'tabler:database' },
  { id: 2, icon: 'tabler:adjustments' },
  { id: 3, icon: 'tabler:eye-check' },
  { id: 4, icon: 'tabler:plug-connected' }
]
</script>

<template>
  <section id="why" class="why">
    <div ref="target" class="why__inner reveal" :class="{ 'reveal--pending': pending }">
      <h2>{{ t('why.title') }}</h2>

      <ul class="why__list">
        <li v-for="item in items" :key="item.id" class="why__item">
          <span class="why__icon">
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
.why {
  padding: var(--section-y) 1.5rem;
  background: var(--color-bg);
}

.why__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.why h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 2rem;
}

.why__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
}

.why__icon {
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

.why__item h3 {
  font-size: 1.05rem;
  margin: 0 0 0.4rem;
}

.why__item p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.92rem;
}

@media (max-width: 40rem) {
  .why__list {
    grid-template-columns: 1fr;
  }
}
</style>
