<script setup lang="ts">
const { t } = useI18n()
const { target, pending } = useReveal()
</script>

<template>
  <section class="cta-band">
    <div ref="target" class="cta-band__inner reveal" :class="{ 'reveal--pending': pending }">
      <div class="cta-band__copy">
        <h2>{{ t('cta_band.title') }}</h2>
        <p>{{ t('cta_band.lead') }}</p>
      </div>
      <div class="cta-band__actions">
        <a href="#demo" class="btn-primary">{{ t('nav.cta_demo') }}</a>
        <a href="#demo" class="btn-secondary">{{ t('hero.cta_contact') }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-band {
  padding: calc(var(--section-y) * 0.85) 1.5rem;
  background: var(--color-accent-soft);
  border-top: 1px solid var(--color-accent-border);
  border-bottom: 1px solid var(--color-accent-border);
}

.cta-band__inner {
  max-width: var(--container);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.cta-band__copy {
  max-width: 36rem;
}

.cta-band h2 {
  margin: 0 0 0.4rem;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
}

.cta-band__copy p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

.cta-band__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
</style>
