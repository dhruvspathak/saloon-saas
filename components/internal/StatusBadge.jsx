export default function StatusBadge({ tone = 'neutral', children }) {
  const tones = {
    success: 'bg-emerald-500/15 text-emerald-200 ring-1 ring-inset ring-emerald-400/30',
    warning: 'bg-amber-500/15 text-amber-200 ring-1 ring-inset ring-amber-400/30',
    danger: 'bg-rose-500/15 text-rose-200 ring-1 ring-inset ring-rose-400/30',
    info: 'bg-cyan-500/15 text-cyan-200 ring-1 ring-inset ring-cyan-400/30',
    neutral: 'bg-white/10 text-slate-200 ring-1 ring-inset ring-white/10',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone] || tones.neutral}`}>
      {children}
    </span>
  );
}
