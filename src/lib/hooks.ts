import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

/**
 * Smooth scroll global. Se desactiva por completo si el usuario ha pedido
 * reducción de movimiento: en ese caso el scroll nativo es lo correcto.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      lenisInstance?.destroy()
      lenisInstance = null
      return
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Curva pesada pero que llega rápido al reposo: scroll "con cuerpo",
      // no lento. Ver README, sección de motion.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      syncTouch: false,
    })
    lenisInstance = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: 0, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** true en dispositivos donde el hover es real (evita interacciones táctiles rotas) */
export function useHasHover(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}

/**
 * Devuelve el id de la sección visible. Un solo IntersectionObserver para
 * todas: nada de listeners de scroll por sección.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  const ratios = useRef(new Map<string, number>())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = ''
        let bestRatio = 0
        for (const [id, ratio] of ratios.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (best) setActive(best)
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9], rootMargin: '-10% 0px -40% 0px' },
    )

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids])

  return active
}

/** Bloquea el scroll del body mientras hay una capa a pantalla completa abierta. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenisInstance?.stop()
    return () => {
      document.body.style.overflow = previous
      lenisInstance?.start()
    }
  }, [locked])
}

/** Evento de teclado global para cerrar capas con Escape. */
export function useEscape(active: boolean, onEscape: () => void) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    },
    [onEscape],
  )
  useEffect(() => {
    if (!active) return
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, handler])
}
