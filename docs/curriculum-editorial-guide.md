# MUMRO Academy — curriculum and editorial standard

## Purpose

Make the reader more capable at a real job. MUMRO is a credible **implementation example**, not a prerequisite or the answer to every exercise. Lessons must be useful with a notebook, a spreadsheet, code, or the reader's existing tools.

A good lesson changes what someone can **decide, make, verify or safely operate**. Product exposure comes from showing genuine, bounded examples, not from making the content read like a feature catalog.

## Diagnosis (main branch, 2026-10-26)

- The four existing *tracks* are reasonable topic groupings, but the flat 01–15 sequence blends two audiences: brand/content professionals (01–09) and AI/software engineers (10–15). Lessons 13–15 switch to coding-agent harnesses, MCP product interfaces and Playwright browser verification without warning that the learner is changing specialization.
- “Latest additions” prominently features the newest developer content regardless of a newcomer's goal. A visitor needs an **entry point by role** before a chronology of releases.
- Key takeaways, rich case studies, labs, and checklists are strengths. Yet the old curriculum does not say what *artifact* each lesson should produce, which knowledge is helpful beforehand, or how one lesson builds a portfolio toward a clear outcome.
- The previous homepage claim that everything taught in the Academy exists natively in MUMRO overstates the relationship: open-source coding-agent techniques are portable and not all a core product feature.
- The flat previous/next pagination is catalog order, not a curriculum dependency. Treat the two separately.

## Navigation model

- **Track** = subject area, e.g. brand systems, distribution, SEO, agents. Keep existing track IDs, numbered lessons, canonical slugs, bilingual routes and cross-links.
- **Journey / guided route** = deliberately ordered cross-track recommendation for a learner's role. Lessons can appear in more than one journey. A journey is not another category or a mandate to finish every earlier numbered lesson.
- **Prerequisite** = a helpful concept to review (not a hard paywall or forced order). It is allowed to start directly.
- **Practice/evidence** = one task and one inspectable output in *every* lesson. A checklist about awareness is not a substitute for an output someone else could review.

| Journey | Current sequence | Learner outcome |
| --- | --- | --- |
| Brand & content strategy | 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 | Strategy-to-evidence-to-publishing loop with a measurable revision |
| AI agents for content operations | 03 → 10 → 11 → 12 → 14 | Source-aware agents, explicit approval and bounded mutation policy |
| AI product & coding-agent engineering | 13 → 10 → 14 → 11 → 12 → 15 → 16 | Harness, MCP tool surface, authorization/refusal contract, browser verification and multi-agent Git workflow |

Journeys intentionally overlap. The first journey goes deep on brand/content outcomes; the second and third use different entry points into the agent material. Lesson 14 can be useful in both, despite different motivations.

The source of truth is `src/content/learning-journeys.ts`. When adding a canonical lesson, put it in at least one route and provide EN/PL objective, assignment, evidence and prerequisites. That module verifies canonical coverage, uniqueness within each route and bilingual order. Do not scatter manually numbered sequences across unrelated UI components.

## Content design for new and revised lessons

Use this editorial checklist, **in both EN and PL**:

1. **Target reader & promise:** whom the lesson is for, what it enables, and what it does *not* cover.
2. **Entry knowledge:** 0–3 useful prerequisites, linking to actual existing lessons; no forced prerequisite that is absent from the corresponding route.
3. **Concrete problem:** a credible scenario and the cost of getting it wrong; avoid buzzword-only introductions.
4. **How it works:** explain the mental model before tool commands; distinguish established standards from implementation choices.
5. **Worked example:** show input → method → output, then a failure case. Mark synthetic data and simulations explicitly.
6. **Independent assignment:** something the reader can do without opening MUMRO, with a clear artifact and review criteria.
7. **Evidence:** link primary sources for volatile or numeric technical claims; give version/date where behavior changes and state uncertainty. Do not imply a hypothetical demo verifies production authorization.
8. **MUMRO in practice:** a short, clearly labeled example after the neutral method; link to a real feature only when there is a verified correspondence. The learner can skip it without losing the lesson.

Tone: calm, specific and direct. Minimize jargon (especially hybrid PL/EN jargon), avoid absolute performance claims and guarantees, and explain terms on first use. The English and Polish editions should have equivalent substance, not just identical array structure.

## Review rubric for an editor

Score each lesson 0–2 for **goal clarity, factual/evidence quality, runnable example, transferable practical output, clear prerequisites, and brand restraint** (12 points possible). A lesson below 9 should be revised before featuring it as a recommended starting point. This is an editorial heuristic, not a fact about learning outcomes.

## Follow-on work (not silently bundled into this PR)

1. **Fact-check and copy-edit 01–15.** Revisit unsupported blanket claims (for instance fixed lifetimes of social posts), remove product-first language where it substitutes for teaching, and verify each linked technical resource and external feature assertion.
2. **Add an actual worked answer + rubric to each new practice assignment.** The current per-lesson tasks set the target, but do not pretend the old sections already provide graded solutions.
3. **Tame jargon & variation in depth.** Consolidate recurring “source → draft → approve” explanations through cross-links; give short primers before deep OAuth/MCP/Harness material.
4. **Plan incoming lessons deliberately.** Lesson 15 (Playwright/browser verification) and Lesson 16 (Git/multi-agent workflows) are now part of the engineering journey with explicit prerequisites and portfolio outputs in both locales and tests.
5. **Avoid hard-coded counts.** The existing README and some copy fields still have static counts even though other counters are dynamic. Before merging more lessons, migrate remaining static counts to count-aware rendering.

## Release safeguards

- Keep `assertLocaleParity`, existing lesson slugs, tests and SEO route contracts intact.
- The user should review educational paths and MUMRO copy separately from future content-level revisions.
- Validate with `npm run check && npm run build && npm test` before merging. A connected GitHub edit cannot by itself stand in for local Astro/Playwright checks.
