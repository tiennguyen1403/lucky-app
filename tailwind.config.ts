import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
        default: {
          300: "#d4d4d8",
        },
      },
      spacing: {
        61: "244px",
        130: "520px",
      },
      screens: {
        xs: "375px",
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
        "spinner-ease-spin": "spinner-spin 0.8s ease infinite",
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
        "spinner-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(1turn)",
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ addBase, addComponents, theme }) => {
      addBase({
        ".h1": {
          fontSize: theme("fontSize.5xl"),
        },
        ".modal-title": {
          color: "#181d27",
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.semibold"),
        },
      });
      addComponents({
        ".icon-button": {
          padding: "5px",
          outline: "none",
          transition: "all 0.2s",
          borderRadius: theme("borderRadius.full"),
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.08)",
          },
        },
        ".button": {
          outline: "none",
          borderRadius: theme("borderRadius.lg"),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: theme("spacing.2"),
          transition: "all 0.2s",
        },
        ".default-button": {
          backgroundColor: "#288bcb",
          color: theme("colors.white"),
          fontSize: theme("fontSize.sm"),
          height: theme("height.9"),
          paddingInline: theme("padding.4"),
        },
        ".text-button": {
          backgroundColor: "transparent",
          color: "#181d27",
          fontSize: theme("fontSize.sm"),
          height: theme("height.9"),
          paddingInline: theme("padding.4"),
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.08)",
          },
        },
      });
    }),
  ],
} satisfies Config;
