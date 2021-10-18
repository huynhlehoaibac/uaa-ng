const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        navy: {
          50: '#e4eefc',
          100: '#bad5f8',
          200: '#8db9f4',
          300: '#5f9def',
          400: '#3c88eb',
          500: '#1a73e8',
          600: '#176be5',
          700: '#1360e2',
          800: '#0f56de',
          900: '#0843d8',
        },
      },
      padding: {
        '2px': '2px'
      },
      margin: {
        '-2px': '-2px'
      },
      transformOrigin: {
        "0": "0%",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['checked', 'responsive', 'hover', 'focus', 'focus-within'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
