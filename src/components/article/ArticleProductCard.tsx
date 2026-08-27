import { ExternalLink, Sparkles, Star } from "lucide-react";
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

export interface ArticleProductCardProps {
  product: EnhancedProduct;
  index: number;
  narrativeParagraphs?: string[] | undefined;
  showPickNumber?: boolean;
}

export function ArticleProductCard({
  product,
  index,
  showPickNumber = true,
}: ArticleProductCardProps) {
  const currentImage = product.image;
  const targetUrl = product.amazonUrl || product.url || null;
  const badge =
    product.badge ||
    (index === 0
      ? "Best Overall Pick"
      : index === 1
        ? "Best Budget Value"
        : index === 2
          ? "Best Premium Pick"
          : "Top Recommendation");

  const sectionId =
    product.id || `product-${index + 1}-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const descriptionText =
    product.whyWeLoveIt ||
    product.why ||
    "A standout holiday recommendation chosen for its reliable daily utility, thoughtful design, and exceptional value.";

  return (
    <article
      id={sectionId}
      className="group relative flex flex-col sm:flex-row items-stretch gap-5 sm:gap-6 rounded-2xl sm:rounded-3xl border border-border/80 bg-surface p-4 sm:p-5 lg:p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-card scroll-mt-24"
    >
      {/* Left: Fixed Image Canvas (180-240px with object-contain) */}
      <div className="w-full sm:w-48 md:w-52 lg:w-56 shrink-0 flex flex-col justify-center">
        <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-gradient-to-b from-background-subtle/80 via-surface to-background-subtle/40 p-3 sm:p-4 flex items-center justify-center shadow-inner">
          {currentImage ? (
            <img
              src={currentImage}
              alt={product.imageAlt || product.name}
              loading={index < 2 ? "eager" : "lazy"}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-sm"
            />
          ) : (
            <div className="text-xs text-foreground-muted">Product Visual</div>
          )}

          {showPickNumber && (
            <span className="absolute bottom-2 left-2 rounded-md bg-foreground/85 px-2 py-0.5 text-[0.65rem] font-bold text-white backdrop-blur-sm shadow-sm">
              #{index + 1}
            </span>
          )}
        </div>
      </div>

      {/* Right: Product Information */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          {/* Top Meta Bar: Badge + Rating */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-2.5 w-2.5" />
              <span>{badge}</span>
            </span>

            {product.rating !== undefined && (
              <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[0.7rem] font-bold text-amber-700">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                <span>{product.rating.toFixed(1)} / 5.0</span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {/* 3-4 Line Short Description */}
          <p className="mt-2 text-xs sm:text-sm text-foreground-muted leading-relaxed line-clamp-3 sm:line-clamp-4">
            {descriptionText}
          </p>
        </div>

        {/* Bottom Bar: Price & Amazon CTA */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-3">
          {product.price ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-[0.7rem] font-medium uppercase tracking-wider text-foreground-muted">
                Price:
              </span>
              <span className="font-display text-lg sm:text-xl font-bold text-primary">
                {product.price}
              </span>
            </div>
          ) : (
            <span className="text-xs font-medium text-foreground-muted">Verified Price</span>
          )}

          {targetUrl ? (
            <a
              href={targetUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 px-4 sm:px-5 text-xs font-bold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Check Price on Amazon</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a>
          ) : (
            <span className="inline-block rounded-xl bg-background-subtle py-2 px-4 text-xs font-medium text-foreground-muted">
              Curated Gift
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ArticleProductCard;
