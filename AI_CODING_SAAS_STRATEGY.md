# Collaborative AI Coding SaaS Strategy

## Why this document exists

This repository started as a multi-tenant website generation platform for local businesses. We have now decided to evolve it into a much larger product: a **Collaborative AI Coding SaaS**.

The goal of this document is to define:

- what product we are building
- what parts of the current codebase are still useful
- what must be replaced
- the architecture we should grow toward
- a practical execution sequence so we do not rewrite blindly

## Product vision

We are building a SaaS where teams can collaborate with AI agents to:

- create and manage coding workspaces
- chat with AI about their codebase
- generate, edit, and review code
- run tasks in parallel through specialized agents
- track conversations, diffs, and decisions
- safely apply changes, test them, and ship them

This should feel like a mix of:

- collaborative IDE
- agent orchestration layer
- repo-aware chat
- execution sandbox
- SaaS admin and billing product

## Core product pillars

### 1. Collaborative workspaces

Users belong to organizations and projects. Each project has:

- members and roles
- one or more repositories
- shared chat threads
- agent runs
- task history
- file changes and diffs

### 2. AI coding agents

Agents should be able to:

- read code
- answer questions about architecture
- propose plans
- modify files
- run commands
- execute tests
- open pull-request style change summaries

Over time we can support multiple agent roles such as:

- planner
- coder
- reviewer
- debugger
- docs writer

### 3. Safe execution

Every serious AI coding product needs controlled execution:

- sandboxed terminal commands
- scoped file access
- audit logs
- approval flows for risky actions
- secrets management
- environment isolation

### 4. Team collaboration

This product is not just single-player chat. It needs:

- shared threads
- presence and activity history
- comments on outputs and diffs
- approval workflows
- task assignment
- reusable prompts and agent presets

### 5. Commercial SaaS foundation

To become a real company product, we need:

- authentication
- organization and workspace management
- subscriptions and usage tracking
- rate limits and quotas
- observability
- onboarding flows
- admin tooling

## What the current repo gives us

The current codebase is not the right product yet, but it does contain useful patterns.

### Keep and reuse

- **Next.js foundation**: the app shell and deployment shape are still useful
- **Multi-tenant thinking**: the existing `sites` concept can inspire `organizations`, `projects`, and `workspaces`
- **Supabase integration**: good starting point for auth, relational data, storage, and realtime
- **Internal tooling mindset**: `/internal/create-site` shows we already think in operator workflows
- **Configuration-driven assembly**: useful for agent presets, workspace templates, and product flags

### Replace or phase out

- industry-specific modules
- salon-specific page rendering
- business website sections and layouts
- local-business SEO/data model
- lead capture flows as a product core

These can remain temporarily during transition, but they should not shape the future architecture.

## Recommended product architecture

## Application layers

### 1. Presentation layer

Main surfaces:

- marketing site
- authenticated product app
- workspace dashboard
- project/repository view
- chat and agent run interface
- diff/review interface
- settings, billing, and admin pages

### 2. Product API layer

Key domains:

- auth
- organizations
- projects
- repositories
- conversations
- agent runs
- file operations
- command executions
- usage metering
- billing

### 3. Agent orchestration layer

Responsibilities:

- choose model/agent profile
- construct prompts with repo context
- stream responses
- manage tool permissions
- store execution traces
- coordinate multi-agent runs

### 4. Execution layer

Responsibilities:

- provision sandboxed workspaces
- mount repository state
- execute commands
- collect logs
- enforce limits
- return artifacts such as patches, diffs, test results, and summaries

### 5. Data layer

Suggested core tables or entities:

- `organizations`
- `organization_members`
- `projects`
- `project_members`
- `repositories`
- `workspace_sessions`
- `conversations`
- `messages`
- `agent_runs`
- `agent_steps`
- `file_changes`
- `command_runs`
- `artifacts`
- `subscriptions`
- `usage_events`

## Suggested first-principles domain model

### Organization

The top-level customer account.

### Project

A team-owned software initiative inside an organization.

### Repository

A connected codebase or synced source snapshot.

### Workspace session

