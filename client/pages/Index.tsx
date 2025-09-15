import { AddExpenseForm } from "@/components/expense/AddExpenseForm";
import { ExpenseList } from "@/components/expense/ExpenseList";
import { SummarySection } from "@/components/expense/SummarySection";
import { useLocation } from "react-router-dom";

export default function Index() {
  const { hash } = useLocation();
  const current = hash || "#dashboard";

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-2 py-6 md:px-4 md:py-8">
        <header className="mb-6 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-brand-blue via-brand-green to-accent bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-4xl">
              {current === "#expenses" ? "Expenses" : current === "#summary" ? "Summary" : "Dashboard"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your spending, visualize categories, and stay on budget.
            </p>
          </div>
          <a
            href="https://builder.io/c/docs/projects"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 md:inline-block"
          >
            Docs
          </a>
        </header>

        {current === "#dashboard" && (
          <>
            <section className="mb-6 md:mb-8">
              <AddExpenseForm />
            </section>
            <section className="mb-6 md:mb-8">
              <SummarySection />
            </section>
            <section>
              <ExpenseList />
            </section>
          </>
        )}

        {current === "#expenses" && (
          <>
            <section className="mb-6 md:mb-8">
              <AddExpenseForm />
            </section>
            <section>
              <ExpenseList />
            </section>
          </>
        )}

        {current === "#summary" && (
          <section>
            <SummarySection />
          </section>
        )}
      </div>
    </div>
  );
}
