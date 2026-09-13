import { useReducedMotion } from 'framer-motion'
import { COPY } from '@/data/site'
import { useI18n } from '@/lib/i18n'

const REPEATS = 6

/**
 * Un único marquee en toda la página, con el lema real de la marca. Animación
 * de CSS sobre transform: no toca el hilo principal y se detiene sola si hay
 * reducción de movimiento.
 */
export function Marquee() {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const word = t(COPY.tagline)

  const items = Array.from({ length: REPEATS * 2 }, (_, i) => i)

  return (
    <section className="overflow-hidden border-y border-white/10 py-8 lg:py-10">
      <div className="relative" aria-hidden>
        <div
          className={`flex w-max items-center gap-10 ${reduced ? '' : 'marquee-track'}`}
          style={reduced ? undefined : { willChange: 'transform' }}
        >
          {items.map((i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display-wide whitespace-nowrap text-d4 uppercase text-bone">
                {word}
              </span>
              <span className="block h-2 w-2 shrink-0 rounded-full bg-lime" />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{word}</p>
    </section>
  )
}
