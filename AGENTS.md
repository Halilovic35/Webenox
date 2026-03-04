# AGENTS.md

## Cursor Cloud specific instructions

This is a frontend-only React SPA (no backend, no database). Single service: Vite dev server.

- **Dev server:** `npm run dev` (port 5173). Add `-- --host 0.0.0.0` to expose on all interfaces.
- **Build:** `npm run build` — outputs to `dist/`.
- **Lint:** `npm run lint` — ESLint config file (`.eslintrc.*`) is missing from the repo, so this command will error. This is a pre-existing repo issue, not an environment problem.
- **No automated tests:** The project has no test framework or test files.
- **i18n:** Translations are in `src/context/LanguageContext.jsx` (EN + DE). When changing user-facing text, update both language objects.
- **Portfolio.jsx:** Contains 9 industry design templates (SaaS, Beauty, Tech, Restaurant, Fitness, Creative, Healthcare, Education, Real Estate). Each design is defined as data with sections/features — rendering is handled by a shared modal component.
- See `README.md` for full project structure and customization docs.
