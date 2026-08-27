import { Sparkles, ShieldCheck } from "lucide-react";
import { ArticleProductCard, type EnhancedProduct } from "./ArticleProductCard";

export { type EnhancedProduct } from "./ArticleProductCard";

interface TopProductPicksProps {
  products: EnhancedProduct[];
  title?: string;
}

export function TopProductPicks({
  products,
  title = "Our Top Picks at a Glance",
}: TopProductPicksProps) {
  if (!products || products.length === 0) return null;

  // Show top 3-4 curated picks for the quick overview
  const topPicks = products.slice(0, 4);

  return (
    <section className="my-8 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/25 bg-gradient-to-br from-surface via-background-subtle/40 to-surface p-5 sm:p-7 lg:p-8 shadow-card">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-accent-soft/20 blur-3xl" />

      {/* Header */}
      <div className="relative border-b border-border/70 pb-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Editor Curated Quick Comparison</span>
        </div>

        <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-foreground-muted max-w-2xl leading-relaxed">
              In a hurry? Compare our top standout recommendations side-by-side to find the right
              match instantly.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-emerald-700 bg-emerald-500/10 px-3 py-1.5 rounded-full shrink-0">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Verified Amazon Prices</span>
          </div>
        </div>
      </div>

      {/* Product Cards using Master Product Card System */}
      <div className="relative mt-6 flex flex-col gap-6">
        {topPicks.map((product, idx) => (
          <ArticleProductCard
            key={product.id || `quick-pick-${idx}`}
            product={product}
            index={idx}
            showPickNumber={true}
          />
        ))}
      </div>
    </section>
  );
}
