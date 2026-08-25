/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#f4f7fb",
        surface: "#ffffff",
        ink: "#0f172a",
        muted: "#475569",
        brand: {
          50: "#eefaf8",
          100: "#d4f3ed",
          200: "#a8e6db",
          300: "#78d5c6",
          400: "#4fc1af",
          500: "#229a8a",
          600: "#18796d",
          700: "#135e56",
          800: "#124c47",
          900: "#103f3c"
        },
        accent: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5"
        },
        danger: "#dc2626",
        warning: "#d97706",
        success: "#15803d"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)",
        insetsoft: "inset 0 1px 0 rgba(255,255,255,0.5)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    }
  },
  plugins: []
}
