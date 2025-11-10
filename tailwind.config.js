/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "forest-green": "#1C7C54",
        "deep-green": "#11543A",
        "light-green": "#E6F4EC",
        "dark-gray": "#323232",
        "medium-gray": "#767676",
        "accent-yellow": "#C9A227",
      },
      fontFamily: {
        heading: ["Inter", "Montserrat", "sans-serif"],
        body: ["Lato", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
