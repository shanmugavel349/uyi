/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          primary: '#1b4332',
          accent: '#2d6a4f',
          light: '#40916c',
          leaf: '#52b788',
          mint: '#74c69d',
          bg: '#f8faf9'
        },
        risk: {
          low: '#16a34a',
          moderate: '#d97706',
          high: '#dc2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Tamil', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 67, 50, 0.08)',
        'float': '0 10px 30px -4px rgba(27, 67, 50, 0.15)',
        'pulse-glow': '0 0 0 8px rgba(45, 106, 79, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 1.5s ease-out infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
