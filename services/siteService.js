/**
 * Site Service
 * Generic multi-industry site operations
 * Replaces previous salon-specific service
 */

import { getSupabaseServerClient, supabase } from '@/lib/supabase';
import { getIndustryModule } from '@/industries';
import { getTheme } from '@/themes';
import { getLayout } from '@/layouts';

/**
 * Get site by slug from database
 * @param {string} slug - Site slug
 * @returns {object|null} Site data or null
 */
export async function getSiteBySlug(slug) {
  try {
    if (!supabase) {
      console.error('Supabase client not configured');
      return null;
    }

    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching site with slug ${slug}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getSiteBySlug:', error);
    return null;
  }
}

/**
 * Get site by slug with populated config
 * @param {string} slug - Site slug
 * @returns {object|null} Site configuration
 */
export async function getSiteConfigBySlug(slug) {
  try {
    const site = await getSiteBySlug(slug);
    if (!site) return null;

    // Parse config_json if it's a string
    const config = typeof site.config_json === 'string'
      ? JSON.parse(site.config_json)
      : site.config_json || {};

    return {
      ...site,
      configData: config,
    };
  } catch (error) {
    console.error('Error in getSiteConfigBySlug:', error);
    return null;
  }
}

/**
 * Get all sites for internal dashboard
 * Server-side only - requires service role key
 * @returns {array} Array of all sites
 */
export async function getAllSites() {
  try {
    const supabaseAdmin = getSupabaseServerClient();
    
    const { data, error } = await supabaseAdmin
      .from('sites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all sites:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllSites:', error);
    return [];
  }
}

/**
 * Create a new site with default configuration
 * Server-side only - requires service role key
 * @param {object} siteData - Site creation data
 * @returns {object|null} Created site or null
 */
export async function createSite(siteData) {
  try {
    const supabaseAdmin = getSupabaseServerClient();

    const {
      slug,
      name,
      industry = 'salon',
      theme = 'luxury',
      layout = 'layoutA',
      phone,
      whatsapp,
      address,
      googlePlaceId,
      ...otherData
    } = siteData;

    // Validate required fields
    if (!slug || !name) {
      throw new Error('Slug and name are required');
    }

    // Get industry module to populate default services
    const industryModule = getIndustryModule(industry);
    const themeObj = getTheme(theme);
    const layoutSections = getLayout(layout);

    // Build default config
    const defaultConfig = {
      site: {
        id: slug,
        slug,
        name,
        industry,
        theme,
        layout,
      },
      location: {
        address,
        phone,
        whatsapp,
        googlePlaceId,
      },
      services: industryModule.defaultServices || [],
      sections: industryModule.sections || [],
      ...otherData,
    };

    // Create site record
    const { data, error } = await supabaseAdmin
      .from('sites')
      .insert([
        {
          slug,
          name,
          industry,
          theme,
          layout,
          config_json: defaultConfig,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Error creating site:', error);
      return null;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('Error in createSite:', error);
    return null;
  }
}

/**
 * Update site configuration
 * Server-side only - requires service role key
 * @param {string} slug - Site slug
 * @param {object} updateData - Data to update
 * @returns {object|null} Updated site or null
 */
export async function updateSite(slug, updateData) {
  try {
    const supabaseAdmin = getSupabaseServerClient();

    const { data, error } = await supabaseAdmin
      .from('sites')
      .update(updateData)
      .eq('slug', slug)
      .select();

    if (error) {
      console.error('Error updating site:', error);
      return null;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('Error in updateSite:', error);
    return null;
  }
}

/**
 * Update site config JSON
 * Server-side only - requires service role key
 * @param {string} slug - Site slug
 * @param {object} configData - Configuration to update
 * @returns {object|null} Updated site or null
 */
export async function updateSiteConfig(slug, configData) {
  try {
    const supabaseAdmin = getSupabaseServerClient();

    // Get current site
    const currentSite = await getSiteBySlug(slug);
    if (!currentSite) {
      throw new Error(`Site not found: ${slug}`);
    }

    // Merge configs
    const currentConfig = typeof currentSite.config_json === 'string'
      ? JSON.parse(currentSite.config_json)
      : currentSite.config_json || {};

    const mergedConfig = {
      ...currentConfig,
      ...configData,
    };

    // Update
    const { data, error } = await supabaseAdmin
      .from('sites')
      .update({ config_json: mergedConfig })
      .eq('slug', slug)
      .select();

    if (error) {
      console.error('Error updating site config:', error);
      return null;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('Error in updateSiteConfig:', error);
    return null;
  }
}

/**
 * Delete site
 * Server-side only - requires service role key
 * @param {string} slug - Site slug
 * @returns {boolean} Success status
 */
export async function deleteSite(slug) {
  try {
    const supabaseAdmin = getSupabaseServerClient();

    const { error } = await supabaseAdmin
      .from('sites')
      .delete()
      .eq('slug', slug);

    if (error) {
      console.error('Error deleting site:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteSite:', error);
    return false;
  }
}

export default {
  getSiteBySlug,
  getSiteConfigBySlug,
  getAllSites,
  createSite,
  updateSite,
  updateSiteConfig,
  deleteSite,
};
