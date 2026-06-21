<script setup lang="ts">
// TODO: trust_strip.item_2 (CS) hovorí len všeobecne "QR kód na účtenkách" —
// SK verzia menuje konkrétny systém eKasa, pre CZ trh treba overiť s
// marketérom, či existuje priamy ekvivalent na pomenovanie (napr. EET
// nahradenie po roku 2023), aby štítok zostal rovnako konkrétny.
const { t } = useI18n()

const items = [1, 2, 3, 4, 5]
</script>

<template>
  <section class="trust-strip">
    <ul class="trust-strip__list">
      <li v-for="item in items" :key="item" class="trust-strip__item">
        {{ t(`trust_strip.item_${item}`) }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.trust-strip {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.trust-strip__list {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 2rem;
}

.trust-strip__item {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}
</style>
