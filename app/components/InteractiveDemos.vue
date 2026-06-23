<script setup lang="ts">
const { t } = useI18n()
const { target, pending } = useReveal()

type Tab = 'invoice' | 'rag' | 'automation'

const activeTab = ref<Tab>('invoice')
const sectionRef = ref<HTMLElement | null>(null)
const prefersReducedMotion = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches
  mq.addEventListener('change', (e) => { prefersReducedMotion.value = e.matches })
})

const tabs: { id: Tab; labelKey: string; icon: string }[] = [
  { id: 'invoice',    labelKey: 'demos.tab_invoice',    icon: 'tabler:file-invoice' },
  { id: 'rag',        labelKey: 'demos.tab_rag',         icon: 'tabler:messages' },
  { id: 'automation', labelKey: 'demos.tab_automation',  icon: 'tabler:settings-automation' },
]

function selectTab(id: Tab) {
  activeTab.value = id
}

function onTabKeydown(e: KeyboardEvent, index: number) {
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    const next = (index + 1) % tabs.length
    selectTab(tabs[next].id)
    nextTick(() => document.getElementById(`demo-tab-${tabs[next].id}`)?.focus())
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    const prev = (index - 1 + tabs.length) % tabs.length
    selectTab(tabs[prev].id)
    nextTick(() => document.getElementById(`demo-tab-${tabs[prev].id}`)?.focus())
  }
}

function scrollToAndOpen(tab: Tab) {
  selectTab(tab)
  nextTick(() => {
    if (!sectionRef.value) return
    sectionRef.value.scrollIntoView({
      behavior: prefersReducedMotion.value ? 'instant' : 'smooth',
      block: 'start',
    })
  })
}

defineExpose({ scrollToAndOpen })
</script>

<template>
  <section id="demos" ref="sectionRef" class="demos" aria-labelledby="demos-title">
    <div ref="target" class="demos__inner reveal" :class="{ 'reveal--pending': pending }">

      <div class="demos__header">
        <p class="eyebrow">{{ t('demos.eyebrow') }}</p>
        <h2 id="demos-title">{{ t('demos.title') }}</h2>
        <p class="demos__lead">{{ t('demos.lead') }}</p>
      </div>

      <!-- Tablist -->
      <div class="demos__tabs" role="tablist" :aria-label="t('demos.title')">
        <button
          v-for="(tab, i) in tabs"
          :id="`demo-tab-${tab.id}`"
          :key="tab.id"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :aria-controls="`demo-panel-${tab.id}`"
          :tabindex="activeTab === tab.id ? 0 : -1"
          class="demos__tab"
          :class="{ 'is-active': activeTab === tab.id }"
          @click="selectTab(tab.id)"
          @keydown="onTabKeydown($event, i)"
        >
          <Icon :name="tab.icon" class="demos__tab-icon" aria-hidden="true" />
          {{ t(tab.labelKey) }}
        </button>
      </div>

      <!-- Tab panels -->
      <div class="demos__panels">
        <div
          v-for="tab in tabs"
          :id="`demo-panel-${tab.id}`"
          :key="tab.id"
          role="tabpanel"
          :aria-labelledby="`demo-tab-${tab.id}`"
          :hidden="activeTab !== tab.id"
        >
          <LazyDemosDemoInvoice    v-if="tab.id === 'invoice'    && activeTab === tab.id" />
          <LazyDemosDemoRagChat    v-if="tab.id === 'rag'        && activeTab === tab.id" />
          <LazyDemosDemoAutomation v-if="tab.id === 'automation' && activeTab === tab.id" />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.demos {
  padding: var(--section-y) 1.5rem;
  background: var(--color-bg);
}

.demos__inner {
  max-width: var(--container);
  margin: 0 auto;
}

/* Header */
.demos__header {
  max-width: 44rem;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.demos__header h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 1rem;
}

.demos__lead {
  font-size: var(--fs-base);
  color: var(--color-text-muted);
  margin: 0;
  line-height: var(--lh-base);
}

/* Tabs */
.demos__tabs {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.demos__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  background: var(--color-surface-2);
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.demos__tab:hover {
  color: var(--color-text);
  border-color: var(--color-accent-border);
}

.demos__tab.is-active {
  background: var(--color-accent-soft);
  border-color: var(--color-accent-border);
  color: var(--color-accent);
  font-weight: var(--fw-semibold);
}

.demos__tab:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.demos__tab-icon {
  width: 1.1em;
  height: 1.1em;
  flex-shrink: 0;
}

/* Panels */
.demos__panels > div[hidden] {
  display: none;
}
</style>
