/**
 * Industries Module Loader
 * Centralized export and dynamic loading of industry modules
 */

import { salonModule } from './salon';
import { tattooModule } from './tattoo';
import { clinicModule } from './clinic';
import { dentistModule } from './dentist';

/**
 * Registry of all available industry modules
 */
const INDUSTRIES = {
  salon: salonModule,
  tattoo: tattooModule,
  clinic: clinicModule,
  dentist: dentistModule,
};

/**
 * Get industry module by name
 * @param {string} industryName - Name of the industry (e.g., 'salon', 'tattoo')
 * @returns {object|null} Industry module or null if not found
 */
export function getIndustryModule(industryName) {
  if (!industryName) {
    console.warn('Industry name not provided, defaulting to salon');
    return INDUSTRIES.salon;
  }

  const module = INDUSTRIES[industryName.toLowerCase()];
  if (!module) {
    console.warn(`Industry module not found: ${industryName}, defaulting to salon`);
    return INDUSTRIES.salon;
  }

  return module;
}

/**
 * Get list of all available industries
 * @returns {array} Array of industry names
 */
export function getAvailableIndustries() {
  return Object.keys(INDUSTRIES);
}

/**
 * Get all industry modules
 * @returns {object} All industry modules
 */
export function getAllIndustries() {
  return INDUSTRIES;
}

export default {
  INDUSTRIES,
  getIndustryModule,
  getAvailableIndustries,
  getAllIndustries,
};
