<script setup lang="ts">
const { t } = useI18n()

const items = [1, 2, 3, 4, 5]
</script>

<template>
  <section id="faq" class="faq">
    <div class="faq__inner">
      <h2>{{ t('faq.title') }}</h2>

      <div class="faq__list">
        <details v-for="item in items" :key="item" class="faq__item">
          <summary>{{ t(`faq.q${item}`) }}</summary>
          <p>{{ t(`faq.a${item}`) }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  padding: 4rem 1.5rem;
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
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq__item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 1rem 1.25rem;
}

.faq__item summary {
  cursor: pointer;
  font-weight: 600;
  list-style: none;
}

.faq__item summary::-webkit-details-marker {
  display: none;
}

.faq__item summary::before {
  content: '+';
  display: inline-block;
  width: 1rem;
  color: var(--color-accent);
  font-weight: 700;
}

.faq__item[open] summary::before {
  content: '−';
}

.faq__item p {
  margin: 0.75rem 0 0;
  padding-left: 1rem;
  color: var(--color-text-muted);
  font-size: 0.92rem;
}
</style>
