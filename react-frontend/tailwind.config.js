/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
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

        
        surface: {
          white: "#FFFFFF",      
          paper: "#E6E0DA",      
        },

       
        warning: {
          DEFAULT: "#F8B259",    
          soft: "#F6D4A9",       
          pill: "#F6C88D",       
        },

        
        dark: {
          background: "#2B2521",
          text: "#EEE3D9",
          card: "#A84F1A",
          accent: "#803113",
          border: "#B36B1C",
        },
      },

      backgroundImage: {
        "brand-orange": "linear-gradient(180deg, #F8B259 0%, #D96F32 100%)",
        "dark-safety": "linear-gradient(99.79deg, #803113 -11.2%, #D96F32 92.2%)",
        "brand-orange-90": "linear-gradient(90deg, #F8B259 0%, #D96F32 100%)",
      },


      boxShadow: {
        brand: "0 8px 22px rgba(198, 92, 51, 0.28)",        
        "brand-strong": "0 8px 22px rgba(198, 92, 51, 0.35)",
        card: "0 10px 24px rgba(0,0,0,0.10)",               
        "card-strong": "0 10px 24px rgba(0,0,0,0.35)",      
        lift: "0 18px 40px rgba(0,0,0,0.22)",               
        "lift-strong": "0 18px 40px rgba(0,0,0,0.45)",      
        token: "0 4px 8px rgba(0,0,0,0.15)",                
        soft: "0 4px 4px rgba(0,0,0,0.25)",                
      },

      borderRadius: {
        xl2: "14px",
      },

      fontFamily: {
        abhaya: ['"Abhaya Libre"', "serif"],
        aboreto: ['"Aboreto"', "cursive"],
      },
    },
  },
  plugins: [],
};
