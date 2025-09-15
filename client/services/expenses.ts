import type { Expense, ExpenseInput, SummaryResponse } from "@shared/api";

// Get the API base URL from environment variable or use relative path for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const url = API_BASE_URL ? `${API_BASE_URL}${path.startsWith("/") ? path.substring(1) : path}` : path;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

export const ExpensesAPI = {
  list: () => http<Expense[]>("/api/expenses"),
  create: (data: ExpenseInput) =>
    http<Expense>("/api/expenses", { method: "POST", body: JSON.stringify(data) }),
  remove: (id: string) => http<void>(`/api/expenses/${id}`, { method: "DELETE" }),
  summary: () => http<SummaryResponse>("/api/expenses/summary"),
};
