<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <nav class="lang-switcher" :aria-label="t('lang.switch_label')">
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      class="lang-switcher__item"
      :class="{ 'is-active': l.code === locale }"
      :aria-current="l.code === locale ? 'page' : undefined"
    >
      {{ l.code.toUpperCase() }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.lang-switcher {
  display: inline-flex;
  gap: 0.25rem;
}

.lang-switcher__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  height: 2.75rem;
  padding: 0 0.4rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  text-decoration: none;
}

.lang-switcher__item:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
}

.lang-switcher__item.is-active {
  border-color: var(--color-accent);
  color: var(--color-accent);
  font-weight: 600;
}
</style>
