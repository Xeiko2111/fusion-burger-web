import type { ImageId } from './images'

export type Locale = 'es' | 'en'
export type L = Record<Locale, string>
export type LList = Record<Locale, string[]>

export interface MenuItem {
  id: string
  name: L
  tagline?: L
  desc?: L
  price: number
  image?: ImageId
  ingredients?: LList
  award?: L
  choice?: L
}

export interface MenuCategory {
  id: string
  label: L
  note?: L
  items: MenuItem[]
}

const FRIES: L = {
  es: 'Todas incluyen papas naturales. Puedes cambiarlas por batatas fritas por 1,50 € más.',
  en: 'All served with fresh chips. Swap for sweet potato fries for €1.50 more.',
}

export const STARTERS: MenuCategory = {
  id: 'starters',
  label: { es: 'Para abrir boca', en: 'Starters' },
  items: [
    {
      id: 'tequenos',
      name: { es: 'Tequeños', en: 'Tequeños' },
      tagline: { es: '¡Están brutales chamo!', en: 'These are unreal, chamo!' },
      desc: {
        es: '5 unidades de tequeños crujientes, acompañados de una sorprendente salsa de arándanos.',
        en: '5 crispy tequeños, served with a delightful blueberry sauce.',
      },
      price: 7.5,
      image: 'tequenos',
    },
    {
      id: 'nachos-fusion',
      name: { es: 'Nachos Fusion', en: 'Nachos Fusion' },
      tagline: { es: '¡El plato perfecto para compartir!', en: 'The perfect dish to share!' },
      desc: {
        es: 'Nuestra generosa porción de nachos caseros, cubierta de queso cheddar fundido, guacamole, pico de gallo, pulled pork, salsa agria y jalapeños (opcional).',
        en: 'A generous portion of homemade nachos topped with melted cheddar, guacamole, pico de gallo, pulled pork, sour cream and jalapeños (optional).',
      },
      price: 9.9,
      image: 'nachos-fusion',
    },
    {
      id: 'papas-trufadas',
      name: { es: 'Papas Trufadas', en: 'Papas Trufadas' },
      tagline: { es: '¡Para los amantes de la trufa!', en: 'For truffle lovers!' },
      desc: {
        es: 'Disfruta de la combinación perfecta de papas naturales, salsa trufa, perejil fresco y parmesano en cada bocado.',
        en: 'The perfect combination of natural potatoes, truffle sauce, fresh parsley and Parmesan in every bite.',
      },
      price: 7.9,
      image: 'papas-trufadas',
    },
    {
      id: 'batatas-fusion',
      name: { es: 'Batatas Fusion', en: 'Batatas Fusion' },
      tagline: { es: 'Para los #TeamBatata', en: 'For the #TeamBatata' },
      desc: {
        es: 'Deliciosa batata crujiente acompañada de nuestra salsa Original Fusion, un toque de cebollino y millos tostados.',
        en: 'Crispy sweet potato served with our Original Fusion sauce, a touch of chives and toasted corn.',
      },
      price: 7.9,
      image: 'batatas-fusion',
    },
    {
      id: 'papas-cheddarbacon',
      name: { es: 'Papas CheddarBacon', en: 'Papas CheddarBacon' },
      tagline: { es: '¡Que te chorreas un fisco!', en: 'Messy in the best way.' },
      desc: {
        es: 'Nuestras deliciosas papas naturales bañadas en cheddar fundido, un toque de cebollino, con un delicioso topping de bacon crujiente triturado que te conquistará en cada bocado.',
        en: 'Fresh-cut chips smothered in melted cheddar with a hint of chives and a topping of crispy chopped bacon.',
      },
      price: 7.5,
      image: 'papas-cheddar-bacon',
    },
    {
      id: 'tacos-don-carmelo',
      name: { es: 'Tacos Don Carmelo', en: 'Tacos Don Carmelo' },
      tagline: { es: '¿Un par de taquitos o qué?', en: 'A couple of tacos, then?' },
      desc: {
        es: 'Deliciosa tortilla de maíz crocante, rellena de guacamole fresco, pico de gallo, pulled pork y queso cheddar fundido con un toque de cebollino. 2 unidades.',
        en: 'Crispy corn tortilla filled with fresh guacamole, pico de gallo, pulled pork and melted cheddar cheese. 2 units.',
      },
      price: 7.5,
      image: 'tacos-don-carmelo',
    },
    {
      id: 'delicias-de-pollo',
      name: { es: 'Delicias de pollo', en: 'Delicias de pollo' },
      desc: {
        es: 'Trozos de pollo bañados en una rica salsa agridulce, adornados con sésamo y cebollino fresco. ¡Un clásico asiático con nuestro toque fusion!',
        en: 'Chunks of chicken coated in a sweet-and-sour sauce, garnished with sesame seeds and fresh chives. An Asian classic with our own fusion twist.',
      },
      price: 8.9,
      image: 'delicias-de-pollo',
    },
    {
      id: 'ensalada-cesar',
      name: { es: 'Ensalada César', en: 'Ensalada César' },
      desc: {
        es: 'Lechugas frescas, picatostes, tomate cherry, bacon, pollo crispy, queso parmesano y nuestro aderezo César clásico.',
        en: 'Fresh lettuce, crunchy croutons, cherry tomatoes, crispy bacon, crispy chicken, Parmesan and our classic Caesar dressing.',
      },
      price: 10.9,
      image: 'ensalada-cesar',
    },
  ],
}

