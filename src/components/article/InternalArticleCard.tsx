import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Article } from "@/data/articles";
import { getArticle } from "@/data/articles";

interface InternalArticleCardProps {
  slug?: string;
  article?: Article;
  calloutText?: string;
}

export function InternalArticleCard({
  slug,
  article: passedArticle,
  calloutText = "You May Also Like",
}: InternalArticleCardProps) {
  const article = passedArticle || (slug ? getArticle(slug) : null);
  if (!article) return null;

  return (
    <aside className="my-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-surface via-primary-soft/20 to-surface p-5 shadow-sm sm:p-6">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <BookOpen className="h-3.5 w-3.5" />
        <span>{calloutText}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="h-16 w-20 shrink-0 rounded-xl object-cover border border-border/50 shadow-sm sm:h-20 sm:w-24"
            />
          )}
          <div>
            <Link
              to="/article/$slug"
              params={{ slug: article.slug }}
              className="font-display text-base font-bold leading-snug text-foreground hover:text-primary sm:text-lg"
            >
              {article.title}
            </Link>
            <p className="mt-1 line-clamp-2 text-xs text-foreground-muted leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </div>

        <Link
          to="/article/$slug"
          params={{ slug: article.slug }}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <span>Read Guide</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
