import { assertLocaleParity, type LessonSlug, type TrackId } from '../lib/contracts';

export interface PlaybookItem {
  id: string;
  number: string;
  trackId: TrackId;
  relatedLesson: LessonSlug;
  title: string;
  subtitle: string;
  whenToUse: string;
  mumroBenefit: string;
  templateFormat: string;
  templateCode: string;
}

const en = {
  metadata: {
    title: 'Playbooks & Blueprints — MUMRO Academy',
    description:
      'Copy-ready operational templates, Brand Voice YAML specifications, multi-channel story decomposition matrices, and MCP AI governance checklists.',
  },
  hero: {
    eyebrow: 'OPERATIONAL PLAYBOOKS & TEMPLATES',
    title: 'Copy-ready blueprints for your brand system.',
    lead: 'Every lesson in MUMRO Academy translates into a concrete operational artifact. Copy these specifications directly into your team repository—or run them natively inside a MUMRO workspace.',
    copyButton: 'Copy blueprint',
    copiedButton: 'Copied ✓',
    openLessonLabel: 'Read full lesson',
  },
  items: [
    {
      id: 'brand-voice-spec',
      number: 'PLAYBOOK 01',
      trackId: 'brand-systems',
      relatedLesson: 'brand-voice-architecture',
      title: 'Enforceable Brand Voice & Claim Boundaries Specification',
      subtitle: 'Replace vague adjectives with structural syntax rules, domain vocabulary, and hard claim boundaries.',
      whenToUse: 'When onboarding a new brand workspace, configuring AI generators, or aligning editors and reply policies.',
      mumroBenefit: 'In MUMRO, this profile is stored once per workspace and automatically guides articles, social posts, carousels, comment reply suggestions, and the website assistant.',
      templateFormat: 'YAML Specification',
      templateCode: `# MUMRO Academy — Brand Voice & Claim Boundaries Blueprint
workspace_id: "your-brand-slug"
strategy_version: "v2.0"

cadence_rules:
  opening_hook: "Open with a concrete observation, metric, or physical constraint. No rhetorical questions."
  sentence_rhythm: "Alternate short declarative sentences (4-8 words) with detailed technical explanations."
  formatting: "Use 3 distinct paragraphs per social post: 1) Hook/Voice, 2) Source Fact, 3) Goal/CTA."

domain_lexicon:
  preferred_terms:
    - "verified source"
    - "cohort retention"
    - "confirm gate"
    - "handlebar clearance"
  banned_cliches:
    - "game-changer"
    - "unlock your potential"
    - "in today's fast-paced world"
    - "revolutionary"

hard_claim_boundaries:
  - "Never invent customer testimonials, case-study percentages, or unverified ROI claims."
  - "State exact product tolerances and operating conditions."
  - "Separate raw external research facts from brand opinion."

reply_policy:
  inbox_and_assistant: "Answer product and technical questions directly using ingested workspace knowledge; offer contact capture when custom scoping is required."`,
    },
    {
      id: 'story-decomposition-matrix',
      number: 'PLAYBOOK 02',
      trackId: 'multi-format-distribution',
      relatedLesson: 'one-story-multi-channel-architecture',
      title: 'One-Story Multi-Channel Decomposition Matrix',
      subtitle: 'Turn one researched article into a 5-slide carousel and native posts for Instagram, Facebook, X, and LinkedIn.',
      whenToUse: 'At the start of every weekly campaign cycle before drafting individual social captions.',
      mumroBenefit: 'MUMRO’s Story Studio connects your researched article, 5-slide carousel, and 4 channel drafts in one view—with inspectable Sources, Brand Voice, and Content Goal layers.',
      templateFormat: 'Markdown / YAML Matrix',
      templateCode: `# MUMRO Academy — One Story, Four Channels Matrix
canonical_story:
  title: "Two Days. Four Litres: Packing Physics for Short Gravel Escapes"
  source_provenance: "Field Test Log #14 (1.8 kg handlebar load threshold)"
  strategy_pillar: "packing-physics"
  website_url: "https://example.com/journal/two-days-four-litres/"

carousel_5_slides:
  slide_01_hook: "Two days. Four litres. On your bars, instead of your back."
  slide_02_breakdown: "Rain shell, spare tube, multi-tool, mini pump, 48h nutrition."
  slide_03_mechanism: "Three-point head-tube strap eliminates steering sway and cable rub."
  slide_04_proof: "Stable handling on rough washboard descents."
  slide_05_action: "Save the checklist & read the full geometry guide on our site."

channel_adaptations:
  instagram:
    focus: "Visual carousel + tactile 3-paragraph saveable caption"
    link_strategy: "Link-in-bio hub or first comment"
  facebook:
    focus: "Community question + full story context"
    link_strategy: "Direct canonical article link"
  x:
    focus: "High-density thesis statement on load distribution"
    link_strategy: "Direct link in follow-up / post footer"
  linkedin:
    focus: "Constraint-led product engineering note"
    link_strategy: "Engineering takeaway + canonical article reference"`,
    },
    {
      id: 'mcp-campaign-loop-runbook',
      number: 'PLAYBOOK 03',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'two-phase-commit-for-ai-agents',
      title: 'MCP Agent Campaign Loop & Two-Phase Confirmation Protocol',
      subtitle: 'Step-by-step tool sequence for AI agents (Claude Code, Codex, Antigravity) operating on a MUMRO workspace.',
      whenToUse: 'When instructing an MCP-connected AI agent to audit performance, propose strategy updates, or prepare scheduled posts safely.',
      mumroBenefit: 'MUMRO’s MCP server enforces this exact sequence natively—requiring `prepare_*` and `confirm_*` tokens for all external mutations.',
      templateFormat: 'JSON-RPC / MCP Sequence',
      templateCode: `// MUMRO Academy — MCP publishing loop (synthetic IDs; no secrets)
// The server binds the workspace to the credential; NEVER pass workspace_id from the model.
// Replace account_id=42 and media_asset_ids=[901] with IDs returned for your own workspace.
// Schedule: Thursday, 2026-11-05 at 18:00 Europe/Warsaw = 2026-11-05T17:00:00Z.

// 1. Read the scoped workspace and approved strategy (mumro:read)
1. call get_workspace_context({})
2. call get_content_strategy({ "account_id": 42 })
3. call preview_schedule({ "account_id": 42, "content_type": "post" })

// 2. Create a visible local draft — no social-provider call (mumro:drafts)
4. call create_publication_draft({
     "targets": [{ "account_id": 42, "platform": "instagram" }],
     "publication_type": "post",
     "caption": "Two days. Four litres...",
     "media_asset_ids": [901],
     "idempotency_key": "fieldwork-drift4l-2026-11-05-draft"
   })
   // -> Capture items[].draft_id as publication_id (illustrated as 1881).

// 3. Prepare without scheduling or publishing (mumro:schedule)
5. call prepare_publication_action({
     "publication_id": 1881,
     "operation": "schedule_draft",
     "scheduled_at": "2026-11-05T17:00:00Z",
     "idempotency_key": "fieldwork-drift4l-2026-11-05-prepare"
   })
   // -> Display exact preview, expiry and confirmation_mode.
   // -> If confirmation_mode=user, STOP and require a NEW human approval
   //    via a host-controlled approval UI / out-of-band gate.
   // -> The model seeing the returned confirmation_phrase is NOT human consent.

// 4. Confirm only after the required independent authorization
6. call confirm_publication_action({
     "action_id": 554,
     "confirmation_phrase": "schedule-instagram-thu-18-fieldwork-9f82"
   })
   // Values above are synthetic. Host approval or server-verified delegated
   // policy is required; prepare/confirm alone does not prove human consent.`,
    },
    {
      id: 'autonomy-governance-policy',
      number: 'PLAYBOOK 04',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'autonomy-levels-and-guardrails',
      title: 'Multi-Workspace AI Autonomy & Governance Checklist',
      subtitle: 'Standard operating policy for autonomy levels, quiet hours, credit budgets, and team roles across brands.',
      whenToUse: 'Before enabling delegated scheduling or onboarding agency team members and clients.',
      mumroBenefit: 'Configure all four guardrails directly in MUMRO’s Autonomy & Workspaces panels—with instant stop controls per brand.',
      templateFormat: 'JSON Governance Policy',
      templateCode: `{
  "governancePolicyVersion": "1.0",
  "workspaceIsolation": {
    "separateChannelsPerBrand": true,
    "separateBrandVoicePerBrand": true,
    "separateInboxAndAssistantPerBrand": true
  },
  "defaultAutonomySettings": {
    "initialMode": "draft_only",
    "productionMode": "schedule_with_confirmation",
    "delegatedMode": "autonomous_schedule",
    "quietHours": { "enabled": true, "start": "22:00", "end": "07:00" },
    "monthlyCreditBudget": 1000,
    "requireHumanMediaReview": true,
    "emergencyKillSwitchReady": true
  },
  "roleMatrix": {
    "owner": ["strategy_approve", "autonomy_config", "kill_switch", "team_manage"],
    "admin": ["strategy_approve", "publication_confirm", "channel_manage"],
    "member": ["draft_create", "research_curate", "reply_suggest"],
    "viewer": ["calendar_read", "analytics_read"]
  }
}`,
    },
    {
      id: 'agent-harness-kit-blueprint',
      number: 'PLAYBOOK 05',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'ai-agent-harness-engineering',
      title: 'Agent Harness Blueprint: seven decisions → `.harness/spec.json` → `AGENTS.md` and skills (`agent-harness-kit` v3)',
      subtitle: 'A decision-first template: the seven decisions behind a good harness, the commands that record and generate it with RolePlayingTech/agent-harness-kit, and the shape of the generated AGENTS.md.',
      whenToUse: 'When you set up a coding agent on a new or existing repository, or when an existing AGENTS.md has grown, drifted from the code or started contradicting CLAUDE.md and Cursor rules.',
      mumroBenefit: 'The same split between short always-loaded instructions, on-demand procedures and boundaries enforced by tools applies to MUMRO’s MCP tools and skills (`mumro-analyze-performance`, `mumro-plan-campaign`, `mumro-publish-content`), where publishing always goes through `prepare_*` → `confirm_*`.',
      templateFormat: 'CLI v3 + generated Markdown',
      templateCode: `# 1. Seven decisions (answer them before writing any instructions)
#    1 tools        codex | claude | cursor | other
#    2 purpose      one sentence: what the project is and for whom
#    3 commands     fast check (seconds) / full check (before done) / e2e (when flows change)
#    4 rigor        light | standard | strict   (the cost of a mistake decides, not fashion)
#    5 memory       none | decisions | handoff
#    6 approvals    push, deploy, destructive, dependencies, migrations, secrets, ci, infra, payments, auth
#                   + where each one is enforced outside the model
#    7 rules        only what the code cannot tell the agent

# 2. Record them and generate the harness (Node.js 20+)
npx github:RolePlayingTech/agent-harness-kit scan
npx github:RolePlayingTech/agent-harness-kit design          # interview; Enter accepts what the scan found
npx github:RolePlayingTech/agent-harness-kit explain         # why each part is in or out, and its cost
npx github:RolePlayingTech/agent-harness-kit build --dry-run # full diff, nothing written
npx github:RolePlayingTech/agent-harness-kit build
npx github:RolePlayingTech/agent-harness-kit check           # add --run to execute the checks; use --strict in CI

# 3. Shape of the generated AGENTS.md block (a section appears only when its module applies)
<!-- agent-harness:begin -->
## Purpose               decision 2
## Stack and layout      detected stack, non-obvious directories
## Commands              real commands from decision 3
## Definition of done    wording set by rigor; stop rule after three failed fix attempts
## Ask before            decision 6 (advisory: enforce outside the model)
## Project rules         decision 7, one line each
## Memory                decision log and/or handoff note (decision 5)
## Working with context  search first; concise test output; subagents only in large repos
## Skills                verify-change (strict), session-handoff (handoff), harness-maintenance
<!-- agent-harness:end -->

# 4. Keep it small
# - Change the harness through .harness/spec.json, never inside the markers.
# - Add a rule after the same mistake happens twice; remove rules that no longer change behavior.
# - Enforce what matters with branch protection, CODEOWNERS, CI and tool permissions.`,
    },
    {
      id: 'mcp-surface-spec',
      number: 'PLAYBOOK 06',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'mcp-tools-skills-and-product-surfaces',
      title: 'MCP Surface Spec: tiers, prepare/confirm pairs, delete guards, skills and operation scopes (`mcp-surface-kit`)',
      subtitle: 'A checkable contract for an agent-operable product: which tools exist, which tier they sit in, which skill teaches them, and which baseline and per-operation OAuth scopes they require.',
      whenToUse: 'When you add MCP to an existing product, when the tool list has grown, or when you want a pull-request check (`mcp-surface check --strict`) that no live or destructive verb landed without a guard.',
      mumroBenefit:
        'MUMRO-inspired educational example, not an exact dump of the live API: publishing follows read → draft → prepare/confirm; deleting an unpublished local draft is a separate, explicitly requested workflow. Four MCP tiers and cumulative scopes (`mumro:read` ⊂ `mumro:drafts` ⊂ `mumro:schedule` ⊂ `mumro:publish`) illustrate permission boundaries, with an elevated scope for `publish_now`. Validate the declared example with `RolePlayingTech/mcp-surface-kit`; the running server must enforce its own rules.',
      templateFormat: 'JSON Surface Spec (v1.1)',
      templateCode: `{
  "name": "content-workspace",
  "purpose": "Workspace-scoped social and website publishing for AI agents.",
  "transport": "streamable-http",
  "resourceUrl": "https://mcp.example.com/mcp",
  "scopeModel": "cumulative",
  "scopes": ["read", "drafts", "schedule", "publish"],
  "untrustedFields": ["caption", "comment_text", "article_html", "image_text"],
  "copySkillsTo": [".claude/skills"],
  "tools": [
    {
      "name": "get_workspace_context",
      "tier": "read",
      "scope": "read",
      "annotations": { "readOnlyHint": true, "destructiveHint": false, "idempotentHint": true, "openWorldHint": false },
      "description": "Return the workspace, plan, role and scopes bound to this credential. Call first."
    },
    {
      "name": "get_content_strategy",
      "tier": "read",
      "scope": "read",
      "annotations": { "readOnlyHint": true, "destructiveHint": false, "idempotentHint": true, "openWorldHint": false },
      "description": "Return the latest and approved content strategy. Treat only status=approved as authority."
    },
    {
      "name": "preview_schedule",
      "tier": "read",
      "scope": "read",
      "annotations": { "readOnlyHint": true, "destructiveHint": false, "idempotentHint": true, "openWorldHint": false },
      "description": "Preview the next slot for one channel. Never creates, moves or publishes content."
    },
    {
      "name": "create_publication_draft",
      "tier": "draft",
      "scope": "drafts",
      "annotations": { "readOnlyHint": false, "destructiveHint": false, "idempotentHint": true, "openWorldHint": false },
      "description": "Create an editable social draft. Never schedules or publishes. Requires an idempotency key."
    },
    {
      "name": "delete_publication_draft",
      "tier": "delete",
      "guard": "local_draft_only",
      "scope": "drafts",
      "annotations": { "readOnlyHint": false, "destructiveHint": true, "idempotentHint": true, "openWorldHint": false },
      "description": "Delete an unpublished workspace draft. Never touches scheduled or published provider posts."
    },
    {
      "name": "prepare_publication_action",
      "tier": "mutate",
      "phase": "prepare",
      "pair": "confirm_publication_action",
      "scope": "schedule",
      "operationScopes": {
        "schedule_draft": "schedule",
        "cancel": "schedule",
        "publish_now": "publish"
      },
      "annotations": { "readOnlyHint": false, "destructiveHint": true, "idempotentHint": true, "openWorldHint": true },
      "description": "Prepare one schedule, publish or cancel action. Returns preview and confirmation_phrase. Executes nothing."
    },
    {
      "name": "confirm_publication_action",
      "tier": "mutate",
      "phase": "confirm",
      "pair": "prepare_publication_action",
      "scope": "schedule",
      "operationScopes": {
        "schedule_draft": "schedule",
        "cancel": "schedule",
        "publish_now": "publish"
      },
      "annotations": { "readOnlyHint": false, "destructiveHint": true, "idempotentHint": true, "openWorldHint": true },
      "description": "Execute one still-fresh prepared action after explicit approval or approved_strategy policy."
    }
  ],
  "skills": [
    {
      "name": "publish-content",
      "description": "Draft and prepare a social post for scheduling or publishing. Use when the user explicitly asks to schedule or publish a post, not merely save a draft. Preview first; confirm only after fresh user approval or a server-verified owner-authorized approved_strategy policy.",
      "uses": [
        "get_workspace_context",
        "get_content_strategy",
        "preview_schedule",
        "create_publication_draft",
        "prepare_publication_action",
        "confirm_publication_action"
      ]
    },
    {
      "name": "delete-draft",
      "description": "Delete an unpublished workspace draft. Use when the user explicitly requests deletion of a local unpublished draft. Never delete scheduled or published provider content.",
      "uses": [
        "get_workspace_context",
        "delete_publication_draft"
      ]
    }
  ]
}`,
    },
    {
      id: 'playwright-verification-spec',
      number: 'PLAYBOOK 07',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'playwright-browser-automation-and-verification',
      title: 'Playwright & Multimodal Browser Verification Contract: Tiers, Scenario IDs, Session Policy & Vision Rubric (`playwright-harness-kit`)',
      subtitle: 'A checkable verification contract (`.playwright-harness/spec.json`) that maps GitHub Issues and manual scenario IDs (`M-AUTH-01`, `M-UX-01`) to deterministic Playwright specs, ARIA snapshots (`@playwright/cli` / `@playwright/mcp`), and targeted multimodal screenshots.',
      whenToUse: 'When you want to specify and check browser verification constraints (`playwright-harness check --strict --verify-files`) and generate `SKILL.md` guidance so coding or QA agents run Playwright tests with isolated `ui-contract` fixtures, programmatic DOM geometry, and targeted multimodal vision.',
      mumroBenefit:
        'MUMRO separates fast `ui-contract` tests (`https://mumro-ui-contract.invalid` with `serviceWorkers: "block"` and default-deny `context.route`) from full-stack `integrated` journeys, respects single-use refresh token rotation by avoiding shared `storageState`, and maps every GitHub issue to stable scenario IDs (`M-AUTH-01`, `M-UX-01`). Validate the contract and repository file evidence with `RolePlayingTech/playwright-harness-kit`, then enforce runtime assertions in Playwright.',
      templateFormat: 'JSON Verification Spec (v1.1)',
      templateCode: `{
  "name": "mumro-web-verification",
  "purpose": "Two-tier Playwright & multimodal browser verification for workspace auth, shell geometry, and composer flows.",
  "copySkillsTo": [".claude/skills"],
  "tiers": {
    "ui-contract": {
      "command": "npm --prefix frontend run test:e2e:contract",
      "origin": "https://mumro-ui-contract.invalid",
      "networkPolicy": "deny-unhandled",
      "purpose": "Fast, deterministic verification of routes, auth refresh queues, and 390x844 mobile geometry without external services."
    },
    "integrated": {
      "command": "npm --prefix frontend run test:e2e:integrated",
      "origin": "http://localhost:5173",
      "networkPolicy": "local-stack-only",
      "purpose": "End-to-end journeys against local frontend + backend with disposable QA accounts (QA-A / QA-B)."
    }
  },
  "authSessionPolicy": {
    "singleUseRefreshRotation": true,
    "allowSharedStorageState": false,
    "rationale": "Concurrent workers sharing one single-use refresh token trigger reuse detection and revoke the session family."
  },
  "artifactHygiene": {
    "traceMode": "on-first-retry",
    "gitIgnore": ["playwright-report/", "test-results/", "playwright/.auth/"],
    "forbidLiveMutations": true
  },
  "scenarios": [
    {
      "id": "M-AUTH-01",
      "title": "Silent refresh single-flight under concurrent 401 responses",
      "tier": "ui-contract",
      "spec": "frontend/e2e/ui-contract/auth-session.spec.ts",
      "locatorStrategy": "role-and-label-first",
      "visualCheck": { "required": false }
    },
    {
      "id": "M-UX-01",
      "title": "Mobile shell drawer and dialog overflow check (390x844)",
      "tier": "ui-contract",
      "spec": "frontend/e2e/ui-contract/ux-shell-mobile.spec.ts",
      "locatorStrategy": "role-and-label-first",
      "visualCheck": {
        "required": true,
        "viewports": [{ "width": 390, "height": 844 }, { "width": 1280, "height": 800 }],
        "programmaticInvariants": [
          "documentElement.scrollWidth <= window.innerWidth",
          "dialog close button inside viewport boundingBox"
        ],
        "multimodalRubric": [
          "No overlapping badges or clipped headings in the mobile drawer",
          "Primary action button remains visually distinct and unobstructed"
        ]
      }
    }
  ],
  "skills": [
    {
      "name": "verify-browser-scenarios",
      "description": "Verify UI-contract and integrated Playwright scenarios with ARIA locators, DOM geometry invariants, and targeted VLM screenshots. Use when an issue or task packet references M-AUTH-01 or M-UX-01.",
      "covers": ["M-AUTH-01", "M-UX-01"]
    }
  ]
}`,
    },
    {
      id: 'git-agent-workflow-spec',
      number: 'PLAYBOOK 08',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'git-and-github-for-ai-coding-agents',
      title: 'Multi-Agent Git Workflow, Worktree Isolation & PR Scope Gate (`git-agent-workflow-kit`)',
      subtitle: 'A copy-ready operational policy for running one or multiple AI coding agents safely across feature branches, isolated git worktrees, pre-PR scope & test-integrity checks, and non-destructive recovery.',
      whenToUse: 'Before starting coding-agent work in a repository, when running two or more agents in parallel via `git worktree`, or when gating Pull Requests against scope creep and weakened test assertions.',
      mumroBenefit:
        'Complements `agent-harness-kit` (static `AGENTS.md` contracts), `mcp-surface-kit` (MCP tool gates), and `playwright-harness-kit` (browser verification contracts) with live Git state auditing, file-scope enforcement, test-weakening detection, and 5 portable Agent Skills via `RolePlayingTech/git-agent-workflow-kit`.',
      templateFormat: 'JSON Task Scope & Git Workflow Policy (v1.0)',
      templateCode: `{
  "task": "issue-42-session-expiry-and-audit",
  "baseBranch": "origin/main",
  "isolation": {
    "forbidBranches": ["main", "master", "production"],
    "branchPattern": "feat/<issue>-<slug>",
    "parallelWorktreeCommand": "git worktree add ../repo-<slug> -b feat/<issue>-<slug> origin/main"
  },
  "allowedGlobs": [
    "src/auth/**",
    "tests/auth.test.js",
    ".gitignore"
  ],
  "forbiddenGlobs": [
    ".env",
    ".env.*",
    ".github/workflows/**",
    "migrations/**"
  ],
  "maxChangedFiles": 10,
  "maxLinesChanged": 400,
  "preFlightCommands": [
    "npx github:RolePlayingTech/git-agent-workflow-kit doctor . --strict"
  ],
  "prePrCommands": [
    "npm run check",
    "npm test",
    "npx github:RolePlayingTech/git-agent-workflow-kit pr-ready . --base origin/main --allow \\"src/auth/**\\" --allow \\"tests/auth.test.js\\" --allow \\".gitignore\\" --strict"
  ],
  "recoveryRules": {
    "uncommittedFile": "git restore <file>",
    "shelveWorkInProgress": "git stash push -u -m \\"wip: before switch\\"",
    "abortConflict": "git merge --abort",
    "rescueResetCommit": "git reflog -n 15 -> git switch -c rescue/<name> <sha>",
    "undoMergedPrOnMain": "git revert -m 1 <merge-commit-sha>"
  }
}`,
    },
  ] satisfies PlaybookItem[],
};

