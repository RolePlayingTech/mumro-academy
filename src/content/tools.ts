import { assertLocaleParity, type LessonSlug } from '../lib/contracts';

export interface FeaturedLessonHighlight {
  slug: LessonSlug;
  badge: string;
  valueSummary: string;
  companionToolName: string;
  companionToolRepo: string;
  companionPlaybookNumber: string;
  readCta: string;
}

export interface OpenSourceToolCard {
  id: 'agent-harness-kit' | 'mcp-surface-kit';
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
    title: 'New deep dives: coding-agent harnesses and MCP product surfaces.',
    intro:
      'Our newest lessons bridge repository-level coding agents and workspace-scoped product APIs — each paired with a zero-dependency open-source CLI kit you can run in your own stack.',
    companionLabel: 'Companion open-source kit:',
    items: [
      {
        slug: 'ai-agent-harness-engineering',
        badge: 'NEW · HARNESS ENGINEERING',
        valueSummary:
          'How to design the environment around a coding agent — instructions (`AGENTS.md`, `CLAUDE.md`), progressive-disclosure skills (`SKILL.md`), verification loops, and hard boundaries enforced outside the model.',
        companionToolName: 'agent-harness-kit',
        companionToolRepo: 'https://github.com/RolePlayingTech/agent-harness-kit',
        companionPlaybookNumber: 'PLAYBOOK 05',
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
        readCta: 'Read Lesson 14',
      },
    ],
  },
  toolsSection: {
    eyebrow: 'OPEN-SOURCE ECOSYSTEM · ROLEPLAYINGTECH',
    title: 'Open-source CLI kits that turn Academy architecture into checkable specs.',
    intro:
      'Every architectural rule in Track 04 has a matching open-source CLI maintained by RolePlayingTech. Use them to keep your repository harness (`AGENTS.md`) and your product MCP surface (`.mcp-surface/spec.json`) verified in CI.',
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
    ],
  },
};

const pl: EcosystemContent = {
  latestSection: {
    eyebrow: 'NAJNOWSZE LEKCJE · INŻYNIERIA AGENTÓW AI',
    title: 'Nowe opracowania: harness agenta kodującego i powierzchnie produktów MCP.',
    intro:
      'Dwie najnowsze lekcje łączą świat agentów pracujących w repozytorium kodu z projektowaniem produktów sterowanych przez MCP — każda wraz z otwartym narzędziem CLI bez zewnętrznych zależności.',
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
        readCta: 'Otwórz Lekcję 14',
      },
    ],
  },
  toolsSection: {
    eyebrow: 'EKOSYSTEM OPEN SOURCE · ROLEPLAYINGTECH',
    title: 'Otwarte narzędzia CLI zamieniające architekturę Akademii w sprawdzalne kontrakty.',
    intro:
      'Każda zasada architektoniczna ze Ścieżki 04 ma odpowiadające narzędzie CLI rozwijane przez RolePlayingTech. Użyj ich, aby utrzymywać harness repozytorium (`AGENTS.md`) oraz kontrakt powierzchni MCP (`.mcp-surface/spec.json`) pod kontrolą w CI.',
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
    ],
  },
};

export const ecosystemContent = assertLocaleParity({ en, pl }, 'ecosystemContent');
