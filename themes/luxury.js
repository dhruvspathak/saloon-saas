/**
 * Luxury Theme
 * Premium, elegant design with rose-gold accents and serif typography
 */

export const luxuryTheme = {
  name: 'luxury',
  displayName: 'Luxury',
  description: 'Premium, elegant design with rose-gold accents',

  colors: {
    primary: '#B76E79',
    primaryDark: '#9B5A63',
    primaryLight: '#D4949D',
    secondary: '#F5E6E8',
    accent: '#D4AF37',
    background: '#FAFAFA',
    text: '#2C2C2C',
    textLight: '#666666',
    border: '#E5D5D8',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },

  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', 'Segoe UI', sans-serif",
    accent: "'Josefin Sans', 'Segoe UI', sans-serif",
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
      fontSize: '3.5rem',
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
    'heading-2': {
      fontSize: '2.5rem',
      fontWeight: '700',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
    'heading-3': {
      fontSize: '1.875rem',
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
      lineHeight: '1.625',
    },
  },

  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 30px rgba(0, 0, 0, 0.15)',
    elegance: '0 20px 60px rgba(0, 0, 0, 0.15)',
  },

  components: {
    button: {
      primary: {
        bg: '#B76E79',
        text: '#FFFFFF',
        hover: '#9B5A63',
        padding: '0.75rem 2rem',
        borderRadius: '0.375rem',
        fontSize: '1rem',
      },
      secondary: {
        bg: '#F5E6E8',
        text: '#B76E79',
        hover: '#E5D5D8',
        padding: '0.75rem 2rem',
        borderRadius: '0.375rem',
        fontSize: '1rem',
      },
    },
    card: {
      bg: '#FFFFFF',
      border: '1px solid #E5D5D8',
      borderRadius: '0.5rem',
      padding: '2rem',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
  },

  gradients: {
    primary: 'linear-gradient(135deg, #B76E79 0%, #9B5A63 100%)',
    accent: 'linear-gradient(135deg, #D4AF37 0%, #B76E79 100%)',
  },
};

export default luxuryTheme;
