/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agos: {
          bg: '#06060d',
          surface: '#0c0c18',
          card: '#111120',
          border: '#1e1e38',
          accent: '#7c3aed',
          'accent-light': '#a855f7',
          cyan: '#06b6d4',
          pink: '#ec4899',
          green: '#22c55e',
          amber: '#f59e0b',
          red: '#ef4444',
          text: '#eef0ff',
          muted: '#8890b5',
          dim: '#4a4f6e',
        }
      },
      fontFamily: {
        display: ['"Exo 2"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(124,58,237,0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
