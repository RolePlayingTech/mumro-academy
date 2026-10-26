import { assertLocaleParity, type LessonSlug } from '../lib/contracts';

export interface FeaturedLessonHighlight {
  slug: LessonSlug;
  badge: string;
  valueSummary: string;
  companionToolName: string;
  companionToolRepo: string;
  companionPlaybookNumber: string;
  companionPlaybookAnchor: string;
  readCta: string;
}

export interface OpenSourceToolCard {
  id: 'agent-harness-kit' | 'mcp-surface-kit' | 'playwright-harness-kit' | 'git-agent-workflow-kit';
  badge: string;
  name: string;
  repoLabel: string;
  repoUrl: string;
  focusLabel: string;
  focus: string;
  problemLabel: string;
  problemSolved: string;
  capabilities: string[];
  cliCaption: string;
  cliPreview: string;
  relatedLessonSlug: LessonSlug;
  relatedPlaybookAnchor: string;
  relatedPlaybookLabel: string;
  githubCta: string;
  lessonCta: string;
}

export interface EcosystemContent {
  latestSection: {
    eyebrow: string;
    title: string;
    intro: string;
    companionLabel: string;
    items: FeaturedLessonHighlight[];
  };
  toolsSection: {
    eyebrow: string;
    title: string;
    intro: string;
    items: OpenSourceToolCard[];
  };
}

