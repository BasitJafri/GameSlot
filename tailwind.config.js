/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a0a0f',
          light: '#111117',
          card: '#1a1a24',
        },
        accent: {
          DEFAULT: '#00ff87',
          dim: '#00cc6a',
          glow: 'rgba(0, 255, 135, 0.3)',
        },
        secondary: {
          DEFAULT: '#7c3aed',
          light: '#8b5cf6',
          glow: 'rgba(124, 58, 237, 0.3)',
        },
        surface: '#1a1a24',
        border: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 135, 0.3), 0 0 40px rgba(0, 255, 135, 0.1)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.1)',
        'glow-green-sm': '0 0 10px rgba(0, 255, 135, 0.2)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,255,135,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0,255,135,0.6)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        confetti: {
          '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideIn: 'slideIn 0.3s ease-out',
        float: 'float 3s ease-in-out infinite',
        spin: 'spin 1s linear infinite',
        confetti: 'confetti 3s ease-in forwards',
      },
      backgroundImage: {
        'gaming-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #111117 50%, #0d0d18 100%)',
        'card-gradient': 'linear-gradient(135deg, #1a1a24 0%, #141420 100%)',
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(0,255,135,0.08) 0%, transparent 60%)',
        'accent-gradient': 'linear-gradient(135deg, #00ff87, #00cc6a)',
        'purple-gradient': 'linear-gradient(135deg, #7c3aed, #6d28d9)',
      },
    },
  },
  plugins: [],
}
