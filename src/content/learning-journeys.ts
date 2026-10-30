import { assertLocaleParity, lessonSlugs, type LessonSlug } from '../lib/contracts';

export interface LearningJourney {
  id: 'brand-content' | 'agent-ops' | 'agent-engineering';
  title: string;
  audience: string;
  promise: string;
  deliverable: string;
  lessonSlugs: LessonSlug[];
}

export interface LessonPractice {
  objective: string;
  assignment: string;
  evidence: string;
  prerequisites: LessonSlug[];
}

/** Curated role-based routes across the existing tracks; lesson numbers and URLs remain stable. */
const enJourneys: LearningJourney[] = [
  {
    "id": "brand-content",
    "title": "Brand & content strategy",
    "audience": "For strategists, founders and content leads",
    "promise": "Build a complete research-to-publishing loop before adding autonomy.",
    "deliverable": "Portfolio: strategy brief, source ledger, channel plan and an evidence-based next iteration.",
    "lessonSlugs": [
      "versioned-brand-strategy",
      "brand-voice-architecture",
      "evidence-led-research-pipelines",
      "one-story-multi-channel-architecture",
      "carousel-and-visual-storytelling",
      "reliable-publishing-queues-and-cadence",
      "content-hub-and-cms-architecture",
      "grounded-website-assistants-and-faq-mining",
      "cohort-analytics-and-strategy-iteration"
    ]
  },
  {
    "id": "agent-ops",
    "title": "AI agents for content operations",
    "audience": "For marketing operators and automation leads",
    "promise": "Learn how agents use trusted context and why every write operation needs explicit controls.",
    "deliverable": "Portfolio: sourced brief, MCP tool map, approval flow and workspace autonomy policy.",
    "lessonSlugs": [
      "evidence-led-research-pipelines",
      "mcp-for-marketing-and-content-systems",
      "two-phase-commit-for-ai-agents",
      "autonomy-levels-and-guardrails",
      "mcp-tools-skills-and-product-surfaces"
    ]
  },
  {
    "id": "agent-engineering",
    "title": "AI product & coding-agent engineering",
    "audience": "For developers, technical founders and AI engineers",
    "promise": "Go from a reliable coding-agent setup to a checkable MCP product surface, browser verification harness and isolated multi-agent Git workflow.",
    "deliverable": "Portfolio: agent harness, tool contracts, authorization tests, recovery runbook, browser verification suite and multi-agent Git workflow gate.",
    "lessonSlugs": [
      "ai-agent-harness-engineering",
      "mcp-for-marketing-and-content-systems",
      "mcp-tools-skills-and-product-surfaces",
      "two-phase-commit-for-ai-agents",
      "autonomy-levels-and-guardrails",
      "playwright-browser-automation-and-verification",
      "git-and-github-for-ai-coding-agents",
      "webmcp-agent-operable-web-applications"
    ]
  }
];
const plJourneys: LearningJourney[] = [
  {
    "id": "brand-content",
    "title": "Strategia marki i content",
    "audience": "Dla strategów, founderów i osób prowadzących content",
    "promise": "Zbuduj pełny proces od strategii i źródeł do publikacji oraz analizy, zanim włączysz automatyzację.",
    "deliverable": "Portfolio: brief strategiczny, rejestr źródeł, plan kanałów i decyzja o kolejnej iteracji.",
    "lessonSlugs": [
      "versioned-brand-strategy",
      "brand-voice-architecture",
      "evidence-led-research-pipelines",
      "one-story-multi-channel-architecture",
      "carousel-and-visual-storytelling",
      "reliable-publishing-queues-and-cadence",
      "content-hub-and-cms-architecture",
      "grounded-website-assistants-and-faq-mining",
      "cohort-analytics-and-strategy-iteration"
    ]
  },
  {
    "id": "agent-ops",
    "title": "Agenci AI w operacjach treści",
    "audience": "Dla osób wdrażających automatyzację i agentów w marketingu",
    "promise": "Zrozum, skąd agenci biorą kontekst i jak bezpiecznie ograniczać działania zmieniające dane.",
    "deliverable": "Portfolio: brief ze źródłami, mapa narzędzi MCP, proces zgód i polityka autonomii.",
    "lessonSlugs": [
      "evidence-led-research-pipelines",
      "mcp-for-marketing-and-content-systems",
      "two-phase-commit-for-ai-agents",
      "autonomy-levels-and-guardrails",
      "mcp-tools-skills-and-product-surfaces"
    ]
  },
  {
    "id": "agent-engineering",
    "title": "Inżynieria produktów i agentów AI",
    "audience": "Dla programistów, technicznych founderów i inżynierów AI",
    "promise": "Przejdź od stabilnego środowiska agenta kodującego do testowalnego interfejsu MCP, weryfikacji przeglądarkowej w Playwright i izolowanego workflowu Git dla wielu agentów.",
    "deliverable": "Portfolio: harness agenta, kontrakty narzędzi, testy autoryzacji, procedura odzyskiwania, zestaw testów przeglądarkowych i bramka PR dla wielu agentów.",
    "lessonSlugs": [
      "ai-agent-harness-engineering",
      "mcp-for-marketing-and-content-systems",
      "mcp-tools-skills-and-product-surfaces",
      "two-phase-commit-for-ai-agents",
      "autonomy-levels-and-guardrails",
      "playwright-browser-automation-and-verification",
      "git-and-github-for-ai-coding-agents",
      "webmcp-agent-operable-web-applications"
    ]
  }
];
export const learningJourneys = assertLocaleParity({ en: enJourneys, pl: plJourneys }, 'learningJourneys');

