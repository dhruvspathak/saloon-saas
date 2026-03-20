import Image from 'next/image';
 
export default function HeroB({ config, industryKey }) {
  const industry = config?.[industryKey] || config?.salon || {};
  const { hero = {}, name, tagline } = industry;
 
  return (
    <section id="home" className="relative min-h-[80vh] w-full overflow-hidden pt-20">
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage || '/images/hero-default.svg'}
          alt={name || 'Hero'}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>
 
      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <p className="inline-block bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full text-sm font-sans mb-6 backdrop-blur-sm">
            {industryKey?.toUpperCase?.() || 'SERVICE'}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            {name}
          </h1>
          <p className="mt-6 font-sans text-white/90 text-lg md:text-xl leading-relaxed">
            {tagline}
          </p>
 
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-rose-gold hover:bg-rose-gold-dark text-white px-8 py-3 rounded-lg font-sans font-bold transition-all duration-300 shadow-elegance"
            >
              Explore Services
            </button>
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/15 hover:bg-white/25 text-white px-8 py-3 rounded-lg font-sans font-bold border border-white/30 backdrop-blur-sm transition-all duration-300"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

