import { COPY, FACTS } from '@/data/site'
import { useI18n } from '@/lib/i18n'
import { Counter } from './ui/Controls'
import { Reveal, SplitText } from './ui/Type'

export function Facts() {
  const { t } = useI18n()

  return (
    <section
      id="producto"
      className="px-gutter py-16 lg:py-40 lg:pl-railpad"
    >
      <SplitText
        as="h2"
        text={t(COPY.factsTitle)}
        className="font-display-wide text-d3 uppercase lg:text-d2"
      />

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-9 lg:mt-24 lg:grid-cols-4 lg:gap-10">
        {FACTS.map((fact, i) => (
          <Reveal key={fact.label.es} delay={i * 0.07}>
            <dt className="font-display-wide text-d3 leading-none">
              <Counter to={fact.value} />
              <span className="text-lime">{fact.unit}</span>
            </dt>
            <dd className="mt-2.5 max-w-[22ch] text-note text-ash lg:mt-4">{t(fact.label)}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
