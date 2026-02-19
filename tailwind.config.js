/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#e8dcc4',
          dark: '#d4c4a4',
          light: '#f5ead2',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
          muted: '#4a4a4a',
        },
        gold: {
          DEFAULT: '#c9a961',
          muted: '#b89851',
          dipped: '#8b7355',
        },
      },
      fontFamily: {
        display: ['"Rye"', 'serif'],
        body: ['"Crimson Text"', 'serif'],
      },
      backgroundImage: {
        'grunge-overlay': "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
        'noise': "url('https://www.transparenttextures.com/patterns/stardust.png')",
      },
    },
  },
  plugins: [],
}
