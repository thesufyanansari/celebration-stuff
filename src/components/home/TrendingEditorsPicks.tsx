import { Link } from "@tanstack/react-router";
import { Award, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Article } from "@/data/articles";
import { articles } from "@/data/articles";

export function TrendingEditorsPicks() {
  const editorPicks = articles.slice(0, 2);

  if (editorPicks.length === 0) return null;

  return (
    <section className="my-16 rounded-3xl border border-border/80 bg-surface p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
        <Award className="h-4 w-4" />
        <span>Editorial Highlights</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 items-center">
        {editorPicks.map((pick, idx) => (
          <div
            key={pick.slug}
            className="flex flex-col sm:flex-row gap-5 items-start rounded-2xl border border-border/60 bg-background-subtle/50 p-5 transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <img
              src={pick.image}
              alt={pick.title}
              loading="lazy"
              className="h-32 w-full sm:w-36 shrink-0 rounded-xl object-cover shadow-sm"
            />
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[0.68rem] font-bold text-primary uppercase tracking-wider">
                  {idx === 0 ? "Staff Must-Read" : "Pinterest Favorite"}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-foreground leading-snug hover:text-primary transition-colors">
                  <Link to="/article/$slug" params={{ slug: pick.slug }}>
                    {pick.title}
                  </Link>
                </h3>
                <p className="mt-1.5 text-xs text-foreground-muted line-clamp-2 leading-relaxed">
                  {pick.excerpt}
                </p>
              </div>

              <div className="mt-3">
                <Link
                  to="/article/$slug"
                  params={{ slug: pick.slug }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>Explore Guide</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