export const BURGERS: MenuCategory = {
  id: 'burgers',
  label: { es: 'Burgers', en: 'Burgers' },
  note: FRIES,
  items: [
    {
      id: 'original-fusion',
      name: { es: 'Original Fusion', en: 'Original Fusion' },
      tagline: { es: '¡La de toda la vida! pero mejor…', en: 'The one you know. Only better.' },
      desc: {
        es: 'Doble semismash de vaca premium (160g), queso cheddar americano, cebolla morada, tomate, lechuga, salsa Original Fusion y nuestro pan brioche.',
        en: 'Premium beef double semi-smash (160g) with American cheddar, onion, tomato, lettuce, Original Fusion sauce and our brioche bun.',
      },
      price: 12.9,
      image: 'original-fusion',
      ingredients: {
        es: ['160g vaca premium', 'Cheddar americano', 'Cebolla morada', 'Tomate', 'Lechuga', 'Salsa Original Fusion', 'Pan brioche'],
        en: ['160g premium beef', 'American cheddar', 'Red onion', 'Tomato', 'Lettuce', 'Original Fusion sauce', 'Brioche bun'],
      },
    },
    {
      id: 'crispy-burger',
      name: { es: 'Crispy Burger', en: 'Crispy Burger' },
      desc: {
        es: 'Pollo crujiente marinado 12h, queso cheddar americano, cebolla morada, tomate, lechuga y salsa Original Fusion en nuestro pan brioche.',
        en: 'Crispy chicken marinated for 12 hours, American cheddar, onion, tomato, lettuce and Original Fusion sauce on our brioche bun.',
      },
      price: 12.9,
      image: 'crispy-burger',
      ingredients: {
        es: ['Pollo marinado 12h', 'Cheddar americano', 'Cebolla morada', 'Tomate', 'Lechuga', 'Salsa Original Fusion', 'Pan brioche'],
        en: ['12h marinated chicken', 'American cheddar', 'Red onion', 'Tomato', 'Lettuce', 'Original Fusion sauce', 'Brioche bun'],
      },
    },
    {
      id: 'peppibacon',
      name: { es: 'PeppiBacon', en: 'PeppiBacon' },
      desc: {
        es: 'Doble semismash de vaca premium (160g), queso cheddar americano, bacon crispy, pepinillos agridulces y salsa Original Fusion en nuestro pan brioche.',
        en: 'Premium beef double semi-smash (160g), American cheddar, crispy bacon, sweet-and-sour gherkins and Original Fusion sauce on our brioche bun.',
      },
      price: 12.9,
      image: 'peppibacon',
      ingredients: {
        es: ['160g vaca premium', 'Cheddar americano', 'Bacon crispy', 'Pepinillos agridulces', 'Salsa Original Fusion', 'Pan brioche'],
        en: ['160g premium beef', 'American cheddar', 'Crispy bacon', 'Sweet-and-sour gherkins', 'Original Fusion sauce', 'Brioche bun'],
      },
    },
    {
      id: 'oklahoma-burger',
      name: { es: 'Oklahoma Burger', en: 'Oklahoma Burger' },
      tagline: { es: 'Oklahoma versión Fusion', en: 'Oklahoma, Fusion style' },
      desc: {
        es: 'Doble semismash de vaca premium (160g) prensada sobre una cama de cebolla blanca especiada hasta lograr una costra crujiente y caramelizada, queso cheddar clásico y el toque rústico del gouda ahumado, terminada con nuestra salsa Thousand Island en pan brioche.',
        en: 'Double semi-smash premium beef (160g) pressed onto seasoned white onion until crispy and caramelised, classic cheddar, smoked Gouda and Thousand Island dressing on brioche.',
      },
      price: 12.9,
      image: 'oklahoma-burger',
      ingredients: {
        es: ['160g vaca premium', 'Cebolla blanca especiada', 'Cheddar clásico', 'Gouda ahumado', 'Thousand Island', 'Pan brioche'],
        en: ['160g premium beef', 'Seasoned white onion', 'Classic cheddar', 'Smoked Gouda', 'Thousand Island', 'Brioche bun'],
      },
    },
    {
      id: 'american-burger',
      name: { es: 'American Burger', en: 'American Burger' },
      tagline: { es: '¡Al puro estilo americano!', en: 'Pure American style.' },
      desc: {
        es: 'Doble semismash de vaca premium (160g), queso cheddar, huevo frito, bacon crujiente, cebolla frita y salsa Original Fusion en nuestro pan brioche.',
        en: 'Premium double beef patty (160g), cheddar, fried egg, crispy bacon, fried onions and Original Fusion sauce on our brioche bun.',
      },
      price: 13.9,
      image: 'american-burger',
      ingredients: {
        es: ['160g vaca premium', 'Cheddar', 'Huevo frito', 'Bacon crujiente', 'Cebolla frita', 'Salsa Original Fusion', 'Pan brioche'],
        en: ['160g premium beef', 'Cheddar', 'Fried egg', 'Crispy bacon', 'Fried onions', 'Original Fusion sauce', 'Brioche bun'],
      },
    },
    {
      id: 'rulo-de-cabra',
      name: { es: 'Rulo de Cabra', en: 'Rulo de Cabra' },
      tagline: { es: '¡En la simpleza está la perfección!', en: 'Perfection lives in simplicity.' },
      desc: {
        es: 'Doble semismash de vaca premium (160g), rulo de cabra, cebolla caramelizada, tomate, rúcula y salsa Original Fusion en nuestro pan brioche.',
        en: "Premium double beef semi-smash (160g), goat's cheese roll, caramelised onion, tomato, rocket and Original Fusion sauce on our brioche bun.",
      },
      price: 13.9,
      image: 'rulo-de-cabra',
      ingredients: {
        es: ['160g vaca premium', 'Rulo de cabra', 'Cebolla caramelizada', 'Tomate', 'Rúcula', 'Salsa Original Fusion', 'Pan brioche'],
        en: ['160g premium beef', "Goat's cheese roll", 'Caramelised onion', 'Tomato', 'Rocket', 'Original Fusion sauce', 'Brioche bun'],
      },
    },
    {
      id: 'guayaba-burger',
      name: { es: 'Guayaba Burger', en: 'Guayaba Burger' },
      tagline: { es: 'Buena Fusion entre salado y dulce.', en: 'A great blend of savoury and sweet.' },
      choice: { es: 'Elige tu carne: semismash o pollo crispy', en: 'Choose your protein: semi-smash or crispy chicken' },
      desc: {
        es: 'Doble semismash de vaca premium (160g), dulce de guayabo, rulo de cabra, rúcula y salsa Original Fusion.',
        en: "Premium beef double semi-smash (160g) with guava jam, goat's cheese roll, rocket and Original Fusion sauce.",
      },
      price: 12.9,
      image: 'guayaba-burger',
      ingredients: {
        es: ['160g vaca premium', 'Dulce de guayabo', 'Rulo de cabra', 'Rúcula', 'Salsa Original Fusion', 'Pan brioche'],
        en: ['160g premium beef', 'Guava jam', "Goat's cheese roll", 'Rocket', 'Original Fusion sauce', 'Brioche bun'],
      },
    },
    {
      id: 'mexican-burger',
      name: { es: 'Mexican Burger', en: 'Mexican Burger' },
      tagline: { es: '¡Qué chingona!', en: 'Qué chingona!' },
      desc: {
        es: 'Doble semismash de vaca premium (160g), queso cheddar, guacamole fresco, pico de gallo, pulled pork, nachos triturados, cheddar fundido, jalapeños (opcional) y salsa Original Fusion en nuestro pan brioche.',
        en: 'Premium beef double semi-smash (160g) with cheddar, fresh guacamole, pico de gallo, pulled pork, crushed nachos, melted cheddar, jalapeños (optional) and Original Fusion sauce on our brioche bun.',
      },
      price: 14.9,
      image: 'mexican-burger',
      ingredients: {
        es: ['160g vaca premium', 'Guacamole fresco', 'Pico de gallo', 'Pulled pork', 'Nachos triturados', 'Cheddar fundido', 'Jalapeños (opcional)'],
        en: ['160g premium beef', 'Fresh guacamole', 'Pico de gallo', 'Pulled pork', 'Crushed nachos', 'Melted cheddar', 'Jalapeños (optional)'],
      },
    },
    {
      id: 'santa-burger',
      name: { es: 'Santa Burger', en: 'Santa Burger' },
      desc: {
        es: 'Doble semismash de vaca premium (160g) sobre una base de salsa tártara, coronada con queso cheddar americano, cebolla caramelizada, crujiente bacon en lonchas y nuestra inigualable salsa Original Fusion casera en pan brioche.',
        en: 'Premium double beef patty (160g), tartar sauce, American cheddar, caramelised onions, crispy bacon slices and homemade Original Fusion sauce on brioche.',
      },
      price: 13.9,
      image: 'santa-burger',
      ingredients: {
        es: ['160g vaca premium', 'Salsa tártara', 'Cheddar americano', 'Cebolla caramelizada', 'Bacon en lonchas', 'Salsa Original Fusion', 'Pan brioche'],
        en: ['160g premium beef', 'Tartar sauce', 'American cheddar', 'Caramelised onion', 'Bacon slices', 'Original Fusion sauce', 'Brioche bun'],
      },
    },
    {
      id: 'la-cecina',
      name: { es: 'La Cecina', en: 'La Cecina' },
      award: {
        es: '2.º puesto a la Mejor Burger de Santa Cruz de Tenerife en el Burger Fest La Palma',
        en: 'Runner-up for Best Burger in Santa Cruz de Tenerife at Burger Fest La Palma',
      },
      desc: {
        es: 'Pan brioche, salsa mayotrufada, medallón de vaca premium (180g), queso gouda ahumado, mermelada de bacon casera, láminas de cecina curada, caramelo de cecina y un buen toque de bacon crunchy.',
        en: 'Brioche bread, truffle mayonnaise, 180g premium beef, smoked Gouda, homemade bacon jam, cured cecina, cecina caramel and crispy bacon.',
      },
      price: 15.9,
      image: 'la-cecina',
      ingredients: {
        es: ['180g vaca premium', 'Mayotrufada', 'Gouda ahumado', 'Mermelada de bacon', 'Cecina curada', 'Caramelo de cecina', 'Bacon crunchy'],
        en: ['180g premium beef', 'Truffle mayo', 'Smoked Gouda', 'Bacon jam', 'Cured cecina', 'Cecina caramel', 'Crunchy bacon'],
      },
    },
    {
      id: 'saoko-burger',
      name: { es: 'Saoko Burger', en: 'Saoko Burger' },
      desc: {
        es: 'Doble semismash de vaca premium (160g), gouda ahumado que se derrite, nuestra salsa casera Emmy (picante), bacon crunchy, cebolla caramelizada y salsa Original Fusion en la base, sobre pan brioche.',
        en: 'Premium beef double semi-smash (160g), smoked Gouda, homemade Emmy sauce (spicy), crispy bacon, caramelised onions, Original Fusion sauce and brioche.',
      },
      price: 13.9,
      image: 'saoko-burger',
      ingredients: {
        es: ['160g vaca premium', 'Gouda ahumado', 'Salsa Emmy (picante)', 'Bacon crunchy', 'Cebolla caramelizada', 'Salsa Original Fusion'],
        en: ['160g premium beef', 'Smoked Gouda', 'Emmy sauce (spicy)', 'Crunchy bacon', 'Caramelised onion', 'Original Fusion sauce'],
      },
    },
    {
      id: 'chossburger',
      name: { es: 'Chossburger', en: 'Chossburger' },
      desc: {
        es: 'Medallón de vaca premium (180g) acompañado de queso cheddar perfectamente derretido y una cremosa mayonesa de ajo negro. Coronada con mermelada artesanal de chorizo, papas paja crujientes y un sutil topping de polvo de Takis para un final vibrante.',
        en: 'Premium beef medallion (180g) with perfectly melted cheddar and a creamy black garlic mayo. Topped with artisan chorizo jam, crispy straw potatoes and a subtle dusting of Takis powder for a vibrant finish.',
      },
      price: 15.9,
      image: 'hero-burger',
      ingredients: {
        es: ['180g vaca premium', 'Cheddar fundido', 'Mayonesa de ajo negro', 'Mermelada de chorizo', 'Papas paja', 'Polvo de Takis'],
        en: ['180g premium beef', 'Melted cheddar', 'Black garlic mayo', 'Chorizo jam', 'Straw potatoes', 'Takis dust'],
      },
    },
    {
      id: 'hot-cheddar-burger',
      name: { es: 'Hot Cheddar Burger', en: 'Hot Cheddar Burger' },
      tagline: {
        es: 'El mejor queso caliente chorreante de tu vida sobre una burger.',
        en: 'The best hot dripping cheese of your life, on a burger.',
      },
      choice: { es: 'Elige tu carne: doble semismash o pollo crispy', en: 'Choose your protein: double semi-smash or crispy chicken' },
      desc: {
        es: 'Bacon crujiente, aros de cebolla, salsa cheddar, cebolla frita y salsa Original Fusion.',
        en: 'Crispy bacon, onion rings, cheddar sauce, fried onions and Original Fusion sauce.',
      },
      price: 16.9,
      image: 'hot-cheddar-burger',
      ingredients: {
        es: ['Bacon crujiente', 'Aros de cebolla', 'Salsa cheddar', 'Cebolla frita', 'Salsa Original Fusion'],
        en: ['Crispy bacon', 'Onion rings', 'Cheddar sauce', 'Fried onions', 'Original Fusion sauce'],
      },
    },
    {
      id: 'guayota-burger',
      name: { es: 'Guayota Burger', en: 'Guayota Burger' },
      award: {
        es: 'Finalista del Burger Fest Gran Canaria 2025',
        en: 'Finalist at Burger Fest Gran Canaria 2025',
      },
      desc: {
        es: 'Medallón de cochino negro (150g) sobre una base de nuestra salsa Original Fusion ahumada, queso gouda ahumado y pulled pork cocido a baja temperatura en reducción de miel de palma. Un crujiente de fritos aporta textura y una fina capa de salsa tártara casera sella la experiencia en pan brioche.',
        en: '150g black pork patty, Original Fusion smoked sauce, smoked Gouda, slow-cooked pulled pork in palm honey reduction, crispy topping and homemade tartar sauce on brioche.',
      },
      price: 15.9,
      image: 'guayota-burger',
      ingredients: {
        es: ['150g cochino negro', 'Original Fusion ahumada', 'Gouda ahumado', 'Pulled pork en miel de palma', 'Crujiente de fritos', 'Salsa tártara'],
        en: ['150g black pork', 'Smoked Fusion sauce', 'Smoked Gouda', 'Pulled pork in palm honey', 'Crispy topping', 'Tartar sauce'],
      },
    },
    {
      id: 'la-trufada',
      name: { es: 'La Trufada', en: 'La Trufada' },
      tagline: { es: '¡Sabor inolvidable!', en: 'A flavour you will not forget.' },
      desc: {
        es: 'Medallón de vaca premium (180g), queso gouda, mermelada de bacon, huevo frito, salsa a base de trufa y nuestro pan brioche.',
        en: 'Premium beef medallion (180g), smoked Gouda, bacon jam, fried egg, truffle sauce and brioche.',
      },
      price: 14.9,
      image: 'la-trufada',
      ingredients: {
        es: ['180g vaca premium', 'Gouda', 'Mermelada de bacon', 'Huevo frito', 'Salsa de trufa', 'Pan brioche'],
        en: ['180g premium beef', 'Gouda', 'Bacon jam', 'Fried egg', 'Truffle sauce', 'Brioche bun'],
      },
    },
    {
      id: 'smoked-burger',
      name: { es: 'Smoked Burger', en: 'Smoked Burger' },
      award: {
        es: 'Nuestra propuesta para el Burger Fest Canarias 2025',
        en: 'Our entry for Burger Fest Canarias 2025',
      },
      desc: {
        es: 'Doble semismash de vaca premium (160g), queso gouda ahumado, relish de pepinillo estilo oriental, bacon crunchy y salsa Original Fusion ahumada sobre una base de pan brioche.',
        en: 'Double semi-smash premium beef (160g), smoked Gouda, Asian-style gherkin relish, crispy bacon and Original Fusion smoked sauce on brioche.',
      },
      price: 13.9,
      image: 'smoked-burger',
      ingredients: {
        es: ['160g vaca premium', 'Gouda ahumado', 'Relish de pepinillo oriental', 'Bacon crunchy', 'Original Fusion ahumada'],
        en: ['160g premium beef', 'Smoked Gouda', 'Asian gherkin relish', 'Crunchy bacon', 'Smoked Fusion sauce'],
      },
    },
    {
      id: 'porky-burger',
      name: { es: 'Porky Burger', en: 'Porky Burger' },
      tagline: { es: 'BBQ + cochino = combi perfecta', en: 'BBQ + pork = the perfect combo' },
      desc: {
        es: 'Medallón de vaca premium (180g), queso gouda, pulled pork reducido en salsa BBQ, cebolla natural crusty y salsa Original Fusion en nuestro pan brioche.',
        en: 'Premium beef medallion (180g), Gouda, pulled pork glazed in BBQ sauce, crispy fresh onion and Original Fusion sauce on brioche.',
      },
      price: 14.9,
      image: 'porky-burger',
      ingredients: {
        es: ['180g vaca premium', 'Gouda', 'Pulled pork BBQ', 'Cebolla crusty', 'Salsa Original Fusion', 'Pan brioche'],
        en: ['180g premium beef', 'Gouda', 'BBQ pulled pork', 'Crusty onion', 'Original Fusion sauce', 'Brioche bun'],
      },
    },
  ],
}

