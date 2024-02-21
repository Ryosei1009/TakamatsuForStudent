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
      },
      spacing: {
        '18': '72px',
      },
    },
  },
  plugins: [],
}