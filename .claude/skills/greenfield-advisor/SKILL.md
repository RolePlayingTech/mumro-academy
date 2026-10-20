---
name: greenfield-advisor
description: >-
  Greenfield Product Discovery, MVP Scoper & Technology Stack Advisor (Path A).
  Use when starting a brand-new project in an empty repository or when a user has an
  application idea and wants guidance choosing the right architecture, stack, MVP scope,
  and durable project blueprint (PROJECT_BRIEF, ARCHITECTURE, ADR, ROADMAP, feature_list.json).
---

# Greenfield Discovery & Technology Stack Advisor (`greenfield-advisor`)

When a user starts a new project, they often begin with an **idea**, not a `package.json`. Do not force them to pick frameworks before exploring the problem space and comparing trade-offs.

---

## Phase 1: Idea -> Requirements -> Realistic MVP

Guide a natural, step-by-step conversation (ask 1–2 high-value questions at a time; allow the user to say "I don't know, recommend for me"):

1. **Core Problem & User Journey:**
   *Who is the user, what painful problem are they solving, and what does the single "happy path" look like from start to finish?*
2. **Constraints & Operational Reality:**
   *Is this a solo prototype, an internal company tool, or a public commercial SaaS? What are the budget, timeline, and privacy/compliance constraints?*
3. **Propose 2–3 MVP Shapes:**
   Help the user avoid over-engineering by contrasting:
   * **Shape 1: Weekend Validation MVP** (Core flow only, local/SQLite or static storage, zero auth boilerplate if single-user).
   * **Shape 2: Production V1 Monolith (Recommended)** (Clean modular monolith, auth, managed DB, automated smoke E2E tests).
   * **Shape 3: Scale-Ready Distributed Stack** (Only if hard realtime, heavy ML worker queues, or strict multi-tenant isolation is required on day 1).

---

## Phase 2: Technology Stack Advisor (Compare, Don't Dictate)

Derive 2–3 candidate stacks from the user's requirements and compare them across **5 concrete dimensions**:

| Dimension | Why It Matters for Humans & AI Agents |
| :--- | :--- |
| **1. Initial Complexity** | How many moving parts (containers, build steps, services) must run locally? |
| **2. AI Repo Legibility** | Does the stack have strict static types (TypeScript/Zod, Pydantic, Rust) and colocated files so AI agents don't hallucinate contracts? |
| **3. Verification Speed** | Can typechecks and unit tests run in <3 seconds inside the agent's self-healing loop? |
| **4. Operational & Hosting Cost** | Can it run on a $5 VPS / static edge, or does it require expensive managed clusters? |
| **5. Growth & Escape Hatch** | How easy is it to migrate later if traffic grows 10x? |

> **Rule of Simplicity:** Always tell the user explicitly when a **simple monolith or static site** is sufficient. Never recommend microservices for a new MVP unless there is a proven hardware/runtime boundary (e.g., Node.js web UI + heavy GPU Python worker).

---

## Phase 3: Generate the Durable Project Blueprint

Once the user confirms the MVP scope, stack, and testing profile, generate a clean, reviewable bundle (using progressive disclosure—only create files that serve the project):

1. `docs/PROJECT_BRIEF.md` — Confirmed problem statement, target users, in-scope MVP features, explicit non-goals, and open assumptions.
2. `docs/ARCHITECTURE.md` & `docs/adr/0001-stack-decision.md` — Component boundaries, data model sketch, chosen stack, and why alternative stacks were rejected.
3. `docs/ROADMAP.md` & `feature_list.json` — Phased milestones where **every single unimplemented task starts at `"status": "pending"`** (never pre-check tasks as `"passed"` or `"verified"`!) with an explicit `verificationCommand`.
4. `AGENTS.md` (<80 lines) + `HANDOFF.md` — The operational harness map ready for the first coding session.
