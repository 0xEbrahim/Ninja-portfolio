/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Cascadia Code"', "Consolas", "monospace"],
        sans: ['"IBM Plex Sans"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0A0D0B",
        panel: "#111713",
        line: "#2A362D",
        cyan: "#4CC9F0",
        mint: "#7AA874",
        amber: "#EE9B00",
        muted: "#69766D",
      },
    },
  },
  plugins: [],
};
