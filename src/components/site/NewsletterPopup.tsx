import { useState, useEffect } from "react";
import { X, Gift, Mail, CheckCircle2 } from "lucide-react";

export function NewsletterPopup({ delaySeconds = 10 }: { delaySeconds?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user previously closed or subscribed
    const isSuppressed = localStorage.getItem("newsletter_popup_suppressed");
    if (isSuppressed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  const handleClose = () => {
    setIsOpen(false);
    // Suppress popup for 7 days if closed
    localStorage.setItem("newsletter_popup_suppressed", String(Date.now() + 7 * 24 * 60 * 60 * 1000));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setSubmitted(true);
    // Permanent suppression after subscribing
    localStorage.setItem("newsletter_popup_suppressed", "subscribed");

    setTimeout(() => {
      setIsOpen(false);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-lift">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3.5 top-3.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-background-subtle text-foreground-muted transition-colors hover:text-foreground"
          aria-label="Close newsletter popup"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Gift className="h-6 w-6" />
          </div>

          <div className="mt-4 text-center">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Find Your Next Great Gift
            </h3>
            <p className="mt-2 text-xs text-foreground-muted leading-relaxed">
              Get fresh gift guides, seasonal inspiration and curated recommendations delivered straight to your inbox.
            </p>
          </div>

          {submitted ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-2xl bg-emerald-500/10 p-4 text-center text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 mb-1" />
              <span>You're subscribed! Welcome to Celebration Stuff.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-foreground-muted" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Get Gift Ideas
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-[0.7rem] text-foreground-muted">
            No spam. Just useful gift inspiration. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
