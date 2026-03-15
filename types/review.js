/**
 * @typedef {Object} GoogleReview
 * @property {string} author - Reviewer name
 * @property {number} rating - Rating 1-5
 * @property {string} text - Review text
 * @property {string} time - Timestamp
 * @property {string} [relativeTimeDescription] - e.g "a month ago"
 */

/**
 * @typedef {Object} GoogleRating
 * @property {number} rating - Average rating
 * @property {number} totalRatings - Total review count
 * @property {GoogleReview[]} reviews - Top reviews
 */

export {};
