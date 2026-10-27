export const locales = ['en', 'pl'] as const;
export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;

export interface SectionProps {
  locale: Locale;
}

export const trackIds = [
  'brand-systems',
  'multi-format-distribution',
  'website-seo-conversations',
  'agents-mcp-governance',
] as const;
export type TrackId = (typeof trackIds)[number];

export const lessonSlugs = [
  'versioned-brand-strategy',
  'brand-voice-architecture',
  'evidence-led-research-pipelines',
  'one-story-multi-channel-architecture',
  'carousel-and-visual-storytelling',
  'reliable-publishing-queues-and-cadence',
  'content-hub-and-cms-architecture',
  'grounded-website-assistants-and-faq-mining',
  'cohort-analytics-and-strategy-iteration',
  'mcp-for-marketing-and-content-systems',
  'two-phase-commit-for-ai-agents',
  'autonomy-levels-and-guardrails',
  'ai-agent-harness-engineering',
  'mcp-tools-skills-and-product-surfaces',
  'playwright-browser-automation-and-verification',
  'git-and-github-for-ai-coding-agents',
  'webmcp-agent-operable-web-applications',
] as const;
export type LessonSlug = (typeof lessonSlugs)[number];

export type DifficultyLevel = 'Foundations' | 'Practitioner' | 'Architecture';

export function localePath(locale: Locale, subpath = ''): string {
  const clean = subpath.replace(/^\/+|\/+$/g, '');
  if (locale === 'pl') {
    return clean ? `/pl/${clean}/` : '/pl/';
  }
  return clean ? `/${clean}/` : '/';
}

export function alternateLocalePath(targetLocale: Locale, currentRoute: string): string {
  const stripped = currentRoute
    .replace(/^\/pl(?=\/|$)/, '')
    .replace(/^\/+|\/+$/g, '');
  return localePath(targetLocale, stripped);
}

function compareStructure(enVal: unknown, plVal: unknown, path: string): void {
  if (typeof enVal !== typeof plVal) {
    throw new Error(`Locale parity type mismatch at ${path}: ${typeof enVal} vs ${typeof plVal}`);
  }
  if (typeof enVal === 'string') {
    if (!enVal.trim() || !(plVal as string).trim()) {
      throw new Error(`Empty localized string at ${path}`);
    }
    return;
  }
  if (Array.isArray(enVal)) {
    if (!Array.isArray(plVal) || enVal.length !== plVal.length) {
      throw new Error(`Locale parity array length mismatch at ${path}`);
    }
    enVal.forEach((item, index) => compareStructure(item, plVal[index], `${path}[${index}]`));
    return;
  }
  if (enVal && typeof enVal === 'object') {
    const enRecord = enVal as Record<string, unknown>;
    const plRecord = plVal as Record<string, unknown>;
    const enKeys = Object.keys(enRecord).sort();
    const plKeys = Object.keys(plRecord).sort();
    if (enKeys.join(',') !== plKeys.join(',')) {
      throw new Error(`Locale parity keys mismatch at ${path}: [${enKeys.join(',')}] vs [${plKeys.join(',')}]`);
    }
    for (const key of enKeys) {
      compareStructure(enRecord[key], plRecord[key], `${path}.${key}`);
    }
  }
}

export function assertLocaleParity<T>(data: Localized<T>, label = 'content'): Localized<T> {
  compareStructure(data.en, data.pl, label);
  return data;
}

export function plLessonNoun(count: number): string {
  if (count === 1) return 'lekcja';
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return 'lekcje';
  }
  return 'lekcji';
}

export function formatTrackLessonsHeading(locale: Locale, count: number): string {
  return locale === 'pl'
    ? `W tej ścieżce (${count} ${plLessonNoun(count)}):`
    : `Lessons in this track (${count}):`;
}

export function formatTrackBadgeCount(locale: Locale, count: number): string {
  return locale === 'pl'
    ? `${count} ${plLessonNoun(count)} w ścieżce`
    : `${count} ${count === 1 ? 'lesson' : 'lessons'} in track`;
}
