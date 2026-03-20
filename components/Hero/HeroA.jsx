import Image from 'next/image';
 
export default function HeroA({ config, industryKey }) {
  const industry = config?.[industryKey] || config?.salon || {};
  const { hero = {}, location = {}, name, tagline } = industry;
 
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden pt-20">
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage || '/images/hero-default.svg'}
          alt={name || 'Hero'}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-black" style={{ opacity: hero.overlayOpacity ?? 0.55 }} />
      </div>
 
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {name}
          </h1>
          <p className="font-sans text-white text-xl md:text-2xl font-light mb-12 drop-shadow-md">
            {tagline}
          </p>
 
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-rose-gold hover:bg-rose-gold-dark text-white px-10 py-4 rounded-lg font-sans font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-elegance"
            >
              Book Now
            </button>
 
            {location.whatsapp && (
              <a
                href={`https://wa.me/${String(location.whatsapp).replace(/\\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-sans font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-elegance"
              >
                WhatsApp
              </a>
            )}
 
            {location.phone && (
              <a
                href={`tel:${location.phone}`}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-10 py-4 rounded-lg font-sans font-bold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Call Now
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

