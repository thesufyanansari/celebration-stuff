import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Flame, Eye, ChevronDown } from "lucide-react";
import { getPopularArticles, formatViews } from "@/data/articles";

interface PopularArticlesProps {
  currentSlug?: string;
  limit?: number;
}

export function PopularArticles({ currentSlug, limit = 10 }: PopularArticlesProps) {
  const [expanded, setExpanded] = useState(false);
  const popular = getPopularArticles(currentSlug, limit);

  if (popular.length === 0) return null;

  const initialVisibleCount = 4;
  const visibleArticles = expanded ? popular : popular.slice(0, initialVisibleCount);
  const hasMore = popular.length > initialVisibleCount;

  return (
    <div className="rounded-3xl border border-border/80 bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3 font-display text-sm font-bold text-foreground">
        <Flame className="h-4 w-4 text-amber-500" />
        <span>Most Popular Right Now</span>
      </div>

      <ul className="mt-3.5 flex flex-col gap-3">
        {visibleArticles.map((item, idx) => (
          <li key={item.slug}>
            <Link
              to="/article/$slug"
              params={{ slug: item.slug }}
              className="group flex items-center gap-3 rounded-xl p-1 transition-colors hover:bg-surface-hover/80 text-xs"
            >
              {/* Number Rank Badge */}
              <span className="font-display text-sm font-bold text-foreground-muted/50 group-hover:text-primary transition-colors shrink-0 w-4 text-center">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-12 w-16 shrink-0 rounded-lg object-cover border border-border/40 transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="flex flex-col justify-between py-0.5 min-w-0">
                <h4 className="font-semibold text-foreground leading-snug line-clamp-2 transition-colors group-hover:text-primary">
                  {item.title}
                </h4>
                <div className="mt-1 flex items-center gap-2 text-[0.68rem] text-foreground-muted">
                  <span className="font-medium text-primary">{item.event || "Guide"}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{formatViews(item.views)}</span>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-background-subtle/70 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          <span>{expanded ? "Show Less" : `View Top ${popular.length} Trending`}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
}
