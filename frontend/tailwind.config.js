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
        '1/36': '2.777%',
        '120': '30rem',
        '42/100': '42%',
        '240': '60rem',
        '22': '5.5rem',
        '98vw': '98vw',
        '90vw': '90vw',
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