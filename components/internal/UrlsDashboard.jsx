import AppShell from '@/components/internal/AppShell';
import SectionCard from '@/components/internal/SectionCard';
import StatCard from '@/components/internal/StatCard';
import UrlListCard from '@/components/internal/UrlListCard';
import { getCurrentUser, getSecuritySummary, getVisibleUrlsForUser } from '@/lib/internalProductData';

export default function UrlsDashboard() {
  const user = getCurrentUser();
  const visibleUrls = getVisibleUrlsForUser(user);
  const securitySummary = getSecuritySummary();

  return (
    <AppShell
      title="Hosted URL Command Center"
      subtitle="Track every external asset we deploy, inspect delivery posture, and drill into commit, SDLC, security, and runtime detail from a single internal workspace."
    >
      <section className="grid gap-4 lg:grid-cols-4">
        <StatCard label="Visible URLs" value={visibleUrls.length} hint="Scoped by RBAC project visibility" accent="from-cyan-300/50 to-blue-500/10" />
        <StatCard label="Healthy assets" value={securitySummary.healthy} hint="Production and staging endpoints in good standing" accent="from-emerald-300/50 to-emerald-600/10" />
        <StatCard label="Static gaps" value={securitySummary.staticCount} hint="Open findings from code and dependency scans" accent="from-amber-300/50 to-orange-500/10" />
        <StatCard label="Dynamic gaps" value={securitySummary.dynamicCount} hint="Runtime and traffic-surface findings needing attention" accent="from-rose-300/50 to-rose-600/10" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="External assets" eyebrow="Landing page" action={<span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">All hosted URLs</span>}>
          <div className="rounded-[26px] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-blue-500/5 to-transparent p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Hero</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">Operate deploys, security, and rollback readiness without leaving the product.</h3>
            <p className="mt-3 max-w-3xl text-slate-300">Every managed URL links to its own operational detail page. The admin user remains the master operator, and access is narrowed by role and project visibility.</p>
          </div>

          <div className="mt-5">
            <UrlListCard items={visibleUrls} />
          </div>
        </SectionCard>

        <SectionCard title="Admin posture" eyebrow="RBAC" action={<span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">Master admin enabled</span>}>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-medium text-white">Admin controls</p>
              <p className="mt-2 text-sm text-slate-400">Admins can add users, scope project visibility, grant committer access, and retain exclusive authority on top-level policy and rollback actions.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-medium text-white">Current operator</p>
              <p className="mt-2 text-lg font-semibold text-white">{user.name}</p>
              <p className="text-sm text-slate-400">{user.email}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-medium text-white">Project visibility</p>
              <p className="mt-2 text-sm text-slate-400">Strict RBAC is active. Users only see assigned projects unless they are admins.</p>
            </div>
          </div>
        </SectionCard>
      </section>
    </AppShell>
  );
}
