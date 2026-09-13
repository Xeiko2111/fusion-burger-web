import type { L } from './menu'

/**
 * ÚNICO PUNTO DE EDICIÓN de los datos del negocio.
 *
 * Procedencia de cada dato:
 *  - Direcciones, teléfono y redes: fichas públicas del negocio y perfil oficial
 *    de Instagram (@fusion_burger_tenerife).
 *  - Promoción de almuerzos: fusionburgertenerife.es
 *  - Formulario de empleo: enlace publicado en la propia web.
 *
 * ⚠ PENDIENTE DE CONFIRMAR CON EL CLIENTE ANTES DE PUBLICAR:
 *    · Los horarios (`hours`) provienen de fichas de terceros y no coinciden
 *      entre sí. Confírmalos y actualízalos también en el JSON-LD de index.html.
 *    · Instagram indica 4 locales en Tenerife; aquí solo hay dos direcciones
 *      verificadas. Añade los que falten en `LOCATIONS`.
 */

export interface Location {
  id: string
  name: string
  area: L
  address: string
  postcode: string
  city: string
  mapsUrl: string
  hours: { days: L; time: string }[]
}

export const LOCATIONS: Location[] = [
  {
    id: 'barranco-grande',
    name: 'Barranco Grande',
    area: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
    address: 'Carretera General del Sur 53A (TF-28)',
    postcode: '38107',
    city: 'Santa Cruz de Tenerife',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Fusion%20Burger%20Carretera%20General%20del%20Sur%2053A%20Santa%20Cruz%20de%20Tenerife',
    hours: [
      { days: { es: 'Miércoles a domingo', en: 'Wednesday to Sunday' }, time: '13:30 – 16:30' },
      { days: { es: 'Miércoles a domingo', en: 'Wednesday to Sunday' }, time: '19:30 – 23:00' },
    ],
  },
  {
    id: 'caletillas',
    name: 'Caletillas',
    area: { es: 'Candelaria', en: 'Candelaria' },
    address: 'Avenida Marítima 33',
    postcode: '38530',
    city: 'Candelaria',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Fusion%20Burger%20Caletillas%20Avenida%20Maritima%2033%20Candelaria',
    hours: [
      { days: { es: 'Miércoles a domingo', en: 'Wednesday to Sunday' }, time: '13:30 – 16:30' },
      { days: { es: 'Miércoles a domingo', en: 'Wednesday to Sunday' }, time: '19:30 – 23:00' },
    ],
  },
]

export const CONTACT = {
  phone: '+34 922 61 81 33',
  phoneHref: 'tel:+34922618133',
  instagram: 'https://www.instagram.com/fusion_burger_tenerife/',
  instagramHandle: '@fusion_burger_tenerife',
  tiktok: 'https://www.tiktok.com/@fusion_burger_tenerife',
  jobsForm:
    'https://docs.google.com/forms/d/1hMcRZDV5lrYP4Gz6nW4YA6uSDYm5bHAsAPSpVm7Vz34/viewform',
  deliveryPartners: ['Glovo', 'Uber Eats'],
  locationCount: 4,
}

/** Promoción real publicada en la web actual. */
export const PROMO = {
  price: 14.9,
  title: { es: 'Menú de almuerzos', en: 'Lunch menu' },
  what: {
    es: 'Una burger de la carta, bebida y postre del día.',
    en: 'Any burger from the menu, a drink and the dessert of the day.',
  },
  terms: {
    es: 'Solo en sala, de lunes a viernes de 13:30 a 16:25. No válido en festivos. La Chossburger no entra en la promo.',
    en: 'Dine-in only, Monday to Friday from 13:30 to 16:25. Not valid on public holidays. Chossburger is not included.',
  },
}

/** Cifras del producto. Todas salen de las descripciones reales de la carta. */
export const FACTS: { value: number; unit: string; label: L }[] = [
  {
    value: 160,
    unit: 'g',
    label: { es: 'de doble semismash de vaca premium', en: 'of premium beef double semi-smash' },
  },
  {
    value: 180,
    unit: 'g',
    label: { es: 'de medallón entero en las burgers grandes', en: 'whole medallion in the big burgers' },
  },
  {
    value: 12,
    unit: 'h',
    label: { es: 'de marinado para el pollo crispy', en: 'marinating the crispy chicken' },
  },
  {
    value: 9,
    unit: '',
    label: { es: 'salsas hechas en casa', en: 'sauces made in house' },
  },
]

