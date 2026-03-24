import Head from 'next/head';
import AppShell from '@/components/internal/AppShell';
import PermissionMatrix from '@/components/internal/PermissionMatrix';
import SectionCard from '@/components/internal/SectionCard';
import StatusBadge from '@/components/internal/StatusBadge';
import { roleDefinitions, users } from '@/lib/internalProductData';

export default function UsersPage() {
  return (
    <>
      <Head>
        <title>Users | Control Tower</title>
        <meta name="description" content="User management and RBAC controls." />
      </Head>
      <AppShell title="Users and RBAC" subtitle="The admin user is the master operator and can add users, scope visibility by project, and grant role-specific capabilities such as commit access or policy management.">
        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <SectionCard title="User roster" eyebrow="Access control" action={<button className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">Add user</button>}>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge tone={user.role === 'admin' ? 'info' : 'neutral'}>{roleDefinitions[user.role].label}</StatusBadge>
                      <StatusBadge tone={user.status === 'active' ? 'success' : 'warning'}>{user.status}</StatusBadge>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">Visible projects: {user.projects.join(', ')}</p>
                  <p className="mt-1 text-sm text-slate-500">Last active: {user.lastActive}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Permission matrix" eyebrow="Strict RBAC">
            <PermissionMatrix users={users} />
          </SectionCard>
        </section>
      </AppShell>
    </>
  );
}
