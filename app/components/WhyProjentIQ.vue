<script setup lang="ts">
const { t } = useI18n()

const items = [1, 2, 3, 4]
</script>

<template>
  <section id="why" class="why">
    <div class="why__inner">
      <h2>{{ t('why.title') }}</h2>

      <ul class="why__list">
        <li v-for="item in items" :key="item" class="why__item">
          <h3>{{ t(`why.item_${item}_title`) }}</h3>
          <p>{{ t(`why.item_${item}_desc`) }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.why {
  padding: 4rem 1.5rem;
}

.why__inner {
  max-width: 72rem;
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
