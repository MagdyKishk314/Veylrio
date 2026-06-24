/**
 * Veylrio — Tailwind configuration
 * Brand source of truth: Palette B (Teal & Terracotta) — PRIMARY.
 * Alternate Palette D (Espresso & Sage) tokens are included for subtle sections.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/js/**/*.js',
    './utils/icons.js',
  ],
  theme: {
    // Calm, editorial container — generous gutters, capped reading width.
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1180px',
        '2xl': '1180px',
      },
    },
    extend: {
      colors: {
        // ── PRIMARY · Teal & Terracotta ──────────────────────────────────
        ink: {
          DEFAULT: '#123A36', // Ink / Teal
          50: '#EAF0EE',
          100: '#CEDCD9',
          200: '#9FBAB5',
          300: '#6E938D',
          400: '#3F6A64',
          500: '#1E4A45',
          600: '#163F3A',
          700: '#123A36', // brand ink
          800: '#0E2D2A',
          900: '#0A211F',
          950: '#061513',
        },
        clay: {
          DEFAULT: '#C56A4A', // Accent / Clay
          300: '#E9AB91',
          400: '#E0906F', // Accent on dark
          500: '#D27A58',
          600: '#C56A4A', // brand clay
          700: '#A8543A',
          800: '#86412D',
        },
        paper: {
          DEFAULT: '#F0EBE1', // Paper
          100: '#F6F2EA',
          200: '#EAE3D6',
          300: '#DED4C3',
        },
        cream: '#F2EEE6', // reversed-logo cream
        // ── ALTERNATE · Espresso & Sage (use sparingly) ──────────────────
        espresso: '#2A2723',
        sage: {
          DEFAULT: '#7E9B82',
          400: '#9DB8A1',
        },
        paperAlt: '#F2ECE2',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      fontSize: {
        // Fluid display sizes for hero / section headings.
        'display-sm': ['clamp(1.9rem, 1.2rem + 2.6vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.4rem, 1.4rem + 3.6vw, 3.9rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.9rem, 1.6rem + 4.6vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      maxWidth: {
        prose: '68ch',
        measure: '54ch',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 33, 31, 0.04), 0 8px 24px -12px rgba(10, 33, 31, 0.16)',
        'card-hover': '0 2px 4px rgba(10, 33, 31, 0.06), 0 18px 40px -16px rgba(10, 33, 31, 0.28)',
        ring: '0 0 0 1px rgba(18, 58, 54, 0.08)',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'rise-in': 'rise-in 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('@tailwindcss/typography'),
  ],
};
