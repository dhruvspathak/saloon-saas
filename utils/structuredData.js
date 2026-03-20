// /utils/structuredData.js

/**
 * Generates JSON-LD structured data for a LocalBusiness.
 *
 * @param {object} site - The site configuration object.
 * @returns {object} - The JSON-LD structured data.
 */
export const generateLocalBusinessSchema = (site) => {
  const { name, description, location = {}, reviews = [], meta = {} } = site;
  const { address, area, city, phone } = location;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: name,
    description: description,
    image: meta.ogImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: area,
      addressRegion: city,
      addressCountry: 'IN',
    },
    telephone: phone,
  };

  if (reviews && reviews.length > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: '4.8', // This should be calculated or from a reliable source
      ratingCount: reviews.length,
    };
  }

  return schema;
};
