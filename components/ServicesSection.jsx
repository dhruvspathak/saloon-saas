export default function ServicesSection({ config, industryKey = 'salon' }) {
  const industry = config?.[industryKey] || config?.salon || {};
  const services = industry.services || [];

  return (
    <section id="services" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-gradient-rose mx-auto mb-6" />
          <p className="text-gray-600 text-lg font-sans max-w-2xl mx-auto">
            Discover our range of premium beauty services crafted to perfection
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-8 shadow-card hover:shadow-elegance transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">
                {service.icon}
              </div>

              {/* Category Badge */}
              <div className="inline-block bg-rose-gold/10 text-rose-gold px-3 py-1 rounded-full text-sm font-sans mb-3">
                {service.category}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 font-sans text-sm mb-4">
                {service.description}
              </p>

              {/* Details */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-sans">Duration:</span>
                  <span className="font-sans font-semibold text-gray-900">
                    {service.duration}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-sans">Price:</span>
                  <span className="font-sans font-bold text-rose-gold text-lg">
                    {service.price}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full mt-6 bg-rose-gold hover:bg-rose-gold-dark text-white py-2 rounded-lg font-sans font-bold transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
