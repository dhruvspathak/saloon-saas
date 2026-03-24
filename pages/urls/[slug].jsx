import Head from 'next/head';
import Link from 'next/link';
import AppShell from '@/components/internal/AppShell';
import CommitFeed from '@/components/internal/CommitFeed';
import SectionCard from '@/components/internal/SectionCard';
import StatCard from '@/components/internal/StatCard';
import StatusBadge from '@/components/internal/StatusBadge';
import { getUrlBySlug, urls } from '@/lib/internalProductData';

function healthTone(health) {
  if (health === 'healthy') return 'success';
  if (health === 'warning') return 'warning';
  return 'danger';
}

function severityTone(severity) {
  if (severity === 'high' || severity === 'critical') return 'danger';
  if (severity === 'medium') return 'warning';
  return 'neutral';
}

export default function UrlDetailPage({ asset }) {
  return (
    <>
      <Head>
        <title>{asset.name} | URL Details</title>
        <meta name="description" content={`Operational details for ${asset.url}.`} />
      </Head>
      <AppShell
        title={asset.name}
        subtitle={`Detail page for ${asset.url}. Overview, commit history, SDLC integrations, security gaps, and runtime posture are grouped in one operator workflow.`}
      >
        <section className="grid gap-4 lg:grid-cols-5">
          <div className="lg:col-span-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Health score" value={asset.score} hint={`${asset.uptime} uptime`} accent="from-emerald-300/50 to-emerald-600/10" />
            <StatCard label="Latency" value={asset.latency} hint={`${asset.region} region`} accent="from-cyan-300/50 to-blue-500/10" />
            <StatCard label="Framework" value={asset.framework} hint={`Branch ${asset.metadata.branch}`} accent="from-violet-300/50 to-indigo-500/10" />
            <StatCard label="Runtime incidents" value={asset.runtime.incidents} hint={`${asset.runtime.activeMonitors} active monitors`} accent="from-amber-300/50 to-orange-500/10" />
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-slate-950/30">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Instant rollback</p>
            <StatusBadge tone={healthTone(asset.health)}>{asset.health}</StatusBadge>
            <p className="mt-4 text-sm text-slate-300">Rollback is protected by policy and limited to manager/admin roles on production assets.</p>
            <button className="mt-5 w-full rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-100 transition hover:bg-rose-500/20">
              Instant Rollback
            </button>
            <p className="mt-3 text-xs text-slate-500">Last rollback: {asset.metadata.lastRollback}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard title="Overview" eyebrow="Health and metadata">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-500">Environment</p>
                <p className="mt-2 text-xl font-semibold text-white">{asset.environment}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-500">Owner</p>
                <p className="mt-2 text-xl font-semibold text-white">{asset.owner}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-500">Latest commit</p>
                <p className="mt-2 font-mono text-xl font-semibold text-white">{asset.metadata.commit}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-500">AI policy</p>
                <p className="mt-2 text-xl font-semibold text-white">{asset.metadata.aiPolicy}</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
              <p>Released at: {asset.metadata.releasedAt}</p>
              <p className="mt-2">Owner team: {asset.metadata.ownerTeam}</p>
            </div>
          </SectionCard>

          <SectionCard title="SDLC" eyebrow="Repo, deployment, ticket, alert, CICD">
            <div className="space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-slate-500">Repo</p>
                <p className="mt-2 text-white">{asset.repo}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-slate-500">Deployment</p>
                <p className="mt-2 text-white">{asset.deployment}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-slate-500">Ticket</p>
                <p className="mt-2 text-white">{asset.ticket}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-slate-500">Alert</p>
                <p className="mt-2 text-white">{asset.alert}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-slate-500">CI/CD</p>
                <p className="mt-2 text-white">{asset.cicd}</p>
              </div>
            </div>
          </SectionCard>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard title="Commit history" eyebrow="Commit metadata" action={<Link href="/commits" className="text-sm text-cyan-200 hover:text-cyan-100">View all commits</Link>}>
            <CommitFeed commits={asset.commits.map((commit) => ({ ...commit, urlName: asset.name, urlSlug: asset.slug }))} compact />
          </SectionCard>

          <SectionCard title="Runtime" eyebrow="Protection and monitor">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-500">Protection</p>
                <p className="mt-2 text-white">Firewall: {asset.runtime.firewall}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-500">Monitor</p>
                <p className="mt-2 text-white">Observability: {asset.runtime.observability}</p>
              </div>
            </div>
          </SectionCard>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <SectionCard title="Security" eyebrow="Security gaps: static and dynamic">
            <div className="space-y-4">
              <div>
                <p className="mb-3 text-sm font-medium text-white">Static</p>
                <div className="space-y-3">
                  {asset.security.staticGaps.length ? asset.security.staticGaps.map((gap) => (
                    <div key={gap.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-white">{gap.title}</p>
                        <StatusBadge tone={severityTone(gap.severity)}>{gap.severity}</StatusBadge>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">Status: {gap.status}</p>
                    </div>
                  )) : <p className="text-sm text-slate-400">No static gaps detected.</p>}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-white">Dynamic</p>
                <div className="space-y-3">
                  {asset.security.dynamicGaps.length ? asset.security.dynamicGaps.map((gap) => (
                    <div key={gap.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-white">{gap.title}</p>
                        <StatusBadge tone={severityTone(gap.severity)}>{gap.severity}</StatusBadge>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">Status: {gap.status}</p>
                    </div>
                  )) : <p className="text-sm text-slate-400">No dynamic gaps detected.</p>}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="External asset" eyebrow="Hosted URL">
            <div className="rounded-[26px] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Live endpoint</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">{asset.url}</h3>
              <p className="mt-3 text-slate-300">This is the external asset currently created and hosted for the project. Operators can inspect its full delivery lineage from this page.</p>
            </div>
          </SectionCard>
        </section>
      </AppShell>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: urls.map((asset) => ({ params: { slug: asset.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const asset = getUrlBySlug(params.slug);

  return {
    props: {
      asset,
    },
  };
}
