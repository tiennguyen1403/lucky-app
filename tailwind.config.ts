import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#288bcb",
        input: "#f4f4f5",
        secondary: "#364152",
        error: "#E21932",
      },
      backgroundImage: {
        primaryBgImage: "url(../public/background.jpg)",
        secondaryBgImage: "url(../public/secondary-background.jpg)",
      },
      fontFamily: {
        "playwrite-india": ["var(--font-playwrite-india)"],
      },
      animation: {
        heartBeat: "heartBeat 2s infinite",
        run: "run 5s linear infinite",
      },
      keyframes: {
        heartBeat: {
          "0%": {
            transform: "scale(1)",
          },
          "14%": {
            transform: "scale(1.2)",
          },
          "28%": {
            transform: "scale(1)",
          },
          "42%": {
            transform: "scale(1.2)",
          },
          "70%": {
            transform: "scale(1)",
          },
        },
        run: {
          "0%": {
            transform: "translate(0, 0)",
          },
          "100%": {
            transform: "translate(1200%, 0)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
