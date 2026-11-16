/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0a0e1a",
          dark: "#0d1117",
          card: "#151b28",
          border: "#1e293b",
          blue: "#3b82f6",
          "blue-hover": "#2563eb",
          gold: "#f59e0b",
          "gold-hover": "#d97706",
          green: "#10b981",
          red: "#ef4444",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
