/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne:  ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        apple: {
          bg:        '#000000',
          surface:   '#1c1c1e',
          elevated:  '#2c2c2e',
          separator: '#1d1d1f',
          label:     '#ffffff',
          secondary: '#8e8e93',
          tertiary:  '#48484a',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
      },
    },
  },
  plugins: [],
}
