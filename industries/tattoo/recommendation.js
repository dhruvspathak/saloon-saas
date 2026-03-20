export default function recommendTattoo() {
  return {
    allowedThemes: ['modern', 'minimal', 'elegant'],
    allowedLayouts: ['layoutB', 'layoutA'],
    sections: ['Hero', 'About', 'Services', 'Gallery', 'Reviews', 'Location', 'Booking'],
    componentVariants: {
      hero: ['heroA', 'heroB', 'heroC'],
      services: ['servicesA'],
    },
  };
}

