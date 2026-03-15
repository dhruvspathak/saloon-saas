/**
 * Config Loader Service
 * Handles loading salon configurations with multi-tenant support
 * Falls back to default config for backward compatibility
 */

/**
 * Load salon config from file system
 * Supports multi-tenant configs: /config/[slug].json
 * Falls back to: /config/salon.json
 *
 * @param {string} [slug] - Salon slug (optional)
 * @returns {Promise<Object>} Salon configuration
 */
export async function loadSalonConfig(slug = null) {
  try {
    let configPath = '/config/salon.json'; // Default

    if (slug) {
      // Try to load tenant-specific config
      configPath = `/config/${slug}.json`;
    }

    // In production, this would be a static import
    // For now, we import the default config
    const config = await import(`@/config/salon.json`);

    return config.default || config;
  } catch (error) {
    console.error('Error loading config:', error.message);
    throw new Error('Failed to load salon configuration');
  }
}

/**
 * Get salon ID from context (slug or config)
 * @param {string} [slug] - URL slug
 * @param {Object} [config] - Config object
 * @returns {string} Salon ID
 */
export function getSalonId(slug = null, config = null) {
  // Priority: slug > config.salon.id > default
  if (slug) return slug;
  if (config?.salon?.id) return config.salon.id;
  return process.env.NEXT_PUBLIC_SALON_ID || 'default';
}

/**
 * Merge configs for runtime flexibility
 * @param {Object} baseConfig - Base configuration
 * @param {Object} overrides - Override values
 * @returns {Object} Merged configuration
 */
export function mergeConfigs(baseConfig, overrides = {}) {
  return {
    ...baseConfig,
    salon: {
      ...baseConfig.salon,
      ...overrides.salon,
    },
    google: {
      ...baseConfig.google,
      ...overrides.google,
    },
    transformations: overrides.transformations || baseConfig.transformations || [],
  };
}
