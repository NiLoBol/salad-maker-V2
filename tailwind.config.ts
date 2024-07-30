import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

      },
      colors:{
        'Primary': '#F8B602',
        "Green": "#2FB62D",
        "Red":"#FE0000",
        "Black":"#2E2E2E",
        "Header":"#012738",
        "BG":"#F5F5F5",
        "Slate":"#A098AE",
        "Yellow":"#FFEA75",

        

      },
      boxShadow: {
        'custom': '0px 4px 8px 0px rgba(55, 62, 68, 0.25)',
        'bottombar': '11px -14px 16px 0px rgba(0, 0, 0, 0.1)',
      },
      fontSize:{
        '3xl':'32px',
        'normal':'18px',
      }

    },
  },
  plugins: [],
};
export default config;
