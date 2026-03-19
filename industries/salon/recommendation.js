export default function recommendSalon() {
  return {
    allowedThemes: ['luxury', 'elegant', 'modern'],
    allowedLayouts: ['layoutA', 'layoutB'],
    sections: ['Hero', 'About', 'Services', 'Gallery', 'BeforeAfter', 'Offers', 'Reviews', 'Location', 'Booking'],
    componentVariants: {
      hero: ['heroA', 'heroB', 'heroC'],
      services: ['servicesA'],
    },
  };
}

