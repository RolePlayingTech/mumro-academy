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
    "promise": "Go from a reliable coding-agent setup to a checkable, permissioned MCP product surface.",
    "deliverable": "Portfolio: agent harness, tool contracts, authorization tests and a recovery runbook.",
    "lessonSlugs": [
      "ai-agent-harness-engineering",
      "mcp-for-marketing-and-content-systems",
      "mcp-tools-skills-and-product-surfaces",
      "two-phase-commit-for-ai-agents",
      "autonomy-levels-and-guardrails"
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
    "promise": "Przejdź od stabilnego środowiska agenta kodującego do testowalnego interfejsu MCP z uprawnieniami.",
    "deliverable": "Portfolio: harness agenta, kontrakty narzędzi, testy autoryzacji i procedura odzyskiwania.",
    "lessonSlugs": [
      "ai-agent-harness-engineering",
      "mcp-for-marketing-and-content-systems",
      "mcp-tools-skills-and-product-surfaces",
      "two-phase-commit-for-ai-agents",
      "autonomy-levels-and-guardrails"
    ]
  }
];
export const learningJourneys = assertLocaleParity({ en: enJourneys, pl: plJourneys }, 'learningJourneys');

const enPractice: Record<LessonSlug, LessonPractice> = {
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
  }
};
const plPractice: Record<LessonSlug, LessonPractice> = {
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
