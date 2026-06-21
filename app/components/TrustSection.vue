<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="approach" class="trust-section">
    <div class="trust-section__inner">
      <h2>{{ t('trust_section.title') }}</h2>
      <p>{{ t('trust_section.p1') }}</p>
      <p>{{ t('trust_section.p2') }}</p>
      <p>{{ t('trust_section.p3') }}</p>
      <p>{{ t('trust_section.p4') }}</p>
    </div>
  </section>
</template>

<style scoped>
.trust-section {
  padding: 4rem 1.5rem;
}

.trust-section__inner {
  max-width: 42rem;
  margin: 0 auto;
  text-align: center;
}

.trust-section h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 1.5rem;
}

.trust-section p {
  margin: 0 0 0.75rem;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

.trust-section p:last-child {
  margin-bottom: 0;
}
</style>
