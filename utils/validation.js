/**
 * Validation and Security Utilities for Booking Form
 * Includes regex patterns, validation functions, and XSS prevention
 */

/**
 * Regex patterns for various inputs
 */
export const REGEX_PATTERNS = {
  // Name: only letters (including accented), spaces, hyphens, apostrophes
  NAME: /^[a-zA-Z\s\-'àáâãäåèéêëìíîïòóôõöùúûüýÿñçœæ]+$/,
  
  // Indian phone: 10 digits (with optional +91 or 0 prefix)
  PHONE_INDIA: /^([+]91|0)?[6-9]\d{9}$/,
  
  // Email (optional but good to have)
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Date should not be in the past (validated separately)
  // Message: no HTML/script tags
  NO_HTML: /<(!doctype|html|head|body|script|iframe|object|embed|frame|frameset|style|link|meta|base|title|base64|javascript|on\w+|eval|expression|vbscript|import|implementation)[^>]*>/gi,
};

/**
 * Sanitize input to prevent XSS attacks
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (!input) return '';

  return String(input)
    .trim()
    .replace(/[<>\"'`]/g, (char) => {
      const escapeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
      };
      return escapeMap[char] || char;
    })
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

/**
 * Validate full name
 * @param {string} name - Full name
 * @returns {Object} {valid: boolean, error?: string}
 */
export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }

  if (name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (name.length > 100) {
    return { valid: false, error: 'Name must not exceed 100 characters' };
  }

  if (!REGEX_PATTERNS.NAME.test(name)) {
    return { valid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { valid: true };
}

/**
 * Validate Indian phone number
 * @param {string} phone - Phone number
 * @returns {Object} {valid: boolean, error?: string, normalized?: string}
 */
export function validatePhoneNumber(phone) {
  if (!phone || phone.trim().length === 0) {
    return { valid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit and + characters
  const cleaned = phone.replace(/[^\d+]/g, '');

  if (!REGEX_PATTERNS.PHONE_INDIA.test(cleaned)) {
    return {
      valid: false,
      error: 'Please enter a valid Indian phone number (10 digits)',
    };
  }

  // Normalize to +91 format
  let normalized;
  if (cleaned.startsWith('+91')) {
    normalized = cleaned;
  } else if (cleaned.startsWith('91')) {
    normalized = `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    normalized = `+91${cleaned.slice(1)}`;
  } else {
    normalized = `+91${cleaned}`;
  }

  return { valid: true, normalized };
}

/**
 * Validate service selection
 * @param {string} service - Service name
 * @returns {Object} {valid: boolean, error?: string}
 */
export function validateService(service) {
  if (!service || service.trim().length === 0) {
    return { valid: false, error: 'Please select a service' };
  }

  return { valid: true };
}

/**
 * Validate date - must be today or in the future
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Object} {valid: boolean, error?: string}
 */
export function validateDate(date) {
  if (!date) {
    return { valid: false, error: 'Please select a preferred date' };
  }

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return { valid: false, error: 'Please select a date in the future' };
  }

  // Optional: limit bookings to within 90 days
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  if (selectedDate > maxDate) {
    return { valid: false, error: 'Bookings can only be made up to 90 days in advance' };
  }

  return { valid: true };
}

/**
 * Validate optional message/notes
 * @param {string} message - Additional message
 * @returns {Object} {valid: boolean, error?: string, sanitized?: string}
 */
export function validateMessage(message) {
  if (!message || message.trim().length === 0) {
    return { valid: true, sanitized: '' };
  }

  if (message.length > 500) {
    return { valid: false, error: 'Message must not exceed 500 characters' };
  }

  // Check for HTML/script/dangerous content
  if (REGEX_PATTERNS.NO_HTML.test(message)) {
    return { valid: false, error: 'Message contains invalid content' };
  }

  const sanitized = sanitizeInput(message);
  return { valid: true, sanitized };
}

/**
 * Validate entire form data
 * @param {Object} formData - Form data object
 * @returns {Object} {valid: boolean, errors: {field: string}, sanitized: {field: string}}
 */
export function validateFormData(formData) {
  const errors = {};
  const sanitized = {};

  // Validate name
  const nameValidation = validateName(formData.name);
  if (!nameValidation.valid) {
    errors.name = nameValidation.error;
  } else {
    sanitized.name = sanitizeInput(formData.name);
  }

  // Validate phone
  const phoneValidation = validatePhoneNumber(formData.phone);
  if (!phoneValidation.valid) {
    errors.phone = phoneValidation.error;
  } else {
    sanitized.phone = phoneValidation.normalized;
  }

  // Validate service
  const serviceValidation = validateService(formData.service);
  if (!serviceValidation.valid) {
    errors.service = serviceValidation.error;
  } else {
    sanitized.service = sanitizeInput(formData.service);
  }

  // Validate date
  const dateValidation = validateDate(formData.date);
  if (!dateValidation.valid) {
    errors.date = dateValidation.error;
  } else {
    sanitized.date = formData.date;
  }

  // Validate message (optional)
  const messageValidation = validateMessage(formData.message);
  if (!messageValidation.valid) {
    errors.message = messageValidation.error;
  } else {
    sanitized.message = messageValidation.sanitized;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}
