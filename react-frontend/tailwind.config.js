/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F4EBDC",
        darkText: "#1e1e1e",
        brand: {
          300: "#F8B259",
          500: "#E77840",
          600: "#D96F32",
          700: "#C65C33",
        },
      },
      backgroundImage: {
        "brand-orange": "linear-gradient(180deg, #F8B259 0%, #D96F32 100%)",
      },
      borderRadius: {
        xl2: "14px",
      },
      // ⬇️ Tambahkan ini
      fontFamily: {
        abhaya: ['"Abhaya Libre"', "serif"],
        aboreto: ['"Aboreto"', "cursive"],
      },
    },
  },
  plugins: [],
};
