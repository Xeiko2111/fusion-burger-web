import { NAV } from '@/data/site'
import { useI18n } from '@/lib/i18n'
import { scrollToSection, useActiveSection } from '@/lib/hooks'

const IDS = NAV.map((n) => n.id)

/**
 * Navegación de escritorio. En lugar de una barra de enlaces arriba, un raíl
 * vertical fijo en el borde izquierdo: cada sección es una marca, la activa se
 * alarga y se enciende. Ocupa el espacio de un scrollbar y se lee de un vistazo.
 */
export function Rail() {
  const { t } = useI18n()
  const active = useActiveSection(IDS)

  return (
    <nav
      aria-label={t({ es: 'Secciones', en: 'Sections' })}
      className="fixed left-0 top-0 z-40 hidden h-screen w-rail flex-col items-center justify-center gap-5 lg:flex"
    >
      {NAV.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            aria-current={isActive ? 'true' : undefined}
            className="group relative flex h-6 w-full items-center justify-center"
          >
            <span
              className={`block h-px transition-all duration-500 ease-fusion ${
                isActive
                  ? 'w-7 bg-lime'
                  : 'w-3.5 bg-white/30 group-hover:w-7 group-hover:bg-white/70'
              }`}
            />
            <span
              className={`pointer-events-none absolute left-full ml-3 whitespace-nowrap text-micro uppercase tracking-[0.18em] transition-all duration-300 ease-fusion ${
                isActive
                  ? 'translate-x-0 text-lime opacity-100'
                  : '-translate-x-1 text-bone opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}
            >
              {t(item.label)}
            </span>
          </button>
        )
      })}
    </nav>
  )
}