<script setup lang="ts">
const { t } = useI18n()

const steps = [
  { id: 1, icon: 'tabler:search' },
  { id: 2, icon: 'tabler:bulb' },
  { id: 3, icon: 'tabler:rocket' },
  { id: 4, icon: 'tabler:trending-up' }
]
</script>

<template>
  <section id="how-it-works" class="how-it-works">
    <div class="how-it-works__inner">
      <h2>{{ t('how_it_works.title') }}</h2>

      <ol class="how-it-works__list">
        <li v-for="step in steps" :key="step.id" class="how-it-works__step">
          <span class="how-it-works__token" aria-hidden="true">
            <Icon :name="step.icon" class="how-it-works__icon" />
            <span class="how-it-works__number">{{ step.id }}</span>
          </span>
          <h3>{{ t(`how_it_works.step_${step.id}_title`) }}</h3>
          <p>{{ t(`how_it_works.step_${step.id}_desc`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.how-it-works {
  padding: var(--section-y) 1.5rem;
  background: var(--color-bg);
}

.how-it-works__inner {
  max-width: var(--container);
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
  position: relative;
}

.how-it-works__token {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--r-md);
  background: var(--color-accent-soft);
  margin-bottom: 1rem;
}

.how-it-works__icon {
  width: 22px;
  height: 22px;
  color: var(--color-accent);
}

.how-it-works__number {
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: var(--color-accent-strong);
  color: #fff;
  font-size: 0.65rem;
  font-weight: var(--fw-bold);
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

@media (min-width: 56.01rem) {
  .how-it-works__step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 1.5rem;
    left: 3rem;
    right: -1.5rem;
    border-top: 2px dashed var(--color-border-strong);
  }
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
