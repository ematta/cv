<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Resume data

The resume is sourced from `src/data/resume.json` in [JSON Resume](https://jsonresume.org) format.
Import types and data from `@/data/resume`:
- Types: `JsonResume`, `JsonResumeBasics`, `JsonResumeWork`, etc.
- Data: `resume` (typed as `JsonResume`)

# Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run test` — Vitest watch mode
- `npm run test:run` — Vitest single run
- `npm run validate` — Validate resume.json against schema
- `npm run lint` — Biome check

# Testing conventions

- Tests live in `__tests__/` directories next to source files
- Component tests use `vitest` + `@testing-library/react`
- Use `getAllByText` for text queries (handles React 19 StrictMode double-render)
- Mock `IntersectionObserver` via `beforeAll` in tests that use it
- CSS modules are auto-handled by Vitest

# Key components

| File | Purpose |
|---|---|
| `src/data/resume.json` | JSON Resume data source |
| `src/data/resume.ts` | TypeScript types + typed import |
| `src/components/Hero.tsx` | Name, title, location — reads `basics` |
| `src/components/Timeline.tsx` | Work experience — reads `work[]` |
| `src/components/SkillsGrid.tsx` | Skills with keyword pills — reads `skills[]` |
| `src/components/ThemedResume.tsx` | Print-friendly full resume render |
| `src/app/page.tsx` | Main interactive page |
| `src/app/themed/page.tsx` | Themed print layout |
| `src/lib/utils.ts` | Shared utilities (`formatDate`, etc.) |
