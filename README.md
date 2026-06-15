# CV — Enrique Matta-Rodriguez

A [Next.js](https://nextjs.org) resume site powered by [JSON Resume](https://jsonresume.org), an open-source standard for resumes.

## Data

Resume content lives in `src/data/resume.json` as a [JSON Resume v1.0.0](https://jsonresume.org/schema/) schema. Edit this file to update your resume.

## Routes

| Route | Description |
|---|---|
| `/` | Main interactive resume with navigation, timeline, skills grid, and theme toggle |
| `/themed` | Print-friendly themed layout for PDF export |

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run test     # Run Vitest tests (watch mode)
npm run test:run # Run Vitest tests (single run)
npm run validate # Validate resume.json against JSON Resume schema
npm run lint     # Biome lint
npm run format   # Biome format
```

## Test structure

Tests use [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react):

- `src/lib/__tests__/` — Utility function tests (`formatDate`, `formatEducationDate`)
- `src/data/__tests__/` — Data integrity tests (required fields, types)
- `src/components/__tests__/` — Component rendering tests (Hero, Timeline, SkillsGrid, ThemedResume)

### Writing tests

```bash
npm run test           # Watch mode
npm run test:run       # CI mode
npm run validate       # Validate JSON schema
```

## Tech

- **Next.js 16** — App Router, static generation
- **JSON Resume** — Standardized resume schema, validated via `resume-cli`
- **Vitest** — Unit testing
- **CSS Modules** — Component-scoped styling
- **Biome** — Linting and formatting
