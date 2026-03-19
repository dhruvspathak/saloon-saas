import Image from 'next/image';
 
export default function HeroC({ config, industryKey }) {
  const industry = config?.[industryKey] || config?.salon || {};
  const { hero = {}, name, tagline, location = {} } = industry;
 
  return (
    <section id="home" className="relative min-h-[75vh] w-full overflow-hidden pt-20">
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage || '/images/hero-default.svg'}
          alt={name || 'Hero'}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
 
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white drop-shadow">
              {name}
            </h1>
            <p className="mt-5 font-sans text-white/90 text-lg md:text-xl">
              {tagline}
            </p>
 
            <div className="mt-10 flex gap-3 flex-wrap">
              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-rose-gold hover:bg-rose-gold-dark text-white px-8 py-3 rounded-lg font-sans font-bold transition-all duration-300 shadow-elegance"
              >
                Book Now
              </button>
              {location.phone && (
                <a
                  href={`tel:${location.phone}`}
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-sans font-bold transition-all duration-300"
                >
                  Call
                </a>
              )}
            </div>
          </div>
 
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm text-white">
            <h3 className="font-serif text-2xl font-bold mb-4">Visit Us</h3>
            <p className="font-sans text-white/90">{location.address || 'Address coming soon'}</p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/15 hover:bg-white/25 text-white px-5 py-2 rounded-lg font-sans font-semibold border border-white/30 transition-all"
              >
                Location
              </button>
              <button
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/15 hover:bg-white/25 text-white px-5 py-2 rounded-lg font-sans font-semibold border border-white/30 transition-all"
              >
                Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

