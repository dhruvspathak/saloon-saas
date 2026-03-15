'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

/**
 * GoogleReviewsWidget
 * Displays Google ratings and top reviews fetched from Google Places API
 *
 * @param {Object} googleData - Data from fetchGoogleReviews
 * @param {number} googleData.rating - Average rating
 * @param {number} googleData.totalRatings - Total review count
 * @param {Array} googleData.reviews - Top reviews
 * @param {string} placeId - Google Places ID (for link)
 */
export default function GoogleReviewsWidget({ googleData, placeId }) {
  const [showAll, setShowAll] = useState(false);

  if (!googleData) {
    return null; // Skip if no data
  }

  const { rating, totalRatings, reviews } = googleData;
  const displayReviews = showAll ? reviews : reviews.slice(0, 3);
  const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Google Reviews
          </h2>
          <div className="w-20 h-1 bg-gradient-rose mx-auto" />
        </div>

        {/* Rating Summary Card */}
        <div className="bg-gradient-to-r from-rose-gold/10 to-rose-gold-light/10 rounded-2xl p-8 md:p-12 mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-5xl font-bold text-gray-900">{rating.toFixed(1)}</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-2xl ${
                    i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 text-lg font-sans">
            Based on {totalRatings.toLocaleString()} reviews
          </p>
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayReviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-card hover:shadow-elegance transition-shadow"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 font-sans mb-4 line-clamp-4">
                    {review.text}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 border-t pt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-rose flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 font-sans">
                        {review.author}
                      </p>
                      <p className="text-xs text-gray-500 font-sans">
                        {review.relativeTimeDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More / View All Button */}
            {reviews.length > 3 && (
              <div className="flex flex-col items-center gap-4">
                {showAll && (
                  <button
                    onClick={() => setShowAll(false)}
                    className="px-8 py-3 text-rose-gold font-sans font-semibold border-2 border-rose-gold rounded-lg hover:bg-rose-gold hover:text-white transition-colors"
                  >
                    Show Less
                  </button>
                )}

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-gradient-rose text-white font-sans font-semibold rounded-lg hover:shadow-elegance transition-shadow"
                >
                  See All Reviews on Google
                </a>
              </div>
            )}
          </>
        )}

        {reviews.length === 0 && (
          <p className="text-center text-gray-600 font-sans">
            No reviews available yet. Be the first to review!
          </p>
        )}
      </div>
    </section>
  );
}
