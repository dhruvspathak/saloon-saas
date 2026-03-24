import Head from 'next/head';
import AppShell from '@/components/internal/AppShell';
import CommitFeed from '@/components/internal/CommitFeed';
import SectionCard from '@/components/internal/SectionCard';
import { getRecentCommits } from '@/lib/internalProductData';

export default function CommitsPage() {
  const commits = getRecentCommits();

  return (
    <>
      <Head>
        <title>Commits | Control Tower</title>
        <meta name="description" content="Commit metadata across managed URLs." />
      </Head>
      <AppShell title="Commit History" subtitle="A shared audit feed of deployable changes across every managed URL, with commit metadata tied back to the exact hosted asset.">
        <SectionCard title="Recent commits" eyebrow="Deployment lineage">
          <CommitFeed commits={commits} />
        </SectionCard>
      </AppShell>
    </>
  );
}
