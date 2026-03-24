import Head from 'next/head';
import UrlsDashboard from '@/components/internal/UrlsDashboard';

export default function UrlsPage() {
  return (
    <>
      <Head>
        <title>URLs | Control Tower</title>
        <meta name="description" content="Managed URLs for the collaborative AI coding SaaS." />
      </Head>
      <UrlsDashboard />
    </>
  );
}
