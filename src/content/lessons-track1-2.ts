import { assertLocaleParity } from '../lib/contracts';
import type { LessonData } from './lessons-types';

const en: LessonData[] = [
  {
    slug: 'versioned-brand-strategy',
    number: 'LESSON 01',
    trackId: 'brand-systems',
    difficulty: 'Foundations',
    difficultyLabel: 'Foundations',
    readingTimeMinutes: 9,
    title: 'Versioned Brand Strategy: Why Static PDFs Fail Modern Content Teams',
    subtitle: 'How to structure brand strategy as an evolving, versioned operating contract (v1 → measured cohort → v2) that actively governs every content format.',
    metaDescription: 'Learn how to replace static PDF brand guidelines with a versioned brand strategy system: pillars, audience segments, channel roles, and 30-day testable hypotheses.',
    keywords: ['versioned brand strategy', 'content strategy system', 'content pillars', 'cohort strategy iteration', 'MUMRO strategy'],
    keyTakeaways: [
      'A strategy stored in a slide deck dies the moment daily publishing begins because writers and AI prompts cannot query it.',
      'Versioned strategies (v1, v2) treat positioning, content pillars, and channel cadences like software releases tied to measurable 30-day cohorts.',
      'Drafting a new strategy revision should always be separate from approving it—preventing mid-campaign drift.',
    ],
    problemStatement: {
      heading: 'The Static Deck Trap',
      body: 'Most companies spend weeks crafting a 40-page Brand Strategy PDF. Two weeks later, the social media manager is staring at a blank cursor, the blog writer is chasing random keywords, and an AI chat window is being fed a two-sentence summary. Because the strategy is disconnected from the drafting environment, every post becomes an isolated improvisation.',
      antiPattern: 'Unversioned PDF decks + ad-hoc prompt instructions + changing direction every Tuesday without cohort evidence.',
      connectedPattern: 'Executable Strategy v1 → 30-day multi-channel execution → Cohort evaluation → Draft & Approve Strategy v2.',
    },
    sections: [
      {
        id: 'anatomy-of-executable-strategy',
        heading: '1. The Anatomy of an Executable Brand Strategy',
        paragraphs: [
          'For a strategy to actively guide human writers and AI generators alike, it must be decomposed into explicit, queryable primitives rather than vague motivational statements. Instead of saying "We want to be thought leaders in outdoor gear," an executable strategy defines five concrete layers: Audience Segments, Core Pillars, Channel Roles, KPIs, and Active Hypotheses.',
          'Each Content Pillar acts as a thematic boundary with a clear job to do: for example, Pillar A educates on practical packing constraints, Pillar B demonstrates hardware durability under rain and vibration, and Pillar C highlights rider route stories. When every article and social post maps to a pillar, topical authority compounds naturally.',
        ],
        callout: {
          label: 'ARCHITECTURAL RULE',
          text: 'If a strategic rule cannot be used to reject an off-brand draft in 10 seconds, it is a slogan—not a strategy.',
        },
        codeBlock: {
          caption: 'Executable Strategy Specification (JSON / YAML Mental Model)',
          language: 'json',
          code: `{
  "workspace": "fieldwork",
  "version": "v2.0",
  "status": "approved",
  "objective": "Position DRIFT 4L as the stable handlebar system for 2-day gravel escapes",
  "pillars": [
    { "id": "packing-physics", "weight": 0.45, "goal": "Show what fits in 4L and why weight distribution matters" },
    { "id": "mounting-rigidity", "weight": 0.35, "goal": "Demonstrate zero-sway attachment on rough descents" },
    { "id": "route-readiness", "weight": 0.20, "goal": "Weekend packing lists and weather checklists" }
  ],
  "channelRoles": {
    "website": "Canonical deep-dive guides & SEO landing articles",
    "instagram": "5-slide visual breakdowns & mounting close-ups",
    "linkedin": "Product design philosophy & material engineering notes",
    "x": "Punchy field observations & direct article hooks"
  },
  "experiment": {
    "windowDays": 30,
    "hypothesis": "Leading with concrete 4-litre packing lists increases article click-through vs. lifestyle riding photos"
  }
}`,
        },
      },
      {
        id: 'draft-vs-approved-versions',
        heading: '2. Why Strategy Needs Draft vs. Approved States',
        paragraphs: [
          'In software engineering, you never edit production code directly without a commit history and a release gate. Content operations suffer when someone tweaks positioning mid-week: half the scheduled queue reflects last month’s messaging, while new drafts test an unreviewed angle.',
          'By separating Strategy Drafts from the Active Approved Strategy, your team or AI agent can synthesize 30-day analytics into a proposed v2 draft, review the exact diff in pillars and channel cadences, and explicitly approve v2 when the next campaign cycle begins.',
        ],
      },
      {
        id: 'channel-roles-over-crossposting',
        heading: '3. Defining Explicit Channel Roles',
        paragraphs: [
          'Not every channel serves the same stage of awareness. A living strategy assigns distinct functional roles to your website, Instagram, Facebook, X, and LinkedIn. Your website acts as the durable hub where search intent and deep product context live; social channels act as high-frequency lenses that translate one core story into native formats.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Comparison of Brand Strategy Maturity Models',
      headers: ['Dimension', 'Static PDF Brand Book', 'Versioned Living Strategy (MUMRO Pattern)'],
      rows: [
        ['Where it lives', 'External drive or Notion page nobody opens during drafting', 'Directly inside the workspace, feeding every generator & editor'],
        ['Change management', 'Silent edits or total rewrite once a year', 'Explicit v1 → v2 versions with Draft and Approved states'],
        ['Connection to AI', 'Copy-pasted snippets in chat windows', 'Automatically injected into article, post, carousel, and MCP tools'],
        ['Link to analytics', 'None—metrics are reviewed in isolation', 'Cohort results directly generate Strategy v2 recommendations'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes (FIELDWORK / DRIFT 4L — Demo Workspace)',
      scenarioTitle: 'Evolving from Strategy v1 (Generic Lifestyle) to Strategy v2 (Concrete Utility)',
      context: 'In Strategy v1, Cycling Escapes posted broad scenic gravel photography. Reach was decent, but readers kept asking in comments what actually fits inside a 4-litre handlebar bag.',
      executionSteps: [
        'Reviewed the 30-day cohort and identified high save rates on posts mentioning exact gear lists.',
        'Created Strategy v2 Draft shifting Pillar 1 to "Two Days, Four Litres" concrete packing breakdowns.',
        'Approved Strategy v2 so both the website article editor and 4-channel social studio inherited the new positioning.',
      ],
      resultNote: 'Every subsequent format—article, 5-slide carousel, and social post—shared the same concrete utility angle.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'Versioned strategies that power your entire workspace.',
      summary: 'In MUMRO, strategy is not a passive document. You maintain versioned strategies with goals, audience, pillars, channel plans, KPIs, and experiments—and promote drafts to active only when you approve them.',
      capabilities: [
        'Keep versioned brand strategies (v1, v2) with separate Draft and Approved states.',
        'Turn cohort analytics directly into a reviewable strategy draft (`create_content_strategy_draft`).',
        'Automatically share active strategy context across articles, posts, carousels, replies, and MCP agents.',
      ],
      anchorHref: 'https://mumro.io/#benefits',
      anchorLabel: 'See connected strategy in MUMRO',
    },
    checklist: {
      title: 'Lesson 01 Self-Audit Checklist',
      items: [
        'Our brand strategy defines 3–5 concrete content pillars with clear boundaries.',
        'Each connected channel (Website, IG, FB, X, LinkedIn) has a distinct role rather than identical copy.',
        'We version our strategy changes (v1 → v2) based on 30-day cohort evidence rather than daily impulses.',
        'Our drafting environment and AI tools read the active strategy automatically without manual copy-pasting.',
      ],
    },
  },
  {
    slug: 'brand-voice-architecture',
    number: 'LESSON 02',
    trackId: 'brand-systems',
    difficulty: 'Foundations',
    difficultyLabel: 'Foundations',
    readingTimeMinutes: 10,
    title: 'Brand Voice Architecture: Encoding Tone, Boundaries, and Vocabulary for Humans & AI',
    subtitle: 'Why adjectives like "friendly and professional" produce generic AI slop—and how to build enforceable voice specifications.',
    metaDescription: 'Learn how to engineer a Brand Voice specification that works for both human editors and LLMs: syntax rhythm, domain vocabulary, and strict negative boundaries.',
    keywords: ['brand voice architecture', 'AI brand voice', 'tone of voice rules', 'negative constraints LLM', 'content governance'],
    keyTakeaways: [
      'Adjectives ("modern, authentic, bold") mean nothing to an LLM; structural rules and negative boundaries ("never use hype superlatives") create real voice consistency.',
      'A complete Brand Voice profile combines Cadence Rules, Domain Vocabulary, Proof Standards, and Forbidden Claims.',
      'Shared Brand Voice must apply equally to long-form articles, social captions, and customer reply suggestions.',
    ],
    problemStatement: {
      heading: 'Why "Friendly & Professional" Sounds Like Everyone Else',
      body: 'When you tell an AI model or a new contractor to write in a "friendly, expert, and engaging tone," it defaults to the statistical average of the internet: empty rhetorical questions, emojis at the start of every bullet, and inflated promises. True Brand Voice is defined as much by what your brand refuses to say as by how it constructs sentences.',
      antiPattern: 'Vague personality adjectives + no forbidden phrases + different tone in blog posts vs. comment replies.',
      connectedPattern: 'Explicit sentence cadence + domain lexicon + hard claim boundaries shared across all generators and reply tools.',
    },
    sections: [
      {
        id: 'four-pillars-of-voice',
        heading: '1. The Four Engineering Layers of Brand Voice',
        paragraphs: [
          'To make Brand Voice operational across a multi-channel system, replace mood-board adjectives with four testable layers: (1) Cadence & Syntax, (2) Domain Lexicon, (3) Evidence Standard, and (4) Negative Boundaries (Hard Stops).',
          'Cadence defines sentence length contrast, paragraph density, and how hooks open. For example, an engineering-led outdoor brand opens with physical measurements and field conditions ("Two days. Four litres. Wet cobbles at dusk.") rather than generic excitement ("Ready for your next adventure?!").',
        ],
        callout: {
          label: 'VOICE DESIGN PRINCIPLE',
          text: 'Negative constraints often filter out generic AI phrasing faster than positive style adjectives alone. Explicitly ban the clichés and unverified claims of your industry.',
        },
        codeBlock: {
          caption: 'Operational Brand Voice Contract (Fieldwork vs. Documentary Brand)',
          language: 'yaml',
          code: `brand_voice:
  id: fieldwork-technical-editorial
  cadence:
    opening_style: "Start with a concrete physical constraint, weight, volume, or trail condition."
    sentence_rhythm: "Alternate short declarative statements (4-8 words) with precise technical explanations."
  lexicon:
    prefer: ["handlebar clearance", "head-tube stability", "dry-bag seam", "4-litre load", "repair kit"]
    avoid: ["epic adventure", "game-changer", "unlock your potential", "must-have gear"]
  claim_boundaries:
    - "Never claim 100% waterproof submersion; specify rain and spray resistance."
    - "Never invent customer testimonials or unverified performance percentages."
  reply_policy:
    tone: "Direct, helpful, rider-to-rider. Answer fit and mounting questions with exact millimetre specs."`,
        },
      },
      {
        id: 'inspecting-voice-in-drafts',
        heading: '2. Verifying Voice Layer-by-Layer Inside a Draft',
        paragraphs: [
          'A Brand Voice profile shouldn’t be a black box. When reviewing a social post or article draft, an editor should be able to inspect exactly which paragraph reflects a factual source, which phrase executes the Brand Voice rhythm, and which sentence delivers the conversion goal.',
          'When writers and AI tools work within these explicit layers, switching a post from Instagram to LinkedIn changes the platform framing while keeping the brand’s unmistakable voice intact.',
        ],
      },
      {
        id: 'extending-voice-to-conversations',
        heading: '3. Extending Brand Voice to Comments and Website Chat',
        paragraphs: [
          'Brands often polish their main feed posts but break character in comment replies or website chat widgets. By binding your unified inbox and website assistant to the exact same Brand Voice profile and reply policy, audience interactions feel like a natural continuation of your content.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Generic Prompt Adjectives vs. Engineered Brand Voice',
      headers: ['Rule Type', 'Weak Adjective Prompt', 'Engineered Brand Voice Specification'],
      rows: [
        ['Opening Hook', '"Write an exciting hook"', '"Open with a specific number, dimension, or field condition without exclamation marks"'],
        ['Terminology', '"Sound like an expert"', '"Use exact component names (Voile straps, head-tube, cordura); ban buzzwords like game-changer"'],
        ['Honesty & Boundaries', '"Be trustworthy"', '"State exact capacity (4L) and mounting limits; never promise guaranteed results"'],
        ['Comment Replies', '"Reply politely"', '"Answer technical fit questions directly using saved workspace templates and voice rules"'],
      ],
    },
    caseStudy: {
      brand: 'Świadek Dziejów (Historical Documentary Demo Workspace)',
      scenarioTitle: 'Maintaining Archival Documentary Gravity Across YouTube, Instagram, and Articles',
      context: 'Świadek Dziejów produces historical narratives based on primary chronicles and grain-shipment records. Sensationalist tabloid phrasing would immediately destroy audience trust.',
      executionSteps: [
        'Configured Brand Voice to require primary-source attribution, dates, and archival calm.',
        'Banned modern internet slang and clickbait questions across all social variants.',
        'Applied the same voice profile to article drafts, visual captions, and audience comment replies.',
      ],
      resultNote: 'The workspace switches seamlessly from outdoor gear (Cycling Escapes) to historical documentary (Świadek Dziejów) without any cross-contamination of tone.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'One Brand Voice profile across articles, posts, replies, and assistant.',
      summary: 'MUMRO stores your Brand Voice and claim boundaries at the workspace level and feeds them into selected content generators, comment reply suggestions, and your website assistant.',
      capabilities: [
        'Shared Brand Voice across article drafting, social post creation, and visual bundles.',
        'Interactive context layers in the studio showing Sources, Brand Voice, and Content Goal per paragraph.',
        'Consistent reply suggestions in the unified inbox and website chatbot grounded in your voice and reply policy.',
      ],
      anchorHref: 'https://mumro.io/#workflow',
      anchorLabel: 'Inspect Brand Voice layers on mumro.io',
    },
    checklist: {
      title: 'Lesson 02 Self-Audit Checklist',
      items: [
        'We have replaced vague adjectives with concrete sentence-rhythm rules and before/after examples.',
        'We maintain a negative lexicon (words and clichés our brand never uses).',
        'Our claim boundaries explicitly state what products or services cannot promise.',
        'Our social comment replies and website assistant use the same Brand Voice rules as our main articles.',
      ],
    },
  },
  {
    slug: 'evidence-led-research-pipelines',
    number: 'LESSON 03',
    trackId: 'brand-systems',
    difficulty: 'Practitioner',
    difficultyLabel: 'Practitioner',
    readingTimeMinutes: 11,
    title: 'Evidence-Led Research Pipelines: RSS, Official Domains, and Source Provenance',
    subtitle: 'How to reduce AI hallucinations and generic content by separating raw sources from editorial interpretation (Source → Decision → Draft).',
    metaDescription: 'Build an evidence-led content research pipeline using curated RSS feeds, official domain allowlists, citation quality thresholds, and source-to-draft provenance.',
    keywords: ['evidence-led content research', 'RSS research pipeline', 'source provenance AI', 'prevent LLM hallucinations', 'content citations'],
    keyTakeaways: [
      'Never ask an LLM to simultaneously invent facts and write in your brand style; separate source gathering from drafting.',
      'Curated RSS feeds, official domain allowlists, and existing workspace articles create a high-signal research pool.',
      'Every draft should preserve a provenance trail: Source Material → Strategic Interpretation → Drafted Content.',
    ],
    problemStatement: {
      heading: 'The Zero-Provenance Content Crisis',
      body: 'The internet is flooded with AI-generated articles that summarize other summaries without a single primary source. When a writer or agent generates an article without a structured research input, two things happen: facts blur into plausible-sounding hallucinations, and the resulting piece has zero original angle.',
      antiPattern: 'Prompting "Write a 1,500-word guide on bikepacking bags" with no source material or citation rules.',
      connectedPattern: 'Curated RSS / Official Domains / Workspace Articles → Source Evaluation → Editorial Brief → Provenance-Linked Draft.',
    },
    sections: [
      {
        id: 'three-step-provenance-chain',
        heading: '1. The Three-Step Provenance Chain: Source → Decision → Draft',
        paragraphs: [
          'High-credibility content teams enforce a strict separation between three artifacts: (1) The Raw Source (what an external study, archival document, or field test actually recorded), (2) The Editorial Decision (why this fact matters to our audience and how it connects to our active strategy pillar), and (3) The Draft (the article or post written in our Brand Voice).',
          'Keeping raw facts separate from brand interpretation prevents subtle distortion. An editor can verify the source quote in isolation before approving how the brand frames it.',
        ],
        callout: {
          label: 'PROVENANCE CONTRACT',
          text: 'Previewing a research source should never overwrite an active draft without an explicit editorial handoff.',
        },
        codeBlock: {
          caption: 'Provenance Handoff Structure (Source → Interpretation → Brief)',
          language: 'json',
          code: `{
  "sourceEntry": {
    "id": "src-bikepacking-load-test-2026",
    "origin": "Official Field Test Log / RSS Feed",
    "verifiedFact": "Loads above 1.8 kg mounted high on drop bars increase steering oscillation on loose gravel descents.",
    "citationUrl": "https://example.org/field-notes/handlebar-mass-distribution"
  },
  "editorialInterpretation": {
    "strategyPillar": "packing-physics",
    "brandDecision": "Use the 1.8 kg threshold to explain why DRIFT 4L limits volume to 4 litres and keeps heavy tools low in the frame."
  },
  "handoffToArticle": {
    "preserveSourceCitation": true,
    "applyBrandVoice": "fieldwork-technical-editorial",
    "respectClaimBoundaries": true
  }
}`,
        },
      },
      {
        id: 'curating-research-inputs',
        heading: '2. Curating RSS Feeds, Official Domains, and Workspace Knowledge',
        paragraphs: [
          'Unfiltered web search returns SEO spam. Instead, configure dedicated Research Profiles per workspace that combine three trusted tiers: curated RSS feeds from primary industry publications, an allowlist of official domains (standards bodies, documentation, archival repositories), and your own previously published workspace articles.',
          'By reusing your own verified workspace articles as source material for follow-up pieces and carousels, your content library becomes a compounding knowledge graph rather than a graveyard of forgotten blog posts.',
        ],
      },
      {
        id: 'citation-thresholds-and-human-review',
        heading: '3. Setting Quality Thresholds and Citation Review',
        paragraphs: [
          'Automated domain filtering is a filter, not a substitute for human judgment. Establish clear citation rules: require every technical or historical claim in an article draft to link back to its originating source entry, and verify citations before scheduling CMS delivery.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Unfiltered LLM Generation vs. Evidence-Led Research Pipeline',
      headers: ['Stage', 'Unfiltered Prompting', 'Evidence-Led Pipeline (MUMRO Pattern)'],
      rows: [
        ['Input sources', 'Model training weights + random web snippets', 'Selected RSS feeds, official domain lists, and workspace articles'],
        ['Fact vs. Opinion', 'Blended together inside one generated paragraph', 'Explicitly separated: Source Fact → Brand Interpretation → Draft'],
        ['Traceability', 'No record of where a statistic or claim originated', 'Visible Source Trail attached to the article brief and editor'],
        ['Reuse value', 'One-off output that cannot be trusted as future reference', 'Verified articles become reusable sources inside the workspace'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes & Świadek Dziejów (Demo Workspaces)',
      scenarioTitle: 'Dual-Workspace Provenance: From Field Notes & Chronicles to Article Drafts',
      context: 'Both workspaces rely on verifiable facts: Cycling Escapes cites physical load-stability measurements, while Świadek Dziejów cites 16th-century river trade registers.',
      executionSteps: [
        'Each workspace inspects three distinct source materials with clear provenance metadata.',
        'The editor reviews the separated interpretation showing how the raw fact connects to the brand’s strategy.',
        'An explicit handoff transfers the chosen brief into the article editor while preserving the source name and brand boundaries.',
      ],
      resultNote: 'Writers never start from a blank page, and readers get concrete, citation-backed depth.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'Research profiles, citation rules, and explicit source-to-article handoffs.',
      summary: 'MUMRO lets you build research from selected RSS feeds, web sources, and saved workspace articles—carrying provenance from the first source inspection all the way into the drafted article.',
      capabilities: [
        'Configure research profiles with selected RSS feeds, web search, and official domain requirements.',
        'Inspect Source → Interpretation → Draft trails (`SourceTrail`) before transferring a brief to the editor.',
        'Reuse published workspace articles as verified source material for future campaigns.',
      ],
      anchorHref: 'https://mumro.io/#product',
      anchorLabel: 'Explore research provenance in MUMRO',
    },
    checklist: {
      title: 'Lesson 03 Self-Audit Checklist',
      items: [
        'We maintain a curated list of primary RSS feeds and official domains for our industry.',
        'Our briefs separate the raw source fact from our editorial angle before drafting begins.',
        'Every article draft records which source material it was derived from.',
        'We reuse our best published articles as structured source material for new formats.',
      ],
    },
  },
  {
    slug: 'one-story-multi-channel-architecture',
    number: 'LESSON 04',
    trackId: 'multi-format-distribution',
    difficulty: 'Practitioner',
    difficultyLabel: 'Practitioner',
    readingTimeMinutes: 10,
    title: 'One Story, Four Channels: Adapting Core Narratives Without Copy-Paste Fatigue',
    subtitle: 'How to turn one researched narrative into a canonical website article, a 5-slide carousel, and native posts for Instagram, Facebook, X, and LinkedIn.',
    metaDescription: 'Learn the One Story, Multi-Channel content engineering framework: adapting one core narrative across your website, Instagram, Facebook, X, and LinkedIn without copy-paste fatigue.',
    keywords: ['multi-channel content strategy', 'content repurposing framework', 'one story multiple formats', 'social media adaptation', 'MUMRO content studio'],
    keyTakeaways: [
      'Publishing 20 disconnected ideas a month creates noise; publishing 4 deeply researched stories adapted across 5 formats builds authority.',
      'Every channel requires native framing (hook, length, visual ratio, link placement) while staying grounded in the same verified source facts and claim boundaries.',
      'Your website article is the canonical anchor; social formats are specialized entry points into that story.',
    ],
    problemStatement: {
      heading: 'The False Choice Between Copy-Paste and Burnout',
      body: 'Content teams usually fall into one of two traps: either they paste the exact same paragraph onto Instagram, LinkedIn, Facebook, and X (where it underperforms everywhere because platform idioms differ), or they invent separate, unconnected topics for each channel until the team burns out.',
      antiPattern: 'Identical caption pasted across 4 social networks with raw URLs dropped in the middle of the text.',
      connectedPattern: 'One researched canonical story → Website Article + 5-Slide Carousel + 4 channel-native social drafts sharing one context.',
    },
    sections: [
      {
        id: 'canonical-story-decomposition',
        heading: '1. The Canonical Story Decomposition Matrix',
        paragraphs: [
          'Start every campaign cycle with a single, high-substance narrative anchored by verified research and your active strategy pillar. Before touching any social composer, define the Canonical Core: the central tension, the factual proof, the practical takeaway, and the destination URL on your website.',
          'From that Canonical Core, derive format-specific expressions: the Website Article explores the full argument with structured headings and SEO depth; the 5-Slide Carousel distills the sequence into visual cards; and the four social channel drafts adapt the hook and CTA to how people actually read on each feed.',
        ],
        callout: {
          label: 'MULTI-FORMAT PRINCIPLE',
          text: 'Change the lens, never the facts. Every channel variant must trace back to the same source facts and Brand Voice rules.',
        },
        codeBlock: {
          caption: 'One Story → Four Channel Framing Contract',
          language: 'yaml',
          code: `story_id: drift-4l-two-days-four-litres
canonical_article: "/journal/two-days-four-litres-handlebar-packing/"
shared_facts:
  - "4-litre capacity holds rain shell, tools, spare tube, and 2 days of trail food"
  - "Three-point head-tube strap prevents cable rub and steering sway"
channel_variants:
  instagram:
    format: "5-slide carousel + structured caption"
    hook: "Two days. Four litres. Everything on the bars instead of your back."
    cta: "Save this packing list for your next weekend route."
  facebook:
    format: "Community story post + direct article link"
    hook: "What do you actually pack when you leave the big panniers at home for a weekend?"
    cta: "Read the full packing breakdown on our site + share your setup in the comments."
  x:
    format: "High-density field note"
    hook: "Most weekend rides don't need 20L of luggage. They need 4L packed in the right order."
    cta: "Full breakdown & weight distribution notes ↓"
  linkedin:
    format: "Product engineering & design note"
    hook: "Why we limited DRIFT to 4 litres instead of chasing a bigger bag."
    cta: "How constraint-led product design shaped our mounting geometry."`,
        },
      },
      {
        id: 'layer-transparency-in-captions',
        heading: '2. Maintaining Context Transparency Across Variants',
        paragraphs: [
          'When reviewing four social variants side by side, editors need to verify that platform adaptation didn’t accidentally strip out the core proof or violate Brand Voice. Structure each caption into three clear functional blocks: Paragraph 1 sets the channel-native hook grounded inBrand Voice; Paragraph 2 delivers the verified source detail; Paragraph 3 states the explicit content goal and next action.',
        ],
      },
      {
        id: 'connecting-social-to-website',
        heading: '3. Platform-Aware Link Placement (Main Body vs. First Comment)',
        paragraphs: [
          'Different platforms treat external links differently. While Facebook and X can carry direct article links or thread continuations, LinkedIn and Instagram often benefit from clean native reading in the main post paired with a synchronized first-comment link or bio hub. Planning the article and its social promotion in one workflow ensures the URL is ready before the social posts enter the queue.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Channel-Native Framing for One Canonical Story',
      headers: ['Channel', 'Primary Reader Mindset', 'Optimal Adaptation Pattern'],
      rows: [
        ['Website / CMS', 'High-intent search & deep evaluation', 'Complete 1,200+ word guide, schema.org markup, internal links, and grounded assistant'],
        ['Instagram', 'Visual discovery & quick saves', '5-slide visual carousel + tactile 3-paragraph caption focused on saveable utility'],
        ['LinkedIn', 'Professional insight & system design', 'Engineering/strategy rationale behind the decision + discussion prompt'],
        ['X & Facebook', 'Fast signal scanning & community discussion', 'Punchy thesis statement on X; conversational question + direct article link on Facebook'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes (FIELDWORK / DRIFT 4L — Demo Workspace)',
      scenarioTitle: 'One Story ("Two Days. Four Litres.") Across Article, Carousel, and 4 Channels',
      context: 'Instead of inventing four unrelated posts for the week, Cycling Escapes develops one story about packing for a 48-hour gravel trip into a complete multi-format package.',
      executionSteps: [
        'Published the foundational guide to the website CMS with packing specs and mounting geometry.',
        'Generated a 5-slide visual carousel breaking down the exact contents of the 4-litre bag.',
        'Prepared tailored captions for Instagram, Facebook, X, and LinkedIn—each preserving the exact source facts, Brand Voice, and content goal.',
      ],
      resultNote: 'The selected channel variant transfers directly to the MUMRO editor or MCP scheduling flow without retyping.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'One story studio with 5-slide carousels, 4 channels, and context inspection.',
      summary: 'MUMRO’s Story & Content Studio lets you develop one researched article into visual bundles, a 5-slide carousel, and tailored posts for Instagram, Facebook, X, and LinkedIn—with clickable layers showing Sources, Brand Voice, and Goal.',
      capabilities: [
        'Compare and refine Instagram, Facebook, X, and LinkedIn variants of the same story side by side.',
        'Toggle Sources / Brand Voice / Content Goal highlights directly on the post caption.',
        'Transfer any channel draft straight into the workspace editor or schedule it through MCP confirmation.',
      ],
      anchorHref: 'https://mumro.io/#workflow',
      anchorLabel: 'Try the multi-channel Story Studio on mumro.io',
    },
    checklist: {
      title: 'Lesson 04 Self-Audit Checklist',
      items: [
        'Every weekly campaign starts from a single researched story rather than disconnected daily prompts.',
        'Our Instagram, Facebook, X, and LinkedIn drafts use platform-native hooks while citing the same facts.',
        'We can identify the source fact, Brand Voice rule, and conversion goal in every social caption.',
        'Our social posts connect back to a canonical article on our website.',
      ],
    },
  },
  {
    slug: 'carousel-and-visual-storytelling',
    number: 'LESSON 05',
    trackId: 'multi-format-distribution',
    difficulty: 'Practitioner',
    difficultyLabel: 'Practitioner',
    readingTimeMinutes: 9,
    title: 'High-Retention Carousels: Structural Pacing from Hook Slide to Action',
    subtitle: 'How to engineer 5-slide educational and product carousels that earn swipes, saves, and qualified traffic.',
    metaDescription: 'Master the 5-slide carousel engineering framework: visual hierarchy, typography density, narrative tension across slides 1 to 5, and turning articles into visual bundles.',
    keywords: ['5-slide carousel framework', 'Instagram LinkedIn carousel design', 'visual storytelling pacing', 'article to carousel', 'content design'],
    keyTakeaways: [
      'A carousel is a sequential micro-article: every slide must resolve one question while opening the loop for the next swipe.',
      'The canonical 5-slide arc (Hook → Constraint/Problem → Mechanism → Proof in Use → Action/Summary) gives readers a clear reason to keep swiping from problem to takeaway.',
      'Visual restraint—clear editorial typography, generous margins, and one focal point per slide—outperforms cluttered graphic templates.',
    ],
    problemStatement: {
      heading: 'Why Most Carousels Lose Readers on Slide 2',
      body: 'Many teams treat carousels as a dump of bullet points pasted onto random Canva backgrounds. Slide 1 has a vague title, Slide 2 is a wall of 80 words in 11px font, and Slides 3–5 repeat the same point. Without deliberate narrative pacing and visual hierarchy, readers scroll past before reaching your core insight.',
      antiPattern: 'Overcrowded slides + inconsistent fonts + no narrative progression between Slide 1 and Slide 5.',
      connectedPattern: 'Disciplined 5-slide narrative arc + consistent editorial typography + direct derivation from a researched article.',
    },
    sections: [
      {
        id: 'five-slide-narrative-arc',
        heading: '1. The Canonical 5-Slide Narrative Arc',
        paragraphs: [
          'Five slides is the sweet spot for technical and product storytelling: long enough to prove real expertise, compact enough that every single card carries weight. Design your 5-slide sequence around five distinct cognitive beats:',
          'Slide 01 (The Concrete Hook): State a sharp, specific premise or constraint ("Two days. Four litres."). Slide 02 (The Packing / Structural Breakdown): Show the anatomy of the solution. Slide 03 (The Engineering Mechanism): Explain how stability or execution works under stress. Slide 04 (Proof in the Field): Show the system operating in real conditions. Slide 05 (The Takeaway & Next Step): Give a saveable summary and clear path to the full article.',
        ],
        callout: {
          label: 'TYPOGRAPHIC RULE FOR CAROUSELS',
          text: 'Limit each slide to one headline (max 8 words) and one supporting paragraph (max 25 words). Let visual hierarchy do the work.',
        },
        codeBlock: {
          caption: '5-Slide Carousel Blueprint (Derived from Article Key Points)',
          language: 'json',
          code: `[
  { "slide": 1, "role": "Hook", "headline": "Two days. Four litres.", "subcopy": "Everything you need for a weekend gravel escape—on your bars, not your back." },
  { "slide": 2, "role": "Breakdown", "headline": "What actually goes inside.", "subcopy": "Ultralight rain shell, spare tube, multi-tool, mini pump, and 48 hours of trail nutrition." },
  { "slide": 3, "role": "Mechanism", "headline": "Locked to the head tube.", "subcopy": "Three-point cam straps and an internal stiffener eliminate bar drop and cable pinch." },
  { "slide": 4, "role": "Field Proof", "headline": "Fast on rough descents.", "subcopy": "Low rotational inertia keeps steering crisp when tarmac turns to washboard gravel." },
  { "slide": 5, "role": "Takeaway", "headline": "Pack lighter this weekend.", "subcopy": "Read the full packing checklist and geometry guide on our website." }
]`,
        },
      },
      {
        id: 'visual-continuity-and-brand-tokens',
        heading: '2. Visual Continuity: Paper, Ink, and Signal Accents',
        paragraphs: [
          'Your social visuals should look like they belong to the same world as your website. By using consistent design tokens—warm off-white paper backgrounds (`#f5f3ed`), deep ink typography (`#20231f`), high-contrast serif headlines (`Instrument Serif`), and a single intentional signal accent (`#e7471b`)—readers recognize your brand in their feed before even reading your handle.',
        ],
      },
      {
        id: 'accessibility-and-alt-text',
        heading: '3. Accessible Carousels: Keyboard Navigation and Descriptive Alt Text',
        paragraphs: [
          'When embedding carousels on the web or publishing to social platforms, never trap content inside unlabelled images. Provide localized descriptive `alt` text for every slide, explicit Previous/Next controls without disorienting infinite auto-rotation, and full text equivalents in the DOM.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Slide-by-Slide Pacing Diagnostic',
      headers: ['Slide #', 'Common Mistake', 'High-Retention Engineering Pattern'],
      rows: [
        ['Slide 01', 'Generic title ("Tips for Bikepacking")', 'Concrete numerical tension ("Two days. Four litres.")'],
        ['Slide 02–03', 'Wall of tiny bullet points copied from a blog', 'One clear diagram or scene per slide: Packing → Mounting'],
        ['Slide 04', 'Repeating the claim without context', 'Real-world condition proof (riding stability on gravel)'],
        ['Slide 05', '"Follow us for more!" with no substance', 'Actionable checklist summary + direct bridge to the full article'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes (FIELDWORK / DRIFT 4L — Demo Workspace)',
      scenarioTitle: 'Turning Article Key Points into a 5-Slide Visual Story',
      context: 'The team needed a repeatable way to turn technical gear guides into high-save Instagram and LinkedIn carousels without hiring a full-time motion designer for every post.',
      executionSteps: [
        'Extracted 5 sequential beats from the canonical packing article.',
        'Paired Slides 1–5 with three consistent campaign scenes (Packing, Mounting, Riding) and clear editorial typography.',
        'Synchronized the 5-slide carousel with channel-specific captions ready for scheduling.',
      ],
      resultNote: 'The 5-slide carousel and 4-channel captions are derived from one article outline, giving readers a coherent 5-part reference instead of disconnected slides.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'Turn articles and researched stories directly into 5-slide carousels.',
      summary: 'MUMRO converts article key points and researched narratives into structured visual bundles and 5-slide carousels that stay aligned with your Brand Voice and workspace media library.',
      capabilities: [
        'Generate 5-slide carousels directly from researched stories and workspace articles.',
        'Pair slides with curated workspace media assets and consistent visual templates.',
        'Configure recurring carousel pipelines (`AG11`) with approved sources and scheduling rules.',
      ],
      anchorHref: 'https://mumro.io/#workflow',
      anchorLabel: 'See the 5-slide carousel preview on mumro.io',
    },
    checklist: {
      title: 'Lesson 05 Self-Audit Checklist',
      items: [
        'Our carousels follow a clear 5-step arc (Hook → Breakdown → Mechanism → Proof → Takeaway).',
        'Every slide has under 35 words and a single unmistakable visual focal point.',
        'Our carousel typography and color palette match our website design system.',
        'Every slide includes descriptive alt text and works without auto-playing motion.',
      ],
    },
  },
  {
    slug: 'reliable-publishing-queues-and-cadence',
    number: 'LESSON 06',
    trackId: 'multi-format-distribution',
    difficulty: 'Architecture',
    difficultyLabel: 'Architecture',
    readingTimeMinutes: 11,
    title: 'Publishing Operations: Queues, Time Slots, Idempotency, and Per-Channel Receipts',
    subtitle: 'Why "queued" is not "published"—and how to run resilient multi-target publishing operations without duplicate posts or silent failures.',
    metaDescription: 'Learn the engineering behind reliable social and CMS publishing: slot scheduling, multi-target status tracking, idempotency keys, delivery receipts, and safe retries.',
    keywords: ['publishing queue architecture', 'idempotent social publishing', 'multi-target publishing', 'social media cadence', 'MUMRO publishing queue'],
    keyTakeaways: [
      'A post in a queue is an intention, not a result; external platform APIs fail, rate-limit, or reject media asynchronously.',
      'Multi-target publications must track state independently per channel so retrying a failed target never duplicates a succeeded one.',
      'Per-channel slot schedules create predictable audience habits without manual timestamp picking on every draft.',
    ],
    problemStatement: {
      heading: 'The Illusion of the "Schedule" Button',
      body: 'In fragile scheduling tools, clicking "Schedule to 4 channels" treats the entire batch as a single boolean. If Instagram succeeds at 18:00 but LinkedIn times out due to a transient API error, a naive retry either fails silently or double-posts to Instagram. Serious content operations require durable job tracking, per-target receipts, and idempotent retries.',
      antiPattern: 'All-or-nothing batch scripts + no deduplication keys + manual re-uploading when one channel fails.',
      connectedPattern: 'Draft → Validated Queue Slot → Per-Target Execution → Confirmed Receipt or Scoped Retry.',
    },
    sections: [
      {
        id: 'state-machine-of-a-publication',
        heading: '1. The Lifecycle State Machine of a Multi-Target Publication',
        paragraphs: [
          'Every publication in a professional system moves through distinct, auditable states: `draft` (editable in workspace, never touches external APIs), `scheduled / queued` (assigned to a specific timestamp or next available slot), `processing` (worker dispatching per target), and terminal per-target states: `published` (with external platform receipt ID/URL) or `failed` (with actionable error diagnostics).',
          'Separating the parent publication container from its per-channel delivery targets is critical. When a story goes out to Instagram, Facebook, X, and LinkedIn, each channel target maintains its own status, timestamp, and external receipt.',
        ],
        callout: {
          label: 'RELIABILITY PRINCIPLE',
          text: 'Never retry a multi-channel publication without checking per-target receipts. Retry only the failed target while preserving confirmed deliveries.',
        },
        codeBlock: {
          caption: 'Multi-Target Publication Job & Idempotent Retry Contract',
          language: 'json',
          code: `{
  "publicationId": "pub_drift4l_oct11",
  "idempotencyKey": "fieldwork:drift-4l-pack:2026-10-11T18:00Z",
  "scheduledFor": "2026-10-11T18:00:00Z",
  "targets": [
    {
      "channel": "instagram",
      "status": "published",
      "receiptId": "ig_media_17982341",
      "publishedAt": "2026-10-11T18:00:04Z"
    },
    {
      "channel": "linkedin",
      "status": "failed",
      "error": "UPSTREAM_TIMEOUT_504",
      "retryEligible": true
    }
  ],
  "retryPolicy": "Retry only targets where status === 'failed'; preserve 'published' receipts."
}`,
        },
      },
      {
        id: 'cadence-and-next-available-slot',
        heading: '2. Designing Per-Channel Cadences and Next-Slot Scheduling',
        paragraphs: [
          'Picking arbitrary dates and minutes for every single post wastes cognitive energy. Instead, define per-channel weekly slot templates based on historical audience engagement windows (for example: Instagram Tuesday/Thursday 18:00, LinkedIn Wednesday 08:30, Website Article Tuesday 07:00).',
          'When a draft is approved, operators or authorized agents can either assign an exact timestamp or select "Next available slot," letting the queue engine place it cleanly without colliding with existing scheduled items.',
        ],
      },
      {
        id: 'pre-flight-validation',
        heading: '3. Pre-Flight Validation Before Entering the Queue',
        paragraphs: [
          'Media aspect ratios, video duration limits, character counts, and first-comment URLs vary across platforms. Validate capability constraints at draft/prepare time—so formatting errors are caught in the studio, not at 18:00 when the queue fires.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Naive Scheduling vs. Resilient Publishing Queue Architecture',
      headers: ['Capability', 'Basic Social Scheduler', 'Durable Publishing System (MUMRO Pattern)'],
      rows: [
        ['Draft boundary', 'Easy to accidentally publish while editing', 'Strict separation between Drafts and the Publishing Queue'],
        ['Multi-channel tracking', 'Single status for the whole post', 'Separate status and receipt for every target channel'],
        ['Failure recovery', 'Manual re-creation or risk of duplicate posts', 'Idempotent retry of failed work while preserving confirmed targets'],
        ['Slot selection', 'Manual calendar clicking every time', 'Per-channel schedules, exact time, or next available slot preview'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes (FIELDWORK / DRIFT 4L — Demo Workspace)',
      scenarioTitle: 'Coordinating a 4-Channel Launch Week with Per-Channel Schedules',
      context: 'During the DRIFT 4L campaign, the team scheduled coordinated drops across Instagram, Facebook, X, and LinkedIn alongside the website article.',
      executionSteps: [
        'Configured per-channel slot schedules matching peak reader activity for each network.',
        'Used `preview_schedule` to inspect upcoming queue slots before committing new drafts.',
        'Tracked individual delivery receipts per channel in the Publishing & Calendar view.',
      ],
      resultNote: 'Full visibility into what is Draft, Scheduled, Published, or Needs Retry across both workspaces.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'Drafts, slot queues, per-target receipts, and safe retries.',
      summary: 'MUMRO provides a durable publishing queue and calendar with per-channel schedules, next-slot previews, separate target tracking, and idempotent retry handling.',
      capabilities: [
        'Prepare drafts safely before moving them into the active publishing queue (`PUB-01`).',
        'Choose an exact timestamp or preview the next available channel slot (`PUB-02`).',
        'Track separate results per target channel and retry failed jobs without duplicating confirmed posts (`PUB-03`, `PUB-04`).',
      ],
      anchorHref: 'https://mumro.io/#publishing',
      anchorLabel: 'See the publishing queue & calendar on mumro.io',
    },
    checklist: {
      title: 'Lesson 06 Self-Audit Checklist',
      items: [
        'We maintain a strict boundary between working drafts and approved queue items.',
        'Each social channel has defined weekly publishing slots based on audience data.',
        'Our system records a separate delivery status and receipt for each target platform.',
        'We can retry a failed channel delivery without re-publishing to channels that already succeeded.',
      ],
    },
  },
];

const pl: LessonData[] = [
  {
    slug: 'versioned-brand-strategy',
    number: 'LEKCJA 01',
    trackId: 'brand-systems',
    difficulty: 'Foundations',
    difficultyLabel: 'Fundamenty',
    readingTimeMinutes: 9,
    title: 'Wersjonowana strategia marki: dlaczego statyczne PDF-y zawodzą współczesne zespoły',
    subtitle: 'Jak ustrukturyzować strategię marki jako żywy, wersjonowany kontrakt operacyjny (v1 → zmierzona kohorta → v2), który realnie prowadzi każdy format treści.',
    metaDescription: 'Dowiedz się, jak zastąpić statyczne księgi marki w PDF wersjonowanym systemem strategii treści: filary, grupy odbiorców, role kanałów i hipotezy na 30 dni.',
    keywords: ['wersjonowana strategia marki', 'system strategii treści', 'filary komunikacji', 'iteracja kohortowa', 'strategia MUMRO'],
    keyTakeaways: [
      'Strategia zamknięta w prezentacji PDF przestaje działać w dniu startu publikacji, bo copywriterzy i prompty AI nie mają do niej bezpośredniego dostępu.',
      'Wersjonowana strategia (v1, v2) traktuje pozycjonowanie, filary tematyczne i rytm kanałów jak wydania oprogramowania powiązane z 30-dniowymi kohortami.',
      'Tworzenie szkicu nowej wersji strategii musi być oddzielone od jej zatwierdzenia — co chroni kampanię przed chaotycznymi zmianami w połowie tygodnia.',
    ],
    problemStatement: {
      heading: 'Pułapka martwej prezentacji PDF',
      body: 'Większość firm poświęca tygodnie na stworzenie 40-stronicowej strategii marki w PDF. Dwa tygodnie później osoba od social mediów patrzy w pusty edytor, autor bloga dobiera przypadkowe słowa kluczowe, a do czatu AI trafia dwuzdaniowe streszczenie. Ponieważ strategia jest odcięta od środowiska pracy nad treścią, każdy post staje się osobną improwizacją.',
      antiPattern: 'Niewersjonowane pliki PDF + dopisywanie wskazówek z głowy w promptach + zmiana kierunku co wtorek bez danych z kohorty.',
      connectedPattern: 'Wykonywalna Strategia v1 → 30 dni spójnej publikacji → Ocena kohorty → Szkic i zatwierdzenie Strategii v2.',
    },
    sections: [
      {
        id: 'anatomy-of-executable-strategy',
        heading: '1. Anatomia wykonywalnej strategii marki',
        paragraphs: [
          'Aby strategia realnie prowadziła zarówno redaktorów, jak i generatory AI, musi być rozpisana na jednoznaczne elementy strukturalne, a nie ogólne hasła motywacyjne. Zamiast pisać „Chcemy być liderem opinii w sprzęcie outdoorowym”, wykonywalna strategia definiuje pięć konkretnych warstw: Segmenty Odbiorców, Filary Treści (Content Pillars), Role Kanałów, KPI oraz Aktywne Hipotezy.',
          'Każdy filar treści pełni konkretną funkcję poznawczą: np. Filar A uczy fizyki pakowania na krótkie wyprawy, Filar B pokazuje stabilność mocowania w deszczu i na wybojach, a Filar C prezentuje gotowe trasy weekendowe. Gdy każdy artykuł i post jest przypisany do filaru, autorytet tematyczny marki rośnie z tygodnia na tydzień.',
        ],
        callout: {
          label: 'REGUŁA ARCHITEKTONICZNA',
          text: 'Jeśli zapis w strategii nie pozwala w 10 sekund odrzucić nietrafionego szkicu posta, to jest to slogan reklamowy, a nie strategia.',
        },
        codeBlock: {
          caption: 'Specyfikacja wykonywalnej strategii (Model danych JSON / YAML)',
          language: 'json',
          code: `{
  "workspace": "fieldwork",
  "version": "v2.0",
  "status": "approved",
  "objective": "Pozycjonowanie DRIFT 4L jako stabilnej torby na kierownicę na 2-dniowe wyprawy szutrowe",
  "pillars": [
    { "id": "packing-physics", "weight": 0.45, "goal": "Pokazanie co mieści się w 4 litrach i jak rozkład masy wpływa na jazdę" },
    { "id": "mounting-rigidity", "weight": 0.35, "goal": "Demonstracja sztywnego mocowania bez bujania na zjazdach" },
    { "id": "route-readiness", "weight": 0.20, "goal": "Weekendowe listy pakowania i checklisty pogodowe" }
  ],
  "channelRoles": {
    "website": "Kanoniczne poradniki, specyfikacje i artykuły SEO",
    "instagram": "Karuzele 5 slajdów i zbliżenia na detale mocowania",
    "linkedin": "Notatki o projektowaniu produktu i inżynierii materiałowej",
    "x": "Krótkie obserwacje z trasy i bezpośrednie wejścia do artykułów"
  },
  "experiment": {
    "windowDays": 30,
    "hypothesis": "Otwieranie postów konkretną listą 4 litrów ekwipunku zwiększa przejścia do artykułu względem samych zdjęć krajobrazowych"
  }
}`,
        },
      },
      {
        id: 'draft-vs-approved-versions',
        heading: '2. Dlaczego strategia potrzebuje stanu Roboczego (Draft) i Zatwierdzonego (Approved)',
        paragraphs: [
          'W inżynierii oprogramowania nikt nie przepisuje systemu produkcyjnego na żywo bez historii zmian i bramki zatwierdzenia. W marketingu chaos zaczyna się wtedy, gdy ktoś zmienia przekaz w środku kampanii: połowa zaplanowanych postów mówi starym językiem, a nowe szkice testują nieuzgodniony kierunek.',
          'Oddzielenie Szkicu Strategii (Draft) od Aktywnej Strategii (Approved) pozwala zespołowi lub agentowi AI przekuć wnioski z 30-dniowej analityki w propozycję wersji v2, spokojnie porównać różnice w filarach i zatwierdzić nową wersję dokładnie w momencie startu kolejnego cyklu.',
        ],
      },
      {
        id: 'channel-roles-over-crossposting',
        heading: '3. Jawne role kanałów zamiast ślepego powielania',
        paragraphs: [
          'Nie każdy kanał odpowiada na tę samą potrzebę odbiorcy. Żywa strategia przypisuje osobne zadania stronie WWW, Instagramowi, Facebookowi, X oraz LinkedInowi. Strona WWW jest trwałym centrum wiedzy i SEO, a kanały społecznościowe działają jak soczewki przekładające jedną historię na natywne formaty.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Porównanie modeli zarządzania strategią marki',
      headers: ['Wymiar', 'Statyczna księga marki w PDF', 'Wersjonowana żywa strategia (Wzorzec MUMRO)'],
      rows: [
        ['Gdzie żyje', 'Na dysku lub w Notion, gdzie nikt nie zagląda podczas pisania', 'Bezpośrednio w workspace, zasilając każdy edytor i generator'],
        ['Zarządzanie zmianą', 'Ciche poprawki albo całkowity przepis raz w roku', 'Jawne wersje v1 → v2 z rozdzieleniem stanu Draft i Approved'],
        ['Połączenie z AI', 'Ręczne wklejanie fragmentów do okienka czatu', 'Automatyczny kontekst w artykułach, postach, karuzelach i MCP'],
        ['Związek z analityką', 'Brak — wykresy oglądane w oderwaniu od planu', 'Wyniki kohort bezpośrednio generują rekomendacje do Strategii v2'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe (FIELDWORK / DRIFT 4L — Przestrzeń demonstracyjna)',
      scenarioTitle: 'Przejście ze Strategii v1 (ogólny lifestyle) do Strategii v2 (konkretna użyteczność)',
      context: 'W Strategii v1 marka publikowała ogólne zdjęcia widokowe z tras. Zasięgi były poprawne, ale w komentarzach stale wracało pytanie: co konkretnie mieści się w 4-litrowej torbie na kierownicę?',
      executionSteps: [
        'Przeanalizowano kohortę 30 dni i wychwycono wysoki odsetek zapisów przy postach z dokładną listą sprzętu.',
        'Utworzono szkic Strategii v2 przesuwający główny filar na konkretne zestawienia „Dwa dni. Cztery litry.”.',
        'Zatwierdzono Strategię v2, dzięki czemu edytor artykułów oraz studio 4 kanałów przejęły nowe wytyczne.',
      ],
      resultNote: 'Każdy kolejny format — artykuł, karuzela 5 slajdów i posty — utrzymywał ten sam konkretny kąt komunikacji.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Wersjonowane strategie prowadzące całe Twoje workspace.',
      summary: 'W MUMRO strategia nie jest martwym plikiem. Prowadzisz wersjonowane strategie z celami, grupami odbiorców, filarami, planami kanałów, KPI i eksperymentami — a szkic staje się obowiązujący dopiero po Twoim zatwierdzeniu.',
      capabilities: [
        'Wersjonowane strategie marki (v1, v2) z osobnym zapisem wersji roboczej i zatwierdzeniem.',
        'Zamiana analizy wyników w gotowy do oceny szkic strategii (`create_content_strategy_draft`).',
        'Automatyczne przekazywanie aktywnej strategii do artykułów, postów, karuzel, odpowiedzi i agentów MCP.',
      ],
      anchorHref: 'https://mumro.io/pl/#benefits',
      anchorLabel: 'Zobacz połączoną strategię w MUMRO',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 01',
      items: [
        'Nasza strategia marki definiuje 3–5 konkretnych filarów tematycznych z jasnymi granicami.',
        'Każdy podłączony kanał (Strona WWW, IG, FB, X, LinkedIn) ma przypisaną odrębną rolę.',
        'Wersjonujemy zmiany strategii (v1 → v2) na podstawie 30-dniowych kohort, a nie chwilowych impulsów.',
        'Nasze narzędzia redakcyjne i AI odczytują aktualną strategię automatycznie bez ręcznego kopiowania.',
      ],
    },
  },
  {
    slug: 'brand-voice-architecture',
    number: 'LEKCJA 02',
    trackId: 'brand-systems',
    difficulty: 'Foundations',
    difficultyLabel: 'Fundamenty',
    readingTimeMinutes: 10,
    title: 'Architektura głosu marki: kodowanie tonu, granic i słownictwa dla ludzi i AI',
    subtitle: 'Dlaczego przymiotniki „przyjazny i profesjonalny” generują sztuczny bełkot AI — i jak zbudować egzekwowalną specyfikację Brand Voice.',
    metaDescription: 'Dowiedz się, jak zaprojektować specyfikację Brand Voice dla redaktorów i modeli AI: rytm składni, słownik domenowy oraz twarde granice obietnic.',
    keywords: ['architektura brand voice', 'głos marki AI', 'zasady tone of voice', 'ograniczenia negatywne LLM', 'spójność komunikacji'],
    keyTakeaways: [
      'Przymiotniki („nowoczesny, autentyczny, odważny”) nic nie znaczą dla modelu AI; realną spójność budują reguły składni oraz twarde zakazy („nigdy nie używaj hiperboli”).',
      'Kompletny profil Brand Voice łączy Rytm Zdań, Słownik Domenowy, Standard Dowodów i Granice Twierdzeń.',
      'Wspólny Brand Voice musi działać identycznie w długich artykułach, postach social media i podpowiedziach odpowiedzi na komentarze.',
    ],
    problemStatement: {
      heading: 'Dlaczego „przyjazny i ekspercki” brzmi jak każdy inny profil w sieci',
      body: 'Gdy prosisz model AI lub nowego copywritera o pisanie w „przyjaznym, eksperckim i angażującym tonie”, otrzymujesz statystyczną średnią internetu: puste pytania retoryczne, rzędy emotikonów i przesadzone obietnice. Prawdziwy głos marki definiuje się w równym stopniu przez to, jak budujesz zdania, co przez to, czego marce nigdy nie wolno powiedzieć.',
      antiPattern: 'Ogólnikowe przymiotniki osobowości + brak listy zakazanych fraz + inny ton w artykułach, a inny w komentarzach.',
      connectedPattern: 'Jawny rytm składni + słownik pojęć + twarde granice obietnic współdzielone przez wszystkie generatory i moduł odpowiedzi.',
    },
    sections: [
      {
        id: 'four-pillars-of-voice',
        heading: '1. Cztery warstwy inżynieryjne Brand Voice',
        paragraphs: [
          'Aby Brand Voice działał w systemie wielokanałowym, zastąp przymiotniki z moodboardu czterema sprawdzalnymi warstwami: (1) Rytm i Składnia (Cadence), (2) Słownik Domenowy (Lexicon), (3) Standard Dowodu (Evidence) oraz (4) Granice Negatywne (Hard Boundaries).',
          'Rytm określa długość zdań, gęstość akapitów i sposób otwierania tekstu. Przykładowo techniczna marka sprzętu rowerowego otwiera tekst konkretnym wymiarem i warunkami na trasie („Dwa dni. Cztery litry. Mokry bruk o zmierzchu.”), zamiast pustym okrzykiem („Gotowi na przygodę życia?!”).',
        ],
        callout: {
          label: 'ZASADA PROJEKTOWANIA GŁOSU MARKI',
          text: 'Ograniczenia negatywne często skuteczniej odfiltrowują sztampowe frazy AI niż same przymiotniki stylu. Jawnie zablokuj klisze językowe i nieuzasadnione obietnice swojej branży.',
        },
        codeBlock: {
          caption: 'Operacyjny kontrakt Brand Voice (Przykład technicznej marki outdoorowej)',
          language: 'yaml',
          code: `brand_voice:
  id: fieldwork-technical-editorial
  cadence:
    opening_style: "Zaczynaj od konkretnego ograniczenia fizycznego, wagi, pojemności lub warunku na trasie."
    sentence_rhythm: "Przeplataj krótkie zdania oznajmujące (4-8 słów) z precyzyjnym wyjaśnieniem technicznym."
  lexicon:
    prefer: ["prześwit przy kierownicy", "stabilność przy główce ramy", "szczelny szew", "ładunek 4 litrów", "zestaw naprawczy"]
    avoid: ["epicka przygoda", "rewolucyjne rozwiązanie", "uwolnij swój potencjał", "absolutny must-have"]
  claim_boundaries:
    - "Nigdy nie obiecuj wodoszczelności przy pełnym zanurzeniu; precyzuj odporność na deszcz i błoto."
    - "Nigdy nie zmyślaj opinii klientów ani niepotwierdzonych procentów wzrostu."
  reply_policy:
    tone: "Bezpośredni, pomocny, konkretny. Na pytania o montaż odpowiadaj wymiarami w milimetrach."`,
        },
      },
      {
        id: 'inspecting-voice-in-drafts',
        heading: '2. Weryfikacja warstw głosu marki bezpośrednio w szkicu',
        paragraphs: [
          'Profil Brand Voice nie powinien być czarną skrzynką. Podczas redakcji posta lub artykułu redaktor powinien widzieć jak na dłoni, który akapit wynika ze źródła faktów, które sformułowanie realizuje rytm Brand Voice, a które zdanie odpowiada za cel biznesowy publikacji.',
          'Dzięki temu przełączenie posta z Instagrama na LinkedIn zmienia oprawę właściwą dla platformy, ale zachowuje ten sam charakterystyczny ton marki.',
        ],
      },
      {
        id: 'extending-voice-to-conversations',
        heading: '3. Rozszerzenie Brand Voice na komentarze i czatbota WWW',
        paragraphs: [
          'Wiele marek dba o styl głównych postów, ale w odpowiedziach na komentarze lub w czacie na stronie wpada w sztywny żargon call-center. Połączenie wspólnej skrzynki odbiorczej (Unified Inbox) oraz asystenta WWW z tym samym profilem Brand Voice sprawia, że każda rozmowa brzmi spójnie.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Ogólnikowy prompt vs. inżynieryjna specyfikacja Brand Voice',
      headers: ['Obszar', 'Słaby prompt przymiotnikowy', 'Specyfikacja inżynieryjna Brand Voice'],
      rows: [
        ['Otwarcie tekstu', '„Napisz chwytliwy wstęp”', '„Otwórz konkretną liczbą, pojemnością lub warunkiem terenowym bez wykrzykników”'],
        ['Słownictwo', '„Pisz jak ekspert”', '„Używaj dokładnych nazw elementów (paski cam, główka ramy, cordura); zakaz słów typu game-changer”'],
        ['Uczciwość i granice', '„Bądź wiarygodny”', '„Podawaj dokładną pojemność (4L) i warunki montażu; nie obiecuj gwarantowanych wyników”'],
        ['Odpowiedzi w komentarzach', '„Odpowiadaj uprzejmie”', '„Odpowiadaj na pytania montażowe konkretnym wymiarem, korzystając z szablonów i polityki marki”'],
      ],
    },
    caseStudy: {
      brand: 'Świadek Dziejów (Kanał dokumentalno-historyczny — Przestrzeń demonstracyjna)',
      scenarioTitle: 'Utrzymanie powagi archiwalnego dokumentu na YouTube, Instagramie i w artykułach',
      context: 'Świadek Dziejów tworzy opowieści historyczne oparte na kronikach i rejestrach spławu zboża. Tabloidowe nagłówki natychmiast zniszczyłyby zaufanie widzów.',
      executionSteps: [
        'Zdefiniowano Brand Voice wymagający powołania na źródło, datowania oraz spokojnego, archiwalnego rytmu narracji.',
        'Zablokowano współczesny slang internetowy i krzykliwe pytania we wszystkich wariantach społecznościowych.',
        'Zastosowano ten sam profil głosu do szkiców artykułów, podpisów pod grafikami i odpowiedzi na komentarze.',
      ],
      resultNote: 'Przełączenie workspace’u z Wypraw Rowerowych na Świadka Dziejów zmienia cały ton i słownictwo bez mieszania kontekstów.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Jeden profil Brand Voice w artykułach, postach, odpowiedziach i czatbocie.',
      summary: 'MUMRO przechowuje Brand Voice i granice marki na poziomie workspace’u, przekazując je do generatorów treści, sugestii odpowiedzi na komentarze oraz asystenta strony WWW.',
      capabilities: [
        'Wspólny Brand Voice dla artykułów, postów społecznościowych i pakietów wizualnych (`SC02`).',
        'Klikalne warstwy kontekstu na poście podświetlające Źródła, Głos marki oraz Cel treści.',
        'Podpowiedzi odpowiedzi w komentarzach i czatbocie WWW zgodne z głosem i polityką odpowiedzi marki (`ENG-03`, `H06`).',
      ],
      anchorHref: 'https://mumro.io/pl/#workflow',
      anchorLabel: 'Zobacz warstwy Brand Voice na mumro.io',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 02',
      items: [
        'Zastąpiliśmy ogólne przymiotniki konkretnymi regułami długości zdań i przykładami otwarć.',
        'Posiadamy listę słów i fraz zakazanych w komunikacji naszej marki.',
        'Nasze granice twierdzeń jasno określają, czego nie wolno obiecywać w imieniu produktu.',
        'Odpowiedzi na komentarze i asystent na stronie korzystają z tego samego profilu głosu co artykuły.',
      ],
    },
  },
  {
    slug: 'evidence-led-research-pipelines',
    number: 'LEKCJA 03',
    trackId: 'brand-systems',
    difficulty: 'Practitioner',
    difficultyLabel: 'Praktyka',
    readingTimeMinutes: 11,
    title: 'Research oparty na dowodach: kanały RSS, oficjalne domeny i pochodzenie źródeł',
    subtitle: 'Jak ograniczyć halucynacje AI i wtórne teksty przez oddzielenie surowego źródła od interpretacji marki (Źródło → Decyzja → Szkic).',
    metaDescription: 'Zbuduj proces researchu treści oparty na wyselekcjonowanych kanałach RSS, oficjalnych domenach, wymogach cytowania i jawnym pochodzeniu briefu.',
    keywords: ['research treści RSS', 'pochodzenie źródeł AI', 'source provenance', 'ochrona przed halucynacjami LLM', 'cytowania w content marketingu'],
    keyTakeaways: [
      'Nigdy nie proś modelu AI jednocześnie o wymyślenie faktów i napisanie tekstu w stylu marki; oddziel zbieranie źródeł od redakcji.',
      'Wybrane kanały RSS, lista oficjalnych domen oraz zapisane artykuły w workspace tworzą wiarygodną bazę wejściową.',
      'Każdy szkic powinien zachowywać ślad pochodzenia (provenance): Materiał źródłowy → Interpretacja strategiczna → Szkic.',
    ],
    problemStatement: {
      heading: 'Kryzys treści bez pochodzenia',
      body: 'Internet jest zalany tekstami generowanymi przez AI, które streszczają inne streszczenia bez ani jednego źródła pierwotnego. Gdy copywriter lub agent tworzy artykuł bez ustrukturyzowanego wejścia badawczego, fakty rozmywają się w prawdopodobnie brzmiące zmyślenia, a tekst traci jakąkolwiek oryginalną wartość.',
      antiPattern: 'Wpisywanie promptu „Napisz artykuł o torbach rowerowych” bez materiału źródłowego i bez weryfikacji cytowań.',
      connectedPattern: 'Kanały RSS / Oficjalne domeny / Artykuły w workspace → Ocena źródła → Brief redakcyjny → Szkic z zachowanym pochodzeniem.',
    },
    sections: [
      {
        id: 'three-step-provenance-chain',
        heading: '1. Trzystopniowy łańcuch pochodzenia: Źródło → Decyzja → Szkic',
        paragraphs: [
          'Zespoły tworzące treści wysokiej próby pilnują twardego rozdziału trzech elementów: (1) Surowego Źródła (co dokładnie odnotowano w badaniu, kronice lub teście terenowym), (2) Decyzji Redakcyjnej (dlaczego ten fakt jest ważny dla naszych odbiorców i jak łączy się z filarem strategii) oraz (3) Szkicu (tekstu napisanego w głosie marki).',
          'Oddzielenie faktu źródłowego od interpretacji marki chroni przed nieświadomym przekręcaniem danych. Redaktor może najpierw sprawdzić prawdziwość źródła, zanim zatwierdzi sposób jego opowiedzenia.',
        ],
        callout: {
          label: 'KONTRAKT POCHODZENIA (PROVENANCE)',
          text: 'Sam podgląd materiału źródłowego nigdy nie powinien nadpisywać roboczego artykułu bez jawnego przekazania wybranego briefu.',
        },
        codeBlock: {
          caption: 'Struktura przekazania briefu ze śladem źródła (Source → Interpretation → Brief)',
          language: 'json',
          code: `{
  "sourceEntry": {
    "id": "src-bikepacking-load-test-2026",
    "origin": "Dziennik testów terenowych / Kanał RSS",
    "verifiedFact": "Ładunek powyżej 1,8 kg zawieszony wysoko na kierownicy zwiększa bezwładność sterowania na luźnym szutrze.",
    "citationUrl": "https://example.org/field-notes/handlebar-mass-distribution"
  },
  "editorialInterpretation": {
    "strategyPillar": "packing-physics",
    "brandDecision": "Wykorzystaj próg 1,8 kg, aby wyjaśnić dlaczego DRIFT 4L ogranicza pojemność do 4 litrów i trzyma ciężkie narzędzia nisko."
  },
  "handoffToArticle": {
    "preserveSourceCitation": true,
    "applyBrandVoice": "fieldwork-technical-editorial",
    "respectClaimBoundaries": true
  }
}`,
        },
      },
      {
        id: 'curating-research-inputs',
        heading: '2. Selekcja kanałów RSS, oficjalnych domen i wiedzy w workspace',
        paragraphs: [
          'Niefiltrowane wyszukiwanie w sieci zwraca głównie spam SEO. Zamiast tego skonfiguruj w swoim workspace profil researchu łączący trzy zaufane źródła: wyselekcjonowane kanały RSS z publikacji branżowych, listę oficjalnych domen (instytucje, dokumentacja techniczna, archiwa) oraz własne artykuły zapisane wcześniej w workspace.',
          'Wykorzystywanie własnych, zweryfikowanych artykułów jako materiału źródłowego dla kolejnych postów i karuzel sprawia, że biblioteka treści zaczyna procentować.',
        ],
      },
      {
        id: 'citation-thresholds-and-human-review',
        heading: '3. Progi jakości źródeł i kontrola cytowań',
        paragraphs: [
          'Lista dozwolonych domen to świetny filtr wstępny, ale nie zastępuje oceny redakcyjnej. Ustal jasny standard: każde twierdzenie techniczne lub historyczne w szkicu artykułu musi wskazywać konkretne źródło wejściowe przed zaplanowaniem publikacji w CMS.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Generowanie z pustego promptu vs. research oparty na dowodach',
      headers: ['Etap', 'Generowanie bez źródeł', 'Proces oparty na dowodach (Wzorzec MUMRO)'],
      rows: [
        ['Materiał wejściowy', 'Pamięć modelu językowego i przypadkowe strony z sieci', 'Wybrane kanały RSS, oficjalne domeny i artykuły z workspace'],
        ['Fakt a opinia', 'Zmieszane w jednym wygenerowanym akapicie', 'Jawnie rozdzielone: Fakt ze źródła → Interpretacja marki → Szkic'],
        ['Śledzenie pochodzenia', 'Brak informacji, skąd wzięła się dana liczba lub teza', 'Widoczny ślad źródła (Source Trail) przypięty do briefu i edytora'],
        ['Wartość długofalowa', 'Jednorazowy tekst, na którym trudno oprzeć kolejne materiały', 'Zweryfikowane artykuły stają się źródłem dla kolejnych kampanii'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe & Świadek Dziejów (Przestrzenie demonstracyjne)',
      scenarioTitle: 'Ślad pochodzenia w dwóch przestrzeniach: od testów terenowych i kronik do artykułu',
      context: 'Obie marki opierają autorytet na sprawdzalnych faktach: Wyprawy Rowerowe powołują się na fizykę obciążenia kierownicy, a Świadek Dziejów na szesnastowieczne rejestry spławu wiślanego.',
      executionSteps: [
        'W każdym workspace redaktor przegląda trzy konkretne materiały z oznaczonym pochodzeniem.',
        'Osobna warstwa pokazuje interpretację: jak surowy fakt łączy się ze strategią i głosem marki.',
        'Jawne kliknięcie przenosi wybrany brief do edytora artykułu, zachowując nazwę źródła i reguły generowania.',
      ],
      resultNote: 'Redaktor nigdy nie startuje od pustej kartki, a czytelnik otrzymuje rzetelny materiał z jasnym rodowodem.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Profile researchu, kontrola cytowań i jawne przekazanie briefu do artykułu.',
      summary: 'MUMRO pozwala prowadzić research z wybranych kanałów RSS, źródeł internetowych i zapisanych artykułów — zachowując ślad pochodzenia od pierwszego przeglądu aż do edytora artykułu.',
      capabilities: [
        'Tworzenie researchu z wybranych kanałów RSS, wyszukiwania web oraz listy oficjalnych domen (`SC05`, `SC06`).',
        'Przegląd ścieżki Źródło → Interpretacja → Szkic (`SourceTrail`) przed przekazaniem briefu do artykułu.',
        'Wykorzystywanie zapisanych w workspace artykułów jako materiału źródłowego (`SC07`).',
      ],
      anchorHref: 'https://mumro.io/pl/#product',
      anchorLabel: 'Zobacz moduł researchu i źródeł w MUMRO',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 03',
      items: [
        'Posiadamy wyselekcjonowaną listę kanałów RSS i oficjalnych domen dla naszej branży.',
        'Nasze briefy oddzielają surowy fakt źródłowy od interpretacji marketingowej przed rozpoczęciem pisania.',
        'Każdy szkic artykułu zachowuje informację o materiale źródłowym, z którego powstał.',
        'Wykorzystujemy nasze najlepsze opublikowane artykuły jako bazę źródłową dla nowych formatów.',
      ],
    },
  },
  {
    slug: 'one-story-multi-channel-architecture',
    number: 'LEKCJA 04',
    trackId: 'multi-format-distribution',
    difficulty: 'Practitioner',
    difficultyLabel: 'Praktyka',
    readingTimeMinutes: 10,
    title: 'Jedna historia, cztery kanały: adaptacja narracji bez mechanicznego kopiowania',
    subtitle: 'Jak rozwinąć jeden zbadany temat w kanoniczny artykuł na stronę, 5-slajdową karuzelę oraz natywne posty na Instagram, Facebook, X i LinkedIn.',
    metaDescription: 'Poznaj warsztat rozwijania jednej historii w wiele formatów: artykuł WWW, karuzelę 5 slajdów oraz dopasowane posty na Instagram, Facebook, X i LinkedIn.',
    keywords: ['wielokanałowa dystrybucja treści', 'jedna historia wiele formatów', 'repurposing treści', 'adaptacja postów social media', 'studio treści MUMRO'],
    keyTakeaways: [
      'Publikowanie 20 niepowiązanych ze sobą wpisów miesięcznie tworzy szum; przepracowanie 4 głębokich historii w 5 formatach buduje autorytet.',
      'Każdy kanał wymaga własnego otwarcia, rytmu i sposobu linkowania, ale powinien opierać się na tych samych zweryfikowanych faktach źródłowych i granicach twierdzeń.',
      'Artykuł na własnej stronie WWW jest kotwicą całej historii; formaty społecznościowe prowadzą do niego z różnych perspektyw.',
    ],
    problemStatement: {
      heading: 'Fałszywy wybór między „kopiuj-wklej” a wypaleniem zespołu',
      body: 'Zespoły marketingowe zazwyczaj wpadają w jedną z dwóch skrajności: albo wklejają identyczny tekst na Instagrama, LinkedIna, Facebooka i X (gdzie wszędzie radzi sobie słabo, bo ignoruje specyfikę platformy), albo wymyślają dla każdego kanału osobne tematy od zera, tracąc spójność i czas.',
      antiPattern: 'Identyczny opis wklejony na 4 platformy z surowym linkiem wrzuconym w środek tekstu.',
      connectedPattern: 'Jedna zbadana historia → Artykuł WWW + Karuzela 5 slajdów + 4 dopasowane posty ze wspólnym kontekstem.',
    },
    sections: [
      {
        id: 'canonical-story-decomposition',
        heading: '1. Matryca dekompozycji kanonicznej historii',
        paragraphs: [
          'Rozpoczynaj każdy cykl kampanii od jednej mocnej historii opartej na zweryfikowanym źródle i aktywnym filarze strategii. Zanim otworzysz edytor postów, zdefiniuj Rdzeń Historii: główne napięcie, dowód merytoryczny, praktyczną korzyść dla czytelnika oraz docelowy adres artykułu na stronie.',
          'Z tego rdzenia wyprowadź powiązane formaty: Artykuł WWW rozwija pełną argumentację z nagłówkami pod SEO; Karuzela 5 slajdów przekłada proces na wizualne karty; a cztery warianty postów dopasowują otwarcie (hook) i wezwanie do działania (CTA) do nawyków odbiorców danej platformy.',
        ],
        callout: {
          label: 'ZASADA WIELU FORMATÓW',
          text: 'Zmieniaj soczewkę, nigdy fakty. Każdy wariant kanałowy musi zachowywać te same dane źródłowe i reguły Brand Voice.',
        },
        codeBlock: {
          caption: 'Kontrakt adaptacji jednej historii na cztery kanały społecznościowe',
          language: 'yaml',
          code: `story_id: drift-4l-two-days-four-litres
canonical_article: "/pl/journal/dwa-dni-cztery-litry-pakowanie-na-kierownice/"
shared_facts:
  - "Pojemność 4 litrów mieści kurtkę przeciwdeszczową, narzędzia, dętkę i jedzenie na 2 dni"
  - "Trzypunktowe mocowanie do główki ramy eliminuje ocieranie pancerzy i bujanie kierownicy"
channel_variants:
  instagram:
    format: "Karuzela 5 slajdów + trzyczęściowy podpis"
    hook: "Dwa dni. Cztery litry. Kurtka, przekąski i zestaw naprawczy na kierownicy, zamiast na plecach."
    cta: "Zapisz listę pakowania przed kolejnym weekendem na szutrze."
  facebook:
    format: "Historia dla społeczności + bezpośredni link do artykułu"
    hook: "Co naprawdę zabieracie na dwudniowy wyjazd, gdy duże sakwy zostają w domu?"
    cta: "Zobacz pełny układ 4 litrów w artykule na stronie i napisz w komentarzu, bez czego nie ruszasz w trasę."
  x:
    format: "Zwięzła notatka z trasy"
    hook: "Na dwudniową trasę nie potrzebujesz 20 litrów bagażu. Potrzebujesz 4 litrów spakowanych we właściwej kolejności."
    cta: "Rozkład masy i lista sprzętu w pełnym wpisie ↓"
  linkedin:
    format: "Notatka o projektowaniu produktu i inżynierii"
    hook: "Dlaczego ograniczyliśmy torbę DRIFT do 4 litrów, zamiast ścigać się na większy litraż."
    cta: "O tym, jak ograniczenia fizyki jazdy ukształtowały naszą geometrię mocowania."`,
        },
      },
      {
        id: 'layer-transparency-in-captions',
        heading: '2. Przejrzystość warstw kontekstu w każdym poście',
        paragraphs: [
          'Porównując cztery warianty posta obok siebie, redaktor musi mieć pewność, że adaptacja pod platformę nie zgubiła dowodu ze źródła ani nie złamała głosu marki. Buduj podpis posta z trzech czytelnych bloków: Akapit 1 to otwarcie w rytmie Brand Voice; Akapit 2 to konkretny fakt ze źródła; Akapit 3 to cel treści i kolejny krok odbiorcy.',
        ],
      },
      {
        id: 'connecting-social-to-website',
        heading: '3. Świadome linkowanie: treść główna vs. pierwszy komentarz',
        paragraphs: [
          'Każda platforma inaczej traktuje linki wychodzące. Podczas gdy na Facebooku i X naturalnie sprawdza się bezpośredni link lub rozwinięcie w wątku, na LinkedInie i Instagramie często lepiej działa czysty tekst natywny połączony z linkiem do artykułu w pierwszym komentarzu lub na stronie link-in-bio. Przygotowanie artykułu i postów w jednym procesie gwarantuje, że docelowy adres URL jest gotowy przed startem kolejki.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Adaptacja jednej historii do specyfiki czterech kanałów',
      headers: ['Kanał', 'Nastawienie odbiorcy', 'Optymalny wzorzec adaptacji'],
      rows: [
        ['Strona WWW / CMS', 'Szukanie pogłębionej odpowiedzi i weryfikacja oferty', 'Kompletny poradnik, nagłówki semantyczne, dane strukturalne SEO i czatbot z wiedzą'],
        ['Instagram', 'Wizualne odkrywanie i zapisywanie praktycznych wskazówek', 'Karuzela 5 slajdów + konkretny opis nastawiony na zapisanie posta (Save)'],
        ['LinkedIn', 'Wymiana doświadczeń projektowych i biznesowych', 'Kulisy decyzji produktowej / procesowej + pytanie otwierające merytoryczną dyskusję'],
        ['X oraz Facebook', 'Szybki skan konkretu (X) lub rozmowa w społeczności (FB)', 'Mocna teza techniczna na X; otwarte pytanie i link do artykułu na Facebooku'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe (FIELDWORK / DRIFT 4L — Przestrzeń demonstracyjna)',
      scenarioTitle: 'Jedna historia („Dwa dni. Cztery litry.”) jako artykuł, karuzela i 4 posty kanałowe',
      context: 'Zamiast wymyślać cztery oderwane tematy na dany tydzień, zespół Wypraw Rowerowych rozwija jeden temat dwudniowego pakowania w kompletny pakiet wielokanałowy.',
      executionSteps: [
        'Przygotowano kanoniczny artykuł na stronę WWW z wymiarami i zasadami rozkładu masy.',
        'Wygenerowano 5-slajdową karuzelę pokazującą krok po kroku zawartość 4-litrowej torby.',
        'Dopracowano warianty na Instagram, Facebook, X i LinkedIn — z podglądem warstw Źródła, Głosu marki i Celu treści.',
      ],
      resultNote: 'Wybrany wariant można jednym kliknięciem przekazać do edytora MUMRO lub do zaplanowania przez agenta MCP.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Studio jednej historii z karuzelą 5 slajdów, 4 kanałami i podglądem kontekstu.',
      summary: 'Studio treści MUMRO pozwala rozwinąć jeden artykuł w pakiet grafik, karuzelę 5 slajdów oraz dopasowane posty na Instagram, Facebook, X i LinkedIn — z możliwością podświetlenia Źródeł, Głosu marki i Celu treści.',
      capabilities: [
        'Porównywanie wariantów posta dla Instagrama, Facebooka, X i LinkedIna w jednym widoku (`SC11`).',
        'Włączanie warstw Źródła / Głos marki / Cel treści podświetlających dokładny akapit i uzasadnienie.',
        'Bezpośrednie przekazanie wybranego tekstu do edytora publikacji lub procesu MCP.',
      ],
      anchorHref: 'https://mumro.io/pl/#workflow',
      anchorLabel: 'Wypróbuj Studio historii na mumro.io',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 04',
      items: [
        'Każda kampania tygodniowa wychodzi od jednej zbadanej historii zamiast przypadkowych codziennych promptów.',
        'Nasze wersje na Instagram, Facebook, X i LinkedIn mają osobne otwarcia, ale opierają się na tych samych faktach.',
        'W każdym szkicu posta potrafimy wskazać akapit ze źródłem, regułę Brand Voice oraz cel publikacji.',
        'Posty społecznościowe są powiązane z kanonicznym artykułem na naszej stronie WWW.',
      ],
    },
  },
  {
    slug: 'carousel-and-visual-storytelling',
    number: 'LEKCJA 05',
    trackId: 'multi-format-distribution',
    difficulty: 'Practitioner',
    difficultyLabel: 'Praktyka',
    readingTimeMinutes: 9,
    title: 'Karuzele o wysokiej retencji: rytm konstrukcyjny od pierwszego slajdu do działania',
    subtitle: 'Jak projektować 5-slajdowe karuzele edukacyjne i produktowe, które zatrzymują uwagę, zbierają zapisy i kierują ruch na stronę.',
    metaDescription: 'Opanuj warsztat budowy 5-slajdowych karuzel: hierarchia wizualna, gęstość typografii, napięcie narracyjne od slajdu 1 do 5 oraz zamiana artykułu w pakiet grafik.',
    keywords: ['karuzela 5 slajdów', 'projektowanie karuzel Instagram LinkedIn', 'storytelling wizualny', 'artykuł na karuzelę', 'hierarchia typograficzna'],
    keyTakeaways: [
      'Karuzela to sekwencyjny mikro-artykuł: każdy slajd musi dawać konkretną odpowiedź i jednocześnie budzić ciekawość przed kolejnym przesunięciem.',
      'Kanoniczny rytm 5 slajdów (Napięcie → Zawartość/Problem → Mechanizm → Dowód w terenie → Podsumowanie/Krok) daje czytelnikowi powód, by przejść od problemu do wniosku.',
      'Dyscyplina wizualna — wyrazista typografia, szerokie marginesy i jeden punkt ciężkości na slajd — wygrywa z przeładowanymi szablonami.',
    ],
    problemStatement: {
      heading: 'Dlaczego większość karuzel traci czytelnika na drugim slajdzie',
      body: 'Wiele zespołów traktuje karuzele jak schowek na wypunktowania skopiowane z bloga. Slajd 1 ma ogólnikowy tytuł, Slajd 2 to ściana 80 słów drobnym drukiem, a Slajdy 3–5 powtarzają tę samą myśl. Bez przemyślanego rytmu narracji i hierarchii typograficznej odbiorca przewija dalej, zanim dotrze do sedna.',
      antiPattern: 'Przeładowane tekstem karty + niespójne fonty + brak logicznego wynikania między Slajdem 1 a Slajdem 5.',
      connectedPattern: 'Zdyscyplinowany łuk 5 slajdów + spójna typografia redakcyjna + bezpośrednie wyprowadzenie z artykułu źródłowego.',
    },
    sections: [
      {
        id: 'five-slide-narrative-arc',
        heading: '1. Kanoniczny łuk narracyjny 5 slajdów',
        paragraphs: [
          'Pięć slajdów to optymalna długość dla historii produktowej lub technicznej: wystarczająco długa, by pokazać konkret, i wystarczająco zwarta, by żadna karta nie była „wypełniaczem”. Zaprojektuj sekwencję pięciu kart wokół pięciu kroków poznawczych:',
          'Slajd 01 (Konkretne Napięcie): Postaw precyzyjną tezę lub ograniczenie („Dwa dni. Cztery litry.”). Slajd 02 (Anatomia / Zawartość): Pokaż z bliska elementy rozwiązania. Slajd 03 (Mechanizm Działania): Wyjaśnij, jak konstrukcja zachowuje się pod obciążeniem. Slajd 04 (Dowód w Warunkach Realnych): Pokaż system w ruchu. Slajd 05 (Wnioski i Kolejny Krok): Daj podsumowanie warte zapisania oraz zaproszenie do pełnego artykułu.',
        ],
        callout: {
          label: 'REGUŁA TYPOGRAFICZNA KARUZELI',
          text: 'Ogranicz każdy slajd do jednego nagłówka (maks. 8 słów) i jednego krótkiego rozwinięcia (maks. 25 słów). Pozwól działać hierarchii.',
        },
        codeBlock: {
          caption: 'Struktura 5-slajdowej karuzeli wyprowadzonej z kluczowych punktów artykułu',
          language: 'json',
          code: `[
  { "slide": 1, "role": "Hook", "headline": "Dwa dni. Cztery litry.", "subcopy": "Wszystko, czego potrzebujesz na weekendową trasę — na kierownicy, zamiast na plecach." },
  { "slide": 2, "role": "Breakdown", "headline": "Co dokładnie wchodzi do środka.", "subcopy": "Lekka kurtka przeciwdeszczowa, zapasowa dętka, multitool, pompka i zapas energii na 48 godzin." },
  { "slide": 3, "role": "Mechanism", "headline": "Stabilnie przy główce ramy.", "subcopy": "Trzypunktowe paski i wewnętrzne usztywnienie chronią pancerze i zapobiegają opadaniu torby." },
  { "slide": 4, "role": "Field Proof", "headline": "Pewne prowadzenie na szutrze.", "subcopy": "Niska masa na kierownicy pozwala zachować precyzję w zakrętach i na szybkich zjazdach." },
  { "slide": 5, "role": "Takeaway", "headline": "Spakuj się lżej w ten weekend.", "subcopy": "Pełna lista pakowania i poradnik montażu czekają w artykule na naszej stronie." }
]`,
        },
      },
      {
        id: 'visual-continuity-and-brand-tokens',
        heading: '2. Ciągłość wizualna: papier, czerń i akcent sygnałowy',
        paragraphs: [
          'Twoje grafiki w social mediach powinny wyglądać jak naturalne przedłużenie strony WWW. Stosując te same tokeny projektowe — ciepłe tło papieru (`#f5f3ed`), głęboką czerń tekstu (`#20231f`), szeryfowe nagłówki (`Instrument Serif`) oraz pojedynczy akcent sygnałowy (`#e7471b`) — sprawiasz, że odbiorca rozpoznaje markę w ułamku sekundy.',
        ],
      },
      {
        id: 'accessibility-and-alt-text',
        heading: '3. Dostępność: obsługa klawiaturą i opisy alternatywne',
        paragraphs: [
          'Publikując karuzele na stronie WWW lub w social mediach, nigdy nie zamykaj treści wyłącznie w obrazkach. Zadbaj o dokładne opisy `alt` w obu językach, czytelne przyciski Poprzedni/Następny bez agresywnego samoczynnego przewijania oraz pełny tekst dostępny w kodzie HTML.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Diagnostyka rytmu karuzeli slajd po slajdzie',
      headers: ['Slajd', 'Częsty błąd', 'Wzorzec wysokiej retencji'],
      rows: [
        ['Slajd 01', 'Ogólnikowy tytuł („Jak spakować rower”)', 'Konkretne napięcie liczbowe („Dwa dni. Cztery litry.”)'],
        ['Slajd 02–03', 'Ściana drobnego tekstu skopiowana z artykułu', 'Jedna czytelna scena na kartę: Pakowanie → Mocowanie'],
        ['Slajd 04', 'Powtarzanie obietnicy bez kontekstu', 'Dowód działania w terenie (stabilna jazda po szutrze)'],
        ['Slajd 05', '„Zaobserwuj nas po więcej!” bez wartości', 'Konkretne podsumowanie + odnośnik do pełnego artykułu'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe (FIELDWORK / DRIFT 4L — Przestrzeń demonstracyjna)',
      scenarioTitle: 'Zamiana kluczowych punktów artykułu w 5-slajdową opowieść wizualną',
      context: 'Zespół potrzebował powtarzalnego sposobu na przekładanie technicznych artykułów o sprzęcie na angażujące karuzele na Instagram i LinkedIn.',
      executionSteps: [
        'Wyodrębniono 5 kolejnych kroków logicznych z artykułu o dwudniowym pakowaniu.',
        'Połączono karty 1–5 z trzema spójnymi ujęciami kampanii (Pakowanie, Mocowanie, Jazda) oraz redakcyjną typografią.',
        'Zsynchronizowano karuzelę z podpisami dla 4 kanałów gotowymi do kolejki publikacji.',
      ],
      resultNote: 'Karuzela 5 slajdów i podpisy dla 4 kanałów wynikają z jednego planu artykułu, tworząc spójną 5-częściową ściągawkę zamiast luźnych kart.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Zamieniaj artykuły i zebrane tematy bezpośrednio w 5-slajdowe karuzele.',
      summary: 'MUMRO przekształca kluczowe punkty artykułu i materiały z researchu w pakiety grafik oraz karuzele 5 slajdów spójne z Brand Voice i biblioteką mediów Twojej marki.',
      capabilities: [
        'Generowanie karuzel i pakietów wizualnych bezpośrednio z artykułów i researchu (`SC09`, `I01`).',
        'Łączenie slajdów z wybranymi zasobami z biblioteki mediów workspace’u.',
        'Konfiguracja cyklicznych karuzel ze źródłami i uprawnieniami (`AG11`).',
      ],
      anchorHref: 'https://mumro.io/pl/#workflow',
      anchorLabel: 'Zobacz podgląd 5-slajdowej karuzeli na mumro.io',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 05',
      items: [
        'Nasze karuzele trzymają się 5-stopniowego łuku (Napięcie → Zawartość → Mechanizm → Dowód → Działanie).',
        'Każdy slajd zawiera maksymalnie 35 słów i jeden wyraźny punkt skupienia wzroku.',
        'Typografia i kolorystyka karuzel są spójne z naszą stroną WWW.',
        'Każda karta posiada opis alternatywny (alt) i nie wymaga wymuszonej animacji do zrozumienia treści.',
      ],
    },
  },
  {
    slug: 'reliable-publishing-queues-and-cadence',
    number: 'LEKCJA 06',
    trackId: 'multi-format-distribution',
    difficulty: 'Architecture',
    difficultyLabel: 'Architektura',
    readingTimeMinutes: 11,
    title: 'Operacje publikacji: kolejki, okna czasowe, idempotentność i potwierdzenia per kanał',
    subtitle: 'Dlaczego „w kolejce” nie oznacza „opublikowano” — i jak prowadzić wielokanałową publikację bez duplikatów i cichych awarii.',
    metaDescription: 'Poznaj architekturę niezawodnej publikacji w social mediach i CMS: harmonogramy slotów, osobne statusy dla każdego kanału, idempotentność i bezpieczne ponawianie.',
    keywords: ['kolejka publikacji social media', 'idempotentność publikacji', 'publikacja wielokanałowa', 'harmonogram slotów', 'kolejka MUMRO'],
    keyTakeaways: [
      'Post w kolejce to zamiar, a nie wynik; zewnętrzne API platform społecznościowych mogą odrzucić plik, przekroczyć limit czasu lub opóźnić przetwarzanie.',
      'Publikacja do wielu celów (multi-target) musi śledzić wynik każdego kanału osobno, aby ponowienie błędu nie zduplikowało posta tam, gdzie już przeszedł.',
      'Stałe okna czasowe (sloty) per kanał budują nawyk odbiorców i eliminują ręczne ustawianie zegara przy każdym szkicu.',
    ],
    problemStatement: {
      heading: 'Iluzja przycisku „Zaplanuj wszędzie”',
      body: 'W prostych narzędziach do planowania kliknięcie „Zaplanuj na 4 kanały” traktuje całą paczkę jako jedną operację. Jeśli o 18:00 Instagram przyjmie publikację, ale API LinkedIna zwróci chwilowy błąd 504, naiwne ponowienie albo zgubi post po cichu, albo opublikuje go drugi raz na Instagramie. Profesjonalne operacje treści wymagają trwałego śledzenia zadań, osobnych potwierdzeń (receipts) i idempotentnych powtórek.',
      antiPattern: 'Zbiorcze skrypty „wszystko albo nic” + brak kluczy deduplikacji + ręczne wrzucanie od nowa przy błędzie jednej platformy.',
      connectedPattern: 'Szkic (Draft) → Zatwierdzony Slot w Kolejce → Wykonanie per cel → Potwierdzony wynik (Receipt) lub bezpieczne ponowienie (Retry).',
    },
    sections: [
      {
        id: 'state-machine-of-a-publication',
        heading: '1. Maszyna stanów wielokanałowej publikacji',
        paragraphs: [
          'Każda publikacja w dobrze zaprojektowanym systemie przechodzi przez jednoznaczne, audytowalne stany: `draft` (szkic roboczy w workspace, bezpieczny od przypadkowej wysyłki), `scheduled / queued` (przypisany do konkretnego terminu lub najbliższego slotu), `processing` (w trakcie wysyłki do dostawców) oraz końcowe stany per cel: `published` (z zapisanym identyfikatorem zewnętrznym platformy) lub `failed` (z dokładnym powodem błędu).',
          'Kluczowe jest oddzielenie nadrzędnego obiektu publikacji od jego celów kanałowych (targets). Gdy historia trafia na Instagram, Facebook, X i LinkedIn, każdy z tych kanałów posiada własny status, czas wykonania i potwierdzenie.',
        ],
        callout: {
          label: 'ZASADA NIEZAWODNOŚCI',
          text: 'Nigdy nie ponawiaj wielokanałowej publikacji na ślepo. Ponawiaj wyłącznie nieudane cele, zachowując potwierdzone już wyniki.',
        },
        codeBlock: {
          caption: 'Kontrakt zadania publikacji wielokanałowej i idempotentnego ponawiania',
          language: 'json',
          code: `{
  "publicationId": "pub_drift4l_oct11",
  "idempotencyKey": "fieldwork:drift-4l-pack:2026-10-11T18:00Z",
  "scheduledFor": "2026-10-11T18:00:00Z",
  "targets": [
    {
      "channel": "instagram",
      "status": "published",
      "receiptId": "ig_media_17982341",
      "publishedAt": "2026-10-11T18:00:04Z"
    },
    {
      "channel": "linkedin",
      "status": "failed",
      "error": "UPSTREAM_TIMEOUT_504",
      "retryEligible": true
    }
  ],
  "retryPolicy": "Ponów wyłącznie cele ze statusem 'failed'; zachowaj nienaruszone potwierdzenia 'published'."
}`,
        },
      },
      {
        id: 'cadence-and-next-available-slot',
        heading: '2. Harmonogramy per kanał i wybór najbliższego wolnego slotu',
        paragraphs: [
          'Ręczne wymyślanie daty i godziny przy każdym poście marnuje czas zespołu. Zamiast tego zdefiniuj stałe okna publikacji dla każdego kanału na podstawie danych o aktywności odbiorców (np. Instagram wtorek/czwartek 18:00, LinkedIn środa 08:30, artykuł WWW wtorek 07:00).',
          'Gdy szkic jest gotowy, redaktor lub uprawniony agent może wybrać konkretny termin albo opcję „Najbliższy dostępny slot”, umieszczając publikację w kolejce bez kolizji z innymi zaplanowanymi materiałami.',
        ],
      },
      {
        id: 'pre-flight-validation',
        heading: '3. Walidacja możliwości kanału przed wejściem do kolejki',
        paragraphs: [
          'Proporcje grafik, limity znaków i obsługa linków w pierwszym komentarzu różnią się między platformami. Sprawdzaj wymagania techniczne kanału (`get_publication_capabilities`) już na etapie szkicu — tak, aby wychwycić brakujący format w studiu, a nie w chwili publikacji.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Prosty kalendarz postów vs. odporna architektura kolejki publikacji',
      headers: ['Obszar', 'Zwykły planer postów', 'System publikacji MUMRO'],
      rows: [
        ['Granica szkicu', 'Łatwo o przypadkową publikację roboczego tekstu', 'Wyraźne oddzielenie Szkiców (Drafts) od Kolejki Publikacji'],
        ['Śledzenie wielu kanałów', 'Jeden wspólny status dla całego wpisu', 'Osobny wynik i potwierdzenie dla każdego celu publikacji'],
        ['Obsługa błędów API', 'Ręczne tworzenie posta od nowa lub ryzyko duplikatu', 'Ponawianie nieudanych zadań z zachowaniem potwierdzonych wyników'],
        ['Wybór terminu', 'Ręczne klikanie w kalendarz za każdym razem', 'Harmonogramy per kanał, konkretny termin lub najbliższy wolny slot'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe (FIELDWORK / DRIFT 4L — Przestrzeń demonstracyjna)',
      scenarioTitle: 'Koordynacja kampanii na 4 kanałach z osobnymi harmonogramami i kontrolą statusów',
      context: 'Podczas kampanii DRIFT 4L zespół zaplanował powiązane publikacje na Instagramie, Facebooku, X i LinkedInie wraz z premierą artykułu na stronie.',
      executionSteps: [
        'Skonfigurowano osobne okna czasowe dla każdego kanału zgodnie z rytmem czytelników.',
        'Wykorzystano podgląd harmonogramu (`preview_schedule`) przed zatwierdzeniem nowego wpisu.',
        'Monitorowano osobne potwierdzenia dostarczenia dla każdej platformy w widoku Planu i Kalendarza.',
      ],
      resultNote: 'Pełna przejrzystość tego, co jest szkicem, co czeka w kolejce, co zostało opublikowane, a co wymaga ponowienia.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Szkice, kolejka slotów, osobne wyniki per kanał i bezpieczne ponawianie.',
      summary: 'MUMRO oferuje kolejkę i kalendarz publikacji z harmonogramami per kanał, podglądem najbliższego slotu, śledzeniem każdego celu z osobna oraz bezpiecznym ponawianiem.',
      capabilities: [
        'Przygotowywanie szkiców przed przekazaniem ich do kolejki publikacji (`PUB-01`).',
        'Wybór dokładnego terminu lub najbliższego dostępnego slotu w harmonogramie (`PUB-02`).',
        'Sprawdzanie osobnego wyniku dla każdego celu publikacji i ponawianie błędów bez duplikacji (`PUB-03`, `PUB-04`).',
      ],
      anchorHref: 'https://mumro.io/pl/#publishing',
      anchorLabel: 'Zobacz kolejkę i plan publikacji na mumro.io',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 06',
      items: [
        'Utrzymujemy wyraźną granicę między roboczymi szkicami a zatwierdzoną kolejką publikacji.',
        'Każdy kanał społecznościowy ma przypisane stałe okna czasowe oparte na danych.',
        'Nasz system zapisuje osobny status i identyfikator potwierdzenia dla każdej platformy docelowej.',
        'Potrafimy ponowić nieudaną wysyłkę na jeden kanał bez dublowania postów na pozostałych.',
      ],
    },
  },
];

export const lessonsTrack1And2 = assertLocaleParity({ en, pl }, 'lessonsTrack1And2');
