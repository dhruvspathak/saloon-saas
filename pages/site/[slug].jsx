import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import SectionRenderer from '@/components/SectionRenderer';
import Footer from '@/components/Footer';
import { buildSEO } from '@/utils/seoBuilder';
import { generateLocalBusinessSchema } from '@/utils/structuredData';
import { loadSalonConfig } from '@/lib/loadSalonConfig';
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
export default function SitePage({ site, googleData, layout, theme, industry, seo, structuredData }) {
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
  if (!site) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 text-lg mb-8">Site not found</p>
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

  const industryKey = (site.industry || 'salon').toLowerCase();

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

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo['og:title']} />
        <meta property="og:description" content={seo['og:description']} />
        <meta property="og:type" content={seo['og:type']} />
        <meta property="og:url" content={seo['og:url']} />
        <meta property="og:image" content={seo['og:image']} />
        <meta property="og:site_name" content={seo['og:site_name']} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={themeCSSVariables} className={`theme-${theme.name}`}>
        <Navigation config={{ site }} suiteName={site.name} industryKey={industryKey} />

        <main className="bg-white">
          <SectionRenderer
            layout={layout}
            config={{ salon: site }}
            industryKey={industryKey}
            googleData={googleData}
          />
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {site.services.map(service => {
                const serviceSlug = `${service.name.toLowerCase().replace(/ /g, '-')}-${site.location.area.toLowerCase().replace(/ /g, '-')}`;
                return (
                  <div key={service.id} className="border p-4 rounded-lg">
                    <h3 className="text-xl font-bold">{service.name}</h3>
                    <p>{service.description}</p>
                    <Link href={`/site/${site.slug}/${serviceSlug}`} className="text-blue-500 hover:underline">
                      Learn More
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <Footer config={{ site }} industryKey={industryKey} />
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
 * Get server-side props for each site
 * Fetches site configuration dynamically and resolves custom domains.
 */
export async function getServerSideProps({ req, query, res }) {
  // Set caching headers for performance equivalent to ISR locally (Vercel Edge Cache)
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  try {
    // Import resolver here if needed, or rely on top level import
    const { resolveSiteFromRequest } = require('@/lib/domainResolver');
    const resolvedSlug = resolveSiteFromRequest(req);
    const slug = resolvedSlug || query.slug;

    // Load site configuration from local JSON
    const siteData = loadSalonConfig(slug);

    if (!siteData || !siteData.salon) {
      return {
        notFound: true,
      };
    }

    const site = siteData.salon;

    // Get layout, theme, and industry configuration
    const layoutName = site.layout || 'layoutA';
    const themeName = site.theme || 'luxury';
    const industryName = site.industry || 'salon';

    const layout = getLayout(layoutName);
    const theme = getTheme(themeName);
    const industry = getIndustryModule(industryName);

    // Fetch Google Reviews if googlePlaceId exists
    let googleData = null;
    try {
      const googlePlaceId = site.location?.googlePlaceId;
      if (googlePlaceId) {
        googleData = await fetchGoogleReviews(googlePlaceId);
      }
    } catch (error) {
      console.warn('Error fetching Google reviews:', error);
    }

    // Build canonical URL dynamically based on the request host
    const host = req.headers.host || process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const basePath = resolvedSlug ? '' : `/site/${slug}`;
    const canonicalUrl = `${protocol}://${host}${basePath}`;

    const seo = buildSEO(site, canonicalUrl);
    const structuredData = generateLocalBusinessSchema(site);

    return {
      props: {
        site,
        googleData,
        layout,
        theme,
        industry,
        seo,
        structuredData,
        canonicalUrl,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
}
