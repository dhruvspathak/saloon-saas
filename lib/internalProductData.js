const currentUserId = 'user-admin';

export const roleDefinitions = {
  admin: {
    label: 'Admin',
    description: 'Full access across projects, users, policies, and deployments.',
    permissions: ['manage_users', 'manage_projects', 'manage_policies', 'manage_integrations', 'approve_rollbacks', 'view_all_projects'],
  },
  manager: {
    label: 'Manager',
    description: 'Operational owner with visibility and change coordination rights.',
    permissions: ['manage_projects', 'view_assigned_projects', 'approve_rollbacks', 'manage_commits'],
  },
  committer: {
    label: 'Committer',
    description: 'Can ship code and manage commit workflows on assigned projects.',
    permissions: ['view_assigned_projects', 'create_commits', 'deploy_changes'],
  },
  viewer: {
    label: 'Viewer',
    description: 'Read-only access to assigned projects and runtime status.',
    permissions: ['view_assigned_projects'],
  },
};

export const users = [
  {
    id: 'user-admin',
    name: 'Priya Nair',
    email: 'priya@collabcode.ai',
    role: 'admin',
    status: 'active',
    lastActive: '5 mins ago',
    projects: ['flowdesk-app', 'pulse-api', 'nebula-console'],
  },
  {
    id: 'user-committer',
    name: 'Arjun Rao',
    email: 'arjun@collabcode.ai',
    role: 'committer',
    status: 'active',
    lastActive: '18 mins ago',
    projects: ['flowdesk-app', 'pulse-api'],
  },
  {
    id: 'user-manager',
    name: 'Sara Khan',
    email: 'sara@collabcode.ai',
    role: 'manager',
    status: 'active',
    lastActive: '42 mins ago',
    projects: ['flowdesk-app', 'nebula-console'],
  },
  {
    id: 'user-viewer',
    name: 'Rohan Das',
    email: 'rohan@collabcode.ai',
    role: 'viewer',
    status: 'invited',
    lastActive: 'Invite pending',
    projects: ['nebula-console'],
  },
];

export const integrations = [
  { name: 'GitHub', status: 'connected', detail: '4 repositories synced', category: 'Source Control' },
  { name: 'Vercel', status: 'connected', detail: '3 production targets linked', category: 'Deployments' },
  { name: 'Jira', status: 'connected', detail: '2 delivery boards indexed', category: 'Tickets' },
  { name: 'Datadog', status: 'attention', detail: 'Alert webhook retries detected', category: 'Observability' },
  { name: 'Snyk', status: 'connected', detail: 'Static scans running on pull requests', category: 'Security' },
];

export const policies = [
  {
    name: 'Production rollback gate',
    owner: 'Platform',
    status: 'enforced',
    description: 'Only managers and admins can execute instant rollback on production URLs.',
  },
  {
    name: 'Commit signer verification',
    owner: 'Security',
    status: 'enforced',
    description: 'All committers must use verified identities before deployment is allowed.',
  },
  {
    name: 'Critical CVE deployment block',
    owner: 'Security',
    status: 'monitoring',
    description: 'New critical findings trigger a release hold until triage is complete.',
  },
];

