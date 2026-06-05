/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5A5F', // Coral Red
        'deep-text': '#222222', // Airbnb Black
        'body-text': '#484848', // Soft Dark Gray
        muted: '#717171', // Neutral Gray
        surface: '#FFFFFF', // Pure White
        background: '#F7F7F7', // Soft Gray
        border: '#EBEBEB', // Light Border
        success: '#008A05', // Positive Indicator
        warning: '#FFB400', // Alert Indicator
        error: '#D93025', // Risk/Error
        hover: '#F2F2F2', // Hover Surface
        // Data blue for total comp as specified in F2
        'data-blue': '#0369A1', 
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { transform: 'translateY(20px)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
      },
    },
  },
  plugins: [],
};