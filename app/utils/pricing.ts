// Cenník (EUR, konečné ceny — AJRONIK s.r.o. nie je platiteľom DPH) — jediný zdroj pre karty na homepage, JSON-LD
// a landing pages. Podklad: prieskum trhu SK/CZ, september 2026.
// id = products.card_<id>_* v prekladoch.
export const PRICING = {
  currency: 'EUR',
  pilot: 990,
  services: [
    { id: 3, setup: 2500, monthly: 149 }, // Automatizácia procesov / dokladov — vstupný produkt
    { id: 2, setup: 3500, monthly: 199 }, // RAG znalostné systémy
    { id: 1, setup: 5000, monthly: 290 } // AI agenti na mieru
  ]
} as const

export function servicePrice(id: number) {
  return PRICING.services.find((s) => s.id === id)
}
