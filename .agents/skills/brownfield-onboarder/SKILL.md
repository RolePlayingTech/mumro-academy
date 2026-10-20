---
name: brownfield-onboarder
description: >-
  Brownfield Repository Reconnaissance, Architecture-Drift Auditor & Non-Destructive
  Harness Onboarder (Path B). Use when introducing an AI harness to an existing codebase
  or auditing why AI agents are struggling in a mature repository.
---

# Brownfield Auto-Discovery & Safe Adoption (`brownfield-onboarder`)

When onboarding an existing repository, **assess the codebase as it actually is before asking the user a single question**. Never ask the user to manually type facts that are already declared in `package.json`, `pyproject.toml`, `Cargo.toml`, `tsconfig.json`, or `.github/workflows/`.

---

## Phase 1: Bounded Read-Only Reconnaissance

Run `node bin/agent-harness.mjs inspect .` (or inspect manifests directly using targeted reads—never dump whole source directories into context):

1. **Stack & Topology:** Detect languages, frameworks, package manager, and whether the repo is a single package or monorepo (`workspaces`, `pnpm-workspace.yaml`, `turbo.json`).
2. **Existing Quality Sensors:** Extract exact scripts for typechecking, linting, unit tests, E2E tests, and builds.
3. **Sensitive Boundaries:** Locate database schemas/migrations (`prisma/`, `drizzle/`, `migrations/`, `alembic/`), auth modules, and deployment scripts (`deploy/`, `Dockerfile`, `.github/workflows/`).
4. **Existing AI Configuration & Drift:** Check if `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.cursor/rules/`, or `.agents/skills/` already exist. Check if any paths or npm scripts referenced inside them are stale or missing!

---

## Phase 2: Present the Grounded Assessment Report

Present your findings to the user separated into three honest categories:

* **1. Verified Repo Facts (with exact file paths):**
  *Example:* `"Detected Astro 5 + TypeScript + Playwright E2E (package.json, playwright.config.ts). Build command: npm run build."`
* **2. Detected Risks, Gaps & Context Traps:**
  *Example:* `"Existing CLAUDE.md is 420 lines (~2,800 tokens injected on every turn), and references npm run lint which does not exist in package.json."`
* **3. High-Impact Questions for Discussion (Only What Code Cannot Tell Us):**
  Ask 2–3 targeted questions with clear options:
  * **Testing vs. Context Strategy:** *"Your repo has Playwright E2E tests (which take ~10s and output verbose logs) plus TypeScript. Should the agent run only silent typechecks during edits and E2E at the end (`smart-tiered`), or delegate test runs to an isolated subagent (`isolated-verifier`)?"*
  * **Legacy Debt & Off-Limits Zones:** *"Are there deprecated folders or fragile legacy modules the agent should never refactor without asking?"*
  * **Approval Gates:** *"Which operations require an explicit `Prepare -> Confirm` pause?"*

---

## Phase 3: Non-Destructive Adoption Plan (`inspect -> recommend -> confirm -> apply`)

1. **Preserve Existing Conventions:** Never wipe out a user's existing `AGENTS.md`, `CLAUDE.md`, or custom skills.
2. **Propose a Minimal Delta:**
   * If an existing `CLAUDE.md` or `AGENTS.md` is bloated (>80 lines), propose extracting domain-specific sections into `.agents/skills/<topic>/SKILL.md` while keeping the root file as a compact routing map.
   * Run `node bin/agent-harness.mjs init . --dry-run` first to show exactly which files will be created or skipped.
3. **Verify:** Run `node scripts/verify-harness.mjs` to confirm zero broken references and valid skill schemas.
