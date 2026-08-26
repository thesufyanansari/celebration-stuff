import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ChevronDown, Clock } from "lucide-react";
import type { Article } from "@/data/articles";
import { getTopicArticles } from "@/data/articles";

interface TopicArticlesProps {
  currentArticle: Article;
  limit?: number;
}

export function TopicArticles({ currentArticle, limit = 10 }: TopicArticlesProps) {
  const [expanded, setExpanded] = useState(false);
  const topicArticles = getTopicArticles(currentArticle, limit);

  if (topicArticles.length === 0) return null;

  // Determine section title based on article metadata
  const sectionTitle = currentArticle.event
    ? `More ${currentArticle.event} Ideas`
    : currentArticle.recipient?.[0]
      ? `More Gift Ideas for ${currentArticle.recipient[0].replace("gifts-for-", "").replace("-", " ")}`
      : "More In This Series";

  const initialVisibleCount = 4;
  const visibleArticles = expanded ? topicArticles : topicArticles.slice(0, initialVisibleCount);
  const hasMore = topicArticles.length > initialVisibleCount;

  return (
    <div className="rounded-3xl border border-primary/20 bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3 font-display text-sm font-bold text-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="capitalize">{sectionTitle}</span>
      </div>

      <ul className="mt-3.5 flex flex-col gap-3">
        {visibleArticles.map((item) => (
          <li key={item.slug}>
            <Link
              to="/article/$slug"
              params={{ slug: item.slug }}
              className="group flex items-start gap-3 rounded-xl p-1 transition-colors hover:bg-surface-hover/80 text-xs"
            >
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
                <div className="mt-1 flex items-center gap-1.5 text-[0.68rem] text-foreground-muted">
                  <Clock className="h-3 w-3 text-primary/70" />
                  <span>{item.readingMinutes} min read</span>
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
          <span>{expanded ? "Show Less" : `View All ${topicArticles.length} Related Guides`}</span>
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
