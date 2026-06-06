# PREPZEN AI

AI Mental Wellness Copilot for Competitive Exam Students

Overview
- Frontend: React + TypeScript + Vite + Tailwind
- Backend: Node.js + Express + TypeScript + MongoDB
- AI: OpenAI (configurable)

Quick start

1) Backend

```bash
cd "backend"
npm install
cp .env.example .env
# Set MONGO_URI, JWT_SECRET, OPENAI_API_KEY
npm run dev
```

2) Frontend

```bash
cd "frontend"
npm install
npm run dev
```

APIs
- POST /api/auth/register
- POST /api/auth/login
- POST /api/mood
- GET /api/mood/history
- POST /api/journal
- GET /api/journal/history
- POST /api/ai/analyze
- POST /api/ai/chat

Environment variables (backend/.env)
- PORT=4000
- MONGO_URI=
- JWT_SECRET=
- OPENAI_API_KEY=

AI prompt templates

- Journal Analysis: returns JSON { emotion, sentiment, confidence_level, stress_triggers, burnout_risk, recommendations }
- Exam Personality Analysis: (implement as separate endpoint)
- Wellness Coaching: conversational prompts sent to /api/ai/chat

Deployment
- Frontend: Vercel (build `frontend`)
- Backend: Render or Heroku; set env vars and connect to MongoDB Atlas
- Database: MongoDB Atlas (create cluster and update `MONGO_URI`)

Testing
- Backend tests: run `npm run test` in `backend`
- Frontend tests: run `npm run test` in `frontend`

Security & Quality
- Helmet, rate-limiting, input sanitization, xss-clean
- JWT auth and bcrypt password hashing
- ESLint / Prettier (configure per preference)

Next steps
- Implement frontend pages for Dashboard, Journal, Analytics, AI Coach
- Add unit and integration tests to reach 80% coverage
- Add CI (GitHub Actions) and deploy pipelines
