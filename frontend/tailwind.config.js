module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#3AB0FF',
          DEFAULT: '#FFFFFF',
          dark: '#005B9A',
        },
        customGreen: '#22C55E',
        grayBg: '#f0f0f0',
      },
      backgroundImage: {
        'bg-payment': "url('./assets/Image/Signin.png')",
      },
    },
  },
  plugins: [],
};
