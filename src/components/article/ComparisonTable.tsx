import { ExternalLink, Star } from "lucide-react";
import type { EnhancedProduct } from "./TopProductPicks";

interface ComparisonTableProps {
  products: EnhancedProduct[];
  title?: string;
}

export function ComparisonTable({
  products,
  title = "Which One Should You Choose? Comparison Table",
}: ComparisonTableProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-12 rounded-3xl border border-border/80 bg-surface p-6 shadow-card sm:p-8 lg:p-9">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-foreground-muted">
          Compare key features, verified prices, and top use cases at a glance.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border/80 bg-surface shadow-sm">
        <table className="w-full min-w-[700px] text-left text-xs">
          <thead className="bg-background-subtle/80 text-foreground border-b border-border/80">
            <tr>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-[0.72rem] text-foreground">
                Product
              </th>
              <th className="py-4 px-4 font-bold uppercase tracking-wider text-[0.72rem] text-foreground">
                Best For
              </th>
              <th className="py-4 px-4 font-bold uppercase tracking-wider text-[0.72rem] text-foreground">
                Price
              </th>
              <th className="py-4 px-4 font-bold uppercase tracking-wider text-[0.72rem] text-foreground">
                Rating
              </th>
              <th className="py-4 px-5 text-right font-bold uppercase tracking-wider text-[0.72rem] text-foreground">
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {products.map((p) => {
              const targetUrl = p.amazonUrl || p.url || null;

              return (
                <tr key={p.id || p.name} className="transition-colors hover:bg-surface-hover/80">
                  {/* Product with fixed thumbnail canvas */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3.5">
                      {p.image && (
                        <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-b from-background-subtle to-surface p-1 border border-border/70 flex items-center justify-center shadow-inner">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="font-bold text-foreground text-sm line-clamp-1 block">
                          {p.name}
                        </span>
                        {p.badge && (
                          <span className="text-[0.68rem] text-primary font-bold uppercase tracking-wide">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Best For */}
                  <td className="py-4 px-4 text-foreground font-medium">
                    {p.bestFor || "Recommended Choice"}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 font-bold text-primary font-display text-sm">
                    {p.price}
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-4">
                    {p.rating !== undefined ? (
                      <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{p.rating.toFixed(1)}</span>
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-5 text-right">
                    {targetUrl ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow"
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
