export default function LocationSection({ config, industryKey = 'salon' }) {
  const industry = config?.[industryKey] || config?.salon || {};
  const location = industry.location || {};

  const openDirections = () => {
    const maps = `https://www.google.com/maps/search/${encodeURIComponent(
      location.address
    )}`;
    window.open(maps, '_blank');
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Us
          </h2>
          <div className="w-20 h-1 bg-gradient-rose mx-auto mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-elegance h-96">
            <iframe
              src={location.googleMapEmbed || 'https://www.google.com/maps?q=India&output=embed'}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                📍 Location
              </h3>
              <p className="text-gray-700 font-sans text-lg leading-relaxed">
                {location.address}
              </p>
              <button
                onClick={openDirections}
                className="mt-4 text-rose-gold hover:text-rose-gold-dark font-sans font-bold transition-colors inline-flex items-center gap-2"
              >
                Get Directions →
              </button>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                📞 Contact
              </h3>
              <a
                href={`tel:${location.phone}`}
                className="block text-rose-gold hover:text-rose-gold-dark font-sans font-bold text-lg mb-3 transition-colors"
              >
                {location.phone}
              </a>
              {location.email && (
                <a
                  href={`mailto:${location.email}`}
                  className="block text-rose-gold hover:text-rose-gold-dark font-sans font-bold transition-colors"
                >
                  {location.email}
                </a>
              )}
            </div>

            {/* Opening Hours */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                🕐 Opening Hours
              </h3>
              <div className="space-y-2 font-sans text-gray-700">
                {Object.entries(location.openingHours || {}).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize font-semibold">
                      {day}:
                    </span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            {location.whatsapp && (
              <a
                href={`https://wa.me/${String(location.whatsapp).replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-sans font-bold text-center text-lg transition-all duration-300 shadow-elegance"
              >
                💬 Chat on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
