<script setup lang="ts">
defineI18nRoute({
  paths: {
    sk: '/ochrana-osobnych-udajov',
    cs: '/ochrana-osobnich-udaju',
    en: '/privacy-policy'
  }
})

const { t, locale } = useI18n()
const { reset } = useCookieConsent()

const sections = computed(() => PRIVACY_CONTENT[locale.value] ?? PRIVACY_CONTENT.sk)
const effectiveDate = computed(() =>
  new Date(PRIVACY_EFFECTIVE_DATE).toLocaleDateString(locale.value, { day: 'numeric', month: 'long', year: 'numeric' })
)

const consentReset = ref(false)
function changeConsent() {
  reset()
  consentReset.value = true
}

useSeoMeta({
  title: () => `${t('privacy.title')} – ProjentIQ`,
  description: () => t('privacy.meta_description'),
  ogSiteName: 'ProjentIQ',
  ogTitle: () => `${t('privacy.title')} – ProjentIQ`,
  ogDescription: () => t('privacy.meta_description'),
  ogType: 'website'
})
</script>

<template>
  <article class="legal">
    <div class="legal__inner">
      <h1>{{ t('privacy.title') }}</h1>
      <p class="legal__meta">{{ t('privacy.effective') }} {{ effectiveDate }}</p>

      <section v-for="section in sections" :key="section.heading" class="legal__section">
        <h2>{{ section.heading }}</h2>
        <ul v-if="section.items">
          <li v-for="item in section.items" :key="item">{{ item }}</li>
        </ul>
        <p v-for="p in section.paragraphs" :key="p">{{ p }}</p>
      </section>

      <div class="legal__consent">
        <button type="button" class="btn-secondary" @click="changeConsent">
          {{ t('privacy.change_consent') }}
        </button>
        <p v-if="consentReset" role="status">{{ t('privacy.consent_reset') }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.legal {
  padding: var(--section-y) 1.5rem;
}

.legal__inner {
  max-width: 46rem;
  margin: 0 auto;
}

.legal h1 {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  margin: 0 0 0.5rem;
}

.legal__meta {
  margin: 0 0 2.5rem;
  color: var(--color-text-subtle);
  font-size: 0.9rem;
}

.legal__section {
  margin-bottom: 2rem;
}

.legal h2 {
  font-size: 1.2rem;
  margin: 0 0 0.75rem;
}

.legal p,
.legal li {
  color: var(--color-text-muted);
  line-height: 1.7;
}

.legal p {
  margin: 0 0 0.75rem;
}

.legal ul {
  margin: 0 0 0.75rem;
  padding-left: 1.25rem;
}

.legal__consent {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.legal__consent p {
  margin-top: 1rem;
}
</style>
