import Head from 'next/head';
import AppShell from '@/components/internal/AppShell';
import SectionCard from '@/components/internal/SectionCard';

export default function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings | Control Tower</title>
        <meta name="description" content="Workspace and platform settings." />
      </Head>
      <AppShell title="Settings" subtitle="Platform defaults for project visibility, approval routing, webhook behavior, and hosted asset posture live here.">
        <section className="grid gap-6 xl:grid-cols-2">
          <SectionCard title="Workspace defaults" eyebrow="Project settings">
            <div className="space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Default role for new invites: Viewer</div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Commit metadata retention: 180 days</div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Observability alert fanout: Datadog + Slack</div>
            </div>
          </SectionCard>
          <SectionCard title="Approval posture" eyebrow="Safety controls">
            <div className="space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Production rollback requires manager or admin.</div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Committer role can deploy only within assigned projects.</div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">Policy changes remain admin-only.</div>
            </div>
          </SectionCard>
        </section>
      </AppShell>
    </>
  );
}
