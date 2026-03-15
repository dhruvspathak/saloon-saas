/**
 * @typedef {Object} SalonConfig
 * @property {Object} salon - Main salon info
 * @property {string} salon.id - Unique salon identifier
 * @property {string} salon.name - Salon name
 * @property {string} salon.tagline - Tagline
 * @property {string} salon.description - Full description
 * @property {Object} salon.location - Location details
 * @property {Object[]} salon.services - Service list
 * @property {Object[]} salon.gallery - Gallery images
 * @property {Object[]} salon.reviews - Customer reviews
 * @property {Object[]} [salon.offers] - Current offers
 *
 * @property {Object} [google] - Google integration
 * @property {string} google.placeId - Google Places ID
 *
 * @property {Object[]} [transformations] - Before/after gallery
 * @property {string} transformations[].title - Service name
 * @property {string} transformations[].before - Before image URL
 * @property {string} transformations[].after - After image URL
 */

export {};