export const VEGGIE: MenuCategory = {
  id: 'veggie',
  label: { es: 'Burgers vegetales', en: 'Veggie burgers' },
  note: FRIES,
  items: [
    {
      id: 'garbanzos-zanahoria',
      name: { es: 'Garbanzos y Zanahoria Burger', en: 'Garbanzos y Zanahoria Burger' },
      desc: {
        es: 'Burger de garbanzos, zanahoria y avena (150g), queso rulo de cabra, cebolla caramelizada, tomate, rúcula y salsa Original Fusion en nuestro pan artesanal de papa brioche.',
        en: "Chickpea, carrot and oat patty (150g) with goat's cheese, caramelised onion, tomato, rocket and Original Fusion sauce on artisan potato brioche.",
      },
      price: 13.9,
      image: 'garbanzos-zanahoria',
    },
    {
      id: 'remolacha-burger',
      name: { es: 'Remolacha Burger', en: 'Remolacha Burger' },
      desc: {
        es: 'Burger de remolacha (150g), rulo de cabra, cebolla caramelizada, tomate, rúcula y salsa Original Fusion.',
        en: "150g beetroot patty, goat's cheese log, caramelised onion, tomato, rocket and Original Fusion sauce.",
      },
      price: 13.9,
      image: 'remolacha-burger',
    },
  ],
}

