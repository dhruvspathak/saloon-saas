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

import { getSiteConfigBySlug } from '@/services/siteService';
import { fetchGoogleReviews } from '@/services/googleReviews';
import { getLayout } from '@/layouts';
import { getTheme } from '@/themes';
import { getIndustryModule } from '@/industries';

/**
 * Backward Compatibility Salon Page
 * URL: /salon/[slug]
 * 
 * This page maintains backward compatibility with the old salon-specific route.
 * It loads from the new multi-industry sites table but specifically for salon industry.
 * All salons are stored in the sites table with industry='salon'.
 * 
 * Redirects new users to /site/[slug], but old links still work here.
 */
export default function SalonPage({ config, siteConfig, googleData, layout, theme, industry, isFallback }) {
  const router = useRouter();

  // Handle loading state
  if (router.isFallback || isFallback) {
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
  if (!config && !siteConfig) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 text-lg mb-8">Salon not found</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-rose-gold text-white rounded hover:bg-rose-gold-dark transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Use new siteConfig if available, fallback to old config format
  const finalConfig = siteConfig?.configData || config || {};
  const suiteName = finalConfig.salon?.name || siteConfig?.name || 'Salon';
  const siteSlug = siteConfig?.slug || router.query.slug;

  // Restructure config for components that expect the old format
  const wrappedConfig = {
    salon: {
      name: suiteName,
      tagline: finalConfig.salon?.tagline || finalConfig.tagline || 'Professional Services',
      description: finalConfig.salon?.description || finalConfig.description || '',
      ...finalConfig.salon,
    },
    hero: finalConfig.hero || finalConfig.salon?.hero || {},
    about: finalConfig.about || finalConfig.salon?.about || {},
    services: finalConfig.services || finalConfig.salon?.services || [],
    gallery: finalConfig.gallery || finalConfig.salon?.gallery || [],
    beforeAfter: finalConfig.beforeAfter || finalConfig.salon?.beforeAfter || [],
    offers: finalConfig.offers || finalConfig.salon?.offers || [],
    reviews: finalConfig.reviews || finalConfig.salon?.reviews || [],
    location: finalConfig.location || finalConfig.salon?.location || {},
    booking: finalConfig.booking || finalConfig.salon?.booking || {},
    transformations: finalConfig.transformations || finalConfig.salon?.transformations || [],
    google: finalConfig.google || finalConfig.salon?.google || {},
  };

  // Apply theme CSS variables
  const themeCSSVariables = {
    '--color-primary': theme?.colors?.primary || '#B76E79',
    '--color-primary-dark': theme?.colors?.primaryDark || '#9B5A63',
    '--color-primary-light': theme?.colors?.primaryLight || '#D4949D',
    '--color-secondary': theme?.colors?.secondary || '#F5E6E8',
    '--color-accent': theme?.colors?.accent || '#D4AF37',
    '--color-background': theme?.colors?.background || '#FAFAFA',
    '--color-text': theme?.colors?.text || '#2C2C2C',
    '--color-text-light': theme?.colors?.textLight || '#666666',
  };

  /**
   * Render section component
   */
  const renderSection = (sectionName) => {
    switch (sectionName) {
      case 'Hero':
        return <HeroSection key="hero" config={wrappedConfig} suiteName={suiteName} />;
      case 'About':
        return <AboutSection key="about" config={wrappedConfig} />;
      case 'Services':
        return (
          <ServicesSection
            key="services"
            config={wrappedConfig}
            terminology={industry?.terminology}
          />
        );
      case 'Gallery':
        return (
          <GallerySection key="gallery" config={wrappedConfig} siteSlug={siteSlug} />
        );
      case 'BeforeAfter':
        return (
          <BeforeAfterGallery
            key="before-after"
            config={wrappedConfig}
            siteSlug={siteSlug}
          />
        );
      case 'Offers':
        return <OffersSection key="offers" config={wrappedConfig} />;
      case 'Reviews':
        return (
          <ReviewsSection
            key="reviews"
            config={wrappedConfig}
            googleData={googleData}
          />
        );
      case 'Location':
        return <LocationSection key="location" config={wrappedConfig} />;
      case 'Booking':
        return (
          <BookingSection
            key="booking"
            config={wrappedConfig}
            siteSlug={siteSlug}
            terminology={industry?.terminology}
            siteName={suiteName}
          />
        );
      default:
        return null;
    }
  };

  // Determine layout to use
  const sectionsToRender = layout && Array.isArray(layout) ? layout : [
    'Hero',
    'About',
    'Services',
    'Gallery',
    'BeforeAfter',
    'Offers',
    'Reviews',
    'Location',
    'Booking',
  ];

  return (
    <>
      <Head>
        <title>{suiteName} | Professional Beauty Services</title>
        <meta
          name="description"
          content={wrappedConfig.salon?.description || `Visit ${suiteName}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="canonical" content={`/salon/${siteSlug}`} />
      </Head>

      <div style={themeCSSVariables} className={`theme-${theme?.name || 'luxury'}`}>
        <Navigation config={wrappedConfig} suiteName={suiteName} />

        <main className="bg-white">
          {sectionsToRender && sectionsToRender.map((sectionName) => renderSection(sectionName))}
        </main>

        <Footer config={wrappedConfig} suiteName={suiteName} />
      </div>

      <style jsx global>{`
        :root {
          --color-primary: ${themeCSSVariables['--color-primary']};
          --color-primary-dark: ${themeCSSVariables['--color-primary-dark']};
          --color-primary-light: ${themeCSSVariables['--color-primary-light']};
          --color-secondary: ${themeCSSVariables['--color-secondary']};
          --color-accent: ${themeCSSVariables['--color-accent']};
          --color-background: ${themeCSSVariables['--color-background']};
          --color-text: ${themeCSSVariables['--color-text']};
          --color-text-light: ${themeCSSVariables['--color-text-light']};
          --font-heading: ${theme?.fonts?.heading || "'Playfair Display', Georgia, serif"};
          --font-body: ${theme?.fonts?.body || "'Inter', 'Segoe UI', sans-serif"};
        }

        body {
          font-family: var(--font-body);
          color: var(--color-text);
          background-color: var(--color-background);
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: var(--font-heading);
        }

        .text-primary {
          color: var(--color-primary);
        }

        .bg-primary {
          background-color: var(--color-primary);
        }

        .border-primary {
          border-color: var(--color-primary);
        }

        .hover\\:bg-primary:hover {
          background-color: var(--color-primary-dark);
        }
      `}</style>
    </>
  );
}

/**
 * Get static paths
 * First checks new sites table, falls back to old config files for backward compatibility
 */
export async function getStaticPaths() {
  try {
    // For now, use ISR to avoid lengthy build times
    // In production, you could pre-fetch all salon slugs from the database
    return {
      paths: [],
      fallback: 'blocking', // ISR: render on-demand and cache
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
 * Get static props
 * Fetches salon configuration from both new sites table and old config files
 */
export async function getStaticProps({ params }) {
  try {
    const { slug } = params;

    // Import server-only modules inside the function
    let loadSalonConfig;
    try {
      const mod = await import('@/lib/loadSalonConfig');
      loadSalonConfig = mod.loadSalonConfig;
    } catch (importError) {
      console.warn('Failed to import loadSalonConfig:', importError);
      loadSalonConfig = null;
    }

    let siteConfig = null;
    let config = null;
    let layout = null;
    let theme = null;
    let industry = null;

    // Try to load from new sites table first
    try {
      siteConfig = await getSiteConfigBySlug(slug);
      if (siteConfig && siteConfig.industry === 'salon') {
        layout = getLayout(siteConfig.layout || 'layoutA');
        theme = getTheme(siteConfig.theme || 'luxury');
        industry = getIndustryModule('salon');
      } else {
        siteConfig = null;
      }
    } catch (error) {
      console.warn('Error loading from sites table:', error);
      siteConfig = null;
    }

    // Fall back to old config file format if not found in new table
    if (!siteConfig && loadSalonConfig) {
      config = loadSalonConfig(slug);
      if (!config) {
        return {
          notFound: true,
          revalidate: 3600,
        };
      }
      // Use default theme and layout for old configs
      layout = getLayout('layoutA');
      theme = getTheme('luxury');
      industry = getIndustryModule('salon');
    } else if (!siteConfig && !loadSalonConfig) {
      // Both new table and old config loading failed
      return {
        notFound: true,
        revalidate: 3600,
      };
    }

    // Fetch Google Reviews if googlePlaceId exists
    let googleData = null;
    try {
      const googlePlaceId =
        siteConfig?.configData?.location?.googlePlaceId ||
        config?.salon?.location?.googlePlaceId;
      if (googlePlaceId) {
        googleData = await fetchGoogleReviews(googlePlaceId);
      }
    } catch (error) {
      console.warn('Error fetching Google reviews:', error);
    }

    return {
      props: {
        config,
        siteConfig,
        googleData,
        layout,
        theme,
        industry,
        isFallback: false,
      },
      revalidate: 3600, // ISR: Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
      revalidate: 3600,
    };
  }
}
