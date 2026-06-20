<script setup lang="ts">
const { t } = useI18n()

const steps = [1, 2, 3, 4]
</script>

<template>
  <section id="how-it-works" class="how-it-works">
    <div class="how-it-works__inner">
      <h2>{{ t('how_it_works.title') }}</h2>

      <ol class="how-it-works__list">
        <li v-for="step in steps" :key="step" class="how-it-works__step">
          <span class="how-it-works__number" aria-hidden="true">{{ step }}</span>
          <h3>{{ t(`how_it_works.step_${step}_title`) }}</h3>
          <p>{{ t(`how_it_works.step_${step}_desc`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.how-it-works {
  padding: 4rem 1.5rem;
}

.how-it-works__inner {
  max-width: 72rem;
  margin: 0 auto;
}

.how-it-works h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 2rem;
}

.how-it-works__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.how-it-works__step {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
}

.how-it-works__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--color-accent);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.how-it-works__step h3 {
  font-size: 1.05rem;
  margin: 0 0 0.5rem;
}

.how-it-works__step p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

@media (max-width: 56rem) {
  .how-it-works__list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 32rem) {
  .how-it-works__list {
    grid-template-columns: 1fr;
  }
}
</style>
