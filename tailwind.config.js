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
          50: '#f5f9fa',
          100: '#def1fc',
          200: '#b8def8',
          300: '#88beed',
          400: '#5898df',
          500: '#4375d2',
          600: '#3859bf',
          700: '#2d439c',
          800: '#202d71',
          900: '#121c48',
        },
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
