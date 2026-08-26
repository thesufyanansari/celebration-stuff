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
    <section className="my-12 rounded-3xl border border-border/80 bg-surface p-6 shadow-card sm:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          Compare key features, prices, and top use cases at a glance.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border/60">
        <table className="w-full min-w-[600px] text-left text-xs">
          <thead className="bg-background-subtle text-foreground border-b border-border/70">
            <tr>
              <th className="py-3.5 px-4 font-bold">Product</th>
              <th className="py-3.5 px-4 font-bold">Best For</th>
              <th className="py-3.5 px-4 font-bold">Price</th>
              <th className="py-3.5 px-4 font-bold">Rating</th>
              <th className="py-3.5 px-4 text-right font-bold">Amazon Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {products.map((p, i) => {
              const targetUrl = p.amazonUrl || p.url || null;

              return (
                <tr key={p.id || p.name} className="transition-colors hover:bg-surface-hover/60">
                  {/* Product with thumbnail */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-10 w-10 shrink-0 rounded-lg object-cover border border-border/50"
                        />
                      )}
                      <div>
                        <span className="font-semibold text-foreground line-clamp-1">{p.name}</span>
                        {p.badge && (
                          <span className="text-[0.68rem] text-primary font-bold">{p.badge}</span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Best For */}
                  <td className="py-3.5 px-4 text-foreground-muted font-medium">
                    {p.bestFor || "General Gift"}
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-bold text-primary">{p.price}</td>

                  {/* Rating */}
                  <td className="py-3.5 px-4">
                    {p.rating !== undefined ? (
                      <span className="flex items-center gap-1 font-semibold text-amber-600">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {p.rating.toFixed(1)}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    {targetUrl ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                      >
                        <span>View</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-foreground-muted">Curated</span>
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
