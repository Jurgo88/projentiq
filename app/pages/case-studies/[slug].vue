<script setup lang="ts">
defineI18nRoute({
  paths: {
    sk: '/referencie/[slug]',
    cs: '/reference/[slug]',
    en: '/case-studies/[slug]'
  }
})

const route = useRoute()
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()

const study = findCaseStudy(String(route.params.slug))
if (!study) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found', fatal: true })
}

const content = computed(() => study.content[locale.value as CaseStudyLocale] ?? study.content.en)
const homePath = computed(() => localePath('index'))

const SITE_URL = 'https://projentiq.com'
const ORG_ID = `${SITE_URL}/#organization`
const OG_IMAGE = `${SITE_URL}/og-image.png`

const inLanguage = computed(() => {
  const current = locales.value.find((l) => l.code === locale.value)
  return (current && 'language' in current ? current.language : undefined) ?? locale.value
})

const pageTitle = computed(() => `${content.value.title} – ProjentIQ`)

useSeoMeta({
  title: () => pageTitle.value,
  description: () => content.value.lead,
  ogSiteName: 'ProjentIQ',
  ogTitle: () => pageTitle.value,
  ogDescription: () => content.value.lead,
  ogType: 'article',
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => content.value.lead,
  twitterImage: OG_IMAGE
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: content.value.title,
        description: content.value.lead,
        inLanguage: inLanguage.value,
        datePublished: study.datePublished,
        image: OG_IMAGE,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        about: content.value.stack
      })
    }
  ]
}))
</script>

<template>
  <article class="case-study">
    <header class="case-study__hero">
      <div class="case-study__inner">
        <NuxtLink :to="homePath" class="case-study__back">
          <Icon name="tabler:arrow-left" aria-hidden="true" />
          {{ t('case_studies.back') }}
        </NuxtLink>
        <p class="case-study__eyebrow">{{ t('case_studies.eyebrow') }}</p>
        <h1>{{ content.title }}</h1>
        <p class="case-study__lead">{{ content.lead }}</p>
      </div>
    </header>

    <section class="case-study__metrics" :aria-label="t('case_studies.metrics_label')">
      <dl class="case-study__inner case-study__metrics-grid">
        <div v-for="metric in content.metrics" :key="metric.label" class="case-study__metric">
          <dt>{{ metric.label }}</dt>
          <dd>{{ metric.value }}</dd>
        </div>
      </dl>
    </section>

    <div class="case-study__inner case-study__body">
      <section class="case-study__section">
        <h2>{{ t('case_studies.brief_heading') }}</h2>
        <p>{{ content.brief }}</p>
      </section>

      <section class="case-study__section">
        <h2>{{ t('case_studies.delivered_heading') }}</h2>
        <ul class="case-study__delivered">
          <li v-for="item in content.delivered" :key="item.title">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </section>

      <section class="case-study__section">
        <h2>{{ t('case_studies.process_heading') }}</h2>
        <p class="case-study__process-lead">{{ content.processLead }}</p>
        <ol class="case-study__process">
          <li v-for="(step, i) in content.process" :key="step.title" class="case-study__step">
            <span class="case-study__token" aria-hidden="true">
              <Icon :name="study.processIcons[i] ?? 'tabler:point'" class="case-study__token-icon" />
              <span class="case-study__token-number">{{ i + 1 }}</span>
            </span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </section>

      <section class="case-study__section">
        <h2>{{ t('case_studies.stack_heading') }}</h2>
        <ul class="case-study__stack">
          <li v-for="tech in content.stack" :key="tech">{{ tech }}</li>
        </ul>
      </section>
    </div>

    <section class="case-study__cta">
      <div class="case-study__inner case-study__cta-inner">
        <div>
          <h2>{{ t('case_studies.cta_title') }}</h2>
          <p>{{ t('case_studies.cta_lead') }}</p>
        </div>
        <a :href="`${homePath}#demo`" class="btn-primary">{{ t('case_studies.cta_button') }}</a>
      </div>
    </section>
  </article>
