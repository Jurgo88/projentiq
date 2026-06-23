<script setup lang="ts">
const { t } = useI18n()

const prefersReducedMotion = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches
  mq.addEventListener('change', (e) => { prefersReducedMotion.value = e.matches })
})

const NODES = [
  { icon: 'tabler:mail',          labelKey: 'demos.automation.n_mail',    log: 'Nová objednávka od ABC s.r.o.',                   t: '0,0s' },
  { icon: 'tabler:robot',         labelKey: 'demos.automation.n_agent',   log: 'Rozpoznané: 3 položky, dodacia adresa, IČO',       t: '2,2s' },
  { icon: 'tabler:database-plus', labelKey: 'demos.automation.n_record',  log: 'Objednávka #4821 vytvorená v systéme',             t: '4,1s' },
  { icon: 'tabler:send',          labelKey: 'demos.automation.n_confirm', log: 'Potvrdzujúci e-mail odoslaný zákazníkovi',         t: '6,0s' },
]

type NodeState = 'idle' | 'active' | 'done'
type RunState  = 'idle' | 'running' | 'done'

const nodeStates     = ref<NodeState[]>(['idle', 'idle', 'idle', 'idle'])
const connFilled     = ref<boolean[]>([false, false, false])
const logLines       = ref<{ time: string; text: string }[]>([])
const runState       = ref<RunState>('idle')
const timers: ReturnType<typeof setTimeout>[] = []

function clearTimers() {
  timers.forEach(clearTimeout)
  timers.length = 0
}

function reset() {
  clearTimers()
  nodeStates.value = ['idle', 'idle', 'idle', 'idle']
  connFilled.value  = [false, false, false]
  logLines.value    = []
  runState.value    = 'idle'
}

function run() {
  if (runState.value !== 'idle') return
  runState.value = 'running'
  logLines.value = []
  nodeStates.value = ['idle', 'idle', 'idle', 'idle']
  connFilled.value = [false, false, false]

  if (prefersReducedMotion.value) {
    nodeStates.value = ['done', 'done', 'done', 'done']
    connFilled.value = [true, true, true]
    logLines.value   = NODES.map(n => ({ time: n.t, text: n.log }))
    runState.value   = 'done'
    return
  }

  // Each node: active at i*2200ms, done at i*2200+1100ms
  NODES.forEach((node, i) => {
    timers.push(setTimeout(() => {
      nodeStates.value[i] = 'active'
    }, i * 2200))

    timers.push(setTimeout(() => {
      nodeStates.value[i] = 'done'
      if (i < 3) connFilled.value[i] = true
      logLines.value = [...logLines.value, { time: node.t, text: node.log }]
      if (i === NODES.length - 1) runState.value = 'done'
    }, i * 2200 + 1100))
  })
}

onUnmounted(clearTimers)
</script>

<template>
  <div class="auto-demo">
    <!-- Header -->
    <div class="auto-header">
      <p class="auto-title">{{ t('demos.automation.title') }}</p>
      <p class="auto-scenario">{{ t('demos.automation.scenario') }}</p>
    </div>

    <!-- Node pipeline -->
    <div class="auto-pipeline" role="img" :aria-label="t('demos.automation.title')">
      <template v-for="(node, i) in NODES" :key="i">
        <div class="auto-node" :class="`state-${nodeStates[i]}`">
          <div class="auto-node-icon">
            <Icon v-if="nodeStates[i] !== 'done'" :name="node.icon" aria-hidden="true" />
            <Icon v-else name="tabler:check" aria-hidden="true" />
          </div>
          <span class="auto-node-label">{{ t(node.labelKey) }}</span>
        </div>

        <!-- Connector (between nodes) -->
        <div v-if="i < NODES.length - 1" class="auto-conn" aria-hidden="true">
          <div class="auto-conn-fill" :class="{ 'is-filled': connFilled[i] }" />
        </div>
      </template>
    </div>

    <!-- Log -->
    <div class="auto-log" aria-live="polite">
      <p class="auto-log-caption">{{ t('demos.automation.log_caption') }}</p>
      <p v-if="logLines.length === 0" class="auto-log-empty">{{ t('demos.automation.log_empty') }}</p>
      <ul v-else class="auto-log-list">
        <li v-for="(line, i) in logLines" :key="i" class="auto-log-line">
          <span class="auto-log-time">{{ line.time }}</span>
          <span>{{ line.text }}</span>
        </li>
      </ul>
    </div>

    <!-- Result strip -->
    <div v-if="runState === 'done'" class="auto-result">
      <Icon name="tabler:circle-check" aria-hidden="true" />
      {{ t('demos.automation.result') }}
    </div>

    <!-- Actions -->
    <div class="auto-actions">
      <button
        class="auto-btn-primary"
        :disabled="runState !== 'idle'"
        @click="run"
      >
        <Icon
          v-if="runState === 'running'"
          name="tabler:loader-2"
          class="icon-spin"
          aria-hidden="true"
        />
        <Icon v-else-if="runState === 'done'" name="tabler:check" aria-hidden="true" />
        {{
          runState === 'idle'    ? t('demos.automation.run')
          : runState === 'running' ? t('demos.automation.running')
          : t('demos.automation.done')
        }}
      </button>
      <button v-if="runState !== 'idle'" class="auto-btn-ghost" @click="reset">
        {{ t('demos.btn_reset') }}
      </button>
    </div>

    <p class="auto-note">{{ t('demos.automation.note') }}</p>
    <p class="demo-note">{{ t('demos.sample_note') }}</p>
  </div>
