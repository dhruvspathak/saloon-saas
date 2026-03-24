export default function SectionCard({ title, eyebrow, action, children, className = '' }) {
  return (
    <section className={`rounded-[28px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur ${className}`.trim()}>
      <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p> : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h2>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
