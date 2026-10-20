---
name: testing-tradeoffs
description: >-
  Testing Depth vs. Context Window & Token Cost Trade-Off Advisor. Use when deciding
  how many tests an AI agent should write and execute, when terminal test logs are
  flooding the context window, or when balancing code reliability against token spend.
---

# Testing Depth vs. Context & Token Cost Advisor (`testing-tradeoffs`)

One of the biggest hidden traps in AI-assisted engineering is the **Testing vs. Context Paradox**:

* **If the agent tests too little:** You save tokens and move fast for the first hour, but silent regressions accumulate until the application breaks in production.
* **If the agent runs heavy, verbose test suites on every tiny edit:** A single Playwright, Jest, or Pytest run can dump **3,000 to 15,000 tokens of terminal logs, stack traces, and DOM snapshots** straight into your main context window. Within 5 edits, your context window crosses 60%, attention degrades, and API costs skyrocket.

---

## 1. The 4 Testing-vs-Context Profiles (Choose Consciously)

When setting up or tuning a project harness, discuss these 4 profiles with the user and record the chosen profile in `AGENTS.md`:

| Profile | What Runs During Edits | What Runs Before Completion | Main Context Impact | Total Token Spend | Defect Risk |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`fast-prototype`** | Fast static syntax/type check only (`tsc --noEmit` / `ruff`, <2s) | Manual smoke check or 1 happy-path test | **Minimal (~5%)** | **Lowest** | **High** (logic bugs possible) |
| **`smart-tiered`** *(Default)* | Silent typecheck + single changed test file (`--silent` / dot reporter) | Full unit + integration/E2E suite once before commit | **Low (~12–18%)** | **Optimal** | **Low** |
| **`isolated-verifier`** | Typecheck in main window; test suite delegated to a **Verifier Subagent** | Verifier Subagent + Fresh-Context Evaluator | **Ultra-Clean (~12%)** | **Medium-High** (subagent turns) | **Very Low** |
| **`mission-critical`** | Strict Red->Green TDD + schema validation on every step | Full suite + Fresh-Context Evaluator + Human `Prepare->Confirm` | **Medium (~25%)** | **Highest** | **Minimal** (Production-grade) |

---

## 2. How to Stop Test Logs From Eating Your Context Window

Regardless of which profile you choose, **never run raw, unfiltered verbose test commands inside an AI agent loop**. Wire these token-saving test wrappers into `AGENTS.md` and `package.json`:

### Rule A: Use Dot / Silent Reporters for Agent Runs
Instead of printing 200 lines of passing `[PASS] should render button...` output:
* **Playwright:** `npx playwright test --reporter=dot` or `--quiet`
* **Vitest / Jest:** `npx vitest run --reporter=dot --silent` (prints console logs only on failing tests!)
* **Pytest:** `pytest -q --tb=short --maxfail=3`
* **Cargo / Go:** `cargo test --quiet` / `go test ./...` (without `-v` unless debugging a specific failure)

### Rule B: Redirect Massive Logs to `/tmp` and Read Only Failures
If a build or test suite produces huge output, run:
```bash
npm test > /tmp/agent-test.log 2>&1 || tail -n 45 /tmp/agent-test.log
```
If the test passes (`exit 0`), **zero log lines** enter the context window! If it fails, only the last 45 lines containing the assertion error enter the context window.

### Rule C: Delegate Heavy Test Suites to a Verifier Subagent (`isolated-verifier`)
When a test suite takes >10 seconds or outputs large DOM/stack traces, spawn a subagent:
> *"Run `npx playwright test`, inspect any failing trace, and return ONLY: (1) pass/fail status, (2) exact failing file:line, and (3) a 5-line root-cause summary."*

---

## 3. When Should the Agent Write New Tests vs. Skip Writing Tests?

Guide the user to set an explicit **Test Authoring Policy** in `AGENTS.md`:

1. **Always write/update a test when:** fixing a reproducible bug (regression test), changing business/billing/auth logic, or modifying data contracts/schemas.
2. **Do NOT waste tokens writing brittle unit tests for:** pure cosmetic CSS tweaks, static copy changes, or trivial framework boilerplate already covered by TypeScript types or E2E smoke tests.
