/**
 * Clinic Industry Module
 * Defines default services, sections, and terminology for medical clinics
 */

export const clinicModule = {
  name: 'clinic',
  displayName: 'Medical Clinic',
  description: 'General medical and health services',
  icon: '🏥',
  color: '#2563EB',

  defaultServices: [
    {
      name: 'General Consultation',
      description: 'Consultation with experienced medical professionals',
      icon: '👨‍⚕️',
      category: 'Consultation',
      price: '₹300 - ₹800',
      duration: '30 minutes',
    },
    {
      name: 'Health Checkup',
      description: 'Complete health assessment and preventive care',
      icon: '🔬',
      category: 'Health Check',
      price: '₹1500 - ₹3000',
      duration: '1 hour',
    },
    {
      name: 'Vaccination',
      description: 'Routine and special vaccinations',
      icon: '💉',
      category: 'Immunization',
      price: '₹300 - ₹2000',
      duration: '15 minutes',
    },
    {
      name: 'Lab Tests',
      description: 'Blood tests and diagnostic lab services',
      icon: '🧪',
      category: 'Diagnostics',
      price: '₹200 - ₹2000',
      duration: 'Same day',
    },
    {
      name: 'Telemedicine',
      description: 'Online video consultation with doctors',
      icon: '📱',
      category: 'Remote Consultation',
      price: '₹300 - ₹600',
      duration: '30 minutes',
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
    professional: 'Doctor',
    customer: 'Patient',
    appointment: 'Appointment',
    service: 'Service',
    experience: 'Quality Healthcare',
    booking_label: 'Schedule Appointment',
  },

  defaultLayout: 'layoutC',
  defaultTheme: 'minimal',
};

export default clinicModule;
