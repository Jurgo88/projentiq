<script setup lang="ts">
const { t } = useI18n()
const { showBanner, accept, decline } = useCookieConsent()
</script>

<template>
  <div
    v-if="showBanner"
    class="cookie-consent"
    role="region"
    :aria-label="t('cookie.aria_label')"
  >
    <p class="cookie-consent__text">
      {{ t('cookie.message') }}
      <a href="#">{{ t('footer.gdpr_link') }}</a>
    </p>
    <div class="cookie-consent__actions">
      <button type="button" class="btn-secondary" @click="decline">
        {{ t('cookie.decline') }}
      </button>
      <button type="button" class="btn-primary" @click="accept">
        {{ t('cookie.accept') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.cookie-consent {
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1.1rem 1.25rem;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  box-shadow: var(--sh-lg);
}

.cookie-consent__text {
  flex: 1 1 16rem;
  margin: 0;
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
  line-height: var(--lh-base);
}

.cookie-consent__text a {
  color: var(--color-accent);
}

.cookie-consent__actions {
  display: flex;
  gap: 0.6rem;
  flex-shrink: 0;
}

.cookie-consent__actions .btn-primary,
.cookie-consent__actions .btn-secondary {
  padding: 0.5rem 0.9rem;
  font-size: 0.9rem;
}

@media (prefers-reduced-motion: no-preference) {
  .cookie-consent {
    animation: cookie-consent-in 0.25s ease both;
  }
}

@keyframes cookie-consent-in {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
}
</style>
