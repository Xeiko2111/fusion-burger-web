import { PROMO } from '@/data/site'
import { formatPrice, useI18n } from '@/lib/i18n'
import { Product } from './ui/Product'
import { Reveal } from './ui/Type'

/**
 * Promoción real publicada por el local. Usa la mascota original recortada del
 * gráfico promocional: es la única pieza ilustrada de la marca y aquí es donde
 * tiene sentido, porque esta franja habla de oferta, no de producto.
 */
export function PromoBand() {
  const { t, locale } = useI18n()

  return (
    <section className="relative overflow-hidden border-y border-white/10 px-gutter py-10 lg:py-16 lg:pl-railpad">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          {/* En móvil la mascota y el precio comparten fila con el título: la
              oferta se entiende sin bajar */}
          <div className="flex items-center gap-4 sm:block">
            <Product
              id="mascot"
              alt=""
              sizes="120px"
              className="h-16 w-auto shrink-0 sm:h-28 lg:h-32"
            />
            <div className="sm:hidden">
              <h2 className="font-display text-d4 uppercase leading-none">{t(PROMO.title)}</h2>
              <p className="tabular font-display-wide mt-1 text-d4 leading-none text-lime">
                {formatPrice(PROMO.price, locale)}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-display hidden text-d4 uppercase sm:block">{t(PROMO.title)}</h2>
            <p className="max-w-[46ch] text-body text-ash sm:mt-2">{t(PROMO.what)}</p>
            <p className="mt-2 max-w-[62ch] text-note text-ash/70 sm:mt-3">{t(PROMO.terms)}</p>
          </div>

          <p className="tabular font-display-wide hidden shrink-0 text-d3 leading-none text-lime sm:block">
            {formatPrice(PROMO.price, locale)}
          </p>
        </div>
      </Reveal>
    </section>
  )
}
