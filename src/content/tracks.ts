import { assertLocaleParity, type TrackId } from '../lib/contracts';

export interface TrackData {
  id: TrackId;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  audience: string;
  coreProblem: string;
  systemOutcome: string;
  mumroAnchor: string;
  mumroCapability: string;
  outcomes: string[];
}

const en: Record<TrackId, TrackData> = {
  'brand-systems': {
    id: 'brand-systems',
    number: 'TRACK 01',
    title: 'Living Brand Systems & Content Strategy',
    subtitle: 'Versioned strategy, operational Brand Voice, and source-grounded research.',
    summary:
      'Learn how to replace static PDF brand books and ad-hoc prompts with a versioned strategy system, enforceable Brand Voice rules, and citation-backed research pipelines.',
    audience: 'Founders, Brand Strategists, Content Leads',
    coreProblem: 'Teams rewrite brand context in every prompt, lose track of which strategic hypothesis is active, and publish claims that cannot be traced back to verified sources.',
    systemOutcome: 'A versioned Brand Operating System where strategy (v1 → v2), tone boundaries, and vetted research sources automatically guide every draft.',
    mumroAnchor: 'https://mumro.io/#benefits',
    mumroCapability: 'MUMRO Strategy Versioning, Shared Brand Voice & Source Provenance Trail',
    outcomes: [
      'Design a versioned content strategy with explicit content pillars, channel roles, and 30-day testable hypotheses.',
      'Encode Brand Voice as positive cadence rules + negative claim boundaries that both humans and LLMs obey.',
      'Build an evidence-led research workflow (Source → Decision → Draft) using RSS feeds, official domain allowlists, and workspace articles.',
    ],
  },
  'multi-format-distribution': {
    id: 'multi-format-distribution',
    number: 'TRACK 02',
    title: 'Multi-Format Content Engineering & Publishing',
    subtitle: 'One story across four channels, 5-slide carousels, and resilient publishing queues.',
    summary:
      'Master the craft of transforming a single researched topic into a website article, a high-retention 5-slide carousel, and channel-native posts for Instagram, Facebook, X, and LinkedIn—backed by reliable publishing operations.',
    audience: 'Content Engineers, Social Media Managers, Creative Directors',
    coreProblem: 'Cross-posting identical captions kills engagement, while manually rewriting everything from scratch burns out the team and drifts away from the core product message.',
    systemOutcome: 'A single-story multi-format pipeline with predictable narrative pacing and idempotent, per-target publishing queues.',
    mumroAnchor: 'https://mumro.io/#workflow',
    mumroCapability: 'MUMRO Content Studio, 5-Slide Carousel Builder & Multi-Target Publishing Queue',
    outcomes: [
      'Decompose one canonical story into long-form web copy, visual carousels, and platform-specific social posts without losing factual accuracy.',
      'Structure 5-slide educational and product carousels using the Hook → Mechanism → Detail → Proof → Action rhythm.',
      'Operate multi-channel publishing queues with time slots, first-comment links, idempotency, and per-channel delivery receipts.',
    ],
  },
  'website-seo-conversations': {
    id: 'website-seo-conversations',
    number: 'TRACK 03',
    title: 'Website, Technical SEO & Conversation Loops',
    subtitle: 'CMS orchestration, bilingual SEO, grounded assistants, and cohort analytics.',
    summary:
      'Bridge the gap between social media reach and owned website equity. Learn technical SEO for bilingual content hubs, retrieval-grounded website assistants, FAQ mining, and cohort analytics that drive Strategy v2.',
    audience: 'Growth Engineers, SEO Specialists, Product Marketers',
    coreProblem: 'Social media and the company website operate as separate islands: social posts forget to drive qualified web traffic, visitor questions go unrecorded, and vanity metrics hide real retention.',
    systemOutcome: 'A closed loop where articles publish cleanly to CMS, social posts drive measurable visits, grounded assistants capture recurring questions, and cohort data shapes the next strategy.',
    mumroAnchor: 'https://mumro.io/#website',
    mumroCapability: 'MUMRO Website & CMS Integration, Grounded Assistant, Unified Inbox & Cohort Analytics',
    outcomes: [
      'Architect bilingual content hubs with strict canonical URLs, reciprocal hreflang tags, JSON-LD graphs, and CMS delivery contracts.',
      'Deploy website assistants grounded in curated brand knowledge to capture leads and mine recurring visitor questions (FAQ Mining).',
      'Analyze 7/30/90-day performance cohorts across social and web to formulate evidence-based Strategy v2 revisions.',
    ],
  },
  'agents-mcp-governance': {
    id: 'agents-mcp-governance',
    number: 'TRACK 04',
    title: 'Agentic AI, Model Context Protocol (MCP) & Governance',
    subtitle: 'Connecting AI agents to brand context with Prepare → Confirm gates, bounded autonomy, coding-agent harnesses, and MCP product surfaces.',
    summary:
      'Go under the hood of agentic marketing and software systems. Learn how Model Context Protocol (MCP) exposes workspace context to coding and operational agents, why mutations require two-phase confirmation gates, how to engineer repository harnesses (`AGENTS.md`), and how to specify agent-operable product surfaces.',
    audience: 'AI Engineers, Technical Founders, Agency Operations Leads',
    coreProblem: 'Giving AI agents raw API credentials risks accidental live publications, off-brand replies, or runaway token spend—while keeping AI completely disconnected or governed only by bloated prompt files wastes hours on copy-pasting and fragile workflows.',
    systemOutcome: 'A governed agentic architecture using scoped MCP tools, Prepare → Confirm mutation gates, credit caps, quiet hours, repository harnesses (`agent-harness-kit`), and checkable MCP surface contracts (`mcp-surface-kit`).',
    mumroAnchor: 'https://mumro.io/#agents',
    mumroCapability: 'MUMRO MCP Gateway, Two-Phase Confirmation Gate, 3-Mode Autonomy Control & Open-Source Agent Kits',
    outcomes: [
      'Connect AI agents (Claude Code, Codex, Cursor, Antigravity) to live brand strategy, performance cohorts, and drafts via Model Context Protocol (MCP).',
      'Implement the two-phase Prepare → Confirm pattern so agents never publish or reschedule without an auditable preview and explicit authorization.',
      'Configure workspace governance: 3 autonomy modes (`draft_only`, `schedule_with_confirmation`, `autonomous_schedule`), quiet hours, credit budgets, and RBAC.',
      'Engineer lean, verifiable coding-agent harnesses (`AGENTS.md`, progressive-disclosure skills, and CI checks) with `RolePlayingTech/agent-harness-kit`.',
      'Design and validate four-tier MCP product surfaces, per-operation OAuth scopes, and generated host skills with `RolePlayingTech/mcp-surface-kit`.',
    ],
  },
};

