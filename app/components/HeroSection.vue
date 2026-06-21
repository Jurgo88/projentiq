<script setup lang="ts">
const { t } = useI18n()

const panelItems = [
  { icon: 'tabler:robot', kindKey: 'hero.panel.kind_agent', textKey: 'hero.panel.row_agent', statusKey: 'hero.panel.status_done' },
  { icon: 'tabler:search', kindKey: 'hero.panel.kind_search', textKey: 'hero.panel.row_search', statusKey: 'hero.panel.status_done' },
  { icon: 'tabler:settings-automation', kindKey: 'hero.panel.kind_automation', textKey: 'hero.panel.row_automation', statusKey: 'hero.panel.status_review' },
  { icon: 'tabler:file-text', kindKey: 'hero.panel.kind_document', textKey: 'hero.panel.row_document', statusKey: 'hero.panel.status_done' }
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
    <div class="hero__bg" aria-hidden="true" />
    <div class="hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">{{ t('hero.eyebrow') }}</p>
        <h1>{{ t('hero.title_main') }} <span class="hero__title-gradient">{{ t('hero.title_highlight') }}</span></h1>
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
        <p class="hero__trust-microcopy">{{ t('hero.trust_microcopy') }}</p>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="hero-panel">
          <div class="hero-panel__header">
            <p class="hero-panel__caption">{{ t('hero.panel_caption') }}</p>
            <span class="hero-panel__live">
              <span class="hero-panel__live-dot" />
              {{ t('hero.panel.live_badge') }}
            </span>
          </div>
          <ul class="hero-panel__list">
            <li v-for="(item, i) in panelItems" :key="i" class="hero-panel__row">
              <Icon :name="item.icon" class="hero-panel__icon" />
              <span class="hero-panel__body">
                <span class="hero-panel__kind">{{ t(item.kindKey) }}</span>
                <span class="hero-panel__text">{{ t(item.textKey) }}</span>
              </span>
              <span
                class="hero-panel__status"
                :class="{ 'is-review': item.statusKey.endsWith('status_review') }"
              >
                <span class="hero-panel__status-dot" />
                {{ t(item.statusKey) }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: var(--section-y) 1.5rem;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: var(--glow-accent);
  background-position: center top;
  mask-image: linear-gradient(to bottom, black, transparent 90%);
}

.hero__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.03;
}

.hero__inner {
  position: relative;
  z-index: 1;
  max-width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero__copy h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin: 0 0 1.25rem;
}

.hero__title-gradient {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: var(--color-text);
}

@supports (-webkit-background-clip: text) or (background-clip: text) {
  .hero__title-gradient {
    -webkit-text-fill-color: transparent;
  }
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
  font-weight: var(--fw-semibold);
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
  margin: 0 0 1rem;
}

.hero__trust-microcopy {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--color-text-muted);
}

.hero-panel {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  padding: 1.25rem;
  box-shadow: var(--sh-lg), var(--hairline-top);
}

.hero-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0 0 1rem;
}

.hero-panel__caption {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-muted);
}

.hero-panel__live {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.55rem;
  border-radius: var(--r-full);
  background: var(--color-success-soft);
  color: var(--color-success);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  white-space: nowrap;
}

.hero-panel__live-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: currentColor;
  animation: hero-pulse 1.8s ease-in-out infinite;
}

@keyframes hero-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

.hero-panel__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.hero-panel__row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.65rem 0.5rem;
  border-bottom: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  font-size: 0.85rem;
  transition: background-color 0.15s ease;
}

.hero-panel__row:last-child {
  border-bottom: none;
}

.hero-panel__row:hover {
  background: var(--color-surface-2);
}

.hero-panel__icon {
  width: 18px;
  height: 18px;
  color: var(--color-accent);
  flex-shrink: 0;
}

.hero-panel__body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.hero-panel__kind {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--color-text-muted);
}

.hero-panel__text {
  font-weight: var(--fw-medium);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hero-panel__status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  border-radius: var(--r-full);
  background: var(--color-success-soft);
  color: var(--color-success);
  font-size: 0.75rem;
  font-weight: var(--fw-semibold);
  white-space: nowrap;
}

.hero-panel__status-dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.hero-panel__status.is-review {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

@media (max-width: 56rem) {
  .hero__inner {
    grid-template-columns: 1fr;
  }

  .hero-panel__row {
    grid-template-columns: auto 1fr;
  }

  .hero-panel__status {
    grid-column: 1 / -1;
    justify-self: start;
  }
}
</style>
