# AGENTS.md — MUMRO Academy Workspace Harness & Operational Map

## 1. Project Identity & Stack
- **System:** MUMRO Academy (`academy.mumro.io`) — Bilingual (EN/PL) open handbook & interactive learning studio.
- **Stack:** TypeScript, Astro 5 (static output), Playwright E2E, Node.js 22.
- **Key Paths:** `src/content/` (EN/PL data with `assertLocaleParity`), `src/components/` (Astro UI & labs), `scripts/verify-build.mjs`, `tests/academy.spec.ts`.

## 2. Deterministic Verification Loop (Mandatory Before Completing Any Task)
1. **Static Build & SEO/Schema Contract Verification:** `npm run build`
2. **Playwright Bilingual & Interactive E2E Suite:** `npx playwright test`
3. **Harness Context Budget Audit:** `node scripts/verify-harness.mjs`

## 3. Context Hygiene & Subagent Rules
- **60% Context Ceiling:** Treat context window as working RAM; read targeted line ranges instead of whole files.
- **Scout Subagents:** Delegate >4-file exploration to an isolated `research` subagent; require a <250-word synthesis with exact file/line references.
- **Locale Symmetry:** Every change in `src/content/*.ts` must maintain 1:1 structural parity between `en` and `pl`.

## 4. Progressive Disclosure Map (Load Just-In-Time)
- Interactive Harness Architect → `.agents/skills/harness-architect/SKILL.md`
- Token saving & subagent isolation → `.agents/skills/context-hygiene/SKILL.md`
- Default-FAIL verification & evaluator loop → `.agents/skills/verification-loop/SKILL.md`

## 5. Hard Guardrails (Red Lines — Require Human Confirmation)
- NEVER bypass `assertLocaleParity`, `scripts/verify-build.mjs`, or Playwright E2E assertions.
- NEVER bloat `AGENTS.md` or `CLAUDE.md` above 80 lines.
