import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FEATURED } from '@/data/menu'
import { COPY } from '@/data/site'
import { formatPrice, useI18n } from '@/lib/i18n'
import { openMenuItem } from '@/lib/bus'
import { useMediaQuery } from '@/lib/hooks'
import { Product } from './ui/Product'
import { Action } from './ui/Controls'
import { Reveal, SplitText } from './ui/Type'

/* Piezas compartidas: el contenido es el mismo en los dos tamaños, solo cambia
   el orden en que se presenta. */

function Eyebrow() {
  const { t } = useI18n()
  return (
    <p className="text-micro uppercase tracking-[0.18em] text-lime">{t(COPY.featuredEyebrow)}</p>
  )
}

function Title({ small = false }: { small?: boolean }) {
  const { t } = useI18n()
  return (
    <SplitText
      as="h2"
      text={t(FEATURED.name)}
      className={`font-display-wide mt-4 uppercase leading-[0.86] ${small ? 'text-d3' : 'mt-6 text-d2'}`}
    />
  )
}

function Photo() {
  const { t } = useI18n()
  return (
    <Product
      id={FEATURED.image!}
      alt={`${t(FEATURED.name)} — ${t(FEATURED.desc!)}`}
      sizes="(max-width: 1024px) 92vw, 52vw"
      className="feather mx-auto h-auto w-full max-w-[560px] lg:max-w-none"
    />
  )
}

function Ingredients() {
    const { tl } = useI18n()
  if (!FEATURED.ingredients) return null
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {tl(FEATURED.ingredients).map((ing) => (
        <li key={ing} className="text-note text-ash">
          {ing}
        </li>
      ))}
    </ul>
  )
}

function FeaturedMobile() {
  const { t, locale } = useI18n()

  return (
    <section id="destacada" className="relative overflow-hidden bg-void px-gutter py-16">
      <Reveal>
        <Eyebrow />
      </Reveal>
      <Title small />

      {/* La foto va justo debajo del nombre y por encima del resto: es lo que
          vende el plato, pero no entierra ni el precio ni la acción. */}
      <div className="mt-6">
        <Photo />
      </div>

      <Reveal>
        {FEATURED.tagline && (
          <p className="mt-5 max-w-[30ch] text-body text-bone">{t(FEATURED.tagline)}</p>
        )}

        <div className="mt-5 flex items-center justify-between gap-4 border-y border-white/10 py-4">
          <p className="tabular font-display text-d4 leading-none text-lime">
            {formatPrice(FEATURED.price, locale)}
          </p>
          <button
            type="button"
            onClick={() => openMenuItem('burgers', FEATURED.id)}
            className="tap flex min-h-[48px] items-center justify-center bg-lime px-6 text-micro font-medium uppercase tracking-[0.14em] text-void"
          >
            {t(COPY.viewMenu)}
          </button>
        </div>

        <p className="mt-5 text-note text-ash">{t(FEATURED.desc!)}</p>
        {FEATURED.choice && <p className="mt-3 text-note text-ash/70">{t(FEATURED.choice)}</p>}
        <div className="mt-5">
          <Ingredients />
        </div>
      </Reveal>
    </section>
  )
}

/**
 * Destacada de escritorio. Único sitio donde la imagen se mueve sola, porque la
 * fotografía original ya era una secuencia: el queso cayendo sobre la burger.
 * Va sobre negro puro y sin luz detrás, porque este asset viene con fondo
 * opaco: la máscara radial disuelve el borde del rectángulo.
 */
function FeaturedDesktop() {
  const ref = useRef<HTMLElement>(null)
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section
      ref={ref}
      id="destacada"
      className="relative overflow-hidden bg-void px-gutter py-40 lg:pl-railpad"
    >
      <div className="flex items-center gap-16">
        <div className="w-[46%]">
          <Reveal>
            <Eyebrow />
          </Reveal>

          <Title />

          {FEATURED.tagline && (
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[28ch] text-lead text-bone">{t(FEATURED.tagline)}</p>
            </Reveal>
          )}

          <Reveal delay={0.18}>
            <p className="mt-5 max-w-measure text-body text-ash">{t(FEATURED.desc!)}</p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8">
              <Ingredients />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <p className="tabular font-display text-d3 leading-none text-lime">
                {formatPrice(FEATURED.price, locale)}
              </p>
              <Action tone="outline" onClick={() => openMenuItem('burgers', FEATURED.id)}>
                {t(COPY.viewMenu)}
              </Action>
            </div>
            {FEATURED.choice && <p className="mt-5 text-note text-ash/80">{t(FEATURED.choice)}</p>}
          </Reveal>
        </div>

        <div className="w-[54%]">
          <motion.div style={reduced ? {} : { y }} className="will-change-transform">
            <Photo />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function Featured() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return isDesktop ? <FeaturedDesktop /> : <FeaturedMobile />
}
