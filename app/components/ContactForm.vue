<script setup lang="ts">
const { t } = useI18n()

const form = reactive({
  name: '',
  company: '',
  email: '',
  message: '',
  consent: false,
  botField: ''
})

const errors = reactive<{ name?: string; email?: string; consent?: string }>({})
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function validate() {
  errors.name = form.name.trim() ? undefined : t('contact.error_required')
  errors.email = isValidEmail(form.email) ? undefined : t('contact.error_email')
  errors.consent = form.consent ? undefined : t('contact.error_consent')
  return !errors.name && !errors.email && !errors.consent
}

async function onSubmit() {
  if (form.botField) return

  if (!validate()) return

  status.value = 'sending'

  const body = new URLSearchParams({
    'form-name': 'contact',
    name: form.name,
    company: form.company,
    email: form.email,
    message: form.message
  }).toString()

  try {
    const response = await fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    })

    if (!response.ok) throw new Error('submit failed')
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="demo" class="contact">
    <div class="contact__inner">
      <h2>{{ t('contact.title') }}</h2>
      <p class="contact__lead">{{ t('contact.lead') }}</p>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        novalidate
        class="contact-form"
        @submit.prevent="onSubmit"
      >
        <input type="hidden" name="form-name" value="contact" />

        <p style="display: none">
          <label>
            Don't fill this out if you're human:
            <input v-model="form.botField" name="bot-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
          </label>
        </p>

        <div v-if="status === 'success'" class="contact-form__success" role="status" aria-live="polite">
          <h3>{{ t('contact.success_title') }}</h3>
          <p>{{ t('contact.success_message') }}</p>
        </div>

        <template v-else>
          <div class="contact-form__field">
            <label for="cf-name">{{ t('contact.name_label') }}</label>
            <input
              id="cf-name"
              v-model="form.name"
              name="name"
              type="text"
              required
              autocomplete="name"
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'cf-name-error' : undefined"
            />
            <p v-if="errors.name" id="cf-name-error" class="contact-form__error">{{ errors.name }}</p>
          </div>

          <div class="contact-form__field">
            <label for="cf-company">{{ t('contact.company_label') }}</label>
            <input id="cf-company" v-model="form.company" name="company" type="text" autocomplete="organization" />
          </div>

          <div class="contact-form__field">
            <label for="cf-email">{{ t('contact.email_label') }}</label>
            <input
              id="cf-email"
              v-model="form.email"
              name="email"
              type="email"
              required
              autocomplete="email"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'cf-email-error' : undefined"
            />
            <p v-if="errors.email" id="cf-email-error" class="contact-form__error">{{ errors.email }}</p>
          </div>

          <div class="contact-form__field">
            <label for="cf-message">{{ t('contact.message_label') }}</label>
            <textarea
              id="cf-message"
              v-model="form.message"
              name="message"
              rows="4"
              :placeholder="t('contact.message_placeholder')"
            ></textarea>
          </div>

          <div class="contact-form__field contact-form__field--checkbox">
            <input
              id="cf-consent"
              v-model="form.consent"
              name="consent"
              type="checkbox"
              :aria-invalid="!!errors.consent"
              :aria-describedby="errors.consent ? 'cf-consent-error' : undefined"
            />
            <label for="cf-consent">
              {{ t('contact.consent_pre') }}<a href="#">{{ t('contact.consent_link') }}</a>{{ t('contact.consent_post') }}
            </label>
            <p v-if="errors.consent" id="cf-consent-error" class="contact-form__error">{{ errors.consent }}</p>
          </div>

          <p v-if="status === 'error'" class="contact-form__error contact-form__error--generic" role="alert">
            {{ t('contact.error_generic') }}
          </p>

          <button type="submit" class="btn-primary" :disabled="status === 'sending'">
            {{ status === 'sending' ? t('contact.sending') : t('contact.submit') }}
          </button>
        </template>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: 4rem 1.5rem;
}

.contact__inner {
  max-width: 32rem;
  margin: 0 auto;
}

.contact h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 0.5rem;
}

.contact__lead {
  margin: 0 0 2rem;
  color: var(--color-text-muted);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contact-form__field label {
  font-size: 0.9rem;
  font-weight: 600;
}

.contact-form__field input[type='text'],
.contact-form__field input[type='email'],
.contact-form__field textarea {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  color: var(--color-text);
  font-size: 0.95rem;
  font-family: inherit;
}

.contact-form__field input[aria-invalid='true'],
.contact-form__field textarea[aria-invalid='true'] {
  border-color: #e5484d;
}

.contact-form__field--checkbox {
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.contact-form__field--checkbox label {
  font-weight: 400;
  font-size: 0.85rem;
}

.contact-form__error {
  margin: 0;
  color: #e5484d;
  font-size: 0.8rem;
}

.contact-form__error--generic {
  font-size: 0.9rem;
}

.contact-form__success h3 {
  margin: 0 0 0.5rem;
}

.contact-form__success p {
  margin: 0;
  color: var(--color-text-muted);
}

.contact-form button[type='submit'] {
  align-self: flex-start;
  border: none;
  cursor: pointer;
}

.contact-form button[type='submit']:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
