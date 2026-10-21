# Decisions

Durable agreements for this project, newest first. Read before changing architecture, conventions or dependencies. Remove entries that no longer apply; a wrong entry is worse than a missing one.

Entry format: a heading `## YYYY-MM-DD: decision`, then one to three lines on why.

## 2026-10-21: Agent harness adopted
Rigor standard, memory handoff, agents cursor, claude. The reasoning for each part is printed by `npx agent-harness explain`; the decisions themselves live in `.harness/spec.json`.
Replaces the v2 harness: seven generic skills copied to `.agents/skills` and `.claude/skills` (Cursor listed them twice) and `scripts/verify-harness.mjs`, whose 80-line limit was not grounded in any source. `agent-harness check --strict` runs in CI instead.
Skills live only in `.claude/skills`, which Cursor and Claude Code both read. Codex would read `AGENTS.md` but not these skills; add `codex` to `agents` if it becomes a regular tool here.
The kit is a devDependency pinned to a commit, so `npx agent-harness` runs the same version locally and in CI. Bump the pin deliberately and review the `build --dry-run` diff.
