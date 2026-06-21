<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="site-header__inner">
      <NuxtLink :to="localePath('index')" class="site-header__logo">Projent<span class="site-header__logo-accent">IQ</span></NuxtLink>

      <nav class="site-header__nav" :aria-label="t('nav.main_label')">
        <a href="#solutions">{{ t('nav.solutions') }}</a>
        <a href="#pricing">{{ t('nav.pricing') }}</a>
        <a href="#references">{{ t('nav.references') }}</a>
      </nav>

      <div class="site-header__actions">
        <LangSwitcher />
        <ThemeToggle />
        <a href="#demo" class="btn-primary">{{ t('nav.cta_demo') }}</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--color-bg) 80%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: padding 0.15s ease, border-color 0.15s ease;
}

.site-header.is-scrolled {
  border-bottom-color: var(--color-border);
}

.site-header__inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: padding 0.15s ease;
}

.site-header.is-scrolled .site-header__inner {
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}

.site-header__logo {
  font-weight: var(--fw-bold);
  font-size: 1.1rem;
  color: var(--color-text);
  text-decoration: none;
}

.site-header__logo-accent {
  color: var(--color-accent);
}

.site-header__nav {
  display: flex;
  gap: 1.25rem;
}

.site-header__nav a {
  position: relative;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  padding-bottom: 0.2rem;
}

.site-header__nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.site-header__nav a:hover {
  color: var(--color-text);
}

.site-header__nav a:hover::after {
  transform: scaleX(1);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.site-header__actions .btn-primary {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  box-shadow: none;
}
</style>
