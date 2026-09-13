import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { COPY } from '@/data/site'
import { useI18n } from '@/lib/i18n'
import { scrollToSection, useMediaQuery } from '@/lib/hooks'

/**
 * Barra de acciones fija de móvil. Las dos cosas que alguien con hambre quiere
 * hacer —ver qué hay y saber dónde está— quedan siempre a un pulgar, sin tener
 * que volver arriba.
 *
 * Aparece al pasar el hero (donde esas dos acciones ya están a la vista) y se
 * retira al llegar al cierre, que las repite a tamaño grande. Así nunca hay dos
 * juegos del mismo botón en pantalla.
 */
export function MobileBar() {
  const { t } = useI18n()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)
  const [atClosing, setAtClosing] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    setPastHero(v > window.innerHeight * 0.72)
  })

  useEffect(() => {
    const target = document.getElementById('cierre')
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setAtClosing(entry.isIntersecting),
      { rootMargin: '0px 0px -35% 0px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const visible = !isDesktop && pastHero && !atClosing

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-void/95 px-gutter pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden"
        >
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('carta')}
              className="tap flex min-h-[50px] flex-1 items-center justify-center bg-lime px-5 text-micro font-medium uppercase tracking-[0.14em] text-void"
            >
              {t(COPY.viewMenu)}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('locales')}
              aria-label={t(COPY.findUs)}
              className="tap flex min-h-[50px] w-[50px] shrink-0 items-center justify-center border border-white/25 text-bone active:border-lime active:text-lime"
            >
              <MapPin size={19} strokeWidth={1.6} aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