export const urls = [
  {
    slug: 'flowdesk-app',
    name: 'Flowdesk App',
    url: 'https://app.flowdesk.dev',
    environment: 'Production',
    project: 'Flowdesk',
    health: 'healthy',
    score: 98,
    uptime: '99.98%',
    region: 'ap-south-1',
    latency: '162 ms',
    framework: 'Next.js',
    owner: 'Sara Khan',
    repo: 'github.com/collabcode/flowdesk-web',
    deployment: 'vercel://flowdesk-app',
    ticket: 'JIRA-FLOW-218',
    alert: 'datadog://flowdesk-prod',
    cicd: 'github-actions://flowdesk-web/deploy',
    metadata: {
      branch: 'main',
      commit: '8fd31b7',
      releasedAt: '2026-03-24 09:10 IST',
      lastRollback: '2026-03-16 18:42 IST',
      ownerTeam: 'Growth Apps',
      aiPolicy: 'protected-production',
    },
    commits: [
      {
        sha: '8fd31b7',
        title: 'ship ai review summary cards',
        author: 'Arjun Rao',
        timestamp: '15 minutes ago',
        status: 'deployed',
        ticket: 'JIRA-FLOW-218',
      },
      {
        sha: '91ad53e',
        title: 'tighten runtime policy for edge api routes',
        author: 'Priya Nair',
        timestamp: '4 hours ago',
        status: 'approved',
        ticket: 'SEC-403',
      },
      {
        sha: '6602cab',
        title: 'rollback analytics banner regression',
        author: 'Sara Khan',
        timestamp: '8 days ago',
        status: 'rolled_back',
        ticket: 'OPS-117',
      },
    ],
    security: {
      staticGaps: [
        { severity: 'medium', title: 'Outdated dependency in markdown renderer', status: 'triaged' },
        { severity: 'low', title: 'Missing CSP nonce on legacy preview route', status: 'open' },
      ],
      dynamicGaps: [
        { severity: 'high', title: 'Authenticated route rate limit could be bypassed', status: 'mitigating' },
      ],
    },
    runtime: {
      firewall: 'Adaptive rules enabled',
      observability: 'Logs, traces, and deploy correlation healthy',
      incidents: 1,
      activeMonitors: 14,
    },
  },
  {
    slug: 'pulse-api',
    name: 'Pulse API',
    url: 'https://api.pulse.dev',
    environment: 'Production',
    project: 'Pulse',
    health: 'warning',
    score: 84,
    uptime: '99.52%',
    region: 'eu-west-1',
    latency: '246 ms',
    framework: 'Node API',
    owner: 'Arjun Rao',
    repo: 'github.com/collabcode/pulse-api',
    deployment: 'railway://pulse-api',
    ticket: 'JIRA-PULSE-77',
    alert: 'datadog://pulse-api-prod',
    cicd: 'github-actions://pulse-api/release',
    metadata: {
      branch: 'release',
      commit: '14be882',
      releasedAt: '2026-03-23 22:25 IST',
      lastRollback: '2026-02-21 12:09 IST',
      ownerTeam: 'Platform APIs',
      aiPolicy: 'strict-runtime-approval',
    },
    commits: [
      {
        sha: '14be882',
        title: 'reduce webhook retry timeout in ingestion worker',
        author: 'Arjun Rao',
        timestamp: '11 hours ago',
        status: 'deployed',
        ticket: 'JIRA-PULSE-77',
      },
      {
        sha: 'cc88214',
        title: 'add commit metadata enrichment for audit feed',
        author: 'Priya Nair',
        timestamp: '2 days ago',
        status: 'approved',
        ticket: 'OPS-189',
      },
    ],
    security: {
      staticGaps: [
        { severity: 'high', title: 'Secret-like token pattern detected in old fixture', status: 'open' },
      ],
      dynamicGaps: [
        { severity: 'medium', title: 'Burst traffic causes elevated 429s on auth callback', status: 'investigating' },
      ],
    },
    runtime: {
      firewall: 'Managed WAF enabled',
      observability: 'Error budget burn above target',
      incidents: 3,
      activeMonitors: 9,
    },
  },
  {
    slug: 'nebula-console',
    name: 'Nebula Console',
    url: 'https://console.nebula.dev',
    environment: 'Staging',
    project: 'Nebula',
    health: 'healthy',
    score: 92,
    uptime: '99.91%',
    region: 'us-east-1',
    latency: '188 ms',
    framework: 'Next.js',
    owner: 'Sara Khan',
    repo: 'github.com/collabcode/nebula-console',
    deployment: 'vercel://nebula-console',
    ticket: 'JIRA-NEB-102',
    alert: 'datadog://nebula-staging',
    cicd: 'github-actions://nebula-console/staging',
    metadata: {
      branch: 'staging',
      commit: 'ab18c22',
      releasedAt: '2026-03-24 07:45 IST',
      lastRollback: 'Never',
      ownerTeam: 'Internal Tools',
      aiPolicy: 'standard-review',
    },
    commits: [
      {
        sha: 'ab18c22',
        title: 'improve sidebar visibility for rbac-restricted modules',
        author: 'Sara Khan',
        timestamp: '2 hours ago',
        status: 'deployed',
        ticket: 'JIRA-NEB-102',
      },
      {
        sha: 'f57e101',
        title: 'wire runtime monitor panel to new status feed',
        author: 'Rohan Das',
        timestamp: '1 day ago',
        status: 'review',
        ticket: 'JIRA-NEB-95',
      },
    ],
    security: {
      staticGaps: [],
      dynamicGaps: [
        { severity: 'low', title: 'Session timeout warning toast appears late under load', status: 'open' },
      ],
    },
    runtime: {
      firewall: 'Preview firewall rules enabled',
      observability: 'Healthy traces and deployment markers',
      incidents: 0,
      activeMonitors: 6,
    },
  },
];

export function getCurrentUser() {
  return users.find((user) => user.id === currentUserId) || users[0];
}

export function getUrlBySlug(slug) {
  return urls.find((item) => item.slug === slug) || null;
}

export function getVisibleUrlsForUser(user = getCurrentUser()) {
  if (!user) return [];

  if (user.role === 'admin') {
    return urls;
  }

  return urls.filter((item) => user.projects.includes(item.slug));
}

export function getSidebarItems() {
  return [
    { key: 'urls', label: 'URLs', href: '/', description: 'Managed environments and rollbacks' },
    { key: 'users', label: 'Users', href: '/users', description: 'Team access and RBAC controls' },
    { key: 'integrations', label: 'Integrations', href: '/integrations', description: 'Connected developer systems' },
    { key: 'commits', label: 'Commits', href: '/commits', description: 'Deployment and change lineage' },
    { key: 'policies', label: 'Policies', href: '/policies', description: 'Security and AI governance' },
    { key: 'settings', label: 'Settings', href: '/settings', description: 'Workspace and platform settings' },
  ];
}

export function getRecentCommits() {
  return urls.flatMap((item) =>
    item.commits.map((commit) => ({
      ...commit,
      urlName: item.name,
      urlSlug: item.slug,
      environment: item.environment,
    }))
  );
}

export function getSecuritySummary() {
  return urls.reduce(
    (summary, item) => {
      summary.staticCount += item.security.staticGaps.length;
      summary.dynamicCount += item.security.dynamicGaps.length;

      if (item.health === 'healthy') summary.healthy += 1;
      if (item.health === 'warning') summary.warning += 1;
      if (item.health === 'critical') summary.critical += 1;

      return summary;
    },
    { staticCount: 0, dynamicCount: 0, healthy: 0, warning: 0, critical: 0 }
  );
}
