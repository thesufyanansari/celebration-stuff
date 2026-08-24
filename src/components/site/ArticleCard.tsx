import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { formatViews, type Article } from "@/data/articles";
import { getAuthor, getCategory } from "@/data/site";
import { getArticleViews } from "@/utils/views";

export function ArticleCard({
  article,
  priority = false,
  layout = "card",
}: {
  article: Article;
  priority?: boolean;
  layout?: "card" | "horizontal";
}) {
  const author = getAuthor(article.author);
  const category = getCategory(article.category);
  const [views, setViews] = useState<number>(article.views);

  useEffect(() => {
    setViews(getArticleViews(article.slug, article.views));
  }, [article.slug, article.views]);

  if (layout === "horizontal") {
    return (
      <article className="group">
        <Link
          to="/article/$slug"
          params={{ slug: article.slug }}
          className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 ease-[var(--ease-editorial)] hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:flex-row"
        >
          <div className="overflow-hidden sm:w-2/5 shrink-0">
            <img
              src={article.image}
              alt={article.title}
              width={article.imageWidth}
              height={article.imageHeight}
              loading={priority ? "eager" : "lazy"}
              className="aspect-16/9 h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
            <div>
              <div className="flex items-center gap-2 text-overline">
                <span>{category?.name}</span>
                <span className="text-border">/</span>
                <span className="text-foreground-muted normal-case tracking-normal">{article.event}</span>
              </div>
              <h3 className="mt-2 font-display text-lg sm:text-xl leading-snug font-semibold transition-colors group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{article.excerpt}</p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-caption">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-[0.6rem] font-semibold text-accent">
                {author?.initials}
              </span>
              <span>{author?.name}</span>
              <span className="ml-auto inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {formatViews(views)}
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col">
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 ease-[var(--ease-editorial)] hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <div className="overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            width={article.imageWidth}
            height={article.imageHeight}
            loading={priority ? "eager" : "lazy"}
            className="aspect-16/9 w-full object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-center gap-2 text-overline">
              <span>{category?.name}</span>
              <span className="text-border">/</span>
              <span className="text-foreground-muted normal-case tracking-normal">{article.event}</span>
            </div>
            <h3 className="mt-2 font-display text-base leading-snug font-semibold transition-colors group-hover:text-primary">
              {article.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{article.excerpt}</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-caption">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-[0.6rem] font-semibold text-accent">
              {author?.initials}
            </span>
            <span>{author?.name}</span>
            <span className="ml-auto inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {formatViews(views)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function BlogGrid({ articles, columns = 3 }: { articles: Article[]; columns?: 2 | 3 }) {
  const colClass = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-6 ${colClass}`}>
      {articles.map((a, i) => (
        <ArticleCard key={a.slug} article={a} priority={i < 2} />
      ))}
    </div>
  );
}

// Backward compatibility export alias
export const MasonryGrid = BlogGrid;

