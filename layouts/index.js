/**
 * Layout System Loader
 * Centralized layout management and dynamic layout loading
 */

import layoutA from './layoutA';
import layoutB from './layoutB';
import layoutC from './layoutC';

/**
 * Layout registry with metadata
 */
const LAYOUTS = {
  layoutA: {
    name: 'layoutA',
    displayName: 'Classic Sequence',
    description: 'Optimal for service-focused businesses',
    sections: layoutA,
  },
  layoutB: {
    name: 'layoutB',
    displayName: 'Portfolio First',
    description: 'Optimal for creative businesses',
    sections: layoutB,
  },
  layoutC: {
    name: 'layoutC',
    displayName: 'Trust & Expertise',
    description: 'Optimal for professional services',
    sections: layoutC,
  },
};

/**
 * Get layout by name
 * @param {string} layoutName - Name of the layout (e.g., 'layoutA')
 * @returns {array} Array of section names in order
 */
export function getLayout(layoutName) {
  if (!layoutName || !LAYOUTS[layoutName]) {
    console.warn(`Layout not found: ${layoutName}, defaulting to layoutA`);
    return LAYOUTS.layoutA.sections;
  }

  return LAYOUTS[layoutName].sections;
}

/**
 * Get layout metadata
 * @param {string} layoutName - Name of the layout
 * @returns {object} Layout metadata
 */
export function getLayoutMetadata(layoutName) {
  if (!layoutName || !LAYOUTS[layoutName]) {
    return LAYOUTS.layoutA;
  }

  return LAYOUTS[layoutName];
}

/**
 * Get all available layouts
 * @returns {array} Array of layout names
 */
export function getAvailableLayouts() {
  return Object.keys(LAYOUTS);
}

/**
 * Get all layouts with metadata
 * @returns {object} All layouts with metadata
 */
export function getAllLayouts() {
  return LAYOUTS;
}

export default {
  LAYOUTS,
  getLayout,
  getLayoutMetadata,
  getAvailableLayouts,
  getAllLayouts,
};
