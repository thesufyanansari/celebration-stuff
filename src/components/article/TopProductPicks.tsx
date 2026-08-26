import { Sparkles, ExternalLink, Star, ShieldCheck, Heart, CheckCircle2 } from "lucide-react";
import type { Product } from "@/data/articles";

export interface EnhancedProduct extends Product {
  image?: string;
  imageAlt?: string;
  galleryImages?: string[];
  rating?: number;
  badge?: string;
  bestFor?: string;
  whyWeLoveIt?: string;
  keyFeatures?: string[];
  keyDetails?: string[];
  considerations?: string;
  consider?: string;
  verdict?: string;
  pros?: string[];
  cons?: string[];
}

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
    <section className="my-14 relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-surface via-background-subtle/40 to-surface p-6 sm:p-8 lg:p-10 shadow-card">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-accent-soft/20 blur-3xl" />

      {/* Header */}
      <div className="relative border-b border-border/70 pb-6">
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

      {/* Comparison-Style Product Rows List */}
      <div className="relative mt-8 flex flex-col gap-6">
        {topPicks.map((product, idx) => {
          const targetUrl = product.amazonUrl || product.url || null;
          const badge =
            product.badge ||
            (idx === 0
              ? "Best Overall Pick"
              : idx === 1
                ? "Best Budget Value"
                : idx === 2
                  ? "Best Premium Gift"
                  : "Top Practical Choice");

          return (
            <div
              key={product.id || product.name}
              className="group flex flex-col lg:flex-row gap-6 lg:gap-8 rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 lg:p-7 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lift"
            >
              {/* Left Column: Fixed Image Canvas (~25-30% on desktop) */}
              <div className="w-full lg:w-64 xl:w-72 shrink-0">
                <div className="relative h-56 sm:h-64 lg:h-full w-full min-h-[220px] overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-background-subtle/90 via-surface to-background-subtle/50 p-4 sm:p-5 flex items-center justify-center shadow-inner">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-sm"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-foreground-muted">
                      Product Visual
                    </div>
                  )}
                  <span className="absolute bottom-2.5 left-2.5 rounded-md bg-foreground/80 px-2.5 py-0.5 text-[0.68rem] font-semibold text-white backdrop-blur-sm shadow-sm">
                    Verified Pick #{idx + 1}
                  </span>
                </div>
              </div>

              {/* Right Column: Product Information & Action (~70-75% on desktop) */}
              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div>
                  {/* Top Meta Bar: Badge + Best For + Rating */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm whitespace-nowrap">
                        <Sparkles className="h-3 w-3" />
                        <span>{badge}</span>
                      </span>

                      {product.bestFor && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background-subtle/80 px-3 py-1 text-xs font-semibold text-foreground-muted">
                          <Heart className="h-3 w-3 text-rose-500 shrink-0" />
                          <span className="truncate">Best for: {product.bestFor}</span>
                        </span>
                      )}
                    </div>

                    {product.rating !== undefined && (
                      <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 shrink-0">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span>{product.rating.toFixed(1)} / 5.0</span>
                      </div>
                    )}
                  </div>

                  {/* Product Title */}
                  <h3 className="mt-3 font-display text-lg sm:text-xl lg:text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {product.name}
                  </h3>

                  {/* Why We Picked It Box */}
                  <div className="mt-3.5 rounded-xl bg-background-subtle/80 p-3.5 sm:p-4 border border-border/60">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      <span>Why We Picked It</span>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                      {product.whyWeLoveIt || product.why}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Price & Amazon CTA Button */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-border/60 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider">
                      Current Price:
                    </span>
                    <span className="font-display text-xl sm:text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                  </div>

                  {targetUrl ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-6 text-xs sm:text-sm font-bold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
                    >
                      <span>Check Price on Amazon</span>
                      <ExternalLink className="h-4 w-4 shrink-0" />
                    </a>
                  ) : (
                    <span className="inline-block rounded-xl bg-background-subtle py-2.5 px-5 text-center text-xs font-medium text-foreground-muted">
                      Curated Recommendation
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
