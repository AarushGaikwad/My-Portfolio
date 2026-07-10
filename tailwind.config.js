/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12141C",
        paper: "#ECE7DC",
        slate: "#8A93A3",
        amber: "#D9A441",
        line: "#2A2E38",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        pixel: ["'Press Start 2P'", "monospace"],
      },
    },
  },
  plugins: [],
}