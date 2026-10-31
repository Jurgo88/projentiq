// Prevádzkovateľ webu a značky ProjentIQ — údaje z Obchodného registra SR.
// Používa pätička, stránka ochrany osobných údajov aj JSON-LD.
export const COMPANY = {
  brand: 'ProjentIQ',
  legalName: 'AJRONIK s.r.o.',
  ico: '55304052',
  dic: '2121943153',
  street: 'Clementisova 1997/11',
  postalCode: '955 01',
  city: 'Topoľčany',
  country: 'SK',
  // kde reálne pôsobíme; city vyššie je sídlo z registra, nemeniť bez zmeny v OR
  baseCity: 'Bratislava',
  register: 'Obchodný register Okresného súdu Nitra, oddiel Sro, vložka č. 59882/N',
  email: 'info@projentiq.com',
  // pätička a sameAs v JSON-LD
  linkedin: 'https://www.linkedin.com/company/projentiq/',
  facebook: 'https://www.facebook.com/projentiq/',
  // kontaktná osoba pri formulári (ContactForm)
  contactPerson: 'Juraj Paluš'
} as const
