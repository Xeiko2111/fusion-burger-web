# Fusion Burger Tenerife — landing

Rediseño completo de la web de Fusion Burger Tenerife. React + TypeScript + Vite,
Tailwind, Motion (Framer Motion) y Lenis.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # salida en dist/
npm run typecheck
```

---

## Lo primero: los assets mandan

El punto de partida no fue el diseño, fue el inventario. De las 37 imágenes del
ZIP original, **30 vienen recortadas con canal alfa** (entre un 37 % y un 78 % de
píxeles transparentes) y las 5 restantes están sobre **negro puro**.

Eso decide tres cosas:

1. **No hay ni una tarjeta en toda la página.** La silueta del producto es la
   forma. Las fotos flotan, se superponen al texto y se salen del encuadre.
2. **El fondo es `#000000` exacto**, no un "casi negro". Así las fotos que traen
   fondo negro funden sin costura y no se ve el rectángulo.
3. **Cada foto conserva su proporción real.** No hay recortes forzados a un
   formato común: el manifiesto guarda el ancho y alto intrínsecos de cada
   archivo y el layout se adapta.

### Procesado

`tools/process_assets.py` (incluido como referencia, ya ejecutado):

- Recorte de fondo negro por relleno desde los bordes en Oklahoma, Garbanzos y
  Tarta de Pistacho. Es relleno desde el borde, no umbral global, así que no
  abre agujeros dentro del producto.
- Recorte al bounding box del producto con un 1,5 % de margen.
- WebP en tres anchos (1080 / 720 / 420) con calidad 84.
- Los dos GIF pasan a WebP animado. Se dejan sobre negro plano a propósito: al
  keyarlos, el guante de nitrilo de la foto se rompía. En su lugar llevan la
  clase `.feather`, una máscara radial que disuelve el borde del rectángulo.
- La mascota verde se ha recortado del gráfico promocional y es ahora un asset
  suelto.

**24,4 MB → 9,7 MB** con las tres variantes de cada imagen incluidas.

`src/data/images.ts` se genera con `tools/gen_manifest.py` a partir de lo que
hay realmente en `public/assets`. Está tipado, así que una ruta rota no compila.
Si añades imágenes, vuelve a lanzarlo.

---

## Dirección de arte

### Color

Todo muestreado de los archivos originales, nada elegido a ojo.

| Token   | Hex       | Origen y uso |
|---------|-----------|--------------|
| `void`  | `#000000` | Negro puro. Base de todo. |
| `char`  | `#14100C` | Carbón cálido. Única superficie elevada. |
| `lime`  | `#C4D745` | Muestreado del logotipo. Solo marca lo que está activo o seleccionado. |
| `ember` | `#D7600A` | Media cromática de la fotografía de producto. Solo como **luz** detrás de la comida, nunca como relleno. |
| `bone`  | `#FFFFFF` | Titulares. |
| `ash`   | `#9A9187` | Gris cálido. Texto secundario. |

El verde lima aparece en tres sitios y en ninguno más: el logo, el estado activo
(pestaña seleccionada, sección actual del raíl, foco de teclado) y el precio de
la promoción. En cuanto se usa para decorar, deja de significar nada.

### Tipografía

- **Archivo** variable como display, estirada a `wdth 118–125` y `wght 800–900`,
  interlineado 0,82 y tracking −0,035em. Pesada y ancha sin caer en la Anton de
  todas las hamburgueserías.
- **Instrument Sans** para texto corrido.
- Sin monoespaciada. Los precios van en Archivo con cifras tabulares.

### Composición

Nada centrado salvo el cierre. El titular arranca en el margen izquierdo, el
texto de apoyo cae desplazado, la fotografía se sale por el borde. El raíl
vertical fijo de la izquierda sustituye a la barra de navegación: cada sección
es una marca que se alarga y se enciende al llegar.

### Movimiento

Regla: **una animación por motivo, y el producto siempre tapa al texto, nunca al
revés.**

- Una sola entrada orquestada, la del hero.
- El resto es scroll (showcase horizontal, paralajes cortos) o respuesta a una
  acción (pestañas, despliegues, imán de los botones).
- Un único marquee en toda la página.
- Sin cursor personalizado global. La previsualización de la carta que sigue al
  puntero ya hace ese trabajo y además informa.
- `prefers-reduced-motion` desactiva Lenis, el paralaje y el grano, y el
  showcase horizontal se convierte en una lista vertical con la misma
  información.

---

## Estructura

