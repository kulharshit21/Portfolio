/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },
      maxWidth: {
        site: 'min(90rem, calc(100vw - 2rem))',
      },
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        border: '#1f1f1f',
        foreground: '#f0ede8',
        muted: '#6b6b6b',
        accent: '#e8d5b0',
        'accent-2': '#4a9eff',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
