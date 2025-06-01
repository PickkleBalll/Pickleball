module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3AB0FF',
          DEFAULT: '#FFFFFF',
          dark: '#005B9A',
        },
        customGreen: '#22C55E',
        grayBg: '#f0f0f0',
      },
    },
  },
  plugins: [],
};
