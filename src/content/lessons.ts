import { assertLocaleParity, lessonSlugs, type LessonSlug, type Locale, type TrackId } from '../lib/contracts';
import { lessonsTrack1And2 } from './lessons-track1-2';
import { lessonsTrack3And4 } from './lessons-track3-4';
import type { LessonData } from './lessons-types';

export type { LessonData, LessonSection } from './lessons-types';

export const lessonsContent = assertLocaleParity(
  {
    en: [...lessonsTrack1And2.en, ...lessonsTrack3And4.en],
    pl: [...lessonsTrack1And2.pl, ...lessonsTrack3And4.pl],
  },
  'lessonsContent'
);

// Verify that every canonical LessonSlug is present in both locales in exact order.
for (const locale of ['en', 'pl'] as const) {
  const actual = lessonsContent[locale].map((l) => l.slug);
  if (actual.join(',') !== lessonSlugs.join(',')) {
    throw new Error(`Lesson slug mismatch for ${locale}: ${actual.join(',')} vs ${lessonSlugs.join(',')}`);
  }
}

export function getLessons(locale: Locale): LessonData[] {
  return lessonsContent[locale];
}

export function getLessonBySlug(locale: Locale, slug: LessonSlug): LessonData {
  const found = lessonsContent[locale].find((item) => item.slug === slug);
  if (!found) {
    throw new Error(`Missing lesson ${slug} for locale ${locale}`);
  }
  return found;
}

export function getLessonsByTrack(locale: Locale, trackId: TrackId): LessonData[] {
  return lessonsContent[locale].filter((item) => item.trackId === trackId);
}

export function getAdjacentLessons(
  locale: Locale,
  slug: LessonSlug
): { previous: LessonData | null; next: LessonData | null } {
  const list = lessonsContent[locale];
  const index = list.findIndex((item) => item.slug === slug);
  return {
    previous: index > 0 ? (list[index - 1] ?? null) : null,
    next: index >= 0 && index < list.length - 1 ? (list[index + 1] ?? null) : null,
  };
}
