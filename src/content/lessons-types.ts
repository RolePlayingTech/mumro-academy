import type { DifficultyLevel, LessonSlug, TrackId } from '../lib/contracts';

export interface LessonSection {
  id: string;
  levelBadge?: string;
  heading: string;
  paragraphs: string[];
  resources?: Array<{
    category: string;
    title: string;
    url: string;
    description: string;
  }>;
  callout?: {
    label: string;
    text: string;
  };
  codeBlock?: {
    caption: string;
    language: string;
    code: string;
  };
}

export interface LessonData {
  slug: LessonSlug;
  number: string;
  trackId: TrackId;
  difficulty: DifficultyLevel;
  difficultyLabel: string;
  readingTimeMinutes: number;
  title: string;
  subtitle: string;
  metaDescription: string;
  keywords: string[];
  keyTakeaways: string[];
  problemStatement: {
    heading: string;
    body: string;
    antiPattern: string;
    connectedPattern: string;
  };
  sections: LessonSection[];
  comparisonTable: {
    caption: string;
    headers: [string, string, string];
    rows: Array<[string, string, string]>;
  };
  caseStudy: {
    brand: string;
    scenarioTitle: string;
    context: string;
    executionSteps: string[];
    resultNote: string;
  };
  mumroIntegration: {
    eyebrow: string;
    title: string;
    summary: string;
    capabilities: string[];
    anchorHref: string;
    anchorLabel: string;
  };
  checklist: {
    title: string;
    items: string[];
  };
}
