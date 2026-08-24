import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Article } from "@/data/articles";
import { formatDate } from "@/data/articles";
import { getCategory } from "@/data/site";

interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
}

export function RelatedArticles({
  articles,
  title = "More Ideas You'll Love",
}: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border/80 pt-12">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <Sparkles className="h-4 w-4" />
        <span>Continue Exploring</span>
      </div>
      <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((art) => {
          const cat = getCategory(art.category);

          return (
            <article
              key={art.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-16/9 w-full overflow-hidden bg-background-subtle">
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {cat && (
                    <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-0.5 text-[0.7rem] font-bold text-foreground backdrop-blur-sm shadow-sm">
                      {cat.name}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[0.75rem] text-foreground-muted mb-2">
                    <span>{art.event || "Gift Guide"}</span>
                    <span>•</span>
                    <span>{formatDate(art.published)}</span>
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

              {/* Card Footer Link */}
              <div className="border-t border-border/50 px-5 py-3.5">
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
