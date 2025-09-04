/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue"
  ],
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        light: {
          // "primary": "#1a4d3a",
          // "primary-content": "#ffffff",
          // "secondary": "#8B4513",
          // "accent": "#37cdbe",
          // "neutral": "#3d4451",
          // "base-100": "#ffffff",
          // "info": "#3abff8",
          // "success": "#36d399",
          // "warning": "#fbbd23",
          // "error": "#f87272",
        },
        dark: {
          // "primary": "#2d6b4f",
          // "primary-content": "#ffffff",
          // "secondary": "#D2B48C",
          // "accent": "#37cdbe",
          // "neutral": "#3d4451",
          // "base-100": "#2a303c",
          // "info": "#3abff8",
          // "success": "#36d399",
          // "warning": "#fbbd23",
          // "error": "#f87272",
        },
      },
    ],
  },
}