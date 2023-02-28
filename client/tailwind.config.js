/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primaryDark":"#1F2937",
        "secondaryDark":"#374151",
        "white":"#FFFFFF",
        "primary-green":"#43A047",
        "secondary-green":"#043927",
        "third-green":"#81C784",
        "blue":"#1E88E5",
        "red":"#FF0000",
        "black":"#000000",
        "modal":"rgba(0,0,0,0.4)"
        
      }
    },
  },
  plugins: [],
}
