<script setup lang="ts">
const { t } = useI18n()
const { target, pending } = useReveal()
</script>

<template>
  <section id="approach" class="trust-section">
    <div ref="target" class="trust-section__inner reveal" :class="{ 'reveal--pending': pending }">
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
  padding: calc(var(--section-y) * 1.1) 1.5rem;
  background: var(--color-surface-2);
}

.trust-section__inner {
  max-width: 42rem;
  margin: 0 auto;
  text-align: center;
}

.trust-section h2 {
  font-size: clamp(1.75rem, 3.5vw, 2.4rem);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 1.75rem;
}

.trust-section p {
  margin: 0 0 0.85rem;
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: var(--lh-base);
}

.trust-section p:last-child {
  margin-bottom: 0;
}
</style>
