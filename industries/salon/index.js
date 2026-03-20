/**
 * Salon Industry Module
 * Defines default services, sections, and terminology for salon businesses
 */

export const salonModule = {
  name: 'salon',
  displayName: 'Beauty Salon',
  description: 'Hair, beauty, and wellness services',
  icon: '💇‍♀️',
  color: '#B76E79',

  defaultServices: [
    {
      name: 'Hair Cutting',
      description: 'Professional hair cutting and styling',
      icon: '✂️',
      category: 'Hair Care',
      price: '₹500 - ₹2000',
      duration: '45 minutes',
    },
    {
      name: 'Hair Coloring',
      description: 'Professional hair coloring with premium products',
      icon: '🎨',
      category: 'Hair Care',
      price: '₹1500 - ₹4000',
      duration: '2-3 hours',
    },
    {
      name: 'Bridal Makeup',
      description: 'Professional bridal and occasion makeup',
      icon: '💄',
      category: 'Makeup',
      price: '₹3000 - ₹8000',
      duration: '2-3 hours',
    },
    {
      name: 'Facials',
      description: 'Anti-aging and rejuvenating facials',
      icon: '✨',
      category: 'Skincare',
      price: '₹1000 - ₹3000',
      duration: '1 hour',
    },
    {
      name: 'Manicure & Pedicure',
      description: 'Professional nail care and grooming',
      icon: '💅',
      category: 'Nail Care',
      price: '₹500 - ₹1500',
      duration: '1 hour',
    },
    {
      name: 'Threading',
      description: 'Eyebrow and facial threading',
      icon: '🧵',
      category: 'Hair Removal',
      price: '₹100 - ₹500',
      duration: '30 minutes',
    },
  ],

  sections: [
    'Hero',
    'About',
    'Services',
    'Gallery',
    'BeforeAfter',
    'Offers',
    'Reviews',
    'Location',
    'Booking',
  ],

  terminology: {
    professional: 'Stylist',
    customer: 'Client',
    appointment: 'Booking',
    service: 'Service',
    experience: 'Luxury Experience',
    booking_label: 'Book Your Appointment',
  },

  defaultLayout: 'layoutA',
  defaultTheme: 'luxury',
};

export default salonModule;
