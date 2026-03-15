/**
 * @typedef {Object} Lead
 * @property {string} salonId - Unique salon identifier
 * @property {string} name - Customer name
 * @property {string} phone - Customer phone (validated Indian format)
 * @property {string} [service] - Service requested
 * @property {string} [preferredDate] - Preferred appointment date (YYYY-MM-DD)
 * @property {string} [message] - Additional message from customer
 */

/**
 * @typedef {Object} LeadRecord
 * @property {string} id - UUID
 * @property {string} salonId
 * @property {string} name
 * @property {string} phone
 * @property {string} service
 * @property {string} preferredDate
 * @property {string} message
 * @property {string} status - 'new' | 'contacted' | 'converted'
 * @property {string} createdAt - ISO timestamp
 * @property {string} updatedAt - ISO timestamp
 */

export {};
