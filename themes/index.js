/**
 * Theme System Loader
 * Centralized theme management and dynamic theme loading
 */

import luxuryTheme from './luxury';
import modernTheme from './modern';
import minimalTheme from './minimal';
import elegantTheme from './elegant';

/**
 * Theme registry
 */
const THEMES = {
  luxury: luxuryTheme,
  modern: modernTheme,
  minimal: minimalTheme,
  elegant: elegantTheme,
};

/**
 * Get theme by name
 * @param {string} themeName - Name of the theme
 * @returns {object} Theme configuration
 */
export function getTheme(themeName) {
  if (!themeName) {
    console.warn('Theme name not provided, defaulting to luxury');
    return THEMES.luxury;
  }

  const theme = THEMES[themeName.toLowerCase()];
  if (!theme) {
    console.warn(`Theme not found: ${themeName}, defaulting to luxury`);
    return THEMES.luxury;
  }

  return theme;
}

/**
 * Get all available themes
 * @returns {array} Array of theme names
 */
export function getAvailableThemes() {
  return Object.keys(THEMES);
}

/**
 * Get theme CSS variables object for dynamic Tailwind integration
 * @param {string} themeName - Name of the theme
 * @returns {object} CSS custom properties object
 */
export function getThemeCSSVariables(themeName) {
  const theme = getTheme(themeName);
  const cssVars = {
    '--color-primary': theme.colors.primary,
    '--color-primary-dark': theme.colors.primaryDark,
    '--color-primary-light': theme.colors.primaryLight,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-text': theme.colors.text,
    '--color-text-light': theme.colors.textLight,
    '--color-border': theme.colors.border,
    '--font-heading': theme.fonts.heading,
    '--font-body': theme.fonts.body,
  };

  return cssVars;
}

/**
 * Merge theme colors with Tailwind config
 * @param {string} themeName - Name of the theme
 * @returns {object} Tailwind-compatible color object
 */
export function getTailwindThemeColors(themeName) {
  const theme = getTheme(themeName);
  return {
    primary: {
      DEFAULT: theme.colors.primary,
      dark: theme.colors.primaryDark,
      light: theme.colors.primaryLight,
    },
    secondary: theme.colors.secondary,
    accent: theme.colors.accent,
    background: theme.colors.background,
    text: {
      DEFAULT: theme.colors.text,
      light: theme.colors.textLight,
    },
    border: theme.colors.border,
  };
}

export default {
  THEMES,
  getTheme,
  getAvailableThemes,
  getThemeCSSVariables,
  getTailwindThemeColors,
};
