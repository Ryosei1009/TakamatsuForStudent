module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': 'color-mix(in srgb, #382bf0 , #fff 95%)',
        'info': 'rgb(65, 88, 91)'
      },
      borderWidth: {
        '1': '1px',
        '3': '3px',
      },
      spacing: {
        '18': '72px',
        '90vh': '93vh',
        '23/24': '95.833%',
        '120': '30rem',
        '42/100': '42%',
      },
      backgroundImage: {
        'home': "url('../public/images/home/bg.png')",
      },
      rotate: {
        '135': '135deg',
        '-135': '-135deg',
      }
    },
  },
  plugins: [],
}