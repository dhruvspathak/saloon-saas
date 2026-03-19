export default function AboutSection({ config, industryKey = 'salon' }) {
  const industry = config?.[industryKey] || config?.salon || {};
  const about = industry.about || {};

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {about.headline}
          </h2>
          <div className="w-20 h-1 bg-gradient-rose mx-auto mb-6" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Description */}
          <div>
            <p className="text-gray-700 font-sans text-lg leading-relaxed mb-6">
              {about.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg shadow-card text-center">
                <p className="text-3xl font-serif font-bold text-rose-gold mb-2">
                  {about.yearsInBusiness}+
                </p>
                <p className="text-gray-600 font-sans text-sm">
                  Years of Excellence
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-card text-center">
                <p className="text-3xl font-serif font-bold text-rose-gold mb-2">
                  {about.clientsSatisfied}
                </p>
                <p className="text-gray-600 font-sans text-sm">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>

          {/* Right: Space for Image (if needed) */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full h-80 bg-gradient-rose rounded-xl shadow-elegance opacity-20" />
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(about.highlights || []).map((highlight, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-card hover:shadow-elegance transition-all duration-300 text-center"
            >
              <div className="text-5xl mb-4">
                {highlight.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-600 font-sans text-sm">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
