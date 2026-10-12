/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Approved 5-Color Brand Palette
        charcoal: {
          DEFAULT: '#1C1C1C',
          surface: '#1C1C1C',
          elevated: '#242424',
        },
        indigo: {
          DEFAULT: '#4C1D95',
          hover: '#3B0764',
          subtle: 'rgba(76, 29, 149, 0.15)',
        },
        violet: {
          DEFAULT: '#A78BFA',
          hover: '#9065f7',
          subtle: 'rgba(167, 139, 250, 0.15)',
        },
        warmwhite: {
          DEFAULT: '#F4F4F0',
          hover: '#e8e8e3',
        },
        warmsilver: {
          DEFAULT: '#C9C5B9',
          muted: 'rgba(201, 197, 185, 0.6)',
          border: 'rgba(201, 197, 185, 0.3)',
        },
      },
      fontFamily: {
        arcade: ['"Arcade Classic"', 'monospace', 'sans-serif'],
        display: ['"Arcade Classic"', 'monospace', 'sans-serif'],
        pixel: ['"Arcade Classic"', 'monospace', 'sans-serif'],
        codedex: ['"Arcade Classic"', 'monospace', 'sans-serif'],
        grotesk: ['"Archivo"', 'system-ui', 'sans-serif'],
        sans: ['"Archivo"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 #1C1C1C',
        'brutal-sm': '2px 2px 0 0 #1C1C1C',
        'brutal-lg': '8px 8px 0 0 #1C1C1C',
        'brutal-indigo': '4px 4px 0 0 #4C1D95',
        'brutal-violet': '4px 4px 0 0 #A78BFA',
        'brutal-silver': '4px 4px 0 0 rgba(201, 197, 185, 0.35)',
        'hard-xs': '2px 2px 0 0 currentColor',
        'hard-sm': '3px 3px 0 0 currentColor',
        'hard': '5px 5px 0 0 currentColor',
        'hard-lg': '8px 8px 0 0 currentColor',
        'hard-xl': '12px 12px 0 0 currentColor',
        'hard-indigo': '5px 5px 0 0 #4C1D95',
        'hard-violet': '5px 5px 0 0 #A78BFA',
        'hard-silver': '5px 5px 0 0 #C9C5B9',
        'hard-charcoal': '5px 5px 0 0 #1C1C1C',
      },
      borderWidth: {
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
      letterSpacing: {
        'tracker': '0.18em',
      },
      animation: {
        'marquee': 'marquee 26s linear infinite',
        'marquee-reverse': 'marquee-reverse 26s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
