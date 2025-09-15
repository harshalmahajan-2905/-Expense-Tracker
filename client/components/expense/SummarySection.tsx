import { useQuery } from "@tanstack/react-query";
import { ExpensesAPI } from "@/services/expenses";
import { Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const palette = [
  "#22c55e",
  "#06b6d4",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#3b82f6",
  "#14b8a6",
  "#84cc16",
];

export function SummarySection() {
  const { data, isLoading, error } = useQuery({ queryKey: ["summary"], queryFn: ExpensesAPI.summary });

  if (isLoading)
    return <div className="rounded-xl border p-6 text-sm text-muted-foreground animate-fade-in">Loading summary...</div>;
  if (error)
    return (
      <div className="rounded-xl border p-6 text-sm text-red-600 animate-fade-in">Failed to load summary. Try again.</div>
    );

  const labels = Object.keys(data?.byCategory ?? {});
  const values = Object.values(data?.byCategory ?? {});

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, i) => palette[i % palette.length]),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border bg-card p-6 md:col-span-1 transition-all hover:-translate-y-0.5 hover:shadow-lg">
        <div className="text-sm text-muted-foreground">Total Spent</div>
        <div className="mt-2 text-3xl font-extrabold">₹{new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(data?.total ?? 0)}</div>
      </div>
      <div className="rounded-xl border bg-card p-6 md:col-span-2 transition-all hover:-translate-y-0.5 hover:shadow-lg">
        <div className="mb-4 text-sm font-semibold">By Category</div>
        {labels.length ? (
          <Doughnut data={chartData} options={{ plugins: { legend: { position: "bottom" } } }} />
        ) : (
          <div className="text-sm text-muted-foreground">Add expenses to see the breakdown.</div>
        )}
      </div>
    </div>
  );
}
