<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="cta-band">
    <div class="cta-band__inner">
      <h2>{{ t('cta_band.title') }}</h2>
      <a href="#demo" class="btn-primary">{{ t('nav.cta_demo') }}</a>
    </div>
  </section>
</template>

<style scoped>
.cta-band {
  padding: 3.5rem 1.5rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.cta-band__inner {
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.cta-band h2 {
  margin: 0;
  font-size: clamp(1.4rem, 2.6vw, 1.8rem);
}
</style>
