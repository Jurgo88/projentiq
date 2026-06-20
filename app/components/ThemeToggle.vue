<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')
const label = computed(() =>
  isDark.value ? t('theme.switch_to_light') : t('theme.switch_to_dark')
)

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button type="button" class="theme-toggle" :aria-label="label" @click="toggle">
    <span aria-hidden="true">{{ isDark ? '☀' : '☾' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}

.theme-toggle:hover {
  border-color: var(--color-accent);
}
</style>
