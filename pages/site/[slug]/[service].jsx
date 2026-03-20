// /pages/site/[slug]/[service].jsx

import Head from 'next/head';
import { useRouter } from 'next/router';
import { buildSEO } from '../../../utils/seoBuilder';
import { generateLocalBusinessSchema } from '../../../utils/structuredData';
import { loadSalonConfig } from '../../../lib/loadSalonConfig';

const ServicePage = ({ site, service, seo, structuredData }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      </Head>

      <main>
        <h1>{service.name}</h1>
        <p>{service.description}</p>
        <p>Price: {service.price}</p>
        <p>Duration: {service.duration}</p>
      </main>
    </div>
  );
};

export const getServerSideProps = async ({ req, query, res }) => {
  // Set caching headers to ensure Vercel caches this edge-side (similar to ISR)
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  const { resolveSiteFromRequest } = require('../../../lib/domainResolver');
  const resolvedSlug = resolveSiteFromRequest(req);
  const slug = resolvedSlug || query.slug;
  const serviceSlug = query.service;

  try {
    const siteData = await loadSalonConfig(slug);
    const site = siteData?.salon || siteData;

    if (!site) {
      return { notFound: true };
    }

    const service = site.services?.find(s => {
      const areaStr = site.location?.area || site.location?.city || '';
      const expectedSlug = `${s.name.toLowerCase().replace(/ /g, '-')}-${areaStr.toLowerCase().replace(/ /g, '-')}`;
      return serviceSlug === expectedSlug;
    });

    if (!service) {
      return { notFound: true };
    }
    
    // Construct canonical URL dynamically based on host
    const host = req.headers.host || process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    
    const basePath = resolvedSlug ? `/${serviceSlug}` : `/site/${slug}/${serviceSlug}`;
    const canonicalUrl = `${protocol}://${host}${basePath}`;

    const seo = buildSEO(site, canonicalUrl);
    // Modify local schema dynamically for service slightly if needed, but site schema is okay.
    const structuredData = generateLocalBusinessSchema(site);

    return {
      props: {
        site,
        service,
        seo,
        structuredData
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps for service page:', error);
    return { notFound: true };
  }
};

export default ServicePage;