const pl: typeof en = {
  metadata: {
    title: 'Playbooki i Szablony — Akademia MUMRO',
    description:
      'Gotowe do skopiowania szablony operacyjne, specyfikacje Brand Voice w YAML, matryce rozwijania jednej historii na 4 kanały oraz procedury nadzoru dla agentów MCP.',
  },
  hero: {
    eyebrow: 'PLAYBOOKI OPERACYJNE I SZABLONY',
    title: 'Gotowe schematy dla systemu Twojej marki.',
    lead: 'Każda lekcja w Akademii MUMRO przekłada się na konkretny artefakt operacyjny. Skopiuj poniższe specyfikacje do dokumentacji swojego zespołu — albo uruchom je natywnie w przestrzeni MUMRO.',
    copyButton: 'Skopiuj szablon',
    copiedButton: 'Skopiowano ✓',
    openLessonLabel: 'Przeczytaj pełną lekcję',
  },
  items: [
    {
      id: 'brand-voice-spec',
      number: 'PLAYBOOK 01',
      trackId: 'brand-systems',
      relatedLesson: 'brand-voice-architecture',
      title: 'Specyfikacja Brand Voice i Granic Twierdzeń Marki',
      subtitle: 'Zastąp ogólnikowe przymiotniki regułami rytmu zdań, słownikiem pojęć i twardymi granicami obietnic.',
      whenToUse: 'Przy starcie nowej przestrzeni marki, konfiguracji generatorów AI lub ujednolicaniu stylu redakcji i odpowiedzi.',
      mumroBenefit: 'W MUMRO zapisujesz ten profil raz dla całego workspace’u — zasila on artykuły, posty, karuzele, podpowiedzi odpowiedzi na komentarze oraz asystenta WWW.',
      templateFormat: 'Specyfikacja YAML',
      templateCode: `# Akademia MUMRO — Szablon Brand Voice i Granic Marki
workspace_id: "twoja-marka"
strategy_version: "v2.0"

cadence_rules:
  opening_hook: "Zaczynaj od konkretnej obserwacji, liczby lub ograniczenia fizycznego. Bez pytań retorycznych."
  sentence_rhythm: "Przeplataj krótkie zdania oznajmujące (4-8 słów) z precyzyjnym wyjaśnieniem mechanizmu."
  formatting: "Buduj post z 3 czytelnych akapitów: 1) Otwarcie/Voice, 2) Fakt ze źródła, 3) Cel/Krok."

domain_lexicon:
  preferred_terms:
    - "zweryfikowane źródło"
    - "retencja kohorty"
    - "bramka zatwierdzania"
    - "prześwit przy kierownicy"
  banned_cliches:
    - "rewolucyjny"
    - "game-changer"
    - "uwolnij swój potencjał"
    - "w dzisiejszym dynamicznym świecie"

hard_claim_boundaries:
  - "Nigdy nie zmyślaj opinii klientów, procentów wzrostu ani niepotwierdzonego ROI."
  - "Podawaj dokładne parametry i rzeczywiste warunki działania produktu."
  - "Wyraźnie oddzielaj surowy fakt ze źródła od interpretacji redakcyjnej."

reply_policy:
  inbox_and_assistant: "Odpowiadaj konkretem na bazie wybranej wiedzy marki; przy pytaniach niestandardowych zaproponuj pozostawienie kontaktu."`,
    },
    {
      id: 'story-decomposition-matrix',
      number: 'PLAYBOOK 02',
      trackId: 'multi-format-distribution',
      relatedLesson: 'one-story-multi-channel-architecture',
      title: 'Matryca Rozwinięcia Jednej Historii na Cztery Kanały',
      subtitle: 'Przekształć jeden zbadany artykuł w 5-slajdową karuzelę oraz natywne posty na Instagram, Facebook, X i LinkedIn.',
      whenToUse: 'Na początku każdego cyklu kampanii przed pisaniem poszczególnych postów społecznościowych.',
      mumroBenefit: 'Studio treści MUMRO łączy artykuł, karuzelę 5 slajdów i 4 warianty kanałowe w jednym widoku — z podświetleniem Źródeł, Głosu marki i Celu treści.',
      templateFormat: 'Matryca Markdown / YAML',
      templateCode: `# Akademia MUMRO — Matryca: Jedna Historia, Cztery Kanały
canonical_story:
  title: "Dwa dni. Cztery litry: Fizyka pakowania na krótkie wyprawy szutrowe"
  source_provenance: "Dziennik testów terenowych #14 (próg 1,8 kg obciążenia kierownicy)"
  strategy_pillar: "packing-physics"
  website_url: "https://example.com/pl/journal/dwa-dni-cztery-litry/"

carousel_5_slides:
  slide_01_hook: "Dwa dni. Cztery litry. Na kierownicy, zamiast na plecach."
  slide_02_breakdown: "Kurtka przeciwdeszczowa, dętka, multitool, pompka i prowiant na 48h."
  slide_03_mechanism: "Trzypunktowe mocowanie do główki ramy eliminuje bujanie i ocieranie pancerzy."
  slide_04_proof: "Pewne prowadzenie na szybkich, wyboistych zjazdach szutrowych."
  slide_05_action: "Zapisz listę pakowania i przeczytaj pełny poradnik na naszej stronie."

channel_adaptations:
  instagram:
    focus: "Karuzela 5 slajdów + konkretny, trzyczęściowy opis zachęcający do zapisu"
    link_strategy: "Strona link-in-bio lub pierwszy komentarz"
  facebook:
    focus: "Pytanie otwierające dyskusję + pełny kontekst historii"
    link_strategy: "Bezpośredni link do artykułu na stronie"
  x:
    focus: "Skondensowana teza techniczna o rozkładzie masy"
    link_strategy: "Link do artykułu w rozwinięciu"
  linkedin:
    focus: "Kulisy projektowania produktu przez pryzmat ograniczeń"
    link_strategy: "Wniosek inżynieryjny + odnośnik do pełnego opracowania"`,
    },
    {
      id: 'mcp-campaign-loop-runbook',
      number: 'PLAYBOOK 03',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'two-phase-commit-for-ai-agents',
      title: 'Procedura Pętli Kampanii MCP i Dwufazowego Zatwierdzania',
      subtitle: 'Sekwencja wywołań narzędzi dla agentów AI (Claude Code, Codex, Antigravity) pracujących na przestrzeni MUMRO.',
      whenToUse: 'Gdy zlecasz agentowi AI podłączonemu przez MCP analizę wyników, aktualizację strategii lub przygotowanie planu publikacji.',
      mumroBenefit: 'Serwer MCP MUMRO egzekwuje tę sekwencję natywnie — wymagając dwufazowych tokenów `prepare_*` oraz `confirm_*` przed każdą zmianą planu.',
      templateFormat: 'Sekwencja JSON-RPC / MCP',
      templateCode: `// MUMRO Academy — bezpieczna sekwencja MCP (syntetyczne ID, bez sekretów)
// Serwer wiąże workspace z poświadczeniem; NIE przekazuj workspace_id od modelu.
// Zastąp account_id=42 i media_asset_ids=[901] identyfikatorami własnego workspace.
// Termin: czwartek 2026-11-05, 18:00 Europe/Warsaw = 2026-11-05T17:00:00Z.

// 1. Odczytaj kontekst workspace i zatwierdzoną strategię (mumro:read)
1. call get_workspace_context({})
2. call get_content_strategy({ "account_id": 42 })
3. call preview_schedule({ "account_id": 42, "content_type": "post" })

// 2. Zapisz widoczny szkic lokalny — bez wywołania dostawcy (mumro:drafts)
4. call create_publication_draft({
     "targets": [{ "account_id": 42, "platform": "instagram" }],
     "publication_type": "post",
     "caption": "Dwa dni. Cztery litry...",
     "media_asset_ids": [901],
     "idempotency_key": "fieldwork-drift4l-2026-11-05-draft"
   })
   // -> Odczytaj items[].draft_id jako publication_id (tu: 1881).

// 3. Przygotuj operację — bez planowania i publikacji (mumro:schedule)
5. call prepare_publication_action({
     "publication_id": 1881,
     "operation": "schedule_draft",
     "scheduled_at": "2026-11-05T17:00:00Z",
     "idempotency_key": "fieldwork-drift4l-2026-11-05-prepare"
   })
   // -> Pokaż pełny podgląd, czas wygaśnięcia i confirmation_mode.
   // -> Jeśli confirmation_mode=user, ZATRZYMAJ SIĘ i wymagaj NOWEJ zgody
   //    w interfejsie hosta albo przez niezależny mechanizm autoryzacji.
   // -> Sam dostęp modelu do confirmation_phrase NIE oznacza zgody człowieka.

// 4. Potwierdź dopiero po niezależnym zatwierdzeniu
6. call confirm_publication_action({
     "action_id": 554,
     "confirmation_phrase": "schedule-instagram-thu-18-fieldwork-9f82"
   })
   // Dane powyżej są syntetyczne. Wymagana jest zgoda przez hosta albo
   // zweryfikowana przez serwer polityka delegacji: para prepare/confirm
   // sama w sobie nie dowodzi zgody człowieka.`,
    },
    {
      id: 'autonomy-governance-policy',
      number: 'PLAYBOOK 04',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'autonomy-levels-and-guardrails',
      title: 'Polityka Nadzoru Autonomii AI i Izolacji Przestrzeni (Workspaces)',
      subtitle: 'Standard konfiguracji poziomów autonomii, godzin ciszy, budżetów kredytów i ról zespołowych dla marek i agencji.',
      whenToUse: 'Przed włączeniem delegowanego planowania lub nadaniem dostępu członkom zespołu i klientom.',
      mumroBenefit: 'Skonfigurujesz wszystkie cztery bezpieczniki bezpośrednio w panelu Kontroli Autonomii i Workspaces w MUMRO.',
      templateFormat: 'Polityka JSON',
      templateCode: `{
  "governancePolicyVersion": "1.0",
  "workspaceIsolation": {
    "separateChannelsPerBrand": true,
    "separateBrandVoicePerBrand": true,
    "separateInboxAndAssistantPerBrand": true
  },
  "defaultAutonomySettings": {
    "initialMode": "draft_only",
    "productionMode": "schedule_with_confirmation",
    "delegatedMode": "autonomous_schedule",
    "quietHours": { "enabled": true, "start": "22:00", "end": "07:00" },
    "monthlyCreditBudget": 1000,
    "requireHumanMediaReview": true,
    "emergencyKillSwitchReady": true
  },
  "roleMatrix": {
    "owner": ["strategy_approve", "autonomy_config", "kill_switch", "team_manage"],
    "admin": ["strategy_approve", "publication_confirm", "channel_manage"],
    "member": ["draft_create", "research_curate", "reply_suggest"],
    "viewer": ["calendar_read", "analytics_read"]
  }
}`,
    },
    {
      id: 'agent-harness-kit-blueprint',
      number: 'PLAYBOOK 05',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'ai-agent-harness-engineering',
      title: 'Szablon harnessu agenta: siedem decyzji → `.harness/spec.json` → `AGENTS.md` i skille (`agent-harness-kit` v3)',
      subtitle: 'Szablon „najpierw decyzje”: siedem decyzji, na których opiera się dobry harness, komendy, którymi zapiszesz je i wygenerujesz harness z RolePlayingTech/agent-harness-kit, oraz kształt generowanego AGENTS.md.',
      whenToUse: 'Gdy uruchamiasz agenta w nowym lub istniejącym repozytorium albo gdy dotychczasowy AGENTS.md rozrósł się, rozjechał z kodem lub zaczął przeczyć CLAUDE.md i regułom Cursora.',
      mumroBenefit: 'Ten sam podział na krótkie instrukcje ładowane zawsze, procedury na żądanie i granice egzekwowane przez narzędzia obowiązuje w narzędziach MCP i skillach MUMRO (`mumro-analyze-performance`, `mumro-plan-campaign`, `mumro-publish-content`), gdzie publikacja zawsze przechodzi przez `prepare_*` → `confirm_*`.',
      templateFormat: 'CLI v3 + generowany Markdown',
      templateCode: `# 1. Siedem decyzji (podejmij je, zanim napiszesz jakąkolwiek instrukcję)
#    1 narzędzia    codex | claude | cursor | other
#    2 cel          jedno zdanie: czym jest projekt i dla kogo
#    3 komendy      szybkie sprawdzenie (sekundy) / pełne (przed „gotowe”) / e2e (gdy zmienia się przepływ)
#    4 rigor        light | standard | strict   (decyduje koszt pomyłki, nie moda)
#    5 pamięć       none | decisions | handoff
#    6 zgody        push, deploy, destructive, dependencies, migrations, secrets, ci, infra, payments, auth
#                   + gdzie każda z nich jest egzekwowana poza modelem
#    7 reguły       tylko to, czego agent nie wyczyta z kodu

# 2. Zapisz je i wygeneruj harness (Node.js 20+)
npx github:RolePlayingTech/agent-harness-kit scan
npx github:RolePlayingTech/agent-harness-kit design          # wywiad; Enter przyjmuje to, co znalazł skan
npx github:RolePlayingTech/agent-harness-kit explain         # dlaczego każdy element jest włączony lub pominięty i ile kosztuje
npx github:RolePlayingTech/agent-harness-kit build --dry-run # pełny diff, nic nie zapisuje
npx github:RolePlayingTech/agent-harness-kit build
npx github:RolePlayingTech/agent-harness-kit check           # dodaj --run, by uruchomić testy; w CI użyj --strict

# 3. Kształt generowanego bloku AGENTS.md (sekcja pojawia się tylko, gdy dotyczy jej moduł)
<!-- agent-harness:begin -->
## Purpose               decyzja 2
## Stack and layout      wykryty stack, nieoczywiste katalogi
## Commands              prawdziwe komendy z decyzji 3
## Definition of done    treść zależna od rygoru; reguła stopu po trzech nieudanych próbach
## Ask before            decyzja 6 (instrukcja: egzekwuj poza modelem)
## Project rules         decyzja 7, jedna linia każda
## Memory                dziennik decyzji i/lub notatka handoff (decyzja 5)
## Working with context  najpierw wyszukiwanie; zwięzłe wyniki testów; subagenci tylko w dużych repo
## Skills                verify-change (strict), session-handoff (handoff), harness-maintenance
<!-- agent-harness:end -->

# 4. Pilnuj rozmiaru
# - Zmieniaj harness przez .harness/spec.json, nigdy między znacznikami.
# - Dodawaj regułę, gdy ten sam błąd powtórzy się dwa razy; usuwaj reguły, które niczego nie zmieniają.
# - To, co ważne, egzekwuj ochroną gałęzi, CODEOWNERS, CI i uprawnieniami narzędzia.`,
    },
    {
      id: 'mcp-surface-spec',
      number: 'PLAYBOOK 06',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'mcp-tools-skills-and-product-surfaces',
      title: 'Specyfikacja powierzchni MCP: poziomy, pary prepare/confirm, strażnicy usuwania, skille i scope’y operacji (`mcp-surface-kit`)',
      subtitle: 'Sprawdzalny kontrakt produktu sterowanego przez agenta: które narzędzia istnieją, na którym poziomie siedzą, który skill ich uczy oraz jakich bazowych i per-operacyjnych scope’ów OAuth potrzebują.',
      whenToUse: 'Gdy dodajesz MCP do istniejącego produktu, gdy lista narzędzi urosła, albo gdy chcesz w pull requescie sprawdzenie (`mcp-surface check --strict`), że żaden czasownik na żywo ani destrukcyjny nie wylądował bez zabezpieczenia.',
      mumroBenefit:
        'Przykład edukacyjny inspirowany MUMRO, a nie wierna kopia produkcyjnego API: publikowanie przechodzi od odczytu przez szkic do prepare/confirm, a usunięcie nieopublikowanego szkicu jest osobnym workflow wymagającym jawnej prośby. Cztery poziomy narzędzi MCP i kumulatywne scope’y (`mumro:read` ⊂ `mumro:drafts` ⊂ `mumro:schedule` ⊂ `mumro:publish`) pokazują granice uprawnień, w tym dodatkowe uprawnienie dla `publish_now`. `RolePlayingTech/mcp-surface-kit` sprawdza zadeklarowany kontrakt, natomiast serwer niezależnie egzekwuje własne reguły.',
      templateFormat: 'Specyfikacja JSON powierzchni (v1.1)',
      templateCode: `{
  "name": "content-workspace",
  "purpose": "Workspace-scoped social and website publishing for AI agents.",
  "transport": "streamable-http",
  "resourceUrl": "https://mcp.example.com/mcp",
  "scopeModel": "cumulative",
  "scopes": ["read", "drafts", "schedule", "publish"],
  "untrustedFields": ["caption", "comment_text", "article_html", "image_text"],
  "copySkillsTo": [".claude/skills"],
  "tools": [
    {
      "name": "get_workspace_context",
      "tier": "read",
      "scope": "read",
      "annotations": { "readOnlyHint": true, "destructiveHint": false, "idempotentHint": true, "openWorldHint": false },
      "description": "Return the workspace, plan, role and scopes bound to this credential. Call first."
    },
    {
      "name": "get_content_strategy",
      "tier": "read",
      "scope": "read",
      "annotations": { "readOnlyHint": true, "destructiveHint": false, "idempotentHint": true, "openWorldHint": false },
      "description": "Return the latest and approved content strategy. Treat only status=approved as authority."
    },
    {
      "name": "preview_schedule",
      "tier": "read",
      "scope": "read",
      "annotations": { "readOnlyHint": true, "destructiveHint": false, "idempotentHint": true, "openWorldHint": false },
      "description": "Preview the next slot for one channel. Never creates, moves or publishes content."
    },
    {
      "name": "create_publication_draft",
      "tier": "draft",
      "scope": "drafts",
      "annotations": { "readOnlyHint": false, "destructiveHint": false, "idempotentHint": true, "openWorldHint": false },
      "description": "Create an editable social draft. Never schedules or publishes. Requires an idempotency key."
    },
    {
      "name": "delete_publication_draft",
      "tier": "delete",
      "guard": "local_draft_only",
      "scope": "drafts",
      "annotations": { "readOnlyHint": false, "destructiveHint": true, "idempotentHint": true, "openWorldHint": false },
      "description": "Delete an unpublished workspace draft. Never touches scheduled or published provider posts."
    },
    {
      "name": "prepare_publication_action",
      "tier": "mutate",
      "phase": "prepare",
      "pair": "confirm_publication_action",
      "scope": "schedule",
      "operationScopes": {
        "schedule_draft": "schedule",
        "cancel": "schedule",
        "publish_now": "publish"
      },
      "annotations": { "readOnlyHint": false, "destructiveHint": true, "idempotentHint": true, "openWorldHint": true },
      "description": "Prepare one schedule, publish or cancel action. Returns preview and confirmation_phrase. Executes nothing."
    },
    {
      "name": "confirm_publication_action",
      "tier": "mutate",
      "phase": "confirm",
      "pair": "prepare_publication_action",
      "scope": "schedule",
      "operationScopes": {
        "schedule_draft": "schedule",
        "cancel": "schedule",
        "publish_now": "publish"
      },
      "annotations": { "readOnlyHint": false, "destructiveHint": true, "idempotentHint": true, "openWorldHint": true },
      "description": "Execute one still-fresh prepared action after explicit approval or approved_strategy policy."
    }
  ],
  "skills": [
    {
      "name": "publish-content",
      "description": "Draft and prepare a social post for scheduling or publishing. Use when the user explicitly asks to schedule or publish a post, not merely save a draft. Preview first; confirm only after fresh user approval or a server-verified owner-authorized approved_strategy policy.",
      "uses": [
        "get_workspace_context",
        "get_content_strategy",
        "preview_schedule",
        "create_publication_draft",
        "prepare_publication_action",
        "confirm_publication_action"
      ]
    },
    {
      "name": "delete-draft",
      "description": "Delete an unpublished workspace draft. Use when the user explicitly requests deletion of a local unpublished draft. Never delete scheduled or published provider content.",
      "uses": [
        "get_workspace_context",
        "delete_publication_draft"
      ]
    }
  ]
}`,
    },
    {
      id: 'playwright-verification-spec',
      number: 'PLAYBOOK 07',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'playwright-browser-automation-and-verification',
      title: 'Kontrakt Weryfikacji Przeglądarkowej Playwright i Modali Wizualnych: Warstwy, ID Scenariuszy, Sesje i Rubryka VLM (`playwright-harness-kit`)',
      subtitle: 'Sprawdzalny w CI kontrakt weryfikacji (`.playwright-harness/spec.json`) łączący zgłoszenia GitHub Issue i identyfikatory scenariuszy (`M-AUTH-01`, `M-UX-01`) z testami Playwright, drzewem ARIA (`@playwright/cli` / `@playwright/mcp`) i celowanymi zrzutami ekranu.',
      whenToUse: 'Gdy chcesz wyspecyfikować i statycznie sprawdzić ograniczenia weryfikacji przeglądarkowej (`playwright-harness check --strict --verify-files`) oraz wygenerować wytyczne `SKILL.md`, które poprowadzą agenta do uruchomienia testów Playwright z izolowaną oprawą `ui-contract`, geometrią DOM i celowaną oceną wizualną.',
      mumroBenefit:
        'MUMRO oddziela szybkie testy `ui-contract` (`https://mumro-ui-contract.invalid` z `serviceWorkers: "block"` i blokadą `context.route`) od pełnych ścieżek `integrated`, szanuje jednorazową rotację refresh tokenów przez zakaz współdzielenia `storageState` i mapuje każde zgłoszenie GitHub na stałe identyfikatory scenariuszy (`M-AUTH-01`, `M-UX-01`). Kontrakt oraz dowody w plikach repozytorium zweryfikujesz przez `RolePlayingTech/playwright-harness-kit`, a zachowanie w czasie wykonania wymusisz w Playwright.',
      templateFormat: 'Specyfikacja JSON weryfikacji (v1.1)',
      templateCode: `{
  "name": "mumro-web-verification",
  "purpose": "Two-tier Playwright & multimodal browser verification for workspace auth, shell geometry, and composer flows.",
  "copySkillsTo": [".claude/skills"],
  "tiers": {
    "ui-contract": {
      "command": "npm --prefix frontend run test:e2e:contract",
      "origin": "https://mumro-ui-contract.invalid",
      "networkPolicy": "deny-unhandled",
      "purpose": "Fast, deterministic verification of routes, auth refresh queues, and 390x844 mobile geometry without external services."
    },
    "integrated": {
      "command": "npm --prefix frontend run test:e2e:integrated",
      "origin": "http://localhost:5173",
      "networkPolicy": "local-stack-only",
      "purpose": "End-to-end journeys against local frontend + backend with disposable QA accounts (QA-A / QA-B)."
    }
  },
  "authSessionPolicy": {
    "singleUseRefreshRotation": true,
    "allowSharedStorageState": false,
    "rationale": "Concurrent workers sharing one single-use refresh token trigger reuse detection and revoke the session family."
  },
  "artifactHygiene": {
    "traceMode": "on-first-retry",
    "gitIgnore": ["playwright-report/", "test-results/", "playwright/.auth/"],
    "forbidLiveMutations": true
  },
  "scenarios": [
    {
      "id": "M-AUTH-01",
      "title": "Silent refresh single-flight under concurrent 401 responses",
      "tier": "ui-contract",
      "spec": "frontend/e2e/ui-contract/auth-session.spec.ts",
      "locatorStrategy": "role-and-label-first",
      "visualCheck": { "required": false }
    },
    {
      "id": "M-UX-01",
      "title": "Mobile shell drawer and dialog overflow check (390x844)",
      "tier": "ui-contract",
      "spec": "frontend/e2e/ui-contract/ux-shell-mobile.spec.ts",
      "locatorStrategy": "role-and-label-first",
      "visualCheck": {
        "required": true,
        "viewports": [{ "width": 390, "height": 844 }, { "width": 1280, "height": 800 }],
        "programmaticInvariants": [
          "documentElement.scrollWidth <= window.innerWidth",
          "dialog close button inside viewport boundingBox"
        ],
        "multimodalRubric": [
          "No overlapping badges or clipped headings in the mobile drawer",
          "Primary action button remains visually distinct and unobstructed"
        ]
      }
    }
  ],
  "skills": [
    {
      "name": "verify-browser-scenarios",
      "description": "Verify UI-contract and integrated Playwright scenarios with ARIA locators, DOM geometry invariants, and targeted VLM screenshots. Use when an issue or task packet references M-AUTH-01 or M-UX-01.",
      "covers": ["M-AUTH-01", "M-UX-01"]
    }
  ]
}`,
    },
    {
      id: 'git-agent-workflow-spec',
      number: 'PLAYBOOK 08',
      trackId: 'agents-mcp-governance',
      relatedLesson: 'git-and-github-for-ai-coding-agents',
      title: 'Workflow Git dla wielu agentów, izolacja worktree i bramka zakresu PR (`git-agent-workflow-kit`)',
      subtitle: 'Gotowa polityka operacyjna do bezpiecznej pracy jednego lub wielu agentów kodujących na gałęziach zadaniowych, w izolowanych katalogach git worktree, z audytem zakresu i integralności testów przed PR oraz nieinwazyjnym odzyskiwaniem.',
      whenToUse: 'Przed rozpoczęciem pracy agenta w repozytorium, przy równoległym uruchamianiu dwóch lub więcej agentów przez `git worktree` oraz przy weryfikacji Pull Requestów pod kątem wyjścia poza zakres i osłabionych asercji testowych.',
      mumroBenefit:
        'Uzupełnia `agent-harness-kit` (statyczny kontrakt `AGENTS.md`), `mcp-surface-kit` (bramki narzędzi MCP) oraz `playwright-harness-kit` (kontrakty weryfikacji przeglądarkowej) o diagnostykę żywego stanu Gita, egzekucję zakresu plików, wykrywanie osłabionych testów i 5 przenośnych skilli przez `RolePlayingTech/git-agent-workflow-kit`.',
      templateFormat: 'Specyfikacja JSON zakresu zadania i workflowu Git (v1.0)',
      templateCode: `{
  "task": "issue-42-session-expiry-and-audit",
  "baseBranch": "origin/main",
  "isolation": {
    "forbidBranches": ["main", "master", "production"],
    "branchPattern": "feat/<issue>-<slug>",
    "parallelWorktreeCommand": "git worktree add ../repo-<slug> -b feat/<issue>-<slug> origin/main"
  },
  "allowedGlobs": [
    "src/auth/**",
    "tests/auth.test.js",
    ".gitignore"
  ],
  "forbiddenGlobs": [
    ".env",
    ".env.*",
    ".github/workflows/**",
    "migrations/**"
  ],
  "maxChangedFiles": 10,
  "maxLinesChanged": 400,
  "preFlightCommands": [
    "npx github:RolePlayingTech/git-agent-workflow-kit doctor . --strict"
  ],
  "prePrCommands": [
    "npm run check",
    "npm test",
    "npx github:RolePlayingTech/git-agent-workflow-kit pr-ready . --base origin/main --allow \\"src/auth/**\\" --allow \\"tests/auth.test.js\\" --allow \\".gitignore\\" --strict"
  ],
  "recoveryRules": {
    "uncommittedFile": "git restore <file>",
    "shelveWorkInProgress": "git stash push -u -m \\"wip: before switch\\"",
    "abortConflict": "git merge --abort",
    "rescueResetCommit": "git reflog -n 15 -> git switch -c rescue/<name> <sha>",
    "undoMergedPrOnMain": "git revert -m 1 <merge-commit-sha>"
  }
}`,
    },
  ] satisfies PlaybookItem[],
};

export const playbooksContent = assertLocaleParity({ en, pl }, 'playbooksContent');
