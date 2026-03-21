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
    // Prefer server-side service role client when available (avoids RLS issues for public reads)
    const client = (() => {
      if (typeof window === 'undefined') {
        try {
          return getSupabaseServerClient();
        } catch (e) {
          // Fall back to anon client if server env isn't configured
          return supabase;
        }
      }
      return supabase;
    })();

    if (!client) {
      console.error('Supabase client not configured');
      return null;
    }

    const { data, error } = await client
      .from('sites')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

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
      config_json,
      ...otherData
    } = siteData;

    // Validate required fields
    if (!slug || !name) {
      throw new Error('Slug and name are required');
    }

    // Build config_json if not supplied (backward compatibility)
    let finalConfig = config_json;
    if (!finalConfig) {
      const industryModule = getIndustryModule(industry);
      finalConfig = {
        site: {
          id: slug,
          slug,
          name,
          industry,
          theme,
          layout,
          sections: getLayout(layout),
          components: {
            hero: 'heroA',
            services: 'servicesA',
          },
        },
        [industry]: {
          id: slug,
          slug,
          name,
          tagline: 'Professional Services',
          hero: { backgroundImage: '/images/hero-default.svg', overlayOpacity: 0.55 },
          about: { headline: `About ${name}`, description: industryModule.description || '', yearsInBusiness: 5, clientsSatisfied: '1,000+', highlights: [] },
          services: (industryModule.defaultServices || []).map((s, idx) => ({ id: `${industry}-service-${idx + 1}`, ...s })),
          gallery: [],
          offers: [],
          reviews: [],
          location: {
            address,
            phone,
            whatsapp,
            googlePlaceId,
            email: '',
            googleMapEmbed: address ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed` : '',
            openingHours: {},
          },
        },
        ...otherData,
      };
    }

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
          config_json: finalConfig,
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

/**
 * Add an image URL to the site configuration
 * @param {string} slug - Site slug
 * @param {string} imageUrl - Public Supabase URL
 * @param {string} type - 'gallery' or 'before-after'
 * @returns {object|null} Updated site config or null
 */
export async function addImageToSiteConfig(slug, imageUrl, type) {
  try {
    const siteObj = await getSiteConfigBySlug(slug);
    if (!siteObj) throw new Error(`Site not found: ${slug}`);

    const config = siteObj.configData;
    const industryKey = config.salon?.industry || config.site?.industry || 'salon';
    const targetObj = config[industryKey] || config.salon || config;

    if (type === 'gallery') {
      const currentGallery = targetObj.gallery || [];
      const newId = currentGallery.length ? Math.max(...currentGallery.map(g => g.id)) + 1 : 1;
      targetObj.gallery = [
        ...currentGallery,
        { id: newId, image: imageUrl, title: 'Uploaded Gallery Image', category: 'General' }
      ];
    } else if (type === 'before-after') {
      const currentTrans = config.transformations || [];
      // Appends an incomplete pair; intended to be completed by UI logic or handles single pushes if pairs are packed beforehand
      config.transformations = [
        ...currentTrans,
        { title: 'Uploaded Transformation', before: imageUrl, after: imageUrl }
      ];
    }

    if (config[industryKey]) config[industryKey] = targetObj;
    else if (config.salon) config.salon = targetObj;

    return await updateSiteConfig(slug, config);
  } catch (error) {
    console.error('Error in addImageToSiteConfig:', error);
    return null;
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
  addImageToSiteConfig,
};
