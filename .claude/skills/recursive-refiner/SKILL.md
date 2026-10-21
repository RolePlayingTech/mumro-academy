---
name: recursive-refiner
description: >-
  Recursive Agent Harnessing (Harness² Propose-Probe-Compose & Experience
  Reflector) inspired by Google Research (arXiv:2610.14224). Activate after a
  complex task, failed test loop, or new domain challenge to evolve the 8
  harness components (c1..c8) without bloating AGENTS.md.
---

# Recursive Harness Refiner (`Harness²` Protocol)

## 1. The 8 Editable Harness Components (`c1..c8` Surface)
Following Google Research's **Harness²** architecture (`google-research/harness2`, arXiv:2610.14224), an agent harness consists of 8 distinct editable components grouped by runtime role:
- **Context Construction:**
  - `c1: System Prompt` (`AGENTS.md` — keep `<80 lines` and `<8,000 chars`)
  - `c2: Guardrails` (Negative constraints, red lines & auto-trigger pointers)
  - `c3: Memory` (`HANDOFF.md` & `feature_list.json` persistent state)
  - `c6: Skills` (`.agents/skills/<name>/SKILL.md` — loaded on demand)
- **Tool Interface & Deterministic Helpers:**
  - `c4: Tool Guidance` (When and how to invoke CLI/MCP tools)
  - `c7: Deterministic Scripts` (`scripts/<name>.mjs` or `.py` — replace fragile prompt instructions with executable checks)
- **Delegation & Orchestration:**
  - `c5: Subagents` (`sub_agents/<name>/AGENT.md` — isolated context workers)
- **Middleware & Lifecycle Events:**
  - `c8: Hooks & Plugins` (`.codex/hooks.json` / `.claude/hooks.json` — `PreToolUse`, `PostToolUse`, `PreCompact`, `SessionStart`, `SubagentStop`, `Stop`)

## 2. Level 1: Task-Level Recursion (`Propose → Probe → Compose`)
When the agent struggles on an unfamiliar task or hits repeated friction:
1. **Separate Invariant (`INV`) vs. Domain (`DOM`) Gaps:**
   - **Invariant Edit (`INV`):** Task-agnostic reliability rules (e.g., "Always run `tsc --noEmit` before E2E", "Cap search output to 40 lines").
   - **Domain Edit (`DOM`):** Project-specific contracts (e.g., "In this repo, every `src/content/*.ts` export must pass `assertLocaleParity`").
2. **Propose Minimal Edits (Omitted-is-Inherited):**
   - Prefer creating or updating an on-demand `c6` Skill or a `c7` Deterministic Script (`scripts/`) over inflating `c1` (`AGENTS.md`).
3. **Probe & Compose:**
   - Test the updated skill/script on the current task, compare execution behavior before vs. after, and keep only changes backed by deterministic execution evidence.

## 3. Level 2: Harnessing-Level Recursion (`Experience Reflector`)
Before closing a complex session, run a 60-second **Experience Reflection**:
1. Did we waste tokens on a preventable error, missing script, or undocumented repo convention?
2. If YES, codify the lesson into `.agents/skills/<domain>/SKILL.md` or `scripts/`.
3. **Prevent "Dead-Weight Untriggered Skills":** Every skill in `.agents/skills/<name>/SKILL.md` MUST have an explicit trigger line in `AGENTS.md` (or run `npx github:RolePlayingTech/agent-harness-kit autotrigger .`), otherwise the agent will never know to load it.
4. Run `npx github:RolePlayingTech/agent-harness-kit verify . --strict` to confirm YAML validity, trigger coverage, and `<8,000 char` always-on budget compliance.
