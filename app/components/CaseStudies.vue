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
  <section v-if="cards.length" id="case-studies" class="case-studies">
    <div ref="target" class="case-studies__inner reveal" :class="{ 'reveal--pending': pending }">
      <h2>{{ t('case_studies.section_title') }}</h2>

      <ul class="case-studies__list">
        <li v-for="card in cards" :key="card.slug">
          <NuxtLink
            :to="localePath({ name: 'case-studies-slug', params: { slug: card.slug } })"
            class="case-studies__card"
          >
            <span class="case-studies__icon">
              <Icon :name="card.icon" aria-hidden="true" />
            </span>
            <p class="case-studies__eyebrow">{{ t('case_studies.eyebrow') }}</p>
            <h3>{{ card.content.title }}</h3>
            <p class="case-studies__lead">{{ card.content.cardLead }}</p>
            <span class="case-studies__more">
              {{ t('case_studies.read_more') }}
              <Icon name="tabler:arrow-right" aria-hidden="true" />
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.case-studies {
  padding: var(--section-y) 1.5rem;
  background: var(--color-bg);
}

.case-studies__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.case-studies h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 2rem;
}

.case-studies__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
  gap: 1.5rem;
}

.case-studies__list > li:only-child {
  max-width: 44rem;
}

.case-studies__card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-surface-1);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.case-studies__card:hover {
  border-color: var(--color-accent-border);
  transform: translateY(-2px);
}

.case-studies__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--r-md);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.case-studies__eyebrow {
  margin: 0 0 0.35rem;
  color: var(--color-accent);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.case-studies__card h3 {
  font-size: 1.2rem;
  margin: 0 0 0.75rem;
}

.case-studies__lead {
  margin: 0 0 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: var(--lh-base);
}

.case-studies__more {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-accent);
  font-weight: var(--fw-semibold);
  font-size: 0.95rem;
}

@media (prefers-reduced-motion: reduce) {
  .case-studies__card {
    transition: none;
  }

  .case-studies__card:hover {
    transform: none;
  }
}
</style>
