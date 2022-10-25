/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontSize:{
        xs: 14,
        sm: 16,
        md: 16,
        lg: 20,
        xl: 24,
        '2xl':32
        
      },
      colors:{
        'gray-900': '#121214',
        'gray-800': '#202024',
        'gray-400': '#7C7C8A',
        'gray-200': '#C4C4CC',
        'gray-100': '#e1e1e6',

        'cyan-500': '#81D8F7',
        'cyan-300': '#AEE4F8',
        
        'green-600': '#51BB7A',

        'palm-700': '#789B3D'

      },
      fontFamily:{
        sans: 'Inter, sans-serif',
        display: 'Fredoka, sans-serif',
      }
    },
  },
  plugins: [],
}
