import { updateSiteConfig } from '@/services/siteService';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = req.headers['x-internal-api-key'] || req.headers['x-api-key'];
  const envKey = process.env.NEXT_PUBLIC_INTERNAL_ACCESS_KEY || process.env.INTERNAL_API_KEY;
  if (apiKey !== envKey && envKey !== undefined) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { slug, configData } = req.body;
  if (!slug || !configData) return res.status(400).json({ error: 'Missing slug or configData' });

  try {
    const updatedConfig = await updateSiteConfig(slug, configData);
    if (!updatedConfig) return res.status(500).json({ error: 'Failed to update config' });
    return res.status(200).json({ success: true, site: updatedConfig });
  } catch (error) {
    console.error('Update config error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
