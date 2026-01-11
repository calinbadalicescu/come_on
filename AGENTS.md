# Repository Guidelines

## Project Structure & Module Organization
- `local-farmers-backendd/` is the Express API. Source lives in `src/`, tests in `tests/`.
- `local-farmers-frontendd/` is the React/Vite UI. Source lives in `src/`, tests in `src/__tests__/`, styles in `src/styles/`.
Keep backend and frontend code separate and place module-specific assets inside the module folder.

## Build, Test, and Development Commands
Run commands inside each module.
Backend (`local-farmers-backendd/`):
- `npm run dev` - start the API with nodemon.
- `npm start` - run the API in production mode.
- `npm test` - run Jest + Supertest.
Frontend (`local-farmers-frontendd/`):
- `npm run dev` - start the Vite dev server.
- `npm run build` - create a production build.
- `npm run preview` - preview the production build locally.
- `npm test` - run Vitest + Testing Library.
Both modules: `npm run lint` and `npm run format` for ESLint/Prettier checks.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for JS/JSX.
- Formatting: Prettier (`.prettierrc.json`); linting: ESLint (`.eslintrc.cjs`).
- Names: files use `kebab-case`, components use `PascalCase`, variables/functions use `camelCase`.

## Testing Guidelines
- Backend tests live in `local-farmers-backendd/tests/*.test.js`.
- Frontend tests live in `local-farmers-frontendd/src/__tests__/*.test.jsx`.
- Mock network calls in unit tests; keep tests deterministic and fast.

## Commit & Pull Request Guidelines
- Use prefixes like `feat:`, `fix:`, `chore:`, `docs:`.
- PRs include a concise summary, linked issues (if any), and screenshots for UI changes. Keep scope focused.

## Security & Configuration
- Never commit secrets. Use `.env` files and update `.env.example` when adding variables.