export const KIDS: MenuCategory = {
  id: 'kids',
  label: { es: 'Menú infantil', en: "Children's menu" },
  note: {
    es: 'Incluyen papas naturales. No es posible añadir extras. Batatas fritas por 1,50 € más.',
    en: 'Served with fresh chips. No extras available. Sweet potato fries for €1.50 more.',
  },
  items: [
    {
      id: 'fusion-baby',
      name: { es: 'Fusion Baby', en: 'Fusion Baby' },
      tagline: { es: '¡Para los peques!', en: 'For the little ones!' },
      desc: {
        es: 'Carne premium (100g), doble queso cheddar y ketchup en nuestro pan brioche.',
        en: 'Premium beef (100g), double cheddar cheese and ketchup on brioche.',
      },
      price: 8.9,
      image: 'fusion-baby',
    },
    {
      id: 'baby-chicken',
      name: { es: 'Baby Chicken', en: 'Baby Chicken' },
      tagline: { es: '¿Prefieres de pollo?', en: 'Prefer chicken?' },
      desc: {
        es: 'Pollo crujiente marinado 12h, doble queso cheddar y kétchup en nuestro pan brioche.',
        en: 'Crispy chicken marinated for 12 hours, double cheddar cheese and ketchup on brioche.',
      },
      price: 8.9,
      image: 'baby-chicken',
    },
    {
      id: 'delicias-baby',
      name: { es: 'Delicias Baby', en: 'Delicias Baby' },
      desc: {
        es: 'Trozos de pollo empanado con papas fritas naturales y ketchup.',
        en: 'Chicken nuggets with fries and ketchup.',
      },
      price: 8.9,
      image: 'delicias-baby',
    },
  ],
}