| # | Sección | id | Nota |
|---|---------|-----|------|
| 01 | Hero | `inicio` | Chossburger a pantalla completa tapando el titular |
| 02 | Marca | `marca` | Filosofía + los tres premios reales |
| 03 | Showcase | `burgers` | Sticky horizontal, 7 burgers seleccionadas |
| 04 | Promo | — | Menú de almuerzos, con la mascota |
| 05 | Destacada | `destacada` | Hot Cheddar, la única foto en movimiento |
| 06 | Producto | `producto` | Cifras reales con contador |
| 07 | Carta | `carta` | 12 categorías, carta completa |
| 08 | Marquee | — | |
| 09 | Locales | `locales` | |
| 10 | Cierre + pie | — | |

Cambié dos cosas respecto al guion original: la destacada va **antes** de la
carta (mantiene el crescendo del producto y deja la carta pegada a "dónde
estamos", que es la secuencia real de decisión) y la promo entra justo después
del showcase, cuando ya tienes hambre.

El showcase enseña 7 burgers, no las 17. Con 17 el scroll horizontal se hace
interminable y ninguna luce. Las 17 están íntegras en la carta. La selección se
edita en `SHOWCASE_IDS` (`src/data/site.ts`) sin tocar componentes.

---

## Móvil: rediseño, no reducción

Tres componentes tienen implementación propia para móvil, no una versión
encogida del escritorio:

| Componente | Escritorio | Móvil |
|---|---|---|
| `Hero` | Pantalla completa, la foto tapa el titular, paralaje al bajar | Titular compacto, foto de altura acotada, las dos acciones reales y la pista de continuidad, todo sin bajar |
| `Showcase` | Sticky horizontal de 504vh empujado por el scroll vertical | `ShowcaseMobile`: carrusel de scroll nativo con snap, la siguiente burger asomando, puntos que además saltan de tarjeta |
| `Featured` | Dos columnas, texto a la izquierda | Nombre, foto, y a continuación precio y acción antes de la descripción |

Y `MobileBar`, que no existe en escritorio: barra fija inferior con "Ver la
carta" y un acceso al mapa. Aparece al pasar el hero y se retira al llegar al
cierre, que ya repite esas acciones a tamaño grande.

### Cómo se comunica que algo es interactivo

- **Que hay más burgers**: la siguiente tarjeta asoma por el borde. Encima,
  "Desliza para explorar" con un chevron que se mueve, y el contador `03 / 07`.
- **Que una tarjeta se abre**: pie de tarjeta con "Ver hamburguesa" y chevron
  verde, más `active:border-lime` al tocar.
- **Que una fila de la carta se despliega**: chevron en un recuadro que gira
  180° y se pone verde al abrirse. Solo lo llevan las filas que tienen foto.
- **Que hay más categorías**: la barra se desvanece por el borde derecho
  (`.edge-fade-r`, solo por debajo de 1024px).
- **Que has tocado algo**: la clase `.tap` da un `scale(0.972)` de 180 ms a todo
  lo pulsable, y quita el resaltado azul de iOS.

La barra de categorías queda **pegada bajo la cabecera** al bajar, así que
cambiar de categoría nunca obliga a volver arriba.

### Ritmo de espaciado

En móvil no se usa el mismo valor en todas partes:

| Relación | Valor |
|---|---|
| Elementos relacionados (título → descripción) | `mt-2` a `mt-4` |
| Bloques distintos dentro de una sección | `mt-6` a `mt-10` |
| Entre secciones | `py-16` (era `py-28` en todas, uniforme) |

Las cifras del producto pasaron de una columna con separaciones de 56 px a dos
columnas: la misma información en la mitad de scroll.

La foto de La Cecina de la sección de marca estaba en móvil como fondo absoluto
detrás del texto. Ahora es un bloque más, con altura acotada, y no compite con
la lectura.

### Presencia del verde

En móvil el lima deja de ser solo un marcador de estado y pasa a ser color de
marca: precios de la carta y de las tarjetas, CTA principal, categoría activa
(pastilla sólida), puntos del carrusel, chevrons e indicadores de scroll. Los
titulares siguen en blanco sobre negro para que el conjunto no se sature.

### Pendiente de comprobar en dispositivo

El código está revisado y sin desbordamientos por construcción (nada de
`w-screen`, nada de márgenes negativos sobre `clamp()`, anchos en `vw`
contenidos en scrollers con `overflow-x-auto`), pero **no he podido abrirlo en
un navegador**. Antes de dar el móvil por bueno hay que recorrerlo en 375×812,
390×844, 393×852, 412×915 y 430×932, mirando sobre todo:

- El alto real del hero con la barra de direcciones de Safari (usa `svh`, pero
  conviene verlo).
- Que la barra de categorías pegajosa no tape la primera fila al cambiar de
  categoría; si pasa, ajusta el `top-[68px]`.
- El centrado de la última tarjeta del carrusel.

---

## Contenido

Cero contenido inventado. Origen de cada dato:

- **Carta**: `fusionburgertenerife.es` (versión ES) y `/menu-ingles/` (el PDF que
  aportaste). Bilingüe ES/EN en el mismo archivo, con conmutador en la cabecera,
  en lugar de dos páginas separadas.
- **Taglines** ("¡Están brutales chamo!", "¡Que te chorreas un fisco!") recuperados
  de la versión española, que la inglesa se comía.
- **Premios**: La Cecina (2.º a Mejor Burger de Santa Cruz, Burger Fest La Palma),
  Guayota (finalista Burger Fest Gran Canaria 2025) y Smoked (propuesta al Burger
  Fest Canarias 2025).
- **Cifras** de la sección Producto: salen de las propias descripciones (160 g,
  180 g, 12 h de marinado, 9 salsas de la casa).
- Los ingredientes en lista del showcase son un resumen de la descripción del
  producto, no información nueva.

### Pendiente de confirmar contigo

1. **Horarios.** Las fichas de terceros se contradicen (Tripadvisor da lunes y
   martes cerrado; otras fuentes dicen que abre a diario). Los que hay puestos
   son provisionales. Se editan en `LOCATIONS` (`src/data/site.ts`) **y** en el
   JSON-LD de `index.html`.
2. **Locales.** Instagram dice 4 en Tenerife; solo he podido verificar dos
   direcciones (Barranco Grande y Caletillas) y hay referencias a un tercero en
   Calle Imeldo Serís. Añade los que falten en `LOCATIONS`.
3. **Chossburger.** Es un producto real de 15,90 € que está en la web española
   pero **no** en el menú en inglés del PDF. La he incluido y es la imagen del
   hero. Si está descatalogada, hay que cambiar el hero.
4. **Remolacha Burger.** Aparece en el menú en inglés pero ya no en el español.
   La he dejado en Veggie. Confirma si sigue en carta.
5. **Enlaces de Glovo y Uber Eats.** Solo hay una frase, sin enlace, porque no
   tengo las URLs de las fichas. Están para añadir en `CONTACT`.
6. **Aviso legal y privacidad.** No hay página. Antes de publicar hace falta.

---

## Dónde se edita cada cosa

| Quieres cambiar… | Archivo |
|---|---|
| Productos, precios, descripciones | `src/data/menu.ts` |
| Direcciones, horarios, redes, promo, cifras | `src/data/site.ts` |
| Textos de interfaz (los dos idiomas) | `COPY` en `src/data/site.ts` |
| Selección del showcase | `SHOWCASE_IDS` en `src/data/site.ts` |
| Colores, tipografías, escala | `tailwind.config.js` |
| SEO, Open Graph, datos estructurados | `index.html` |

Añadir un tercer idioma son dos cosas: ampliar `Locale` en `menu.ts` y rellenar
la clave nueva. No hay strings sueltos en los componentes.

---

## Rendimiento

- Imagen del hero precargada con `imagesrcset`; el resto en `loading="lazy"`.
- `width` y `height` en todas las imágenes: no hay layout shift.
- Ni un `scroll` listener suelto. La sección activa se detecta con **un solo**
  `IntersectionObserver` y las animaciones de scroll usan `useScroll` de Motion,
  que va sobre `requestAnimationFrame`.
- Solo se animan `transform`, `opacity` y `filter`.
- El marquee es una animación CSS sobre `translate3d`, fuera del hilo principal.
- Bundle partido en tres: `vendor` (React), `motion` y app.
- Sin WebGL, sin vídeo, sin librería de componentes. Los efectos tipo ReactBits
  (split text, blur reveal, marquee, botón magnético, previsualización con el
  cursor) están implementados en local, en `src/components/ui`, unos 250 líneas
  en total, en lugar de arrastrar una dependencia.

## Accesibilidad

- Contraste AA en todo el texto (el lima `#C4D745` sobre negro da 11,4:1).
- Foco visible en lima con `outline-offset`, y elevado en z para que no quede
  detrás de las fotos superpuestas.
- El hover **nunca** es la única vía: en táctil las fotos de la carta se
  despliegan al tocar.
- Los titulares animados llevan `aria-label` con el texto completo y las piezas
  ocultas al lector de pantalla.
- Enlace de salto al contenido, navegación por teclado en pestañas y raíl,
  `aria-current` y `aria-selected` donde toca, Escape cierra el menú móvil.
- Áreas de toque de 48 px mínimo.
