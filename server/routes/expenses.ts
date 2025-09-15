import { Router } from "express";
import { createExpense, deleteExpense, getExpenses, getSummary, updateExpense } from "../controllers/expenseController";

const router = Router();

router.get("/summary", getSummary);
router.get("/", getExpenses);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
