import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BURGERS, type MenuItem } from '@/data/menu'
import { COPY, SHOWCASE_IDS } from '@/data/site'
import { formatPrice, useI18n } from '@/lib/i18n'
import { openMenuItem } from '@/lib/bus'
import { useMediaQuery } from '@/lib/hooks'
import { ShowcaseMobile } from './ShowcaseMobile'
import { Product } from './ui/Product'
import { SplitText } from './ui/Type'

const PANELS: MenuItem[] = SHOWCASE_IDS.map(
  (id) => BURGERS.items.find((b) => b.id === id)!,
).filter(Boolean)


const VH_PER_PANEL = 72

function Panel({ item, index }: { item: MenuItem; index: number }) {
  const { t, tl, locale } = useI18n()

  return (
    <article className="flex h-full w-full shrink-0 flex-col justify-center gap-8 px-gutter pb-24 pt-24 lg:flex-row lg:items-center lg:gap-0 lg:pb-16">
      <div className="order-2 z-10 lg:order-1 lg:w-[42%]">
        <p className="tabular font-display text-note text-lime">
          {String(index + 1).padStart(2, '0')}
        </p>

        <h3 className="font-display-wide mt-3 text-d3 uppercase leading-[0.9]">{t(item.name)}</h3>

        {item.award && (
          <p className="mt-4 max-w-[38ch] text-note text-lime/90">{t(item.award)}</p>
        )}

        {item.ingredients && (
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-1.5 lg:mt-9 lg:block lg:space-y-1">
            {tl(item.ingredients).map((ing) => (
              <li key={ing} className="text-note text-ash">
                {ing}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex items-center gap-7 lg:mt-11">
          <p className="tabular font-display text-d4">{formatPrice(item.price, locale)}</p>
          <button
            type="button"
            onClick={() => openMenuItem('burgers', item.id)}
            className="border-b border-white/30 pb-1 text-micro uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-lime hover:text-lime"
          >
            {t({ es: 'Verla en la carta', en: 'See it on the menu' })}
          </button>
        </div>
      </div>

      <div className="order-1 flex justify-center lg:order-2 lg:w-[58%]">
        {item.image && (
          <Product
            id={item.image}
            alt={`${t(item.name)} — ${t(item.desc!)}`}
            sizes="(max-width: 1024px) 82vw, 52vw"
            className="h-auto max-h-[44vh] w-auto max-w-[82vw] object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.8)] lg:max-h-[74vh] lg:max-w-[52vw]"
          />
        )}
      </div>
    </article>
  )
}

function StackedShowcase() {
  const { t } = useI18n()
  return (
    <section id="burgers" className="relative py-24">
      <h2 className="font-display-wide px-gutter text-d2 uppercase">
        {t(COPY.showcaseTitle)}
      </h2>
      <div className="mt-10 space-y-24">
        {PANELS.map((item, i) => (
          <div key={item.id} className="min-h-0">
            <Panel item={item} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}

export function Showcase() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [current, setCurrent] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const count = PANELS.length
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(count - 1) * 100}%`])
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(count - 1, Math.max(0, Math.round(v * (count - 1))))
    setCurrent(i)
  })

  if (!isDesktop) return <ShowcaseMobile panels={PANELS} />
  if (reduced) return <StackedShowcase />

  return (
    <section
      ref={ref}
      id="burgers"
      style={{ height: `${count * VH_PER_PANEL}vh` }}
      className="relative"
      aria-label={t(COPY.showcaseTitle)}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="ember-light pointer-events-none absolute inset-0" aria-hidden />

        <motion.div style={{ x }} className="flex h-full w-full will-change-transform">
          {PANELS.map((item, i) => (
            <Panel key={item.id} item={item} index={i} />
          ))}
        </motion.div>

        {}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between px-gutter pt-24 lg:pt-28">
          <SplitText
            as="h2"
            text={t(COPY.showcaseTitle)}
            className="font-display text-d4 uppercase text-bone/70"
          />
          <p className="tabular text-micro uppercase tracking-[0.16em] text-ash">
            {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
        </div>

        {}
        <div className="absolute inset-x-0 bottom-0 px-gutter pb-7">
          <p className="mb-3 text-micro uppercase tracking-[0.16em] text-ash">
            {t(COPY.showcaseHint)}
          </p>
          <div className="h-px w-full bg-white/15">
            <motion.div
              style={{ scaleX: progress }}
              className="h-full origin-left bg-lime"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  )
}
