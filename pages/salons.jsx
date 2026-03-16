import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { loadAllSalonConfigs } from '@/lib/loadSalonConfig';

/**
 * Salons Directory Page
 * Displays all available salons with links to their individual pages
 * URL: /salons
 */
export default function SalonsDirectory({ salons }) {
  return (
    <>
      <Head>
        <title>Our Salons | Salon Network</title>
        <meta name="description" content="Explore our network of premium beauty salons. Find the perfect salon for your needs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#B76E79" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Our Salons | Salon Network" />
        <meta property="og:description" content="Explore our network of premium beauty salons." />
        <meta property="og:url" content={typeof window !== 'undefined' ? `${window.location.origin}/salons` : ''} />
      </Head>

      <main className="w-full">
        {/* Navigation Bar */}
        <nav className="fixed w-full z-50 bg-white shadow-elegance">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex-shrink-0">
                <h1 className="font-serif font-bold text-rose-gold-dark text-2xl">✨</h1>
              </Link>
              <Link
                href="/"
                className="font-sans font-medium text-gray-800 hover:text-rose-gold transition-colors"
              >
                ← Back Home
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-20 px-4 bg-gradient-to-br from-rose-gold/5 to-rose-gold-light/5">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Salons
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-sans max-w-2xl mx-auto">
              Explore our network of premium beauty salons. Each salon offers unique services and expertise tailored to your needs.
            </p>
            <div className="w-20 h-1 bg-gradient-rose mx-auto mt-8" />
          </div>
        </section>

        {/* Salons Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {salons && salons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {salons.map((salon) => (
                  <Link
                    key={salon.slug}
                    href={`/salon/${salon.slug}`}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-elegance transition-all duration-300 transform hover:-translate-y-2">
                      {/* Image Container */}
                      <div className="relative h-56 bg-gray-200 overflow-hidden">
                        <Image
                          src={salon.hero.backgroundImage}
                          alt={salon.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          quality={75}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Name */}
                        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2 group-hover:text-rose-gold transition-colors">
                          {salon.name}
                        </h3>

                        {/* Tagline */}
                        <p className="text-rose-gold-dark font-sans text-sm font-semibold mb-3 italic">
                          "{salon.tagline}"
                        </p>

                        {/* Description */}
                        <p className="text-gray-600 font-sans text-sm mb-4 line-clamp-2">
                          {salon.description}
                        </p>

                        {/* Location */}
                        <div className="flex items-start gap-2 mb-4">
                          <span className="text-rose-gold text-lg mt-0.5">📍</span>
                          <div className="flex-1">
                            <p className="text-gray-700 font-sans text-sm font-semibold">
                              {salon.location.address.split(',')[1]?.trim() || salon.location.address}
                            </p>
                          </div>
                        </div>

                        {/* Services Count */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-rose-gold text-lg">✨</span>
                          <p className="text-gray-600 font-sans text-sm">
                            {salon.services?.length || 0} Services Available
                          </p>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <span className="inline-block bg-rose-gold text-white px-4 py-2 rounded-lg font-sans font-semibold text-sm group-hover:bg-rose-gold-dark transition-colors">
                            View Salon →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg font-sans">No salons available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center font-serif text-4xl font-bold text-gray-900 mb-16">
              Why Choose Our Network?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Expert Professionals',
                  description: 'Each salon is staffed with certified beauty experts and stylists.',
                },
                {
                  icon: '💎',
                  title: 'Premium Services',
                  description: 'Access to beauty services tailored to your specific needs and preferences.',
                },
                {
                  icon: '✨',
                  title: 'Quality Guaranteed',
                  description: 'Experience luxury treatments in well-maintained, welcoming environments.',
                },
              ].map((highlight, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl mb-4 flex justify-center">
                    {highlight.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 font-sans">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <p className="font-sans text-gray-400">
                © {new Date().getFullYear()} Salon Network. All rights reserved.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <Link
                  href="/"
                  className="font-sans text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/salons"
                  className="font-sans text-rose-gold font-semibold"
                >
                  All Salons
                </Link>
                <p className="font-sans text-xs text-gray-500">
                  Built for beauty professionals
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

/**
 * getStaticProps - Fetch all salon configurations
 */
export async function getStaticProps() {
  try {
    // Load all salon configurations
    const allConfigs = loadAllSalonConfigs();

    // Transform into array with additional metadata
    const salons = Object.entries(allConfigs).map(([slug, config]) => ({
      slug,
      ...config.salon,
      google: config.google,
    }));

    // Sort by name
    salons.sort((a, b) => a.name.localeCompare(b.name));

    return {
      props: {
        salons,
      },
      // Revalidate every 1 hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        salons: [],
      },
      revalidate: 3600,
    };
  }
}
