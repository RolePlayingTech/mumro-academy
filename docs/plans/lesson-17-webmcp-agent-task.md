# Agent task packet — Implement Academy Lesson 17 (WebMCP)

Task status: READY FOR IMPLEMENTATION AFTER READING THE SPEC. This packet is meant to be handed verbatim to an AI coding agent.

Primary specification (READ IN FULL):
https://github.com/RolePlayingTech/mumro-academy/blob/docs/lesson-17-webmcp-implementation-plan/docs/plans/lesson-17-webmcp.md

Academy repository:
https://github.com/RolePlayingTech/mumro-academy

Editorial guide:
https://github.com/RolePlayingTech/mumro-academy/blob/main/docs/curriculum-editorial-guide.md

Related teaching content:
- Lesson 10: MCP for marketing/content systems
- Lesson 11: two-phase commitment for AI agents
- Lesson 12: autonomy guardrails
- Lesson 14: MCP Tools and Skills
- Lesson 15: Playwright/browser automation
- Lesson 16: Git/GitHub for coding agents

## 1. MISSION (PL)

Jesteś agentem programistycznym odpowiedzialnym za przygotowanie **gotowej do review** Lekcji 17 Akademii Mumro o WebMCP.

Pracujesz w repozytorium **RolePlayingTech/mumro-academy**. Masz przygotować nową lekcję zgodną z aktualnym formatem serwisu Astro, dwie równoważne językowo wersje PL/EN, praktyczne, działające laboratorium offline na danych fikcyjnych, zadanie do samodzielnej pracy, przykładowe odpowiedzi, testy i dokumentację. Efektem ma być **osobny PR** do gałęzi main.

**Nie merguj PR, nie wdrażaj na produkcję, nie modyfikuj repozytorium RolePlayingTech/mumro.** Nie publikuj realnych postów, nie integruj laboratorium z produkcyjnym API, nie używaj sekretów ani realnych danych klientów.

Nie twórz niepotrzebnych nowych issue ani duplikatów. Ten dokument i powiązane zadanie GitHub są źródłem wymagań. W razie problemów: zgłoś jasno ograniczenia, zachowaj bezpieczny zakres, nie blokuj pracy z powodu drobnych niedookreśleń.

## 2. ORDER OF WORK (small, verifiable steps)

STEP 0 — RECONNAISSANCE (before code)
- Checkout latest main and inspect open PRs, especially PR #35, and curriculum follow-up issue #31. Respect concurrently touched files.
- Read AGENTS.md, CLAUDE.md, docs/curriculum-editorial-guide.md, src/lib/contracts.ts, src/content/lessons-types.ts, src/content/lessons.ts, src/content/lessons-track3-4.ts, src/content/learning-journeys.ts, src/components/LessonPage.astro, src/components/LessonLab.astro, src/pages/llms-full.txt.ts, package.json and relevant tests.
- Read complete primary specification linked above. Summarize (locally or in PR body) exactly which existing contracts must be respected.
- Read current official WebMCP specification and Chrome docs. Note revision/date; if syntax/rollout changed after 2026-10-27 update examples accordingly and cite source.
- Create a dedicated feature branch **feat/academy-lesson-17-webmcp** (or isolated agent worktree). Do not work on main or the docs-plan branch.
- Inspect existing canonical lesson count and last slug before editing; do not assume a previous agent left the same repo state.

STEP 1 — CONTENT FIRST (commit independently)
- New file: src/content/lesson-webmcp.ts
- Export: webmcpLesson = assertLocaleParity({ en, pl }, "webmcpLesson") with typed LessonData.
- Full equivalent EN and PL versions, number LESSON 17 / LEKCJA 17, same canonical slug webmcp-agent-operable-web-applications and agents-mcp-governance trackId.
- Use the existing LessonData structure, not a new content architecture. Cover 7 sections specified in the primary spec; include substantive paragraphs, comparison table, real failure example, Mumro case study, practical task and checklist.
- Intro should be natural editorial prose; explain the problem first, not buzzwords. No repetitive generic AI phrases, unsupported quantifications or exaggerated product promises.
- Every version must be genuinely readable, including the technically accurate discussion of experimental support and API differences.
- Add official resources under section.resources or current supported equivalent, ensuring rendered links and llms-full serialization are maintained.
- Explain that WebMCP is not yet a W3C Recommendation/Standard. Keep 2026-10-20 spec date and current Chrome documentation dates correctly attributed.
- Explain Imperative API document.modelContext.registerTool, getTools and executeTool; Chrome experimental Declarative API with toolname/tooldescription/toolparamdescription (not falsely treated as normative in the same Community Group draft).
- Explain MCP vs WebMCP vs DOM/Playwright, scope and status, GEO vs page-level discovery.
- Include explicit distinction: **Existing in Mumro: server-side gateway. Proposed: browser WebMCP adapter.** Source refs: app/agent_gateway/server.py, frontend/src/pages/QueuePage.tsx, frontend/package.json. DO NOT assert a production WebMCP deployment.
- Make assignment achievable without Mumro and include a worked solution and rubric (/10).

