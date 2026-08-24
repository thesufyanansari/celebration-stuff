import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Gift, TreePine } from "lucide-react";
import { getCurrentOrNextMajorEvent } from "@/data/events";
import { getArticle, articles } from "@/data/articles";

export function CurrentSeasonFeature() {
  const currentEvent = getCurrentOrNextMajorEvent();

  // Find articles matching this event
  const eventArticles = articles.filter(
    (a) =>
      (a.event && a.event.toLowerCase() === currentEvent.name.toLowerCase()) ||
      a.holiday?.some((h) => h.includes(currentEvent.slug.replace("-gifts", ""))) ||
      a.category === currentEvent.categorySlug ||
      currentEvent.relatedArticles?.includes(a.slug)
  ).slice(0, 3);

  if (eventArticles.length === 0) return null;

  return (
    <section className="my-16 rounded-3xl border border-primary/25 bg-gradient-to-br from-primary-soft/30 via-surface to-accent-soft/30 p-6 shadow-card sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <TreePine className="h-4 w-4" />
            <span>Seasonal Spotlight</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {currentEvent.name} Inspiration & Gift Guides
          </h2>
          <p className="mt-1 text-xs text-foreground-muted sm:text-sm">
            {currentEvent.tagline} · {currentEvent.description}
          </p>
        </div>

        <Link
          to="/category/$slug"
          params={{ slug: currentEvent.categorySlug }}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
        >
          <span>All {currentEvent.name} Guides</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Grid of Seasonally Focused Articles */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eventArticles.map((art) => (
          <div
            key={art.slug}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
          >
            <div>
              <div className="relative aspect-16/9 w-full overflow-hidden bg-background-subtle">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-[0.65rem] font-bold text-primary-foreground shadow">
                  {currentEvent.name}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display text-base font-bold text-foreground transition-colors group-hover:text-primary line-clamp-2">
                  <Link to="/article/$slug" params={{ slug: art.slug }}>
                    {art.title}
                  </Link>
                </h3>
                <p className="mt-2 text-xs text-foreground-muted line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="border-t border-border/40 px-5 py-3 bg-background-subtle/40">
              <Link
                to="/article/$slug"
                params={{ slug: art.slug }}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
