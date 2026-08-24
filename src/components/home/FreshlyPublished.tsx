import { Link } from "@tanstack/react-router";
import { Sparkles, Clock, ArrowRight } from "lucide-react";
import type { Article } from "@/data/articles";
import { getLatestArticles, formatDate } from "@/data/articles";
import { getCategory } from "@/data/site";

interface FreshlyPublishedProps {
  limit?: number;
}

export function FreshlyPublished({ limit = 6 }: FreshlyPublishedProps) {
  const latestArticles = getLatestArticles(limit);

  if (latestArticles.length === 0) return null;

  return (
    <section className="my-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-4 w-4" />
            <span>New Content Feed</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Freshly Published & Latest Ideas
          </h2>
        </div>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
        >
          <span>Browse All Articles</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Grid of Latest Articles */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestArticles.map((art) => {
          const category = getCategory(art.category);

          return (
            <article
              key={art.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
            >
              <div>
                {/* Featured Thumbnail */}
                <div className="relative aspect-16/9 w-full overflow-hidden bg-background-subtle">
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {category && (
                    <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-0.5 text-[0.7rem] font-bold text-foreground backdrop-blur-sm shadow-sm">
                      {category.name}
                    </span>
                  )}
                  {art.event && (
                    <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[0.68rem] font-bold text-primary-foreground backdrop-blur-sm shadow-sm">
                      {art.event}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[0.75rem] text-foreground-muted mb-2">
                    <span className="font-semibold text-primary">{formatDate(art.published)}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{art.readingMinutes} min read</span>
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    <Link to="/article/$slug" params={{ slug: art.slug }}>
                      {art.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-foreground-muted leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="border-t border-border/50 px-5 py-3.5 bg-background-subtle/30">
                <Link
                  to="/article/$slug"
                  params={{ slug: art.slug }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-transform group-hover:translate-x-1"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
