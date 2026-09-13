import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BURGERS } from '@/data/menu'
import { COPY } from '@/data/site'
import { useI18n } from '@/lib/i18n'
import { Product } from './ui/Product'
import { Reveal, SplitText } from './ui/Type'

const AWARDED = BURGERS.items.filter((b) => b.award)

/**
 * Sección editorial. Composición asimétrica: el titular arranca en el margen
 * izquierdo, el texto cae desplazado a la derecha y la fotografía se sale del
 * encuadre por el borde. Nada está centrado.
 */
export function BrandIntro() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useI18n()
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['6%', '-10%'])

  return (
    <section
      ref={ref}
      id="marca"
      className="relative overflow-hidden px-gutter py-16 lg:py-44 lg:pl-railpad"
    >
      {/* La Cecina cortada por el borde derecho */}
      <div className="pointer-events-none absolute -right-[8vw] top-1/2 z-0 hidden w-[46vw] max-w-[640px] -translate-y-1/2 lg:block">
        <motion.div style={reduced ? {} : { y: photoY }} className="will-change-transform">
          <Product
            id="la-cecina"
            alt={t({ es: 'La Cecina de Fusion Burger', en: 'Fusion Burger La Cecina' })}
            sizes="(max-width: 1024px) 74vw, 46vw"
            className="h-auto w-full"
          />
        </motion.div>
      </div>

      <div className="relative z-10">
        <SplitText
          as="h2"
          text={t(COPY.brandTitle)}
          className="font-display-wide max-w-[9ch] text-d3 uppercase lg:text-d2"
        />

        {/* En móvil la foto es un bloque más, con altura acotada: informa sin
            empujar el texto fuera de pantalla */}
        <Reveal className="mt-8 lg:hidden">
          <Product
            id="la-cecina"
            alt={t({ es: 'La Cecina de Fusion Burger', en: 'Fusion Burger La Cecina' })}
            sizes="88vw"
            className="ember-light mx-auto h-[210px] w-auto max-w-full object-contain"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-8 lg:ml-[18%] lg:mt-20">
          <p className="max-w-measure text-body text-ash lg:text-lead">{t(COPY.brandBody)}</p>
        </Reveal>

        <div className="mt-14 lg:mt-36">
          <Reveal>
            <p className="text-micro uppercase tracking-[0.18em] text-lime">
              {t(COPY.awardsTitle)}
            </p>
          </Reveal>

          <ul className="mt-6 grid gap-7 sm:grid-cols-2 lg:mt-10 lg:max-w-[54%] lg:grid-cols-1 lg:gap-12">
            {AWARDED.map((burger, i) => (
              <li key={burger.id}>
                <Reveal delay={i * 0.08}>
                  <h3 className="font-display text-d4 uppercase leading-none">{t(burger.name)}</h3>
                  <p className="mt-2 max-w-[46ch] text-note text-ash">{t(burger.award!)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