const pl: Record<TrackId, TrackData> = {
  'brand-systems': {
    id: 'brand-systems',
    number: 'ŚCIEŻKA 01',
    title: 'Żywe systemy marki i strategia treści',
    subtitle: 'Wersjonowana strategia, operacyjny Brand Voice i research oparty na źródłach.',
    summary:
      'Dowiedz się, jak zastąpić statyczne księgi marki w PDF i przypadkowe prompty wersjonowanym systemem strategii, egzekwowalnymi regułami Brand Voice oraz researchem z jawnym pochodzeniem źródeł.',
    audience: 'Founderzy, stratedzy marki, szefowie contentu',
    coreProblem: 'Zespoły przepisują kontekst marki w każdym prompcie, gubią informację o tym, która hipoteza strategiczna jest aktualna, i publikują twierdzenia bez pokrycia w źródłach.',
    systemOutcome: 'Wersjonowany system operacyjny marki, w którym strategia (v1 → v2), granice tonu oraz zweryfikowane źródła automatycznie prowadzą każdy szkic.',
    mumroAnchor: 'https://mumro.io/pl/#benefits',
    mumroCapability: 'Wersjonowane strategie MUMRO, wspólny Brand Voice i ślad pochodzenia źródeł (Source Trail)',
    outcomes: [
      'Zaprojektujesz wersjonowaną strategię treści z jawnymi filarami, rolami kanałów i mierzalnymi hipotezami na 30 dni.',
      'Zapiszesz Brand Voice jako konkretne reguły rytmu oraz twarde granice (czego nie wolno obiecywać), których przestrzegają ludzie i modele AI.',
      'Zbudujesz proces researchu oparty na dowodach (Źródło → Decyzja → Szkic) z wykorzystaniem RSS, oficjalnych domen i artykułów w workspace.',
    ],
  },
  'multi-format-distribution': {
    id: 'multi-format-distribution',
    number: 'ŚCIEŻKA 02',
    title: 'Wielokanałowa inżynieria treści i publikacja',
    subtitle: 'Jedna historia w czterech kanałach, 5-slajdowe karuzele i niezawodne kolejki publikacji.',
    summary:
      'Opanuj warsztat przekształcania jednego zbadanego tematu w artykuł na stronę WWW, angażującą karuzelę 5 slajdów oraz natywne posty na Instagram, Facebook, X i LinkedIn — wsparte bezpiecznym systemem kolejkowania.',
    audience: 'Content engineerowie, social media managerowie, dyrektorzy kreatywni',
    coreProblem: 'Wrzucanie identycznego tekstu na każdą platformę obniża zasięgi, a ręczne pisanie wszystkiego od zera wypala zespół i rozmywa główny przekaz produktu.',
    systemOutcome: 'Proces jednej historii rozwijanej w wiele formatów z przewidywalnym rytmem narracji oraz idempotentną kolejką publikacji per kanał.',
    mumroAnchor: 'https://mumro.io/pl/#workflow',
    mumroCapability: 'Studio treści MUMRO, kreator karuzel 5 slajdów i wielokanałowa kolejka publikacji',
    outcomes: [
      'Rozwiniesz jedną kanoniczną historię w artykuł WWW, karuzelę wizualną i posty dopasowane do specyfiki czterech platform bez utraty faktów.',
      'Zbudujesz 5-slajdowe karuzele edukacyjne i produktowe według rytmu: Napięcie → Mechanizm → Szczegół → Dowód → Działanie.',
      'Skonfigurujesz kolejki publikacji z oknami czasowymi, linkami w pierwszym komentarzu, idempotentnością i osobnym potwierdzeniem każdego kanału.',
    ],
  },
  'website-seo-conversations': {
    id: 'website-seo-conversations',
    number: 'ŚCIEŻKA 03',
    title: 'Strona WWW, techniczne SEO i pętla rozmów',
    subtitle: 'Integracja CMS, dwujęzyczne SEO, osadzone w wiedzy czatboty i analityka kohortowa.',
    summary:
      'Połącz zasięg w social mediach z trwałą wartością własnej strony WWW. Poznaj techniczne SEO dla dwujęzycznych serwisów treści, asystentów WWW opartych na wybranej bazie wiedzy, FAQ mining i analitykę kohortową.',
    audience: 'Growth engineerowie, specjaliści SEO, product marketerzy',
    coreProblem: 'Social media i strona firmowa działają jak osobne wyspy: posty nie budują wartościowego ruchu na WWW, pytania klientów przepadają na czacie, a puste polubienia przesłaniają realne wyniki.',
    systemOutcome: 'Zamknięty obieg, w którym artykuły trafiają prosto do CMS, posty kierują ruch na stronę, asystent wyłapuje powracające pytania, a kohorty prowadzą do Strategii v2.',
    mumroAnchor: 'https://mumro.io/pl/#website',
    mumroCapability: 'Integracja strony i CMS w MUMRO, asystent WWW z wiedzą marki, wspólny inbox i analityka kohort',
    outcomes: [
      'Zaprojektujesz dwujęzyczny hub treści z poprawnymi adresami canonical, wzajemnymi tagami hreflang, grafem JSON-LD i kontraktem dostarczania do CMS.',
      'Skonfigurujesz asystenta strony WWW osadzonego w wiedzy marki, aby zbierał kontakty (lead capture) i grupował powtarzające się pytania (FAQ mining).',
      'Przeanalizujesz kohorty 7/30/90 dni ze strony i social mediów, przekładając wnioski na konkretny szkic Strategii v2.',
    ],
  },
  'agents-mcp-governance': {
    id: 'agents-mcp-governance',
    number: 'ŚCIEŻKA 04',
    title: 'Agenci AI, Model Context Protocol (MCP) i kontrola człowieka',
    subtitle: 'Łączenie agentów AI z kontekstem marki przez bramki Prepare → Confirm, ograniczoną autonomię, harness inżynieryjny i powierzchnie MCP.',
    summary:
      'Zajrzyj pod maskę agentycznych systemów marketingowych i inżynieryjnych. Zobacz, jak Model Context Protocol (MCP) udostępnia kontekst workspace agentom, dlaczego mutacje wymagają dwufazowej zgody, jak projektować harness w repozytorium (`AGENTS.md`) i jak specyfikować powierzchnię produktu pod agentów.',
    audience: 'Inżynierowie AI, techniczni founderzy, liderzy operacji w agencjach',
    coreProblem: 'Danie agentom AI bezpośrednich kluczy do publikacji grozi przypadkowymi postami na żywo lub przepaleniem budżetu, a całkowite odcięcie AI lub poleganie wyłącznie na rozdętych plikach promptów zmusza do ręcznego kopiowania kontekstu.',
    systemOutcome: 'Architektura nadzorowanej autonomii oparta na narzędziach MCP, dwufazowych bramkach Prepare → Confirm, limitach kredytów, godzinach ciszy, harnessie repozytorium (`agent-harness-kit`) oraz sprawdzalnym kontrakcie powierzchni MCP (`mcp-surface-kit`).',
    mumroAnchor: 'https://mumro.io/pl/#agents',
    mumroCapability: 'Bramka MCP MUMRO, dwufazowe potwierdzanie działań, 3 tryby kontroli autonomii i otwarte narzędzia CLI',
    outcomes: [
      'Połączysz agentów AI (Claude Code, Codex, Cursor, Antigravity) z żywą strategią marki, wynikami kohort i szkicami przez Model Context Protocol (MCP).',
      'Wdrożysz wzorzec Prepare → Confirm, dzięki któremu agent nigdy nie opublikuje ani nie zmieni planu bez jawnego podglądu i autoryzacji.',
      'Skonfigurujesz zasady nadzoru: 3 poziomy autonomii (`draft_only`, `schedule_with_confirmation`, `autonomous_schedule`), godziny ciszy, budżet kredytów i role zespołu.',
      'Zaprojektujesz zwięzły, weryfikowalny harness dla agentów kodujących (`AGENTS.md`, skille ładowane na żądanie i bramki CI) z użyciem `RolePlayingTech/agent-harness-kit`.',
      'Zdefiniujesz i zwalidujesz czteropoziomową powierzchnię produktu MCP, uprawnienia OAuth per operacja oraz generowane skille hosta z użyciem `RolePlayingTech/mcp-surface-kit`.',
    ],
  },
};

export const tracksContent = assertLocaleParity({ en, pl }, 'tracksContent');
