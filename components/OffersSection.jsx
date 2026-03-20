export default function OffersSection({ config, industryKey = 'salon' }) {
  const industry = config?.[industryKey] || config?.salon || {};
  const offers = industry.offers || [];

  return (
    <section id="offers" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Special Offers
          </h2>
          <div className="w-20 h-1 bg-gradient-rose mx-auto mb-6" />
          <p className="text-gray-600 text-lg font-sans max-w-2xl mx-auto">
            Exclusive deals and promotions just for you
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative rounded-xl overflow-hidden shadow-card hover:shadow-elegance transition-all duration-300 transform hover:scale-105"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-rose opacity-90" />
              <div className="absolute inset-0 bg-black opacity-10" />

              {/* Content */}
              <div className="relative p-8 text-white min-h-80 flex flex-col justify-between">
                {/* Title and Description */}
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-3">
                    {offer.title}
                  </h3>
                  <p className="font-sans text-white/90 text-sm mb-6">
                    {offer.description}
                  </p>
                </div>

                {/* Discount Badge */}
                <div className="mb-6">
                  <div className="inline-block bg-white text-rose-gold-dark px-6 py-3 rounded-lg">
                    <p className="font-serif text-3xl font-bold">
                      {offer.discount}
                    </p>
                  </div>
                </div>

                {/* Code and Valid Till */}
                <div className="space-y-3 border-t border-white/30 pt-6">
                  <div>
                    <p className="text-xs opacity-80 font-sans mb-1">Code</p>
                    <p className="font-mono font-bold text-lg">
                      {offer.code}
                    </p>
                  </div>
                  <p className="text-xs opacity-80 font-sans">
                    Valid till: {offer.validTill}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    // Copy to clipboard
                    navigator.clipboard.writeText(offer.code);
                    alert(`Code ${offer.code} copied! Use it while booking.`);
                  }}
                  className="mt-6 w-full bg-white text-rose-gold-dark hover:bg-gray-100 py-3 rounded-lg font-sans font-bold transition-colors"
                >
                  Copy Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
