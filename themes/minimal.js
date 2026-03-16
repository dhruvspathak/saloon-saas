/**
 * Minimal Theme
 * Clean, minimal design with neutral palette and focus on content
 */

export const minimalTheme = {
  name: 'minimal',
  displayName: 'Minimal',
  description: 'Clean, minimal design with neutral colors',

  colors: {
    primary: '#333333',
    primaryDark: '#000000',
    primaryLight: '#666666',
    secondary: '#CCCCCC',
    accent: '#555555',
    background: '#FAFAFA',
    text: '#333333',
    textLight: '#888888',
    border: '#DDDDDD',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
  },

  fonts: {
    heading: "'Lato', 'Arial', sans-serif",
    body: "'Roboto', 'Arial', sans-serif",
    accent: "'Lato', 'Arial', sans-serif",
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
      fontSize: '2.5rem',
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: '0em',
    },
    'heading-2': {
      fontSize: '1.875rem',
      fontWeight: '600',
      lineHeight: '1.3',
    },
    'heading-3': {
      fontSize: '1.25rem',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    'body-lg': {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.75',
    },
    'body-base': {
      fontSize: '0.9375rem',
      fontWeight: '400',
      lineHeight: '1.6',
    },
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 2px 4px rgba(0, 0, 0, 0.08)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.12)',
  },

  components: {
    button: {
      primary: {
        bg: '#333333',
        text: '#FFFFFF',
        hover: '#1a1a1a',
        padding: '0.625rem 1.5rem',
        borderRadius: '0.25rem',
        fontSize: '0.9375rem',
        fontWeight: '500',
      },
      secondary: {
        bg: '#FAFAFA',
        text: '#333333',
        hover: '#F0F0F0',
        border: '1px solid #DDDDDD',
        padding: '0.625rem 1.5rem',
        borderRadius: '0.25rem',
        fontSize: '0.9375rem',
        fontWeight: '500',
      },
    },
    card: {
      bg: '#FFFFFF',
      border: '1px solid #DDDDDD',
      borderRadius: '0.25rem',
      padding: '1.5rem',
      shadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
    },
  },

  gradients: {
    primary: 'linear-gradient(135deg, #333333 0%, #1a1a1a 100%)',
    accent: 'linear-gradient(135deg, #666666 0%, #333333 100%)',
  },
};

export default minimalTheme;
