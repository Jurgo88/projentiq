<script setup lang="ts">
const { t } = useI18n()

const trustItems = [
  { id: 1, icon: 'tabler:plug-connected' },
  { id: 2, icon: 'tabler:lock' },
  { id: 3, icon: 'tabler:presentation' },
  { id: 4, icon: 'tabler:world' },
  { id: 5, icon: 'tabler:clock' }
]

const baRows = [
  {
    labelKey: 'hero.panel.invoices_label',
    beforeKey: 'hero.panel.invoices_before', beforeMetaKey: 'hero.panel.invoices_before_meta',
    afterKey:  'hero.panel.invoices_after',  afterMetaKey:  'hero.panel.invoices_after_meta'
  },
  {
    labelKey: 'hero.panel.contracts_label',
    beforeKey: 'hero.panel.contracts_before', beforeMetaKey: 'hero.panel.contracts_before_meta',
    afterKey:  'hero.panel.contracts_after',  afterMetaKey:  'hero.panel.contracts_after_meta'
  },
  {
    labelKey: 'hero.panel.orders_label',
    beforeKey: 'hero.panel.orders_before', beforeMetaKey: 'hero.panel.orders_before_meta',
    afterKey:  'hero.panel.orders_after',  afterMetaKey:  'hero.panel.orders_after_meta'
  }
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
        <ul class="hero__trust-strip" aria-label="Kľúčové vlastnosti">
          <li v-for="item in trustItems" :key="item.id">
            <Icon :name="item.icon" aria-hidden="true" />
            {{ t(`trust_strip.item_${item.id}`) }}
          </li>
        </ul>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="hero-ba">
          <div class="hero-ba__header">
            <span class="hero-ba__tab hero-ba__tab--before">{{ t('hero.panel.tab_before') }}</span>
            <span class="hero-ba__tab hero-ba__tab--after">{{ t('hero.panel.tab_after') }}</span>
          </div>

          <div class="hero-ba__grid">
            <div class="hero-ba__col hero-ba__col--before">
              <div v-for="(row, i) in baRows" :key="`b-${i}`" class="hero-ba__row hero-ba__row--before">
                <p class="hero-ba__label">{{ t(row.labelKey) }}</p>
                <p class="hero-ba__text">{{ t(row.beforeKey) }}</p>
                <p class="hero-ba__meta">{{ t(row.beforeMetaKey) }}</p>
              </div>
            </div>
            <div class="hero-ba__col hero-ba__col--after">
              <div v-for="(row, i) in baRows" :key="`a-${i}`" class="hero-ba__row hero-ba__row--after">
                <p class="hero-ba__label">{{ t(row.labelKey) }}</p>
                <p class="hero-ba__text">{{ t(row.afterKey) }}</p>
                <p class="hero-ba__meta">{{ t(row.afterMetaKey) }}</p>
              </div>
            </div>
          </div>

          <div class="hero-ba__footer">
            <Icon name="tabler:info-circle" class="hero-ba__footer-icon" />
            {{ t('hero.panel.disclaimer') }}
          </div>
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

.hero__trust-strip {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
}

.hero__trust-strip li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--color-text-muted);
}

.hero__trust-strip .icon {
  width: 14px;
  height: 14px;
  color: var(--color-accent);
  flex-shrink: 0;
}

.hero-ba {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--sh-lg), var(--hairline-top);
}

.hero-ba__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--color-border);
}

.hero-ba__tab {
  padding: 0.6rem 1rem;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  text-align: center;
  letter-spacing: 0.04em;
}

.hero-ba__tab--before {
  background: var(--color-surface-2);
  color: var(--color-text-muted);
}

.hero-ba__tab--after {
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-left: 1px solid var(--color-accent-border);
}

.hero-ba__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.hero-ba__col {
  padding: 0.875rem;
}

.hero-ba__col--before {
  border-right: 1px solid var(--color-border);
}

.hero-ba__row {
  padding: 0.625rem;
  border-radius: var(--r-sm);
  margin-bottom: 0.5rem;
  border: 1px solid var(--color-border);
}

.hero-ba__row:last-child {
  margin-bottom: 0;
}

.hero-ba__row--before {
  background: var(--color-surface-2);
}

.hero-ba__row--after {
  background: var(--color-accent-soft);
  border-color: var(--color-accent-border);
}

.hero-ba__label {
  margin: 0 0 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.hero-ba__row--before .hero-ba__label {
  color: var(--color-text-muted);
}

.hero-ba__row--after .hero-ba__label {
  color: var(--color-accent);
}

.hero-ba__text {
  margin: 0;
  font-size: 0.8rem;
  font-weight: var(--fw-medium);
  line-height: 1.35;
  color: var(--color-text-muted);
}

.hero-ba__row--after .hero-ba__text {
  color: var(--color-text);
}

.hero-ba__meta {
  margin: 0.2rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

.hero-ba__row--before .hero-ba__meta {
  color: var(--color-text-muted);
}

.hero-ba__row--after .hero-ba__meta {
  color: var(--color-success);
}

.hero-ba__footer {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.875rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-2);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--color-text-muted);
}

.hero-ba__footer-icon {
  width: 14px;
  height: 14px;
  color: var(--color-accent);
  flex-shrink: 0;
}

@media (max-width: 56rem) {
  .hero__inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 40rem) {
  .hero__visual {
    display: none;
  }
}
</style>
