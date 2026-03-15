/**
 * Google Reviews Service
 * Fetches Google Places reviews and ratings using Google Places API
 * Implements caching strategy for better performance
 */

/**
 * Fetch Google reviews for a salon
 * Uses revalidation for ISR (Incremental Static Regeneration)
 *
 * @param {string} placeId - Google Places API ID
 * @returns {Promise<Object>} {rating, totalRatings, reviews}
 */
export async function fetchGoogleReviews(placeId) {
  if (!placeId) {
    console.warn('No Google placeId provided');
    return null;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_GOOGLE_PLACES_API_KEY not configured');
    return null;
  }

  try {
    // Using Google Places API with detailed information
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`,
      {
        // Enable ISR: revalidate every 1 hour (3600 seconds)
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status);
      return null;
    }

    const { rating, user_ratings_total, reviews = [] } = data.result;

    // Transform reviews to our format
    const transformedReviews = reviews.slice(0, 5).map((review) => ({
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      time: review.time,
      relativeTimeDescription: review.relative_time_description,
    }));

    return {
      rating: rating || 0,
      totalRatings: user_ratings_total || 0,
      reviews: transformedReviews,
    };
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return null;
  }
}

/**
 * Get Google Maps URL for a place
 * @param {string} placeId - Google Places ID
 * @returns {string} Google Maps URL
 */
export function getGoogleMapsUrl(placeId) {
  if (!placeId) return null;
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

/**
 * Format rating as star display
 * @param {number} rating - Rating 0-5
 * @returns {string} Star representation
 */
export function formatRating(rating) {
  const stars = Math.round(rating);
  return '⭐'.repeat(stars);
}
