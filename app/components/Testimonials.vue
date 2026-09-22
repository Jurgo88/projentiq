<script setup lang="ts">
const { t } = useI18n()
const { target, pending } = useReveal()

interface Testimonial {
  quote: string
  name: string
  company: string
  result: string
}

// TODO: po prvých reálnych referenciách sem doplniť záznamy.
// NEVYMÝŠĽAŤ citáty ani mená — kým je pole prázdne, sekcia sa nevykreslí
// (prázdny placeholder oslaboval dôveru aj SEO, issue #51).
const testimonials: Testimonial[] = []
</script>

<template>
  <section v-if="testimonials.length" id="references" class="testimonials">
    <div ref="target" class="testimonials__inner reveal" :class="{ 'reveal--pending': pending }">
      <h2>{{ t('testimonials.title') }}</h2>

      <ul class="testimonials__list">
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
  padding: var(--section-y) 1.5rem;
  background: var(--color-bg);
}

.testimonials__inner {
  max-width: var(--container);
  margin: 0 auto;
}

.testimonials h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 1.5rem;
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
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
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
