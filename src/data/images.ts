// GENERADO por tools/gen_manifest.py — no editar a mano.
// Manifiesto de los assets originales de Fusion Burger ya optimizados a WebP.

export interface ImageAsset {
  /** ruta dentro de /assets, sin extensión */
  path: string
  /** ancho intrínseco del archivo base */
  w: number
  /** alto intrínseco del archivo base */
  h: number
  /** anchos disponibles para el srcset */
  widths: readonly number[]
  /** true si el WebP es animado: no se le aplica srcset */
  animated?: boolean
}

export const IMAGES = {
  'american-burger': { path: 'burgers/american-burger', w: 1080, h: 688, widths: [420, 720, 1080] },
  'baby-chicken': { path: 'kids/baby-chicken', w: 956, h: 796, widths: [420, 720, 956] },
  'batatas-fusion': { path: 'starters/batatas-fusion', w: 1044, h: 770, widths: [420, 720, 1044] },
  'crispy-burger': { path: 'burgers/crispy-burger', w: 1080, h: 831, widths: [420, 720, 1080] },
  'delicias-baby': { path: 'kids/delicias-baby', w: 898, h: 623, widths: [420, 720, 898] },
  'delicias-de-pollo': { path: 'starters/delicias-de-pollo', w: 961, h: 658, widths: [420, 720, 961] },
  'ensalada-cesar': { path: 'starters/ensalada-cesar', w: 870, h: 870, widths: [420, 720, 870] },
  'fusion-baby': { path: 'kids/fusion-baby', w: 1035, h: 759, widths: [420, 720, 1035] },
  'garbanzos-zanahoria': { path: 'veggie/garbanzos-zanahoria', w: 817, h: 921, widths: [420, 720, 817] },
  'guayaba-burger': { path: 'burgers/guayaba-burger', w: 993, h: 838, widths: [420, 720, 993] },
  'guayota-burger': { path: 'burgers/guayota-burger', w: 1038, h: 1032, widths: [420, 720, 1038] },
  'hero-burger': { path: 'hero/hero-burger', w: 964, h: 1014, widths: [420, 720, 964] },
  'hot-cheddar-burger': { path: 'burgers/hot-cheddar-burger', w: 942, h: 1080, widths: [420, 720, 942], animated: true },
  'la-cecina': { path: 'burgers/la-cecina', w: 983, h: 953, widths: [420, 720, 983] },
  'la-trufada': { path: 'burgers/la-trufada', w: 1080, h: 1069, widths: [420, 720, 1080], animated: true },
  'logo': { path: 'brand/logo', w: 1033, h: 702, widths: [420, 720, 1033] },
  'logo-square': { path: 'brand/logo-square', w: 447, h: 447, widths: [420, 447] },
  'mascot': { path: 'brand/mascot', w: 589, h: 600, widths: [589] },
  'mexican-burger': { path: 'burgers/mexican-burger', w: 997, h: 844, widths: [420, 720, 997] },
  'nachos-fusion': { path: 'starters/nachos-fusion', w: 1072, h: 712, widths: [420, 720, 1072] },
  'oklahoma-burger': { path: 'burgers/oklahoma-burger', w: 504, h: 390, widths: [420, 504] },
  'original-fusion': { path: 'burgers/original-fusion', w: 974, h: 755, widths: [420, 720, 974] },
  'papas-cheddar-bacon': { path: 'starters/papas-cheddar-bacon', w: 1054, h: 491, widths: [420, 720, 1054] },
  'papas-trufadas': { path: 'starters/papas-trufadas', w: 1063, h: 594, widths: [420, 720, 1063] },
  'peppibacon': { path: 'burgers/peppibacon', w: 975, h: 721, widths: [420, 720, 975] },
  'porky-burger': { path: 'burgers/porky-burger', w: 1005, h: 945, widths: [420, 720, 1005] },
  'promo-almuerzos': { path: 'brand/promo-almuerzos', w: 1080, h: 1350, widths: [420, 720, 1080] },
  'remolacha-burger': { path: 'veggie/remolacha-burger', w: 985, h: 859, widths: [420, 720, 985] },
  'rulo-de-cabra': { path: 'burgers/rulo-de-cabra', w: 971, h: 894, widths: [420, 720, 971] },
  'santa-burger': { path: 'burgers/santa-burger', w: 1051, h: 756, widths: [420, 720, 1051] },
  'saoko-burger': { path: 'burgers/saoko-burger', w: 806, h: 783, widths: [420, 720, 806] },
  'smoked-burger': { path: 'burgers/smoked-burger', w: 951, h: 809, widths: [420, 720, 951] },
  'tacos-don-carmelo': { path: 'starters/tacos-don-carmelo', w: 963, h: 613, widths: [420, 720, 963] },
  'tarta-de-queso': { path: 'desserts/tarta-de-queso', w: 1024, h: 617, widths: [420, 720, 1024] },
  'tarta-de-queso-chocolate': { path: 'desserts/tarta-de-queso-chocolate', w: 1080, h: 958, widths: [420, 720, 1080] },
  'tarta-de-queso-lotus': { path: 'desserts/tarta-de-queso-lotus', w: 1024, h: 639, widths: [420, 720, 1024] },
  'tarta-de-queso-pistacho': { path: 'desserts/tarta-de-queso-pistacho', w: 1080, h: 943, widths: [420, 720, 1080] },
  'tequenos': { path: 'starters/tequenos', w: 991, h: 828, widths: [420, 720, 991] },
} satisfies Record<string, ImageAsset>

export type ImageId = keyof typeof IMAGES