const enPractice: Record<LessonSlug, LessonPractice> = {
  "webmcp-agent-operable-web-applications": {
    "objective": "Expose safe, read-only browser tools with WebMCP while keeping an accessible HTML fallback and backend authorization.",
    "assignment": "Build a self-contained HTML + JavaScript page on five synthetic records with a manual filter UI, one feature-gated read-only Imperative WebMCP tool, runtime input validation, an unsupported-browser fallback and a prompt-injection threat model.",
    "evidence": "A runnable synthetic HTML/JS demo, a verified tool contract, a five-row test table, two architecture decisions and a 10-point self-review rubric.",
    "prerequisites": [
      "mcp-tools-skills-and-product-surfaces",
      "playwright-browser-automation-and-verification"
    ]
  },
  "versioned-brand-strategy": {
    "objective": "Define an executable brand strategy.",
    "assignment": "Write a one-page strategy contract: audience, three pillars, channel roles and a 30-day hypothesis.",
    "evidence": "A versioned one-page brief with a measurable success criterion.",
    "prerequisites": []
  },
  "brand-voice-architecture": {
    "objective": "Turn vague tone into enforceable rules.",
    "assignment": "Create five voice rules, five prohibited claims and two before/after rewrites.",
    "evidence": "A voice specification that a colleague can use to reject an off-brand draft.",
    "prerequisites": [
      "versioned-brand-strategy"
    ]
  },
  "evidence-led-research-pipelines": {
    "objective": "Separate claims from their evidence.",
    "assignment": "Build a ledger of five credible sources with dates, claims and usage limits.",
    "evidence": "A source-to-claim table and one research brief.",
    "prerequisites": [
      "versioned-brand-strategy"
    ]
  },
  "one-story-multi-channel-architecture": {
    "objective": "Adapt one story without copying captions.",
    "assignment": "Use the research brief to outline an article and draft two platform-native posts; explain each adaptation.",
    "evidence": "An article outline, two posts and a channel-rationale note.",
    "prerequisites": [
      "brand-voice-architecture",
      "evidence-led-research-pipelines"
    ]
  },
  "carousel-and-visual-storytelling": {
    "objective": "Design a coherent visual story.",
    "assignment": "Storyboard five slides from hook to proof and next action; flag every unsupported claim.",
    "evidence": "A five-slide storyboard with source references.",
    "prerequisites": [
      "one-story-multi-channel-architecture"
    ]
  },
  "reliable-publishing-queues-and-cadence": {
    "objective": "Make publishing failures recoverable.",
    "assignment": "Diagram queued, delivered, failed and retry states for three destinations; include receipt IDs.",
    "evidence": "A publishing runbook with retry and approval rules.",
    "prerequisites": [
      "one-story-multi-channel-architecture"
    ]
  },
  "content-hub-and-cms-architecture": {
    "objective": "Connect search and social to an owned destination.",
    "assignment": "Review a sample bilingual article for canonical, hreflang, structured data and social links.",
    "evidence": "A CMS release checklist and an example tracked distribution link.",
    "prerequisites": [
      "one-story-multi-channel-architecture"
    ]
  },
  "grounded-website-assistants-and-faq-mining": {
    "objective": "Ground responses in a real knowledge base.",
    "assignment": "Write ten visitor questions with evidence-based answers, escalation rules and consent boundaries.",
    "evidence": "An assistant QA sheet with safe fallbacks and three FAQ topics.",
    "prerequisites": [
      "evidence-led-research-pipelines",
      "content-hub-and-cms-architecture"
    ]
  },
  "cohort-analytics-and-strategy-iteration": {
    "objective": "Use performance to make a decision.",
    "assignment": "Compare a 7/30/90-day sample cohort and draft one keep/change/stop decision for strategy v2.",
    "evidence": "A decision memo with metric definitions and one falsifiable next hypothesis.",
    "prerequisites": [
      "reliable-publishing-queues-and-cadence",
      "content-hub-and-cms-architecture"
    ]
  },
  "mcp-for-marketing-and-content-systems": {
    "objective": "Map what an agent may read and change.",
    "assignment": "Define read-only context tools, mutation tools and required scopes for a sample workspace.",
    "evidence": "An MCP tool inventory with one safe read flow.",
    "prerequisites": []
  },
  "two-phase-commit-for-ai-agents": {
    "objective": "Separate proposed actions from authorization.",
    "assignment": "Design prepare, preview, confirm and refusal steps for two write operations.",
    "evidence": "A mutation sequence diagram and two rejected-action test cases.",
    "prerequisites": [
      "mcp-for-marketing-and-content-systems"
    ]
  },
  "autonomy-levels-and-guardrails": {
    "objective": "Set boundaries for delegated work.",
    "assignment": "Create a policy matrix for draft-only, confirmed scheduling and delegated scheduling; add budgets, quiet hours and stop rules.",
    "evidence": "A reviewable governance policy with failure-handling rules.",
    "prerequisites": [
      "two-phase-commit-for-ai-agents"
    ]
  },
  "ai-agent-harness-engineering": {
    "objective": "Build a reproducible coding-agent environment.",
    "assignment": "Write a compact repository agent guide and one on-demand skill; specify checks for a deliberately failing change.",
    "evidence": "A minimal harness and a reproducible verification checklist.",
    "prerequisites": []
  },
  "mcp-tools-skills-and-product-surfaces": {
    "objective": "Specify an agent-operable product without over-permissioning it.",
    "assignment": "Define four MCP tools, least-privilege scopes, untrusted inputs and one forbidden mutation test.",
    "evidence": "A checkable MCP surface contract plus a denial test.",
    "prerequisites": [
      "mcp-for-marketing-and-content-systems"
    ]
  },
  "playwright-browser-automation-and-verification": {
    "objective": "Verify browser flows and mobile layout with an isolated Playwright harness.",
    "assignment": "Write an offline ui-contract Playwright test with role/label locators, a 390px overflow check and a failing HTTP 503 form-recovery assertion.",
    "evidence": "A runnable .spec.ts test, a 390×844 screenshot rubric and a validated browser verification contract.",
    "prerequisites": [
      "ai-agent-harness-engineering",
      "mcp-tools-skills-and-product-surfaces"
    ]
  },
  "git-and-github-for-ai-coding-agents": {
    "objective": "Isolate parallel coding agents in Git worktrees and gate PR scope and test integrity.",
    "assignment": "Run two parallel task branches in separate Git worktrees, enforce an explicit file-scope allowlist and test-integrity check before PR, and practice a non-destructive revert on a faulty merge.",
    "evidence": "A worktree topology checklist, a passing pre-PR scope and test-integrity report and a non-destructive Git recovery runbook.",
    "prerequisites": [
      "ai-agent-harness-engineering",
      "playwright-browser-automation-and-verification"
    ]
  }
};
const plPractice: Record<LessonSlug, LessonPractice> = {
  "webmcp-agent-operable-web-applications": {
    "objective": "Udostępnij bezpieczne narzędzia odczytu w przeglądarce przez WebMCP z zachowaniem dostępnego UI w HTML i autoryzacji w backendzie.",
    "assignment": "Zbuduj samodzielną stronę HTML + JavaScript na pięciu fikcyjnych rekordach z ręcznym filtrem UI, jednym warunkowo rejestrowanym narzędziem odczytu WebMCP, walidacją w runtime, obsługą braku WebMCP i modelem zagrożeń prompt injection.",
    "evidence": "Działający plik HTML/JS na danych syntetycznych, kontrakt narzędzia, pięciowierszowa tabela testów, dwie decyzje architektoniczne i ocena według rubryki /10.",
    "prerequisites": [
      "mcp-tools-skills-and-product-surfaces",
      "playwright-browser-automation-and-verification"
    ]
  },
  "versioned-brand-strategy": {
    "objective": "Zdefiniuj strategię marki, którą da się stosować.",
    "assignment": "Spisz jednostronicowy kontrakt: odbiorcy, trzy filary, role kanałów i hipoteza na 30 dni.",
    "evidence": "Wersjonowany brief z mierzalnym kryterium sukcesu.",
    "prerequisites": []
  },
  "brand-voice-architecture": {
    "objective": "Zamień ogólniki o tonie na sprawdzalne reguły.",
    "assignment": "Zapisz pięć zasad głosu marki, pięć niedozwolonych obietnic i dwa przykłady przed/po.",
    "evidence": "Specyfikacja, na podstawie której ktoś inny odrzuci tekst niezgodny z marką.",
    "prerequisites": [
      "versioned-brand-strategy"
    ]
  },
  "evidence-led-research-pipelines": {
    "objective": "Oddziel twierdzenia od dowodów.",
    "assignment": "Stwórz rejestr pięciu wiarygodnych źródeł z datami, twierdzeniami i ograniczeniami wykorzystania.",
    "evidence": "Tabela źródło–twierdzenie oraz krótki brief researchowy.",
    "prerequisites": [
      "versioned-brand-strategy"
    ]
  },
  "one-story-multi-channel-architecture": {
    "objective": "Dopasuj jedną historię do różnych kanałów.",
    "assignment": "Na podstawie briefu zrób plan artykułu i dwa różne posty natywne dla kanałów; uzasadnij różnice.",
    "evidence": "Plan artykułu, dwa posty i notatka o funkcji każdego kanału.",
    "prerequisites": [
      "brand-voice-architecture",
      "evidence-led-research-pipelines"
    ]
  },
  "carousel-and-visual-storytelling": {
    "objective": "Zaprojektuj spójną opowieść wizualną.",
    "assignment": "Rozpisz pięć slajdów od haka do dowodu i kolejnego kroku; oznacz twierdzenia bez źródeł.",
    "evidence": "Storyboard pięciu slajdów z odniesieniami do źródeł.",
    "prerequisites": [
      "one-story-multi-channel-architecture"
    ]
  },
  "reliable-publishing-queues-and-cadence": {
    "objective": "Zaprojektuj publikację odporną na awarie.",
    "assignment": "Rozrysuj stany kolejki, dostarczenia, błędu i ponowienia dla trzech kanałów; uwzględnij potwierdzenia.",
    "evidence": "Runbook publikacji z zasadami ponawiania i akceptacji.",
    "prerequisites": [
      "one-story-multi-channel-architecture"
    ]
  },
  "content-hub-and-cms-architecture": {
    "objective": "Połącz SEO i dystrybucję z własną stroną.",
    "assignment": "Sprawdź przykładowy dwujęzyczny artykuł: canonical, hreflang, dane strukturalne i linki w social mediach.",
    "evidence": "Checklista wdrożenia CMS i przykład linku z pomiarem źródła ruchu.",
    "prerequisites": [
      "one-story-multi-channel-architecture"
    ]
  },
  "grounded-website-assistants-and-faq-mining": {
    "objective": "Odpowiadaj na podstawie wiedzy, nie domysłów.",
    "assignment": "Spisz dziesięć pytań odwiedzających, odpowiedzi ze źródłami, reguły eskalacji i granice zgód.",
    "evidence": "Arkusz QA asystenta z bezpiecznymi odpowiedziami i trzema tematami FAQ.",
    "prerequisites": [
      "evidence-led-research-pipelines",
      "content-hub-and-cms-architecture"
    ]
  },
  "cohort-analytics-and-strategy-iteration": {
    "objective": "Zamień wyniki w decyzję strategiczną.",
    "assignment": "Porównaj przykładowe kohorty 7/30/90 dni i zaproponuj decyzję utrzymaj/zmień/zakończ dla strategii v2.",
    "evidence": "Notatka decyzyjna z definicjami metryk i falsyfikowalną hipotezą.",
    "prerequisites": [
      "reliable-publishing-queues-and-cadence",
      "content-hub-and-cms-architecture"
    ]
  },
  "mcp-for-marketing-and-content-systems": {
    "objective": "Rozpisz uprawnienia agenta do danych i działań.",
    "assignment": "Zdefiniuj narzędzia odczytu, narzędzia zmieniające stan i wymagane zakresy uprawnień.",
    "evidence": "Mapa narzędzi MCP z przykładowym bezpiecznym odczytem.",
    "prerequisites": []
  },
  "two-phase-commit-for-ai-agents": {
    "objective": "Oddziel propozycję od autoryzacji.",
    "assignment": "Zaprojektuj kroki przygotuj, pokaż, potwierdź i odmów dla dwóch operacji zmieniających dane.",
    "evidence": "Diagram mutacji i dwa testy odrzucenia działania.",
    "prerequisites": [
      "mcp-for-marketing-and-content-systems"
    ]
  },
  "autonomy-levels-and-guardrails": {
    "objective": "Ogranicz ryzyko pracy autonomicznej.",
    "assignment": "Zbuduj tabelę polityk dla szkiców, planowania po potwierdzeniu i autonomii; dodaj limity, ciszę i zatrzymanie.",
    "evidence": "Polityka nadzoru wraz z regułami postępowania przy błędach.",
    "prerequisites": [
      "two-phase-commit-for-ai-agents"
    ]
  },
  "ai-agent-harness-engineering": {
    "objective": "Przygotuj powtarzalne środowisko agenta kodującego.",
    "assignment": "Napisz krótki przewodnik repozytorium i jeden skill ładowany na żądanie; zdefiniuj kontrolę celowo błędnej zmiany.",
    "evidence": "Minimalny harness i powtarzalna checklista weryfikacji.",
    "prerequisites": []
  },
  "mcp-tools-skills-and-product-surfaces": {
    "objective": "Zaprojektuj produkt dostępny agentom bez nadmiarowych uprawnień.",
    "assignment": "Opisz cztery narzędzia MCP, minimalne zakresy uprawnień, niezaufane pola i test niedozwolonej mutacji.",
    "evidence": "Sprawdzalny kontrakt powierzchni MCP i test odmowy.",
    "prerequisites": [
      "mcp-for-marketing-and-content-systems"
    ]
  },
  "playwright-browser-automation-and-verification": {
    "objective": "Zweryfikuj ścieżki przeglądarkowe i układ mobilny w izolowanym harnessie Playwright.",
    "assignment": "Napisz izolowany test ui-contract w Playwright z lokatorami ról/etykiet, kontrolą szerokości 390px i testem zachowania formularza po błędzie HTTP 503.",
    "evidence": "Uruchamialny plik .spec.ts, rubryka zrzutu 390×844 i zwalidowany kontrakt weryfikacji przeglądarkowej.",
    "prerequisites": [
      "ai-agent-harness-engineering",
      "mcp-tools-skills-and-product-surfaces"
    ]
  },
  "git-and-github-for-ai-coding-agents": {
    "objective": "Odizoluj równoległych agentów w git worktree i zweryfikuj zakres PR oraz integralność testów.",
    "assignment": "Poprowadź dwa równoległe zadania w osobnych katalogach git worktree, wymuś listę dozwolonych plików i kontrolę asercji testowych przed PR oraz przećwicz bezinwazyjne wycofanie błędnego merge'a.",
    "evidence": "Checklista topologii worktree, raport przejścia bramki zakresu i integralności testów przed PR oraz procedura bezpiecznego odzyskiwania w Gicie.",
    "prerequisites": [
      "ai-agent-harness-engineering",
      "playwright-browser-automation-and-verification"
    ]
  }
};
export const lessonPractice = assertLocaleParity({ en: enPractice, pl: plPractice }, 'lessonPractice');