export const NAV: { id: string; label: L }[] = [
  { id: 'inicio', label: { es: 'Inicio', en: 'Home' } },
  { id: 'marca', label: { es: 'La marca', en: 'The brand' } },
  { id: 'burgers', label: { es: 'Las burgers', en: 'The burgers' } },
  { id: 'destacada', label: { es: 'Destacada', en: 'Featured' } },
  { id: 'producto', label: { es: 'El producto', en: 'The product' } },
  { id: 'carta', label: { es: 'La carta', en: 'The menu' } },
  { id: 'locales', label: { es: 'Locales', en: 'Find us' } },
]

/** Todo el texto de interfaz vive aquí para poder revisarlo de una sentada. */
export const COPY = {
  tagline: { es: 'Feel the Fusion', en: 'Feel the Fusion' },
  heroLine1: { es: 'Feel', en: 'Feel' },
  heroLine2: { es: 'the', en: 'the' },
  heroLine3: { es: 'Fusion', en: 'Fusion' },
  heroSub: {
    es: 'Hamburguesas gourmet artesanales en Tenerife.',
    en: 'Handmade gourmet burgers in Tenerife.',
  },
  heroScroll: { es: 'Baja para verlas', en: 'Scroll to see them' },
  viewMenu: { es: 'Ver la carta', en: 'See the menu' },
  findUs: { es: 'Cómo llegar', en: 'How to find us' },
  call: { es: 'Llamar', en: 'Call' },
  openMenu: { es: 'Abrir menú', en: 'Open menu' },
  closeMenu: { es: 'Cerrar menú', en: 'Close menu' },
  brandTitle: { es: 'Más que una burger', en: 'More than a burger' },
  brandBody: {
    es: 'Fusionamos los sabores y el producto de la isla con la forma más típica de la comida americana. Doble semismash de vaca premium, pan brioche artesanal y salsas que hacemos aquí, cada día. Eso es todo el secreto.',
    en: 'We fuse the flavours and produce of the island with the most classic side of American food. Premium beef double semi-smash, artisan brioche and sauces we make here, every day. That is the whole secret.',
  },
  awardsTitle: { es: 'Lo que dicen los premios', en: 'What the awards say' },
  showcaseTitle: { es: 'Las burgers', en: 'The burgers' },
  showcaseHint: { es: 'Arrastra o sigue bajando', en: 'Drag or keep scrolling' },
  featuredEyebrow: { es: 'La más pedida', en: 'The one everyone orders' },
  factsTitle: { es: 'El producto', en: 'The product' },
  menuTitle: { es: 'La carta', en: 'The menu' },
  menuHint: {
    es: 'Pasa el cursor por un plato para verlo',
    en: 'Hover a dish to see it',
  },
  menuHintTouch: { es: 'Toca un plato para ver la foto', en: 'Tap a dish for the photo' },
  locationsTitle: { es: 'Dónde estamos', en: 'Come find us' },
  deliveryNote: {
    es: 'También llegamos a tu casa con Glovo y Uber Eats.',
    en: 'We also deliver with Glovo and Uber Eats.',
  },
  ctaTitle: { es: 'Te esperamos con hambre', en: 'Bring your appetite' },
  jobs: { es: 'Trabaja con nosotros', en: 'Work with us' },
  legal: { es: 'Aviso legal y privacidad', en: 'Legal notice and privacy' },
  langLabel: { es: 'Idioma', en: 'Language' },
  from: { es: 'desde', en: 'from' },
  burgersInMenu: { es: 'burgers en carta', en: 'burgers on the menu' },
  locationsInTenerife: { es: 'locales en Tenerife', en: 'locations in Tenerife' },
}

/**
 * Selección para el showcase horizontal. La carta completa vive en la sección
 * «La carta»: aquí solo van las que aguantan una pantalla entera, empezando por
 * la clásica y cerrando con las premiadas. Edita el orden o añade ids sin tocar
 * el componente.
 */
export const SHOWCASE_IDS = [
  'original-fusion',
  'american-burger',
  'mexican-burger',
  'la-trufada',
  'la-cecina',
  'guayota-burger',
  'smoked-burger',
] as const
