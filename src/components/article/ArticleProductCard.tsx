import { useState } from "react";
import { Sparkles, ExternalLink, Star, Heart, CheckCircle2, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/articles";
import { ArticleContentRenderer } from "./ArticleContentRenderer";

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

export interface ArticleProductCardProps {
  product: EnhancedProduct;
  index: number;
  narrativeParagraphs?: string[] | undefined;
  showPickNumber?: boolean;
}

export function ArticleProductCard({
  product,
  index,
  narrativeParagraphs,
  showPickNumber = true,
}: ArticleProductCardProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = product.galleryImages?.length
    ? product.galleryImages
    : product.image
      ? [product.image]
      : [];

  const currentImage = images[activeImageIdx] || product.image;
  const targetUrl = product.amazonUrl || product.url || null;
  const badge =
    product.badge ||
    (index === 0
      ? "Best Overall Pick"
      : index === 1
        ? "Best Budget Value"
        : index === 2
          ? "Best Premium Gift"
          : "Top Recommendation");

  const sectionId =
    product.id || `product-${index + 1}-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const keyDetailsList = product.keyDetails || product.keyFeatures || [];

  return (
    <article
      id={sectionId}
      className="group relative flex flex-col lg:flex-row gap-6 lg:gap-8 rounded-2xl sm:rounded-3xl border border-border/80 bg-surface p-5 sm:p-6 lg:p-7 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lift scroll-mt-24"
    >
      {/* Left Column: Fixed Image Canvas with object-contain */}
      <div className="w-full lg:w-64 xl:w-72 shrink-0 flex flex-col gap-2.5">
        <div className="relative h-56 sm:h-64 lg:h-60 xl:h-64 w-full min-h-[220px] overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-background-subtle/90 via-surface to-background-subtle/50 p-4 sm:p-5 flex items-center justify-center shadow-inner">
          {currentImage ? (
            <img
              src={currentImage}
              alt={product.imageAlt || product.name}
              loading={index < 2 ? "eager" : "lazy"}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-sm"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-xs text-foreground-muted gap-1">
              <ShoppingBag className="h-8 w-8 text-primary/40" />
              <span>Curated Product</span>
            </div>
          )}

          {showPickNumber && (
            <span className="absolute bottom-2.5 left-2.5 rounded-md bg-foreground/80 px-2.5 py-0.5 text-[0.68rem] font-semibold text-white backdrop-blur-sm shadow-sm">
              Verified Pick #{index + 1}
            </span>
          )}
        </div>

        {/* Optional Gallery Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto pb-0.5">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImageIdx(i)}
                className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border p-1 bg-background-subtle flex items-center justify-center transition-all ${
                  activeImageIdx === i
                    ? "border-primary ring-2 ring-primary/30 scale-105 bg-surface"
                    : "border-border opacity-70 hover:opacity-100"
                }`}
                aria-label={`View photo ${i + 1} of ${product.name}`}
              >
                <img src={img} alt="" className="max-h-full max-w-full object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Product Information & Action */}
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

          {/* Key Specifications (if present and not already displayed in why) */}
          {keyDetailsList.length > 0 && (
            <div className="mt-3.5 rounded-xl border border-border/50 bg-surface p-3 text-xs text-foreground-muted">
              <span className="font-semibold uppercase tracking-wider text-[0.7rem] text-foreground">
                Key Features:
              </span>
              <ul className="mt-1.5 grid gap-1 sm:grid-cols-1">
                {keyDetailsList.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-primary font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Narrative Editorial Take (if provided) */}
          {narrativeParagraphs && narrativeParagraphs.length > 0 && (
            <div className="mt-3.5 space-y-2 border-t border-border/40 pt-3 text-xs sm:text-sm text-foreground-muted leading-relaxed">
              {narrativeParagraphs.map((para, i) => (
                <ArticleContentRenderer key={i} text={para} />
              ))}
            </div>
          )}
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
    </article>
  );
}
