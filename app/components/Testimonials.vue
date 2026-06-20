<script setup lang="ts">
const { t } = useI18n()

interface Testimonial {
  quote: string
  name: string
  company: string
  result: string
}

// TODO: po prvých reálnych referenciách sem doplniť záznamy.
// NEVYMÝŠĽAŤ citáty ani mená — kým je pole prázdne, sekcia zobrazuje
// placeholder text (spec časť 6, bod 6).
const testimonials: Testimonial[] = []
</script>

<template>
  <section id="references" class="testimonials">
    <div class="testimonials__inner">
      <h2>{{ t('nav.references') }}</h2>

      <p v-if="testimonials.length === 0" class="testimonials__placeholder">
        {{ t('testimonials.coming_soon') }}
      </p>

      <ul v-else class="testimonials__list">
        <li v-for="(item, i) in testimonials" :key="i" class="testimonials__card">
          <blockquote>{{ item.quote }}</blockquote>
          <p class="testimonials__author">{{ item.name }} — {{ item.company }}</p>
          <p class="testimonials__result">{{ item.result }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  padding: 4rem 1.5rem;
}

.testimonials__inner {
  max-width: 72rem;
  margin: 0 auto;
}

.testimonials h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 1.5rem;
}

.testimonials__placeholder {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.testimonials__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.testimonials__card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
}

.testimonials__card blockquote {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
}

.testimonials__author {
  margin: 0;
  font-weight: 600;
  font-size: 0.85rem;
}

.testimonials__result {
  margin: 0.25rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}
</style>
