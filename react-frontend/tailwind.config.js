/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c65c33",
        background: "#fdf6f0",
        darkText: "#1e1e1e",
        orangeGradientStart: '#F8B259',
        orangeGradientEnd: '#D96F32',
        completeprivacy: '#F8B25966',

      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(90deg, #F8B259 0%, #D96F32 100%)',
      },
      fontFamily: {
        aboreto: ["Aboreto", "serif"],
        abhaya: ["'Abhaya Libre'", "serif"],
      },
      fontSize: {
        xxl: "60px",
        xl2: "24px",
      },
      spacing: {
        17: "17px",
        30: "30px",
        60: "60px",
        70: "70px",
        100: "100px",
        107: "107px",
        256: "256px",
        243: "243px",
        425: "425px",
        590: "590px",
      },
      lineHeight: {
        tight: "100%",
      },
      letterSpacing: {
        tightest: "0%",
      },
    },
  },
  plugins: [],
};