export const GLUTENFREE: MenuCategory = {
  id: 'glutenfree',
  label: { es: 'Sin gluten', en: 'Gluten free' },
  note: {
    es: 'Servidas en pan libre de gluten e incluyen papas naturales.',
    en: 'Served on a gluten-free bun and including fresh chips.',
  },
  items: [
    {
      id: 'gf-original-fusion',
      name: { es: 'Original Fusion', en: 'Original Fusion' },
      desc: {
        es: 'Doble semismash de vaca (160g), queso cheddar americano, cebolla morada, tomate canario, lechuga francesa y salsa Fusion.',
        en: 'Double semi-smashed beef patties (160g), American cheddar, red onion, Canary tomato, French lettuce and Fusion sauce.',
      },
      price: 14.4,
      image: 'original-fusion',
    },
    {
      id: 'gf-peppibacon',
      name: { es: 'PeppiBacon', en: 'PeppiBacon' },
      desc: {
        es: 'Doble semismash de vaca (160g), queso cheddar americano, bacon crispy, pepinillos agridulces y salsa Fusion.',
        en: 'Double semi-smashed beef patties (160g), American cheddar, crispy bacon, sweet-and-sour pickles and Fusion sauce.',
      },
      price: 14.4,
      image: 'peppibacon',
    },
    {
      id: 'gf-rulo-de-cabra',
      name: { es: 'Rulo de Cabra', en: 'Rulo de Cabra' },
      desc: {
        es: 'Doble semismash de vaca (160g), queso rulo de cabra, cebolla caramelizada, tomate canario, rúcula y salsa Fusion.',
        en: "Double semi-smashed beef patties (160g), goat's cheese, caramelised onion, Canary tomato, rocket and Fusion sauce.",
      },
      price: 15.4,
      image: 'rulo-de-cabra',
    },
    {
      id: 'gf-guayota',
      name: { es: 'Guayota Burger', en: 'Guayota Burger' },
      desc: {
        es: 'Medallón de cochino negro (150g), salsa Original Fusion ahumada, gouda ahumado, pulled pork en reducción de miel de palma, crujiente de fritos y salsa tártara casera.',
        en: '150g black Canarian pork patty, smoked Fusion sauce, smoked Gouda, pulled pork in palm honey reduction, crispy topping and homemade tartar sauce.',
      },
      price: 17.4,
      image: 'guayota-burger',
    },
    {
      id: 'gf-smoked',
      name: { es: 'Smoked Burger', en: 'Smoked Burger' },
      desc: {
        es: 'Doble semismash de vaca (160g), gouda ahumado, relish de pepinillo estilo oriental, bacon crunchy y salsa Original Fusion ahumada.',
        en: 'Double semi-smashed beef (160g), smoked Gouda, Asian-style pickle relish, crunchy bacon and smoked Fusion sauce.',
      },
      price: 15.4,
      image: 'smoked-burger',
    },
    {
      id: 'gf-guayaba',
      name: { es: 'Guayaba Burger', en: 'Guayaba Burger' },
      desc: {
        es: 'Doble semismash de vaca (160g), dulce de guayabo, rulo de cabra, rúcula y salsa Original Fusion.',
        en: "Double semi-smashed beef (160g), guava paste, goat's cheese, rocket and Original Fusion sauce.",
      },
      price: 14.4,
      image: 'guayaba-burger',
    },
    {
      id: 'gf-oklahoma',
      name: { es: 'Oklahoma Burger', en: 'Oklahoma Burger' },
      desc: {
        es: 'Doble semismash de vaca (160g) prensada sobre cebolla blanca especiada, queso cheddar clásico, gouda ahumado y salsa Thousand Island.',
        en: 'Double semi-smashed beef (160g), seasoned white onions, cheddar, smoked Gouda and Thousand Island sauce.',
      },
      price: 14.4,
      image: 'oklahoma-burger',
    },
    {
      id: 'gf-fusion-baby',
      name: { es: 'Fusion Baby', en: 'Fusion Baby' },
      desc: {
        es: 'Ternera canaria (100g), doble queso cheddar americano y kétchup.',
        en: '100g Canarian beef patty, double American cheddar and ketchup.',
      },
      price: 10.4,
      image: 'fusion-baby',
    },
    {
      id: 'gf-papas-cheddarbacon',
      name: { es: 'Papas CheddarBacon', en: 'Papas CheddarBacon' },
      desc: {
        es: 'Papas naturales bañadas en cheddar fundido, cebollino y bacon crujiente triturado.',
        en: 'Fresh-cut fries with melted cheddar, chives and crispy crumbled bacon.',
      },
      price: 7.5,
      image: 'papas-cheddar-bacon',
    },
  ],
}

