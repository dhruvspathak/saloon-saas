/**
 * Tattoo Studio Industry Module
 * Defines default services, sections, and terminology for tattoo studios
 */

export const tattooModule = {
  name: 'tattoo',
  displayName: 'Tattoo Studio',
  description: 'Professional tattoo and piercing services',
  icon: '🎨',
  color: '#2C2C2C',

  defaultServices: [
    {
      name: 'Custom Tattoo Design',
      description: 'Professional custom tattoo design and consultation',
      icon: '🎨',
      category: 'Tattoo Design',
      price: '₹2000 - ₹10000',
      duration: '1-3 hours',
    },
    {
      name: 'Small Tattoo',
      description: 'Small size tattoo (1-4 inches)',
      icon: '🔲',
      category: 'Tattoo Art',
      price: '₹3000 - ₹7000',
      duration: '1-2 hours',
    },
    {
      name: 'Large Tattoo',
      description: 'Large size tattoo (4+ inches)',
      icon: '📐',
      category: 'Tattoo Art',
      price: '₹8000 - ₹25000',
      duration: '3-6 hours',
    },
    {
      name: 'Cover-Up Tattoo',
      description: 'Cover-up and rework of existing tattoos',
      icon: '♻️',
      category: 'Tattoo Rework',
      price: '₹5000 - ₹15000',
      duration: '2-4 hours',
    },
    {
      name: 'Body Piercing',
      description: 'Professional ear, nose, and body piercing',
      icon: '✨',
      category: 'Piercing',
      price: '₹500 - ₹3000',
      duration: '30 minutes',
    },
  ],

  sections: [
    'Hero',
    'About',
    'Services',
    'Gallery',
    'Artists',
    'Reviews',
    'Location',
    'Booking',
  ],

  terminology: {
    professional: 'Artist',
    customer: 'Client',
    appointment: 'Consultation',
    service: 'Tattoo',
    experience: 'Artistic Expression',
    booking_label: 'Book Your Consultation',
  },

  defaultLayout: 'layoutB',
  defaultTheme: 'modern',
};

export default tattooModule;
