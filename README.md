# Local Farmers

Monorepo with a Node/Express backend and a React/Vite frontend.

## Project Structure
- `local-farmers-backendd/` - Express API (`src/`, `tests/`)
- `local-farmers-frontendd/` - React UI (`src/`, `src/__tests__/`, `src/styles/`)

## Quick Start
Backend:
```bash
cd local-farmers-backendd
npm install
cp .env.example .env
npm run dev
```

Frontend (new terminal):
```bash
cd local-farmers-frontendd
npm install
cp .env.example .env
npm run dev
```

## Testing
Backend:
```bash
cd local-farmers-backendd
npm test
```

Frontend:
```bash
cd local-farmers-frontendd
npm test
```

## Formatting & Linting
Run these inside each module:
```bash
npm run lint
npm run format
```
