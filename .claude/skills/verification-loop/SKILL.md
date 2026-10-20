---
name: verification-loop
description: >-
  Deterministic Acceptance Gates, Bounded Repair Loops (3-Strike Circuit Breaker),
  Fresh-Context Evaluator & Human Approval Gates (Prepare -> Confirm). Activate
  before marking any task complete or executing risky operations.
---

# Deterministic Verification & Safety Loop (`verification-loop`)

> **Important Distinction:** Markdown instructions guide agent behavior, while CLI scripts (`node scripts/verify-harness.mjs`, CI pipelines, OS permissions) provide hard enforcement. Never claim a task is `verified` based on subjective confidence.

---

## 1. Honest Task States & Evidence Contract

Every task in `feature_list.json` (or your active plan) must use one of five explicit states:

* **`pending`** — Not yet started (all tasks in templates and new roadmaps MUST start here).
* **`in_progress`** — Currently being implemented.
* **`blocked`** — Waiting on human decision, missing credentials, or external dependency.
* **`failed`** — Verification command returned a non-zero exit code.
* **`verified`** — All required deterministic sensors returned exit code `0` **and** `verificationEvidence` (command run + exit code + summary) is recorded.

> **Never conflate "no test exists" with `verified`.** If no automated test exists for a requirement, either write a test or report the verification state honestly as `SKIPPED_NO_TEST` / `manual_review_required`.

---

## 2. The Bounded Self-Healing Loop (3-Strike Circuit Breaker)

When running verification commands (`typecheck`, `lint`, `test`, `build`, `verify-harness.mjs`):

1. **Attempt 1:** Read the exact compiler/test failure (`file:line`), fix the root cause, and re-run the failing check.
2. **Attempt 2:** If it fails again, stop making incremental guesses. Re-read the surrounding contract/types and test assumptions.
3. **Attempt 3 (Circuit Breaker Limit):** If the check still fails after 3 attempts (or the configured `maxRepairAttempts`), **STOP IMMEDIATELY**. Do not enter an infinite token-burning loop. Revert broken experimental edits, summarize the exact error and what was tried, and ask the user for a decision.

---

## 3. Fresh-Context Evaluator Pass (When Supported)

For major features or multi-file refactors:
* If your environment supports subagents (e.g., Antigravity `invoke_subagent` or Claude Code subagents), spawn a read-only **Evaluator Subagent** in a clean context window. Give it only the user requirements and `git diff` to check for missed edge cases.
* If your environment does **not** support subagents, perform an explicit self-audit against the acceptance checklist in `docs/PROJECT_BRIEF.md` or `feature_list.json` and show the command outputs to the user.

---

## 4. Four-Tier Security & Human Approval Model (`Prepare -> Confirm`)

Classify every action into one of four security tiers:

1. **Tier 1 — Read-Only (Always Safe):** Inspecting files, running `agent-harness inspect/audit/verify`, searching code.
2. **Tier 2 — Local Non-Destructive Writes:** Creating new files, editing feature code on a working branch, running `--dry-run`.
3. **Tier 3 — Risky Local Actions (Pause & Preview):** Overwriting existing customized configuration (`--force`), deleting files/tests, upgrading major dependencies.
4. **Tier 4 — Remote / Destructive / Production Actions (Mandatory `Prepare -> Confirm`):** Pushing to `main`, running destructive DB migrations, deploying to production servers (e.g., SSH/Hetzner), publishing live content, or accessing secrets. Always show the exact command, target, and impact preview and wait for explicit human confirmation.
