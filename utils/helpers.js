// config loader utility
export const loadSalonConfig = () => {
  try {
    const config = require('@/config/salon.json');
    return config;
  } catch (error) {
    console.error('Error loading salon config:', error);
    return null;
  }
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned;
};

// Format currency
export const formatCurrency = (amount, currency = '₹') => {
  return `${currency}${amount}`;
};

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Generate WhatsApp link
export const generateWhatsAppLink = (phone, message = '') => {
  const cleaned = formatPhoneNumber(phone);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
};

// Scroll to element
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
