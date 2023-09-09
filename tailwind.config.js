// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        planet: {
          "100%" : {
            backgroundPosition: "-12000px",
          }
        },
        sunX: {
          "100%": {
            backgroundPositionX: "-12000px",
          }
        },
        sunY: {
          "100%": {
            backgroundPositionY: "-800px",
          },
        }
      },
      animation: {
        "planet": "planet 12s steps(120) infinite",
        "sun": "sunX 6s steps(60) infinite, sunY 24s steps(4) infinite"
      }
    },
    fontFamily: {
      'speedy': ['Speedy']
    }
  },
  plugins: [],
}

