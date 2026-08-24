import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";
import type { Article } from "@/data/articles";
import { getCategory } from "@/data/site";

interface HomeHeroProps {
  featuredArticle: Article;
}

export function HomeHero({ featuredArticle }: HomeHeroProps) {
  const category = getCategory(featuredArticle.category);

  return (
    <section className="grid items-center gap-8 lg:grid-cols-12">
      {/* Left Column: Heading & Value Proposition */}
      <div className="lg:col-span-6 flex flex-col justify-center">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Curated Celebration Inspiration</span>
        </div>

        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
          Find a Gift They'll Truly Love & Use
        </h1>

        <p className="mt-4 text-base font-normal leading-relaxed text-foreground-muted sm:text-lg">
          Thoughtful gift guides, verified Amazon picks, holiday tablescapes, and celebration ideas curated by lifestyle editors for life's most special moments.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/article/$slug"
            params={{ slug: featuredArticle.slug }}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
          >
            <span>Explore Featured Guide</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/explore"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover shadow-sm"
          >
            <BookOpen className="h-4 w-4 text-primary" />
            <span>All Gift Guides</span>
          </Link>
        </div>
      </div>

      {/* Right Column: Visual Hero Banner with Glass Overlay */}
      <div className="lg:col-span-6">
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-card">
          <img
            src={featuredArticle.image}
            alt={featuredArticle.featuredImageAlt || featuredArticle.title}
            width={featuredArticle.imageWidth || 1200}
            height={featuredArticle.imageHeight || 800}
            fetchPriority="high"
            className="aspect-16/9 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-primary px-3 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                Editor's Top Pick
              </span>
              {category && (
                <span className="rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[0.68rem] font-semibold text-white">
                  {category.name}
                </span>
              )}
            </div>

            <Link
              to="/article/$slug"
              params={{ slug: featuredArticle.slug }}
              className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white hover:text-primary-soft transition-colors line-clamp-2 leading-tight"
            >
              {featuredArticle.title}
            </Link>

            <p className="mt-2 text-xs text-white/80 line-clamp-2 hidden sm:block">
              {featuredArticle.excerpt}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
