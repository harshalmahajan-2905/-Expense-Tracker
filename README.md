# Expense Tracker

A full-stack Expense Tracker with a modern, responsive dashboard UI and an Express API. Single-page navigation via sidebar buttons switches sections (Dashboard, Expenses, Summary) without routing to other pages.

## Tech Stack
- Frontend: React, TailwindCSS, React Query, Chart.js
- Backend: Node.js, Express, Mongoose (MongoDB)

## Features
- Add expenses (title, amount in INR, category, date)
- List with inline delete and confirmation
- Summary with total and category-wise doughnut chart
- Modern gradients, micro-interactions, responsive grid, sidebar layout
- Hash-based in-page navigation (#dashboard, #expenses, #summary)

## Monorepo Structure
```
client/   # React SPA frontend
server/   # Express API server
```

See detailed guides:
- client/README.md – frontend usage and deployment
- server/README.md – backend API, env, and deployment

## Setup
1. Install deps
   pnpm install
2. Dev
   pnpm dev
3. Optional: connect MongoDB
   - Set MONGODB_URI and optional MONGODB_DB_NAME (use project settings env manager)
   - Without it, an in-memory store is used (non-persistent)

## API (Server)
- GET /api/expenses
- POST /api/expenses
- DELETE /api/expenses/:id
- GET /api/expenses/summary

## Deployment
- Frontend: Netlify
- Backend: Render

## Notes
- Unused boilerplate components were removed to keep the repo lean. Core UI utilities kept: tooltip, toaster, sonner.
