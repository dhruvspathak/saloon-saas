# Control Tower

Internal dashboard for a collaborative AI coding SaaS.

This repo currently ships a new internal product surface for:

- URLs
- Users
- Integrations
- Commits
- Policies
- Settings

It also still contains older legacy routes from the previous salon/multi-tenant website product. Those legacy routes still build, but they are not the main product direction anymore.

## What you get

The current homepage is the internal Control Tower.

Main screens:

- `/` or `/urls` - hosted URL dashboard
- `/urls/[slug]` - URL details with overview, rollback, commits, SDLC, security, and runtime
- `/users` - user roster and RBAC matrix
- `/integrations` - connected systems overview
- `/commits` - commit history feed
- `/policies` - governance and security policies
- `/settings` - platform defaults and approval posture

## Tech stack

- Next.js 15
- React 18
- Tailwind CSS
- Supabase client libraries
- Vercel Analytics and Speed Insights

## Requirements

- Node.js 18+
- npm

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

On PowerShell systems where `npm.ps1` is blocked, use:

```bash
npm.cmd run lint
npm.cmd run build
```

## Environment

The new Control Tower pages currently use in-repo mock data from `lib/internalProductData.js`, so they do not require any environment variables to render.

Some legacy routes and APIs still expect Supabase and internal API keys.

Example variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
INTERNAL_API_KEY=your-secret-key
NEXT_PUBLIC_INTERNAL_ACCESS_KEY=optional-client-key
```

## Project structure

```text
components/internal/    Reusable Control Tower UI
lib/internalProductData.js  Mock data for URLs, users, RBAC, commits, policies
pages/index.jsx         Main dashboard entry
pages/urls/             URL listing and detail pages
pages/users.jsx         User and RBAC view
pages/integrations.jsx  Integration view
pages/commits.jsx       Commit feed
pages/policies.jsx      Policy view
pages/settings.jsx      Settings view
```

## Current status

- The new internal dashboard routes lint cleanly.
- Production build succeeds.
- Legacy salon routes are still present in the repo.
- The README now reflects the current product direction instead of the old salon positioning.

## Notes

This codebase is in transition.

The new product direction is the internal Control Tower for a collaborative AI coding SaaS, while older salon/site-generator code remains until it is retired or migrated.
