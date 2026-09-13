/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta muestreada de los assets reales de Fusion Burger.
        void: '#000000', // negro puro: 5 fotos de origen vienen sobre negro y funden sin costura
        char: '#14100C', // carbon calido (unica superficie elevada del sitio)
        smoke: '#221C15',
        bone: '#FFFFFF',
        ash: '#9A9187', // gris calido para texto secundario
        lime: '#C4D745', // muestreado del logotipo oficial
        'lime-deep': '#8FA02A',
        ember: '#D7600A', // media cromatica de la fotografia de producto: solo como luz
      },
      fontFamily: {
        display: ['Archivo', 'Archivo Expanded', 'system-ui', 'sans-serif'],
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Escala tipografica: razon ~1.5 en display, 1.25 en texto
        micro: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.06em' }],
        note: ['0.8125rem', { lineHeight: '1.5' }],
        body: ['1rem', { lineHeight: '1.6' }],
        lead: ['1.25rem', { lineHeight: '1.5' }],
        d1: ['clamp(3.5rem, 15vw, 15rem)', { lineHeight: '0.82', letterSpacing: '-0.035em' }],
        d2: ['clamp(2.75rem, 9vw, 8.5rem)', { lineHeight: '0.86', letterSpacing: '-0.03em' }],
        d3: ['clamp(2rem, 5.5vw, 4.5rem)', { lineHeight: '0.92', letterSpacing: '-0.025em' }],
        d4: ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
      },
      spacing: {
        rail: '3.5rem',
        gutter: 'clamp(1.25rem, 4vw, 4.5rem)',
      },
      maxWidth: {
        measure: '62ch',
      },
      transitionTimingFunction: {
        fusion: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
