import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { BURGERS, HERO_BURGER } from '@/data/menu'
import { COPY } from '@/data/site'
import { formatPrice, useI18n } from '@/lib/i18n'
import { scrollToSection, useMediaQuery } from '@/lib/hooks'
import { Product } from './ui/Product'
import { SplitText } from './ui/Type'


function HeroMobile() {
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92svh] flex-col overflow-hidden px-gutter pb-7 pt-24"
    >
      <div className="ember-light pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10">
        <h1 className="font-display-wide text-d2 uppercase leading-[0.84]">
          <SplitText as="span" text={t(COPY.heroLine1)} onMount className="block" delay={0.1} />
          <SplitText
            as="span"
            text={t(COPY.heroLine2)}
            onMount
            className="block pl-[0.12em] text-lime"
            delay={0.2}
          />
          <SplitText as="span" text={t(COPY.heroLine3)} onMount className="block" delay={0.3} />
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-[26ch] text-body text-ash"
        >
          {t(COPY.heroSub)}
        </motion.p>
      </div>

      {}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 1.05 }}
        animate={reduced ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-1 items-center justify-center py-3"
      >
        <Product
          id="hero-burger"
          alt={`${t(HERO_BURGER.name)} — ${t(HERO_BURGER.desc!)}`}
          sizes="88vw"
          priority
          className="h-[34svh] max-h-[320px] w-auto max-w-full object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)]"
        />
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
          <p className="text-micro uppercase tracking-[0.14em] text-ash">
            {t(HERO_BURGER.name)}
          </p>
          <p className="tabular font-display text-body text-lime">
            {formatPrice(HERO_BURGER.price, locale)}
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('carta')}
            className="tap flex min-h-[52px] flex-1 items-center justify-center bg-lime px-5 text-micro font-medium uppercase tracking-[0.14em] text-void"
          >
            {t(COPY.viewMenu)}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('locales')}
            className="tap flex min-h-[52px] items-center justify-center border border-white/25 px-5 text-micro uppercase tracking-[0.14em] text-bone active:border-lime active:text-lime"
          >
            {t(COPY.findUs)}
          </button>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection('burgers')}
          className="tap mt-5 flex w-full items-center justify-center gap-2 py-2 text-note text-ash"
        >
          {t({ es: 'Descubre las burgers', en: 'Discover the burgers' })}
          <motion.span
            aria-hidden
            animate={reduced ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex text-lime"
          >
            <ChevronDown size={16} strokeWidth={2} />
          </motion.span>
        </button>
      </div>
    </section>
  )
}


function HeroDesktop() {
  const ref = useRef<HTMLElement>(null)
  const { t, locale } = useI18n()
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const burgerScale = useTransform(scrollYProgress, [0, 1], [1, 1.16])
  const burgerY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-52%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0])
  const scrim = useTransform(scrollYProgress, [0, 1], [0, 0.7])

  const still = reduced ? {} : undefined

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8"
    >
      <div className="ember-light pointer-events-none absolute inset-0 z-0" aria-hidden />

      <div className="pointer-events-none absolute right-[2vw] top-1/2 z-20 w-[49vw] max-w-[820px] -translate-y-1/2">
        <motion.div
          style={reduced ? still : { scale: burgerScale, y: burgerY }}
          initial={reduced ? false : { opacity: 0, scale: 1.07, filter: 'blur(18px)' }}
          animate={reduced ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="origin-center will-change-transform"
        >
          <Product
            id="hero-burger"
            alt={`${t(HERO_BURGER.name)} — ${t(HERO_BURGER.desc!)}`}
            sizes="49vw"
            priority
            className="h-auto w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.85)]"
          />
        </motion.div>
      </div>

      <motion.div
        style={reduced ? still : { opacity: scrim }}
        className="pointer-events-none absolute inset-0 z-[25] bg-void"
        aria-hidden
      />

      <motion.div
        style={reduced ? still : { y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-1 items-center px-gutter lg:pl-railpad"
      >
        <div>
          <h1 className="font-display-wide text-d1 uppercase leading-[0.82]">
            <SplitText as="span" text={t(COPY.heroLine1)} onMount className="block" delay={0.15} />
            <SplitText
              as="span"
              text={t(COPY.heroLine2)}
              onMount
              className="block pl-[0.12em] text-lime"
              delay={0.26}
            />
            <SplitText as="span" text={t(COPY.heroLine3)} onMount className="block" delay={0.37} />
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 max-w-[24ch] text-lead text-ash"
          >
            {t(COPY.heroSub)}
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.25 }}
        className="relative z-30 flex items-end justify-between gap-6 px-gutter lg:pl-railpad"
      >
        <p className="text-note text-ash">
          <span className="text-bone">{BURGERS.items.length}</span> {t(COPY.burgersInMenu)}
        </p>
        <div className="text-right">
          <p className="text-micro uppercase tracking-[0.16em] text-lime">{t(HERO_BURGER.name)}</p>
          <p className="tabular text-note text-ash">{formatPrice(HERO_BURGER.price, locale)}</p>
        </div>
      </motion.div>
    </section>
  )
}

export function Hero() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return isDesktop ? <HeroDesktop /> : <HeroMobile />
}
