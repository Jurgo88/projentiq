<script setup lang="ts">
const { t } = useI18n()

const prefersReducedMotion = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches
  mq.addEventListener('change', (e) => { prefersReducedMotion.value = e.matches })
})

const DOCS = ['VOP_2025.pdf', 'Zmluva_Signa_2024.pdf', 'Smernica_nakup_2025.pdf']

const QA = [
  {
    q: 'Aká je reklamačná lehota pre B2B klientov?',
    a: 'Pre B2B klientov platí 30-dňová lehota na nahlásenie závady. Bežní zákazníci majú 14 dní.',
    src: 'VOP_2025.pdf · §8',
    time: '2,1 sek.',
  },
  {
    q: 'Kedy vyprší zmluva so Signou?',
    a: 'Zmluva so Signou Slovakia je platná do 31. 3. 2026. Predlžuje sa automaticky o 12 mesiacov, ak ju nezrušíte najneskôr 60 dní pred koncom.',
    src: 'Zmluva_Signa_2024.pdf · str. 3, čl. 4.2',
    time: '3,4 sek.',
  },
  {
    q: 'Aké sú platobné podmienky pre nových dodávateľov?',
    a: 'Splatnosť faktúr je 30 dní od doručenia. Pri objednávkach nad 5 000 € sa vyžaduje 30 % záloha vopred.',
    src: 'Smernica_nakup_2025.pdf · str. 2',
    time: '1,9 sek.',
  },
]

type Message = { role: 'user' | 'bot'; text: string; src?: string; time?: string }

const messages = ref<Message[]>([])
const isTyping = ref(false)
const usedIdxs = ref<Set<number>>(new Set())
const chatBodyRef = ref<HTMLElement | null>(null)
const timers: ReturnType<typeof setTimeout>[] = []

function clearTimers() {
  timers.forEach(clearTimeout)
  timers.length = 0
}

function reset() {
  clearTimers()
  messages.value = []
  isTyping.value = false
  usedIdxs.value = new Set()
}

function scrollToBottom() {
  nextTick(() => {
    if (chatBodyRef.value) chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
  })
}

function ask(idx: number) {
  if (usedIdxs.value.has(idx) || isTyping.value) return
  const qa = QA[idx]
  usedIdxs.value = new Set([...usedIdxs.value, idx])

  messages.value = [...messages.value, { role: 'user', text: qa.q }]
  isTyping.value = true
  scrollToBottom()

  const delay = prefersReducedMotion.value ? 0 : 1500
  timers.push(setTimeout(() => {
    isTyping.value = false
    messages.value = [...messages.value, { role: 'bot', text: qa.a, src: qa.src, time: qa.time }]
    scrollToBottom()
  }, delay))
}

onUnmounted(clearTimers)
</script>

<template>
  <div class="rag-demo">
    <!-- Bot header -->
    <div class="rag-header">
      <div class="rag-avatar" aria-hidden="true">
        <Icon name="tabler:robot" />
      </div>
      <div class="rag-header-text">
        <p class="rag-name">{{ t('demos.rag.name') }}</p>
        <p class="rag-status">
          <span class="rag-status-dot" aria-hidden="true" />
          {{ t('demos.rag.status') }}
        </p>
      </div>
      <button v-if="messages.length > 0" class="rag-reset-btn" @click="reset">
        <Icon name="tabler:rotate" aria-hidden="true" />
        {{ t('demos.btn_reset') }}
      </button>
    </div>

    <!-- Document chips -->
    <div class="rag-docs" :aria-label="t('demos.rag.docs_label')">
      <span class="rag-docs-lbl">{{ t('demos.rag.docs_label') }}:</span>
      <span v-for="doc in DOCS" :key="doc" class="rag-doc-chip">
        <Icon name="tabler:file-text" aria-hidden="true" />{{ doc }}
      </span>
    </div>

    <!-- Chat body -->
    <div
      ref="chatBodyRef"
      class="rag-body"
      aria-live="polite"
      aria-label="chat"
      role="log"
    >
      <p v-if="messages.length === 0 && !isTyping" class="rag-empty">
        {{ t('demos.rag.empty') }}
      </p>

      <template v-for="(msg, i) in messages" :key="i">
        <div class="msg" :class="msg.role === 'user' ? 'msg-user' : 'msg-bot'">
          <div v-if="msg.role === 'bot'" class="msg-avatar" aria-hidden="true">
            <Icon name="tabler:robot" />
          </div>
          <div class="msg-bubble">
            <p class="msg-text">{{ msg.text }}</p>
            <template v-if="msg.role === 'bot' && msg.src">
              <div class="msg-cite">
                <Icon name="tabler:file-text" aria-hidden="true" />
                {{ msg.src }}
              </div>
              <p class="msg-meta">{{ t('demos.rag.answered') }} · {{ msg.time }}</p>
            </template>
          </div>
        </div>
      </template>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="msg msg-bot">
        <div class="msg-avatar" aria-hidden="true">
          <Icon name="tabler:robot" />
        </div>
        <div class="msg-bubble typing-bubble" aria-label="píše…">
          <span class="typing-dot" />
          <span class="typing-dot" />
          <span class="typing-dot" />
        </div>
      </div>
    </div>

    <!-- Suggestions -->
    <div class="rag-suggest">
      <p class="rag-suggest-lbl">{{ t('demos.rag.suggest_label') }}:</p>
      <div class="rag-suggest-btns">
        <button
          v-for="(qa, i) in QA"
          :key="i"
          class="rag-q-btn"
          :class="{ 'is-used': usedIdxs.has(i) }"
          :disabled="usedIdxs.has(i) || isTyping"
          @click="ask(i)"
        >
          {{ qa.q }}
        </button>
      </div>
    </div>

    <p class="demo-note">{{ t('demos.sample_note') }}</p>
  </div>