// The parity helper checks shapes; these checks also protect canonical identifiers and route order.
for (const locale of ['en', 'pl'] as const) {
  const ids = new Set<string>();
  const covered = new Set<LessonSlug>();
  for (const journey of learningJourneys[locale]) {
    if (ids.has(journey.id) || journey.lessonSlugs.length === 0) {
      throw new Error(`Invalid or duplicate journey: ${journey.id} (${locale})`);
    }
    ids.add(journey.id);
    const withinJourney = new Set<LessonSlug>();
    for (const slug of journey.lessonSlugs) {
      if (!lessonSlugs.includes(slug) || withinJourney.has(slug)) {
        throw new Error(`Unknown or repeated journey lesson: ${slug} (${locale})`);
      }
      withinJourney.add(slug);
      covered.add(slug);
    }
  }
  for (const slug of lessonSlugs) {
    const practice = lessonPractice[locale][slug];
    if (!covered.has(slug) || !practice || practice.prerequisites.includes(slug)) {
      throw new Error(`Lesson is uncovered or has invalid practice: ${slug} (${locale})`);
    }
  }
}

if (JSON.stringify(learningJourneys.en.map((j) => [j.id, j.lessonSlugs])) !==
    JSON.stringify(learningJourneys.pl.map((j) => [j.id, j.lessonSlugs]))) {
  throw new Error('Bilingual learning journeys differ in order or IDs');
}
for (const slug of lessonSlugs) {
  if (JSON.stringify(lessonPractice.en[slug].prerequisites) !==
      JSON.stringify(lessonPractice.pl[slug].prerequisites)) {
    throw new Error(`Bilingual prerequisites differ: ${slug}`);
  }
}
