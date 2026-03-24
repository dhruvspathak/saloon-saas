export default function StatCard({ label, value, hint, accent = 'from-cyan-400/40 to-blue-500/10' }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div className={`mb-4 h-1.5 w-20 rounded-full bg-gradient-to-r ${accent}`} />
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-400">{hint}</p> : null}
    </div>
  );
}
