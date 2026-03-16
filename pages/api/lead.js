import { processLead } from '@/services/leadProcessor';

/**
 * POST /api/lead
 * Ingest lead data from booking form
 *
 * Body:
 * {
 *   salonId: string,
 *   name: string,
 *   phone: string,
 *   service?: string,
 *   preferredDate?: string (YYYY-MM-DD),
 *   message?: string
 * }
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { salonId, name, phone, service, preferredDate, message } = req.body;

    // Call lead processor
    const result = await processLead({
      salonId,
      name,
      phone,
      service,
      preferredDate,
      message,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      leadId: result.leadId,
      message: result.message,
    });
  } catch (error) {
    console.error('Lead API error:', error.message);
    
    // Check if it's a Supabase configuration error
    if (error.message.includes('Supabase')) {
      return res.status(503).json({
        success: false,
        error: 'Database service is not configured. Please contact the administrator.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Failed to process lead. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
