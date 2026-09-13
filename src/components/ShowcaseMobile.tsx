import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import type { MenuItem } from '@/data/menu'
import { COPY } from '@/data/site'
import { formatPrice, useI18n } from '@/lib/i18n'
import { openMenuItem } from '@/lib/bus'
import { Product } from './ui/Product'

export function ShowcaseMobile({ panels }: { panels: MenuItem[] }) {
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()
  const scroller = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)


  useEffect(() => {
    const root = scroller.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const index = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(index)) setActive(index)
          }
        }
      },
      { root, threshold: [0.6, 0.9] },
    )
    root.querySelectorAll('[data-index]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [panels.length])

  const goTo = useCallback((index: number) => {
    const strip = scroller.current
    const card = strip?.querySelector<HTMLElement>(`[data-index="${index}"]`)
    if (!strip || !card) return

    const delta = card.getBoundingClientRect().left - strip.getBoundingClientRect().left
    strip.scrollTo({
      left: strip.scrollLeft + delta - (strip.clientWidth - card.clientWidth) / 2,
      behavior: 'smooth',
    })
  }, [])

  return (
    <section id="burgers" className="py-16">
      <div className="px-gutter">
        <h2 className="font-display-wide text-d3 uppercase">{t(COPY.showcaseTitle)}</h2>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 text-note text-lime">
            {t({ es: 'Desliza para explorar', en: 'Swipe to explore' })}
            <motion.span
              aria-hidden
              animate={reduced ? undefined : { x: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <ChevronRight size={15} strokeWidth={2} />
            </motion.span>
          </p>
          <p className="tabular text-note text-ash">
            <span className="text-bone">{String(active + 1).padStart(2, '0')}</span>
            {' / '}
            {String(panels.length).padStart(2, '0')}
          </p>
        </div>
      </div>

      <ul
        ref={scroller}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-gutter pb-2"
      >
        {panels.map((item, i) => (
          <li
            key={item.id}
            data-index={i}
            className="w-[80vw] max-w-[340px] shrink-0 snap-center"
          >
            <button
              type="button"
              onClick={() => openMenuItem('burgers', item.id)}
              className="tap block w-full rounded-none border border-white/12 bg-char/60 px-4 pb-4 pt-2 text-left active:border-lime"
            >
              {}
              <div className="ember-light relative flex h-[190px] items-center justify-center">
                {item.image && (
                  <Product
                    id={item.image}
                    alt={t(item.name)}
                    sizes="80vw"
                    className="h-full w-auto max-w-full object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.8)]"
                  />
                )}
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-d4 uppercase leading-none">{t(item.name)}</h3>
                <span className="tabular shrink-0 font-display text-body text-lime">
                  {formatPrice(item.price, locale)}
                </span>
              </div>

              {item.award && (
                <p className="mt-2 text-micro uppercase tracking-[0.1em] text-lime/80">
                  {t(item.award)}
                </p>
              )}

              <p className="mt-2 line-clamp-2 text-note text-ash">{t(item.desc!)}</p>

              <span className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-micro uppercase tracking-[0.14em] text-bone">
                {t({ es: 'Ver hamburguesa', en: 'View burger' })}
                <ChevronRight size={16} strokeWidth={1.75} className="text-lime" aria-hidden />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {}
      <div className="mt-5 flex items-center justify-center gap-2 px-gutter">
        {panels.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={t(item.name)}
            aria-current={i === active}
            className="flex h-11 w-6 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-lime' : 'w-1.5 bg-white/30'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
