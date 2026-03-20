/**
 * Modern Theme
 * Contemporary, bold design with dark accents and clean typography
 */

export const modernTheme = {
  name: 'modern',
  displayName: 'Modern',
  description: 'Contemporary design with bold accents and clean lines',

  colors: {
    primary: '#1F2937',
    primaryDark: '#111827',
    primaryLight: '#374151',
    secondary: '#3B82F6',
    accent: '#60A5FA',
    background: '#FFFFFF',
    text: '#111827',
    textLight: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },

  fonts: {
    heading: "'Montserrat', 'Inter', sans-serif",
    body: "'Open Sans', 'Segoe UI', sans-serif",
    accent: "'Poppins', 'Segoe UI', sans-serif",
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
      fontSize: '3rem',
      fontWeight: '800',
      lineHeight: '1.1',
      letterSpacing: '-0.03em',
    },
    'heading-2': {
      fontSize: '2.25rem',
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
    'heading-3': {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    'body-lg': {
      fontSize: '1.125rem',
      fontWeight: '500',
      lineHeight: '1.75',
    },
    'body-base': {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.6',
    },
  },

  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
    md: '0 4px 8px rgba(0, 0, 0, 0.15)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.25)',
  },

  components: {
    button: {
      primary: {
        bg: '#3B82F6',
        text: '#FFFFFF',
        hover: '#2563EB',
        padding: '0.625rem 1.75rem',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: '600',
      },
      secondary: {
        bg: '#F3F4F6',
        text: '#1F2937',
        hover: '#E5E7EB',
        padding: '0.625rem 1.75rem',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: '600',
      },
    },
    card: {
      bg: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      shadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  },

  gradients: {
    primary: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    accent: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
  },
};

export default modernTheme;
