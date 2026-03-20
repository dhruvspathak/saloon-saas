// /lib/domainResolver.js

/**
 * A hardcoded map of custom domains to site slugs.
 * In a real application, this would come from a database.
 */
const DOMAIN_TO_SLUG_MAP = {
  'cinderellasalon.in': 'cinderella',
  'glamstudio.com': 'glamstudio',
  'rosebeauty.co': 'rosebeauty',
};

/**
 * Resolves a site slug from the request object, checking for custom domains.
 *
 * @param {object} req - The Next.js request object.
 * @returns {string|null} - The site slug, or null if not resolved.
 */
export const resolveSiteFromRequest = (req) => {
  if (!req || !req.headers) return null;
  
  let host = req.headers.host;
  if (!host) return null;
  
  // Remove port if present (e.g., localhost:3000 -> localhost)
  host = host.split(':')[0];

  // If there's a host, check if it's a custom domain
  const customDomainSlug = DOMAIN_TO_SLUG_MAP[host];
  if (customDomainSlug) {
    return customDomainSlug;
  }

  // Fallback to the URL parameter slug if not a custom domain
  return null;
};
