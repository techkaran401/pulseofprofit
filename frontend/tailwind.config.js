/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#050505',
        darkSecondary: '#0D1624',
        cardBg: 'rgba(18, 24, 38, 0.78)',
        cardBorder: 'rgba(255, 255, 255, 0.08)',
        primaryBlue: '#2D9CFF',
        primaryCyan: '#42E8FF',
        emeraldSuccess: '#4DFFB8',
        textMuted: '#A0A7B5',
        primary: {
          DEFAULT: '#2D9CFF',
          dark: '#1B82D9',
          light: '#42E8FF',
        },
        bg: {
          dark: '#050505',
          card: '#0D1624',
          hover: '#141F33',
          light: '#FFFFFF',
          cardLight: '#F3F4F6',
          hoverLight: '#E5E7EB',
        },
        text: {
          dark: '#FFFFFF',
          muted: '#A0A7B5',
          light: '#1F2937',
          mutedLight: '#6B7280',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        'custom': '20px',
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(66, 232, 255, 0.25)',
        'neon-blue': '0 0 25px rgba(45, 156, 255, 0.25)',
        'neon-emerald': '0 0 25px rgba(77, 255, 184, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'cyan-gradient': 'linear-gradient(135deg, #2D9CFF 0%, #42E8FF 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #2D9CFF 0%, #4DFFB8 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
