# Decisions

Durable agreements for this project, newest first. Read before changing architecture, conventions or dependencies. Remove entries that no longer apply; a wrong entry is worse than a missing one.

Entry format: a heading `## YYYY-MM-DD: decision`, then one to three lines on why.

## 2026-10-23: Lesson 16 companion is git-agent-workflow-kit
Lesson 16 (Git & GitHub workflows for AI coding agents) pairs with `RolePlayingTech/git-agent-workflow-kit`: a zero-dependency Node CLI (`git-agent doctor`, `pr-ready`, `recovery-plan`, `skills`, `sandbox`) and five portable Agent Skills (`SKILL.md`).
Like `agent-harness-kit` and `mcp-surface-kit`, `git-agent-workflow-kit` is pinned to a commit in `devDependencies` (`github:RolePlayingTech/git-agent-workflow-kit#6de9ae662cdb596c2c3853b8b7886049af62ffb2`) so `tests/academy.spec.ts` unconditionally executes the real `git-agent` CLI and real `git` commands against Lesson 16's Lab A and Lab B sandboxes locally and in CI.

## 2026-10-22: Ecosystem tools and dynamic homepage counters
Homepage sections for Latest Additions (`#latest-lessons`) and Open-Source Tools (`#open-source-tools`) live in `src/content/tools.ts` with `assertLocaleParity`. Lesson metadata (number, title, reading time) and track/catalog counts are derived from source arrays and formatted via `formatTrackLessonsHeading` / `formatTrackBadgeCount` in `src/lib/contracts.ts`.

## 2026-10-22: Lesson 14 companion is mcp-surface-kit
Lesson 14 (MCP, tools, skills) needed a checkable product-side spec, the way Lesson 13 uses agent-harness-kit for the coding harness. The companion lives in `RolePlayingTech/mcp-surface-kit`: a Node CLI with no dependencies that explains, checks and generates SKILL.md from `.mcp-surface/spec.json`.
Like `agent-harness-kit`, `mcp-surface-kit` is pinned to a commit in `devDependencies` (`github:RolePlayingTech/mcp-surface-kit#5575474301a8095e99148d0acede35744364678a`) so `tests/academy.spec.ts` unconditionally runs the real `mcp-surface` CLI (`check --strict` and `build`) against Lesson 14's exported mini-lab fixtures locally and in CI.

## 2026-10-21: Agent harness adopted
Rigor standard, memory handoff, agents cursor, claude. The reasoning for each part is printed by `npx agent-harness explain`; the decisions themselves live in `.harness/spec.json`.
Replaces the v2 harness: seven generic skills copied to `.agents/skills` and `.claude/skills` (Cursor listed them twice) and `scripts/verify-harness.mjs`, whose 80-line limit was not grounded in any source. `agent-harness check --strict` runs in CI instead.
Skills live only in `.claude/skills`, which Cursor and Claude Code both read. Codex would read `AGENTS.md` but not these skills; add `codex` to `agents` if it becomes a regular tool here.
The kit is a devDependency pinned to a commit, so `npx agent-harness` runs the same version locally and in CI. Bump the pin deliberately and review the `build --dry-run` diff.
