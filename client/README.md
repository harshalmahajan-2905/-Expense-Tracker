# Expense Tracker Frontend (expense-tracker-frontend)

Tech: React + TailwindCSS + React Query + Chart.js

## Overview
A modern, responsive UI to add, list, and analyze expenses with a category-wise chart.

## Folder Structure
```
client/
├─ components/
│  └─ expense/
│     ├─ AddExpenseForm.tsx
│     ├─ ExpenseList.tsx
│     └─ SummarySection.tsx
├─ pages/
│  └─ Index.tsx
├─ services/
│  └─ expenses.ts
└─ App.tsx
```

## Setup & Run
- pnpm dev – run locally
- Ensure the backend is reachable at the same origin or set a proxy

## API Integration
The app calls these endpoints:
- GET /api/expenses
- POST /api/expenses
- DELETE /api/expenses/:id
- GET /api/expenses/summary

Update `client/services/expenses.ts` if your backend lives on a different origin.

## Features
- Add expense (title, amount in INR, category, date)
- List with delete + confirmation
- Summary card and doughnut chart by category
- Sidebar buttons switch sections on the same page (#dashboard, #expenses, #summary)
- Optional filters/search can be added later

## Deployment (Netlify)
1) Create a new Netlify project from this frontend (or a repo with only client/)
2) Build Command: pnpm build
3) Publish directory: dist/spa
4) If backend is on another domain, add environment variable PUBLIC_API_BASE and use it in services

Live demo URLs can be added after deployment.
