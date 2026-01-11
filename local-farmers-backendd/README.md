# Local Farmers Backend

Express API for Local Farmers. Provides health checks and API endpoints for the frontend.

## Requirements
- Node.js 18+
- npm

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts
- `npm run dev` - start the API with live reload.
- `npm start` - run the API in production mode.
- `npm test` - run Jest + Supertest tests.
- `npm run lint` - run ESLint.
- `npm run format` - check formatting with Prettier.

## Environment
- `PORT` - API port (default: 3000)
- `CORS_ORIGINS` - comma-separated list of allowed origins