const en: EcosystemContent = {
  latestSection: {
    eyebrow: 'LATEST ADDITIONS · AGENTIC ENGINEERING',
    title: 'New deep dives: coding-agent harnesses, MCP product surfaces, Playwright verification, and multi-agent Git workflows.',
    intro:
      'Our newest lessons bridge repository-level coding agents, workspace-scoped MCP APIs, multimodal Playwright browser verification, and parallel Git worktree workflows — paired with four open-source CLI kits and copy-ready contracts you can run in your own stack.',
    companionLabel: 'Companion open-source kit / stack:',
    items: [
      {
        slug: 'ai-agent-harness-engineering',
        badge: 'NEW · HARNESS ENGINEERING',
        valueSummary:
          'How to design the environment around a coding agent — instructions (`AGENTS.md`, `CLAUDE.md`), progressive-disclosure skills (`SKILL.md`), verification loops, and hard boundaries enforced outside the model.',
        companionToolName: 'agent-harness-kit',
        companionToolRepo: 'https://github.com/RolePlayingTech/agent-harness-kit',
        companionPlaybookNumber: 'PLAYBOOK 05',
        companionPlaybookAnchor: '#agent-harness-kit-blueprint',
        readCta: 'Read Lesson 13',
      },
      {
        slug: 'mcp-tools-skills-and-product-surfaces',
        badge: 'NEW · MCP PRODUCT SURFACES',
        valueSummary:
          'Why products that agents can operate safely will win: designing four-tier MCP surfaces (read, draft, local-draft delete, prepare/confirm mutation), cumulative OAuth scopes, untrusted-data boundaries, and workflow skills.',
        companionToolName: 'mcp-surface-kit',
        companionToolRepo: 'https://github.com/RolePlayingTech/mcp-surface-kit',
        companionPlaybookNumber: 'PLAYBOOK 06',
        companionPlaybookAnchor: '#mcp-surface-spec',
        readCta: 'Read Lesson 14',
      },
      {
        slug: 'playwright-browser-automation-and-verification',
        badge: 'NEW · PLAYWRIGHT & MULTIMODAL QA',
        valueSummary:
          'From Selenium to Playwright and `@playwright/mcp`: why accessibility trees beat pixel-clicking for actions, when multimodal VLM screenshots are essential, and how MUMRO links GitHub Issues (`M-AUTH-01`, `M-UX-01`) to browser verification.',
        companionToolName: 'playwright-harness-kit',
        companionToolRepo: 'https://github.com/RolePlayingTech/playwright-harness-kit',
        companionPlaybookNumber: 'PLAYBOOK 07',
        companionPlaybookAnchor: '#playwright-verification-spec',
        readCta: 'Read Lesson 15',
      },
      {
        slug: 'git-and-github-for-ai-coding-agents',
        badge: 'NEW · GIT & MULTI-AGENT WORKFLOWS',
        valueSummary:
          'Why Git is not a Save button: Three Trees, branches, `git worktree` isolation for parallel agents, catching scope creep and weakened tests in PR review, non-destructive recovery, and two hands-on labs.',
        companionToolName: 'git-agent-workflow-kit',
        companionToolRepo: 'https://github.com/RolePlayingTech/git-agent-workflow-kit',
        companionPlaybookNumber: 'PLAYBOOK 08',
        companionPlaybookAnchor: '#git-agent-workflow-spec',
        readCta: 'Read Lesson 16',
      },
    ],
  },
  toolsSection: {
    eyebrow: 'OPEN-SOURCE ECOSYSTEM · ROLEPLAYINGTECH',
    title: 'Open-source CLI kits that turn Academy architecture into checkable specs.',
    intro:
      'Every architectural rule in Track 04 has a matching open-source CLI maintained by RolePlayingTech. Use them to keep your repository harness (`AGENTS.md`), your product MCP surface (`.mcp-surface/spec.json`), your browser verification contract (`.playwright-harness/spec.json`), and your multi-agent Git hygiene (`git-agent doctor` / `pr-ready`) verified in CI.',
    items: [
      {
        id: 'agent-harness-kit',
        badge: 'OPEN-SOURCE CLI · REPO HARNESS',
        name: 'Agent Harness Kit',
        repoLabel: 'RolePlayingTech/agent-harness-kit',
        repoUrl: 'https://github.com/RolePlayingTech/agent-harness-kit',
        focusLabel: 'What it covers',
        focus:
          'Repository harness specifications (`.harness/spec.json`), synchronized `AGENTS.md` / `CLAUDE.md` / `.cursor/rules` generation, and on-demand skills (`session-handoff`, `harness-maintenance`, `verify-change`).',
        problemLabel: 'Problem it solves',
        problemSolved:
          'Stops `AGENTS.md`, `CLAUDE.md`, and Cursor rules from drifting apart, bloating context windows with stale instructions, or treating prompt text as a substitute for branch protection and CI checks.',
        capabilities: [
          'Scans an existing repository (`scan`) and records seven explicit engineering decisions in `.harness/spec.json`.',
          'Explains token budget and module inclusion (`explain`), previews full diffs (`build --dry-run`), and generates synchronized agent files (`build`).',
          'Verifies harness freshness and optionally executes configured fast/full check commands in CI (`check --strict`).',
        ],
        cliCaption: 'Inspect and verify a repository harness (including this Academy repo)',
        cliPreview: `$ npx github:RolePlayingTech/agent-harness-kit explain
$ npx github:RolePlayingTech/agent-harness-kit build --dry-run
$ npx github:RolePlayingTech/agent-harness-kit check --strict`,
        relatedLessonSlug: 'ai-agent-harness-engineering',
        relatedPlaybookAnchor: '#agent-harness-kit-blueprint',
        relatedPlaybookLabel: 'Playbook 05: Harness Blueprint',
        githubCta: 'View on GitHub',
        lessonCta: 'Read Lesson 13',
      },
      {
        id: 'mcp-surface-kit',
        badge: 'OPEN-SOURCE CLI · MCP SURFACE SPEC',
        name: 'MCP Surface Kit',
        repoLabel: 'RolePlayingTech/mcp-surface-kit',
        repoUrl: 'https://github.com/RolePlayingTech/mcp-surface-kit',
        focusLabel: 'What it covers',
        focus:
          'Declarative MCP product surface contracts (`.mcp-surface/spec.json`): tool tiers (`read`, `draft`, `delete`, `mutate`), reciprocal `prepare`/`confirm` pairs, scope hierarchies, per-operation scopes, and generated `SKILL.md` workflows.',
        problemLabel: 'Problem it solves',
        problemSolved:
          'Prevents unguarded single-call live mutations, unverified destructive tools, optimistic annotation defaults, scope mismatches on multi-action endpoints, and drift between MCP tools and host skills.',
        capabilities: [
          'Validates tool tiers, reciprocal `prepare → confirm` pairs, `local_draft_only` delete guards, official MCP annotation defaults, and `operationScopes` (`check --strict`).',
          'Prints a full surface table of tiers, phases, pairs, scopes, and uncovered tools (`explain`).',
          'Safely generates validated `SKILL.md` files with SHA-256 ownership markers, symlink/traversal protection, and unified dry-run diffs (`build --dry-run`).',
        ],
        cliCaption: 'Inspect, validate, and preview skills from an MCP surface contract',
        cliPreview: `$ npx github:RolePlayingTech/mcp-surface-kit explain examples/content-workspace
$ npx github:RolePlayingTech/mcp-surface-kit check examples/content-workspace --strict
$ npx github:RolePlayingTech/mcp-surface-kit build examples/content-workspace --dry-run`,
        relatedLessonSlug: 'mcp-tools-skills-and-product-surfaces',
        relatedPlaybookAnchor: '#mcp-surface-spec',
        relatedPlaybookLabel: 'Playbook 06: MCP Surface Spec',
        githubCta: 'View on GitHub',
        lessonCta: 'Read Lesson 14',
      },
      {
        id: 'playwright-harness-kit',
        badge: 'OPEN-SOURCE CLI · BROWSER VERIFICATION',
        name: 'Playwright Harness Kit',
        repoLabel: 'RolePlayingTech/playwright-harness-kit',
        repoUrl: 'https://github.com/RolePlayingTech/playwright-harness-kit',
        focusLabel: 'What it covers',
        focus:
          'Declarative Playwright & multimodal browser verification contracts (`.playwright-harness/spec.json`), repository file evidence checks (`--verify-files`), `ui-contract` vs. `integrated` tiers, scenario IDs (`M-AUTH-01`, `M-UX-01`), token-rotation session rules, and generated `SKILL.md` files.',
        problemLabel: 'Problem it solves',
        problemSolved:
          'Helps specify and check browser verification constraints in `.playwright-harness/spec.json` — declaring semantic locator rules (`role-and-label-first`), DOM geometry invariants alongside visual rubrics, and single-use refresh-token session policies (`allowSharedStorageState: false`) — while auditing missing `.spec.ts` files, pruning orphaned `SKILL.md` files, and guiding runtime Playwright verification.',
        capabilities: [
          'Validates declared `ui-contract` origins (`new URL()`), `role-and-label-first` locator declarations, `authSessionPolicy` flags, and repository file evidence (`check --strict --verify-files`), while reporting runtime browser isolation as `not-verified` until Playwright runs.',
          'Prints a full verification matrix of tiers, scenario IDs, locator strategies, visual viewports, and `declared / observed / not-verified` evidence states (`explain --verify-files`).',
          'Generates conflict-aware `SKILL.md` browser verification workflows with SHA-256 ownership markers, unified diffs, and safe orphan cleanup (`build --dry-run --prune`).',
        ],
        cliCaption: 'Inspect, validate, and preview skills from a Playwright verification contract',
        cliPreview: `$ npx github:RolePlayingTech/playwright-harness-kit explain examples/offline-ui --verify-files
$ npx github:RolePlayingTech/playwright-harness-kit check examples/offline-ui --strict --verify-files
$ npx github:RolePlayingTech/playwright-harness-kit build examples/offline-ui --dry-run --prune`,
        relatedLessonSlug: 'playwright-browser-automation-and-verification',
        relatedPlaybookAnchor: '#playwright-verification-spec',
        relatedPlaybookLabel: 'Playbook 07: Playwright Contract',
        githubCta: 'View on GitHub',
        lessonCta: 'Read Lesson 15',
      },
      {
        id: 'git-agent-workflow-kit',
        badge: 'OPEN-SOURCE CLI · GIT & PR HYGIENE',
        name: 'Git Agent Workflow Kit',
        repoLabel: 'RolePlayingTech/git-agent-workflow-kit',
        repoUrl: 'https://github.com/RolePlayingTech/git-agent-workflow-kit',
        focusLabel: 'What it covers',
        focus:
          'Read-only repository health diagnostics (`doctor`), pre-PR scope and test-integrity audits (`pr-ready`), non-destructive recovery plans (`recovery-plan`), 5 portable Agent Skills (`SKILL.md`), and local Git lab sandboxes (`sandbox`).',
        problemLabel: 'Problem it solves',
        problemSolved:
          'Stops coding agents from committing on `main`, leaking unignored `.env` secrets, modifying files outside task scope, turning failing tests green by weakening assertions, or running destructive `reset --hard` commands.',
        capabilities: [
          'Audits active branch, `git worktree` topology, halted merges/rebases, leftover conflict markers, and `.gitignore` secret hygiene (`doctor`).',
          'Verifies PR diffs against `--allow` file globs, flags high-risk paths, and detects deleted or weakened assertions in `tests/**` (`pr-ready`).',
          'Generates step-by-step non-destructive recovery plans (`recovery-plan`), installs 5 `SKILL.md` playbooks (`skills`), and builds offline Lab A & B sandboxes (`sandbox`).',
        ],
        cliCaption: 'Diagnose repo state, verify PR scope & test integrity, and list Git agent skills',
        cliPreview: `$ npx github:RolePlayingTech/git-agent-workflow-kit doctor .
$ npx github:RolePlayingTech/git-agent-workflow-kit pr-ready . --base origin/main --allow "src/auth/**" --strict
$ npx github:RolePlayingTech/git-agent-workflow-kit skills list`,
        relatedLessonSlug: 'git-and-github-for-ai-coding-agents',
        relatedPlaybookAnchor: '#git-agent-workflow-spec',
        relatedPlaybookLabel: 'Playbook 08: Git Agent Workflow Spec',
        githubCta: 'View on GitHub',
        lessonCta: 'Read Lesson 16',
      },
    ],
  },
};

