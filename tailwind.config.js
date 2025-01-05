/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'white': "#ffffff",
        "white-secondary": "#f0f2f5",
        'green': "#008068",
        "green-light": "#26d466",
        'dark-green': '#222e36',
        'dark-green-light': '#00a884',
        'dark-white': '#e9edf0',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}