STEP 2 — CANONICAL REGISTRATION
- Append WebMCP slug to src/lib/contracts.ts lessonSlugs WITHOUT modifying any existing canonical slugs.
- Add imports and bilingual lesson records in src/content/lessons-track3-4.ts after lesson 16; verify en/pl arrays are identical in order.
- Add to a relevant learning journey (prefer agent-engineering), update EN/PL practice contracts with objective, assignment, inspectable evidence, and 0-3 sensible prerequisites already inside the route.
- Review slugs, routes, previous/next links, homepage cards, counts, section navigation, metadata, sitemap, RSS and llms.txt. Fix only directly affected hardcoded values.
- Preserve editorial distinction: learner journey order is not a hard prerequisite paywall.

STEP 3 — SELF-CONTAINED LAB
- Implement standalone example as static public/labs/webmcp-lab-17.html or other location consistent with existing site routing; document URL.
- Include accessible normal HTML filters and a table. Fixture: DEMO-001 linkedin scheduled 2026-11-05 09:00; DEMO-002 x scheduled 2026-11-05 12:30; DEMO-003 linkedin draft; DEMO-004 facebook scheduled 2026-11-06 08:00; DEMO-005 linkedin scheduled 2026-11-06 10:00.
- Implement two Imperative tools only:
  A. get_publication_queue — read-only platform+status filtering with strict enum and runtime validation, returns JSON string and demo:true.
  B. preview_available_slot — returns fictitious suggestion 2026-11-09 09:00, reserved:false, and NEVER mutates.
- Register only when document.modelContext exists. Manage lifecycle appropriately. Browser without WebMCP must still show usable manual UI and a truthful experimental-support note, without throwing.
- Present optional in-page inspector using getTools/executeTool if compatible; **DO NOT MISLABEL the inspector as a real AI agent**.
- Dynamic content rendered using textContent, not unsanitized HTML. No external API requests; no trackers; no user identity, secrets, local storage of tokens or real Mumro operations.
- Incorporate security example with malicious text as a DATA field and explanation of untrustedContentHint; do not execute instructions.
- Optionally connect a lesson-specific UI inside LessonLab.astro, but only if it adds clarity and doesn't break existing lessons. If too intrusive, a robust static demo with contextual explanation is accepted.
- Ensure demo is available or linked from both EN and PL lessons.
- Test keyboard navigation and 390px viewport, and describe manual Chrome feature tests.

STEP 4 — TESTS (do not fake test results)
- Run npm ci (when appropriate), npm run check, npm run build, npm test; observe any CI-specific tests, lint or harness checks.
- Add tests for canonical ordering; EN/PL presence; correct URL and metadata; resources rendered/serialised into llms-full; lesson-specific lab; synthetic fixture data; no mutations; invalid inputs and graceful missing-API fallback; responsive/keyboard usability as feasible with Playwright.
- Browser WebMCP integration test may require experimental Chrome. If unavailable, separate deterministic unit/UI tests from experimental end-to-end verification and provide exact manual test instructions and blockers.
- Do not remove tests, loosen assertions or alter snapshots only to get green CI. Existing lessons 01–16 must remain unaffected.
- Check mojibake or raw inline Markdown markers in rendered PL/EN body.

STEP 5 — REVIEW AND PR
- Inspect the complete diff against current main and rebase/reconcile PR #35 changes; preserve unrelated concurrent fixes.
- Check links manually (official source pages), distinguish official status from conjecture, and confirm content is useful outside Mumro.
- Use Academy editorial rubric: goal clarity, evidence, runnable example, transferable output, prerequisites, brand restraint (0–2 each; expected >=9/12). Add your scored self-assessment and deficiencies in PR description.
- Open one focused implementation PR with body: summary; user outcome; files changed; screenshots or note if unavailable; actual checks and outcomes; security boundaries; what remains experimental; follow-ups.
- Do NOT merge or deploy. Leave for owner review.

