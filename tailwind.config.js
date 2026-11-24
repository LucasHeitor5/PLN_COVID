/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        institutional: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c3d9eb',
          300: '#94bfe0',
          400: '#5e9ed0',
          500: '#3880be',
          600: '#2765a0',
          700: '#205182',
          800: '#1d456d',
          900: '#0f263d',
          950: '#081726',
        },
        tech: {
          cyan: '#00d2ff',
          blue: '#0066ff',
          indigo: '#4f46e5',
        }
      },
    },
  },
  plugins: [],
}
