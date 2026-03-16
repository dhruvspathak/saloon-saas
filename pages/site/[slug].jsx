import Head from 'next/head';
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
import Footer from '@/components/Footer';

import { getSiteConfigBySlug } from '@/services/siteService';
import { getLayout } from '@/layouts';
import { getTheme } from '@/themes';
import { getIndustryModule } from '@/industries';
import { fetchGoogleReviews } from '@/services/googleReviews';

/**
 * Dynamic Site Page
 * Renders a multi-tenant site based on slug parameter
 * URL: /site/[slug]
 *
 * Features:
 * - Dynamic layout based on site configuration
 * - Theme-based styling
 * - Industry-specific terminology
 * - Google Reviews integration
 * - Responsive design support
 */
export default function SitePage({ siteConfig, googleData, layout, theme, industry }) {
  const router = useRouter();

  // Handle loading state
  if (router.isFallback) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Loading site information</p>
        </div>
      </div>
    );
  }

  // Handle 404
  if (!siteConfig) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 text-lg mb-8">Site not found</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-rose-gold text-white rounded hover:bg-rose-gold-dark transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const config = siteConfig.configData || {};
  const siteInfo = config.site || {};

  // Apply theme CSS variables
  const themeCSSVariables = {
    '--color-primary': theme.colors.primary,
    '--color-primary-dark': theme.colors.primaryDark,
    '--color-primary-light': theme.colors.primaryLight,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-text': theme.colors.text,
    '--color-text-light': theme.colors.textLight,
  };

  /**
   * Render section component based on section name
   * @param {string} sectionName - Name of the section
   * @returns {JSX.Element} Rendered section
   */
  const renderSection = (sectionName) => {
    switch (sectionName) {
      case 'Hero':
        return <HeroSection key="hero" config={config.hero} suiteName={siteInfo.name} />;
      case 'About':
        return <AboutSection key="about" config={config.about} />;
      case 'Services':
        return (
          <ServicesSection
            key="services"
            services={config.services || []}
            terminology={industry.terminology}
          />
        );
      case 'Gallery':
        return (
          <GallerySection
            key="gallery"
            images={config.gallery || []}
            siteSlug={siteInfo.slug}
          />
        );
      case 'BeforeAfter':
        return (
          <BeforeAfterGallery
            key="before-after"
            images={config.beforeAfter || []}
            siteSlug={siteInfo.slug}
          />
        );
      case 'Offers':
        return <OffersSection key="offers" offers={config.offers || []} />;
      case 'Reviews':
        return (
          <ReviewsSection
            key="reviews"
            reviews={googleData?.reviews || config.reviews || []}
            rating={googleData?.rating}
          />
        );
      case 'Location':
        return <LocationSection key="location" config={config.location} />;
      case 'Booking':
        return (
          <BookingSection
            key="booking"
            siteSlug={siteInfo.slug}
            terminology={industry.terminology}
            siteName={siteInfo.name}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>{siteInfo.name} | Professional Services</title>
        <meta name="description" content={siteInfo.description || `Visit ${siteInfo.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={themeCSSVariables} className={`theme-${theme.name}`}>
        <Navigation config={config.location} suiteName={siteInfo.name} />

        <main className="bg-white">
          {layout && layout.map((sectionName) => renderSection(sectionName))}
        </main>

        <Footer config={config.location} suiteName={siteInfo.name} />
      </div>

      <style jsx global>{`
        :root {
          --color-primary: ${theme.colors.primary};
          --color-primary-dark: ${theme.colors.primaryDark};
          --color-primary-light: ${theme.colors.primaryLight};
          --color-secondary: ${theme.colors.secondary};
          --color-accent: ${theme.colors.accent};
          --color-background: ${theme.colors.background};
          --color-text: ${theme.colors.text};
          --color-text-light: ${theme.colors.textLight};
          --font-heading: ${theme.fonts.heading};
          --font-body: ${theme.fonts.body};
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

        .btn-primary {
          background-color: var(--color-primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: background-color 0.3s;
        }

        .btn-primary:hover {
          background-color: var(--color-primary-dark);
        }

        .btn-secondary {
          background-color: var(--color-secondary);
          color: var(--color-primary);
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 600;
          border: 1px solid var(--color-primary);
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background-color: var(--color-primary);
          color: white;
        }
      `}</style>
    </>
  );
}

/**
 * Get static paths for all sites
 * Pre-renders all site pages at build time
 */
export async function getStaticPaths() {
  try {
    // In production, you would fetch all sites from the database
    // For now, returning empty array for ISR (Incremental Static Regeneration)
    return {
      paths: [],
      fallback: 'blocking', // Use ISR: render on-demand and cache
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
 * Get static props for each site
 * Fetches site configuration and metadata
 */
export async function getStaticProps({ params }) {
  try {
    const { slug } = params;

    // Fetch site configuration from database
    const siteConfig = await getSiteConfigBySlug(slug);

    if (!siteConfig) {
      return {
        notFound: true,
        revalidate: 3600, // Revalidate every hour
      };
    }

    const config = siteConfig.configData || {};

    // Get layout, theme, and industry configuration
    const layout = getLayout(siteConfig.layout || 'layoutA');
    const theme = getTheme(siteConfig.theme || 'luxury');
    const industry = getIndustryModule(siteConfig.industry || 'salon');

    // Fetch Google Reviews if googlePlaceId exists
    let googleData = null;
    try {
      const googlePlaceId = config.location?.googlePlaceId;
      if (googlePlaceId) {
        googleData = await fetchGoogleReviews(googlePlaceId);
      }
    } catch (error) {
      console.warn('Error fetching Google reviews:', error);
    }

    return {
      props: {
        siteConfig,
        googleData,
        layout,
        theme,
        industry,
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
