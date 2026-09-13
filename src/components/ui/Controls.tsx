import { useEffect, useRef, useState } from 'react'
import type { ReactNode, Ref } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useHasHover } from '@/lib/hooks'

type ButtonTone = 'solid' | 'outline'

interface ActionProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  tone?: ButtonTone
  className?: string
  external?: boolean
  ariaLabel?: string
}

/**
 * Botón que se inclina hacia el cursor. El imán solo existe donde hay hover
 * real; en táctil es un botón normal con un área de toque cómoda (48px).
 */
export function Action({
  children,
  href,
  onClick,
  tone = 'solid',
  className = '',
  external = false,
  ariaLabel,
}: ActionProps) {
  const ref = useRef<HTMLElement | null>(null)
  const hasHover = useHasHover()
  const reduced = useReducedMotion()
  const magnetic = hasHover && !reduced

  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  useEffect(() => {
    if (!magnetic) return
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.22)
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3)
    }
    const onLeave = () => {
      x.set(0)
      y.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [magnetic, x, y])

  const tones: Record<ButtonTone, string> = {
    solid: 'bg-lime text-void hover:bg-bone',
    outline: 'border border-white/25 text-bone hover:border-lime hover:text-lime',
  }
  const classes = `inline-flex min-h-[48px] items-center justify-center px-7 py-4 text-micro font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${tones[tone]} ${className}`
  const style = magnetic ? { x, y } : undefined

  if (href) {
    return (
      <motion.a
        ref={ref as unknown as Ref<HTMLAnchorElement>}
        href={href}
        style={style}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as unknown as Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      style={style}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}

interface CounterProps {
  to: number
  className?: string
  duration?: number
}

/** Cuenta hasta la cifra cuando entra en pantalla. Una sola vez. */
export function Counter({ to, className = '', duration = 1.4 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? to : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, to, duration])

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {value}
    </span>
  )
}