export const DESSERTS: MenuCategory = {
  id: 'desserts',
  label: { es: 'Postres', en: 'Desserts' },
  items: [
    {
      id: 'tarta-de-queso',
      name: { es: 'Tarta de Queso', en: 'Tarta de Queso' },
      desc: {
        es: 'Un equilibrio perfecto entre suave cremosidad y dulzura delicada sobre una base de galleta María. Acompañada de topping de dulce de leche y nata.',
        en: 'Smooth creaminess and subtle sweetness on a Maria biscuit base, topped with dulce de leche and cream.',
      },
      price: 4.5,
      image: 'tarta-de-queso',
    },
    {
      id: 'tarta-pistacho',
      name: { es: 'Tarta de Queso y Pistacho', en: 'Tarta de Queso y Pistacho' },
      desc: {
        es: 'Tarta de queso cremosa sobre base de galleta María, con topping de pistacho.',
        en: 'Creamy cheesecake on a Maria cookie base, topped with pistachios.',
      },
      price: 5.5,
      image: 'tarta-de-queso-pistacho',
    },
    {
      id: 'tarta-chocolate',
      name: { es: 'Tarta de Queso y Chocolate', en: 'Tarta de Queso y Chocolate' },
      desc: {
        es: 'Irresistible combinación de la cremosidad del queso con la intensidad del chocolate. Coronada con galleta de chocolate triturada.',
        en: 'Creamy cheese with rich chocolate, topped with crushed chocolate biscuits.',
      },
      price: 5.5,
      image: 'tarta-de-queso-chocolate',
    },
    {
      id: 'tarta-lotus',
      name: { es: 'Tarta de Queso y Lotus', en: 'Tarta de Queso y Lotus' },
      desc: {
        es: 'Equilibrio perfecto entre el mejor queso y la crema de Lotus, con topping de galleta Lotus triturada.',
        en: 'Cheesecake with Lotus cream, topped with crushed Lotus biscuits.',
      },
      price: 5.5,
      image: 'tarta-de-queso-lotus',
    },
  ],
}

