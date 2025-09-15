/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

// Expense Tracker shared types
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // ISO string
}

export interface ExpenseInput {
  title: string;
  amount: number;
  category: string;
  date: string; // ISO string
}

export interface SummaryResponse {
  total: number;
  byCategory: Record<string, number>;
}
