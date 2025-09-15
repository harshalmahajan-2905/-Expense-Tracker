import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ExpenseInput } from "@shared/api";
import { ExpensesAPI } from "@/services/expenses";
import { toast } from "sonner";

const categories = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Health",
  "Entertainment",
  "Shopping",
  "Other",
];

export function AddExpenseForm() {
  const qc = useQueryClient();
  const [form, setForm] = useState<ExpenseInput>({
    title: "",
    amount: 0,
    category: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const { mutateAsync: create, isPending } = useMutation({
    mutationFn: ExpensesAPI.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
      qc.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Expense added");
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to add expense"),
  });

  return (
    <form
      className="grid gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm md:grid-cols-5 animate-fade-in"
      onSubmit={async (e) => {
        e.preventDefault();
        await create({
          ...form,
          amount: Number(form.amount),
          date: new Date(form.date).toISOString(),
        });
        setForm({ title: "", amount: 0, category: "", date: new Date().toISOString().slice(0, 10) });
      }}
    >
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-sm text-muted-foreground">Title</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Coffee at Blue Bottle"
          className="h-10 rounded-md border bg-background px-3 outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus:shadow-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-muted-foreground">Amount (INR)</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
            placeholder="0.00"
            className="h-10 w-full rounded-md border bg-background pl-7 pr-3 outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus:shadow-md"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-muted-foreground">Category</label>
        <input
          list="category-list"
          required
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          placeholder="Select or type"
          className="h-10 rounded-md border bg-background px-3 outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus:shadow-md"
        />
        <datalist id="category-list">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-muted-foreground">Date</label>
        <input
          required
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          className="h-10 rounded-md border bg-background px-3 outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus:shadow-md"
        />
      </div>
      <div className="md:col-span-5 flex justify-end">
        <button
          disabled={isPending}
          className={`relative inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-brand-blue to-brand-green px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 ${isPending ? "animate-pulse" : ""}`}
        >
          {isPending ? "Adding..." : "Add Expense"}
        </button>
      </div>
    </form>
  );
}
