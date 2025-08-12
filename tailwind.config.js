
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 70% 50%)',
        accent: 'hsl(40 90% 55%)',
        bg: 'hsl(240 5% 98%)',
        surface: 'hsl(240 5% 100%)',
        textPrimary: 'hsl(240 5% 15%)',
        textSecondary: 'hsl(240 5% 45%)',
        border: 'hsl(240 5% 90%)',
        muted: 'hsl(240 5% 95%)',
        success: 'hsl(142 70% 45%)',
        warning: 'hsl(38 92% 50%)',
        error: 'hsl(0 84% 60%)',
      },
      fontSize: {
        display: ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700', letterSpacing: '-0.025em' }],
        heading: ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.75rem' }],
        caption: ['0.875rem', { lineHeight: '1.25rem' }],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(230, 50%, 15%, 0.08)',
        glow: '0 0 20px hsla(240, 70%, 50%, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
