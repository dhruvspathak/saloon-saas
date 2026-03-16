/**
 * Internal Site Creation API
 * Protected endpoint for creating new sites
 * Requires: INTERNAL_API_KEY header
 * 
 * POST /api/internal/createSite
 */

import { createSite } from '@/services/siteService';

/**
 * Validate internal API key
 * @param {string} apiKey - API key from request header
 * @returns {boolean} Whether API key is valid
 */
function validateApiKey(apiKey) {
  const validKey = process.env.INTERNAL_API_KEY;
  
  if (!validKey) {
    console.warn('INTERNAL_API_KEY not configured');
    return false;
  }

  return apiKey === validKey;
}

/**
 * Validate required fields
 * @param {object} data - Request data
 * @returns {object} { valid: boolean, errors: array }
 */
function validateRequestData(data) {
  const errors = [];

  if (!data.businessName?.trim()) {
    errors.push('Business name is required');
  }

  if (!data.slug?.trim()) {
    errors.push('Slug is required');
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }

  if (!data.industry) {
    errors.push('Industry is required');
  }

  if (!data.theme) {
    errors.push('Theme is required');
  }

  if (!data.layout) {
    errors.push('Layout is required');
  }

  if (!data.phone?.trim()) {
    errors.push('Phone number is required');
  }

  if (!data.address?.trim()) {
    errors.push('Address is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * POST handler for creating sites
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate API key
    const apiKey = req.headers['x-internal-api-key'] || req.headers['x-api-key'];
    
    if (!validateApiKey(apiKey)) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
    }

    // Extract and validate request data
    const {
      businessName,
      slug,
      industry,
      theme,
      layout,
      phone,
      whatsapp,
      address,
      googlePlaceId,
    } = req.body;

    const validation = validateRequestData(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    // Create site
    const newSite = await createSite({
      name: businessName,
      slug: slug.toLowerCase().trim(),
      industry: industry.toLowerCase(),
      theme: theme.toLowerCase(),
      layout,
      phone,
      whatsapp,
      address,
      googlePlaceId,
    });

    if (!newSite) {
      return res.status(500).json({
        error: 'Failed to create site',
        details: 'Database error occurred',
      });
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Site created successfully',
      site: {
        id: newSite.id,
        slug: newSite.slug,
        name: newSite.name,
        industry: newSite.industry,
        theme: newSite.theme,
        layout: newSite.layout,
        url: `/site/${newSite.slug}`,
      },
    });
  } catch (error) {
    console.error('Error in createSite API:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
}
