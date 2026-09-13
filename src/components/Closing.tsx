import { BURGERS } from '@/data/menu'
import { CONTACT, COPY, LOCATIONS } from '@/data/site'
import { useI18n } from '@/lib/i18n'
import { scrollToSection } from '@/lib/hooks'
import { Product } from './ui/Product'
import { Action } from './ui/Controls'
import { Reveal, SplitText } from './ui/Type'

export function FinalCta() {
  const { t } = useI18n()

  return (
    <section id="cierre" className="relative overflow-hidden px-gutter py-20 text-center lg:py-48">
      <div className="ember-light pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <Product
            id="logo"
            alt="Fusion Burger Tenerife"
            sizes="(max-width: 768px) 70vw, 420px"
            className="mx-auto h-auto w-[62vw] max-w-[420px]"
          />
        </Reveal>

        <SplitText
          as="h2"
          text={t(COPY.ctaTitle)}
          className="font-display-wide mt-8 text-d3 uppercase leading-[0.88] lg:mt-14 lg:text-d2"
        />

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-12">
            <Action onClick={() => scrollToSection('carta')}>{t(COPY.viewMenu)}</Action>
            <Action tone="outline" onClick={() => scrollToSection('locales')}>
              {t(COPY.findUs)}
            </Action>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 text-note text-ash lg:mt-12">
            <span className="text-bone">{BURGERS.items.length}</span> {t(COPY.burgersInMenu)}
            <span className="mx-3 inline-block h-1 w-1 -translate-y-1 rounded-full bg-lime align-middle" />
            <span className="text-bone">{CONTACT.locationCount}</span> {t(COPY.locationsInTenerife)}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 px-gutter pb-28 pt-14 lg:pb-14 lg:pl-railpad">
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div>
          <Product id="logo" alt="Fusion Burger Tenerife" sizes="180px" className="h-10 w-auto" />
          <p className="mt-5 text-note text-ash">{t(COPY.deliveryNote)}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:gap-16">
          <div>
            <h3 className="text-micro uppercase tracking-[0.16em] text-ash">
              {t(COPY.locationsTitle)}
            </h3>
            <ul className="mt-4 space-y-3">
              {LOCATIONS.map((loc) => (
                <li key={loc.id} className="text-note">
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-bone transition-colors hover:text-lime"
                  >
                    {loc.name}
                  </a>
                  <span className="block text-ash">{loc.city}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-micro uppercase tracking-[0.16em] text-ash">
              {t({ es: 'Contacto', en: 'Contact' })}
            </h3>
            <ul className="mt-4 space-y-3 text-note">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-bone transition-colors hover:text-lime"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-bone transition-colors hover:text-lime"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.tiktok}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-bone transition-colors hover:text-lime"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-micro uppercase tracking-[0.16em] text-ash">
              {t({ es: 'Más', en: 'More' })}
            </h3>
            <ul className="mt-4 space-y-3 text-note">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('carta')}
                  className="text-bone transition-colors hover:text-lime"
                >
                  {t(COPY.viewMenu)}
                </button>
              </li>
              <li>
                <a
                  href={CONTACT.jobsForm}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-bone transition-colors hover:text-lime"
                >
                  {t(COPY.jobs)}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-10 text-micro text-ash/60 lg:mt-14">
        © {year} Fusion Burger Tenerife. {CONTACT.instagramHandle}
      </p>
    </footer>
  )
}
