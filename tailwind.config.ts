import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#FAFAF9",
          surface: "#FFFFFF",
          "surface-hover": "#F5F5F4",
          code: "#0D1117",
        },
        border: {
          default: "#E3E3E1",
          strong: "#C7C7C4",
          focus: "#4D8BFF",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#6B6B6B",
          tertiary: "#999999",
          "on-code": "#E6E6E6",
        },
        accent: {
          primary: "#2F6FED",
          "primary-hover": "#2559C4",
          "primary-active": "#1C47A4",
          subtle: "#EBF2FF",
        },
        status: {
          success: "#1E8E5A",
          "success-bg": "#E6F4ED",
          error: "#D2492A",
          "error-bg": "#FCEBE8",
          warning: "#C48A0A",
          "warning-bg": "#FEF7E6",
        },
        diff: {
          "added-bg-dark": "#133D27",
          "added-text-dark": "#3FB950",
          "removed-bg-dark": "#4B1818",
          "removed-text-dark": "#F85149",
          "added-bg-light": "#E3F6EA",
          "removed-bg-light": "#FBEAEA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Source Code Pro", "monospace"],
      },
      fontSize: {
        display: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        h1: ["24px", { lineHeight: "32px", fontWeight: "700" }],
        h2: ["19px", { lineHeight: "26px", fontWeight: "600" }],
        h3: ["16px", { lineHeight: "22px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        small: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        tiny: ["12px", { lineHeight: "16px", fontWeight: "500" }],
        code: ["14px", { lineHeight: "22px", fontWeight: "400" }],
      },
      spacing: {
        "3xs": "2px",
        "2xs": "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        card: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
        popover: "0 4px 12px rgba(0, 0, 0, 0.12)",
        modal: "0 8px 24px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

