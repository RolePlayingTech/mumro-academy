import { assertLocaleParity, type LessonSlug } from '../lib/contracts';

export interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  definition: string;
  whyItMatters: string;
  relatedLesson: LessonSlug;
}

const en = {
  metadata: {
    title: 'Glossary of Brand Systems, Content Engineering & Agentic AI — MUMRO Academy',
    description:
      'Definitions of core engineering and marketing concepts: Versioned Strategy, Brand Voice Boundaries, Source Provenance, Idempotent Queues, Cohort Analytics, Model Context Protocol (MCP), and Two-Phase Confirmation Gates.',
  },
  hero: {
    eyebrow: 'TECHNICAL & EDITORIAL LEXICON',
    title: 'Glossary of Connected Brand Operations.',
    lead: 'Clear definitions for the concepts connecting brand strategy, multi-channel publishing, technical SEO, and governed AI agents.',
    lessonLinkLabel: 'Related lesson',
  },
  terms: [
    {
      id: 'versioned-strategy',
      term: 'Versioned Brand Strategy',
      category: 'Strategy & Voice',
      definition: 'A structured, machine-readable brand strategy maintained in explicit iterations (v1, v2) with separate Draft and Approved states, pillars, channel roles, and 30-day experiments.',
      whyItMatters: 'Prevents silent positioning drift and allows cohort analytics to propose concrete, reviewable strategy updates.',
      relatedLesson: 'versioned-brand-strategy',
    },
    {
      id: 'negative-voice-boundaries',
      term: 'Negative Brand Voice Boundaries',
      category: 'Strategy & Voice',
      definition: 'Explicit rules defining forbidden clichés, banned syntactic patterns, and claims a brand must never make across any generator or reply channel.',
      whyItMatters: 'Positive adjectives alone fail to stop LLMs from generating generic hype; negative boundaries enforce unmistakable editorial discipline.',
      relatedLesson: 'brand-voice-architecture',
    },
    {
      id: 'source-provenance',
      term: 'Source Provenance Trail (Source → Decision → Draft)',
      category: 'Research & Content',
      definition: 'The preserved chain linking a raw verified fact (from an RSS feed, official domain, or workspace article) through its strategic interpretation into the final article or post draft.',
      whyItMatters: 'Eliminates unverified AI hallucinations and lets editors audit where every factual claim originated.',
      relatedLesson: 'evidence-led-research-pipelines',
    },
    {
      id: 'canonical-story-decomposition',
      term: 'Canonical Story Decomposition',
      category: 'Distribution',
      definition: 'The process of developing one researched core narrative into a canonical website article, a 5-slide visual carousel, and native social posts for Instagram, Facebook, X, and LinkedIn.',
      whyItMatters: 'Replaces repetitive cross-posting and daily creative burnout with high-signal, platform-native storytelling.',
      relatedLesson: 'one-story-multi-channel-architecture',
    },
    {
      id: 'five-slide-arc',
      term: '5-Slide Narrative Arc',
      category: 'Distribution',
      definition: 'A structured visual storytelling sequence consisting of: (1) Tension Hook, (2) Anatomical Breakdown, (3) Mechanism in Action, (4) Field Proof, and (5) Actionable Takeaway.',
      whyItMatters: 'Maintains swipe momentum and earns high save rates without overcrowding slides with wall-of-text bullet points.',
      relatedLesson: 'carousel-and-visual-storytelling',
    },
    {
      id: 'idempotent-publishing',
      term: 'Idempotent Multi-Target Publishing',
      category: 'Publishing Ops',
      definition: 'A queue architecture where each target platform records its own delivery receipt, allowing failed targets to be retried safely without duplicating posts on channels that already succeeded.',
      whyItMatters: 'Social APIs experience transient timeouts; per-target idempotency protects brand accounts from accidental double-posting.',
      relatedLesson: 'reliable-publishing-queues-and-cadence',
    },
    {
      id: 'reciprocal-hreflang',
      term: 'Reciprocal Hreflang & Canonical Symmetry',
      category: 'Website & SEO',
      definition: 'The technical SEO requirement that every localized route (e.g., `/` and `/pl/`) declares its own canonical URL while linking bidirectionally to all language alternates and `x-default`.',
      whyItMatters: 'Ensures search engines index the right language edition for each reader without duplicate-content penalties.',
      relatedLesson: 'content-hub-and-cms-architecture',
    },
    {
      id: 'faq-mining',
      term: 'FAQ Mining',
      category: 'Conversations',
      definition: 'Clustering recurring visitor questions from a grounded website assistant and social comments into validated topics for upcoming articles and carousels.',
      whyItMatters: 'Turns real buyer questions directly into high-intent educational content.',
      relatedLesson: 'grounded-website-assistants-and-faq-mining',
    },
    {
      id: 'cohort-analytics',
      term: '7 / 30 / 90-Day Cohort Analytics',
      category: 'Analytics',
      definition: 'Evaluating content performance, posting hours, and format retention across standardized 7, 30, and 90-day windows rather than isolated viral spikes.',
      whyItMatters: 'Provides reliable evidence for content reuse and Strategy v2 drafts.',
      relatedLesson: 'cohort-analytics-and-strategy-iteration',
    },
    {
      id: 'model-context-protocol',
      term: 'Model Context Protocol (MCP)',
      category: 'Agentic AI',
      definition: 'An open standard enabling AI agents (such as Claude Code, Codex, and Antigravity) to interact with external workspaces through typed, permission-scoped read, draft, and action tools.',
      whyItMatters: 'Replaces manual copy-pasting into chat windows with live, auditable access to brand strategy, analytics, and drafts.',
      relatedLesson: 'mcp-for-marketing-and-content-systems',
    },
    {
      id: 'prepare-confirm-gate',
      term: 'Prepare → Confirm Mutation Gate',
      category: 'Agentic AI',
      definition: 'A two-phase safety pattern where an AI agent must first call a `prepare_*` tool to validate rules and generate a human-readable preview + token before `confirm_*` can execute the live change.',
      whyItMatters: 'Prevents probabilistic AI agents from accidentally publishing, rescheduling, or replying without explicit verification.',
      relatedLesson: 'two-phase-commit-for-ai-agents',
    },
    {
      id: 'bounded-autonomy',
      term: 'Bounded Autonomy (`draft_only` / `schedule_with_confirmation` / `autonomous_schedule`)',
      category: 'Governance',
      definition: 'Graduated workspace control modes paired with hard guardrails—quiet hours, monthly credit budgets, allowed channels, media review, and an emergency stop switch.',
      whyItMatters: 'Lets brands and agencies scale AI assistance while keeping humans in command of the rules.',
      relatedLesson: 'autonomy-levels-and-guardrails',
    },
    {
      id: 'ai-agent-harness',
      term: 'AI Agent Harness (`Agent = Model + Harness`)',
      category: 'Harness Engineering',
      definition: 'Everything around a model that makes it work as an agent in your project: always-loaded instructions (`AGENTS.md` / `CLAUDE.md`), skills loaded on demand (`SKILL.md`), tools (files, terminal, MCP), verification commands, memory kept on disk, and boundaries, some of which are only instructions and some enforced outside the model.',
      whyItMatters: 'With the model unchanged, the harness decides whether the agent guesses commands or runs real checks, remembers decisions or repeats rejected ideas, and asks before risky actions. Research such as Harness² (2026) measured benchmark gains from harness changes alone.',
      relatedLesson: 'ai-agent-harness-engineering',
    },
    {
      id: 'progressive-disclosure-skills',
      term: 'Progressive Disclosure (short `AGENTS.md` + on-demand `SKILL.md`)',
      category: 'Harness Engineering',
      definition: 'Keeping always-loaded instructions (`AGENTS.md` / `CLAUDE.md`) short and concrete, while multi-step procedures live in `SKILL.md` files that the agent first sees only as a name and description and loads in full when a task needs them.',
      whyItMatters: 'Always-loaded text is read in every session; Claude Code’s documentation recommends instruction files under 200 lines because longer ones reduce adherence. Skills keep rarely needed procedures out of the way until they matter.',
      relatedLesson: 'ai-agent-harness-engineering',
    },
    {
      id: 'subagent-context-isolation',
      term: 'Subagent Context Isolation & Independent Review',
      category: 'Harness Engineering',
      definition: 'Delegating a broad, many-file search to a subagent that works in its own context and returns a short summary with file paths, and asking a separate agent or fresh session to review a risky diff without seeing the author’s reasoning.',
      whyItMatters: 'Keeps the main session focused and gives an independent second look. It is a trade-off: total token use goes up and a summary can miss details, so cited lines should still be opened before editing.',
      relatedLesson: 'ai-agent-harness-engineering',
    },
    {
      id: 'mcp-tool-surface',
      term: 'MCP Tool Surface (read / draft / gated mutation)',
      category: 'Agentic AI',
      definition:
        'The designed set of Model Context Protocol tools a product exposes, grouped so read tools cannot change state, draft tools write only workspace artifacts, and live provider calls require a separate prepare → confirm pair.',
      whyItMatters:
        'Once users delegate click paths to agents, this surface is part of product quality: too small and the agent pastes; unbounded and it can publish by mistake; designed and humans and agents edit the same rows.',
      relatedLesson: 'mcp-tools-skills-and-product-surfaces',
    },
    {
      id: 'tools-vs-skills',
      term: 'Tools vs Skills (capability vs choreography)',
      category: 'Agentic AI',
      definition:
        'A tool is a typed MCP function the model can call (the capability). A skill is a `SKILL.md` workflow loaded on demand that says when and in what order to call those tools (the choreography). Server instructions are the always-loaded backstop; only the tool implementation can enforce a boundary.',
      whyItMatters:
        'Tools without skills make every agent invent a different loop. Skills without tools cannot touch the product. Instructions without gates are requests the model can skip.',
      relatedLesson: 'mcp-tools-skills-and-product-surfaces',
    },
    {
      id: 'untrusted-workspace-data',
      term: 'Untrusted Workspace Data (indirect prompt injection)',
      category: 'Agentic AI',
      definition:
        'Captions, comments, article HTML and text inside images returned by MCP read tools, labelled in the server contract as data the model must not follow as instructions, because a tenant artifact can contain an injection aimed at the agent.',
      whyItMatters:
        'Connecting an agent to live workspace text without this contract turns every comment into an attack surface. The label does not make models immune; scopes and prepare/confirm still have to refuse a one-step publish.',
      relatedLesson: 'mcp-tools-skills-and-product-surfaces',
    },
    {
      id: 'aria-snapshot-vs-multimodal-vision',
      term: 'ARIA Accessibility Tree vs. Multimodal Vision (VLM Screenshots)',
      category: 'Browser Automation',
      definition:
        'Two complementary ways an AI agent perceives a web page: the Accessibility Tree (used by `@playwright/mcp` `browser_snapshot`) gives a compact YAML tree of roles, accessible names, and stable element references (`ref=e14`), whereas Multimodal Vision (`page.screenshot()`) captures rendered pixels for a vision-capable model to inspect visual layout, overlap, and contrast.',
      whyItMatters:
        'Not every LLM or execution harness supports image input, and raw coordinate clicking on screenshots is brittle across viewport sizes. Use ARIA snapshots and semantic locators (`getByRole`) for 95% of navigation and actions, paired with programmatic geometry (`scrollWidth`, `boundingBox`) and targeted screenshots when verifying visual layout.',
      relatedLesson: 'playwright-browser-automation-and-verification',
    },
    {
      id: 'ui-contract-vs-integrated',
      term: 'UI-Contract vs. Integrated Browser Verification',
      category: 'Browser Automation',
      definition:
        'Separating fast, network-isolated browser tests (`ui-contract`, where `context.route` intercepts and stubs every API call and fails on any unhandled request) from full-stack browser journeys (`integrated`, running against a local frontend, backend, and database with disposable QA accounts).',
      whyItMatters:
        'Running every browser check against a full stack or third-party APIs makes suites slow and flaky. UI-contract tests verify auth refresh races, error states, and mobile geometry in seconds, while integrated tests confirm real end-to-end wiring.',
      relatedLesson: 'playwright-browser-automation-and-verification',
    },
  ] satisfies GlossaryTerm[],
};

