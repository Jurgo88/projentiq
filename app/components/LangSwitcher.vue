<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)

const current = computed(() => locales.value.find((l) => l.code === locale.value))

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="lang-switcher">
    <button
      type="button"
      class="lang-switcher__trigger"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      :aria-label="t('lang.switch_label')"
      @click="toggle"
    >
      {{ current?.code.toUpperCase() }}
      <Icon name="tabler:chevron-down" class="lang-switcher__chevron" :class="{ 'is-open': isOpen }" aria-hidden="true" />
    </button>

    <ul v-if="isOpen" class="lang-switcher__menu" role="listbox" :aria-label="t('lang.switch_label')">
      <li v-for="l in locales" :key="l.code" role="presentation">
        <NuxtLink
          :to="switchLocalePath(l.code)"
          class="lang-switcher__option"
          :class="{ 'is-active': l.code === locale }"
          role="option"
          :aria-selected="l.code === locale"
          @click="close"
        >
          {{ l.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
}

.lang-switcher__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  min-width: 2.75rem;
  height: 2.75rem;
  padding: 0 0.65rem;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: var(--fw-semibold);
  cursor: pointer;
}

.lang-switcher__trigger:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
}

.lang-switcher__chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.15s ease;
}

.lang-switcher__chevron.is-open {
  transform: rotate(180deg);
}

.lang-switcher__menu {
  position: absolute;
  top: calc(100% + 0.4rem);
  right: 0;
  min-width: 9rem;
  margin: 0;
  padding: 0.35rem;
  list-style: none;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  box-shadow: var(--sh-lg);
  z-index: 10;
}

.lang-switcher__option {
  display: block;
  padding: 0.75rem 0.65rem;
  border-radius: var(--r-sm);
  color: var(--color-text-muted);
  font-size: 0.9rem;
  text-decoration: none;
}

.lang-switcher__option:hover {
  background: var(--color-surface-3);
  color: var(--color-text);
}

.lang-switcher__option.is-active {
  color: var(--color-accent);
  font-weight: var(--fw-semibold);
}
</style>
