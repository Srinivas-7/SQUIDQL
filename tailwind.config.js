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
        paper: '#f5f3ea',
        ink: '#0a0a0a',
        acid: {
          DEFAULT: '#e8ff00',
          hover: '#f0ff33',
        },
        pink: {
          DEFAULT: '#ff5e8a',
          hover: '#ff759c',
        },
        sky: {
          DEFAULT: '#5ec8ff',
          hover: '#7cd3ff',
        },
        brutal: {
          paper: '#f5f3ea',
          ink: '#0a0a0a',
          acid: '#e8ff00',
          pink: '#ff5e8a',
          sky: '#5ec8ff',
        }
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
        'hard-xs': '2px 2px 0 0 #0a0a0a',
        'hard-sm': '4px 4px 0 0 #0a0a0a',
        'hard': '6px 6px 0 0 #0a0a0a',
        'hard-lg': '10px 10px 0 0 #0a0a0a',
        'hard-xl': '14px 14px 0 0 #0a0a0a',
        'hard-acid': '6px 6px 0 0 #e8ff00',
        'hard-acid-lg': '10px 10px 0 0 #e8ff00',
        'hard-pink': '6px 6px 0 0 #ff5e8a',
        'hard-sky': '6px 6px 0 0 #5ec8ff',
        'hard-paper': '6px 6px 0 0 #f5f3ea',
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
