<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <strong>ProjentIQ</strong>
        <p class="site-footer__tagline">{{ t('footer.tagline') }}</p>
        <!-- TODO: doplniť reálne sídlo a IČO -->
        <p>{{ t('footer.address_placeholder') }}</p>
        <p>{{ t('footer.ico_placeholder') }}</p>
      </div>

      <nav class="site-footer__links" :aria-label="t('footer.links_label')">
        <a href="mailto:info@projentiq.com">info@projentiq.com</a>
        <!-- TODO: vytvoriť stránku GDPR/cookies, zatiaľ placeholder odkaz -->
        <a href="#">{{ t('footer.gdpr_link') }}</a>
      </nav>

      <p class="site-footer__copy">&copy; {{ year }} ProjentIQ</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  margin-top: 4rem;
}

.site-footer__inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.site-footer__brand p {
  margin: 0.25rem 0;
}

.site-footer__brand .site-footer__tagline {
  max-width: 24rem;
  margin-top: 0.5rem;
}

.site-footer__links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.site-footer__links a {
  color: var(--color-text-muted);
}

.site-footer__links a:hover {
  color: var(--color-text);
}

.site-footer__copy {
  width: 100%;
  margin: 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.8rem;
}
</style>
