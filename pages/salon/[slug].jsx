import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import OffersSection from '@/components/OffersSection';
import ReviewsSection from '@/components/ReviewsSection';
import LocationSection from '@/components/LocationSection';
import BookingSection from '@/components/BookingSection';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import GoogleReviewsWidget from '@/components/GoogleReviewsWidget';
import Footer from '@/components/Footer';

import { loadSalonConfig, listAvailableSalons } from '@/lib/loadSalonConfig';
import { fetchGoogleReviews } from '@/services/googleReviews';

/**
 * Dynamic Salon Page
 * Renders a multi-tenant salon page based on slug parameter
 * URL: /salon/[slug]
 *
 * Example: /salon/cinderella
 */
export default function SalonPage({ config, googleData }) {
  const router = useRouter();

  // Handle loading state
  if (router.isFallback) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Loading salon information</p>
        </div>
      </div>
    );
  }

  // Handle 404
  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 text-lg mb-8">Salon not found</p>
          <Link
            href="/"
            className="inline-block bg-rose-gold hover:bg-rose-gold-dark text-white px-6 py-3 rounded-lg font-sans font-bold transition-colors"
          >
            ← Back Home
          </Link>
        </div>
      </div>
    );
  }

  const { salon } = config;

  return (
    <>
      <Head>
        {/* Meta Tags */}
        <title>{salon.meta.title}</title>
        <meta name="description" content={salon.meta.description} />
        <meta name="keywords" content={salon.meta.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#B76E79" />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={salon.meta.title} />
        <meta property="og:description" content={salon.meta.description} />
        <meta property="og:image" content={salon.meta.ogImage} />
        <meta property="og:site_name" content={salon.name} />
        <meta property="og:url" content={`${typeof window !== 'undefined' ? window.location.origin : ''}/salon/${salon.slug}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={salon.meta.title} />
        <meta name="twitter:description" content={salon.meta.description} />
        <meta name="twitter:image" content={salon.meta.ogImage} />

        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23B76E79'>✨</text></svg>" />

        {/* Canonical URL */}
        <link rel="canonical" href={`${typeof window !== 'undefined' ? window.location.origin : ''}/salon/${salon.slug}`} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: salon.name,
              description: salon.description,
              image: salon.meta.ogImage,
              address: {
                '@type': 'PostalAddress',
                streetAddress: salon.location.address.split(',')[0],
                addressLocality: salon.location.address.split(',')[1]?.trim() || 'Mumbai',
                addressCountry: 'IN',
              },
              telephone: salon.location.phone,
              url: typeof window !== 'undefined' ? window.location.href : '',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: googleData?.rating ? googleData.rating.toFixed(1) : '4.8',
                ratingCount: googleData?.totalRatings || salon.reviews?.length || 10,
              },
            }),
          }}
        />
      </Head>

      <main className="w-full">
        {/* Navigation */}
        <Navigation config={config} />

        {/* Hero Section */}
        <HeroSection config={config} />

        {/* About Section */}
        <AboutSection config={config} />

        {/* Services Section */}
        <ServicesSection config={config} />

        {/* Gallery Section */}
        <GallerySection config={config} />

        {/* Before/After Transformations */}
        {config.transformations && config.transformations.length > 0 && (
          <BeforeAfterGallery transformations={config.transformations} />
        )}

        {/* Google Reviews Widget */}
        {googleData && config.google?.placeId && (
          <GoogleReviewsWidget googleData={googleData} placeId={config.google.placeId} />
        )}

        {/* Offers Section */}
        <OffersSection config={config} />

        {/* Reviews Section */}
        <ReviewsSection config={config} />

        {/* Location Section */}
        <LocationSection config={config} />

        {/* Booking Section */}
        <BookingSection config={config} />

        {/* Footer */}
        <Footer config={config} />
      </main>
    </>
  );
}

/**
 * getStaticPaths - Generate static paths for all available salons
 * This enables static generation for all salon routes
 */
export async function getStaticPaths() {
  try {
    // Get list of all available salon slugs
    const slugs = listAvailableSalons();

    // Generate paths for each salon
    const paths = slugs.map((slug) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: 'blocking', // Use blocking mode to generate at request time if not pregenerated
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

/**
 * getStaticProps - Fetch salon config and Google reviews
 * Regenerates every hour (3600 seconds)
 */
export async function getStaticProps({ params }) {
  try {
    const { slug } = params;

    // Load salon configuration
    const config = loadSalonConfig(slug);

    // If salon config not found, return 404
    if (!config) {
      return {
        notFound: true,
        revalidate: 3600, // Retry every hour
      };
    }

    let googleData = null;

    // Fetch Google reviews if placeId is configured
    if (config.google?.placeId) {
      try {
        googleData = await fetchGoogleReviews(config.google.placeId);
      } catch (error) {
        console.warn(`Error fetching Google reviews for salon ${slug}:`, error);
        // Continue without Google data - it's optional
      }
    }

    return {
      props: {
        config,
        googleData: googleData || null,
      },
      // Revalidate every 1 hour (3600 seconds)
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
      revalidate: 3600,
    };
  }
}
