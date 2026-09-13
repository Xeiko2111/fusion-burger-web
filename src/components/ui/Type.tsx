import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
}

type TagName = keyof typeof TAGS

interface SplitTextProps {
  text: string
  className?: string
  /** Retardo antes de que entre la primera palabra */
  delay?: number
  /** Separación entre palabras */
  stagger?: number
  as?: TagName
  /** Si es true entra al montar; si no, al aparecer en pantalla */
  onMount?: boolean
}

/**
 * Titular por palabras: cada una sube desde detrás de una máscara. El texto
 * completo queda en aria-label y las piezas se ocultan al lector de pantalla,
 * así que la animación no rompe la semántica.
 */
export function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.055,
  as = 'span',
  onMount = false,
}: SplitTextProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')
  const Tag = TAGS[as] as typeof motion.span

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  const trigger = onMount
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, margin: '-12%' } }

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '108%' },
              visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/** Entrada de desenfocado a nítido. Reservada para el texto de apoyo. */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 14 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
