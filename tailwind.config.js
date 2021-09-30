module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
      textColor: ['active'],
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
