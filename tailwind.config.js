/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: 'rgb(32, 34, 38)',
        light: 'rgb(250, 249, 245)',
        plain: 'rgb(51, 51, 51))',
        desc: 'rgba(175, 173, 169, 0.5)',
      },
      spacing: {
        half: '50%',
      },
    },
  },
  plugins: [],
};
