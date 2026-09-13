import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { L, Locale } from '@/data/menu'

interface I18nValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (value: L) => string
  tl: (value: Record<Locale, string[]>) => string[]
}

const I18nContext = createContext<I18nValue | null>(null)

const STORAGE_KEY = 'fb-locale'

function initialLocale(): Locale {
  if (typeof window === 'undefined') return 'es'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
    }
  }, [locale])

  const setLocale = useCallback((l: Locale) => setLocaleState(l), [])
  const t = useCallback((value: L) => value[locale], [locale])
  const tl = useCallback((value: Record<Locale, string[]>) => value[locale], [locale])

  const value = useMemo(() => ({ locale, setLocale, t, tl }), [locale, setLocale, t, tl])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}

export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value)
}
