import { listAvailableSalons, loadSalonConfig } from '../../lib/loadSalonConfig';
import { resolveSiteFromRequest } from '../../lib/domainResolver';

export default async function handler(req, res) {
  try {
    const host = req.headers.host || process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const salonSlugs = listAvailableSalons();
    const salons = salonSlugs.reduce((acc, slug) => {
      acc[slug] = loadSalonConfig(slug);
      return acc;
    }, {});
    
    const resolvedSlug = resolveSiteFromRequest(req);
    let filteredSalons = salons;
    
    // If accessed from custom domain, restrict sitemap to just that tenant
    if (resolvedSlug && salons[resolvedSlug]) {
      filteredSalons = { [resolvedSlug]: salons[resolvedSlug] };
    }

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Global Home (skip if it's a tenant custom domain layout)
    if (!resolvedSlug) {
      xml += `<url>\n<loc>${baseUrl}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>1.00</priority>\n</url>\n`;
    }

    Object.values(filteredSalons).forEach(salonData => {
      const site = salonData.salon || salonData;
      if (site) {
        // Core site URL
        const siteUrl = resolvedSlug ? baseUrl : `${baseUrl}/site/${site.slug}`;
        
        xml += `<url>\n<loc>${siteUrl}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>${resolvedSlug ? '1.00' : '0.80'}</priority>\n</url>\n`;

        // Service URLS
        if (site.services) {
          site.services.forEach(service => {
            const areaStr = site.location?.area || site.location?.city || '';
            const serviceSlug = `${service.name.toLowerCase().replace(/ /g, '-')}-${areaStr.toLowerCase().replace(/ /g, '-')}`;
            const serviceUrl = `${siteUrl}/${serviceSlug}`;
            xml += `<url>\n<loc>${serviceUrl}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>0.64</priority>\n</url>\n`;
          });
        }
      }
    });

    xml += '</urlset>';

    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
}
