---
name: verification-loop
description: >-
  Deterministic Self-Healing Loop & Fresh-Context Evaluator Protocol (Default-FAIL contract).
  Activate before declaring any coding, refactoring, or content generation task complete.
---

# Deterministic Verification & Evaluator Loop (`verification-loop`)

Based on Anthropic's *Effective harnesses for long-running agents* and OpenAI's *Harness Engineering*, an AI agent must never grade its own homework using subjective confidence.

---

## 1. The Default-FAIL Contract

Every acceptance criterion starts in a **`FAIL`** state. A criterion only transitions to **`PASS`** when backed by deterministic execution evidence:

1. **Static & Type Sensor:** Compiler / typechecker exits with `0` (`tsc --noEmit`, `pyright`, `cargo check`).
2. **Style & Contract Sensor:** Linter and schema/parity checks exit with `0`.
3. **Behavioral Sensor:** Automated unit/integration/E2E tests covering the changed code exit with `0`.
4. **Harness Budget Sensor:** `node scripts/verify-harness.mjs` exits with `0`.

---

## 2. The Self-Healing Loop (Reason → Act → Observe → Fix)

If any sensor returns a non-zero exit code:
1. **Read the exact error output** (file, line number, assertion failure).
2. **Fix the root cause**—never silence the sensor (do not delete assertions, add `@ts-ignore`, or skip tests).
3. **Re-run the sensor** until all checks pass cleanly.

---

## 3. Fresh-Context Evaluator Pattern (For Complex Features)

When completing a major feature or multi-file change, avoid "generator bias" (where the agent that wrote the code overlooks its own edge cases):

1. Spawn a **Fresh-Context Evaluator Subagent** (read-only / test-runner role).
2. Pass the evaluator ONLY:
   * The original user requirements / specification.
   * The `git diff` of the changes.
   * Instructions to verify every requirement under the **Default-FAIL** contract.
3. Address all findings reported by the evaluator before presenting the final result to the user.
