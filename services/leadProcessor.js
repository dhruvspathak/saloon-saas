/**
 * Lead Processor Service
 * Handles validation, sanitization, and storage of leads
 */

import { getSupabaseServerClient } from '@/lib/supabase';

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
 *
 * @param {Object} leadData - Lead information
 * @param {string} leadData.salonId - Salon identifier
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
    if (!leadData.name || !leadData.phone || !leadData.salonId) {
      return {
        success: false,
        error: 'Missing required fields: name, phone, salonId',
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

    // Sanitize inputs
    const sanitized = {
      salonId: sanitizeInput(leadData.salonId),
      name: sanitizeInput(leadData.name),
      phone: validatedPhone,
      service: sanitizeInput(leadData.service || ''),
      preferredDate: leadData.preferredDate || null,
      message: sanitizeInput(leadData.message || ''),
    };

    // Store in database
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          salon_id: sanitized.salonId,
          name: sanitized.name,
          phone: sanitized.phone,
          service: sanitized.service,
          preferred_date: sanitized.preferredDate,
          message: sanitized.message,
          status: 'new',
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
    // sendConfirmationEmail(sanitized.email);

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
 * Get leads for a salon (admin use)
 * @param {string} salonId - Salon identifier
 * @param {Object} [options] - Query options
 * @returns {Promise<Array>} Leads data
 */
export async function getLeadsForSalon(salonId, options = {}) {
  try {
    const supabase = getSupabaseServerClient();

    let query = supabase
      .from('leads')
      .select('*')
      .eq('salon_id', salonId)
      .order('created_at', { ascending: false });

    // Optional filters
    if (options.status) {
      query = query.eq('status', options.status);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
}
