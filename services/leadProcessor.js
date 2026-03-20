/**
 * Lead Processor Service
 * Handles validation, sanitization, and storage of leads
 * Works with generic sites table for multi-industry support
 */

import { getSupabaseServerClient, supabase } from '@/lib/supabase';
import { getSiteBySlug } from './siteService';

/**
 * Validate Indian phone number format
 * Accepts: +91 98765 43210, 98765 43210, 9876543210
 *
 * @param {string} phone - Phone number to validate
 * @returns {string|null} Normalized phone or null if invalid
 */
export function validatePhoneNumber(phone) {
  if (!phone) return null;

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');

  // Match Indian phone patterns
  const patterns = [
    /^\+91(\d{10})$/, // +919876543210
    /^91(\d{10})$/, // 919876543210
    /^(\d{10})$/, // 9876543210
  ];

  for (const pattern of patterns) {
    const match = cleaned.match(pattern);
    if (match) {
      // Return in normalized format: +919876543210
      const digits = match[1] || match[2];
      return `+91${digits}`;
    }
  }

  return null;
}

/**
 * Sanitize user input to prevent SQL injection
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (!input) return '';

  return String(input)
    .trim()
    .replace(/[<>\"'%]/g, '') // Remove potentially harmful characters
    .slice(0, 1000); // Limit length
}

/**
 * Process and store lead in database
 * Now supports multi-industry with site_id isolation
 *
 * @param {Object} leadData - Lead information
 * @param {string} leadData.siteSlug - Site slug identifier
 * @param {string} leadData.name - Customer name
 * @param {string} leadData.phone - Customer phone
 * @param {string} [leadData.service] - Service requested
 * @param {string} [leadData.preferredDate] - Preferred date
 * @param {string} [leadData.message] - Additional message
 *
 * @returns {Promise<Object>} {success, leadId, error}
 */
export async function processLead(leadData) {
  try {
    // Validate required fields
    if (!leadData.name || !leadData.phone || !leadData.siteSlug) {
      return {
        success: false,
        error: 'Missing required fields: name, phone, siteSlug',
      };
    }

    // Validate phone
    const validatedPhone = validatePhoneNumber(leadData.phone);
    if (!validatedPhone) {
      return {
        success: false,
        error: 'Invalid phone number format',
      };
    }

    // Get site to retrieve site_id
    const site = await getSiteBySlug(leadData.siteSlug);
    if (!site) {
      return {
        success: false,
        error: 'Site not found',
      };
    }

    // Sanitize inputs
    const sanitized = {
      site_id: site.id,
      name: sanitizeInput(leadData.name),
      phone: validatedPhone,
      service: sanitizeInput(leadData.service || ''),
      preferred_date: leadData.preferredDate || null,
      message: sanitizeInput(leadData.message || ''),
    };

    // Store in database (client-side)
    if (!supabase) {
      throw new Error('Supabase client not configured');
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          site_id: sanitized.site_id,
          name: sanitized.name,
          phone: sanitized.phone,
          service: sanitized.service,
          preferred_date: sanitized.preferred_date,
          message: sanitized.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return {
        success: false,
        error: 'Failed to save lead',
      };
    }

    // TODO: Add notification triggers here (WhatsApp, Email, SMS)
    // notifyAdmin(data);
    // sendConfirmationSMS(sanitized.phone, site.name);

    return {
      success: true,
      leadId: data.id,
      message: 'Lead saved successfully',
    };
  } catch (error) {
    console.error('Lead processing error:', error);
    return {
      success: false,
      error: error.message || 'Failed to process lead',
    };
  }
}

/**
 * Get leads for a site (admin use)
 * Server-side only - requires service role key
 * @param {string} siteId - Site ID (UUID)
 * @param {Object} [options] - Query options
 * @returns {Promise<Array>} Leads data
 */
export async function getLeadsForSite(siteId, options = {}) {
  try {
    const supabaseAdmin = getSupabaseServerClient();

    const { limit = 100, offset = 0, status = null } = options;

    let query = supabaseAdmin
      .from('leads')
      .select('*')
      .eq('site_id', siteId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching leads:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getLeadsForSite:', error);
    return [];
  }
}

/**
 * Get leads by site slug
 * Server-side only - requires service role key
 * @param {string} siteSlug - Site slug
 * @param {Object} [options] - Query options
 * @returns {Promise<Array>} Leads data
 */
export async function getLeadsForSiteBySlug(siteSlug, options = {}) {
  try {
    const site = await getSiteBySlug(siteSlug);
    if (!site) {
      console.warn(`Site not found: ${siteSlug}`);
      return [];
    }

    return getLeadsForSite(site.id, options);
  } catch (error) {
    console.error('Error in getLeadsForSiteBySlug:', error);
    return [];
  }
}

/**
 * Mark lead as contacted
 * Server-side only - requires service role key
 * @param {string} leadId - Lead ID
 * @returns {Promise<boolean>} Success status
 */
export async function markLeadAsContacted(leadId) {
  try {
    const supabaseAdmin = getSupabaseServerClient();

    const { error } = await supabaseAdmin
      .from('leads')
      .update({ status: 'contacted', updated_at: new Date().toISOString() })
      .eq('id', leadId);

    if (error) {
      console.error('Error updating lead:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in markLeadAsContacted:', error);
    return false;
  }
}

/**
 * Delete outdated leads (older than 90 days)
 * Server-side only - requires service role key
 * @returns {Promise<number>} Number of deleted leads
 */
export async function deleteOutdatedLeads() {
  try {
    const supabaseAdmin = getSupabaseServerClient();

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const { data, error } = await supabaseAdmin
      .from('leads')
      .delete()
      .lt('created_at', ninetyDaysAgo.toISOString())
      .select('id');

    if (error) {
      console.error('Error deleting old leads:', error);
      return 0;
    }

    return data?.length || 0;
  } catch (error) {
    console.error('Error in deleteOutdatedLeads:', error);
    return 0;
  }
}