</template>

<style scoped>
.case-study__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.case-study__hero {
  padding: calc(var(--section-y) * 0.9) 1.5rem calc(var(--section-y) * 0.6);
  background: var(--glow-accent), var(--color-bg);
}

.case-study h1,
.case-study__lead {
  max-width: 48rem;
}

.case-study__back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  text-decoration: none;
}

.case-study__back:hover {
  color: var(--color-text);
}

.case-study__eyebrow {
  margin: 0 0 0.5rem;
  color: var(--color-accent);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.case-study h1 {
  font-size: clamp(1.9rem, 4.5vw, 2.8rem);
  letter-spacing: var(--tracking-tight);
  line-height: var(--lh-tight);
  margin: 0 0 1rem;
}

.case-study__lead {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--fs-md);
  line-height: var(--lh-base);
}

/* metriky */
.case-study__metrics {
  padding: 0 1.5rem;
}

.case-study__metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  margin: 0 auto;
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--color-border);
}

.case-study__metric {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 0.35rem;
  padding: 1.5rem;
  background: var(--color-surface-1);
}

.case-study__metric dd {
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: var(--fw-bold);
  letter-spacing: var(--tracking-tight);
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.case-study__metric dt {
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  line-height: var(--lh-snug);
}

/* obsah */
.case-study__body {
  padding: var(--section-y) 1.5rem 0;
  box-sizing: content-box;
}

.case-study__section {
  margin-bottom: calc(var(--section-y) * 0.75);
}

.case-study__section h2 {
  font-size: clamp(1.4rem, 2.6vw, 1.8rem);
  margin: 0 0 1.25rem;
}

.case-study__section > p {
  max-width: 46rem;
  margin: 0;
  color: var(--color-text-muted);
  font-size: 1.05rem;
  line-height: var(--lh-base);
}

.case-study__delivered {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.case-study__delivered li {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-surface-1);
}

.case-study__delivered h3 {
  font-size: 1.05rem;
  margin: 0 0 0.5rem;
}

.case-study__delivered p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.92rem;
  line-height: var(--lh-base);
}

/* proces — rovnaký vizuál ako HowItWorks */
.case-study__section > .case-study__process-lead {
  margin-bottom: 2rem;
}

.case-study__process {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.case-study__step {
  position: relative;
}

.case-study__token {
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

.case-study__token-icon {
  width: 22px;
  height: 22px;
  color: var(--color-accent);
}

.case-study__token-number {
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

.case-study__step h3 {
  font-size: 1.05rem;
  margin: 0 0 0.5rem;
}

.case-study__step p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: var(--lh-base);
}

@media (min-width: 56.01rem) {
  .case-study__step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 1.5rem;
    left: 3rem;
    right: -1.5rem;
    border-top: 2px dashed var(--color-border-strong);
  }
}

.case-study__stack {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.case-study__stack li {
  padding: 0.4rem 0.85rem;
  border: 1px solid var(--color-accent-border);
  border-radius: var(--r-full);
  background: var(--color-accent-soft);
  font-size: var(--fs-sm);
}

/* CTA */
.case-study__cta {
  padding: calc(var(--section-y) * 0.85) 1.5rem;
  background: var(--color-accent-soft);
  border-top: 1px solid var(--color-accent-border);
  border-bottom: 1px solid var(--color-accent-border);
}

.case-study__cta-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.case-study__cta h2 {
  max-width: 36rem;
  font-size: clamp(1.3rem, 2.4vw, 1.7rem);
  margin: 0 0 0.5rem;
}

.case-study__cta p {
  margin: 0;
  color: var(--color-text-muted);
}

@media (max-width: 56rem) {
  .case-study__metrics-grid,
  .case-study__process {
    grid-template-columns: 1fr 1fr;
  }

  .case-study__delivered {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 32rem) {
  .case-study__metrics-grid,
  .case-study__process,
  .case-study__delivered {
    grid-template-columns: 1fr;
  }
}
</style>
