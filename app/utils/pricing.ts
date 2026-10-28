// Cenník (EUR, konečné ceny — AJRONIK s.r.o. nie je platiteľom DPH) — jediný zdroj pre karty na homepage, JSON-LD
// a landing pages. Podklad: prieskum trhu SK/CZ, september 2026.
// public/llms.txt je statický — pri zmene cien ho uprav ručne.
// id = products.card_<id>_* v prekladoch.
export const PRICING = {
  currency: 'EUR',
  pilot: 490,
  services: [
    { id: 3, setup: 990, monthly: 79 }, // Automatizácia jedného jasne ohraničeného procesu
    { id: 2, setup: 1490, monthly: 99 }, // Znalostný systém nad dohodnutým zdrojom dokumentov
    { id: 1, setup: 2500, monthly: 199 } // AI agent pre jeden pracovný proces
  ]
} as const

// JSON-LD ponuky služby (úvodná stránka aj stránky služieb): zákazník si
// vyberie jednorazovú implementáciu alebo mesačný poplatok. Konečné ceny —
// neplatiteľ DPH, preto bez valueAddedTaxIncluded.
export function serviceOffers(setup: number, monthly: number) {
  const currency = PRICING.currency
  return [
    { '@type': 'Offer', description: 'One-time implementation, from', price: setup, priceCurrency: currency },
    {
      '@type': 'Offer',
      description: 'Monthly fee, from',
      price: monthly,
      priceCurrency: currency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: monthly,
        priceCurrency: currency,
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' }
      }
    }
  ]
}

export function servicePrice(id: number) {
  return PRICING.services.find((s) => s.id === id)
}
