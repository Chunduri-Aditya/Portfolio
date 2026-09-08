/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Tactical Telemetry HUD: 90° corners everywhere.
    borderRadius: {
      none: '0',
      DEFAULT: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '9999px', // reserved for status dots / pills only
    },
    extend: {
      colors: {
        ground: {
          DEFAULT: '#0a0a0a',
          raised: '#121212',
          deep: '#060606',
        },
        phosphor: {
          DEFAULT: '#eaeaea',
          dim: '#8a8a8a',
          faint: '#5a5a5a',
        },
        hairline: '#2a2a2a',
        hazard: {
          DEFAULT: '#e61919',
          bright: '#ff2a2a',
        },
        online: '#4af626',
      },
      fontFamily: {
        sans: ['"Archivo Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Archivo Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', '"Fira Code"', 'monospace'],
      },
      letterSpacing: {
        hud: '0.14em',
        crush: '-0.04em',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
        hud: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'scan-sweep': 'scan-sweep 7s linear infinite',
        'blink': 'blink 1.1s steps(1, end) infinite',
      },
      keyframes: {
        'scan-sweep': {
          '0%': { transform: 'translateY(-60%)' },
          '100%': { transform: 'translateY(320%)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
