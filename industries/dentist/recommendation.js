export default function recommendDentist() {
  return {
    allowedThemes: ['elegant', 'minimal', 'luxury'],
    allowedLayouts: ['layoutC', 'layoutA'],
    sections: ['Hero', 'About', 'Services', 'Reviews', 'Location', 'Booking'],
    componentVariants: {
      hero: ['heroA', 'heroB', 'heroC'],
      services: ['servicesA'],
    },
  };
}