## 3. EXACT ACCEPTANCE CASES

A. EN and PL routes for lesson slug render and cross-link each other.
B. Both versions discuss Community Group draft status accurately; no claim that WebMCP is broadly usable in all AI apps.
C. Comparison explains why MCP protocol server tools, WebMCP browser tools and Playwright GUI operation differ.
D. Code sample runs in supported browser and normal UI works in unsupported browser.
E. Query linkedIn/scheduled (case-sensitive exact lowercase enum linkedin) returns DEMO-001 + DEMO-005, not DEMO-003.
F. Invalid platform=instagram is refused by schema or runtime, with clear error and no mutation.
G. preview_available_slot returns reserved:false; no real calendars, scheduling or publishing.
H. No generated link/source omitted from llms-full, sitemap or relevant navigation.
I. Entire hands-on lab works with synthetic data and zero backend dependencies.
J. Mumro section is truthful: existing server MCP code, proposed WebMCP, no production claim.
K. React extension concept (optional future work) does not expose server MCP credentials or bypass backend RBAC/CSRF/workspace checks.
L. Responsive and accessible: labels, focus indicators, no 390px overflow.
M. All current tests pass; new tests pass; no unrelated changes.
N. Implementation PR remains unmerged; no production deployment.

## 4. SUGGESTED CODE TOUCH MAP

Expected files (update only after confirming actual project structure):
- src/content/lesson-webmcp.ts (new)
- src/lib/contracts.ts
- src/content/lessons-track3-4.ts
- src/content/learning-journeys.ts
- public/labs/webmcp-lab-17.html (new)
- src/components/LessonLab.astro (only if justified)
- tests/academy.spec.ts; tests/inline-text.spec.ts or more focused tests
- scripts/verify-build.mjs
- src/pages/llms-full.txt.ts (only if resources aren't exported correctly)
- README.md / src/content/tools.ts only if they contain stale hard-coded assertions

Do not casually edit routes, global styles, agent gateway, business backend or other live systems.

## 5. PRIMARY SOURCES (read these rather than guessing API syntax)

https://webmachinelearning.github.io/webmcp/
https://developer.chrome.com/docs/ai/webmcp
https://developer.chrome.com/docs/ai/webmcp/imperative-api
https://developer.chrome.com/docs/ai/webmcp/declarative-api
https://developer.chrome.com/docs/ai/webmcp/best-practices
https://developer.chrome.com/docs/ai/webmcp/secure-tools
https://github.com/webmachinelearning/webmcp
https://developers.cloudflare.com/browser-run/features/webmcp/

Chrome's behavior may change. Record the date and browser version in manual verification.

## 6. STOP CONDITIONS / HARD BOUNDARIES

STOP and report rather than bypassing:
- The proposed code needs privileged production credentials or a real publishing API.
- Browser-side authorization cannot be safely separated from the demo.
- Existing CI breaks due to an unrelated, concurrent PR you cannot safely reconcile.
- Spec and Chrome API changed significantly, requiring scope redefinition.
- There are unexpected direct edits to real Mumro publishing code.

Do NOT resolve a blocker by inventing tests, claiming a manual test occurred, deleting security assertions, weakening backend authorization, exposing secrets, or merging an unsafe workaround.

## 7. FINAL RESPONSE FORMAT TO OWNER

Use this template in Polish, with actual values:

1. PR URL and branch; issue/spec references.
2. What was implemented: curriculum, PL/EN, demo, sources, integration case, tests.
3. Exact changed files and substantive edits.
4. Verification: command / result / environment; include failures and unverified manual steps.
5. WebMCP compatibility evidence: browser version, flag/trial, what actually ran.
6. Security: synthetic data, no real API, refusal path, backend boundaries.
7. Editorial score out of 12.
8. Risks, unresolved work and whether separate approval is needed.
9. Explicit confirmation: NO MERGE, NO PRODUCTION DEPLOYMENT.

Priority: educational accuracy, functioning demo, existing site contracts, and security over cosmetic scope expansion.
