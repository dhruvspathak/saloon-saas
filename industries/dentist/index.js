/**
 * Dentist Industry Module
 * Defines default services, sections, and terminology for dental clinics
 */

export const dentistModule = {
  name: 'dentist',
  displayName: 'Dental Clinic',
  description: 'Professional dental care and cosmetic dentistry',
  icon: '🦷',
  color: '#10B981',

  defaultServices: [
    {
      name: 'Routine Checkup',
      description: 'Regular dental examination and cleaning',
      icon: '🔍',
      category: 'Preventive',
      price: '₹500 - ₹1000',
      duration: '30 minutes',
    },
    {
      name: 'Teeth Cleaning',
      description: 'Professional teeth cleaning and scaling',
      icon: '✨',
      category: 'Cleaning',
      price: '₹1000 - ₹2000',
      duration: '1 hour',
    },
    {
      name: 'Root Canal Treatment',
      description: 'Advanced endodontic root canal therapy',
      icon: '⚕️',
      category: 'Treatment',
      price: '₹3000 - ₹8000',
      duration: '1-2 hours',
    },
    {
      name: 'Teeth Whitening',
      description: 'Professional teeth whitening procedure',
      icon: '😁',
      category: 'Cosmetic',
      price: '₹2000 - ₹5000',
      duration: '1 hour',
    },
    {
      name: 'Crown & Bridge',
      description: 'Dental crowns and bridge restoration',
      icon: '👑',
      category: 'Restoration',
      price: '₹5000 - ₹15000',
      duration: '2 visits',
    },
    {
      name: 'Braces',
      description: 'Orthodontic treatment and braces',
      icon: '🦷',
      category: 'Orthodontics',
      price: '₹15000 - ₹50000',
      duration: 'Long term',
    },
  ],

  sections: [
    'Hero',
    'About',
    'Services',
    'Doctors',
    'Facilities',
    'Reviews',
    'Location',
    'Booking',
  ],

  terminology: {
    professional: 'Dentist',
    customer: 'Patient',
    appointment: 'Appointment',
    service: 'Procedure',
    experience: 'Dental Excellence',
    booking_label: 'Book Appointment',
  },

  defaultLayout: 'layoutC',
  defaultTheme: 'elegant',
};

export default dentistModule;
