import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowUpRight, FiCode, FiGitCommit, FiLink2, FiLock, FiSettings, FiUsers } from 'react-icons/fi';
import { getCurrentUser, getSidebarItems, roleDefinitions } from '@/lib/internalProductData';
import StatusBadge from '@/components/internal/StatusBadge';

const iconMap = {
  urls: FiLink2,
  users: FiUsers,
  integrations: FiArrowUpRight,
  commits: FiGitCommit,
  policies: FiLock,
  settings: FiSettings,
};

export default function AppShell({ title, subtitle, children }) {
  const router = useRouter();
  const user = getCurrentUser();
  const role = roleDefinitions[user.role];
  const sidebarItems = getSidebarItems();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_42%,_#111827_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-slate-950/60 px-5 py-6 backdrop-blur lg:min-h-screen lg:w-[310px] lg:border-b-0 lg:border-r">
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-slate-900 to-slate-950 p-5 shadow-2xl shadow-cyan-950/20">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Collaborative AI Coding SaaS</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Control Tower</h1>
            <p className="mt-3 text-sm text-slate-300">Internal command center for hosted URLs, deploy health, commit lineage, and strict RBAC.</p>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
              <StatusBadge tone="info">{role.label}</StatusBadge>
            </div>
            <p className="mt-3 text-sm text-slate-400">{role.description}</p>
          </div>

          <nav className="mt-6 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = iconMap[item.key] || FiCode;
              const isActive = router.pathname === item.href || (item.key === 'urls' && (router.pathname === '/' || router.pathname.startsWith('/urls')));

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`group flex items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                    isActive
                      ? 'border-cyan-400/30 bg-cyan-400/10 text-white'
                      : 'border-transparent bg-white/[0.03] text-slate-300 hover:border-white/10 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className={`mt-0.5 rounded-xl p-2 ${isActive ? 'bg-cyan-400/15 text-cyan-200' : 'bg-white/5 text-slate-400 group-hover:text-slate-200'}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="mt-1 block text-xs text-slate-400">{item.description}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <header className="mb-6 rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-6 shadow-2xl shadow-slate-950/20 backdrop-blur">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Internal Assets</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">{title}</h2>
                {subtitle ? <p className="mt-3 max-w-3xl text-base text-slate-300">{subtitle}</p> : null}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Visibility</p>
                  <p className="mt-2 text-lg font-semibold text-white">Project scoped</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Current role</p>
                  <p className="mt-2 text-lg font-semibold text-white">{role.label}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Policy mode</p>
                  <p className="mt-2 text-lg font-semibold text-white">Strict RBAC</p>
                </div>
              </div>
            </div>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
