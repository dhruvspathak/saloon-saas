import Head from 'next/head';
import AppShell from '@/components/internal/AppShell';
import SectionCard from '@/components/internal/SectionCard';
import StatusBadge from '@/components/internal/StatusBadge';
import { policies } from '@/lib/internalProductData';

function toneFor(status) {
  if (status === 'enforced') return 'success';
  if (status === 'monitoring') return 'warning';
  return 'neutral';
}

export default function PoliciesPage() {
  return (
    <>
      <Head>
        <title>Policies | Control Tower</title>
        <meta name="description" content="Security and AI governance policies." />
      </Head>
      <AppShell title="Policies" subtitle="Operational governance is explicit: deployments, rollback authority, identity verification, and security holds are all enforced through policy rather than convention.">
        <SectionCard title="Policy library" eyebrow="Governance">
          <div className="space-y-4">
            {policies.map((policy) => (
              <div key={policy.name} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{policy.name}</p>
                    <p className="mt-1 text-sm text-slate-500">Owned by {policy.owner}</p>
                  </div>
                  <StatusBadge tone={toneFor(policy.status)}>{policy.status}</StatusBadge>
                </div>
                <p className="mt-4 text-slate-300">{policy.description}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </AppShell>
    </>
  );
}
