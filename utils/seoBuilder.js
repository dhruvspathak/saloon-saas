// /utils/seoBuilder.js

/**
 * Builds a comprehensive SEO object for a given site.
 *
 * @param {object} site - The site configuration object.
 * @param {string} [canonicalUrl] - The canonical URL for the page.
 * @returns {object} - An object containing title, description, keywords, canonical, and OpenGraph data.
 */
export const buildSEO = (site, canonicalUrl) => {
  const industry = site.industry || 'Beauty Salon';
  const { name, location = {}, services = [], meta = {} } = site;
  const { address, area = '', city = '' } = location;

  // Title
  const title = `Best ${industry} in ${area} | ${name}`;

  // Description
  const serviceList = services.map(s => s.name).slice(0, 3).join(', ');
  const description = `Find the best ${industry} in ${area}, ${city}. We offer ${serviceList} and more. ${meta.description || ''}`.trim();

  // Keywords
  const keywords = [...new Set([
    industry,
    area,
    city,
    ...(meta.keywords ? meta.keywords.split(',').map(k => k.trim()) : []),
    ...services.map(s => s.name)
  ])].filter(Boolean).join(', ');

  // OpenGraph Data
  const ogData = {
    'og:title': title,
    'og:description': description,
    'og:type': 'website',
    'og:url': canonicalUrl,
    'og:image': meta.ogImage || '',
    'og:site_name': name,
  };

  return {
    title,
    description,
    keywords,
    canonical: canonicalUrl,
    ...ogData,
  };
};
