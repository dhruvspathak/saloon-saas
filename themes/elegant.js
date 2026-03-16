/**
 * Elegant Theme
 * Refined, sophisticated design with emerald and gold accents
 */

export const elegantTheme = {
  name: 'elegant',
  displayName: 'Elegant',
  description: 'Refined, sophisticated design with emerald and gold accents',

  colors: {
    primary: '#1A5F4A',
    primaryDark: '#0D3B2E',
    primaryLight: '#2D8659',
    secondary: '#D4AF37',
    accent: '#1CB581',
    background: '#F8FBFA',
    text: '#1A1A1A',
    textLight: '#5A5A5A',
    border: '#D4E4DC',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#DC2626',
  },

  fonts: {
    heading: "'Cormorant Garamond', 'Georgia', serif",
    body: "'Work Sans', 'Segoe UI', sans-serif",
    accent: "'Playfair Display', 'Georgia', serif",
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },

  typography: {
    'heading-1': {
      fontSize: '3.25rem',
      fontWeight: '700',
      lineHeight: '1.15',
      letterSpacing: '-0.015em',
    },
    'heading-2': {
      fontSize: '2.25rem',
      fontWeight: '700',
      lineHeight: '1.25',
    },
    'heading-3': {
      fontSize: '1.75rem',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    'body-lg': {
      fontSize: '1.125rem',
      fontWeight: '400',
      lineHeight: '1.75',
    },
    'body-base': {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.65',
    },
  },

  shadows: {
    sm: '0 2px 8px rgba(13, 59, 46, 0.08)',
    md: '0 6px 16px rgba(13, 59, 46, 0.12)',
    lg: '0 12px 32px rgba(13, 59, 46, 0.15)',
    elegance: '0 20px 50px rgba(13, 59, 46, 0.18)',
  },

  components: {
    button: {
      primary: {
        bg: '#1A5F4A',
        text: '#FFFFFF',
        hover: '#0D3B2E',
        padding: '0.75rem 2.25rem',
        borderRadius: '0.375rem',
        fontSize: '1rem',
        fontWeight: '500',
      },
      secondary: {
        bg: '#F8FBFA',
        text: '#1A5F4A',
        hover: '#EBF3F0',
        border: '1px solid #1A5F4A',
        padding: '0.75rem 2.25rem',
        borderRadius: '0.375rem',
        fontSize: '1rem',
        fontWeight: '500',
      },
    },
    card: {
      bg: '#FFFFFF',
      border: '1px solid #D4E4DC',
      borderRadius: '0.5rem',
      padding: '2rem',
      shadow: '0 6px 16px rgba(13, 59, 46, 0.08)',
    },
  },

  gradients: {
    primary: 'linear-gradient(135deg, #1A5F4A 0%, #0D3B2E 100%)',
    accent: 'linear-gradient(135deg, #1CB581 0%, #1A5F4A 100%)',
  },
};

export default elegantTheme;