const pl: EcosystemContent = {
  latestSection: {
    eyebrow: 'NAJNOWSZE LEKCJE · INŻYNIERIA AGENTÓW AI',
    title: 'Nowe opracowania: harness agenta, powierzchnie MCP, weryfikacja Playwright i wieloagentowy Git.',
    intro:
      'Najnowsze lekcje łączą świat agentów pracujących w repozytorium kodu, projektowanie produktów sterowanych przez MCP, weryfikację przeglądarkową Playwright i modeli multimodalnych oraz izolację równoległych agentów w `git worktree` — wraz z czterema otwartymi narzędziami CLI i gotowymi kontraktami.',
    companionLabel: 'Powiązane narzędzie open source:',
    items: [
      {
        slug: 'ai-agent-harness-engineering',
        badge: 'NOWOŚĆ · HARNESS ENGINEERING',
        valueSummary:
          'Jak zaprojektować środowisko wokół agenta kodującego — instrukcje (`AGENTS.md`, `CLAUDE.md`), skille ładowane na żądanie (`SKILL.md`), pętle weryfikacji oraz twarde granice egzekwowane poza modelem.',
        companionToolName: 'agent-harness-kit',
        companionToolRepo: 'https://github.com/RolePlayingTech/agent-harness-kit',
        companionPlaybookNumber: 'PLAYBOOK 05',
        companionPlaybookAnchor: '#agent-harness-kit-blueprint',
        readCta: 'Otwórz Lekcję 13',
      },
      {
        slug: 'mcp-tools-skills-and-product-surfaces',
        badge: 'NOWOŚĆ · POWIERZCHNIE MCP',
        valueSummary:
          'Dlaczego wygrają produkty sterowalne przez agenta: projektowanie czteropoziomowych powierzchni MCP (odczyt, szkic, usuwanie lokalnego szkicu, mutacja prepare/confirm), kumulatywnych scope’ów OAuth, ochrony przed niezaufanymi danymi i skilli workflow.',
        companionToolName: 'mcp-surface-kit',
        companionToolRepo: 'https://github.com/RolePlayingTech/mcp-surface-kit',
        companionPlaybookNumber: 'PLAYBOOK 06',
        companionPlaybookAnchor: '#mcp-surface-spec',
        readCta: 'Otwórz Lekcję 14',
      },
      {
        slug: 'playwright-browser-automation-and-verification',
        badge: 'NOWOŚĆ · PLAYWRIGHT I WERYFIKACJA MULTIMODALNA',
        valueSummary:
          'Od Selenium do Playwrighta i `@playwright/mcp`: dlaczego drzewo dostępności ARIA wygrywa z klikaniem po pikselach, kiedy potrzebny jest zrzut ekranu dla modelu VLM i jak w MUMRO łączymy GitHub Issues (`M-AUTH-01`, `M-UX-01`) z testami przeglądarkowymi.',
        companionToolName: 'playwright-harness-kit',
        companionToolRepo: 'https://github.com/RolePlayingTech/playwright-harness-kit',
        companionPlaybookNumber: 'PLAYBOOK 07',
        companionPlaybookAnchor: '#playwright-verification-spec',
        readCta: 'Otwórz Lekcję 15',
      },
      {
        slug: 'git-and-github-for-ai-coding-agents',
        badge: 'NOWOŚĆ · GIT I PRACA WIELOAGENTOWA',
        valueSummary:
          'Dlaczego Git to nie przycisk „Zapisz”: trzy obszary robocze, gałęzie, izolacja równoległych agentów przez `git worktree`, wykrywanie wyjścia poza zakres i osłabionych testów w PR review, bezpieczne odzyskiwanie oraz dwa laboratoria.',
        companionToolName: 'git-agent-workflow-kit',
        companionToolRepo: 'https://github.com/RolePlayingTech/git-agent-workflow-kit',
        companionPlaybookNumber: 'PLAYBOOK 08',
        companionPlaybookAnchor: '#git-agent-workflow-spec',
        readCta: 'Otwórz Lekcję 16',
      },
    ],
  },
  toolsSection: {
    eyebrow: 'EKOSYSTEM OPEN SOURCE · ROLEPLAYINGTECH',
    title: 'Otwarte narzędzia CLI zamieniające architekturę Akademii w sprawdzalne kontrakty.',
    intro:
      'Każda zasada architektoniczna ze Ścieżki 04 ma odpowiadające narzędzie CLI rozwijane przez RolePlayingTech. Użyj ich, aby utrzymywać harness repozytorium (`AGENTS.md`), kontrakt powierzchni MCP (`.mcp-surface/spec.json`), kontrakt weryfikacji przeglądarkowej (`.playwright-harness/spec.json`) oraz higienę Git i PR-ów (`git-agent doctor` / `pr-ready`) pod kontrolą w CI.',
    items: [
      {
        id: 'agent-harness-kit',
        badge: 'OPEN-SOURCE CLI · HARNESS REPOZYTORIUM',
        name: 'Agent Harness Kit',
        repoLabel: 'RolePlayingTech/agent-harness-kit',
        repoUrl: 'https://github.com/RolePlayingTech/agent-harness-kit',
        focusLabel: 'Czego dotyczy',
        focus:
          'Specyfikacji harnessu repozytorium (`.harness/spec.json`), spójnego generowania `AGENTS.md` / `CLAUDE.md` / `.cursor/rules` oraz procedur na żądanie (`session-handoff`, `harness-maintenance`, `verify-change`).',
        problemLabel: 'Jaki problem rozwiązuje',
        problemSolved:
          'Eliminuje rozjazd między `AGENTS.md`, `CLAUDE.md` i regułami Cursora, zapobiega puchnięciu okna kontekstowego od przestarzałych instrukcji i oddziela wskazówki w prompcie od blokad w CI oraz ochronie gałęzi.',
        capabilities: [
          'Skanuje istniejące repozytorium (`scan`) i zapisuje siedem jawnych decyzji inżynieryjnych w `.harness/spec.json`.',
          'Wyjaśnia budżet tokenów i dobór modułów (`explain`), pokazuje pełny diff zmian (`build --dry-run`) i generuje zsynchronizowane pliki agentów (`build`).',
          'Sprawdza aktualność harnessu oraz opcjonalnie uruchamia zdefiniowane komendy weryfikacyjne w CI (`check --strict`).',
        ],
        cliCaption: 'Inspekcja i weryfikacja harnessu repozytorium (w tym repozytorium Akademii)',
        cliPreview: `$ npx github:RolePlayingTech/agent-harness-kit explain
$ npx github:RolePlayingTech/agent-harness-kit build --dry-run
$ npx github:RolePlayingTech/agent-harness-kit check --strict`,
        relatedLessonSlug: 'ai-agent-harness-engineering',
        relatedPlaybookAnchor: '#agent-harness-kit-blueprint',
        relatedPlaybookLabel: 'Playbook 05: Szablon Harnessu',
        githubCta: 'Repozytorium GitHub',
        lessonCta: 'Czytaj Lekcję 13',
      },
      {
        id: 'mcp-surface-kit',
        badge: 'OPEN-SOURCE CLI · KONTRAKT POWIERZCHNI MCP',
        name: 'MCP Surface Kit',
        repoLabel: 'RolePlayingTech/mcp-surface-kit',
        repoUrl: 'https://github.com/RolePlayingTech/mcp-surface-kit',
        focusLabel: 'Czego dotyczy',
        focus:
          'Deklaratywnych kontraktów powierzchni produktów MCP (`.mcp-surface/spec.json`): poziomów narzędzi (`read`, `draft`, `delete`, `mutate`), wzajemnych par `prepare`/`confirm`, hierarchii scope’ów, uprawnień per operacja i generowanych plików `SKILL.md`.',
        problemLabel: 'Jaki problem rozwiązuje',
        problemSolved:
          'Chroni przed wystawieniem żywych mutacji w jednym wywołaniu, niezabezpieczonym usuwaniem, zbyt optymistycznymi domyślnymi adnotacjami MCP, lukami w uprawnieniach dla narzędzi wieloakcyjnych oraz rozjazdem między listą narzędzi a skillami.',
        capabilities: [
          'Waliduje poziomy narzędzi, wzajemność par `prepare → confirm`, strażnika `local_draft_only` dla `delete`, oficjalne wartości domyślne adnotacji MCP oraz `operationScopes` (`check --strict`).',
          'Drukuje pełny raport powierzchni: poziomy, fazy, pary, scope’y oraz narzędzia nieobjęte żadnym skillem (`explain`).',
          'Bezpiecznie generuje zwalidowane pliki `SKILL.md` ze znacznikami własności SHA-256, ochroną przed symlinkami/path traversal i podglądem diff (`build --dry-run`).',
        ],
        cliCaption: 'Inspekcja, walidacja i podgląd generowanych skilli z kontraktu powierzchni MCP',
        cliPreview: `$ npx github:RolePlayingTech/mcp-surface-kit explain examples/content-workspace
$ npx github:RolePlayingTech/mcp-surface-kit check examples/content-workspace --strict
$ npx github:RolePlayingTech/mcp-surface-kit build examples/content-workspace --dry-run`,
        relatedLessonSlug: 'mcp-tools-skills-and-product-surfaces',
        relatedPlaybookAnchor: '#mcp-surface-spec',
        relatedPlaybookLabel: 'Playbook 06: Kontrakt MCP',
        githubCta: 'Repozytorium GitHub',
        lessonCta: 'Czytaj Lekcję 14',
      },
      {
        id: 'playwright-harness-kit',
        badge: 'OPEN-SOURCE CLI · WERYFIKACJA PRZEGLĄDARKOWA',
        name: 'Playwright Harness Kit',
        repoLabel: 'RolePlayingTech/playwright-harness-kit',
        repoUrl: 'https://github.com/RolePlayingTech/playwright-harness-kit',
        focusLabel: 'Czego dotyczy',
        focus:
          'Deklaratywnych kontraktów weryfikacji przeglądarkowej i multimodalnej (`.playwright-harness/spec.json`), weryfikacji dowodów w plikach repozytorium (`--verify-files`), warstw `ui-contract` i `integrated`, identyfikatorów scenariuszy (`M-AUTH-01`, `M-UX-01`), polityki sesji przy rotacji tokenów oraz generowanych plików `SKILL.md`.',
        problemLabel: 'Jaki problem rozwiązuje',
        problemSolved:
          'Pomaga wyspecyfikować i statycznie sprawdzić ograniczenia weryfikacji w `.playwright-harness/spec.json` — deklaracje lokatorów semantycznych (`role-and-label-first`), niezmienników geometrii DOM obok rubryk wizualnych oraz reguł sesji przy rotacji refresh tokenów (`allowSharedStorageState: false`) — a także wykrywa brakujące pliki `.spec.ts`, czyści osierocone `SKILL.md` i prowadzi właściwą weryfikację uruchomieniową w Playwright.',
        capabilities: [
          'Waliduje zadeklarowane originy `ui-contract` (`new URL()`), deklaracje lokatorów (`role-and-label-first`), flagi `authSessionPolicy` oraz dowody w plikach repozytorium (`check --strict --verify-files`), jawnie oznaczając izolację sieci i sesji w przeglądarce jako `not-verified` do czasu uruchomienia testów Playwright.',
          'Drukuje pełną matrycę weryfikacji: warstwy, identyfikatory scenariuszy, strategie lokatorów, rozdzielczości wizualne i stany dowodów `declared / observed / not-verified` (`explain --verify-files`).',
          'Bezpiecznie generuje pliki `SKILL.md` dla weryfikacji przeglądarkowej ze znacznikami SHA-256, podglądem diff i bezpiecznym usuwaniem sierot (`build --dry-run --prune`).',
        ],
        cliCaption: 'Inspekcja, walidacja i podgląd generowanych skilli z kontraktu weryfikacji Playwright',
        cliPreview: `$ npx github:RolePlayingTech/playwright-harness-kit explain examples/offline-ui --verify-files
$ npx github:RolePlayingTech/playwright-harness-kit check examples/offline-ui --strict --verify-files
$ npx github:RolePlayingTech/playwright-harness-kit build examples/offline-ui --dry-run --prune`,
        relatedLessonSlug: 'playwright-browser-automation-and-verification',
        relatedPlaybookAnchor: '#playwright-verification-spec',
        relatedPlaybookLabel: 'Playbook 07: Kontrakt Playwright',
        githubCta: 'Repozytorium GitHub',
        lessonCta: 'Czytaj Lekcję 15',
      },
      {
        id: 'git-agent-workflow-kit',
        badge: 'OPEN-SOURCE CLI · GIT I HIGIENA PR',
        name: 'Git Agent Workflow Kit',
        repoLabel: 'RolePlayingTech/git-agent-workflow-kit',
        repoUrl: 'https://github.com/RolePlayingTech/git-agent-workflow-kit',
        focusLabel: 'Czego dotyczy',
        focus:
          'Nieinwazyjnej diagnostyki stanu repozytorium (`doctor`), audytu zakresu zmian i integralności testów przed PR (`pr-ready`), bezpiecznych planów ratunkowych (`recovery-plan`), 5 przenośnych skilli (`SKILL.md`) oraz lokalnych piaskownic ćwiczeniowych (`sandbox`).',
        problemLabel: 'Jaki problem rozwiązuje',
        problemSolved:
          'Powstrzymuje agentów kodujących przed commitowaniem na `main`, wyciekiem niezignorowanych sekretów `.env`, modyfikacją plików spoza zakresu zadania, „zazielenianiem” testów przez osłabianie asercji oraz uruchamianiem destrukcyjnego `reset --hard`.',
        capabilities: [
          'Bada aktywną gałąź, topologię `git worktree`, zatrzymane operacje merge/rebase, pozostawione znaczniki konfliktu oraz higienę `.gitignore` (`doctor`).',
          'Weryfikuje diff PR-a względem wzorców `--allow`, oznacza ścieżki wysokiego ryzyka i wykrywa usunięte lub osłabione asercje w `tests/**` (`pr-ready`).',
          'Generuje nieinwazyjne plany ratunkowe (`recovery-plan`), instaluje 5 skilli `SKILL.md` (`skills`) i buduje lokalne piaskownice Lab A i Lab B (`sandbox`).',
        ],
        cliCaption: 'Diagnostyka stanu repozytorium, weryfikacja zakresu PR i przegląd skilli Git',
        cliPreview: `$ npx github:RolePlayingTech/git-agent-workflow-kit doctor .
$ npx github:RolePlayingTech/git-agent-workflow-kit pr-ready . --base origin/main --allow "src/auth/**" --strict
$ npx github:RolePlayingTech/git-agent-workflow-kit skills list`,
        relatedLessonSlug: 'git-and-github-for-ai-coding-agents',
        relatedPlaybookAnchor: '#git-agent-workflow-spec',
        relatedPlaybookLabel: 'Playbook 08: Workflow Git Agentów',
        githubCta: 'Repozytorium GitHub',
        lessonCta: 'Czytaj Lekcję 16',
      },
    ],
  },
};

export const ecosystemContent = assertLocaleParity({ en, pl }, 'ecosystemContent');
