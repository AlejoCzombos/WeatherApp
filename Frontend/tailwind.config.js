/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sky': {
          '50': '#eff8ff',
          '100': '#daeeff',
          '200': '#bee2ff',
          '300': '#91d0ff',
          '400': '#5eb6fc',
          '500': '#3b97f9',
          '600': '#2277ee',
          '700': '#1a61db',
          '800': '#1c4fb1',
          '900': '#1c458c',
          '950': '#142a5f',
        },
      }
    }
  },
  plugins: []
}
