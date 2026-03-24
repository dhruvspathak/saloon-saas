import Head from 'next/head';
import UrlsDashboard from '@/components/internal/UrlsDashboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>Control Tower | Collaborative AI Coding SaaS</title>
        <meta name="description" content="Internal control tower for URLs, users, integrations, commits, policies, and settings." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UrlsDashboard />
    </>
  );
}
