import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExpensesAPI } from "@/services/expenses";
import type { Expense } from "@shared/api";
import { toast } from "sonner";

export function ExpenseList() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ["expenses"], queryFn: ExpensesAPI.list });

  const { mutate: remove } = useMutation({
    mutationFn: ExpensesAPI.remove,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ["expenses"] });
      const previous = qc.getQueryData<Expense[]>(["expenses"]);
      qc.setQueryData<Expense[]>(["expenses"], (old) => (old ?? []).filter((e) => e.id !== id));
      return { previous };
    },
    onError: (_err, _id, context) => {
      qc.setQueryData(["expenses"], context?.previous);
      toast.error("Failed to delete expense");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["summary"] });
    },
  });

  if (isLoading)
    return <div className="rounded-xl border p-6 text-sm text-muted-foreground animate-fade-in">Loading expenses...</div>;
  if (error)
    return (
      <div className="rounded-xl border p-6 text-sm text-red-600 animate-fade-in">
        Failed to load expenses. Try again.
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="rounded-xl border p-6 text-sm text-muted-foreground animate-fade-in">No expenses yet. Add your first one above.</div>
    );

  return (
    <div className="overflow-hidden rounded-xl border animate-fade-in">
      <table className="min-w-full divide-y divide-border/80">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Title</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Category</th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/80 bg-card">
          {data.map((e) => (
            <tr key={e.id} className="transition-colors hover:bg-muted/40">
              <td className="px-4 py-3 text-sm">{e.title}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{e.category}</td>
              <td className="px-4 py-3 text-right text-sm font-semibold">₹{new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(e.amount)}</td>
              <td className="px-4 py-3 text-right text-sm text-muted-foreground">{new Date(e.date).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => {
                    if (confirm("Delete this expense?")) remove(e.id);
                  }}
                  className="inline-flex h-8 items-center justify-center rounded-md px-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
