import { useReducedMotion } from 'framer-motion'
import { I18nProvider } from '@/lib/i18n'
import { useSmoothScroll } from '@/lib/hooks'
import { Header } from '@/components/Header'
import { Rail } from '@/components/Rail'
import { Hero } from '@/components/Hero'
import { BrandIntro } from '@/components/BrandIntro'
import { Showcase } from '@/components/Showcase'
import { PromoBand } from '@/components/PromoBand'
import { Featured } from '@/components/Featured'
import { Facts } from '@/components/Facts'
import { MenuSection } from '@/components/MenuSection'
import { Marquee } from '@/components/Marquee'
import { Locations } from '@/components/Locations'
import { FinalCta, Footer } from '@/components/Closing'
import { MobileBar } from '@/components/MobileBar'

function Site() {
  const reduced = useReducedMotion()
  useSmoothScroll(!reduced)

  return (
    <div className="grain relative">
      <a
        href="#carta"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-lime focus:px-4 focus:py-3 focus:text-micro focus:uppercase focus:text-void"
      >
        Ir a la carta
      </a>

      <Header />
      <Rail />

      <main>
        <Hero />
        <BrandIntro />
        <Showcase />
        <PromoBand />
        <Featured />
        <Facts />
        <MenuSection />
        <Marquee />
        <Locations />
        <FinalCta />
      </main>

      <Footer />
      <MobileBar />
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Site />
    </I18nProvider>
  )
}
