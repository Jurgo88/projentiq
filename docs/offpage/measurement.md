# Meranie a mesačný report (#63)

Search Console, Bing Webmaster Tools a GA4 bežia. Udalosť `generate_lead`
sa posiela pri odoslaní kontaktného formulára.

## 1. Jednorazovo

- [ ] GA4: Admin, Udalosti: označiť `generate_lead` ako **kľúčovú udalosť**
- [ ] GA4: prepojiť so Search Console (Admin, Prepojenia s produktmi). V GA4 sa potom zobrazia dotazy pri vstupných stránkach.

## 2. Sledované frázy

Kandidáti na sledovanie, každá fráza s cieľovou stránkou. Hľadanosť
over v Marketing Mineri alebo v Google Keyword Planneri a frázy bez
hľadanosti vyhoď.

| # | Fráza | Cieľová stránka |
|---|---|---|
| 1 | automatizácia faktúr | /sk/automatizacia-faktur/ |
| 2 | automatické spracovanie faktúr | /sk/automatizacia-faktur/ |
| 3 | vyťaženie údajov z faktúr | /sk/automatizacia-faktur/ |
| 4 | skenovanie faktúr do pohody | /sk/automatizacia-faktur/ |
| 5 | import faktúr do pohody | blog: automatické spracovanie do Pohody |
| 6 | pohoda xml import faktúr | /sk/integracie/ |
| 7 | omega import faktúr | /sk/integracie/ |
| 8 | idoklad api | /sk/integracie/ |
| 9 | digitalizácia faktúr | /sk/automatizacia-faktur/ |
| 10 | e-faktúra 2027 | blog: povinná e-faktúra |
| 11 | povinná elektronická fakturácia | blog: povinná e-faktúra |
| 12 | e-faktúra neplatiteľ dph | blog: povinná e-faktúra |
| 13 | ai chatbot pre firmy | /sk/ai-chatbot-pre-firmy/ |
| 14 | chatbot nad firemnými dokumentmi | /sk/ai-chatbot-pre-firmy/ |
| 15 | rag chatbot | /sk/ai-chatbot-pre-firmy/ |
| 16 | ai agenti pre firmy | /sk/ai-agenti/ |
| 17 | ai automatizácia procesov | /sk/ |
| 18 | ai pre malé firmy | /sk/ |
| 19 | kalkulačka nákladov na faktúry | /sk/kalkulacka-nakladov-na-faktury/ |
| 20 | projentiq | /sk/ (značkové hľadanie) |

České ekvivalenty (automatizace faktur, e-faktura, AI chatbot pro firmy)
pridaj, keď začneš cieliť na Česko.

**Nástroj:**

- **Zadarmo:** Search Console, Výkon, filter dotazu. Ukazuje priemernú pozíciu pre frázy, pri ktorých má web aspoň nejaké zobrazenia. Na začiatok stačí.
- **Platený:** Marketing Miner (silný pre SK a CZ), SE Ranking alebo Semrush. Oplatí sa, keď väčšina fráz začne mať zobrazenia a treba sledovať aj konkurenciu.

## 3. Mesačný report

Vždy prvý pracovný deň v mesiaci, za predchádzajúci kalendárny mesiac,
s porovnaním s mesiacom pred ním. Kópiu šablóny vlož ako komentár do #63
alebo do `docs/offpage/reports/RRRR-MM.md`.

```markdown
## Report RRRR-MM

### Search Console (web, všetky krajiny)
| | tento mesiac | minulý mesiac |
|---|---|---|
| Kliknutia | | |
| Zobrazenia | | |
| Priemerná pozícia | | |

Top 5 dotazov podľa kliknutí:
Top 5 stránok podľa zobrazení:
Nové dotazy v top 20:

### Sledované frázy
| Fráza | pozícia | zmena |
|---|---|---|

### GA4
| | tento mesiac | minulý mesiac |
|---|---|---|
| Návštevy z organického vyhľadávania | | |
| generate_lead spolu | | |
| generate_lead z organického vyhľadávania | | |

### Spätné odkazy
Nové odkazy (docs/offpage/backlinks.md):

### Core Web Vitals (Search Console, Používateľský dojem)
Mobil: dobré / potrebuje zlepšenie / slabé URL

### Čo ďalej
-
```

Report ti môžem pripravovať. Stačí mi poslať export z Search Console
(Výkon, Exportovať, CSV) a čísla z GA4.
