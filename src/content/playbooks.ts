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
      templateCode: `// MUMRO Academy — Safe Agentic Content Loop (MCP Runbook)

// 1. Ground in live workspace state & strategy (Read-Only)
1. call get_workspace_context({ "workspace": "fieldwork" })
2. call get_content_strategy({ "workspace": "fieldwork" })
3. call get_analytics_overview({ "workspace": "fieldwork", "windowDays": 30 })
4. call list_content_performance({ "workspace": "fieldwork", "windowDays": 30 })

// 2. Check upcoming queue slots & channel capabilities (Read-Only)
5. call get_publication_capabilities({ "workspace": "fieldwork" })
6. call preview_schedule({ "workspace": "fieldwork", "channel": "instagram" })

// 3. Create visible workspace draft (Safe Workspace Write — Never Publishes Live)
7. call create_publication_draft({
     "workspace": "fieldwork",
     "channel": "instagram",
     "caption": "Two days. Four litres...",
     "mediaIds": ["media_drift4l_carousel"]
   })

// 4. Two-Phase Mutation Gate (Prepare Preview -> Human/Policy Confirm)
8. call prepare_publication_action({
     "draftId": "draft_id_from_step_7",
     "action": "schedule",
     "scheduledAt": "2026-10-11T18:00:00Z"
   })
   // -> Pause and present preview (channel, exact text, slot) to human operator
9. call confirm_publication_action({
     "confirmationToken": "token_from_step_8"
   })`,
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
      title: 'Dual-Mode AI Agent Harness Blueprint (`AGENTS.md` + Testing-vs-Context Profiles + `agent-harness-kit` v2.0)',
      subtitle: 'Copy-ready <60-line AGENTS.md routing map, 6 modular skills (Greenfield & Brownfield), and CLI commands from RolePlayingTech/agent-harness-kit v2.0.',
      whenToUse: 'At the very start of any new software repository (Path A: Greenfield) or when onboarding AI agents onto an existing codebase (Path B: Brownfield).',
      mumroBenefit: 'Pairs seamlessly with MUMRO’s MCP tools and skills (`mumro-analyze-performance`, `mumro-plan-campaign`, `mumro-publish-content`) so coding and marketing agents operate with clean context and deterministic gates.',
      templateFormat: 'Markdown Blueprint + CLI v2.0',
      templateCode: `# 1. Dual-Mode CLI Bootstrap (RolePlayingTech/agent-harness-kit v2.0)
# npx github:RolePlayingTech/agent-harness-kit inspect .
# npx github:RolePlayingTech/agent-harness-kit plan .
# npx github:RolePlayingTech/agent-harness-kit init . --profile smart-tiered --blueprint
# npx github:RolePlayingTech/agent-harness-kit verify . --strict

# 2. Root AGENTS.md (<60 lines — Progressive Disclosure Routing Map)
## Project Identity & Stack
- **System:** [1-sentence summary of your system]
- **Stack:** TypeScript, Node.js 22, Astro / Next.js, Playwright
- **Testing Profile:** \`smart-tiered\` (~800–1,500 tokens/turn) | Security: \`tier-2-network-dev\`

## Deterministic Verification Loop (Mandatory Before Completing Any Task)
1. **Inner Loop (Every Edit):** \`npx tsc --noEmit\` + targeted unit test for touched file
2. **Outer Gate (Task Completion):** \`npm run build && npx playwright test\`
3. **Harness Budget & Schema Gate:** \`npx github:RolePlayingTech/agent-harness-kit verify . --strict\`

## Context Hygiene, Subagents & 3-Strike Circuit Breaker
- **60% Context Ceiling:** Treat context window as working RAM; never dump whole large files.
- **Scout Subagents:** Delegate >4-file exploration to an isolated \`research\` subagent (<250-word digest).
- **3-Strike Repair Circuit Breaker:** Max 3 consecutive auto-repair attempts per failing test before logging in \`HANDOFF.md\` and escalating.

## Progressive Disclosure Map (6 On-Demand Skills)
- Master Dual-Mode Router (Path A / Path B) → \`.agents/skills/harness-architect/SKILL.md\`
- Path A: Greenfield Product & Stack Advisor → \`.agents/skills/greenfield-advisor/SKILL.md\`
- Path B: Brownfield Silent Repo Reconnaissance → \`.agents/skills/brownfield-onboarder/SKILL.md\`
- Testing Depth vs. Context Token Advisor → \`.agents/skills/testing-tradeoffs/SKILL.md\`
- Context Hygiene & 7 Crisis Playbooks → \`.agents/skills/context-hygiene/SKILL.md\`
- Default-FAIL Evaluator & 3-Strike Circuit Breaker → \`.agents/skills/verification-loop/SKILL.md\`

## Hard Guardrails (Red Lines — Require Human Confirmation)
- NEVER overwrite user-customized \`AGENTS.md\` or \`SKILL.md\` without explicit \`--force\`.
- NEVER mark a task \`verified\` in \`feature_list.json\` until its deterministic command exits \`0\`.`,
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
      templateCode: `// Akademia MUMRO — Bezpieczna Pętla Agenta AI (Runbook MCP)

// 1. Odczyt kontekstu przestrzeni i aktywnej strategii (Tylko odczyt)
1. call get_workspace_context({ "workspace": "fieldwork" })
2. call get_content_strategy({ "workspace": "fieldwork" })
3. call get_analytics_overview({ "workspace": "fieldwork", "windowDays": 30 })
4. call list_content_performance({ "workspace": "fieldwork", "windowDays": 30 })

// 2. Sprawdzenie możliwości kanałów i wolnych okien w harmonogramie (Tylko odczyt)
5. call get_publication_capabilities({ "workspace": "fieldwork" })
6. call preview_schedule({ "workspace": "fieldwork", "channel": "instagram" })

// 3. Zapis widocznego szkicu w workspace (Bezpieczny zapis — nie publikuje na żywo)
7. call create_publication_draft({
     "workspace": "fieldwork",
     "channel": "instagram",
     "caption": "Dwa dni. Cztery litry...",
     "mediaIds": ["media_drift4l_carousel"]
   })

// 4. Dwufazowa bramka decyzyjna (Prepare Podgląd -> Zgoda Człowieka -> Confirm)
8. call prepare_publication_action({
     "draftId": "draft_id_from_step_7",
     "action": "schedule",
     "scheduledAt": "2026-10-11T18:00:00Z"
   })
   // -> Zatrzymaj i pokaż podgląd (kanał, pełny tekst, termin) do akceptacji człowieka
9. call confirm_publication_action({
     "confirmationToken": "token_from_step_8"
   })`,
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
      title: 'Dwutrybowy Szablon AI Harnessu (`AGENTS.md` + Profile Testy vs Kontekst + `agent-harness-kit` v2.0)',
      subtitle: 'Gotowa mapa AGENTS.md (<60 linii), 6 modułowych skilli (Greenfield i Brownfield) oraz komendy CLI z repozytorium RolePlayingTech/agent-harness-kit v2.0.',
      whenToUse: 'Jako pierwszy krok przy zakładaniu nowego projektu od zera (Ścieżka A: Greenfield) lub przy podłączaniu agenta do istniejącego repozytorium (Ścieżka B: Brownfield).',
      mumroBenefit: 'Współpracuje natywnie z narzędziami MCP i skillami MUMRO (`mumro-analyze-performance`, `mumro-plan-campaign`, `mumro-publish-content`), zapewniając czysty kontekst i deterministyczne bramki.',
      templateFormat: 'Szablon Markdown + CLI v2.0',
      templateCode: `# 1. Dwutrybowy start CLI (RolePlayingTech/agent-harness-kit v2.0)
# npx github:RolePlayingTech/agent-harness-kit inspect .
# npx github:RolePlayingTech/agent-harness-kit plan .
# npx github:RolePlayingTech/agent-harness-kit init . --profile smart-tiered --blueprint
# npx github:RolePlayingTech/agent-harness-kit verify . --strict

# 2. Główny plik AGENTS.md (<60 linii — Mapa Progressive Disclosure)
## Tożsamość Projektu i Stack
- **System:** [1-zdaniowy opis Twojego systemu]
- **Stack:** TypeScript, Node.js 22, Astro / Next.js, Playwright
- **Profil Testów:** \`smart-tiered\` (~800–1 500 tokenów/turę) | Bezpieczeństwo: \`tier-2-network-dev\`

## Deterministyczna Pętla Weryfikacji (Obowiązkowa przed zakończeniem zadania)
1. **Pętla wewnętrzna (po edycji):** \`npx tsc --noEmit\` + 1 celowany test dotkniętego pliku
2. **Bramka końcowa (przed zamknięciem):** \`npm run build && npx playwright test\`
3. **Weryfikator budżetu i schematu:** \`npx github:RolePlayingTech/agent-harness-kit verify . --strict\`

## Higiena Kontekstu, Subagenci i Bezpiecznik 3 Prób
- **Pułap 60% kontekstu:** Traktuj okno kontekstowe jak pamięć RAM; nie wklejaj całych dużych plików.
- **Subagenci-Zwiadowcy:** Eksplorację >4 plików deleguj do subagenta \`research\` (synteza <250 słów).
- **Bezpiecznik 3 Prób (3-Strike Circuit Breaker):** Maksymalnie 3 próby samonaprawy tego samego testu przed zapisem w \`HANDOFF.md\` i pytaniem do człowieka.

## Mapa Progressive Disclosure (6 Skilli Ładowanych na Żądanie)
- Główny Router Dwutrybowy (Ścieżka A / B) → \`.agents/skills/harness-architect/SKILL.md\`
- Ścieżka A: Doradca Produktu i Stacku (Greenfield) → \`.agents/skills/greenfield-advisor/SKILL.md\`
- Ścieżka B: Cichy Skan Istniejącego Repo (Brownfield) → \`.agents/skills/brownfield-onboarder/SKILL.md\`
- Doradca Kompromisów: Testy vs Kontekst → \`.agents/skills/testing-tradeoffs/SKILL.md\`
- Higiena Kontekstu i 7 Scenariuszy Kryzysowych → \`.agents/skills/context-hygiene/SKILL.md\`
- Pętla Default-FAIL i Bezpiecznik 3 Prób → \`.agents/skills/verification-loop/SKILL.md\`

## Twarde Bezpieczniki (Czerwone Linie — Wymagają Zgody Człowieka)
- NIGDY nie nadpisuj zmodyfikowanych przez użytkownika plików \`AGENTS.md\` lub \`SKILL.md\` bez flagi \`--force\`.
- NIGDY nie zmieniaj statusu zadania na \`verified\` w \`feature_list.json\`, dopóki komenda testowa nie zwróci kodu \`0\`.`,
    },
  ] satisfies PlaybookItem[],
};

export const playbooksContent = assertLocaleParity({ en, pl }, 'playbooksContent');
