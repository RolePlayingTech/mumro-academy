# Contributing to MUMRO Academy (`academy.mumro.io`)

Thank you for your interest in contributing to **MUMRO Academy**!

## Core Principles

1. **Full Bilingual Parity (`en` & `pl`)**: Every track, lesson, playbook, and glossary term must exist in both English and Polish with native editorial quality. The build enforces structural parity via `assertLocaleParity()`.
2. **Concrete Engineering & Marketing Substance**: Avoid generic filler. Every lesson must include a clear problem diagnosis, numbered architectural sections, code/specification blocks, a comparison table, a concrete workspace case study, and a self-audit checklist.
3. **SEO & Accessibility Integrity**:
   - Every route must pass `npm run check` and `npm run build` (`scripts/verify-build.mjs`).
   - Interactive elements must work via keyboard focus, support touch viewports down to `320px`, and respect `prefers-reduced-motion: reduce`.

## Verification Before Opening a Pull Request

```bash
npm run check
npm run build
npm test
```
