/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '360px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      spacing: {
        320: '80rem',
      },
    },
    colors: {
      primary: '#3f4a52',
      secondary: '#ad7057',
      white: '#ffffff',
      shade: '#cdcbcc',
    },
  },
  plugins: [],
};
