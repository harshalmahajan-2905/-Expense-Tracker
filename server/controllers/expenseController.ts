import { RequestHandler } from "express";
import { z } from "zod";
import { ExpenseModel } from "../models/Expense";
import { useMemoryStore } from "../config/db";
import { randomUUID } from "crypto";

const expenseInputSchema = z.object({
  title: z.string().min(1).max(200),
  amount: z.number().positive().or(z.string().transform((v) => Number(v))).refine((n) => !isNaN(Number(n)) && Number(n) >= 0, {
    message: "amount must be a non-negative number",
  }).transform((v) => Number(v)),
  category: z.string().min(1).max(100),
  date: z.string().or(z.date()).transform((v) => new Date(v)),
});

// In-memory fallback store (non-persistent)
let memoryExpenses: any[] = [];

function toClient(e: any) {
  return {
    id: e._id?.toString?.() ?? e.id,
    title: e.title,
    amount: e.amount,
    category: e.category,
    date: new Date(e.date).toISOString(),
  };
}

export const getExpenses: RequestHandler = async (_req, res, next) => {
  try {
    if (useMemoryStore) {
      return res.json(memoryExpenses.map(toClient));
    }
    const expenses = await ExpenseModel.find().sort({ date: -1 }).lean();
    res.json(expenses.map(toClient));
  } catch (err) {
    next(err);
  }
};

export const createExpense: RequestHandler = async (req, res, next) => {
  try {
    const parsed = expenseInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const input = parsed.data;

    if (useMemoryStore) {
      const newItem = { id: randomUUID(), ...input };
      memoryExpenses.unshift(newItem);
      return res.status(201).json(toClient(newItem));
    }

    const created = await ExpenseModel.create(input);
    res.status(201).json(toClient(created));
  } catch (err) {
    next(err);
  }
};

export const deleteExpense: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "id is required" });

    if (useMemoryStore) {
      const before = memoryExpenses.length;
      memoryExpenses = memoryExpenses.filter((e) => e.id !== id);
      if (memoryExpenses.length === before) return res.status(404).json({ error: "Not found" });
      return res.status(204).send();
    }

    const deleted = await ExpenseModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const updateExpense: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "id is required" });

    const parsed = expenseInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const input = parsed.data;

    if (useMemoryStore) {
      const index = memoryExpenses.findIndex((e) => e.id === id);
      if (index === -1) return res.status(404).json({ error: "Not found" });
      
      memoryExpenses[index] = { ...memoryExpenses[index], ...input };
      return res.json(toClient(memoryExpenses[index]));
    }

    const updated = await ExpenseModel.findByIdAndUpdate(id, input, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(toClient(updated));
  } catch (err) {
    next(err);
  }
};

export const getSummary: RequestHandler = async (_req, res, next) => {
  try {
    if (useMemoryStore) {
      const totals: Record<string, number> = {};
      for (const e of memoryExpenses) {
        totals[e.category] = (totals[e.category] ?? 0) + Number(e.amount);
      }
      const total = Object.values(totals).reduce((a, b) => a + b, 0);
      return res.json({ total, byCategory: totals });
    }

    const agg = await ExpenseModel.aggregate([
      { $group: { _id: "$category", sum: { $sum: "$amount" } } },
      { $sort: { sum: -1 } },
    ]);
    const byCategory: Record<string, number> = {};
    for (const row of agg) byCategory[row._id] = row.sum;
    const total = Object.values(byCategory).reduce((a, b) => a + b, 0);
    res.json({ total, byCategory });
  } catch (err) {
    next(err);
  }
};
