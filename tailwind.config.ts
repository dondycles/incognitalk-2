import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      gabarito: ["var(--font-gabarito)"],
    },
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(300px,1fr))",
      },
    },
  },

  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#f43f5e",
            secondary: "#8b5cf6",
            background: "#ffffff",
            content1: "#ffffff",
            content2: "#1d1d1d",
            content3: "#1d1d1d",
          },
        },
        dark: {
          colors: {
            primary: "#f43f5e",
            secondary: "#8b5cf6",
            background: "#0d0d0d",
            content1: "#1d1d1d",
            content2: "#ffffff",
            content3: "#dddddd",
          },
        },
      },
    }),
    require("tailwind-scrollbar"),
  ],
};
export default config;
