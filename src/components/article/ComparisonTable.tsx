import { ExternalLink, Star, Layers, CheckCircle2, Sparkles } from "lucide-react";
import type { EnhancedProduct } from "./TopProductPicks";

interface ComparisonTableProps {
  products: EnhancedProduct[];
  title?: string;
}

export function ComparisonTable({
  products,
  title = "Which One Should You Choose? Comparison Guide",
}: ComparisonTableProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-14 relative overflow-hidden rounded-3xl border border-border/80 bg-surface p-6 sm:p-8 lg:p-10 shadow-card">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      {/* Header */}
      <div className="mb-8 border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
          <Layers className="h-3.5 w-3.5" />
          <span>Decision Guide & Side-by-Side Breakdown</span>
        </div>

        <h2 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-foreground-muted max-w-3xl leading-relaxed">
          Compare verified prices, buyer ratings, standout features, and ideal recipient use cases
          side-by-side to choose with complete confidence.
        </p>
      </div>

      {/* Table Container with Controlled Horizontal Scroll */}
      <div className="overflow-x-auto rounded-2xl border border-border/80 bg-surface shadow-sm">
        <table className="w-full min-w-[860px] text-left text-xs sm:text-sm">
          <thead className="bg-background-subtle/90 text-foreground border-b border-border/80">
            <tr>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-[0.72rem] text-foreground w-[34%]">
                Product & Overview
              </th>
              <th className="py-4 px-4 font-bold uppercase tracking-wider text-[0.72rem] text-foreground w-[22%]">
                Best For
              </th>
              <th className="py-4 px-4 font-bold uppercase tracking-wider text-[0.72rem] text-foreground w-[22%]">
                Key Standout Feature
              </th>
              <th className="py-4 px-4 font-bold uppercase tracking-wider text-[0.72rem] text-foreground w-[10%]">
                Price & Rating
              </th>
              <th className="py-4 px-5 text-right font-bold uppercase tracking-wider text-[0.72rem] text-foreground w-[12%]">
                Amazon Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {products.map((p, idx) => {
              const targetUrl = p.amazonUrl || p.url || null;
              const badge =
                p.badge ||
                (idx === 0
                  ? "Top Pick"
                  : idx === 1
                    ? "Best Value"
                    : idx === 2
                      ? "Premium"
                      : undefined);

              return (
                <tr
                  key={p.id || p.name}
                  className="group transition-colors hover:bg-surface-hover/70"
                >
                  {/* Column 1: Product with Large Fixed Canvas (110-140px) */}
                  <td className="py-5 px-5">
                    <div className="flex items-start gap-4">
                      {p.image && (
                        <div className="h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-2xl bg-gradient-to-b from-background-subtle/90 via-surface to-background-subtle/50 p-2.5 border border-border/70 flex items-center justify-center shadow-inner overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.imageAlt || p.name}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm"
                          />
                        </div>
                      )}
                      <div className="flex flex-col justify-between min-w-0 py-0.5">
                        {badge && (
                          <div className="mb-1.5">
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-primary">
                              <Sparkles className="h-2.5 w-2.5" />
                              <span>{badge}</span>
                            </span>
                          </div>
                        )}
                        <h4 className="font-display font-bold text-foreground text-sm sm:text-base leading-snug line-clamp-2 transition-colors group-hover:text-primary">
                          {p.name}
                        </h4>
                        <p className="mt-1.5 text-xs text-foreground-muted leading-relaxed line-clamp-2">
                          {p.whyWeLoveIt || p.why}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Best For Tag */}
                  <td className="py-5 px-4">
                    <div className="inline-flex items-center gap-1.5 rounded-xl bg-primary-soft/40 border border-primary/20 px-3 py-1.5 text-xs font-semibold text-primary">
                      <span>{p.bestFor || "Ideal Gift Choice"}</span>
                    </div>
                  </td>

                  {/* Column 3: Standout Highlights */}
                  <td className="py-5 px-4 text-xs text-foreground">
                    {p.keyDetails && p.keyDetails.length > 0 ? (
                      <div className="flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                        <span>{p.keyDetails[0]}</span>
                      </div>
                    ) : (
                      <span className="text-foreground-muted leading-relaxed">
                        {p.whyWeLoveIt || p.why}
                      </span>
                    )}
                  </td>

                  {/* Column 4: Price & Rating */}
                  <td className="py-5 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-base font-bold text-primary">
                        {p.price}
                      </span>
                      {p.rating !== undefined && (
                        <span className="inline-flex items-center gap-1 font-bold text-xs text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full w-fit">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          <span>{p.rating.toFixed(1)}</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Column 5: Action CTA Button */}
                  <td className="py-5 px-5 text-right">
                    {targetUrl ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
                      >
                        <span>Check Price</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-medium text-foreground-muted">Curated</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
