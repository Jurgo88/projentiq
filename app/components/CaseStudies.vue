<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { target, pending } = useReveal()

const cards = computed(() =>
  CASE_STUDIES.map((study) => ({
    slug: study.slug,
    icon: study.icon,
    content: study.content[locale.value as CaseStudyLocale] ?? study.content.en
  }))
)
</script>

<template>
  <section v-if="cards.length" id="case-studies" class="case-studies" aria-labelledby="case-studies-title">
    <div ref="target" class="case-studies__inner reveal" :class="{ 'reveal--pending': pending }">
      <div class="case-studies__header">
        <h2 id="case-studies-title">{{ t('case_studies.section_title') }}</h2>
        <p class="case-studies__intro">{{ t('case_studies.section_lead') }}</p>
      </div>

      <ul class="case-studies__list">
        <li v-for="card in cards" :key="card.slug">
          <article class="case-studies__card">
            <div class="case-studies__text">
              <p class="case-studies__eyebrow">
                <Icon :name="card.icon" aria-hidden="true" />
                {{ t('case_studies.eyebrow') }}
              </p>
              <h3>
                <!-- ::after roztiahne odkaz na celú kartu, čítačka prečíta len nadpis -->
                <NuxtLink
                  :to="localePath({ name: 'case-studies-slug', params: { slug: card.slug } })"
                  class="case-studies__link"
                >
                  {{ card.content.title }}
                </NuxtLink>
              </h3>
              <p class="case-studies__lead">{{ card.content.cardLead }}</p>
              <span class="case-studies__more" aria-hidden="true">
                {{ t('case_studies.read_more') }}
                <Icon name="tabler:arrow-right" />
              </span>
            </div>

            <dl class="case-studies__metrics" :aria-label="t('case_studies.metrics_label')">
              <div v-for="metric in card.content.metrics" :key="metric.label" class="case-studies__metric">
                <dt>{{ metric.label }}</dt>
                <dd>{{ metric.value }}</dd>
              </div>
            </dl>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.case-studies {
  padding: var(--section-y) 1.5rem;
  background: var(--color-surface-1);
}

.case-studies__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.case-studies__header {
  max-width: 44rem;
  margin-bottom: 2rem;
}

.case-studies h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 0.75rem;
}

.case-studies__intro {
  margin: 0;
  color: var(--color-text-muted);
  line-height: var(--lh-base);
}

.case-studies__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
}

.case-studies__card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: center;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  background: var(--color-surface-2);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.case-studies__card:hover {
  border-color: var(--color-accent-border);
  box-shadow: var(--sh-glow);
}

.case-studies__card:focus-within {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.case-studies__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.case-studies__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0 0 0.85rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.case-studies__eyebrow :deep(svg) {
  width: 1.15rem;
  height: 1.15rem;
}

.case-studies__card h3 {
  font-size: clamp(1.25rem, 2.2vw, 1.5rem);
  line-height: var(--lh-snug);
  margin: 0 0 0.85rem;
}

.case-studies__link {
  color: inherit;
  text-decoration: none;
}

.case-studies__link:focus-visible {
  outline: none;
}

.case-studies__link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.case-studies__lead {
  margin: 0 0 1.5rem;
  color: var(--color-text-muted);
  line-height: var(--lh-base);
}

.case-studies__more {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-accent);
  font-weight: var(--fw-semibold);
  font-size: 0.95rem;
}

.case-studies__more :deep(svg) {
  transition: transform 0.2s ease;
}

.case-studies__card:hover .case-studies__more :deep(svg) {
  transform: translateX(3px);
}

/* metriky: rovnaký vzhľad ako na podstránke referencie */
.case-studies__metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  margin: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  overflow: hidden;
  background: var(--color-border);
}

.case-studies__metric {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 0.3rem;
  padding: 1.25rem;
  background: var(--color-surface-1);
}

.case-studies__metric dd {
  margin: 0;
  font-size: clamp(1.5rem, 2.6vw, 1.9rem);
  font-weight: var(--fw-bold);
  letter-spacing: var(--tracking-tight);
  line-height: var(--lh-tight);
  color: var(--color-accent);
}

@supports (-webkit-background-clip: text) or (background-clip: text) {
  .case-studies__metric dd {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.case-studies__metric dt {
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  line-height: var(--lh-snug);
}

@media (max-width: 52rem) {
  .case-studies__card {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 24rem) {
  .case-studies__metric {
    padding: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-studies__card,
  .case-studies__more :deep(svg) {
    transition: none;
  }

  .case-studies__card:hover .case-studies__more :deep(svg) {
    transform: none;
  }
}
</style>
