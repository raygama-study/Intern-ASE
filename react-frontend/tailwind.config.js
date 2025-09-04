/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // dari paletmu (sesuaikan hex kalau perlu)
        background: "#F4EBDC",      // krem / canvas (baris paling atas)
        darkText: "#1e1e1e",

        brand: {
          300: "#F8B259",           // oranye terang (baris terbawah)
          500: "#E77840",           // oranye medium (untuk badge/tombol sekunder)
          600: "#D96F32",           // oranye utama (gradient end)
          700: "#C65C33",           // burnt orange (primary lama kamu)
        },
      },
      backgroundImage: {
        "brand-orange": "linear-gradient(180deg, #F8B259 0%, #D96F32 100%)",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};
