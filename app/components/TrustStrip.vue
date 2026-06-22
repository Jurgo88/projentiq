<script setup lang="ts">
const { t } = useI18n()

const items = [
  { id: 1, icon: 'tabler:plug-connected' },
  { id: 2, icon: 'tabler:lock' },
  { id: 3, icon: 'tabler:presentation' },
  { id: 4, icon: 'tabler:world' },
  { id: 5, icon: 'tabler:clock' }
]
</script>

<template>
  <section class="trust-strip">
    <ul class="trust-strip__list">
      <li v-for="item in items" :key="item.id" class="trust-strip__item">
        <Icon :name="item.icon" class="trust-strip__icon" />
        {{ t(`trust_strip.item_${item.id}`) }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.trust-strip {
  padding: 1.25rem 1.5rem;
  background: var(--color-surface-1);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.trust-strip__list {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 2rem;
}

.trust-strip__item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-weight: var(--fw-medium);
  white-space: nowrap;
}

.trust-strip__icon {
  width: 16px;
  height: 16px;
  color: var(--color-accent);
  flex-shrink: 0;
}
</style>
