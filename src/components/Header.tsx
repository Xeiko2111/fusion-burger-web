import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronRight, Menu, X } from 'lucide-react'
import { COPY, NAV } from '@/data/site'
import { useI18n } from '@/lib/i18n'
import { scrollToSection, useEscape, useScrollLock } from '@/lib/hooks'
import { Product } from './ui/Product'
import type { Locale } from '@/data/menu'

function LangSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  const options: Locale[] = ['es', 'en']

  return (
    <div
      className={`flex items-center gap-1 text-micro uppercase tracking-[0.16em] ${className}`}
      role="group"
      aria-label={t(COPY.langLabel)}
    >
      {options.map((opt, i) => (
        <span key={opt} className="flex items-center gap-1">
          {i > 0 && <span className="text-white/25">/</span>}
          <button
            type="button"
            onClick={() => setLocale(opt)}
            aria-pressed={locale === opt}
            className={`px-1 py-2 transition-colors duration-300 ${
              locale === opt ? 'text-lime' : 'text-ash hover:text-bone'
            }`}
          >
            {opt}
          </button>
        </span>
      ))}
    </div>
  )
}

export function Header() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 80))
  useScrollLock(open)
  useEscape(open, () => setOpen(false))

  const go = (id: string) => {
    setOpen(false)
    window.setTimeout(() => scrollToSection(id), 180)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? 'bg-void/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-gutter py-4 lg:pl-20">
          <button
            type="button"
            onClick={() => go('inicio')}
            className="tap shrink-0"
            aria-label="Fusion Burger Tenerife"
          >
            <Product
              id="logo"
              alt="Fusion Burger Tenerife"
              sizes="150px"
              priority
              className="h-9 w-auto sm:h-11"
            />
          </button>

          <div className="flex items-center gap-2 sm:gap-5">
            <LangSwitch className="hidden sm:flex" />

            <button
              type="button"
              onClick={() => scrollToSection('carta')}
              className="tap hidden border border-white/25 px-5 py-3 text-micro uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-lime hover:text-lime sm:inline-flex"
            >
              {t(COPY.viewMenu)}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-principal"
              className={`tap flex h-12 w-12 items-center justify-center transition-colors lg:hidden ${
                open ? 'text-lime' : 'text-bone hover:text-lime'
              }`}
              aria-label={open ? t(COPY.closeMenu) : t(COPY.openMenu)}
            >
              {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-principal"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-void px-gutter pb-10 pt-28 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute -right-16 top-24 w-64 opacity-25">
                <Product id="crispy-burger" alt="" sizes="260px" />
              </div>
              <div className="absolute -left-20 bottom-24 w-56 opacity-20">
                <Product id="tequenos" alt="" sizes="230px" />
              </div>
            </div>

            <nav className="relative" aria-label={t({ es: 'Secciones', en: 'Sections' })}>
              <ul>
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ y: 34, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.06 + i * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => go(item.id)}
                      className="tap flex w-full items-center justify-between gap-4 py-2 text-left font-display text-d3 uppercase text-bone active:text-lime"
                    >
                      {t(item.label)}
                      <ChevronRight
                        size={20}
                        strokeWidth={1.5}
                        className="shrink-0 text-lime/60"
                        aria-hidden
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="relative flex items-end justify-between gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <LangSwitch />
              <button
                type="button"
                onClick={() => go('carta')}
                className="tap flex min-h-[50px] items-center bg-lime px-7 text-micro font-medium uppercase tracking-[0.14em] text-void"
              >
                {t(COPY.viewMenu)}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
