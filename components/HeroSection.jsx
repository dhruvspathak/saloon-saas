import Image from 'next/image';

export default function HeroSection({ config }) {
  const { salon } = config;
  const { hero, location } = salon;

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt={salon.name}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: hero.overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          {/* Name */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {salon.name}
          </h1>

          {/* Tagline */}
          <p className="font-sans text-white text-xl md:text-2xl font-light mb-12 drop-shadow-md">
            {salon.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Book Appointment */}
            <button
              onClick={() => {
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-rose-gold hover:bg-rose-gold-dark text-white px-10 py-4 rounded-lg font-sans font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-elegance"
            >
              💅 Book Appointment
            </button>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${location.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-sans font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-elegance"
            >
              💬 WhatsApp
            </a>

            {/* Call Now */}
            <a
              href={`tel:${location.phone}`}
              className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-10 py-4 rounded-lg font-sans font-bold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              📞 Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${location.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-elegance transition-all duration-300 transform hover:scale-110 animate-pulse"
        title="Chat on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.694.735 5.326 2.125 7.619L2.04 21.97l8.06-2.113a9.86 9.86 0 004.7 1.197h.005c5.438 0 9.866-4.422 9.89-9.88.021-2.65-.796-5.145-2.405-7.222-1.609-2.076-3.962-3.328-6.476-3.348z" />
        </svg>
      </a>
    </section>
  );
}
