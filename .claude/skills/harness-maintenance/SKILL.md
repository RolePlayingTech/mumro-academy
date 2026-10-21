---
name: harness-maintenance
description: Change how the agent works in this repository by editing .harness/spec.json and rebuilding, instead of editing generated instructions. Use when the user asks to change rules, commands, approvals or verification depth, or when the same mistake or misunderstanding has happened twice.
---

# Maintain the agent harness

AGENTS.md and these skills are generated from `.harness/spec.json` by agent-harness-kit 3.0.0. A hand edit inside a generated region is reported as a conflict on the next build, so change the spec, not the output.

## When to propose a change
- The user corrects the same behavior a second time.
- A command in AGENTS.md is wrong, slow or missing.
- A rule never applies, or the code contradicts it.

## How
1. Name the problem and the smallest change that would have prevented it. Prefer, in this order: fixing a command; a one-line project rule; an ask-before entry; a new skill (only for a multi-step procedure).
2. Show the user the proposed edit to `.harness/spec.json` and wait for agreement.
3. Apply it, run `npx agent-harness build --dry-run` and show the diff.
4. After the user agrees, run `npx agent-harness build`, then `npx agent-harness check`.
5. Removing a rule that no longer earns its place is as useful as adding one: the always-loaded instructions are read in every session.

## Spec fields
- `verification.fast`, `verification.full`, `verification.e2e`: a command, or null.
- `verification.rigor`: `light`, `standard` or `strict`.
- `rules`: one-line project rules.
- `approvals`: ids (`push`, `deploy`, `destructive`, `dependencies`, `migrations`, `secrets`, `ci`, `infra`, `payments`, `auth`) or custom sentences.
- `memory`: `none`, `decisions` or `handoff`.
- `overrides`: force a module on or off (`verify-change`, `quiet-output`, `exploration`, `workspace-scope`, `risk-areas`, `harness-maintenance`).

`npx agent-harness explain` prints why each part of the harness exists and what it costs.