const simple = (id: string, name: string, price: number): MenuItem => ({
  id,
  name: { es: name, en: name },
  price,
})

export const EXTRAS: MenuCategory = {
  id: 'extras',
  label: { es: 'Añádele un extra', en: 'Add a special touch' },
  items: [
    simple('extra-bacon', 'Bacon', 1),
    simple('extra-huevo', 'Huevo', 1.5),
    simple('extra-cebolla-caramelizada', 'Cebolla caramelizada', 1),
    simple('extra-cebolla-frita', 'Cebolla frita', 1),
    simple('extra-pepinillo', 'Pepinillo', 1),
    simple('extra-rulo', 'Rulo de cabra', 1.5),
    simple('extra-pulled-pork', 'Pulled pork', 2),
    simple('extra-pollo-crispy', 'Pollo crispy', 3),
    simple('extra-cheddar-fundido', 'Cheddar fundido', 3),
    simple('extra-pan-sin-gluten', 'Pan sin gluten', 1.2),
    simple('extra-cebolla-crusty', 'Cebolla crusty', 1),
    simple('extra-mermelada-bacon', 'Mermelada de bacon', 2),
    simple('extra-bacon-crispy', 'Extra bacon crispy', 2),
    simple('extra-pico-de-gallo', 'Pico de gallo', 1),
    simple('extra-loncha-cheddar', 'Loncha de queso cheddar', 1),
    simple('extra-loncha-gouda', 'Loncha de gouda ahumado', 1),
    simple('extra-relish', 'Relish de pepinillo', 1),
  ],
}

