import { ArrowUpRight, Phone } from 'lucide-react'
import { CONTACT, COPY, LOCATIONS } from '@/data/site'
import { useI18n } from '@/lib/i18n'
import { Reveal, SplitText } from './ui/Type'

/**
 * Locales. Sin iframe de mapa: la dirección a tamaño grande y un enlace directo
 * a la navegación resuelven mejor la tarea real, que es llegar.
 */
export function Locations() {
  const { t } = useI18n()

  return (
    <section
      id="locales"
      className="px-gutter py-16 lg:py-40 lg:pl-railpad"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SplitText
          as="h2"
          text={t(COPY.locationsTitle)}
          className="font-display-wide max-w-[10ch] text-d3 uppercase lg:text-d2"
        />
        <a
          href={CONTACT.phoneHref}
          className="inline-flex items-center gap-2 text-note text-ash transition-colors hover:text-lime"
        >
          <Phone size={16} strokeWidth={1.5} aria-hidden />
          {CONTACT.phone}
        </a>
      </div>

      <div className="mt-10 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
        {LOCATIONS.map((loc, i) => (
          <Reveal key={loc.id} delay={i * 0.1}>
            <article>
              <h3 className="font-display text-d4 uppercase leading-none lg:text-d3">{loc.name}</h3>
              <p className="mt-3 text-body text-bone lg:mt-4 lg:text-lead">{loc.address}</p>
              <p className="text-body text-ash lg:text-lead">
                {loc.postcode} {loc.city}
              </p>

              <dl className="mt-5 space-y-1 lg:mt-8">
                {loc.hours.map((h, j) => (
                  <div key={j} className="flex flex-wrap gap-x-4 text-note">
                    <dt className="text-ash">{t(h.days)}</dt>
                    <dd className="tabular text-bone">{h.time}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={loc.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="tap mt-6 inline-flex min-h-[48px] items-center gap-2 border border-white/25 px-5 text-micro uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-lime hover:text-lime active:border-lime active:text-lime lg:mt-8"
              >
                {t(COPY.findUs)}
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-12 max-w-measure text-note text-ash lg:mt-20">{t(COPY.deliveryNote)}</p>
      </Reveal>
    </section>
  )
}
