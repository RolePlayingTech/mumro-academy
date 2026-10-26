# MUMRO Academy · `academy.mumro.io`

[![MUMRO Platform](https://img.shields.io/badge/Platform-mumro.io-20231f?style=flat-square)](https://mumro.io)
[![MUMRO Academy](https://img.shields.io/badge/Academy-academy.mumro.io-e7471b?style=flat-square)](https://academy.mumro.io)
[![Languages](https://img.shields.io/badge/Edition-EN%20%2F%20PL-62675d?style=flat-square)](https://academy.mumro.io/pl/)
[![License: MIT](https://img.shields.io/badge/License-MIT-2c4a34?style=flat-square)](./LICENSE)

> **EN:** Open engineering and marketing handbook for **living brand systems**, **multi-channel content operations**, **technical SEO**, and **Model Context Protocol (MCP) AI agents** — built by **[MUMRO](https://mumro.io)** ([RolePlayingTech](https://roleplayingtech.com)).
>
> **PL:** Otwarty podręcznik inżynieryjno-marketingowy o **żywych systemach marki**, **wielokanałowych operacjach treści**, **technicznym SEO** oraz **agentach AI i Model Context Protocol (MCP)** — tworzony przez **[MUMRO](https://mumro.io/pl/)** ([RolePlayingTech](https://roleplayingtech.com)).

---

## English Overview

Most marketing content fails not because teams lack writing tools, but because **context resets at every step**:
1. Brand strategy is locked inside a forgotten PDF deck.
2. Writers and AI chat tabs start from isolated, ungrounded prompts.
3. The same caption is copy-pasted across Instagram, LinkedIn, X, and Facebook.
4. Website CMS publishing and social distribution operate on separate islands.
5. Analytics dashboards report vanity likes without ever informing the next strategy revision.

**MUMRO Academy (`academy.mumro.io`)** teaches portable engineering and editorial methods you can apply in your own stack, pairs them with four independent open-source CLI kits for coding-agent and MCP workflows, and shows how **[MUMRO](https://mumro.io)** implements the connected brand, publishing, and governance loop in practice.

### Curriculum: 4 Learning Tracks & 16 Deep-Dive Lessons

| Track | Lesson | Title (EN) | Focus |
| :--- | :--- | :--- | :--- |
| **Track 01**<br>Living Brand Systems | `01` | **Versioned Brand Strategy: Why Static PDFs Fail Modern Content Teams** | Strategy `v1 → v2`, pillars, channel roles & 30-day hypotheses |
| **Track 01**<br>Living Brand Systems | `02` | **Brand Voice Architecture: Encoding Tone, Boundaries & Vocabulary** | Cadence rules, domain lexicon & negative claim boundaries |
| **Track 01**<br>Living Brand Systems | `03` | **Evidence-Led Research Pipelines: RSS, Official Domains & Provenance** | Separating raw facts from editorial interpretation (`Source → Decision → Draft`) |
| **Track 02**<br>Multi-Format Ops | `04` | **One Story, Four Channels: Adapting Core Narratives Without Copy-Paste** | Canonical website article + 5-slide carousel + IG / FB / X / LinkedIn |
| **Track 02**<br>Multi-Format Ops | `05` | **High-Retention Carousels: Structural Pacing from Hook Slide to Action** | The 5-slide arc (`Hook → Breakdown → Mechanism → Proof → Takeaway`) |
| **Track 02**<br>Multi-Format Ops | `06` | **Publishing Operations: Queues, Time Slots, Idempotency & Receipts** | Why `queued ≠ published`, per-target receipts & idempotent retries |
| **Track 03**<br>Website, SEO & Loops | `07` | **Website + Social as One Loop: Connecting CMS with Social Distribution** | WordPress / API CMS delivery, canonicals, reciprocal `hreflang` & JSON-LD |
| **Track 03**<br>Website, SEO & Loops | `08` | **Grounded Website Assistants: Turning Visitor Questions into Content & Leads** | Brand-grounded chatbot, Unified Inbox, lead capture & FAQ Mining |
| **Track 03**<br>Website, SEO & Loops | `09` | **Cohort Analytics Over Vanity Metrics: Closing the Loop to Strategy v2** | Evaluating 7/30/90-day cohorts, content reuse & Strategy v2 drafts |
| **Track 04**<br>Agents, MCP & Control | `10` | **Model Context Protocol (MCP) in Practice: Connecting AI Agents to Brand Context** | Four-tier, workspace-bound MCP tool surface for Claude Code, Codex & Antigravity |
| **Track 04**<br>Agents, MCP & Control | `11` | **Prepare → Confirm: Designing Safe Mutation Gates for Autonomous Agents** | Two-phase confirmation tokens preventing accidental live publications |
| **Track 04**<br>Agents, MCP & Control | `12` | **Bounded Autonomy: Credit Budgets, Quiet Hours, Channels & Kill Switches** | `draft_only`, `schedule_with_confirmation`, `autonomous_schedule` & RBAC |
| **Track 04**<br>Agents, MCP & Control | `13` | **What Is an AI Harness? From First Steps with Coding Agents to Harness Engineering** | `AGENTS.md`, progressive-disclosure skills, verification loops & [`agent-harness-kit`](https://github.com/RolePlayingTech/agent-harness-kit) |
| **Track 04**<br>Agents, MCP & Control | `14` | **MCP, Tools and Skills: Why Agent-Operable Products Will Win** | Four-tier MCP surfaces, per-operation scopes, untrusted data & [`mcp-surface-kit`](https://github.com/RolePlayingTech/mcp-surface-kit) |
| **Track 04**<br>Agents, MCP & Control | `15` | **Playwright & Multimodal Browser Verification: Giving AI Coding Agents Eyes, Hands, and Deterministic UI Contracts** | ARIA snapshots vs. VLM screenshots, `ui-contract` isolation, token-rotation session safety & [`playwright-harness-kit`](https://github.com/RolePlayingTech/playwright-harness-kit) |
| **Track 04**<br>Agents, MCP & Control | `16` | **Git Isn’t a Save Button: Version Control, Worktrees, and Safe Recovery in the Age of AI Coding Agents** | Three Trees, branches, `git worktree` isolation, catching weakened tests, safe recovery & [`git-agent-workflow-kit`](https://github.com/RolePlayingTech/git-agent-workflow-kit) |

### Operational Playbooks, Glossary & Open-Source CLI Kits

- **Playbooks (`/playbooks/`, `/pl/playbooks/`)**: 8 copy-ready YAML/JSON specifications for Brand Voice & Claim Boundaries, One-Story 4-Channel Decomposition, MCP Agent Campaign Loop Runbooks, Workspace Autonomy Governance, Agent Harness Blueprints (`agent-harness-kit`), MCP Surface Specs (`mcp-surface-kit`), Playwright Browser Verification Contracts (`playwright-harness-kit`), and Multi-Agent Git Workflow Policies (`git-agent-workflow-kit`).
- **Glossary (`/glossary/`, `/pl/glossary/`)**: Structured A–Z technical & marketing definitions with `DefinedTermSet` schema.org markup.
- **Open-Source CLI Kits (4 tools)**:
  - **[`RolePlayingTech/agent-harness-kit`](https://github.com/RolePlayingTech/agent-harness-kit)** — Scan, design, explain, build, and check coding-agent harnesses (`.harness/spec.json` → `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, and skills).
  - **[`RolePlayingTech/mcp-surface-kit`](https://github.com/RolePlayingTech/mcp-surface-kit)** — Explain, validate (`--strict`), and generate `SKILL.md` workflows from a declarative MCP product surface contract (`.mcp-surface/spec.json`).
  - **[`RolePlayingTech/playwright-harness-kit`](https://github.com/RolePlayingTech/playwright-harness-kit)** — Explain, validate (`--strict --verify-files`), and generate `SKILL.md` browser verification workflows from a declarative Playwright contract (`.playwright-harness/spec.json`).
  - **[`RolePlayingTech/git-agent-workflow-kit`](https://github.com/RolePlayingTech/git-agent-workflow-kit)** — Read-only repository diagnostics (`doctor`), pre-PR scope and test-integrity audits (`pr-ready`), non-destructive recovery plans (`recovery-plan`), 5 portable Agent Skills (`SKILL.md`), and local Git lab sandboxes (`sandbox`).

---

## Przegląd po polsku (Polish Edition)

Większość działań content marketingowych przegrywa nie z braku narzędzi do pisania, lecz dlatego, że **kontekst marki zeruje się na każdym etapie pracy**:
1. Strategia marki leży w nieotwieranym od miesięcy pliku PDF.
2. Copywriterzy i czaty AI startują od pustego okna bez znajomości źródeł i granic marki.
3. Ten sam tekst jest mechanicznie przeklejany na Instagrama, LinkedIna, X i Facebooka.
4. Strona WWW (CMS) oraz kanały społecznościowe działają w całkowitej izolacji.
5. Wykresy analityczne nie przekładają się na aktualizację strategii w kolejnym miesiącu.

**Akademia MUMRO (`academy.mumro.io/pl/`)** to otwarty, dwujęzyczny podręcznik pokazujący uniwersalne metody inżynieryjne i redakcyjne, które wdrożysz we własnym stosie narzędzi, cztery niezależne pakiety CLI open source dla warsztatu agentów kodujących i MCP oraz praktyczne przykłady tego, które elementy obiegu treści realizuje **[MUMRO](https://mumro.io/pl/)**.

### Program: 4 Ścieżki, 16 Lekcji, 8 Playbooków i 4 Otwarte Narzędzia CLI

1. **Ścieżka 01 — Żywe systemy marki i strategia treści**: Wersjonowana strategia (`v1 → v2`), inżynieria Brand Voice i twardych granic marki oraz research oparty na dowodach (`Źródło → Decyzja → Szkic`).
2. **Ścieżka 02 — Wielokanałowa inżynieria treści i publikacja**: Rozwijanie jednej historii na artykuł WWW, karuzelę 5 slajdów i 4 kanały społecznościowe oraz odporna kolejka publikacji z potwierdzeniami per kanał.
3. **Ścieżka 03 — Strona WWW, techniczne SEO i pętla rozmów**: Integracja CMS (WordPress / API), dwujęzyczne SEO, osadzone w wiedzy czatboty WWW, wspólny inbox, FAQ mining i analityka kohortowa 7/30/90 dni.
4. **Ścieżka 04 — Agenci AI, Model Context Protocol (MCP) i kontrola człowieka**: Łączenie agentów AI z kontekstem marki przez MCP, dwufazowe bramki decyzyjne `Prepare → Confirm`, 3 poziomy autonomii, inżynieria harnessu agenta kodującego (`agent-harness-kit`), projektowanie powierzchni produktów MCP (`mcp-surface-kit`), weryfikacja przeglądarkowa Playwright (`playwright-harness-kit`) oraz wieloagentowy workflow Git (`git-agent-workflow-kit`).

---

## Design System, Technical SEO & Architecture

This repository is engineered with the exact visual and technical standards of **[mumro.io](https://mumro.io)**:

- **Editorial-Technical Aesthetic**: Warm paper (`#f5f3ed`), deep ink (`#20231f`), signal accent (`#e7471b`), **Instrument Serif** display typography, **Inter** body copy, and **Cascadia Mono** technical metadata—including full Polish diacritic subsets (`woff2`).
- **Deterministic Bilingual Static HTML**: Built with **Astro 7** (`output: 'static'`). Every route exists in both English (`/`, `/tracks/.../`, `/lessons/.../`, `/playbooks/`, `/glossary/`) and Polish (`/pl/`, `/pl/tracks/.../`, `/pl/lessons/.../`, `/pl/playbooks/`, `/pl/glossary/`).
- **Compile-Time Locale Parity**: `assertLocaleParity()` validates that English and Polish content trees share identical keys, array lengths, and non-empty strings at build time.
- **Technical SEO & LLM Readiness**:
  - Self-referencing `<link rel="canonical">` and reciprocal `<link rel="alternate" hreflang="en|pl|x-default">` on every route.
  - Rich JSON-LD `@graph` (`WebSite`, `EducationalOrganization`, `Course`, `TechArticle`, `LearningResource`, `BreadcrumbList`, `DefinedTermSet`, `FAQPage`).
  - Generated 1200×630 Open Graph / Twitter share cards (`/media/share-en.png`, `/media/share-pl.png`).
  - XML Sitemap (`/sitemap.xml`) with `xhtml:link` alternates, `/robots.txt`, bilingual RSS 2.0 feeds (`/rss.xml`, `/pl/rss.xml`), `/llms.txt`, and `/llms-full.txt` (complete plain-text curriculum for AI indexers & coding agents).
  - **Interactive System Labs (`LessonLab.astro`)**: Embedded interactive simulators on every track and lesson page for inspecting Brand Voice & Source Provenance layers, 5-slide carousels, 7/30/90-day cohort windows, and two-phase MCP `Prepare → Confirm` gates.

## Repository Structure

```text
mumro-academy/
├── deploy/
│   └── academy.mumro.io.nginx.conf  # Nginx config with EN/PL negotiation & caching
├── public/
│   ├── favicon.svg
│   └── media/                       # Generated 1200x630 EN/PL Open Graph share cards & SVGs
├── scripts/
│   ├── generate-share-images.mjs
│   ├── package-release.mjs          # Deterministic release archive & SHA256 manifest builder
│   ├── share-fonts.css
│   └── verify-build.mjs             # Automated check of all 46 routes, SEO tags, JSON-LD & feeds
├── src/
│   ├── assets/fonts/                # OFL Latin + Polish woff2 font subsets
│   ├── components/                  # AcademyHome, TrackPage, LessonPage, LessonLab, PlaybooksPage, GlossaryPage
│   ├── content/                     # Bilingual EN/PL tracks, 16 lessons, 8 playbooks, glossary, tools & shell copy
│   ├── layouts/BaseLayout.astro
│   ├── lib/contracts.ts             # Locale types, URL helpers & assertLocaleParity
│   ├── pages/                       # Static EN & PL routes + sitemap.xml, robots.txt, llms.txt, llms-full.txt, rss.xml
│   ├── scripts/shell.ts             # Progressive enhancement: filters, labs, loop explorer, copy, checklist, dialog
│   └── styles/                      # fonts.css & global.css (MUMRO design tokens)
└── tests/
    └── academy.spec.ts              # Playwright E2E, bilingual parity, interactive labs & responsive tests
```

## Local Development & Verification

```bash
# Install dependencies
npm install

# Start local dev server (http://127.0.0.1:4325)
npm run dev

# Run Astro & TypeScript strict type-checking
npm run check

# Build static production output + run automated SEO & route verification
npm run build

# Run Playwright browser tests
npm test
```

## Links

- **MUMRO Academy**: [https://academy.mumro.io](https://academy.mumro.io) · [https://academy.mumro.io/pl/](https://academy.mumro.io/pl/)
- **MUMRO Platform**: [https://mumro.io](https://mumro.io) · [https://mumro.io/pl/](https://mumro.io/pl/)
- **RolePlayingTech**: [https://roleplayingtech.com](https://roleplayingtech.com)
