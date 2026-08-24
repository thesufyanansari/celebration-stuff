import { Link } from "@tanstack/react-router";
import { Flame, Eye, ArrowRight } from "lucide-react";
import { getPopularArticles, formatViews } from "@/data/articles";
import { getCategory } from "@/data/site";

export function HomePopularArticles({ limit = 6 }: { limit?: number }) {
  const popular = getPopularArticles(undefined, limit);

  if (popular.length === 0) return null;

  return (
    <section className="my-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
            <Flame className="h-4 w-4 text-amber-500" />
            <span>High Engagement & Reader Favorites</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Most Popular Gift Guides
          </h2>
        </div>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
        >
          <span>Explore All Rankings</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {popular.map((art, idx) => {
          const category = getCategory(art.category);

          return (
            <article
              key={art.slug}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
            >
              <div>
                <div className="relative aspect-16/9 w-full overflow-hidden bg-background-subtle">
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Big Number Badge */}
                  <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-black/80 font-display text-xs font-bold text-white backdrop-blur-sm shadow">
                    #{idx + 1}
                  </span>
                  {category && (
                    <span className="absolute right-3 top-3 rounded-full bg-surface/90 px-2.5 py-0.5 text-[0.68rem] font-semibold text-foreground backdrop-blur-sm shadow-sm">
                      {category.name}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[0.72rem] text-foreground-muted mb-2">
                    <span className="font-semibold text-primary">{art.event || "Gift Guide"}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      <Eye className="h-3.5 w-3.5 text-primary/70" />
                      <span>{formatViews(art.views)} views</span>
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

              <div className="border-t border-border/50 px-5 py-3.5 bg-background-subtle/30">
                <Link
                  to="/article/$slug"
                  params={{ slug: art.slug }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-transform group-hover:translate-x-1"
                >
                  <span>Read Guide</span>
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