const pl: typeof en = {
  metadata: {
    title: 'Słownik Systemów Marki, Inżynierii Treści i Agentów AI — Akademia MUMRO',
    description:
      'Definicje kluczowych pojęć inżynieryjno-marketingowych: Wersjonowana Strategia, Granice Brand Voice, Pochodzenie Źródeł, Idempotentna Kolejka, Analityka Kohortowa, Model Context Protocol (MCP) i Bramka Prepare → Confirm.',
  },
  hero: {
    eyebrow: 'SŁOWNIK TECHNICZNY I REDAKCYJNY',
    title: 'Leksykon Połączonego Systemu Marki.',
    lead: 'Zwięzłe definicje pojęć łączących strategię marki, publikację wielokanałową, techniczne SEO oraz nadzorowanych agentów AI.',
    lessonLinkLabel: 'Powiązana lekcja',
  },
  terms: [
    {
      id: 'versioned-strategy',
      term: 'Wersjonowana strategia marki (Versioned Strategy)',
      category: 'Strategia i Głos',
      definition: 'Ustrukturyzowana strategia marki prowadzona w jawnych iteracjach (v1, v2) z rozdzieleniem stanu Roboczego (Draft) i Zatwierdzonego (Approved), filarami, rolami kanałów i eksperymentami 30-dniowymi.',
      whyItMatters: 'Chroni komunikację przed chaotycznymi zmianami i pozwala przekuwać wyniki kohort w konkretne aktualizacje strategii.',
      relatedLesson: 'versioned-brand-strategy',
    },
    {
      id: 'negative-voice-boundaries',
      term: 'Negatywne granice Brand Voice',
      category: 'Strategia i Głos',
      definition: 'Jawne reguły określające zakazane klisze językowe, zabronione konstrukcje składniowe oraz twierdzenia, których marce nie wolno użyć w żadnym kanale.',
      whyItMatters: 'Same pozytywne przymiotniki nie powstrzymują modeli AI przed generowaniem sztucznego patosu; twarde zakazy budują wyrazisty styl.',
      relatedLesson: 'brand-voice-architecture',
    },
    {
      id: 'source-provenance',
      term: 'Ślad pochodzenia źródła (Source → Decision → Draft)',
      category: 'Research i Treść',
      definition: 'Zachowany łańcuch łączący surowy, zweryfikowany fakt (z kanału RSS, oficjalnej domeny lub artykułu w workspace) przez interpretację strategiczną aż do gotowego szkicu.',
      whyItMatters: 'Eliminuje halucynacje AI i pozwala redaktorowi w każdej chwili sprawdzić pochodzenie danych w tekście.',
      relatedLesson: 'evidence-led-research-pipelines',
    },
    {
      id: 'canonical-story-decomposition',
      term: 'Dekompozycja kanonicznej historii',
      category: 'Dystrybucja',
      definition: 'Proces rozwijania jednego zbadanego tematu w kanoniczny artykuł na stronę WWW, 5-slajdową karuzelę oraz dopasowane posty na Instagram, Facebook, X i LinkedIn.',
      whyItMatters: 'Zastępuje mechaniczne kopiowanie tego samego opisu spójną komunikacją dopasowaną do nawyków każdej platformy.',
      relatedLesson: 'one-story-multi-channel-architecture',
    },
    {
      id: 'five-slide-arc',
      term: 'Łuk narracyjny 5 slajdów',
      category: 'Dystrybucja',
      definition: 'Sekwencja pięciu kart wizualnych: (1) Konkretne napięcie, (2) Zawartość/Anatomia, (3) Mechanizm działania, (4) Dowód w terenie oraz (5) Podsumowanie i kolejny krok.',
      whyItMatters: 'Utrzymuje uwagę odbiorcy do ostatniej karty i zwiększa liczbę zapisów posta (Saves).',
      relatedLesson: 'carousel-and-visual-storytelling',
    },
    {
      id: 'idempotent-publishing',
      term: 'Idempotentna publikacja wielokanałowa',
      category: 'Operacje Publikacji',
      definition: 'Architektura kolejki, w której każdy docelowy kanał zapisuje własne potwierdzenie dostarczenia (receipt), co pozwala ponowić nieudany cel bez dublowania postów na pozostałych.',
      whyItMatters: 'Chroni profile marki przed podwójną publikacją w razie chwilowego błędu API jednej z platform.',
      relatedLesson: 'reliable-publishing-queues-and-cadence',
    },
    {
      id: 'reciprocal-hreflang',
      term: 'Wzajemny Hreflang i symetria Canonical',
      category: 'Strona WWW i SEO',
      definition: 'Wymóg technicznego SEO, w którym każda wersja językowa podstrony (`/` oraz `/pl/`) posiada własny tag canonical oraz dwukierunkowe linki `hreflang` i `x-default`.',
      whyItMatters: 'Gwarantuje prawidłową indeksację obu wersji językowych w Google bez ryzyka duplikacji treści.',
      relatedLesson: 'content-hub-and-cms-architecture',
    },
    {
      id: 'faq-mining',
      term: 'FAQ Mining (Wydobywanie pytań odbiorców)',
      category: 'Rozmowy',
      definition: 'Grupowanie powtarzających się pytań zadawanych asystentowi na stronie WWW oraz w komentarzach społecznościowych w gotowe tematy na kolejne artykuły i karuzele.',
      whyItMatters: 'Zamienia realne wątpliwości klientów w treści dokładnie odpowiadające na intencje zakupowe.',
      relatedLesson: 'grounded-website-assistants-and-faq-mining',
    },
    {
      id: 'cohort-analytics',
      term: 'Analityka kohortowa 7 / 30 / 90 dni',
      category: 'Analityka',
      definition: 'Ocena wyników treści, godzin publikacji i formatów w ustandaryzowanych oknach 7, 30 i 90 dni zamiast analizowania przypadkowych pojedynczych skoków zasięgu.',
      whyItMatters: 'Dostarcza rzetelnych podstaw do ponownego wykorzystania najlepszych materiałów (reuse) i tworzenia Strategii v2.',
      relatedLesson: 'cohort-analytics-and-strategy-iteration',
    },
    {
      id: 'model-context-protocol',
      term: 'Model Context Protocol (MCP)',
      category: 'Agenci AI',
      definition: 'Otwarty standard pozwalający agentom AI (Claude Code, Codex, Antigravity) komunikować się z przestrzenią marki przez typowane narzędzia odczytu, szkiców i działań.',
      whyItMatters: 'Zastępuje ręczne kopiowanie tekstów do okna czatu bezpośrednim, kontrolowanym dostępem do strategii, wyników i szkiców.',
      relatedLesson: 'mcp-for-marketing-and-content-systems',
    },
    {
      id: 'prepare-confirm-gate',
      term: 'Bramka decyzyjna Prepare → Confirm',
      category: 'Agenci AI',
      definition: 'Dwufazowy wzorzec bezpieczeństwa, w którym agent AI musi najpierw wywołać narzędzie `prepare_*` (tworzące podgląd i token), zanim `confirm_*` wykona rzeczywistą zmianę.',
      whyItMatters: 'Uniemożliwia przypadkowe opublikowanie posta, artykułu lub komentarza przez agenta AI bez jawnego potwierdzenia.',
      relatedLesson: 'two-phase-commit-for-ai-agents',
    },
    {
      id: 'bounded-autonomy',
      term: 'Ograniczona autonomia (`draft_only` / `schedule_with_confirmation` / `autonomous_schedule`)',
      category: 'Nadzór i Kontrola',
      definition: 'Trzy poziomy swobody pracy AI połączone z twardymi bezpiecznikami: godzinami ciszy, miesięcznym budżetem kredytów, dozwolonymi kanałami, oceną mediów i przyciskiem Stop.',
      whyItMatters: 'Pozwala skalować pracę z AI przy zachowaniu 100% kontroli człowieka nad zasadami publikacji.',
      relatedLesson: 'autonomy-levels-and-guardrails',
    },
    {
      id: 'ai-agent-harness',
      term: 'AI Agent Harness — Uprząż Agenta (`Agent = Model + Harness`)',
      category: 'Harness Engineering',
      definition: 'Wszystko, co otacza model i sprawia, że działa jako agent w Twoim projekcie: instrukcje ładowane zawsze (`AGENTS.md` / `CLAUDE.md`), skille ładowane na żądanie (`SKILL.md`), narzędzia (pliki, terminal, MCP), komendy weryfikacji, pamięć zapisana na dysku i granice — część z nich to tylko instrukcje, a część jest egzekwowana poza modelem.',
      whyItMatters: 'Przy tym samym modelu to harness decyduje, czy agent zgaduje komendy, czy uruchamia prawdziwe testy, czy pamięta decyzje, czy powtarza odrzucone pomysły, i czy pyta przed ryzykownymi działaniami. Badania takie jak Harness² (2026) zmierzyły na benchmarkach poprawę wyników wyłącznie dzięki zmianom harnessu.',
      relatedLesson: 'ai-agent-harness-engineering',
    },
    {
      id: 'progressive-disclosure-skills',
      term: 'Progressive Disclosure (krótki `AGENTS.md` + skille `SKILL.md` na żądanie)',
      category: 'Harness Engineering',
      definition: 'Utrzymywanie instrukcji ładowanych zawsze (`AGENTS.md` / `CLAUDE.md`) krótkich i konkretnych, podczas gdy procedury wielokrokowe mieszkają w plikach `SKILL.md`, które agent widzi najpierw tylko jako nazwę i opis, a w całości wczytuje wtedy, gdy zadanie ich wymaga.',
      whyItMatters: 'Tekst ładowany zawsze jest czytany w każdej sesji; dokumentacja Claude Code zaleca pliki instrukcji poniżej 200 linii, bo dłuższe obniżają przestrzeganie zasad. Skille trzymają rzadko potrzebne procedury z boku, dopóki nie są potrzebne.',
      relatedLesson: 'ai-agent-harness-engineering',
    },
    {
      id: 'subagent-context-isolation',
      term: 'Izolacja kontekstu przez subagentów i niezależny przegląd',
      category: 'Harness Engineering',
      definition: 'Zlecanie szerokiego przeszukiwania wielu plików subagentowi, który pracuje we własnym kontekście i zwraca krótkie podsumowanie ze ścieżkami, oraz proszenie osobnego agenta lub nowej sesji o przegląd ryzykownego diffu bez znajomości rozumowania autora.',
      whyItMatters: 'Utrzymuje główną sesję w skupieniu i daje niezależne spojrzenie. To kompromis: łączne zużycie tokenów rośnie, a streszczenie może pominąć szczegół, więc przed edycją i tak warto otworzyć wskazane linie.',
      relatedLesson: 'ai-agent-harness-engineering',
    },
    {
      id: 'mcp-tool-surface',
      term: 'Powierzchnia narzędzi MCP (odczyt / szkic / mutacja z bramką)',
      category: 'Agenci AI',
      definition:
        'Zaprojektowany zestaw narzędzi Model Context Protocol, które produkt wystawia, pogrupowany tak, że narzędzia odczytu nie zmieniają stanu, narzędzia szkiców zapisują tylko artefakty workspace, a żywe wywołania dostawcy wymagają osobnej pary prepare → confirm.',
      whyItMatters:
        'Gdy użytkownicy zlecają ścieżki kliknięć agentom, ta powierzchnia jest częścią jakości produktu: za mała i agent wkleja; nieograniczona i może opublikować przez pomyłkę; zaprojektowana — ludzie i agenci edytują te same wiersze.',
      relatedLesson: 'mcp-tools-skills-and-product-surfaces',
    },
    {
      id: 'tools-vs-skills',
      term: 'Narzędzia a skille (zdolność kontra choreografia)',
      category: 'Agenci AI',
      definition:
        'Narzędzie to typowana funkcja MCP, którą model może wywołać (zdolność). Skill to workflow w `SKILL.md` ładowany na żądanie, który mówi, kiedy i w jakiej kolejności te narzędzia wołać (choreografia). Instrukcje serwera to siatka bezpieczeństwa ładowana zawsze; granicę egzekwuje tylko implementacja narzędzia.',
      whyItMatters:
        'Narzędzia bez skilli sprawiają, że każdy agent wymyśla inną pętlę. Skille bez narzędzi nie dosięgną produktu. Instrukcje bez bramek to prośby, które model może pominąć.',
      relatedLesson: 'mcp-tools-skills-and-product-surfaces',
    },
    {
      id: 'untrusted-workspace-data',
      term: 'Niezaufane dane workspace (pośrednia injekcja promptu)',
      category: 'Agenci AI',
      definition:
        'Podpisy, komentarze, HTML artykułów i tekst na obrazach zwracane przez narzędzia odczytu MCP, oznaczone w kontrakcie serwera jako dane, których model nie wolno słuchać jak instrukcji, bo artefakt tenanta może zawierać injekcję skierowaną do agenta.',
      whyItMatters:
        'Podłączenie agenta do żywego tekstu workspace bez tego kontraktu zamienia każdy komentarz w powierzchnię ataku. Etykieta nie czyni modeli odpornymi; scope’y i prepare/confirm i tak muszą odmówić publikacji w jednym kroku.',
      relatedLesson: 'mcp-tools-skills-and-product-surfaces',
    },
    {
      id: 'aria-snapshot-vs-multimodal-vision',
      term: 'Drzewo dostępności ARIA a wizja multimodalna (zrzuty ekranu VLM)',
      category: 'Automatyzacja Przeglądarki',
      definition:
        'Dwa uzupełniające się sposoby postrzegania strony WWW przez agenta AI: drzewo dostępności (używane przez `browser_snapshot` w `@playwright/mcp`) dostarcza zwięzłe drzewo YAML ról, nazw dostępności i stabilnych referencji (`ref=e14`), natomiast wizja multimodalna (`page.screenshot()`) przekazuje wyrenderowane piksele modelowi VLM do oceny układu, nachodzenia elementów i kontrastu.',
      whyItMatters:
        'Nie każdy model i nie każdy harness obsługuje obrazy, a klikanie po współrzędnych `(x, y)` ze zrzutu ekranu psuje się przy zmianie rozdzielczości. Używaj drzewa ARIA i semantycznych lokatorów (`getByRole`) do 95% nawigacji i akcji, łącząc je z geometrią DOM (`scrollWidth`, `boundingBox`) oraz celowanymi zrzutami ekranu przy weryfikacji wizualnej.',
      relatedLesson: 'playwright-browser-automation-and-verification',
    },
    {
      id: 'ui-contract-vs-integrated',
      term: 'Testy UI-Contract a testy Integrated w przeglądarce',
      category: 'Automatyzacja Przeglądarki',
      definition:
        'Rozdzielenie szybkich, odizolowanych sieciowo testów przeglądarkowych (`ui-contract`, w których `context.route` przechwytuje zapytania API i blokuje wszelki nieobsłużony ruch) od pełnych ścieżek (`integrated`, uruchamianych na lokalnym frontendzie, backendzie i bazie danych z kontami testowymi QA).',
      whyItMatters:
        'Uruchamianie każdego testu na pełnym stosie i zewnętrznych usługach spowalnia CI i powoduje niestabilność. Testy `ui-contract` w kilka sekund weryfikują wyścigi odświeżania sesji, stany błędów i geometrię mobilną, a testy `integrated` potwierdzają spięcie całości.',
      relatedLesson: 'playwright-browser-automation-and-verification',
    },
  ] satisfies GlossaryTerm[],
};

export const glossaryContent = assertLocaleParity({ en, pl }, 'glossaryContent');
