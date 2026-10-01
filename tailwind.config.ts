import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gym: {
          bg: '#0A0A0A',
          card: '#1A1A1A',
          orange: '#FF6B00',
          orangeHover: '#FF8524',
          border: '#2A2A2A',
          muted: '#A0A0A0',
          success: '#22C55E',
          error: '#EF4444',
          warning: '#F59E0B',
        },
      },
      fontFamily: {
        heading: ['"Bebas Neue"', '"Montserrat"', 'sans-serif'],
        body: ['"Inter"', '"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'orange-glow': '0 8px 40px rgba(255, 107, 0, 0.22)',
        'btn-orange': '0 4px 15px rgba(255, 107, 0, 0.35)',
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        pill: '50px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 107, 0, 0.4)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(255, 107, 0, 0.18)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease-out forwards',
        'pulse-glow': 'pulseGlow 2.5s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
