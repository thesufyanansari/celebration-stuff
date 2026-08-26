import { useState } from "react";
import {
  Star,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Sparkles,
  Heart,
  Shield,
  ThumbsUp,
  HelpCircle,
} from "lucide-react";
import type { EnhancedProduct } from "./TopProductPicks";
import { ArticleContentRenderer } from "./ArticleContentRenderer";

interface ProductFeatureProps {
  product: EnhancedProduct;
  index: number;
  narrativeParagraphs?: string[];
}

export function ProductFeature({ product, index, narrativeParagraphs = [] }: ProductFeatureProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = product.galleryImages?.length
    ? product.galleryImages
    : product.image
      ? [product.image]
      : [];

  const targetUrl = product.amazonUrl || product.url || null;
  const keyDetailsList = product.keyDetails || product.keyFeatures || [];
  const considerText = product.consider || product.considerations;
  const sectionId =
    product.id || `product-${index + 1}-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <article
      id={sectionId}
      className="scroll-mt-24 rounded-3xl border border-border/80 bg-surface p-6 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-lift sm:p-8"
    >
      {/* Top Tag & Rating Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {product.badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm whitespace-nowrap">
              <Sparkles className="h-3 w-3" />
              <span>{product.badge}</span>
            </span>
          )}
          {product.bestFor && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background-subtle/60 px-3.5 py-1 text-xs font-semibold text-foreground-muted">
              <Heart className="h-3.5 w-3.5 text-rose-500" />
              <span>Best for: {product.bestFor}</span>
            </span>
          )}
        </div>

        {product.rating !== undefined && (
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>{product.rating.toFixed(1)} / 5.0 Rating</span>
          </div>
        )}
      </div>

      {/* Main 2-Column Product Showcase */}
      <div className="mt-6 grid gap-8 lg:grid-cols-12 items-center">
        {/* Left Column: Product Image & Gallery with Fixed Canvas */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-background-subtle/80 via-surface to-background-subtle/50 p-4 sm:p-6 flex items-center justify-center shadow-inner">
            {images.length > 0 ? (
              <img
                src={images[activeImageIdx]}
                alt={product.imageAlt || `${product.name} gift recommendation`}
                loading={index < 2 ? "eager" : "lazy"}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-foreground-muted">
                <ShoppingBag className="h-8 w-8 text-primary/40" />
              </div>
            )}
            <span className="absolute bottom-3 left-3 rounded-md bg-foreground/80 px-2 py-0.5 text-[0.68rem] font-semibold text-white backdrop-blur-sm shadow-sm">
              Verified Pick
            </span>
          </div>

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIdx(i)}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border p-1 bg-background-subtle flex items-center justify-center transition-all ${
                    activeImageIdx === i
                      ? "border-primary ring-2 ring-primary/30 scale-105 bg-surface"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Price, Specs, Short Summary */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {product.name}
              </h2>
              {product.price && (
                <span className="font-display text-2xl font-bold text-primary">
                  {product.price}
                </span>
              )}
            </div>

            {/* Why it stands out */}
            <p className="mt-3 text-sm font-medium leading-relaxed text-foreground sm:text-base">
              {product.whyWeLoveIt || product.why}
            </p>

            {/* Key Features List */}
            {keyDetailsList.length > 0 && (
              <div className="mt-5 rounded-2xl border border-border/70 bg-background-subtle p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Key Specifications & Features
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-foreground-muted">
                  {keyDetailsList.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick Amazon CTA in the card header */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {targetUrl ? (
              <a
                href={targetUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
              >
                <span>Check Price on Amazon</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-5 py-2.5 text-xs font-semibold text-foreground-muted">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <span>Curated Selection</span>
              </span>
            )}
            <span className="text-[0.75rem] text-foreground-muted">
              Prime Eligible & Free Returns
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Narrative / Review Content */}
      {narrativeParagraphs.length > 0 && (
        <div className="mt-8 border-t border-border/60 pt-6">
          <h3 className="mb-3 font-display text-lg font-bold text-foreground">
            Our Editorial Take & Review
          </h3>
          <div className="space-y-3">
            {narrativeParagraphs.map((para, i) => (
              <ArticleContentRenderer key={i} text={para} />
            ))}
          </div>
        </div>
      )}

      {/* Pros & Considerations Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Pros / What We Like */}
        <div className="rounded-2xl border border-emerald-600/20 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <ThumbsUp className="h-4 w-4 text-emerald-600" />
            <span>What We Like</span>
          </div>
          <ul className="mt-2.5 space-y-1.5 text-xs text-foreground">
            {product.pros && product.pros.length > 0 ? (
              product.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span>{pro}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span>High utility that integrates smoothly into dad's routine</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span>Durable construction with high user satisfaction ratings</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Things to Consider / Cons */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span>Things to Consider</span>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-foreground">
            {considerText ||
              "Popular holiday pick; check shipping estimates to ensure arrival before Christmas."}
          </p>
        </div>
      </div>

      {/* Editor's Verdict Quote Box */}
      {product.verdict && (
        <div className="mt-5 rounded-2xl border border-primary/20 bg-primary-soft/30 p-4 text-xs text-foreground">
          <strong className="font-semibold text-primary">Editor's Verdict: </strong>
          <span>"{product.verdict}"</span>
        </div>
      )}

      {/* Full Width Bottom CTA Bar */}
      {targetUrl && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-hover/70 p-4 border border-border/60">
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <Shield className="h-4 w-4 text-primary" />
            <span>Prices and availability verified on Amazon</span>
          </div>
          <a
            href={targetUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-xs text-primary hover:underline"
          >
            <span>View {product.name} on Amazon</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </article>
  );
}
