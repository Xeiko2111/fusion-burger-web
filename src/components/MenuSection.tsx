import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { MENU, type MenuCategory, type MenuItem } from '@/data/menu'
import { COPY } from '@/data/site'
import { formatPrice, useI18n } from '@/lib/i18n'
import { OPEN_MENU_ITEM, type OpenMenuItemDetail } from '@/lib/bus'
import { useHasHover, useMediaQuery } from '@/lib/hooks'
import { Product } from './ui/Product'
import { SplitText } from './ui/Type'

/**
 * Fotografía que sigue al cursor. Solo en escritorio: es la razón por la que la
 * carta no necesita miniaturas. En móvil el trabajo lo hace el desplegable.
 */
function HoverPreview({ item }: { item: MenuItem | null }) {
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.5 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:block"
      aria-hidden
    >
      <AnimatePresence mode="wait">
        {item?.image && (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="-translate-x-1/2 -translate-y-1/2"
          >
            <Product
              id={item.image}
              alt=""
              sizes="380px"
              className="h-auto w-[26vw] max-w-[380px] drop-shadow-[0_24px_60px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface RowProps {
  item: MenuItem
  index: number
  highlighted: boolean
  hasHover: boolean
  isDesktop: boolean
  reduced: boolean
  onHover: (item: MenuItem | null) => void
}

function Row({ item, index, highlighted, hasHover, isDesktop, reduced, onHover }: RowProps) {
  const { t, locale } = useI18n()
  const [open, setOpen] = useState(false)
  const hasPhoto = Boolean(item.image)
  const expandable = hasPhoto && !hasHover
  const price = formatPrice(item.price, locale)

  /* Móvil: nombre y descripción a la izquierda, precio y chevron alineados a la
     derecha. Los precios forman una columna que se escanea de un vistazo, y el
     chevron dice sin palabras que la fila se abre. */
  const compactBody = (
    <div className="flex gap-4">
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-d4 uppercase leading-none">{t(item.name)}</h4>
        {item.tagline && <p className="mt-1.5 text-note text-lime/80">{t(item.tagline)}</p>}
        {item.desc && (
          <p className={`mt-1.5 text-note text-ash ${open ? '' : 'line-clamp-2'}`}>
            {t(item.desc)}
          </p>
        )}
        {item.choice && <p className="mt-1.5 text-note text-ash/70">{t(item.choice)}</p>}
        {item.award && <p className="mt-1.5 text-note text-lime/80">{t(item.award)}</p>}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-3">
        <span className="tabular font-display text-body text-lime">{price}</span>
        {expandable && (
          <span
            aria-hidden
            className={`flex h-8 w-8 items-center justify-center border border-white/20 transition-transform duration-300 ${
              open ? 'rotate-180 border-lime text-lime' : 'text-ash'
            }`}
          >
            <ChevronDown size={16} strokeWidth={1.75} />
          </span>
        )}
      </div>
    </div>
  )

  const wideBody = (
    <>
      <div className="flex items-baseline gap-4">
        <h4 className="font-display text-d4 uppercase leading-tight">{t(item.name)}</h4>
        <span aria-hidden className="mb-1.5 h-px flex-1 bg-white/10" />
        <span className="tabular shrink-0 font-display text-body text-lime">{price}</span>
      </div>
      {item.tagline && <p className="mt-2 text-note text-lime/80">{t(item.tagline)}</p>}
      {item.desc && <p className="mt-2 max-w-measure text-note text-ash">{t(item.desc)}</p>}
      {item.choice && <p className="mt-2 text-note text-ash/70">{t(item.choice)}</p>}
      {item.award && <p className="mt-2 max-w-measure text-note text-lime/80">{t(item.award)}</p>}
    </>
  )

  const body = isDesktop ? wideBody : compactBody

  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.02, 0.24), ease: [0.16, 1, 0.3, 1] }}
      className={`relative border-b border-white/8 transition-shadow duration-500 lg:border-b-0 lg:px-3 ${
        highlighted ? 'shadow-[inset_0_0_0_1px_#C4D745]' : ''
      }`}
      onMouseEnter={hasHover && hasPhoto ? () => onHover(item) : undefined}
      onMouseLeave={hasHover && hasPhoto ? () => onHover(null) : undefined}
    >
      {expandable ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="tap block w-full py-5 text-left lg:py-6"
        >
          {body}
        </button>
      ) : (
        <div className="py-5 lg:py-6">{body}</div>
      )}

      <AnimatePresence initial={false}>
        {open && expandable && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="ember-light flex justify-center pb-5">
              <Product
                id={item.image!}
                alt={t(item.name)}
                sizes="70vw"
                className="h-[190px] w-auto max-w-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export function MenuSection() {
  const { t } = useI18n()
  const hasHover = useHasHover()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion() ?? false
  const [activeId, setActiveId] = useState(MENU[1].id) // arranca en Burgers
  const [hovered, setHovered] = useState<MenuItem | null>(null)
  const [highlight, setHighlight] = useState<string | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const active = useMemo<MenuCategory>(
    () => MENU.find((c) => c.id === activeId) ?? MENU[0],
    [activeId],
  )

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<OpenMenuItemDetail>).detail
      setActiveId(detail.categoryId)
      setHighlight(detail.itemId)
      window.setTimeout(() => setHighlight(null), 2600)
    }
    window.addEventListener(OPEN_MENU_ITEM, onOpen)
    return () => window.removeEventListener(OPEN_MENU_ITEM, onOpen)
  }, [])

  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-cat="${activeId}"]`)
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [activeId])

  const isShortList = active.items.every((i) => !i.image && !i.desc)

  return (
    <section id="carta" className="relative py-16 lg:py-40">
      {hasHover && <HoverPreview item={hovered} />}

      <div className="px-gutter lg:pl-railpad">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SplitText
            as="h2"
            text={t(COPY.menuTitle)}
            className="font-display-wide text-d3 uppercase lg:text-d2"
          />
          <p className="text-note text-ash lg:text-micro lg:uppercase lg:tracking-[0.16em]">
            {hasHover ? t(COPY.menuHint) : t(COPY.menuHintTouch)}
          </p>
        </div>
      </div>

      {/* Barra de categorías: se queda pegada bajo la cabecera al bajar, de modo
          que cambiar de categoría nunca obliga a volver arriba. */}
      <div className="sticky top-[68px] z-30 mt-6 bg-void/95 py-3 backdrop-blur-md lg:static lg:mt-14 lg:bg-transparent lg:py-0 lg:backdrop-blur-none">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label={t(COPY.menuTitle)}
          className="no-scrollbar edge-fade-r flex gap-2 overflow-x-auto px-gutter lg:flex-wrap lg:gap-7 lg:pl-railpad"
        >
          {MENU.map((cat) => {
            const isActive = cat.id === activeId
            return (
              <button
                key={cat.id}
                data-cat={cat.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveId(cat.id)}
                className={`tap relative shrink-0 whitespace-nowrap px-4 py-2.5 text-micro uppercase tracking-[0.14em] lg:px-0 lg:pb-2 lg:pt-0 ${
                  isActive
                    ? 'bg-lime text-void lg:bg-transparent lg:text-lime'
                    : 'border border-white/15 text-ash lg:border-0 lg:hover:text-bone'
                }`}
              >
                {t(cat.label)}
                {isActive && (
                  <motion.span
                    layoutId="cat-underline"
                    className="absolute inset-x-0 bottom-0 hidden h-px bg-lime lg:block"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-gutter lg:pl-railpad">
        {active.note && (
          <p className="mt-6 max-w-measure text-note text-ash/80 lg:mt-8">{t(active.note)}</p>
        )}

        <AnimatePresence mode="wait">
          <motion.ul
            key={active.id}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
            onMouseLeave={() => setHovered(null)}
            className={`mt-4 grid gap-x-14 lg:mt-8 ${
              isShortList ? 'sm:grid-cols-2 lg:grid-cols-3' : 'lg:grid-cols-2'
            }`}
          >
            {active.items.map((item, i) => (
              <Row
                key={item.id}
                item={item}
                index={i}
                highlighted={highlight === item.id}
                hasHover={hasHover}
                isDesktop={isDesktop}
                reduced={reduced}
                onHover={setHovered}
              />
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  )
}
