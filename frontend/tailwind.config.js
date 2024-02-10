/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        text: "rgba(var(--text))",
        button: "rgba(var(--button))",
        buttonDark: "rgba(var(--button-dark))",
        buttonText: "rgba(var(--button-text))",
      },
    },
  },
  plugins: [],
};
