import { roleDefinitions } from '@/lib/internalProductData';
import StatusBadge from '@/components/internal/StatusBadge';

export default function PermissionMatrix({ users }) {
  const permissions = [
    'view_assigned_projects',
    'view_all_projects',
    'create_commits',
    'deploy_changes',
    'approve_rollbacks',
    'manage_users',
    'manage_policies',
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-3 text-left">
        <thead>
          <tr className="text-xs uppercase tracking-[0.25em] text-slate-500">
            <th className="px-3 pb-1">User</th>
            <th className="px-3 pb-1">Role</th>
            {permissions.map((permission) => (
              <th key={permission} className="px-3 pb-1">{permission.replaceAll('_', ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const granted = roleDefinitions[user.role]?.permissions || [];
            return (
              <tr key={user.id} className="rounded-2xl bg-white/[0.03] text-sm text-slate-300">
                <td className="rounded-l-2xl border-y border-l border-white/10 px-3 py-3">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-slate-500">{user.email}</p>
                </td>
                <td className="border-y border-white/10 px-3 py-3">
                  <StatusBadge tone={user.role === 'admin' ? 'info' : 'neutral'}>{roleDefinitions[user.role]?.label || user.role}</StatusBadge>
                </td>
                {permissions.map((permission, index) => (
                  <td key={permission} className={`border-y border-white/10 px-3 py-3 ${index === permissions.length - 1 ? 'rounded-r-2xl border-r' : ''}`}>
                    <span className={granted.includes(permission) ? 'text-emerald-300' : 'text-slate-600'}>
                      {granted.includes(permission) ? 'Allowed' : 'Restricted'}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
