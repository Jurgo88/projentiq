<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 10
}

function closeMenu() {
  mobileMenuOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="site-header__inner">
      <NuxtLink :to="localePath('index')" class="site-header__logo">Projent<span class="site-header__logo-accent">IQ</span></NuxtLink>

      <nav id="site-header-nav" class="site-header__nav" :class="{ 'is-open': mobileMenuOpen }" :aria-label="t('nav.main_label')">
        <a href="#solutions" @click="closeMenu">{{ t('nav.solutions') }}</a>
        <a href="#pricing" @click="closeMenu">{{ t('nav.pricing') }}</a>
        <a href="#references" @click="closeMenu">{{ t('nav.references') }}</a>
        <a href="#demo" class="site-header__nav-cta btn-primary" @click="closeMenu">{{ t('nav.cta_demo') }}</a>
      </nav>

      <div class="site-header__actions">
        <LangSwitcher />
        <ThemeToggle />
        <a href="#demo" class="site-header__cta btn-primary">{{ t('nav.cta_demo') }}</a>
        <button
          type="button"
          class="site-header__menu-toggle"
          :aria-label="mobileMenuOpen ? t('nav.menu_close') : t('nav.menu_open')"
          :aria-expanded="mobileMenuOpen"
          aria-controls="site-header-nav"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon v-show="mobileMenuOpen" name="tabler:x" aria-hidden="true" />
          <Icon v-show="!mobileMenuOpen" name="tabler:menu-2" aria-hidden="true" />
        </button>
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

.site-header__nav-cta {
  display: none;
}

.site-header__menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  color: var(--color-text);
  cursor: pointer;
}

.site-header__menu-toggle:hover {
  border-color: var(--color-accent);
}

.site-header__menu-toggle :deep(svg) {
  width: 20px;
  height: 20px;
}

@media (max-width: 56rem) {
  .site-header__menu-toggle {
    display: inline-flex;
  }

  .site-header__actions {
    gap: 0.5rem;
  }

  .site-header__cta {
    display: none;
  }

  .site-header__nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    padding: 0.25rem 1.5rem 1rem;
    background: var(--color-surface-1);
    border-bottom: 1px solid var(--color-border);
  }

  .site-header__nav.is-open {
    display: flex;
  }

  .site-header__nav a {
    padding: 0.85rem 0;
    font-size: 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  .site-header__nav .site-header__nav-cta {
    display: flex;
    justify-content: center;
    margin-top: 0.75rem;
    padding: 0.7rem 0;
    border-bottom: none;
  }
}
</style>