A live environment where a user and agents collaborate on a code task.

### Conversation

A persistent thread tied to a project or session.

### Agent run

A bounded execution of an agent against a task with tools, logs, status, and artifacts.

## Product roadmap

## Phase 0: Reframe the repo

Goal: stop treating this repo like a salon product.

Actions:

- introduce a new product identity and naming
- document the new domain model
- isolate or archive industry-specific modules
- define a migration path for current pages

## Phase 1: SaaS skeleton

Goal: establish the product shell.

Build:

- auth
- org/project creation
- dashboard shell
- protected app routes
- project settings
- basic billing placeholder

Suggested deliverable:

- a user can sign in, create an organization, create a project, and land in an empty collaborative workspace

## Phase 2: Repo-aware chat MVP

Goal: deliver the first real product value.

Build:

- project chat UI
- message persistence
- repo/file index
- AI responses with project context
- streaming assistant output

Suggested deliverable:

- a team can ask questions about a codebase and receive grounded answers in a shared thread

## Phase 3: File edits and diffs

Goal: move from chat to action.

Build:

- file explorer
- editable artifacts/patches
- diff viewer
- apply/reject workflow
- audit log of AI changes

Suggested deliverable:

- the agent can suggest and apply code changes inside a managed workspace with clear review visibility

## Phase 4: Command execution and tests

Goal: turn the product into a real coding environment.

Build:

- sandbox runner
- command logs
- test execution UI
- retry/approval system for risky actions

Suggested deliverable:

- the agent can run commands and tests, then report outcomes back in the thread

## Phase 5: Multi-agent collaboration

Goal: differentiate the product.

Build:

- role-based agents
- delegated subtasks
- parallel runs
- mergeable outputs
- run coordination timeline

Suggested deliverable:

- users can assign planning, coding, and review tasks to multiple agents within the same project

## Phase 6: Team and commercial scale

Goal: become a durable SaaS business.

Build:

- usage metering
- billing integration
- seat management
- enterprise controls
- analytics
- support tooling

## Technical recommendations

### Frontend

- keep using Next.js
- move toward App Router if we want cleaner product/app separation
- create a dedicated `/app` product area
- retire page structures tied to salon/site generation

### Backend

- keep Supabase initially for auth, Postgres, storage, and realtime
- add a server-side orchestration layer for agent runs
- keep product APIs cleanly separated from UI pages

### Execution

Start simple:

- begin with controlled server-side tools and limited repo snapshots
- move later to isolated sandbox containers per workspace/session

Do not begin with fully open shell access for every user and workspace.

### Realtime collaboration

Potential uses for Supabase realtime:

- shared chat updates
- agent run status
- collaborative presence
- diff/review notifications

## What we should build next in this repo

The most sensible next implementation sequence is:

1. Add a product shell for authenticated SaaS pages
2. Introduce new core entities: organizations, projects, conversations
3. Build a shared chat workspace UI
4. Add persistent AI conversation storage
5. Add repository/workspace attachment model
6. Add controlled file-edit and diff workflows

## What we should not do next

To keep momentum, we should avoid:

- polishing salon templates further
- adding more industries/themes/layouts
- deepening lead-gen workflows
- overbuilding billing before we have core product value
- attempting full autonomous coding before safe review and execution primitives exist

## Immediate repo transition plan

### Short term

- keep the existing app runnable
- add new product docs and architecture docs
- create a new authenticated app section for the AI SaaS
- build new database schema alongside current tables

### Medium term

- migrate navigation and homepage toward the new product
- reduce visibility of legacy salon routes
- stop expanding legacy domain models

### Long term

- remove or archive salon-specific modules once the new SaaS core is stable

## Definition of success

We are on the right track when a user can:

- create an account
- create a collaborative project
- connect or upload a repository
- ask AI repo-aware questions
- receive code changes with diffs
- approve and apply those changes
- see teammates and agents working in the same project history

## Decision

This repository should now be treated as a **transitioning platform**, not a salon website product with extra features.

We are not starting from zero, but we should be honest: this is a **strategic pivot with selective reuse**, not a simple feature expansion.
