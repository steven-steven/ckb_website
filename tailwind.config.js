module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FBF9EB',
        secondary: '#959C69',
      },
      screens: {
        'xs': '350px',
        'xxs': '270px',
      },
    },
  },
  plugins: [],
}
