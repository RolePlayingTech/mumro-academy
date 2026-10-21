import { assertLocaleParity } from '../lib/contracts';
import type { LessonData } from './lessons-types';
import { harnessLesson } from './lesson-harness-engineering';

const en: LessonData[] = [
  {
    slug: 'content-hub-and-cms-architecture',
    number: 'LESSON 07',
    trackId: 'website-seo-conversations',
    difficulty: 'Architecture',
    difficultyLabel: 'Architecture',
    readingTimeMinutes: 11,
    title: 'Website + Social as One Loop: Connecting Headless/WordPress CMS with Social Distribution',
    subtitle: 'How to architect bilingual content hubs, technical SEO metadata, and CMS delivery contracts so social reach builds durable search equity.',
    metaDescription: 'Learn how to connect your website CMS (WordPress or API) with social distribution: canonical URLs, reciprocal hreflang, JSON-LD structured data, and coordinated publishing.',
    keywords: ['CMS social media integration', 'bilingual technical SEO', 'hreflang canonical architecture', 'WordPress custom CMS API', 'MUMRO website'],
    keyTakeaways: [
      'Social media posts decay in 48 hours; your website articles compound in search and AI retrieval for years.',
      'Bilingual content hubs require strict URL symmetry (`/` and `/pl/`), reciprocal `hreflang` links, and rich `TechArticle` / `WebSite` JSON-LD graphs.',
      'Connecting CMS delivery (WordPress or Custom API) directly to your workspace eliminates manual HTML copy-pasting and broken links.',
    ],
    problemStatement: {
      heading: 'The Disconnected Blog Island',
      body: 'In most organizations, the company blog and social media live in separate worlds. Someone writes an article in a Google Doc, pastes it into WordPress with broken heading hierarchy, forgets the Open Graph tags, and days later a social manager writes an unrelated post without linking properly. Search equity and social momentum never reinforce each other.',
      antiPattern: 'Disconnected CMS logins + missing hreflang/canonical tags + social posts launched without a matching website destination.',
      connectedPattern: 'Research Brief → Workspace Article Draft → Scheduled CMS Delivery (WordPress/API) → Synchronized Social Distribution + Web Analytics.',
    },
    sections: [
      {
        id: 'bilingual-technical-seo-contract',
        heading: '1. The Bilingual Technical SEO Contract (Canonical, Hreflang, JSON-LD)',
        paragraphs: [
          'When publishing in multiple languages (such as English and Polish), search engines must understand the exact relationship between translated pages. Never serve two languages from the same URL via client-side JavaScript translation—crawlers and LLM indexers need deterministic static HTML at distinct paths (`/lessons/.../` and `/pl/lessons/.../`).',
          'Every page must declare its own self-referencing `<link rel="canonical">`, plus reciprocal `<link rel="alternate" hreflang="en">`, `<link rel="alternate" hreflang="pl">`, and `<link rel="alternate" hreflang="x-default">` pointing to the default international edition. Pair this with a clean JSON-LD `@graph` describing the `Article`, `BreadcrumbList`, and `Organization`.',
        ],
        callout: {
          label: 'SEO ARCHITECTURE RULE',
          text: 'Hreflang tags must be bidirectional: if the English page links to the Polish URL, the Polish page must link back to the exact English URL.',
        },
        codeBlock: {
          caption: 'Reciprocal Bilingual SEO & CMS Delivery Contract',
          language: 'html',
          code: `<!-- Deterministic bilingual head contract -->
<link rel="canonical" href="https://academy.mumro.io/lessons/content-hub-and-cms-architecture/" />
<link rel="alternate" hreflang="en" href="https://academy.mumro.io/lessons/content-hub-and-cms-architecture/" />
<link rel="alternate" hreflang="pl" href="https://academy.mumro.io/pl/lessons/content-hub-and-cms-architecture/" />
<link rel="alternate" hreflang="x-default" href="https://academy.mumro.io/lessons/content-hub-and-cms-architecture/" />

<!-- CMS Delivery Payload (WordPress / Custom API Adapter) -->
<!-- {
  "articleId": "art_drift4l_packing_guide",
  "siteId": "site_fieldwork_web",
  "slug": "two-days-four-litres-handlebar-packing",
  "locale": "en",
  "status": "scheduled",
  "publishAt": "2026-10-11T07:00:00Z"
} -->`,
        },
      },
      {
        id: 'cms-adapters-wordpress-and-custom-api',
        heading: '2. CMS Adapters: WordPress and Custom API Contracts',
        paragraphs: [
          'Whether your site runs on WordPress or a modern static/headless stack (Astro, Next.js, custom API), your content workspace should communicate through a clean delivery contract: title, slug, structured body, SEO description, canonical target, and scheduled timestamp.',
          'Separating the article draft inside the workspace from external CMS delivery (`H01`) ensures that legal, technical, and Brand Voice reviews happen before any content hits your live domain.',
        ],
      },
      {
        id: 'article-to-social-bridge',
        heading: '3. Bridging Article Delivery to Social Bundles',
        paragraphs: [
          'Once an article is drafted or scheduled for CMS delivery, its key points should immediately seed your 5-slide carousel and channel-aware social posts (`I01`, `I02`)—complete with platform-appropriate link placement and incoming traffic tracking (`I04`).',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Siloed Blog Management vs. Connected Website + Social Workspace',
      headers: ['Dimension', 'Siloed CMS Workflow', 'Connected Website + Social Loop (MUMRO Pattern)'],
      rows: [
        ['Drafting context', 'Written outside Brand Voice and research trails', 'Prepared with selected workspace sources and shared Brand Voice'],
        ['CMS publishing', 'Manual copy-pasting into admin forms', 'Scheduled CMS delivery via WordPress adapter or Custom API integration'],
        ['Social promotion', 'Afterthought days after the article goes live', 'Article key points directly generate visual bundles and social drafts'],
        ['Traffic feedback', 'Separate analytics tool disconnected from social queue', 'Website visits, popular pages, and referrers visible inside the workspace'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes (FIELDWORK / DRIFT 4L)',
      scenarioTitle: 'Publishing the Handlebar Packing Guide & Driving Social Referral Traffic',
      context: 'Cycling Escapes wanted their technical guide on 4-litre weight distribution to rank in search while serving as the landing hub for their Instagram and LinkedIn campaign.',
      executionSteps: [
        'Drafted the article in the workspace using the verified field-test source trail.',
        'Scheduled CMS delivery and generated the matching 5-slide carousel + 4 social channel posts.',
        'Monitored incoming visits, top pages, and social referrers in the Website Analytics panel.',
      ],
      resultNote: 'The website article and social campaign reinforced the same topic within one unified workspace.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'Connect your website, CMS delivery, social posts, and web analytics.',
      summary: 'MUMRO brings your website and social channels into one workspace—supporting article drafting, WordPress and API-based CMS delivery, link-in-bio pages, curated testimonials, and website traffic analytics.',
      capabilities: [
        'Prepare articles with selected sources and Brand Voice, then schedule CMS delivery (`SC10`, `H01`).',
        'Connect WordPress (`H02`) or your own CMS through an API integration (`H03`).',
        'Turn article key points into visual bundles and social posts, then review incoming website visits and referrers (`I01`, `I02`, `H05`).',
      ],
      anchorHref: 'https://mumro.io/#website',
      anchorLabel: 'Explore Website & CMS integration on mumro.io',
    },
    checklist: {
      title: 'Lesson 07 Self-Audit Checklist',
      items: [
        'Every public page has a deterministic URL, self-referencing canonical tag, and complete Open Graph metadata.',
        'Our English and Polish routes link to each other with reciprocal hreflang tags and `x-default`.',
        'Our CMS publishing workflow is directly connected to our social distribution calendar.',
        'We track which social channels and topics actually drive visitors to our website articles.',
      ],
    },
  },
  {
    slug: 'grounded-website-assistants-and-faq-mining',
    number: 'LESSON 08',
    trackId: 'website-seo-conversations',
    difficulty: 'Practitioner',
    difficultyLabel: 'Practitioner',
    readingTimeMinutes: 10,
    title: 'Grounded Website Assistants: Turning Visitor Questions into Content & Leads',
    subtitle: 'How to deploy a brand-grounded website chatbot, capture high-intent leads, unify social comments, and mine recurring questions (FAQ Mining).',
    metaDescription: 'Learn how to configure a retrieval-grounded website assistant that uses your Brand Voice, captures qualified leads, unifies social comments, and mines recurring visitor questions.',
    keywords: ['grounded website assistant', 'FAQ mining AI', 'unified social inbox', 'conversational lead capture', 'MUMRO chatbot'],
    keyTakeaways: [
      'A generic website chatbot without scoped brand knowledge frustrates visitors; a grounded assistant answers from curated product docs and workspace articles.',
      'Audience questions in website chat and social comments are the highest-signal research source for your next article or carousel.',
      'Grouping recurring visitor questions (FAQ Mining) turns customer support friction into compounding content equity.',
    ],
    problemStatement: {
      heading: 'The Unconnected Chat Widget Problem',
      body: 'Most website chat widgets are either rigid decision trees that trap users in loops or ungrounded AI bots that invent return policies and pricing. Worse, the questions visitors ask on the website never reach the content team, and social media comments sit in four separate mobile apps.',
      antiPattern: 'Ungrounded third-party chat widget + separate social comment tabs + zero feedback into the content calendar.',
      connectedPattern: 'Curated Brand Knowledge + Brand Voice → Grounded Website Assistant & Unified Inbox → Lead Capture + FAQ Mining → Next Content Brief.',
    },
    sections: [
      {
        id: 'scoping-assistant-knowledge',
        heading: '1. Grounding the Website Assistant in Selected Brand Knowledge',
        paragraphs: [
          'An effective website assistant should only answer from knowledge you explicitly curate and approve (`H06`): product specifications, mounting guides, workspace articles, and reply policies—delivered in your Brand Voice.',
          'When a visitor asks "Will the DRIFT 4L bag fit between 40cm gravel drop bars with hydraulic brake hoses?", a grounded assistant retrieves the exact clearance dimensions from your ingested knowledge base rather than guessing.',
        ],
        callout: {
          label: 'CONVERSATION DESIGN RULE',
          text: 'When a visitor’s question goes beyond ingested knowledge or requires custom quoting, the assistant should smoothly offer to leave contact details (Lead Capture) rather than speculate.',
        },
        codeBlock: {
          caption: 'Grounded Assistant & FAQ Mining Pipeline Configuration',
          language: 'json',
          code: `{
  "assistantConfig": {
    "workspace": "fieldwork",
    "knowledgeSources": ["workspace_articles", "product_specs_drift_4l", "mounting_faq"],
    "brandVoice": "fieldwork-technical-editorial",
    "leadCapture": {
      "enabled": true,
      "trigger": "When visitor asks about team orders, custom frame fit, or follow-up consultation"
    }
  },
  "faqMiningCluster": {
    "themeId": "theme_carbon_bar_compatibility",
    "questionCount30d": 19,
    "sampleQuestions": [
      "Is the strap safe on carbon handlebars?",
      "Do I need protective tape on a carbon head tube?"
    ],
    "recommendedAction": "Create an article and 5-slide carousel on carbon frame & handlebar protection."
  }
}`,
        },
      },
      {
        id: 'unified-inbox-comments-and-chat',
        heading: '2. Bringing Social Comments and Chatbot Conversations Together',
        paragraphs: [
          'A question asked under an Instagram carousel and a question asked in your website chat widget are two expressions of the same buyer curiosity. By bringing social comments and chatbot conversations into a Unified Inbox (`ENG-01`), operators can see which conversations need attention (`ENG-02`), apply reusable reply templates (`ENG-04`), or generate Brand Voice replies (`ENG-03`).',
        ],
      },
      {
        id: 'faq-mining-to-content-decision',
        heading: '3. FAQ Mining: Turning Recurring Questions into Next Week’s Content',
        paragraphs: [
          'Instead of brainstorming random topics on Monday morning, inspect your clustered visitor questions (`H07`) and recurring comment themes (`X01`). If 19 visitors asked about carbon handlebar compatibility this month, your next canonical article and 5-slide carousel are already validated by real demand.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Isolated Support Chat vs. Grounded Assistant & FAQ Mining Loop',
      headers: ['Capability', 'Isolated Chat Widget', 'Connected Conversation Loop (MUMRO Pattern)'],
      rows: [
        ['Knowledge base', 'Generic FAQ page or ungrounded LLM', 'Selected workspace knowledge and shared Brand Voice (`H06`)'],
        ['Inbox workflow', 'Separate from Instagram, Facebook, and LinkedIn comments', 'Unified inbox combining social comments and chatbot conversations (`ENG-01`)'],
        ['Lead capture', 'Aggressive popups interrupting reading', 'Contextual contact capture inside assistant conversations (`H08`)'],
        ['Content feedback', 'Conversations disappear into support archives', 'FAQ mining clusters recurring visitor questions to inform content (`H07`)'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes (FIELDWORK / DRIFT 4L)',
      scenarioTitle: 'Mining Mounting & Rain-Protection Questions to Plan the Next Content Cycle',
      context: 'Visitors reading the DRIFT 4L article frequently asked the website assistant and Instagram comments about heavy rain seams and carbon head-tube straps.',
      executionSteps: [
        'Answered immediate buyer questions using Brand Voice reply suggestions and saved templates in the Unified Inbox.',
        'Captured contact details from riders asking about group bikepacking outfitting.',
        'Used clustered FAQ themes from the website assistant to brief the next technical article.',
      ],
      resultNote: 'Customer conversations directly fueled high-converting educational content.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'Unified inbox, grounded website assistant, lead capture, and FAQ mining.',
      summary: 'MUMRO connects social comments and website chatbot conversations in one workspace—helping you reply in your Brand Voice, capture leads, and discover recurring visitor questions.',
      capabilities: [
        'Give your website assistant selected knowledge and brand context (`H06`) with built-in lead capture (`H08`).',
        'Manage social comments and chatbot conversations together with status filters, reply templates, and batch actions (`ENG-01`–`ENG-05`).',
        'Mine recurring visitor questions (`H07`) and audience themes (`X01`) to inform your next content decisions.',
      ],
      anchorHref: 'https://mumro.io/#website',
      anchorLabel: 'See the Website Assistant & Conversations on mumro.io',
    },
    checklist: {
      title: 'Lesson 08 Self-Audit Checklist',
      items: [
        'Our website assistant is grounded strictly in approved brand documents and workspace articles.',
        'Visitors can leave their contact details naturally during an assistant conversation.',
        'Our team reviews social comments and website conversations in a single unified workflow.',
        'We review clustered visitor questions (FAQ mining) every month to choose new article topics.',
      ],
    },
  },
  {
    slug: 'cohort-analytics-and-strategy-iteration',
    number: 'LESSON 09',
    trackId: 'website-seo-conversations',
    difficulty: 'Practitioner',
    difficultyLabel: 'Practitioner',
    readingTimeMinutes: 10,
    title: 'Cohort Analytics Over Vanity Metrics: Closing the Loop from Traffic to Strategy v2',
    subtitle: 'How to evaluate 7/30/90-day content cohorts across social and web—and turn measured evidence into a reviewable Strategy v2 draft.',
    metaDescription: 'Learn how to replace vanity social metrics with 7/30/90-day cohort analytics, format comparisons, reuse candidates, and evidence-based strategy iteration.',
    keywords: ['cohort content analytics', 'content performance analysis', 'strategy iteration v2', 'social and web analytics', 'MUMRO analytics'],
    keyTakeaways: [
      'Single-post viral spikes are noisy; 7, 30, and 90-day cohort windows reveal which content pillars and formats consistently compound.',
      'Always evaluate social engagement alongside website referral traffic and popular pages to see what actually drives deep interest.',
      'Analytics is only useful if it ends in a concrete decision: identifying reuse candidates and drafting the next version of your strategy.',
    ],
    problemStatement: {
      heading: 'Why Dashboards Rarely Change What Teams Publish',
      body: 'Most marketing teams open analytics once a month, export a screenshot of impressions, and go right back to publishing the exact same mix of posts the next morning. Because raw metrics are not grouped by cohort window, format, or strategic pillar, numbers never translate into an updated strategy.',
      antiPattern: 'Chasing one-off viral impressions + comparing incompatible channel rates + never updating the strategy document.',
      connectedPattern: '7/30/90-Day Cohort Filter → Format & Pillar Comparison → High-Signal Reuse Candidates → Strategy v2 Draft.',
    },
    sections: [
      {
        id: 'cohort-windows-7-30-90',
        heading: '1. Why 7 / 30 / 90-Day Cohorts Beat Raw Totals',
        paragraphs: [
          'Evaluating content by 7-day, 30-day, and 90-day cohorts lets you separate immediate launch velocity from long-tail durability. A 7-day window shows how your current week’s cadence and posting hours are landing; a 30-day cohort validates your active strategic experiment; a 90-day cohort reveals which pillars build sustained channel growth.',
          'Be careful when comparing engagement across platforms (`SC03`): each provider calculates reach and impressions differently. Compare a channel against its own historical cohort baseline and evaluate formats (5-slide carousel vs. single image post vs. article link) within the same context.',
        ],
        callout: {
          label: 'ANALYTICAL DISCIPLINE',
          text: 'Correlation in a 30-day cohort is a testable hypothesis for Strategy v2—never treat it as an automatic guarantee of future ROI.',
        },
        codeBlock: {
          caption: 'Cohort Evaluation → Strategy v2 Recommendation Pipeline',
          language: 'json',
          code: `{
  "workspace": "fieldwork",
  "cohortWindowDays": 30,
  "channelFilter": "all",
  "findings": [
    {
      "format": "5-slide-carousel",
      "pillar": "packing-physics",
      "observation": "Highest save-to-reach ratio and strongest referral click-through to the canonical packing article."
    },
    {
      "hourWindow": "18:00-19:30 CET",
      "observation": "Evening slots outperformed midday slots across Instagram and Facebook cohorts."
    }
  ],
  "reuseCandidates": ["post_drift4l_4litre_breakdown", "article_handlebar_mass_distribution"],
  "proposedStrategyRevision": {
    "targetVersion": "v2",
    "changes": "Increase 5-slide technical breakdown cadence to 2x/week and anchor evening publishing slots."
  }
}`,
        },
      },
      {
        id: 'identifying-reuse-candidates',
        heading: '2. Finding High-Performing Content to Revisit and Reuse',
        paragraphs: [
          'Your best-performing stories from 60 or 90 days ago have not been seen by most of your current audience. Analytics should surface promising content for reuse (`SC03`): a high-retention article can be reframed into a fresh 5-slide carousel, or a top-performing Instagram breakdown can be adapted into a LinkedIn engineering note.',
        ],
      },
      {
        id: 'closing-the-loop-to-strategy-draft',
        heading: '3. Turning Analysis into a Strategy Draft for Human Review',
        paragraphs: [
          'The ultimate output of analytics is not a chart—it is a decision (`SC04`, `SC12`). Synthesize cohort performance, top website pages, and audience question themes into a concrete Strategy v2 Draft, then review and approve it to guide the next 30-day cycle.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Vanity Reporting vs. Action-Oriented Cohort Analytics',
      headers: ['Metric Focus', 'Vanity Dashboard Reporting', 'Closed-Loop Cohort Analytics (MUMRO Pattern)'],
      rows: [
        ['Time horizon', 'Arbitrary date ranges with no hypothesis', 'Structured 7 / 30 / 90-day cohorts per channel or workspace'],
        ['Content reuse', 'Old posts are forgotten after 48 hours', 'Surfaces high-performing content to revisit and adapt (`SC03`)'],
        ['Web + Social view', 'Separate tools for social stats and web visits', 'Side-by-side social performance and website pageviews/referrers (`H05`)'],
        ['Strategic output', 'Static PDF slide at the end of the month', 'Turns analysis directly into a Strategy v2 draft for review (`SC04`)'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes & Świadek Dziejów',
      scenarioTitle: 'Using 30-Day Cohort Filters to Compare Channels and Approve Strategy v2',
      context: 'Both workspaces track performance across 7, 30, and 90-day windows, allowing operators to filter by individual channel or inspect the combined workspace trajectory.',
      executionSteps: [
        'Switched cohort filters between 7, 30, and 90 days and inspected channel-specific breakdowns via sidebar channel avatars.',
        'Compared social format retention with incoming website article visits.',
        'Generated a Strategy v2 draft from the 30-day findings and approved it for the next cycle.',
      ],
      resultNote: 'Every analytical insight leads directly to an updated strategy and publishing plan.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'Cohort analytics, website traffic, and direct Strategy v2 drafting.',
      summary: 'MUMRO combines 7/30/90-day social performance cohorts, posting-hour and format analysis, content reuse discovery, and website traffic analytics—turning insights directly into a reviewable strategy draft.',
      capabilities: [
        'Filter performance, engagement, best hours, and formats across 7, 30, and 90-day cohorts (`SC03`).',
        'Review website visits, popular pages, and referrers alongside social results (`H05`).',
        'Turn cohort analysis into a visible strategy draft for human review (`SC04`, `SC12`).',
      ],
      anchorHref: 'https://mumro.io/#product',
      anchorLabel: 'Explore Cohort Analytics in MUMRO',
    },
    checklist: {
      title: 'Lesson 09 Self-Audit Checklist',
      items: [
        'We review performance in consistent 7, 30, and 90-day cohorts rather than isolated daily snapshots.',
        'We correlate social format performance with incoming website visits and read depth.',
        'Every monthly review identifies 2–3 high-performing pieces to revisit or adapt into new formats.',
        'Our analytical findings directly produce a proposed revision to our content strategy.',
      ],
    },
  },
  {
    slug: 'mcp-for-marketing-and-content-systems',
    number: 'LESSON 10',
    trackId: 'agents-mcp-governance',
    difficulty: 'Architecture',
    difficultyLabel: 'Architecture',
    readingTimeMinutes: 12,
    title: 'Model Context Protocol (MCP) in Practice: Connecting AI Agents to Brand Context',
    subtitle: 'How to connect AI agents (Claude Code, Codex, Antigravity) to your workspace via scoped MCP tools instead of copy-pasting into chat windows.',
    metaDescription: 'Technical tutorial on using Model Context Protocol (MCP) for marketing and content operations: workspace context tools, analytics inspection, and draft creation.',
    keywords: ['Model Context Protocol marketing', 'MCP server content operations', 'AI agents Claude Code Codex Antigravity', 'MUMRO MCP tools', 'agentic content workflow'],
    keyTakeaways: [
      'Copy-pasting strategy docs and analytics CSVs into a browser chat window is brittle, manual, and immediately goes stale.',
      'Model Context Protocol (MCP) gives AI agents typed, permission-scoped tools to read workspace context, inspect cohorts, and create structured drafts.',
      'Well-designed MCP architectures strictly separate read-only inspection tools from draft-creation tools and confirmation-gated mutations.',
    ],
    problemStatement: {
      heading: 'Why Chat Windows Are a Bottleneck for Agentic Workflows',
      body: 'Most teams use AI by opening a chat tab, pasting three paragraphs of background, and asking for a caption. The chat model has zero visibility into what is already scheduled in your queue, what performed well over the last 30 days, what articles exist on your website, or what your active Brand Voice forbids. Model Context Protocol (MCP) solves this by turning your brand workspace into a structured tool server.',
      antiPattern: 'Manual copy-pasting into browser chats + unvalidated markdown outputs + manual re-entry into CMS and social schedulers.',
      connectedPattern: 'Authenticated MCP Client → Read Workspace Context & Analytics → Create Structured Drafts in Workspace → Human Review & Confirmation.',
    },
    sections: [
      {
        id: 'three-tiers-of-mcp-tools',
        heading: '1. Designing a Clean 3-Tier MCP Tool Surface',
        paragraphs: [
          'When exposing a content and marketing system through Model Context Protocol (MCP), group tools into three distinct security and operational tiers:',
          'Tier 1 — Read & Inspection Tools (`get_workspace_context`, `get_content_strategy`, `get_analytics_overview`, `list_content_performance`, `list_articles`, `list_channels`, `preview_schedule`): Allow the agent to ground itself in live facts without mutating state. Tier 2 — Safe Draft & Audit Tools (`create_publication_draft`, `create_article_draft`, `create_content_strategy_draft`, `save_dashboard_audit`): Let the agent write visible drafts inside the workspace that never go live automatically. Tier 3 — Gated Action Tools (`prepare_publication_action`, `confirm_publication_action`): Require a two-phase token handshake before scheduling or publishing.',
        ],
        callout: {
          label: 'MCP SECURITY PRINCIPLE',
          text: 'Creating a draft (`create_publication_draft`) must never publish to a live social channel. Drafts are safe workspace artifacts for inspection.',
        },
        codeBlock: {
          caption: 'Canonical MCP Agent Session: Reading Context → Inspecting Schedule → Creating a Draft',
          language: 'json',
          code: `// Step 1: Agent reads active workspace context & strategy
{ "tool": "get_workspace_context", "arguments": { "workspace": "fieldwork" } }
{ "tool": "get_content_strategy", "arguments": { "workspace": "fieldwork" } }

// Step 2: Agent checks upcoming publishing slots to avoid collisions
{ "tool": "preview_schedule", "arguments": { "channel": "instagram", "horizonDays": 7 } }

// Step 3: Agent creates a visible draft grounded in Strategy v2 & Brand Voice
{
  "tool": "create_publication_draft",
  "arguments": {
    "workspace": "fieldwork",
    "channel": "instagram",
    "caption": "Two days. Four litres.\\n\\nJacket, snacks and a repair kit. On your bars, instead of your back.\\n\\nSee the full packing layout in our guide.",
    "sourceRef": "art_drift4l_packing_guide"
  }
}`,
        },
      },
      {
        id: 'portable-skills-and-agent-loops',
        heading: '2. Combining MCP Tools with Portable Agent Skills',
        paragraphs: [
          'Raw tools tell an agent *what* API calls exist; Agent Skills (`SKILL.md`) teach the agent *how* to run a disciplined workflow. For example, a `mumro-analyze-performance` or `mumro-plan-campaign` skill instructs the agent to always call `get_workspace_context` and `list_content_performance` first, cite measured cohort numbers rather than inventing metrics, and save its proposal as a reviewable draft.',
        ],
      },
      {
        id: 'scoped-authentication-and-entitlements',
        heading: '3. Scoped Authentication: API Keys, OAuth, and Workspace Isolation',
        paragraphs: [
          'An agent should only ever access the specific workspace and tool scopes you grant (`AG01`, `AG04`). Whether connected via scoped API keys or OAuth, every MCP call is bound to a single brand workspace so agency operators never risk cross-client data leakage.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Browser Chat Copy-Pasting vs. Connected MCP Agent Architecture',
      headers: ['Workflow Step', 'Manual Browser Chat', 'Connected MCP Agent (MUMRO Pattern)'],
      rows: [
        ['Brand context', 'Manually pasted or forgotten in new threads', 'Fetched live via `get_workspace_context` and `get_content_strategy`'],
        ['Performance awareness', 'Blind to what worked last month', 'Reads real cohorts via `get_analytics_overview` & `list_content_performance`'],
        ['Output format', 'Wall of chat text you must copy-paste into 4 tools', 'Structured drafts saved directly in your workspace (`AG02`)'],
        ['Queue awareness', 'No idea what is already scheduled', 'Inspects live calendar slots via `list_publication_jobs` & `preview_schedule`'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes (FIELDWORK / DRIFT 4L)',
      scenarioTitle: 'Running an Interactive MCP Brief from Context Read to Scheduled Plan',
      context: 'An operator asks their MCP-connected agent to prepare the Thursday evening Instagram post for the DRIFT 4L campaign based on the active strategy.',
      executionSteps: [
        'Agent calls `get_workspace_context` and reads Strategy v2 + Brand Voice boundaries.',
        'Agent creates a structured draft and previews the Thursday Oct 11 · 18:00 slot.',
        'After explicit confirmation, the exact post appears in the MUMRO publishing plan.',
      ],
      resultNote: 'Zero copy-pasting, full tool contract visibility, and immediate synchronization with the workspace plan.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'Native MCP Gateway for Claude Code, Codex, Antigravity, and custom agents.',
      summary: 'MUMRO exposes a comprehensive MCP toolset so authorized AI agents can read your brand context, analyze performance cohorts, prepare article and social drafts, and propose schedule actions.',
      capabilities: [
        'Give agents scoped access to workspace context, strategy, analytics, articles, comments, and jobs (`AG01`).',
        'Turn agent analysis directly into visible strategy, article, and social drafts (`AG02`).',
        'Connect via MCP with scoped credentials and inspect every tool call in the workspace (`AG04`).',
      ],
      anchorHref: 'https://mumro.io/#agents',
      anchorLabel: 'Try the interactive MCP Agent demo on mumro.io',
    },
    checklist: {
      title: 'Lesson 10 Self-Audit Checklist',
      items: [
        'Our AI agents read live strategy and analytics via structured tools rather than manual copy-pasting.',
        'Read tools, draft tools, and live publishing mutations are separated into distinct permission tiers.',
        'Agent outputs land directly as structured drafts inside our content workspace.',
        'Every agent connection is scoped to a specific brand workspace with full audit logging.',
      ],
    },
  },
  {
    slug: 'two-phase-commit-for-ai-agents',
    number: 'LESSON 11',
    trackId: 'agents-mcp-governance',
    difficulty: 'Architecture',
    difficultyLabel: 'Architecture',
    readingTimeMinutes: 11,
    title: 'Prepare → Confirm: Designing Safe Mutation Gates for Autonomous Agents',
    subtitle: 'Why AI agents should never have a single-step "publish now" tool—and how two-phase confirmation gates prevent accidental live mutations.',
    metaDescription: 'Learn the software architecture pattern for safe AI agent mutations: Two-Phase Prepare → Confirm gates, preview tokens, payload hashing, and human-in-the-loop approval.',
    keywords: ['two-phase commit AI agents', 'prepare confirm pattern MCP', 'human in the loop AI safety', 'agent mutation gate', 'MUMRO MCP confirmation'],
    keyTakeaways: [
      'LLMs are probabilistic; external API mutations (publishing a post, replying to a customer, activating a strategy) must be deterministic.',
      'Splitting every mutation into `prepare_*` (dry-run validation + preview token) and `confirm_*` (token execution) eliminates accidental side effects.',
      'A confirmation token must bind to the exact target channel, payload hash, and scheduled timestamp—expiring if anything changes.',
    ],
    problemStatement: {
      heading: 'The Danger of Single-Call Mutation Tools',
      body: 'If you give an AI agent a single `publish_post(channel, text, time)` tool, a misunderstood prompt—such as "Show me what it would look like if we scheduled this for tomorrow"—can trigger an actual live API call. In production systems, reading or previewing an action must never share the same step as committing it.',
      antiPattern: 'Single-step `publish_post()` or `send_reply()` tools that execute immediately on the first tool call.',
      connectedPattern: 'Phase 1: `prepare_publication_action` (validates rules & returns preview + token) → Human/Policy Review → Phase 2: `confirm_publication_action`.',
    },
    sections: [
      {
        id: 'how-prepare-confirm-works',
        heading: '1. Mechanics of the Two-Phase Prepare → Confirm Gate',
        paragraphs: [
          'The Prepare → Confirm pattern adapts database two-phase commit principles to human-AI collaboration. When an agent wants to schedule, move, retry, or publish a post (or publish an article or reply to a comment), it must first call `prepare_publication_action`.',
          'During the `prepare` phase, the server validates channel capabilities, checks workspace autonomy rules and quiet hours, computes the exact preview diff (channel, caption, media, target slot), and returns a short-lived `confirmationToken` without touching any external social network.',
        ],
        callout: {
          label: 'INVARIANT OF AGENT SAFETY',
          text: 'No external mutation can occur without a fresh confirmation token generated from an explicit `prepare_*` call for that exact payload.',
        },
        codeBlock: {
          caption: 'Two-Phase MCP Mutation Handshake (`prepare_publication_action` → `confirm_publication_action`)',
          language: 'json',
          code: `// PHASE 1: Prepare (Dry-run validation + human-readable preview)
{
  "tool": "prepare_publication_action",
  "arguments": {
    "draftId": "draft_drift4l_ig_01",
    "action": "schedule",
    "channel": "instagram",
    "scheduledAt": "2026-10-11T18:00:00Z"
  }
}
// Server Response:
{
  "status": "prepared_awaiting_confirmation",
  "preview": {
    "workspace": "fieldwork",
    "channel": "Instagram (@fieldwork)",
    "scheduledLocal": "Oct 11 · 18:00",
    "captionPreview": "Two days. Four litres. Jacket, snacks and a repair kit..."
  },
  "confirmationToken": "cfm_9f82a1b4c7e0_exp15m"
}

// PHASE 2: Confirm (Executed only after explicit human approval or policy check)
{
  "tool": "confirm_publication_action",
  "arguments": {
    "confirmationToken": "cfm_9f82a1b4c7e0_exp15m"
  }
}`,
        },
      },
      {
        id: 'applying-gates-across-surfaces',
        heading: '2. Applying Prepare → Confirm Across Posts, Articles, Comments, and Strategy',
        paragraphs: [
          'A consistent architecture uses the same two-phase pattern across every sensitive boundary in the workspace: `prepare_publication_action` / `confirm_publication_action` for social queues, `prepare_article_action` / `confirm_article_action` for CMS delivery, `reply_to_comment` / `confirm_comment_reply` for public audience replies, and `prepare_content_strategy_approval` / `approve_content_strategy_draft` for activating a new strategy version.',
        ],
      },
      {
        id: 'ux-of-confirmation',
        heading: '3. Designing Clear Confirmation UX for Humans',
        paragraphs: [
          'A confirmation gate is only effective if the human reviewer can see the exact text, target channel, and timestamp in one glance. After confirmation, provide a direct deep-link from the agent conversation straight to the newly scheduled row in the publishing plan so the operator can verify the result in context.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Direct Execution vs. Two-Phase Prepare → Confirm Architecture',
      headers: ['Property', 'Direct Tool Execution', 'Two-Phase Prepare → Confirm (MUMRO Pattern)'],
      rows: [
        ['Ambiguous prompt risk', 'High—agent may publish when asked to "test scheduling"', 'Zero—`prepare_*` only generates a safe preview and token'],
        ['Payload integrity', 'Agent might alter text between preview and execution', 'Token is cryptographically bound to the prepared draft and slot'],
        ['Policy enforcement', 'Checked too late or bypassed', 'Evaluated during `prepare` against autonomy mode and quiet hours'],
        ['Audit trail', 'Single opaque log entry', 'Explicit record of Prepared Preview + Confirmed Authorization (`AG03`)'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes (FIELDWORK / DRIFT 4L)',
      scenarioTitle: 'Inspecting the MCP Preview Before Adding the DRIFT 4L Post to the Plan',
      context: 'In the MUMRO interactive MCP flow, the agent prepares the DRIFT 4L post for Oct 11 · 18:00 and pauses in the `review` state.',
      executionSteps: [
        'Agent reads context, generates the draft, and invokes the schedule preview.',
        'The operator inspects the exact caption, target channel (Instagram), and slot (Oct 11 · 18:00).',
        'Only after clicking the explicit confirmation button does the item enter the FIELDWORK publishing plan, with a direct link to focus that exact row.',
      ],
      resultNote: 'Fast agentic preparation paired with 100% deterministic human sign-off.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'Built-in Prepare → Confirm gates across every external mutation.',
      summary: 'MUMRO enforces two-phase confirmation gates for social publishing, CMS articles, comment replies, and strategy approvals—so you stay in command of every live action.',
      capabilities: [
        'Two-phase `prepare_publication_action` and `confirm_publication_action` for scheduling, moving, retrying, or publishing (`AG03`).',
        'Dedicated confirmation gates for CMS articles (`prepare_article_action`), comment replies (`confirm_comment_reply`), and strategy approval.',
        'Direct handoff link from confirmed MCP actions to the exact scheduled item in your MUMRO plan.',
      ],
      anchorHref: 'https://mumro.io/#agents',
      anchorLabel: 'See the Prepare → Confirm flow on mumro.io',
    },
    checklist: {
      title: 'Lesson 11 Self-Audit Checklist',
      items: [
        'No AI tool in our stack can publish to a live channel in a single unconfirmed call.',
        'Every mutation requires a `prepare` step that outputs a human-readable summary of channel, content, and time.',
        'Confirmation tokens expire automatically and are bound to the exact prepared payload.',
        'Public comment replies and CMS article deliveries use the same two-phase confirmation standard.',
      ],
    },
  },
  {
    slug: 'autonomy-levels-and-guardrails',
    number: 'LESSON 12',
    trackId: 'agents-mcp-governance',
    difficulty: 'Architecture',
    difficultyLabel: 'Architecture',
    readingTimeMinutes: 10,
    title: 'Bounded Autonomy: Credit Budgets, Quiet Hours, Allowed Channels, and Kill Switches',
    subtitle: 'How to configure workspace governance, role-based access, and three graduations of AI autonomy (`draft_only`, `schedule_with_confirmation`, `autonomous_schedule`).',
    metaDescription: 'Learn how to govern AI content operations at scale: 3 autonomy levels, monthly credit budgets, quiet hours, allowed channel targets, RBAC roles, and instant kill switches.',
    keywords: ['AI autonomy levels', 'agent guardrails quiet hours', 'AI credit budget cap', 'multi-workspace agency governance', 'MUMRO autonomy control'],
    keyTakeaways: [
      'Autonomy is not a binary on/off switch; teams need graduated modes (`draft_only`, `schedule_with_confirmation`, `autonomous_schedule`) as trust matures.',
      'Hard operational guardrails—allowed channels, maximum cadence, quiet hours (`22:00–07:00`), and monthly credit budgets—prevent runaway automation.',
      'Multi-brand agencies require strict workspace isolation and role-based permissions (`Owner`, `Admin`, `Member`, `Viewer`) plus an instant stop switch.',
    ],
    problemStatement: {
      heading: 'Why Unbounded "Full Autopilot" Breaks Trust',
      body: 'Many AI tools promise "100% hands-off autopilot" with no middle ground. In reality, a regulated brand or client agency cannot let an agent post at 3:00 AM, burn through unlimited generation credits over a weekend, or publish unreviewed visuals. Without explicit boundaries, teams end up disabling automation entirely.',
      antiPattern: 'All-or-nothing autopilot + shared credentials across client brands + no spending cap or quiet hours.',
      connectedPattern: '3 Graduated Autonomy Modes + Quiet Hours & Credit Caps + Per-Workspace RBAC + Instant Strategy Stop Switch.',
    },
    sections: [
      {
        id: 'three-graduated-autonomy-modes',
        heading: '1. The Three Graduated Autonomy Modes',
        paragraphs: [
          'A mature brand operating system lets you dial autonomy up or down per workspace (`AG05`):',
          'Mode 01 — `draft_only`: Agents and generators can research, analyze cohorts, and save drafts in the workspace, but cannot queue or schedule anything. Mode 02 — `schedule_with_confirmation`: Agents prepare complete drafts and propose optimal calendar slots, pausing at the confirmation gate for human sign-off. Mode 03 — `autonomous_schedule`: Within explicitly approved strategy rules, allowed channels, and cadence limits, delegated scheduling proceeds automatically while still respecting quiet hours, media review gates, and live-publish blocks.',
        ],
        callout: {
          label: 'GOVERNANCE RULE',
          text: 'Even in `autonomous_schedule` mode, hard guardrails—quiet hours, allowed target channels, credit budgets, and media review—always take precedence.',
        },
        codeBlock: {
          caption: 'Workspace Autonomy & Governance Policy Specification',
          language: 'json',
          code: `{
  "workspace": "fieldwork",
  "autonomyState": {
    "mode": "schedule_with_confirmation",
    "allowedChannels": ["instagram", "facebook", "x", "linkedin"],
    "maxPostsPerWeek": 6,
    "quietHours": {
      "enabled": true,
      "start": "22:00",
      "end": "07:00",
      "timezone": "Europe/Warsaw"
    },
    "monthlyCredits": 1000,
    "humanMediaReviewRequired": true,
    "stopped": false
  },
  "workspaceRoles": {
    "owner": "Full strategy, billing, autonomy & kill-switch control",
    "admin": "Approve strategies, confirm publications & manage channels",
    "member": "Create and edit drafts, research & reply suggestions",
    "viewer": "Read-only access to calendar, drafts & cohort analytics"
  }
}`,
        },
      },
      {
        id: 'quiet-hours-budgets-and-kill-switch',
        heading: '2. Hard Guardrails: Quiet Hours, Credit Budgets, and the Kill Switch',
        paragraphs: [
          'Four deterministic guardrails keep delegated work predictable: (1) Quiet Hours (`AG06`) block automated scheduling or replies during overnight windows (e.g., `22:00–07:00`); (2) Monthly Credit Budgets (`AG07`) cap tracked AI generation so a loop never exceeds allocated spend; (3) Media Review Gates (`AG08`) ensure generated visuals are checked before queuing; and (4) The Stop / Kill Switch (`AG08`) immediately halts further strategy-bound automated work while preserving already confirmed history.',
        ],
      },
      {
        id: 'multi-workspace-isolation-for-agencies',
        heading: '3. Multi-Workspace Isolation and Team Roles for Brands & Agencies',
        paragraphs: [
          'When managing multiple brands—such as an outdoor equipment label (`Cycling Escapes`) and a historical documentary channel (`Świadek Dziejów`)—every brand must live in its own isolated workspace (`WS-01`, `WS-03`). Channels, strategies, Brand Voice profiles, conversations, and team permissions (`WS-02`) stay strictly scoped to each brand.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Comparison of the Three MUMRO Autonomy Modes',
      headers: ['Autonomy Mode', 'What AI Agents Can Do', 'Where Human Approval Sits'],
      rows: [
        ['`draft_only`', 'Read context, analyze cohorts, and save article/post drafts', 'Humans review drafts and manually initiate all scheduling'],
        ['`schedule_with_confirmation`', 'Prepare drafts + propose calendar slots via `prepare_*`', 'Human clicks Confirm on each prepared schedule action'],
        ['`autonomous_schedule`', 'Schedule within approved strategy, allowed channels & cadence', 'Human sets strategy boundaries, quiet hours, credit budget & stop switch'],
      ],
    },
    caseStudy: {
      brand: 'Cycling Escapes & Świadek Dziejów',
      scenarioTitle: 'Configuring Autonomy Rules, Quiet Hours (22:00–07:00), and Workspace Roles',
      context: 'An agency team operates both workspaces simultaneously and needs clear boundaries on who can draft, who can approve strategy, and when AI agents can schedule.',
      executionSteps: [
        'Set `schedule_with_confirmation` mode, a 1,000-credit monthly budget, and `22:00–07:00` quiet hours.',
        'Enabled mandatory human review for media and assigned Owner, Admin, Member, and Viewer roles.',
        'Verified that engaging the Stop switch immediately halts delegated actions without losing workspace drafts.',
      ],
      resultNote: 'Complete peace of mind: AI accelerates the heavy lifting while humans own the rules.',
    },
    mumroIntegration: {
      eyebrow: 'HOW MUMRO IMPLEMENTS THIS',
      title: 'You set the rules: 3 autonomy modes, quiet hours, budgets, and isolated workspaces.',
      summary: 'MUMRO puts human control at the center of AI operations—with interactive autonomy controls, credit budgets, quiet hours, instant stop switches, and isolated multi-brand workspaces.',
      capabilities: [
        'Switch between `draft_only`, `schedule_with_confirmation`, and `autonomous_schedule` (`AG05`).',
        'Enforce allowed channels, cadence limits, quiet hours (`22:00–07:00`), monthly credit budgets, media review, and an instant stop switch (`AG06`–`AG08`).',
        'Run separate workspaces for every brand with Owner, Admin, Member, and Viewer roles (`WS-01`–`WS-03`).',
      ],
      anchorHref: 'https://mumro.io/#control',
      anchorLabel: 'Test the interactive Autonomy Controls on mumro.io',
    },
    checklist: {
      title: 'Lesson 12 Self-Audit Checklist',
      items: [
        'We have chosen an explicit autonomy mode (`draft_only`, `schedule_with_confirmation`, or `autonomous_schedule`) for each workspace.',
        'Quiet hours and monthly AI generation credit budgets are configured and enforced.',
        'Each brand we manage has its own isolated workspace with separate channels, voice, and inbox.',
        'Team members have scoped roles (Owner, Admin, Member, Viewer) and know how to trigger the stop switch.',
      ],
    },
  },
  harnessLesson.en,
];

const pl: LessonData[] = [
  {
    slug: 'content-hub-and-cms-architecture',
    number: 'LEKCJA 07',
    trackId: 'website-seo-conversations',
    difficulty: 'Architecture',
    difficultyLabel: 'Architektura',
    readingTimeMinutes: 11,
    title: 'Strona WWW i social media jako jeden obieg: łączenie CMS z dystrybucją społecznościową',
    subtitle: 'Jak zaprojektować dwujęzyczny hub treści, techniczne SEO oraz kontrakt dostarczania do CMS, aby zasięg z social mediów budował trwałą wartość domeny.',
    metaDescription: 'Dowiedz się, jak połączyć CMS strony WWW (WordPress lub własne API) z dystrybucją w social mediach: adresy canonical, hreflang, dane strukturalne JSON-LD i wspólny plan.',
    keywords: ['integracja CMS i social media', 'dwujęzyczne techniczne SEO', 'architektura hreflang canonical', 'WordPress API CMS', 'strona WWW MUMRO'],
    keyTakeaways: [
      'Post w social mediach żyje 48 godzin; dobrze zoptymalizowany artykuł na własnej stronie pracuje w wyszukiwarkach i modelach AI przez lata.',
      'Dwujęzyczny serwis treści wymaga symetrycznych ścieżek URL (`/` oraz `/pl/`), wzajemnych linków `hreflang` oraz danych strukturalnych JSON-LD.',
      'Bezpośrednie połączenie edytora artykułów z CMS (WordPress lub API) eliminuje ręczne kopiowanie kodu HTML i błędy w linkowaniu.',
    ],
    problemStatement: {
      heading: 'Problem odciętej wyspy blogowej',
      body: 'W większości firm blog na stronie WWW i social media funkcjonują jak dwa obce działy. Ktoś pisze tekst w dokumentach Google, przekleja go do WordPressa z rozsypanymi nagłówkami, zapomina o meta tagach Open Graph, a kilka dni później osoba od social mediów pisze luźny post bez właściwego linku. Ruch z wyszukiwarki i zasięg społecznościowy nigdy się nie sumują.',
      antiPattern: 'Osobne logowanie do CMS + brak tagów hreflang i canonical + posty społecznościowe publikowane w oderwaniu od artykułów na stronie.',
      connectedPattern: 'Brief z researchu → Szkic artykułu w workspace → Zaplanowana publikacja w CMS (WordPress/API) → Powiązane posty + Analityka ruchu WWW.',
    },
    sections: [
      {
        id: 'bilingual-technical-seo-contract',
        heading: '1. Dwujęzyczny kontrakt technicznego SEO (Canonical, Hreflang, JSON-LD)',
        paragraphs: [
          'Publikując treści w dwóch językach (np. po polsku i po angielsku), musisz jednoznacznie poinformować roboty wyszukiwarek o relacji między obiema wersjami. Nigdy nie podmieniaj języka w locie za pomocą samego JavaScriptu pod tym samym adresem URL — roboty indeksujące oraz systemy AI potrzebują osobnego, statycznego kodu HTML pod dedykowanymi ścieżkami (`/lessons/.../` oraz `/pl/lessons/.../`).',
          'Każda podstrona musi posiadać własny `<link rel="canonical">` oraz komplet wzajemnych tagów `<link rel="alternate" hreflang="en">`, `<link rel="alternate" hreflang="pl">` i `<link rel="alternate" hreflang="x-default">`. Uzupełnij to czystym grafem JSON-LD opisującym `TechArticle`, `BreadcrumbList` oraz `Organization`.',
        ],
        callout: {
          label: 'REGUŁA ARCHITEKTURY SEO',
          text: 'Tagi hreflang muszą być wzajemne: jeśli strona angielska wskazuje odpowiednik polski, strona polska musi wskazywać dokładnie ten sam adres angielski.',
        },
        codeBlock: {
          caption: 'Wzajemny kontrakt SEO EN/PL oraz ładunek dostarczania do CMS',
          language: 'html',
          code: `<!-- Deterministyczny kontrakt nagłówka dwujęzycznego -->
<link rel="canonical" href="https://academy.mumro.io/pl/lessons/content-hub-and-cms-architecture/" />
<link rel="alternate" hreflang="en" href="https://academy.mumro.io/lessons/content-hub-and-cms-architecture/" />
<link rel="alternate" hreflang="pl" href="https://academy.mumro.io/pl/lessons/content-hub-and-cms-architecture/" />
<link rel="alternate" hreflang="x-default" href="https://academy.mumro.io/lessons/content-hub-and-cms-architecture/" />

<!-- Kontrakt publikacji w CMS (Adapter WordPress / Custom API) -->
<!-- {
  "articleId": "art_drift4l_packing_guide_pl",
  "siteId": "site_fieldwork_web",
  "slug": "dwa-dni-cztery-litry-pakowanie-na-kierownice",
  "locale": "pl",
  "status": "scheduled",
  "publishAt": "2026-10-11T07:00:00Z"
} -->`,
        },
      },
      {
        id: 'cms-adapters-wordpress-and-custom-api',
        heading: '2. Integracja z CMS: WordPress oraz własne kontrakty API',
        paragraphs: [
          'Niezależnie od tego, czy Twoja strona działa na WordPressie, czy na nowoczesnym stosie statycznym/headless (Astro, Next.js, własny backend), przestrzeń pracy nad treścią powinna przekazywać artykuł przez czysty kontrakt API: tytuł, slug, ustrukturyzowaną treść, opis SEO, canonical oraz zaplanowaną godzinę publikacji.',
          'Oddzielenie roboczego szkicu artykułu w workspace od faktycznego dostarczenia do CMS (`H01`) daje pewność, że weryfikacja merytoryczna i kontrola Brand Voice odbywają się przed pojawieniem się tekstu na publicznej domenie.',
        ],
      },
      {
        id: 'article-to-social-bridge',
        heading: '3. Most między artykułem a pakietem społecznościowym',
        paragraphs: [
          'Gdy artykuł jest przygotowany do publikacji w CMS, jego kluczowe punkty od razu stają się bazą dla pakietu grafik, 5-slajdowej karuzeli oraz postów z linkiem dopasowanym do kanału (`I01`, `I02`) — z późniejszym pomiarem napływającego ruchu (`I04`).',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Odizolowany blog vs. połączony obieg Strona WWW + Social Media',
      headers: ['Wymiar', 'Odizolowany CMS', 'Połączony obieg WWW + Social (Wzorzec MUMRO)'],
      rows: [
        ['Kontekst pisania', 'Pisanie poza Brand Voice i bez śladu źródeł', 'Artykuły tworzone z wybranymi źródłami i wspólnym Brand Voice (`SC10`)'],
        ['Publikacja w CMS', 'Ręczne przeklejanie tekstu i formatowania do panelu', 'Zaplanowana dostawa do WordPressa (`H02`) lub własnego CMS przez API (`H03`)'],
        ['Promocja w socialach', 'Przypadkowy post wrzucony kilka dni po publikacji', 'Kluczowe punkty artykułu od razu tworzą pakiet grafik i posty (`I01`, `I02`)'],
        ['Pomiar efektów', 'Osobne narzędzie analityczne oderwane od planu', 'Odwiedziny, popularne podstrony i źródła ruchu widoczne w workspace (`H05`)'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe (FIELDWORK / DRIFT 4L)',
      scenarioTitle: 'Publikacja poradnika pakowania w CMS i kierowanie ruchu z 4 kanałów społecznościowych',
      context: 'Zespół chciał, aby techniczny artykuł o rozkładzie masy w torbie 4L budował pozycję w wyszukiwarce i jednocześnie zbierał ruch z kampanii na Instagramie, Facebooku, X i LinkedInie.',
      executionSteps: [
        'Przygotowano szkic artykułu w workspace na podstawie zweryfikowanego briefu z testów terenowych.',
        'Zaplanowano dostarczenie do CMS oraz wygenerowano powiązaną karuzelę 5 slajdów i posty kanałowe.',
        'Sprawdzono napływające odwiedziny, najpopularniejsze podstrony i referrery w module analityki WWW.',
      ],
      resultNote: 'Strona WWW i kanały społecznościowe pracują na wspólny wynik w ramach jednego procesu.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Połącz stronę WWW, publikację w CMS, posty social media i analitykę ruchu.',
      summary: 'MUMRO łączy stronę internetową i kanały społecznościowe w jednym workspace — obsługując szkice artykułów, integrację z WordPressem i własnym CMS przez API, stronę link-in-bio, wybrane opinie klientów oraz analitykę odwiedzin.',
      capabilities: [
        'Przygotowywanie artykułów ze źródłami i Brand Voice oraz planowanie publikacji w CMS (`SC10`, `H01`).',
        'Integracja z WordPressem (`H02`) lub własnym CMS przez kontrakt API (`H03`).',
        'Zamiana artykułu w pakiet grafik i posty z linkiem oraz analiza napływającego ruchu na stronie (`I01`, `I02`, `H05`).',
      ],
      anchorHref: 'https://mumro.io/pl/#website',
      anchorLabel: 'Zobacz integrację strony WWW i CMS na mumro.io',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 07',
      items: [
        'Każda publiczna podstrona ma jednoznaczny URL, własny tag canonical i kompletne meta tagi Open Graph.',
        'Nasze trasy polskie i angielskie wskazują się wzajemnie przez tagi hreflang oraz `x-default`.',
        'Proces publikacji artykułów w CMS jest połączony z planem dystrybucji w social mediach.',
        'Mierzymy, które kanały społecznościowe i tematy realnie kierują czytelników do artykułów na stronie.',
      ],
    },
  },
  {
    slug: 'grounded-website-assistants-and-faq-mining',
    number: 'LEKCJA 08',
    trackId: 'website-seo-conversations',
    difficulty: 'Practitioner',
    difficultyLabel: 'Praktyka',
    readingTimeMinutes: 10,
    title: 'Osadzone w wiedzy czatboty WWW: zamiana pytań odwiedzających w tematy treści i leady',
    subtitle: 'Jak skonfigurować asystenta strony WWW z wybraną wiedzą marki, zbierać kontakty, połączyć komentarze w jednym inboxie i wydobywać powtarzające się pytania (FAQ Mining).',
    metaDescription: 'Dowiedz się, jak wdrożyć asystenta strony WWW opartego na wiedzy marki i Brand Voice, zbierać leady, łączyć komentarze social media z czatem i prowadzić FAQ mining.',
    keywords: ['asystent strony WWW AI', 'FAQ mining treści', 'wspólny inbox komentarze czatbot', 'pozyskiwanie leadów przez czat', 'czatbot MUMRO'],
    keyTakeaways: [
      'Ogólny czatbot bez dostępu do wiedzy marki frustruje klientów; asystent osadzony w wybranej bazie wiedzy odpowiada konkretem z artykułów i specyfikacji.',
      'Pytania zadawane na czacie WWW oraz w komentarzach pod postami to najlepsze źródło tematów na kolejne artykuły i karuzele.',
      'Grupowanie powtarzających się pytań odwiedzających (FAQ Mining) zamienia codzienne wątpliwości klientów w trwałą przewagę contentową.',
    ],
    problemStatement: {
      heading: 'Problem odciętego okienka czatu na stronie',
      body: 'Większość widżetów czatu na stronach firmowych to albo sztywne drzewka wyboru, albo nieosadzone w faktach boty AI, które potrafią zmyślić wymiary produktu lub warunki zwrotu. Co gorsza, pytania zadawane przez odwiedzających na stronie nigdy nie trafiają do zespołu tworzącego treści, a komentarze z social mediów giną w czterech osobnych aplikacjach.',
      antiPattern: 'Oderwany widżet czatu + osobne zakładki z komentarzami na telefonie + brak przekazywania pytań klientów do planu treści.',
      connectedPattern: 'Wybrana wiedza marki + Brand Voice → Asystent WWW i Wspólny Inbox → Pozyskanie kontaktu (Lead Capture) + FAQ Mining → Kolejny artykuł.',
    },
    sections: [
      {
        id: 'scoping-assistant-knowledge',
        heading: '1. Osadzenie asystenta WWW w wybranej wiedzy i kontekście marki',
        paragraphs: [
          'Skuteczny asystent na stronie internetowej powinien korzystać wyłącznie z wiedzy, którą jawnie wybierzesz i zatwierdzisz (`H06`): specyfikacji produktów, instrukcji montażu, opublikowanych artykułów z workspace’u oraz zasad Brand Voice.',
          'Gdy odwiedzający pyta: „Czy torba DRIFT 4L zmieści się między barankiem 40 cm z hydraulicznymi przewodami?”, asystent osadzony w bazie wiedzy podaje dokładne wymiary i sposób prowadzenia pasków zamiast zgadywać.',
        ],
        callout: {
          label: 'ZASADA PROJEKTOWANIA ROZMÓW',
          text: 'Gdy pytanie wykracza poza bazę wiedzy lub dotyczy indywidualnej wyceny/zamówienia, asystent powinien naturalnie zaproponować pozostawienie kontaktu (Lead Capture), zamiast spekulować.',
        },
        codeBlock: {
          caption: 'Konfiguracja asystenta WWW oraz klastra pytań FAQ Mining',
          language: 'json',
          code: `{
  "assistantConfig": {
    "workspace": "fieldwork",
    "knowledgeSources": ["workspace_articles", "product_specs_drift_4l", "mounting_faq"],
    "brandVoice": "fieldwork-technical-editorial",
    "leadCapture": {
      "enabled": true,
      "trigger": "Gdy odwiedzający pyta o zamówienia zespołowe, nietypowy montaż lub prosi o kontakt"
    }
  },
  "faqMiningCluster": {
    "themeId": "theme_carbon_bar_compatibility",
    "questionCount30d": 19,
    "sampleQuestions": [
      "Czy paski są bezpieczne dla karbonowej kierownicy?",
      "Czy trzeba naklejać folię ochronną na główkę ramy z karbonu?"
    ],
    "recommendedAction": "Przygotuj artykuł i karuzelę 5 slajdów o bezpiecznym montażu na ramach i kierownicach karbonowych."
  }
}`,
        },
      },
      {
        id: 'unified-inbox-comments-and-chat',
        heading: '2. Wspólny Inbox: połączenie komentarzy społecznościowych i rozmów czatbota',
        paragraphs: [
          'Pytanie zadane pod karuzelą na Instagramie i pytanie wpisane w czat na stronie WWW wyrażają tę samą potrzebę zakupową. Łącząc komentarze społecznościowe i rozmowy czatbota w jednym miejscu (`ENG-01`), zespół od razu widzi, które wątki wymagają uwagi (`ENG-02`), może użyć gotowych szablonów odpowiedzi (`ENG-04`), wygenerować odpowiedź zgodną z Brand Voice (`ENG-03`) lub wykonać działania zbiorcze (`ENG-05`).',
        ],
      },
      {
        id: 'faq-mining-to-content-decision',
        heading: '3. FAQ Mining: zamiana powtarzających się pytań w plan treści',
        paragraphs: [
          'Zamiast wymyślać tematy na ślepo w poniedziałkowy poranek, przejrzyj zgrupowane pytania odwiedzających stronę (`H07`) oraz powracające tematy z komentarzy (`X01`). Jeśli 19 osób pytało w tym miesiącu o montaż na karbonowej kierownicy, masz gotowy, zwalidowany temat na kolejny artykuł i karuzelę.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Odizolowany widżet czatu vs. połączony obieg rozmów i FAQ Mining',
      headers: ['Możliwość', 'Odizolowany czat na stronie', 'Połączona pętla rozmów (Wzorzec MUMRO)'],
      rows: [
        ['Baza wiedzy', 'Statyczne FAQ albo nieograniczony model zgadujący odpowiedzi', 'Wybrana wiedza marki i wspólny Brand Voice (`H06`)'],
        ['Obsługa komentarzy', 'Osobno na Instagramie, Facebooku i LinkedInie', 'Wspólna skrzynka łącząca komentarze social i rozmowy czatbota (`ENG-01`)'],
        ['Zbieranie leadów', 'Agresywne pop-upy zasłaniające artykuł', 'Naturalne pozostawienie kontaktu w trakcie rozmowy z asystentem (`H08`)'],
        ['Wpływ na treści', 'Pytania klientów giną w historii czatu', 'FAQ mining grupuje powtarzające się pytania jako tematy treści (`H07`)'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe (FIELDWORK / DRIFT 4L)',
      scenarioTitle: 'Wykorzystanie pytań o odporność na deszcz i montaż do zaplanowania kolejnej publikacji',
      context: 'Czytelnicy poradnika DRIFT 4L regularnie dopytywali w czacie na stronie oraz w komentarzach na Instagramie o jazdę w ulewie i ochronę lakieru.',
      executionSteps: [
        'Odpowiedziano na bieżące komentarze za pomocą sugestii zgodnych z Brand Voice i szablonów w przestrzeni marki.',
        'Zebrano dane kontaktowe od osób pytających o wyposażenie na grupowe wyprawy.',
        'Wykorzystano wyłapane grupy pytań (FAQ mining) jako materiał wejściowy do kolejnego artykułu.',
      ],
      resultNote: 'Rozmowy z odbiorcami bezpośrednio napędzają kolejne, trafione w punkt publikacje.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Wspólny inbox, asystent WWW z wiedzą marki, zbieranie kontaktów i FAQ mining.',
      summary: 'MUMRO łączy komentarze z social mediów i rozmowy z czatbotem WWW w jednym widoku — ułatwiając odpowiadanie w głosie marki, zbieranie leadów i odkrywanie tematów na kolejne treści.',
      capabilities: [
        'Przekazanie asystentowi strony wybranej wiedzy i kontekstu marki (`H06`) wraz ze zbieraniem kontaktów (`H08`).',
        'Wspólna obsługa komentarzy i czatbota ze statusami, szablonami odpowiedzi i działaniami zbiorczymi (`ENG-01`–`ENG-05`).',
        'Grupowanie powtarzających się pytań odwiedzających (`H07`) i tematów rozmów (`X01`) pod kolejne decyzje contentowe.',
      ],
      anchorHref: 'https://mumro.io/pl/#website',
      anchorLabel: 'Zobacz asystenta WWW i moduł rozmów na mumro.io',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 08',
      items: [
        'Nasz asystent na stronie WWW korzysta wyłącznie z zatwierdzonej wiedzy i artykułów naszej marki.',
        'Odwiedzający mogą naturalnie zostawić kontakt w trakcie rozmowy z asystentem.',
        'Zespół obsługuje komentarze społecznościowe i rozmowy ze strony w jednym spójnym widoku.',
        'Co miesiąc przeglądamy zgrupowane pytania klientów (FAQ mining), aby wybrać tematy nowych artykułów.',
      ],
    },
  },
  {
    slug: 'cohort-analytics-and-strategy-iteration',
    number: 'LEKCJA 09',
    trackId: 'website-seo-conversations',
    difficulty: 'Practitioner',
    difficultyLabel: 'Praktyka',
    readingTimeMinutes: 10,
    title: 'Analityka kohortowa zamiast metryk próżności: domykanie pętli od ruchu do Strategii v2',
    subtitle: 'Jak oceniać kohorty 7/30/90 dni w social mediach i na stronie WWW — oraz jak zamieniać zmierzone dane w szkic Strategii v2.',
    metaDescription: 'Dowiedz się, jak zastąpić puste zasięgi analityką kohortową 7/30/90 dni, porównaniem formatów, wyłapywaniem treści do ponownego użycia i iteracją strategii.',
    keywords: ['analityka kohortowa treści', 'analiza wyników content marketingu', 'iteracja strategii v2', 'analityka social media i WWW', 'analityka MUMRO'],
    keyTakeaways: [
      'Pojedyncze skoki zasięgu bywają dziełem przypadku; kohorty 7-, 30- i 90-dniowe pokazują, które filary i formaty realnie budują zaangażowanie.',
      'Zawsze zestawiaj wyniki z social mediów z ruchem przychodzącym i popularnymi podstronami na własnej stronie WWW.',
      'Analityka ma sens tylko wtedy, gdy kończy się decyzją: wskazaniem treści do ponownego rozwinięcia (reuse) oraz szkicem Strategii v2.',
    ],
    problemStatement: {
      heading: 'Dlaczego wykresy rzadko zmieniają to, co zespół publikuje',
      body: 'Większość zespołów otwiera statystyki raz w miesiącu, robi zrzut ekranu z liczbą wyświetleń do raportu i następnego dnia publikuje dokładnie tak samo jak wcześniej. Ponieważ surowe liczby nie są pogrupowane według okien kohortowych (7/30/90 dni), formatów i filarów strategii, z wykresów nie wynika żadna zmiana.',
      antiPattern: 'Pogoń za przypadkowym zasięgiem jednego posta + porównywanie nieporównywalnych wskaźników między platformami + brak aktualizacji strategii.',
      connectedPattern: 'Filtr kohort 7/30/90 dni → Porównanie formatów i godzin → Kandydaci do ponownego użycia (Reuse) → Szkic Strategii v2.',
    },
    sections: [
      {
        id: 'cohort-windows-7-30-90',
        heading: '1. Dlaczego kohorty 7 / 30 / 90 dni wygrywają z surowymi sumami',
        paragraphs: [
          'Ocena publikacji w oknach 7, 30 i 90 dni pozwala oddzielić chwilowy szum od trwałego trendu. Kohorta 7 dni pokazuje bieżący rytm tygodnia i skuteczność godzin publikacji; kohorta 30 dni weryfikuje główny eksperyment aktywnej strategii; kohorta 90 dni ujawnia, które filary tematyczne systematycznie przyciągają odbiorców.',
          'Pamiętaj o rzetelności metodologicznej (`SC03`): różni dostawcy inaczej liczą zasięg i zaangażowanie. Porównuj wyniki kanału względem jego własnych wcześniejszych kohort oraz oceniaj formaty (karuzela 5 slajdów vs. pojedynczy post vs. artykuł) w ramach spójnego kontekstu.',
        ],
        callout: {
          label: 'DYSCYPLINA ANALITYCZNA',
          text: 'Obserwacja z kohorty 30-dniowej to dobrze uzasadniona hipoteza do Strategii v2 — nigdy nie traktuj jej jak automatycznej gwarancji przyszłych wyników.',
        },
        codeBlock: {
          caption: 'Przepływ od oceny kohorty 30 dni do rekomendacji Strategii v2',
          language: 'json',
          code: `{
  "workspace": "fieldwork",
  "cohortWindowDays": 30,
  "channelFilter": "all",
  "findings": [
    {
      "format": "5-slide-carousel",
      "pillar": "packing-physics",
      "observation": "Najwyższy udział zapisów i najsilniejszy ruch przejść do kanonicznego artykułu na stronie."
    },
    {
      "hourWindow": "18:00-19:30 CET",
      "observation": "Wieczorne publikacje osiągały lepszą retencję niż sloty południowe w kohorcie 30 dni."
    }
  ],
  "reuseCandidates": ["post_drift4l_4litre_breakdown", "article_handlebar_mass_distribution"],
  "proposedStrategyRevision": {
    "targetVersion": "v2",
    "changes": "Zwiększenie udziału 5-slajdowych rozkładów sprzętu do 2x w tygodniu oraz utrwalenie wieczornych slotów."
  }
}`,
        },
      },
      {
        id: 'identifying-reuse-candidates',
        heading: '2. Wracanie do wartościowych treści (Content Reuse)',
        paragraphs: [
          'Twoje najlepsze materiały sprzed 60 lub 90 dni nie dotarły do dużej części obecnych odbiorców. Dobry system analityczny podpowiada treści warte ponownego rozwinięcia (`SC03`): artykuł z wysokim czasem czytania można przekuć w nową karuzelę, a mocny wątek z Instagrama rozwinąć w notatkę projektową na LinkedIn.',
        ],
      },
      {
        id: 'closing-the-loop-to-strategy-draft',
        heading: '3. Zamiana analizy w szkic strategii do oceny człowieka',
        paragraphs: [
          'Końcowym produktem analityki nie jest wykres, lecz decyzja (`SC04`, `SC12`). Połącz wnioski z kohort społecznościowych, statystyki najpopularniejszych podstron WWW oraz pytania z czatbota w roboczy szkic Strategii v2 — gotowy do spokojnego przeglądu i zatwierdzenia.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Raportowanie „dla statystyk” vs. domknięta pętla analityki kohortowej',
      headers: ['Obszar', 'Tradycyjny raport zasięgowy', 'Analityka kohortowa (Wzorzec MUMRO)'],
      rows: [
        ['Horyzont czasu', 'Przypadkowe zakresy dat bez hipotezy badawczej', 'Spójne kohorty 7 / 30 / 90 dni dla całego workspace lub wybranego kanału'],
        ['Powrót do treści', 'Stare publikacje idą w zapomnienie po dwóch dniach', 'Wskazywanie obiecujących treści do ponownego wykorzystania (`SC03`)'],
        ['Widok WWW + Social', 'Osobne panele do social mediów i statystyk strony', 'Połączony wgląd w wyniki postów oraz odwiedziny i źródła ruchu WWW (`H05`)'],
        ['Efekt końcowy', 'Slajd w prezentacji na koniec miesiąca', 'Zamiana analizy bezpośrednio w szkic Strategii v2 do oceny (`SC04`)'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe & Świadek Dziejów',
      scenarioTitle: 'Porównanie kohort 7/30/90 dni, analiza kanałów i zatwierdzenie Strategii v2',
      context: 'Oba workspace’y pozwalają przełączać filtry kohort 7, 30 i 90 dni oraz sprawdzać wyniki każdego podłączonego konta społecznościowego i strony WWW.',
      executionSteps: [
        'Przełączono widok kohort między 7, 30 i 90 dniami oraz sprawdzono wyniki poszczególnych kanałów.',
        'Zestawiono zaangażowanie pod karuzelami z napływem czytelników do artykułów na stronie.',
        'Przekształcono wnioski w roboczy szkic Strategii v2 i zatwierdzono go na kolejny cykl.',
      ],
      resultNote: 'Każdy wniosek analityczny przekłada się bezpośrednio na lepszy plan w kolejnym miesiącu.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Kohorty 7/30/90 dni, statystyki WWW i bezpośrednie tworzenie szkicu Strategii v2.',
      summary: 'MUMRO łączy analitykę wyników, godzin i formatów z ruchem na stronie WWW — pozwalając wracać do najlepszych materiałów i zamieniać wnioski w nowy szkic strategii.',
      capabilities: [
        'Porównywanie wyników, zaangażowania, najlepszych godzin i formatów w kohortach 7/30/90 dni (`SC03`).',
        'Analiza odwiedzin, popularnych podstron i źródeł ruchu na stronie WWW (`H05`).',
        'Zamiana analizy w widoczny szkic strategii do oceny i zatwierdzenia (`SC04`, `SC12`).',
      ],
      anchorHref: 'https://mumro.io/pl/#product',
      anchorLabel: 'Zobacz analitykę kohortową w MUMRO',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 09',
      items: [
        'Oceniamy wyniki w stałych oknach kohortowych 7, 30 i 90 dni zamiast pojedynczych dni.',
        'Łączymy statystyki formatów społecznościowych z ruchem przychodzącym na naszą stronę WWW.',
        'W każdym przeglądzie wybieramy 2–3 sprawdzone materiały do rozwinięcia w nowym formacie.',
        'Wnioski z analityki kończą się konkretną aktualizacją szkicu naszej strategii.',
      ],
    },
  },
  {
    slug: 'mcp-for-marketing-and-content-systems',
    number: 'LEKCJA 10',
    trackId: 'agents-mcp-governance',
    difficulty: 'Architecture',
    difficultyLabel: 'Architektura',
    readingTimeMinutes: 12,
    title: 'Model Context Protocol (MCP) w praktyce: łączenie agentów AI z kontekstem marki',
    subtitle: 'Jak połączyć agentów AI (Claude Code, Codex, Antigravity) z przestrzenią marki przez narzędzia MCP, zamiast ręcznie przeklejać teksty do okienka czatu.',
    metaDescription: 'Techniczny tutorial o wykorzystaniu Model Context Protocol (MCP) w marketingu i operacjach treści: odczyt kontekstu workspace, analiza kohort i tworzenie szkiców.',
    keywords: ['Model Context Protocol marketing', 'MCP serwer content marketing', 'agenci AI Claude Code Codex Antigravity', 'narzędzia MCP MUMRO', 'agentyczny workflow treści'],
    keyTakeaways: [
      'Przeklejanie strategii i tabel z wynikami do przeglądarkowego czatu jest powolne, podatne na błędy i natychmiast się dezaktualizuje.',
      'Model Context Protocol (MCP) daje agentom AI typowane narzędzia z określonymi uprawnieniami do odczytu kontekstu marki, wyników i tworzenia szkiców.',
      'Dobra architektura MCP wyraźnie oddziela narzędzia odczytu (read) od narzędzi tworzenia szkiców (draft) i bramek publikacji (prepare/confirm).',
    ],
    problemStatement: {
      heading: 'Dlaczego okienko czatu w przeglądarce to wąskie gardło',
      body: 'Większość zespołów korzysta z AI, otwierając pustą kartę czatu, wklejając trzy zdania opisu firmy i prosząc o napisanie posta. Taki czat nie wie, co jest już zaplanowane w kalendarzu, jakie wyniki osiągnęły kohorty z ostatnich 30 dni, jakie artykuły są na stronie ani czego zabrania aktualny Brand Voice. Model Context Protocol (MCP) rozwiązuje ten problem, zamieniając przestrzeń marki w ustrukturyzowany serwer narzędzi.',
      antiPattern: 'Ręczne kopiowanie opisów do czatu + nieustrukturyzowana odpowiedź + ręczne przeklejanie z powrotem do CMS i kalendarza.',
      connectedPattern: 'Autoryzowany klient MCP → Odczyt kontekstu i wyników workspace → Zapis widocznego szkicu w MUMRO → Ocena człowieka i zatwierdzenie.',
    },
    sections: [
      {
        id: 'three-tiers-of-mcp-tools',
        heading: '1. Trójwarstwowa architektura narzędzi MCP',
        paragraphs: [
          'Projektując interfejs Model Context Protocol (MCP) dla systemu marketingowego, podziel narzędzia na trzy czytelne warstwy uprawnień:',
          'Warstwa 1 — Narzędzia Odczytu i Inspekcji (`get_workspace_context`, `get_content_strategy`, `get_analytics_overview`, `list_content_performance`, `list_articles`, `list_channels`, `preview_schedule`): pozwalają agentowi poznać fakty bez zmieniania czegokolwiek. Warstwa 2 — Bezpieczne Narzędzia Szkiców i Audytu (`create_publication_draft`, `create_article_draft`, `create_content_strategy_draft`, `save_dashboard_audit`): zapisują widoczne szkice w workspace, które nigdy nie publikują się same na żywo. Warstwa 3 — Narzędzia Działań z Bramką (`prepare_publication_action`, `confirm_publication_action`): wymagają dwufazowego potwierdzenia przed planowaniem lub publikacją.',
        ],
        callout: {
          label: 'ZASADA BEZPIECZEŃSTWA MCP',
          text: 'Utworzenie szkicu (`create_publication_draft`) nigdy nie oznacza publikacji na zewnętrznym kanale. Szkic to bezpieczny artefakt do wglądu w workspace.',
        },
        codeBlock: {
          caption: 'Przykładowa sesja agenta MCP: Odczyt kontekstu → Podgląd harmonogramu → Zapis szkicu',
          language: 'json',
          code: `// Krok 1: Agent odczytuje aktywny kontekst workspace’u i strategię marki
{ "tool": "get_workspace_context", "arguments": { "workspace": "fieldwork" } }
{ "tool": "get_content_strategy", "arguments": { "workspace": "fieldwork" } }

// Krok 2: Agent sprawdza wolne okna w harmonogramie publikacji
{ "tool": "preview_schedule", "arguments": { "channel": "instagram", "horizonDays": 7 } }

// Krok 3: Agent tworzy widoczny szkic oparty na Strategii v2 i Brand Voice
{
  "tool": "create_publication_draft",
  "arguments": {
    "workspace": "fieldwork",
    "channel": "instagram",
    "caption": "Dwa dni. Cztery litry.\\n\\nKurtka, przekąski i zestaw naprawczy. Na kierownicy, zamiast na plecach.\\n\\nZobacz pełny układ pakowania w poradniku na stronie.",
    "sourceRef": "art_drift4l_packing_guide_pl"
  }
}`,
        },
      },
      {
        id: 'portable-skills-and-agent-loops',
        heading: '2. Łączenie narzędzi MCP z przenośnymi skillami agentów (Agent Skills)',
        paragraphs: [
          'Same definicje narzędzi mówią agentowi *jakie* wywołania API istnieją; przenośne skille (`SKILL.md`) uczą go *jak* prowadzić zdyscyplinowany proces. Przykładowo skill `mumro-analyze-performance` lub `mumro-plan-campaign` instruuje agenta, aby zawsze zaczynał od odczytu `get_workspace_context` i `list_content_performance`, opierał wnioski na zmierzonych kohortach i zapisywał propozycję jako szkic do oceny.',
        ],
      },
      {
        id: 'scoped-authentication-and-entitlements',
        heading: '3. Uprawnienia i izolacja kontekstu: klucze API, OAuth i zakres workspace',
        paragraphs: [
          'Agent AI powinien mieć dostęp wyłącznie do przyznanego zakresu i konkretnej przestrzeni marki (`AG01`, `AG04`). Dzięki temu w pracy agencyjnej agent obsługujący jedną markę nigdy nie miesza danych z inną przestrzenią.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Ręczne przeklejanie do czatu vs. podłączony agent MCP',
      headers: ['Krok procesu', 'Ręczny czat w przeglądarce', 'Podłączony agent MCP (Wzorzec MUMRO)'],
      rows: [
        ['Kontekst marki', 'Wklejany ręcznie lub pomijany w nowych wątkach', 'Pobierany na żywo przez `get_workspace_context` i `get_content_strategy`'],
        ['Znajomość wyników', 'Brak wiedzy o tym, co zadziałało w ostatnim miesiącu', 'Odczyt rzeczywistych kohort przez `get_analytics_overview` i `list_content_performance`'],
        ['Rezultat pracy', 'Ściana tekstu w czacie do ręcznego przekopiowania', 'Ustrukturyzowane szkice zapisane bezpośrednio w workspace (`AG02`)'],
        ['Świadomość planu', 'Brak wglądu w zaplanowaną kolejkę', 'Sprawdzenie wolnych terminów przez `list_publication_jobs` i `preview_schedule`'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe (FIELDWORK / DRIFT 4L)',
      scenarioTitle: 'Interaktywne zadanie MCP: od odczytu kontekstu do zaplanowanego wpisu w kalendarzu',
      context: 'Redaktor zleca agentowi MCP przygotowanie czwartkowego posta na Instagram dla kampanii DRIFT 4L zgodnie z aktualną strategią.',
      executionSteps: [
        'Agent odczytuje kontekst marki, Strategię v2 oraz zasady Brand Voice.',
        'Agent przygotowuje szkic i pobiera podgląd terminu (11 paź · 18:00).',
        'Po osobnej zgodzie człowieka post trafia bezpośrednio do planu publikacji MUMRO.',
      ],
      resultNote: 'Brak ręcznego przeklejania, jawny kontrakt narzędzi i natychmiastowe odzwierciedlenie w planie.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Natywna bramka MCP dla Claude Code, Codex, Antigravity i własnych agentów.',
      summary: 'MUMRO udostępnia kompletny zestaw narzędzi MCP, dzięki czemu uprawniony agent AI może odczytać kontekst marki, przeanalizować kohorty wyników, przygotować szkice i zaproponować plan publikacji.',
      capabilities: [
        'Udostępnianie agentowi kontekstu i wyników w przyznanym zakresie uprawnień (`AG01`).',
        'Zamiana analizy agenta w widoczne szkice treści, artykułów i strategii (`AG02`).',
        'Łączenie agenta AI z kontekstem pracy marki przez MCP i opcjonalny OAuth (`AG04`).',
      ],
      anchorHref: 'https://mumro.io/pl/#agents',
      anchorLabel: 'Wypróbuj interaktywny czat MCP na mumro.io',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 10',
      items: [
        'Nasi agenci AI odczytują aktualną strategię i analitykę przez narzędzia MCP zamiast ręcznego wklejania.',
        'Narzędzia odczytu, tworzenia szkiców i publikacji są rozdzielone na osobne poziomy uprawnień.',
        'Efekty pracy agenta zapisują się od razu jako widoczne szkice w naszym workspace.',
        'Każde połączenie agenta jest przypisane do konkretnej przestrzeni marki z pełnym śladem audytowym.',
      ],
    },
  },
  {
    slug: 'two-phase-commit-for-ai-agents',
    number: 'LEKCJA 11',
    trackId: 'agents-mcp-governance',
    difficulty: 'Architecture',
    difficultyLabel: 'Architektura',
    readingTimeMinutes: 11,
    title: 'Prepare → Confirm: projektowanie bezpiecznych bramek decyzyjnych dla agentów AI',
    subtitle: 'Dlaczego agent AI nigdy nie powinien mieć jednoetapowego narzędzia „opublikuj teraz” — i jak dwufazowe potwierdzanie chroni przed przypadkową publikacją.',
    metaDescription: 'Poznaj wzorzec architektoniczny bezpiecznych mutacji dla agentów AI: dwufazowe bramki Prepare → Confirm, tokeny podglądu, kontrola ładunku i zatwierdzanie przez człowieka.',
    keywords: ['dwufazowe zatwierdzanie AI', 'wzorzec prepare confirm MCP', 'bezpieczeństwo agentów AI', 'bramka decyzyjna publikacji', 'potwierdzanie MCP MUMRO'],
    keyTakeaways: [
      'Modele językowe działają probabilistycznie, natomiast mutacje na zewnątrz (publikacja posta, odpowiedź klientowi, zmiana strategii) muszą być w 100% deterministyczne.',
      'Rozdzielenie każdego działania na `prepare_*` (walidacja i wygenerowanie podglądu + tokenu) oraz `confirm_*` (wykonanie tokenu) eliminuje przypadkowe publikacje.',
      'Token potwierdzenia musi być trwale powiązany z konkretnym kanałem, treścią i godziną — i wygasać przy jakiejkolwiek zmianie.',
    ],
    problemStatement: {
      heading: 'Ryzyko jednoetapowych narzędzi publikacji',
      body: 'Jeśli dasz agentowi AI pojedyncze narzędzie `publish_post(channel, text, time)`, niejednoznaczne polecenie użytkownika — np. „Pokaż, jak wyglądałoby zaplanowanie tego posta na jutro” — może skończyć się prawdziwą wysyłką na żywy profil. W profesjonalnych systemach przygotowanie podglądu działania nigdy nie może być tym samym wywołaniem co jego zatwierdzenie.',
      antiPattern: 'Jednoetapowe funkcje `publish_post()` lub `send_reply()` wykonujące akcję natychmiast przy pierwszym wywołaniu.',
      connectedPattern: 'Faza 1: `prepare_publication_action` (walidacja + podgląd + token) → Ocena człowieka / polityki → Faza 2: `confirm_publication_action`.',
    },
    sections: [
      {
        id: 'how-prepare-confirm-works',
        heading: '1. Mechanika dwufazowej bramki Prepare → Confirm',
        paragraphs: [
          'Wzorzec Prepare → Confirm przenosi ideę transakcji dwufazowych (two-phase commit) do współpracy człowieka z agentem AI. Gdy agent chce zaplanować, przesunąć, ponowić lub opublikować materiał, musi najpierw wywołać narzędzie `prepare_publication_action`.',
          'W fazie `prepare` serwer sprawdza możliwości techniczne kanału, weryfikuje poziom autonomii workspace’u oraz godziny ciszy, buduje dokładny podgląd (kanał, treść, media, slot czasowy) i zwraca krótkotrwały `confirmationToken` — bez wykonywania żadnego ruchu na zewnętrznej platformie.',
        ],
        callout: {
          label: 'NIEZMIENNIK BEZPIECZEŃSTWA AGENTA',
          text: 'Żadna zewnętrzna publikacja nie może nastąpić bez ważnego tokenu wygenerowanego wcześniej przez wywołanie `prepare_*` dla dokładnie tej treści i terminu.',
        },
        codeBlock: {
          caption: 'Dwufazowy protokół mutacji MCP (`prepare_publication_action` → `confirm_publication_action`)',
          language: 'json',
          code: `// FAZA 1: Prepare (Walidacja reguł i czytelny podgląd do zatwierdzenia)
{
  "tool": "prepare_publication_action",
  "arguments": {
    "draftId": "draft_drift4l_ig_01",
    "action": "schedule",
    "channel": "instagram",
    "scheduledAt": "2026-10-11T18:00:00Z"
  }
}
// Odpowiedź serwera:
{
  "status": "prepared_awaiting_confirmation",
  "preview": {
    "workspace": "fieldwork",
    "channel": "Instagram (@fieldwork)",
    "scheduledLocal": "11 paź · 18:00",
    "captionPreview": "Dwa dni. Cztery litry. Kurtka, przekąski i zestaw naprawczy..."
  },
  "confirmationToken": "cfm_9f82a1b4c7e0_exp15m"
}

// FAZA 2: Confirm (Wywoływana wyłącznie po jawnej zgodzie człowieka lub zgodnie z polityką)
{
  "tool": "confirm_publication_action",
  "arguments": {
    "confirmationToken": "cfm_9f82a1b4c7e0_exp15m"
  }
}`,
        },
      },
      {
        id: 'applying-gates-across-surfaces',
        heading: '2. Spójna bramka dla postów, artykułów CMS, komentarzy i strategii',
        paragraphs: [
          'Dobrze zaprojektowana architektura stosuje ten sam dwufazowy standard na każdej granicy systemu: `prepare_publication_action` / `confirm_publication_action` dla kolejek społecznościowych, `prepare_article_action` / `confirm_article_action` dla publikacji artykułów w CMS, `reply_to_comment` / `confirm_comment_reply` dla publicznych odpowiedzi na komentarze oraz `prepare_content_strategy_approval` / `approve_content_strategy_draft` dla aktywacji nowej wersji strategii.',
        ],
      },
      {
        id: 'ux-of-confirmation',
        heading: '3. Projektowanie czytelnego interfejsu potwierdzenia dla człowieka',
        paragraphs: [
          'Bramka decyzyjna spełnia swoją rolę, gdy człowiek widzi na jednym ekranie dokładny tekst, docelowy kanał oraz godzinę publikacji. Po zatwierdzeniu warto dać bezpośredni link przenoszący fokus prosto do nowo dodanego wiersza w planie publikacji.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Bezpośrednie wykonanie vs. architektura dwufazowa Prepare → Confirm',
      headers: ['Właściwość', 'Jednoetapowe wywołanie', 'Dwufazowa bramka Prepare → Confirm (Wzorzec MUMRO)'],
      rows: [
        ['Ryzyko pomyłki promptu', 'Wysokie — agent może opublikować przy prośbie o „test planu”', 'Zerowe — `prepare_*` tworzy wyłącznie bezpieczny podgląd i token'],
        ['Integralność treści', 'Ryzyko zmiany tekstu między podglądem a wysyłką', 'Token jest trwale powiązany z przygotowanym szkicem i terminem'],
        ['Sprawdzenie reguł', 'Weryfikowane za późno lub pomijane', 'Walidacja trybu autonomii i godzin ciszy już na etapie `prepare`'],
        ['Ślad audytowy', 'Pojedynczy wpis w logach', 'Jawny zapis przygotowanego podglądu oraz osobnej autoryzacji (`AG03`)'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe (FIELDWORK / DRIFT 4L)',
      scenarioTitle: 'Weryfikacja podglądu MCP przed dodaniem posta DRIFT 4L do planu publikacji',
      context: 'W interaktywnym pokazie MCP agent przygotowuje post DRIFT 4L na 11 paź · 18:00 i zatrzymuje proces w stanie oczekiwania na decyzję (`review`).',
      executionSteps: [
        'Agent odczytuje kontekst, tworzy szkic i wywołuje podgląd terminu.',
        'Użytkownik sprawdza dokładny tekst podpisu, kanał (Instagram) oraz godzinę (11 paź · 18:00).',
        'Dopiero po kliknięciu osobnej zgody wpis trafia do planu Wypraw Rowerowych, a link „Zobacz ten post w planie MUMRO” podświetla dodany wiersz.',
      ],
      resultNote: 'Błyskawiczna praca agenta połączona ze 100% kontrolą człowieka nad momentem publikacji.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Dwufazowe bramki Prepare → Confirm dla każdej zewnętrznej akcji.',
      summary: 'MUMRO wymaga dwufazowego przygotowania i potwierdzenia dla publikacji społecznościowych, artykułów CMS, odpowiedzi na komentarze oraz zatwierdzania strategii.',
      capabilities: [
        'Dwufazowe `prepare_publication_action` oraz `confirm_publication_action` przy planowaniu, przesuwaniu, ponawianiu i publikacji (`AG03`).',
        'Analogiczne bramki dla artykułów (`prepare_article_action`), odpowiedzi na komentarze (`confirm_comment_reply`) i aktywacji strategii.',
        'Bezpośredni link z potwierdzonego czatu MCP do dokładnego wpisu w planie publikacji MUMRO.',
      ],
      anchorHref: 'https://mumro.io/pl/#agents',
      anchorLabel: 'Zobacz proces Prepare → Confirm na mumro.io',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 11',
      items: [
        'Żadne narzędzie AI w naszym systemie nie publikuje treści na żywo w jednym niepotwierdzonym wywołaniu.',
        'Każda zmiana planu wymaga kroku `prepare`, który zwraca czytelne podsumowanie kanału, tekstu i godziny.',
        'Tokeny potwierdzenia mają krótki czas ważności i są przypięte do konkretnego ładunku.',
        'Odpowiedzi na komentarze oraz publikacje w CMS stosują ten sam dwufazowy standard bezpieczeństwa.',
      ],
    },
  },
  {
    slug: 'autonomy-levels-and-guardrails',
    number: 'LEKCJA 12',
    trackId: 'agents-mcp-governance',
    difficulty: 'Architecture',
    difficultyLabel: 'Architektura',
    readingTimeMinutes: 10,
    title: 'Ograniczona autonomia: budżety kredytów, godziny ciszy, dozwolone kanały i wyłączniki awaryjne',
    subtitle: 'Jak skonfigurować nadzór w workspace, role zespołowe oraz trzy poziomy autonomii AI (`draft_only`, `schedule_with_confirmation`, `autonomous_schedule`).',
    metaDescription: 'Dowiedz się, jak bezpiecznie zarządzać autonomią AI w marketingu: 3 poziomy autonomii, miesięczny budżet kredytów, godziny ciszy, dozwolone kanały, role i kill switch.',
    keywords: ['poziomy autonomii AI', 'godziny ciszy agenci AI', 'budżet kredytów AI', 'zarządzanie wieloma workspace agencja', 'kontrola autonomii MUMRO'],
    keyTakeaways: [
      'Autonomia AI nie jest przełącznikiem zero-jedynkowym; zespoły potrzebują trzech stopni swobody (`draft_only`, `schedule_with_confirmation`, `autonomous_schedule`).',
      'Twarde ograniczenia operacyjne — dozwolone kanały, limit częstotliwości, godziny ciszy (`22:00–07:00`) i miesięczny budżet kredytów — chronią przed utratą kontroli.',
      'Praca z wieloma markami lub klientami wymaga osobnych, odizolowanych przestrzeni (workspaces), ról (`Owner`, `Admin`, `Member`, `Viewer`) oraz wyłącznika awaryjnego.',
    ],
    problemStatement: {
      heading: 'Dlaczego nieograniczony „pełny autopilot” niszczy zaufanie',
      body: 'Wiele narzędzi AI obiecuje „pełny autopilot bez udziału człowieka” bez żadnych ustawień pośrednich. W praktyce żadna poważna marka ani agencja nie może pozwolić na to, by bot publikował o 3:00 w nocy, przepalił budżet generowania w jeden weekend albo wrzucił niezatwierdzoną grafikę. Brak precyzyjnych granic sprawia, że zespoły całkowicie rezygnują z automatyzacji.',
      antiPattern: 'Autopilot „wszystko albo nic” + wspólne loginy dla wielu klientów + brak limitu kosztów i godzin ciszy.',
      connectedPattern: '3 stopniowane tryby autonomii + Godziny ciszy i budżet kredytów + Izolowane Workspaces z rolami + Natychmiastowy przycisk Stop.',
    },
    sections: [
      {
        id: 'three-graduated-autonomy-modes',
        heading: '1. Trzy stopniowane tryby autonomii w pracy z AI',
        paragraphs: [
          'Dojrzały system operacyjny marki pozwala dobrać poziom autonomii osobno dla każdego workspace’u (`AG05`):',
          'Tryb 01 — `draft_only` (Tylko szkice): Agenci i generatory mogą prowadzić research, analizować kohorty i zapisywać szkice w przestrzeni marki, ale nie mogą niczego dodawać do kolejki. Tryb 02 — `schedule_with_confirmation` (Planowanie z potwierdzeniem): Agenci przygotowują kompletne szkice i proponują terminy w kalendarzu, czekając na jedno kliknięcie zatwierdzające przez człowieka. Tryb 03 — `autonomous_schedule` (Delegowane planowanie): W ramach zatwierdzonej strategii, dozwolonych kanałów i ustalonej częstotliwości planowanie odbywa się automatycznie, przy zachowaniu godzin ciszy, oceny mediów i bramki dla publikacji natychmiastowych.',
        ],
        callout: {
          label: 'ZASADA NADZORU (GOVERNANCE)',
          text: 'Nawet w trybie `autonomous_schedule` twarde bezpieczniki — godziny ciszy, dozwolone kanały, budżet kredytów i ocena mediów — mają zawsze bezwzględne pierwszeństwo.',
        },
        codeBlock: {
          caption: 'Specyfikacja polityki autonomii i ról w przestrzeni marki (Workspace)',
          language: 'json',
          code: `{
  "workspace": "fieldwork",
  "autonomyState": {
    "mode": "schedule_with_confirmation",
    "allowedChannels": ["instagram", "facebook", "x", "linkedin"],
    "maxPostsPerWeek": 6,
    "quietHours": {
      "enabled": true,
      "start": "22:00",
      "end": "07:00",
      "timezone": "Europe/Warsaw"
    },
    "monthlyCredits": 1000,
    "humanMediaReviewRequired": true,
    "stopped": false
  },
  "workspaceRoles": {
    "owner": "Pełna kontrola strategii, budżetu, autonomii i wyłącznika awaryjnego",
    "admin": "Zatwierdzanie strategii, potwierdzanie publikacji i zarządzanie kanałami",
    "member": "Tworzenie i edycja szkiców, research oraz sugestie odpowiedzi",
    "viewer": "Wgląd tylko do odczytu w kalendarz, szkice i analitykę kohortową"
  }
}`,
        },
      },
      {
        id: 'quiet-hours-budgets-and-kill-switch',
        heading: '2. Cztery twarde bezpieczniki: Godziny ciszy, Budżet kredytów, Ocena mediów i Stop',
        paragraphs: [
          'Cztery deterministyczne mechanizmy utrzymują delegowaną pracę w ryzach: (1) Godziny ciszy (`AG06`) blokują planowanie i automatyczne działania w oknie nocnym (np. `22:00–07:00`); (2) Miesięczny budżet kredytów (`AG07`) wyznacza sztywny limit rozliczanego generowania w ramach strategii; (3) Obowiązkowa ocena mediów (`AG08`) wymaga akceptacji grafik przed wejściem do kolejki; oraz (4) Wyłącznik awaryjny / Kill switch (`AG08`) natychmiast zatrzymuje dalszą pracę objętą strategią, zachowując dotychczasowe szkice i potwierdzoną historię.',
        ],
      },
      {
        id: 'multi-workspace-isolation-for-agencies',
        heading: '3. Osobne przestrzenie (Workspaces) i role dla marek oraz agencji',
        paragraphs: [
          'Prowadząc kilka marek — np. markę sprzętu rowerowego (`Wyprawy Rowerowe`) oraz kanał dokumentalny (`Świadek Dziejów`) — każda z nich musi działać w osobnej przestrzeni (`WS-01`, `WS-03`). Podłączone konta społecznościowe, wersje strategii, Brand Voice, rozmowy i uprawnienia członków zespołu (`WS-02`) są ściśle odseparowane.',
        ],
      },
    ],
    comparisonTable: {
      caption: 'Porównanie trzech poziomów autonomii w MUMRO',
      headers: ['Tryb autonomii', 'Zakres działania AI', 'Rola decyzyjna człowieka'],
      rows: [
        ['`draft_only`', 'Odczyt kontekstu, analiza kohort i zapis szkiców artykułów/postów', 'Człowiek ocenia szkice i ręcznie decyduje o każdym terminie w kolejce'],
        ['`schedule_with_confirmation`', 'Przygotowanie szkiców + propozycja slotu przez `prepare_*`', 'Człowiek jednym kliknięciem zatwierdza przygotowany podgląd planu'],
        ['`autonomous_schedule`', 'Planowanie w granicach zatwierdzonej strategii, kanałów i rytmu', 'Człowiek ustala granice strategii, godziny ciszy, budżet kredytów i przycisk Stop'],
      ],
    },
    caseStudy: {
      brand: 'Wyprawy Rowerowe & Świadek Dziejów',
      scenarioTitle: 'Konfiguracja trybu autonomii, godzin ciszy (22:00–07:00), budżetu 1000 kredytów i ról zespołu',
      context: 'Zespół obsługuje równolegle dwie zupełnie różne marki i potrzebuje precyzyjnych zasad określających, kto tworzy szkice, kto zatwierdza strategię i kiedy AI może planować publikacje.',
      executionSteps: [
        'Ustawiono tryb `schedule_with_confirmation`, budżet 1000 kredytów miesięcznie oraz godziny ciszy `22:00–07:00`.',
        'Włączono wymóg oceny mediów przez człowieka oraz przypisano role Owner, Admin, Member i Viewer.',
        'Sprawdzono działanie przycisku zatrzymania (Stop), który natychmiast blokuje dalsze delegowane zadania bez utraty roboczych danych.',
      ],
      resultNote: 'AI przyspiesza pracę redakcyjną i analityczną, ale to człowiek ustala zasady gry.',
    },
    mumroIntegration: {
      eyebrow: 'JAK REALIZUJE TO MUMRO',
      title: 'Ty ustalasz zasady: 3 poziomy autonomii, godziny ciszy, budżet i osobne przestrzenie.',
      summary: 'MUMRO daje pełną kontrolę nad pracą AI — przez interaktywny panel autonomii, budżety kredytów, godziny ciszy, natychmiastowy przycisk Stop oraz odseparowane przestrzenie dla każdej marki.',
      capabilities: [
        'Wybór między szkicami (`draft_only`), planowaniem z potwierdzeniem (`schedule_with_confirmation`) i delegowanym planowaniem (`autonomous_schedule`) (`AG05`).',
        'Ustalanie kanałów, częstotliwości, godzin ciszy (`22:00–07:00`), budżetu kredytów, oceny mediów i zatrzymywania pracy (`AG06`–`AG08`).',
        'Osobne przestrzenie (workspaces) dla marek i agencji z rolami Owner, Admin, Member i Viewer (`WS-01`–`WS-03`).',
      ],
      anchorHref: 'https://mumro.io/pl/#control',
      anchorLabel: 'Przetestuj panel Kontroli Autonomii na mumro.io',
    },
    checklist: {
      title: 'Lista kontrolna Lekcji 12',
      items: [
        'Każda przestrzeń marki ma jawnie wybrany poziom autonomii (`draft_only`, `schedule_with_confirmation` lub `autonomous_schedule`).',
        'Godziny ciszy oraz miesięczny limit kredytów generowania AI są skonfigurowane i aktywne.',
        'Każda obsługiwana marka działa w osobnym, odizolowanym workspace z własnymi kanałami i głosem.',
        'Członkowie zespołu mają przypisane właściwe role (Owner, Admin, Member, Viewer) i wiedzą, jak zatrzymać automatyzację.',
      ],
    },
  },
  harnessLesson.pl,
];

export const lessonsTrack3And4 = assertLocaleParity({ en, pl }, 'lessonsTrack3And4');
