<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <strong class="site-footer__logo">Projent<span class="site-footer__logo-accent">IQ</span></strong>
        <p class="site-footer__tagline">{{ t('footer.tagline') }}</p>
        <!-- TODO: doplniť reálne sídlo a IČO -->
        <p>{{ t('footer.address_placeholder') }}</p>
        <p>{{ t('footer.ico_placeholder') }}</p>
      </div>

      <nav class="site-footer__col" :aria-label="t('footer.solutions_heading')">
        <p class="site-footer__heading">{{ t('footer.solutions_heading') }}</p>
        <a href="#solutions">{{ t('products.card_1_title') }}</a>
        <a href="#solutions">{{ t('products.card_2_title') }}</a>
        <a href="#solutions">{{ t('products.card_3_title') }}</a>
      </nav>

      <nav class="site-footer__col" :aria-label="t('footer.company_heading')">
        <p class="site-footer__heading">{{ t('footer.company_heading') }}</p>
        <a href="#how-it-works">{{ t('how_it_works.title') }}</a>
        <a href="#why">{{ t('why.title') }}</a>
        <a href="#faq">{{ t('faq.title') }}</a>
      </nav>

      <nav class="site-footer__col" :aria-label="t('footer.contact_heading')">
        <p class="site-footer__heading">{{ t('footer.contact_heading') }}</p>
        <a href="mailto:info@projentiq.com">info@projentiq.com</a>
        <a href="#demo">{{ t('nav.cta_demo') }}</a>
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
  background: var(--color-surface-1);
}

.site-footer__inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
  display: grid;
  grid-template-columns: 1.6fr repeat(3, 1fr);
  gap: 2rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.site-footer__logo {
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: var(--fw-bold);
}

.site-footer__logo-accent {
  color: var(--color-accent);
}

.site-footer__brand p {
  margin: 0.25rem 0;
}

.site-footer__brand .site-footer__tagline {
  max-width: 24rem;
  margin-top: 0.75rem;
}

.site-footer__col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.site-footer__heading {
  margin: 0 0 0.2rem;
  color: var(--color-text);
  font-size: 0.8rem;
  font-weight: var(--fw-semibold);
}

.site-footer__col a {
  color: var(--color-text-muted);
}

.site-footer__col a:hover {
  color: var(--color-text);
}

.site-footer__copy {
  grid-column: 1 / -1;
  margin: 1rem 0 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.8rem;
}

@media (max-width: 56rem) {
  .site-footer__inner {
    grid-template-columns: 1fr 1fr;
  }

  .site-footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 32rem) {
  .site-footer__inner {
    grid-template-columns: 1fr;
  }
}
</style>
