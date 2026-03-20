export default function recommendClinic() {
  return {
    allowedThemes: ['minimal', 'modern', 'elegant'],
    allowedLayouts: ['layoutC', 'layoutA'],
    sections: ['Hero', 'About', 'Services', 'Reviews', 'Location', 'Booking'],
    componentVariants: {
      hero: ['heroA', 'heroB', 'heroC'],
      services: ['servicesA'],
    },
  };
}

