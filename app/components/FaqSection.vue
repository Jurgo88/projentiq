<script setup lang="ts">
const { t } = useI18n()

const items = [1, 2, 3, 4]
</script>

<template>
  <section id="faq" class="faq">
    <div class="faq__inner">
      <h2>{{ t('faq.title') }}</h2>

      <div class="faq__list">
        <details v-for="item in items" :key="item" class="faq__item" :open="item === 1">
          <summary>
            {{ t(`faq.q${item}`) }}
            <Icon name="tabler:chevron-down" class="faq__chevron" aria-hidden="true" />
          </summary>
          <div class="faq__content">
            <p>{{ t(`faq.a${item}`) }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  padding: var(--section-y) 1.5rem;
  background: var(--color-surface-1);
}

.faq__inner {
  max-width: 48rem;
  margin: 0 auto;
}

.faq h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 2rem;
}

.faq__list {
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--color-surface-2);
}

.faq__item {
  display: grid;
  grid-template-rows: auto 0fr;
  border-bottom: 1px solid var(--color-border);
  transition: grid-template-rows 0.25s ease;
}

.faq__item:last-child {
  border-bottom: none;
}

.faq__item[open] {
  grid-template-rows: auto 1fr;
}

.faq__item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  cursor: pointer;
  font-weight: var(--fw-semibold);
  list-style: none;
}

.faq__item summary::-webkit-details-marker {
  display: none;
}

.faq__chevron {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-accent);
  transition: transform 0.25s ease;
}

.faq__item[open] .faq__chevron {
  transform: rotate(180deg);
}

.faq__content {
  overflow: hidden;
  min-height: 0;
}

.faq__content p {
  margin: 0;
  padding: 0 1.25rem 1.1rem;
  color: var(--color-text-muted);
  font-size: 0.92rem;
}
</style>
