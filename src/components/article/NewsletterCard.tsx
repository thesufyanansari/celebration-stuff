import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-soft/40 via-surface to-accent-soft/20 p-5 shadow-card">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <Mail className="h-4 w-4" />
        <span>Celebration Newsletter</span>
      </div>

      <h4 className="mt-1 font-display text-base font-bold text-foreground">
        Get Curated Holiday & Gift Ideas
      </h4>
      <p className="mt-1 text-xs text-foreground-muted leading-relaxed">
        Weekly gift guides, party plans, and seasonal holiday picks delivered straight to your inbox.
      </p>

      {subscribed ? (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>You're all set! Check your inbox soon.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
          <input
            type="email"
            required
            placeholder="Your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs text-foreground placeholder:text-foreground-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow"
          >
            <span>Subscribe Free</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>
      )}

      <span className="mt-2.5 block text-center text-[0.68rem] text-foreground-muted">
        No spam, ever. Unsubscribe anytime.
      </span>
    </div>
  );
}
