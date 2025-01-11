/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: 'var(--theme)', // This is fine for your theme color.
      },
      boxShadow: {
        custom: '0px 0px 30px 8px rgba(227, 227, 227, 0.75)', // Move the shadow here.
      },
    },
  },
  plugins: [],
};
