export default function ReviewsSection({ config, industryKey = 'salon', googleData = null }) {
  const industry = config?.[industryKey] || config?.salon || {};
  const reviews = (googleData?.reviews && googleData.reviews.length > 0) ? googleData.reviews : (industry.reviews || []);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Client Reviews
          </h2>
          <div className="w-20 h-1 bg-gradient-rose mx-auto mb-6" />
          <p className="text-gray-600 text-lg font-sans max-w-2xl mx-auto">
            What our happy clients say about us
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-xl p-8 shadow-card hover:shadow-elegance transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="mb-4">
                  {renderStars(Number(review.rating || 0))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 font-sans mb-6 italic leading-relaxed">
                "{review.review || review.text || review.comment || ''}"
              </p>

              {/* Service Badge */}
              {(review.service || review.relative_time_description) && (
                <div className="inline-block bg-rose-gold/10 text-rose-gold px-3 py-1 rounded-full text-xs font-sans font-semibold mb-4">
                  {review.service || review.relative_time_description}
                </div>
              )}

              {/* Author */}
              <div className="border-t pt-4">
                <p className="font-serif font-bold text-gray-900">
                  {review.name}
                </p>
                {review.date && (
                  <p className="text-gray-600 font-sans text-sm">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 font-sans text-lg mb-6">
            Ready to experience luxurious beauty services?
          </p>
          <button
            onClick={() => {
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-rose-gold hover:bg-rose-gold-dark text-white px-12 py-4 rounded-lg font-sans font-bold text-lg transition-all duration-300 shadow-elegance"
          >
            Book Your Appointment
          </button>
        </div>
      </div>
    </section>
  );
}
