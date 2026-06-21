<script setup lang="ts">
const { t } = useI18n()

const panelItems = [
  { kindKey: 'hero.panel.kind_agent', textKey: 'hero.panel.row_agent', statusKey: 'hero.panel.status_done' },
  { kindKey: 'hero.panel.kind_search', textKey: 'hero.panel.row_search', statusKey: 'hero.panel.status_done' },
  { kindKey: 'hero.panel.kind_automation', textKey: 'hero.panel.row_automation', statusKey: 'hero.panel.status_review' },
  { kindKey: 'hero.panel.kind_document', textKey: 'hero.panel.row_document', statusKey: 'hero.panel.status_done' }
]

const rotatingPhrases = computed(() => [
  t('hero.rotator.item_1'),
  t('hero.rotator.item_2'),
  t('hero.rotator.item_3')
])

const activeIndex = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function startRotation() {
  if (timer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % rotatingPhrases.value.length
  }, 3500)
}

function stopRotation() {
  clearInterval(timer)
  timer = undefined
}

onMounted(startRotation)
onUnmounted(stopRotation)
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero__inner">
      <div class="hero__copy">
        <h1>{{ t('hero.title') }}</h1>
        <p>{{ t('hero.lead') }}</p>
        <p
          class="hero__rotator"
          aria-live="polite"
          @mouseenter="stopRotation"
          @mouseleave="startRotation"
        >
          <Transition name="fade" mode="out-in">
            <span :key="activeIndex">{{ rotatingPhrases[activeIndex] }}</span>
          </Transition>
        </p>
        <div class="hero__cta">
          <a href="#demo" class="btn-primary">{{ t('nav.cta_demo') }}</a>
          <a href="#demo" class="btn-secondary">{{ t('hero.cta_contact') }}</a>
        </div>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="hero-panel">
          <p class="hero-panel__caption">{{ t('hero.panel_caption') }}</p>
          <ul class="hero-panel__list">
            <li v-for="(item, i) in panelItems" :key="i" class="hero-panel__row">
              <span class="hero-panel__kind">{{ t(item.kindKey) }}</span>
              <span class="hero-panel__text">{{ t(item.textKey) }}</span>
              <span
                class="hero-panel__status"
                :class="{ 'is-review': item.statusKey.endsWith('status_review') }"
              >{{ t(item.statusKey) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 4rem 1.5rem;
}

.hero__inner {
  max-width: 72rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero__copy h1 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1.15;
  margin: 0 0 1.25rem;
}

.hero__copy p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  margin: 0 0 1.75rem;
  max-width: 38rem;
}

.hero__rotator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 1.4rem;
  margin: 0 0 1.75rem;
  color: var(--color-accent);
  font-size: 0.95rem;
  font-weight: 600;
}

.hero__rotator::before {
  content: '';
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hero__cta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.hero-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
}

.hero-panel__caption {
  margin: 0 0 1rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.hero-panel__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.hero-panel__row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.85rem;
}

.hero-panel__kind {
  color: var(--color-text-muted);
  white-space: nowrap;
}

.hero-panel__text {
  font-weight: 600;
}

.hero-panel__status {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-accent);
  white-space: nowrap;
}

.hero-panel__status.is-review {
  color: var(--color-text-muted);
}

@media (max-width: 56rem) {
  .hero__inner {
    grid-template-columns: 1fr;
  }

  .hero-panel__row {
    grid-template-columns: 1fr;
    row-gap: 0.25rem;
  }
}
</style>
