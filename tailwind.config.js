/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px'
    },
    extend: {
      borderRadius: {
        5: '0.3125rem',
        10: '0.625rem',
        25: '1.5625rem'
      },
      spacing: {
        13: '3.125', // 50px
        15: '3.75rem', // 60px
        17: '4.375rem' // 70px
      },
      colors: {
        black: '#333',
        'cyan-light': '#E5F6F8',
        'gray-light': '#dbdbdb',
        'gray-hover': '#f0f0f0',
        'grey-input': '#CDD0D4',
        gray: {
          750: '#333'
        }
      },
      fontFamily: {
        body: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
}
