/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        text: "rgba(var(--text))",
        button: "rgba(var(--button))",
        buttonText: "rgba(var(--button-text))",
      },
    },
  },
  plugins: [],
};