</template>

<style scoped>
.rag-demo {
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  background: var(--color-surface-2);
  box-shadow: var(--hairline-top);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}

/* Header */
.rag-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.rag-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.rag-header-text { flex: 1; min-width: 0; }
.rag-name { font-size: 0.9375rem; font-weight: 600; color: var(--color-text); margin: 0; }
.rag-status {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0.1rem 0 0;
}
.rag-status-dot {
  display: inline-block;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--color-success, #16a34a);
}
.rag-reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  background: transparent;
  color: var(--color-text);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;
}
.rag-reset-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }
.rag-reset-btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }

/* Doc chips */
.rag-docs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: 0.75rem;
}
.rag-docs-lbl { color: var(--color-text-subtle); }
.rag-doc-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.55rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  background: var(--color-surface-1);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

/* Chat body */
.rag-body {
  min-height: 9rem;
  max-height: 16rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  background: var(--color-surface-1);
  scroll-behavior: smooth;
}
.rag-empty { font-size: 0.875rem; color: var(--color-text-subtle); margin: 0; line-height: 1.5; }

/* Messages */
.msg { display: flex; gap: 0.5rem; align-items: flex-start; }
.msg-user { flex-direction: row-reverse; }
.msg-avatar {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.msg-bubble {
  max-width: 78%;
  padding: 0.6rem 0.85rem;
  border-radius: var(--r-md);
  font-size: 0.875rem;
  line-height: 1.55;
}
.msg-user .msg-bubble {
  background: var(--color-accent);
  color: #fff;
  border-bottom-right-radius: var(--r-sm);
}
.msg-bot .msg-bubble {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-bottom-left-radius: var(--r-sm);
}
.msg-text { margin: 0; }
.msg-cite {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--color-accent-border);
  border-radius: var(--r-sm);
  background: var(--color-accent-soft);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-accent);
}
.msg-meta {
  margin: 0.35rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-text-subtle);
}

/* Typing dots */
.typing-bubble {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.65rem 0.85rem;
  min-width: 3.5rem;
}
.typing-dot {
  display: block;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--color-text-subtle);
  animation: typing-bounce 1.2s ease-in-out infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30%            { transform: translateY(-0.35rem); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .typing-dot { animation: none; opacity: 0.7; }
}

/* Suggestions */
.rag-suggest { display: flex; flex-direction: column; gap: 0.5rem; }
.rag-suggest-lbl { font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; }
.rag-suggest-btns { display: flex; flex-direction: column; gap: 0.4rem; }
.rag-q-btn {
  text-align: left;
  padding: 0.55rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  background: var(--color-surface-1);
  color: var(--color-text);
  font-size: var(--fs-sm);
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
  line-height: var(--lh-base);
}
.rag-q-btn:hover:not(:disabled) {
  border-color: var(--color-accent-border);
  background: var(--color-accent-soft);
  color: var(--color-accent);
}
.rag-q-btn.is-used, .rag-q-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.rag-q-btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }

.demo-note {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-subtle);
  margin: 0;
}
</style>