export const SAUCES: MenuCategory = {
  id: 'sauces',
  label: { es: 'Salsas', en: 'Sauces' },
  items: [
    simple('salsa-fusion', 'Salsa Fusion Original', 0.5),
    simple('salsa-trufada', 'Salsa trufada', 0.5),
    simple('salsa-ketchup', 'Ketchup', 0.5),
    simple('salsa-emily', 'Salsa Emily', 0.5),
    simple('salsa-arandanos', 'Mermelada de arándanos', 0.5),
    simple('salsa-cheddar', 'Salsa cheddar fundido', 0.5),
    simple('salsa-guacamole', 'Guacamole', 0.5),
    simple('salsa-barbacoa', 'Barbacoa', 0.5),
    simple('salsa-agridulce', 'Agridulce', 0.5),
  ],
}

export const DRINKS: MenuCategory = {
  id: 'drinks',
  label: { es: 'Bebidas', en: 'Drinks' },
  items: [
    simple('pepsi', 'Pepsi Cola 350 ml', 2.4),
    simple('pepsi-zero', 'Pepsi Cola Zero 350 ml', 2.4),
    simple('schweppes-naranja', 'Schweppes Naranja 350 ml', 2.4),
    simple('schweppes-limon', 'Schweppes Limón 350 ml', 2.4),
    simple('seven-up', 'Seven Up 350 ml', 2.4),
    simple('nestea-mango-500', 'Nestea Mango Piña 500 ml', 2.9),
    simple('nestea-maracuya', 'Nestea Maracuyá 33 cl', 2.4),
    simple('aquarade-naranja', 'Aquarade Naranja 350 ml', 2.4),
    simple('aquarade-limon', 'Aquarade Limón 350 ml', 2.4),
    simple('clipper-fresa-500', 'Clipper Fresa 500 ml', 2.9),
    simple('agua', 'Botella de agua', 1.5),
    simple('zumos', 'Zumos', 1.8),
    simple('clipper-fresa-350', 'Clipper Fresa 350 ml', 2.4),
    simple('nestea-mango-33', 'Nestea Mango Piña 33 cl', 2.4),
    simple('frutania', 'Frutania 20 cl', 1.5),
  ],
}

export const DRAFT_BEERS: MenuCategory = {
  id: 'draft-beers',
  label: { es: 'Cervezas de grifo', en: 'Draft beers' },
  items: [
    simple('cana-dorada', 'Caña Dorada Especial', 2.5),
    simple('dorada-tostada', 'Dorada Tostada', 3),
    simple('jarra-dorada', 'Jarra Dorada Especial', 3.5),
    simple('cana-tropical', 'Caña Tropical sin filtrar', 2.5),
  ],
}

export const BOTTLED_BEERS: MenuCategory = {
  id: 'bottled-beers',
  label: { es: 'Cervezas de botella', en: 'Bottled beers' },
  items: [
    simple('dorada-pilsen', 'Dorada Pilsen', 2),
    simple('coronita', 'Coronita', 3),
    simple('dorada-tostada-00', 'Dorada Tostada 0,0', 2.2),
    simple('dorada-negra', 'Dorada Negra', 2),
    simple('dorada-sin-gluten', 'Dorada Sin Gluten', 1.5),
  ],
}

export const OTHER_DRINKS: MenuCategory = {
  id: 'other-drinks',
  label: { es: 'Otras bebidas', en: 'Other drinks' },
  items: [
    simple('kopparberg', 'Kopparberg Fresa Lima 330 ml', 3.5),
    simple('combinado-ron', 'Combinado de ron', 6),
    simple('chupito', 'Chupito', 2),
  ],
}

export const MENU: MenuCategory[] = [
  STARTERS,
  BURGERS,
  VEGGIE,
  KIDS,
  GLUTENFREE,
  DESSERTS,
  EXTRAS,
  SAUCES,
  DRINKS,
  DRAFT_BEERS,
  BOTTLED_BEERS,
  OTHER_DRINKS,
]

export const FEATURED_ID = 'hot-cheddar-burger'

export const FEATURED = BURGERS.items.find((b) => b.id === FEATURED_ID)!

export const HERO_BURGER = BURGERS.items.find((b) => b.id === 'chossburger')!
