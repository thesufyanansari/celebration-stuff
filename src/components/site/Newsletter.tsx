import { useState } from "react";
import { Check } from "lucide-react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section
      className={`surface-card overflow-hidden ${compact ? "p-6" : "p-8 sm:p-12"}`}
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="text-overline">The weekly edit</p>
        <h2
          id="newsletter-heading"
          className={compact ? "mt-2 text-h3" : "mt-3 text-h2"}
        >
          Celebration ideas, before the season starts
        </h2>
        <p className="mt-3 text-sm text-foreground-muted">
          One email a week with seasonal decorating, gift picks and hosting plans. No spam,
          unsubscribe anytime.
        </p>

        {done ? (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-accent">
            <Check className="h-4 w-4" /> You're on the list — check your inbox.
          </p>
        ) : (
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Get the edit
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
