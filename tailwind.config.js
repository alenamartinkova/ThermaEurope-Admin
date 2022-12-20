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
        13: '3.125rem', // 50px
        15: '3.75rem', // 60px
        17: '4.375rem' // 70px
      },
      colors: {
        black: '#333',
        'blue-active': '#00BACC',
        'cyan-light': '#E5F6F8',
        'error-red': '#EA0215',
        'green-active': '#42B72B',
        'gray-light': '#dbdbdb',
        'gray-hover': '#f0f0f0',
        'grey-input': '#CDD0D4',
        'grey-text': '#707070',
        'grey-border': '#C8CBD0',
        gray: {
          750: '#333'
        },
        input: '#757575'
      },
      fontFamily: {
        body: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
}
