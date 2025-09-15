import { PropsWithChildren, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function DashboardLayout({ children }: PropsWithChildren) {
  const { hash } = useLocation();
  const current = hash || "#dashboard";

  const items = useMemo(
    () => [
      { label: "Dashboard", hash: "#dashboard" },
      { label: "Expenses", hash: "#expenses" },
      { label: "Summary", hash: "#summary" },
    ],
    [],
  );

  const go = (h: string) => {
    if (typeof window !== "undefined") window.location.hash = h;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1500px_600px_at_20%_-10%,hsl(var(--brand-blue)/0.12),transparent),radial-gradient(1200px_500px_at_80%_-10%,hsl(var(--brand-green)/0.12),transparent)]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[240px,1fr]">
          <aside className="sticky top-6 h-fit rounded-2xl border bg-card/70 p-4 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-brand-blue to-brand-green" />
              <div className="text-lg font-extrabold tracking-tight">Expense Tracker</div>
            </div>
            <nav className="space-y-1 text-sm">
              {items.map((i) => {
                const active = current === i.hash;
                return (
                  <button
                    key={i.label}
                    onClick={() => go(i.hash)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors",
                      active
                        ? "bg-muted/70 font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50",
                    )}
                    type="button"
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{i.label}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-brand-green" />}
                  </button>
                );
              })}
            </nav>
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
