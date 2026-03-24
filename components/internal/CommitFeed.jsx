import Link from 'next/link';
import StatusBadge from '@/components/internal/StatusBadge';

function commitTone(status) {
  if (status === 'deployed') return 'success';
  if (status === 'rolled_back') return 'danger';
  if (status === 'review') return 'warning';
  return 'info';
}

export default function CommitFeed({ commits, compact = false }) {
  return (
    <div className="space-y-3">
      {commits.map((commit) => (
        <div key={`${commit.urlSlug || commit.sha}-${commit.sha}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-white">{commit.title}</p>
                <StatusBadge tone={commitTone(commit.status)}>{commit.status}</StatusBadge>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                <span className="font-mono text-slate-300">{commit.sha}</span> by {commit.author}{commit.timestamp ? ` - ${commit.timestamp}` : ''}
              </p>
              {commit.ticket ? <p className="mt-1 text-sm text-slate-500">Ticket: {commit.ticket}</p> : null}
            </div>
            {!compact && commit.urlName ? (
              <Link href={`/urls/${commit.urlSlug}`} className="text-sm text-cyan-200 hover:text-cyan-100">
                {commit.urlName}
              </Link>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
