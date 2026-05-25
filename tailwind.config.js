/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#eefbf2',
          100: '#d6f5df',
          200: '#a7e0c0',
          300: '#7cc89f',
          400: '#4eaf7b',
          500: '#33684f',
          600: '#2a5641',
          700: '#224435',
          800: '#1a3328',
          900: '#11221b',
        },
        charcoal: {
          50: '#f5f5f5',
          100: '#e8e8ed',
          200: '#d1d1d6',
          300: '#b0b0b8',
          400: '#8e8e93',
          500: '#707070',
          600: '#5f5e60',
          700: '#4a4a4d',
          800: '#363639',
          900: '#2c2c2c',
        },
        alert: {
          orange: '#FF9500',
          red: '#FF3B30',
        },
        surface: {
          bg: '#F5F5F7',
          card: '#FFFFFF',
          dim: '#E5E5EA',
        }
      },
      fontFamily: {
        din: ['DIN Alternate', 'Inter', 'sans-serif'],
        sans: ['PingFang SC', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'PingFang SC', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['42px', { fontWeight: '700', lineHeight: '1.2' }],
        'headline': ['24px', { fontWeight: '600', lineHeight: '32px' }],
        'headline-sm': ['20px', { fontWeight: '600', lineHeight: '28px' }],
        'headline-xs': ['18px', { fontWeight: '600', lineHeight: '24px' }],
        'body': ['16px', { fontWeight: '400', lineHeight: '24px' }],
        'body-sm': ['14px', { fontWeight: '400', lineHeight: '20px' }],
        'label': ['12px', { fontWeight: '600', lineHeight: '16px', letterSpacing: '0.05em' }],
        'label-sm': ['12px', { fontWeight: '400', lineHeight: '16px' }],
      },
      borderRadius: {
        'card': '16px',
        'modal': '20px',
        'btn': '12px',
      },
      boxShadow: {
        'card': '0px 2px 12px rgba(0,0,0,0.06)',
        'modal': '0px -4px 24px rgba(0,0,0,0.12)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}