</template>

<style scoped>
.auto-demo {
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  background: var(--color-surface-2);
  box-shadow: var(--hairline-top);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Header */
.auto-header { display: flex; flex-direction: column; gap: 0.2rem; }
.auto-title { font-size: var(--fs-base); font-weight: var(--fw-semibold); color: var(--color-text); margin: 0; }
.auto-scenario { font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-text-muted); margin: 0; }

/* Pipeline */
.auto-pipeline {
  display: flex;
  align-items: center;
  gap: 0;
}

/* Node */
.auto-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
}
.auto-node-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: var(--color-surface-1);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: border-color 0.25s, background 0.25s, color 0.25s;
}
.auto-node-label {
  font-size: 0.7rem;
  text-align: center;
  color: var(--color-text-muted);
  max-width: 5rem;
  line-height: 1.3;
  transition: color 0.25s;
}

/* Node states */
.state-active .auto-node-icon {
  border-color: var(--color-accent-border);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  animation: pulse-node 0.9s ease-in-out infinite;
}
.state-active .auto-node-label { color: var(--color-accent); }
@keyframes pulse-node {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.06); }
}
@media (prefers-reduced-motion: reduce) {
  .state-active .auto-node-icon { animation: none; }
}

.state-done .auto-node-icon {
  border-color: var(--color-success, #16a34a);
  background: var(--color-success-soft, #dcfce7);
  color: var(--color-success, #16a34a);
}
.state-done .auto-node-label { color: var(--color-success, #16a34a); }

/* Connector */
.auto-conn {
  flex: 1;
  height: 2px;
  background: var(--color-border);
  position: relative;
  overflow: hidden;
  margin-bottom: 1.4rem; /* align with icon center */
}
.auto-conn-fill {
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s ease;
}
.auto-conn-fill.is-filled { transform: scaleX(1); }

/* Mobile: vertical pipeline */
@media (max-width: 40rem) {
  .auto-pipeline {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .auto-node { flex-direction: row; gap: 0.75rem; }
  .auto-node-label { max-width: none; font-size: 0.8125rem; text-align: left; }
  .auto-conn { display: none; }
}

/* Log */
.auto-log {
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-surface-1);
  padding: 0.75rem;
  min-height: 5rem;
}
.auto-log-caption {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.auto-log-empty { font-size: 0.8125rem; color: var(--color-text-subtle); margin: 0; }
.auto-log-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.35rem; }
.auto-log-line {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  font-size: 0.8125rem;
  color: var(--color-text);
}
.auto-log-time {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-subtle);
  min-width: 2.5rem;
  flex-shrink: 0;
}

/* Result */
.auto-result {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 0.75rem;
  border-radius: var(--r-sm);
  background: var(--color-success-soft, #dcfce7);
  color: var(--color-success, #16a34a);
  font-size: 0.875rem;
  font-weight: 500;
}

/* Actions */
.auto-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.auto-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.1rem;
  background: var(--gradient-accent, var(--color-accent-strong));
  color: #fff;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
  font-size: 0.95rem;
  font-weight: var(--fw-semibold);
  cursor: pointer;
  box-shadow: var(--sh-md);
  transition: transform 0.15s ease, filter 0.15s ease;
}
.auto-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; }
.auto-btn-primary:not(:disabled):hover { filter: brightness(1.08); transform: translateY(-1px); }
.auto-btn-primary:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
.auto-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.1rem;
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  font-size: 0.95rem;
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.auto-btn-ghost:hover { border-color: var(--color-accent); color: var(--color-accent); }
.auto-btn-ghost:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }

.icon-spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.auto-note {
  font-size: 0.8rem;
  color: var(--color-text-subtle);
  margin: 0;
  line-height: 1.5;
}
.demo-note {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-subtle);
  margin: 0;
}
</style>
