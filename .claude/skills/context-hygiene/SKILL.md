---
name: context-hygiene
description: >-
  Context Window Management, Token Conservation & Subagent Isolation Protocol.
  Activate when planning multi-file refactors, investigating unfamiliar codebases,
  approaching 50% context capacity, or preparing a multi-session handoff.
---

# Context Hygiene & Token Optimization Protocol (`context-hygiene`)

> **Core Law of Context Engineering:** The context window is high-speed working RAM (a desk), not a hard drive (a filing cabinet). Once context utilization crosses **55–60%**, attention degrades (*Context Rot* / *Lost in the Middle*), instruction adherence drops, and token costs multiply on every turn.

---

## 1. The 4 Pillars of Context Conservation

### Pillar A: Progressive Disclosure (Load Just-In-Time)
* Do **not** preload documentation, schemas, or unrelated source files "just in case".
* Read only the specific line ranges (`StartLine`–`EndLine`) needed for the active change.
* Use `grep` / symbol search to locate exact definitions before reading files.

### Pillar B: Subagent Isolation (The Scout Pattern)
When a task requires inspecting more than **3–4 files** or analyzing long terminal/test logs:
1. **Spawn an isolated Research/Scout Subagent.**
2. Give the subagent a narrow, explicit prompt:
   > *"Locate where `<symbol/flow>` is implemented and tested. Return ONLY: (1) exact file paths and line ranges, (2) a 5-bullet architectural summary, and (3) any edge cases. Do not return raw file dumps."*
3. The subagent burns 30,000+ tokens in its disposable window and returns **~200 tokens** of pure signal to your main context.

### Pillar C: Filesystem-as-Memory (Offload State to Disk)
Never rely on conversation history to remember a 10-step plan or debugging findings:
* Write active task state to a structured file (`TODO.md` or `feature_list.json`).
* After completing each step, update the file on disk and commit atomically.

### Pillar D: Proactive Compaction & Session Handoff
When switching from **Research/Planning** to **Implementation**, or when context exceeds **60%**:
1. Write a concise state snapshot to `HANDOFF.md` or `TODO.md`:
   * **Goal & Current Status**
   * **Files Modified & Verified**
   * **Exact Next Step & Command to Run**
2. Trigger `/compact` (or advise the user to start a fresh session grounded in `HANDOFF.md`).

---

## 2. Anti-Patterns to Eliminate Immediately

| Anti-Pattern | Token Cost | Fix in Harness |
| :--- | :--- | :--- |
| Dumping whole 1,000-line files into context | Very High (`+8,000 tokens/file`) | Search with `grep` first, then read 60-line windows |
| Running verbose CLI commands without filtering | High (`+5,000 tokens/log`) | Use `--quiet`, `--reporter=dot`, or tail the failing stack trace |
| Keeping a 1,500-line `AGENTS.md` / `CLAUDE.md` | Permanent tax on *every* turn | Keep root `AGENTS.md` < 65 lines; move details to `SKILL.md` |
| Debugging 5 unrelated bugs in one marathon chat | Context rot + hallucinations | `1 Task = 1 Session` with clean git commits between sessions |
