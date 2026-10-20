---
name: context-hygiene
description: >-
  Context Window Management, Configurable Policies & 7 Real-World Context Crisis Playbooks.
  Activate when planning multi-file refactors, onboarding legacy repos, handling failing test
  loops, switching tools, or preparing multi-session handoffs.
---

# Context Hygiene & 7 Real-World Scenarios (`context-hygiene`)

> **Core Principle:** The context window is working RAM (a desk), not persistent storage. However, token-saving rules must be **configurable and honest about trade-offs**—for example, delegating to a subagent saves *main-context RAM* so your primary agent stays sharp, while still consuming *total tokens* inside the subagent's window.

---

## 1. Configurable Context Policies (`minimal` | `balanced` | `deep-research` | `low-cost`)

Choose the policy that matches your task and budget:

* **`minimal`:** Root `AGENTS.md` <= 60 lines; delegate exploration when >3 files; max 2 repair retries.
* **`balanced` (Default):** Root `AGENTS.md` <= 80 lines; delegate exploration when >4 files; max 3 repair retries.
* **`deep-research`:** Root `AGENTS.md` <= 100 lines; allows reading up to 6 related files directly when tracing tight cross-file types.
* **`low-cost`:** Minimizes *total* API bill by avoiding subagent spawns; uses local `grep` + narrow 40-line `read_file` windows in the main thread.

---

## 2. Seven Real-World Context Playbooks (How to Handle Every Situation)

### Scenario 1: Onboarding a Huge Unfamiliar Repo (Brownfield Cartography)
* **Problem:** Reading 40 files to understand the project fills the context window before you write a single line of code.
* **Playbook:** Run `node bin/agent-harness.mjs inspect .` first. If deeper exploration is needed, dispatch one Scout Subagent to write a persistent `docs/ARCHITECTURE.md` map on disk. Future sessions read the 60-line map instead of re-scanning 40 files.

### Scenario 2: The "Infinite Repair Loop" on a Failing Test (Token Burn)
* **Problem:** A test fails, the agent tries 7 hasty edits in a row, pasting 500 lines of stack traces each time until context rots.
* **Playbook (3-Strike Circuit Breaker):** After **2 failed attempts**, stop guessing and re-read the exact error contract. After **3 failed attempts**, halt execution, write the diagnosis to `HANDOFF.md`, and ask the human user for guidance.

### Scenario 3: Terminal / Build Log Flood
* **Problem:** Verbose CLI output (`npm test`, `docker build`, Playwright traces) dumps 10,000 tokens of noise into chat.
* **Playbook:** Always use quiet/dot flags (`--reporter=dot`, `--silent`, `pytest -q`) or redirect stdout to a temporary file (`cmd > /tmp/out.log 2>&1 || tail -n 40 /tmp/out.log`) so passing runs cost **0 log tokens**.

### Scenario 4: When to Read Whole Files vs. Targeted Line Ranges
* **Playbook:**
  * **Read the whole file** when the file is small (<180 lines) and you are refactoring its structure, or when it is a core schema contract (`contracts.ts`, `schema.prisma`).
  * **Read targeted line ranges (`StartLine`–`EndLine`)** after locating the symbol with `grep` when working in large files (>250 lines).

### Scenario 5: When NOT to Spawn a Subagent (Main Context vs. Total Cost)
* **Playbook:** Do **not** spawn a subagent to check 1 or 2 files—spawning a subagent adds startup latency and pays the system prompt overhead twice. Use a subagent only when:
  1. Searching across **>4 files** where raw file dumps would pollute the main desk, OR
  2. Running an independent **Fresh-Context Evaluator** review of a complex `git diff`.

### Scenario 6: Multi-Session Feature Handoff (Graceful Compaction Fallback)
* **Problem:** Not all environments support `/compact`, and auto-compaction can drop subtle architectural constraints.
* **Playbook:** Before ending a long session or switching tasks, update `feature_list.json` and write a concise `HANDOFF.md` containing: (1) last verified git commit hash, (2) files modified, (3) verification commands run + exit codes, and (4) the single next step. Start the next session with: *"Read `AGENTS.md` and `HANDOFF.md` and continue."*

### Scenario 7: Multi-Tool Teams (Claude Code + Cursor + Antigravity + Codex)
* **Problem:** Copying a 300-line prompt into `AGENTS.md`, `CLAUDE.md`, and `.cursorrules` causes instruction drift within a week.
* **Playbook:** Keep **one** canonical `AGENTS.md` (<80 lines) + `.agents/skills/`, and make `CLAUDE.md` and `.cursor/rules/00-harness-core.mdc` 10-line thin pointers referencing `AGENTS.md`.
