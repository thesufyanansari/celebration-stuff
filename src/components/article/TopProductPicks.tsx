import { Sparkles, ExternalLink, Star, ChevronRight } from "lucide-react";
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

  // Show top 3-4 picks for the quick overview
  const topPicks = products.slice(0, 4);

  return (
    <section className="my-10 rounded-3xl border border-primary/25 bg-gradient-to-br from-surface via-primary-soft/10 to-surface p-6 shadow-card sm:p-8 lg:p-9">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Editor Curated</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
        </div>
        <span className="text-xs font-medium text-foreground-muted">
          Updated with verified Amazon prices
        </span>
      </div>

      {/* Grid of Quick Pick Cards */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {topPicks.map((product, idx) => {
          const targetUrl = product.amazonUrl || product.url || null;
          const badge =
            product.badge ||
            (idx === 0
              ? "Best Overall"
              : idx === 1
                ? "Best Budget"
                : idx === 2
                  ? "Best Premium"
                  : "Best Tech");

          return (
            <div
              key={product.id || product.name}
              className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
            >
              {/* Top part: Fixed Image Canvas + Badge */}
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-b from-background-subtle to-surface border border-border/60 p-3.5 flex items-center justify-center shadow-inner">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-foreground-muted">
                      Product Visual
                    </div>
                  )}
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-primary px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-primary-foreground shadow-sm whitespace-nowrap">
                    {badge}
                  </span>
                </div>

                {/* Rating & Best For */}
                <div className="mt-3 flex items-center justify-between gap-1 text-[0.75rem]">
                  {product.bestFor && (
                    <span className="truncate font-semibold text-primary">{product.bestFor}</span>
                  )}
                  {product.rating !== undefined && (
                    <span className="flex shrink-0 items-center gap-1 font-bold text-amber-600">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {product.rating.toFixed(1)}
                    </span>
                  )}
                </div>

                {/* Product Name */}
                <h3 className="mt-1 font-display text-sm font-bold leading-snug text-foreground line-clamp-2">
                  {product.name}
                </h3>

                {/* One line why */}
                <p className="mt-1.5 text-xs text-foreground-muted line-clamp-2 leading-relaxed">
                  {product.whyWeLoveIt || product.why}
                </p>
              </div>

              {/* Bottom CTA */}
              <div className="mt-4 border-t border-border/50 pt-3">
                <div className="mb-2.5 flex items-baseline justify-between">
                  <span className="text-xs text-foreground-muted">Price:</span>
                  <span className="text-sm font-bold text-primary font-display">
                    {product.price}
                  </span>
                </div>

                {targetUrl ? (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow"
                  >
                    <span>Check on Amazon</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="block w-full rounded-xl bg-background-subtle py-2 text-center text-xs font-medium text-foreground-muted">
                    Curated Pick
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
