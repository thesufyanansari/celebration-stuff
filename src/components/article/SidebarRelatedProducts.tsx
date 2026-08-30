import { Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import type { Article, Product } from "@/data/articles";
import { getTopicArticles } from "@/data/articles";

interface SidebarRelatedProductsProps {
  currentArticle: Article;
  limit?: number;
}

export function SidebarRelatedProducts({ currentArticle, limit = 3 }: SidebarRelatedProductsProps) {
  // Extract contextual products:
  // 1. First, check if current article has products
  // 2. Also check topic-related articles to offer diverse curated gift picks
  const candidateProducts: Product[] = [];

  // If current article has 4+ products, take 2-3 distinct picks from later in the list (e.g. idx 3, 5, 7)
  if (currentArticle.products && currentArticle.products.length > 3) {
    const picks = currentArticle.products.slice(2, 2 + limit);
    candidateProducts.push(...picks);
  } else if (currentArticle.products && currentArticle.products.length > 0) {
    candidateProducts.push(...currentArticle.products.slice(0, limit));
  }

  // If we still need more products, pull from top topic articles
  if (candidateProducts.length < limit) {
    const related = getTopicArticles(currentArticle, 3);
    for (const relArt of related) {
      if (relArt.products && relArt.products.length > 0) {
        for (const p of relArt.products) {
          if (
            p.name &&
            (p.amazonUrl || p.url) &&
            !candidateProducts.some((cp) => cp.name === p.name)
          ) {
            candidateProducts.push(p);
            if (candidateProducts.length >= limit) break;
          }
        }
      }
      if (candidateProducts.length >= limit) break;
    }
  }

  const selectedProducts = candidateProducts.slice(0, limit);

  if (selectedProducts.length === 0) return null;

  return (
    <div className="rounded-3xl border border-primary/20 bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Featured Gift Picks</span>
        </div>
        <div className="flex items-center gap-1 text-[0.68rem] font-semibold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
          <ShieldCheck className="h-3 w-3 text-emerald-600" />
          <span>Verified</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {selectedProducts.map((product, idx) => {
          const targetUrl = product.amazonUrl || product.url || null;
          const badge =
            product.badge ||
            (idx === 0 ? "Top Pick" : idx === 1 ? "Popular Choice" : "Recommended");

          return (
            <div
              key={product.id || product.name || idx}
              className="group flex flex-col rounded-2xl border border-border/80 bg-background-subtle/40 p-3.5 transition-all duration-300 hover:border-primary/40 hover:bg-surface hover:shadow-sm"
            >
              {/* Image Canvas */}
              <div className="relative h-36 w-full overflow-hidden rounded-xl border border-border/60 bg-gradient-to-b from-background-subtle/90 via-surface to-background-subtle/50 p-2.5 flex items-center justify-center shadow-inner">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    width={300}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm"
                  />
                ) : (
                  <div className="text-xs text-foreground-muted">Product Visual</div>
                )}
                {badge && (
                  <span className="absolute top-2 left-2 rounded-full bg-primary/90 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                    {badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="mt-2.5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-display text-xs sm:text-sm font-bold text-foreground line-clamp-2 leading-snug transition-colors group-hover:text-primary">
                    {product.name}
                  </h4>
                  {(product.whyWeLoveIt || product.why) && (
                    <p className="mt-1 text-[0.72rem] text-foreground-muted line-clamp-2 leading-relaxed">
                      {product.whyWeLoveIt || product.why}
                    </p>
                  )}
                </div>

                {/* Price & Action Button */}
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/50 pt-2.5">
                  {product.price ? (
                    <span className="font-display text-sm sm:text-base font-bold text-primary">
                      {product.price}
                    </span>
                  ) : (
                    <span className="text-[0.72rem] font-medium text-foreground-muted">
                      Check price
                    </span>
                  )}

                  {targetUrl ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-primary py-2 px-3.5 text-[0.72rem] font-bold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 whitespace-nowrap"
                    >
                      <span>Check Price</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-[0.72rem] text-foreground-muted">Curated</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
