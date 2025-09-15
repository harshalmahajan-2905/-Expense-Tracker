# Expense Tracker Backend (expense-tracker-backend)

Tech: Node.js • Express • MongoDB (Mongoose)

## Project Overview
REST API for managing expenses with validation and summary analytics.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- TypeScript

## Folder Structure
```
server/
├─ config/
│  └─ db.ts           # Mongo connection (with in-memory fallback for local demo)
├─ controllers/
│  └─ expenseController.ts
├─ models/
│  └─ Expense.ts
├─ routes/
│  └─ expenses.ts
└─ index.ts           # Express app wiring
```

## Environment
Create a MongoDB database (e.g., MongoDB Atlas) and set env variables:

- MONGODB_URI: connection string
- MONGODB_DB_NAME: optional database name

You can use the DevServer environment manager to set variables.

## Scripts
- pnpm dev – start dev server
- pnpm build – build client + server
- pnpm start – run production build

## API Endpoints
- GET /api/expenses → list all expenses
- POST /api/expenses → create a new expense
  - body: { title: string, amount: number, category: string, date: ISO string }
- DELETE /api/expenses/:id → delete by id
- GET /api/expenses/summary → total and totals by category

### Example
```
POST /api/expenses
Content-Type: application/json
{
  "title": "Coffee",
  "amount": 4.5,
  "category": "Food",
  "date": "2025-01-10T00:00:00.000Z"
}
```

## Deployment (Render)
1) Create a new Render Web Service from this backend (or a repo with only server/)
2) Environment: set MONGODB_URI (+ MONGODB_DB_NAME optionally)
3) Build Command: pnpm install && pnpm build
4) Start Command: pnpm start

## Notes
- If MONGODB_URI is not set, the API uses an in-memory store (non-persistent) for local demo purposes.
- Removed example demo route; API surface is focused on expenses.
