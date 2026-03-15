/**
 * Salon Configuration Loader
 * Dynamically loads salon configurations from config/salons/ directory
 * Supports both multi-tenant and single-tenant (backward compatible) modes
 */

import fs from 'fs';
import path from 'path';

/**
 * Load salon configuration by slug
 * @param {string} slug - Salon slug/identifier
 * @returns {object|null} Salon configuration or null if not found
 */
export function loadSalonConfig(slug) {
  try {
    if (!slug) {
      return null;
    }

    // Construct path to salon config
    const configPath = path.join(
      process.cwd(),
      'config',
      'salons',
      `${slug}.json`
    );

    // Check if file exists
    if (!fs.existsSync(configPath)) {
      console.warn(`Salon config not found: ${configPath}`);
      return null;
    }

    // Read and parse JSON
    const fileContent = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(fileContent);

    // Validate required fields
    if (!config.salon || !config.salon.id || !config.salon.slug) {
      console.error(`Invalid salon config for slug: ${slug}`);
      return null;
    }

    return config;
  } catch (error) {
    console.error(`Error loading salon config for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Load default salon configuration (backward compatibility)
 * Falls back to config/salon.json if it exists
 * @returns {object|null} Default salon configuration
 */
export function loadDefaultSalonConfig() {
  try {
    const defaultPath = path.join(process.cwd(), 'config', 'salon.json');

    if (!fs.existsSync(defaultPath)) {
      console.warn('Default salon config not found: config/salon.json');
      return null;
    }

    const fileContent = fs.readFileSync(defaultPath, 'utf-8');
    const config = JSON.parse(fileContent);

    return config;
  } catch (error) {
    console.error('Error loading default salon config:', error);
    return null;
  }
}

/**
 * List all available salon slugs
 * @returns {string[]} Array of available salon slugs
 */
export function listAvailableSalons() {
  try {
    const salonsDir = path.join(process.cwd(), 'config', 'salons');

    if (!fs.existsSync(salonsDir)) {
      return [];
    }

    const files = fs.readdirSync(salonsDir);
    const slugs = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''));

    return slugs;
  } catch (error) {
    console.error('Error listing available salons:', error);
    return [];
  }
}

/**
 * Load all salon configurations
 * @returns {object} Object with slug as key and config as value
 */
export function loadAllSalonConfigs() {
  try {
    const slugs = listAvailableSalons();
    const configs = {};

    for (const slug of slugs) {
      const config = loadSalonConfig(slug);
      if (config) {
        configs[slug] = config;
      }
    }

    return configs;
  } catch (error) {
    console.error('Error loading all salon configs:', error);
    return {};
  }
}

/**
 * Validate salon configuration schema
 * @param {object} config - Salon configuration to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateSalonConfig(config) {
  // Required top-level keys
  const requiredKeys = ['salon'];

  if (!config) {
    return false;
  }

  // Check required keys
  for (const key of requiredKeys) {
    if (!(key in config)) {
      console.error(`Missing required key in salon config: ${key}`);
      return false;
    }
  }

  // Validate salon object
  const { salon } = config;
  const salonRequiredKeys = ['id', 'slug', 'name'];

  for (const key of salonRequiredKeys) {
    if (!(key in salon)) {
      console.error(`Missing required key in salon.${key}`);
      return false;
    }
  }

  return true;
}

/**
 * Get salon config with fallback
 * Tries to load specific salon, falls back to default if not found
 * @param {string} slug - Salon slug (optional)
 * @returns {object|null} Salon configuration
 */
export function getSalonConfigWithFallback(slug) {
  // If slug provided, try to load it
  if (slug) {
    const config = loadSalonConfig(slug);
    if (config) {
      return config;
    }
  }

  // Fall back to default config
  return loadDefaultSalonConfig();
}
