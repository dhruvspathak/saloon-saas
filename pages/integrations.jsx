import Head from 'next/head';
import AppShell from '@/components/internal/AppShell';
import SectionCard from '@/components/internal/SectionCard';
import StatusBadge from '@/components/internal/StatusBadge';
import { integrations } from '@/lib/internalProductData';

function toneFor(status) {
  if (status === 'connected') return 'success';
  if (status === 'attention') return 'warning';
  return 'neutral';
}

export default function IntegrationsPage() {
  return (
    <>
      <Head>
        <title>Integrations | Control Tower</title>
        <meta name="description" content="Connected developer systems for the platform." />
      </Head>
      <AppShell title="Integrations" subtitle="Source control, deployment, tickets, observability, and security systems are connected here so each URL detail page can carry full SDLC context.">
        <SectionCard title="Connected systems" eyebrow="Integration health">
          <div className="grid gap-4 lg:grid-cols-2">
            {integrations.map((integration) => (
              <div key={integration.name} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{integration.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{integration.name}</h3>
                  </div>
                  <StatusBadge tone={toneFor(integration.status)}>{integration.status}</StatusBadge>
                </div>
                <p className="mt-4 text-slate-300">{integration.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </AppShell>
    </>
  );
}
