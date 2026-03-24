import Link from 'next/link';
import StatusBadge from '@/components/internal/StatusBadge';

function healthTone(health) {
  if (health === 'healthy') return 'success';
  if (health === 'warning') return 'warning';
  return 'danger';
}

export default function UrlListCard({ items }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/urls/${item.slug}`}
          className="group rounded-[28px] border border-white/10 bg-slate-950/60 p-5 shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-950/80"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{item.environment}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.url}</p>
            </div>
            <StatusBadge tone={healthTone(item.health)}>{item.health}</StatusBadge>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Health score</p>
              <p className="mt-2 text-xl font-semibold text-white">{item.score}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Latency</p>
              <p className="mt-2 text-xl font-semibold text-white">{item.latency}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:col-span-2 xl:col-span-1">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Owner</p>
              <p className="mt-2 text-xl font-semibold text-white">{item.owner}</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
            <span>{item.project} project</span>
            <span className="text-cyan-200 transition group-hover:text-cyan-100">View details</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
