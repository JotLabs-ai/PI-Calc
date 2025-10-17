/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC971F',
          dark: '#B47812',
          light: '#e19623',
        },
        dark: {
          DEFAULT: '#333',
          light: '#555',
        },
        gold: {
          DEFAULT: '#DC971F',
          dark: '#B47812',
        },
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      fontSize: {
        'h1': ['42px', { lineHeight: '1.2' }],
        'h1-mobile': ['36px', { lineHeight: '1.2' }],
        'h2': ['32px', { lineHeight: '1.3' }],
        'h2-mobile': ['25px', { lineHeight: '1.3' }],
        'h3': ['30px', { lineHeight: '1.3' }],
        'h3-mobile': ['24px', { lineHeight: '1.3' }],
        'h4': ['29px', { lineHeight: '1.3' }],
        'h4-mobile': ['23px', { lineHeight: '1.3' }],
        'body': ['21px', { lineHeight: '1.6' }],
        'body-mobile': ['16px', { lineHeight: '1.6' }],
      },
      screens: {
        'tablet': '768px',
        'desktop': '960px',
      },
    },
  },
  plugins: [],
}
