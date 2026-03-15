// SEO optimization utilities
export const generateMetaTags = (salon) => {
  return {
    title: salon.meta.title,
    description: salon.meta.description,
    keywords: salon.meta.keywords,
    ogImage: salon.meta.ogImage,
    ogType: 'website',
    ogSiteName: salon.name,
    twitterCard: 'summary_large_image',
    twitterTitle: salon.meta.title,
    twitterDescription: salon.meta.description,
    twitterImage: salon.meta.ogImage,
  };
};

// Generate structured data
export const generateStructuredData = (salon) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: salon.name,
    description: salon.description,
    image: salon.meta.ogImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: salon.location.address.split(',')[0],
      addressLocality: salon.location.address.split(',')[1]?.trim() || 'Mumbai',
      addressCountry: 'IN',
    },
    telephone: salon.location.phone,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: salon.reviews.length,
    },
  };
};

// Optimize image URL
export const optimizeImageUrl = (url, width = 1920, height = 1080) => {
  if (!url) return '';
  
  // If already an Unsplash URL, append parameters
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&h=${height}&fit=crop&q=85`;
  }
  
  return url;
};
