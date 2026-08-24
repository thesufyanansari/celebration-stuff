import { useState } from "react";
import { Star, ExternalLink, CheckCircle, AlertCircle, Sparkles, Heart, ChevronRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/articles";

export type EnhancedProduct = Product & {
  image?: string;
  galleryImages?: string[];
  rating?: number;
  badge?: string;
  bestFor?: string;
  whyWeLoveIt?: string;
  keyFeatures?: string[];
  considerations?: string;
  verdict?: string;
};

export function QuickPicksSection({ products }: { products: EnhancedProduct[] }) {
  if (!products.length) return null;

  const picks = [
    { label: "Best Overall", product: products[0] },
    { label: "Best Value", product: products[1] || products[0] },
    { label: "Best Luxury", product: products[2] || products[0] },
  ].filter((p) => p.product);

  return (
    <div className="rounded-2xl border border-primary/20 bg-accent-soft/20 p-6 shadow-card">
      <div className="flex items-center gap-2 text-overline text-primary font-semibold">
        <Sparkles className="h-4 w-4" />
        <span>Quick Picks — Top Recommendations</span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {picks.map((pick, i) => {
          const targetUrl = pick.product.amazonUrl || pick.product.url || null;

          return (
            <div key={i} className="flex flex-col justify-between rounded-xl border border-border/80 bg-surface p-4 shadow-sm">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                  {pick.label}
                </span>
                <h4 className="mt-2 font-display text-sm font-semibold text-foreground line-clamp-1">
                  {pick.product.name}
                </h4>
                <p className="mt-1 text-xs text-foreground-muted line-clamp-2">{pick.product.whyWeLoveIt || pick.product.why}</p>
              </div>
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-border/40">
                <span className="text-xs font-bold text-primary">{pick.product.price}</span>
                {targetUrl ? (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View on Amazon</span>
                    <ChevronRight className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground-muted">
                    <ShoppingBag className="h-3 w-3 text-primary" />
                    <span>Curated Pick</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductCardBlock({ product, index }: { product: EnhancedProduct; index?: number }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.galleryImages?.length
    ? product.galleryImages
    : product.image
      ? [product.image]
      : [];

  const targetUrl = product.amazonUrl || product.url || null;
  const keyDetailsList = product.keyDetails || product.keyFeatures || [];
  const considerText = product.consider || product.considerations;

  return (
    <div id={product.id || `gift-${(index !== undefined ? index + 1 : 1)}`} className="group rounded-3xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:shadow-lift scroll-mt-24">
      {/* Product Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {product.badge && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm">
              {product.badge}
            </span>
          )}
          {product.bestFor && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground-muted">
              <Heart className="h-3 w-3 text-rose-500" />
              <span>Best For: {product.bestFor}</span>
            </span>
          )}
        </div>

        {product.rating !== undefined && (
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)} / 5.0 Rating</span>
          </div>
        )}
      </div>

      {/* Main Grid: Desktop Editorial Layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12 items-start">
        {/* Product Image & Gallery */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {images.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-border bg-background-subtle">
              <img
                src={images[activeImageIndex]}
                alt={product.imageAlt || `${product.name} Amazon gift idea`}
                loading={index === 0 ? "eager" : "lazy"}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-border bg-background-subtle text-xs text-foreground-muted">
              <div className="text-center p-4">
                <ShoppingBag className="mx-auto h-8 w-8 text-primary/40 mb-2" />
                <span>Product image coming soon</span>
              </div>
            </div>
          )}

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border transition-all ${activeImageIndex === i ? "border-primary ring-2 ring-primary/20" : "border-border opacity-70"
                    }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Editorial Content & Details */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-bold text-foreground leading-snug">
                {index !== undefined ? `${index + 1}. ` : ""}
                {product.name}
              </h3>
              <span className="shrink-0 text-xl font-bold text-primary">{product.price}</span>
            </div>

            {/* Why We Love It */}
            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Why We Love It</h4>
              <p className="mt-1 text-sm leading-relaxed text-foreground">{product.whyWeLoveIt || product.why}</p>
            </div>

            {/* Key Details */}
            {keyDetailsList.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted mb-2">Key Details</h4>
                <ul className="grid gap-1.5 text-xs text-foreground-muted sm:grid-cols-1">
                  {keyDetailsList.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Considerations */}
            {considerText && (
              <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <span className="font-semibold">Thing to Consider: </span>
                  <span>{considerText}</span>
                </div>
              </div>
            )}

            {/* Editor's Verdict */}
            {product.verdict && (
              <div className="mt-4 rounded-xl border border-border/80 bg-background-subtle p-3.5 text-xs text-foreground-muted">
                <span className="font-semibold text-foreground">Editor's Verdict: </span>
                <span>"{product.verdict}"</span>
              </div>
            )}
          </div>

          {/* Single Amazon Affiliate CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
            {targetUrl ? (
              <a
                href={targetUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary/90 shadow-md"
              >
                <span>View on Amazon</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background-subtle px-6 py-3 text-xs font-semibold text-foreground-muted cursor-default">
                <ShoppingBag className="h-3.5 w-3.5 text-primary" />
                <span>Curated Amazon Selection</span>
              </span>
            )}
            <span className="text-[0.7rem] text-foreground-muted ml-auto">Amazon Associate Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductComparisonTable({ products }: { products: EnhancedProduct[] }) {
  if (!products.length) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-1 shadow-card">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-border bg-background-subtle text-foreground font-semibold">
          <tr>
            <th className="p-3.5">Product</th>
            <th className="p-3.5">Best For</th>
            <th className="p-3.5">Price</th>
            <th className="p-3.5 text-right">Selection</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((p, i) => {
            const targetUrl = p.amazonUrl || p.url || null;

            return (
              <tr key={i} className="hover:bg-surface-hover/50">
                <td className="p-3.5 font-medium text-foreground">{p.name}</td>
                <td className="p-3.5 text-foreground-muted">{p.bestFor || p.badge || "Top Choice"}</td>
                <td className="p-3.5 font-semibold text-primary">{p.price}</td>
                <td className="p-3.5 text-right">
                  {targetUrl ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3.5 py-1.5 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <span>View on Amazon</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-background-subtle px-3 py-1 font-medium text-foreground-muted">
                      Featured Pick
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

