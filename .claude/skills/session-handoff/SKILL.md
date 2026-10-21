---
name: session-handoff
description: Resume and hand off work that spans several sessions, using docs/agent/handoff.md. Use at the start of a session that continues earlier work, and before ending a session that leaves work unfinished.
---

# Session handoff

## When you start
1. Read `docs/agent/handoff.md`. If it has no content under its fields, there is nothing to resume.
2. Check it against the repository: `git log --oneline -10` and `git status`. If the note and git disagree, trust git and tell the user what differs.
3. Re-run the last check the note mentions before building on it.

## When you stop with work unfinished
Overwrite `docs/agent/handoff.md` (do not append) with:
- the goal, in one sentence;
- what is done, with commit hashes, and any uncommitted changes by file;
- the checks you ran and their results, including failures;
- the single next step;
- questions only the user can answer.

Keep it under 30 lines. Decisions that should outlast the task belong in `docs/agent/decisions.md`, not here. When the work is finished, clear the fields.
