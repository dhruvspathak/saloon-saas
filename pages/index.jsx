import Head from 'next/head';
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

import { loadDefaultSalonConfig } from '@/lib/loadSalonConfig';
import { fetchGoogleReviews } from '@/services/googleReviews';

export default function Home({ config, googleData }) {
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

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={salon.meta.title} />
        <meta name="twitter:description" content={salon.meta.description} />
        <meta name="twitter:image" content={salon.meta.ogImage} />

        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23B76E79'>✨</text></svg>" />

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
                ratingValue: '4.8',
                ratingCount: salon.reviews.length,
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
 * getStaticProps - Server-side data fetching with ISR
 * Fetches Google reviews data with 1-hour revalidation
 * Loads default salon configuration (backward compatible)
 */
export async function getStaticProps() {
  let config = null;
  let googleData = null;

  try {
    // Load default salon configuration
    config = loadDefaultSalonConfig();

    // If config not found, return notFound
    if (!config) {
      return {
        notFound: true,
        revalidate: 3600,
      };
    }

    // Fetch Google reviews if placeId is configured
    if (config.google?.placeId) {
      try {
        googleData = await fetchGoogleReviews(config.google.placeId);
      } catch (error) {
        console.warn('Error fetching Google reviews:', error);
        // Continue without Google data - it's optional
      }
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
      revalidate: 3600,
    };
  }

  return {
    props: {
      config,
      googleData: googleData || null,
    },
    // Revalidate every 1 hour (3600 seconds)
    revalidate: 3600,
  };
}
