import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Eye, Share2, Check, Copy, Sparkles, ShieldCheck } from "lucide-react";
import type { Article } from "@/data/articles";
import { formatDate, formatViews } from "@/data/articles";
import { getAuthor, getCategory } from "@/data/site";
import { PinterestIcon } from "@/components/site/icons";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const author = getAuthor(article.author);
  const category = getCategory(article.category);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(article.title);

  return (
    <header className="mb-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-caption mb-4 flex flex-wrap items-center gap-1.5 text-xs text-foreground-muted">
        <Link to="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <span className="text-border">/</span>
        <Link to="/explore" className="transition-colors hover:text-primary">
          Gift Guides
        </Link>
        {category && (
          <>
            <span className="text-border">/</span>
            <Link
              to="/category/$slug"
              params={{ slug: category.slug }}
              className="transition-colors hover:text-primary"
            >
              {category.name}
            </Link>
          </>
        )}
        <span className="text-border">/</span>
        <span className="max-w-[200px] truncate font-medium text-foreground sm:max-w-xs md:max-w-md">
          {article.title}
        </span>
      </nav>

      {/* Category & Badge */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {category && (
          <Link
            to="/category/$slug"
            params={{ slug: category.slug }}
            className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {category.name}
          </Link>
        )}
        {article.event && (
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-foreground-muted">
            {article.event}
          </span>
        )}
      </div>

      {/* Article H1 Title */}
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.15]">
        {article.title}
      </h1>

      {/* Subtitle / Deck */}
      {article.excerpt && (
        <p className="mt-4 text-base font-normal leading-relaxed text-foreground-muted sm:text-lg lg:text-xl">
          {article.excerpt}
        </p>
      )}

      {/* Metadata Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border/70 py-3.5 text-xs text-foreground-muted">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {author && (
            <Link
              to="/author/$slug"
              params={{ slug: author.slug }}
              className="group flex items-center gap-2 font-medium text-foreground hover:text-primary"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-1 ring-primary/20">
                {author.initials}
              </div>
              <span>
                By <strong className="font-semibold transition-colors group-hover:text-primary">{author.name}</strong>
              </span>
            </Link>
          )}
          <span className="hidden sm:inline text-border">•</span>
          <span>Updated {formatDate(article.updated || article.published)}</span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary/70" />
            <span>{article.readingMinutes} min read</span>
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="inline-flex items-center gap-1 font-medium text-foreground">
            <Eye className="h-3.5 w-3.5 text-primary/70" />
            <span>{formatViews(article.views)} views</span>
          </span>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#e60023] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#c9001f] hover:shadow"
            title="Save to Pinterest"
          >
            <PinterestIcon className="h-3.5 w-3.5" />
            <span>Pin</span>
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-hover"
            title="Copy link"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Affiliate Disclosure Notice */}
      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-border/60 bg-surface/70 px-4 py-2.5 text-xs text-foreground-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        <p className="leading-normal">
          <strong className="font-semibold text-foreground">Affiliate Disclosure: </strong>
          Celebration Stuff is reader-supported. When you buy through our links, we may earn an affiliate commission at no extra cost to you.{" "}
          <Link to="/affiliate-disclosure" className="underline decoration-border hover:text-primary">
            Learn more
          </Link>
        </p>
      </div>

      {/* Large Featured Image with Pinterest Overlay */}
      <div className="group relative mt-6 overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-card">
        <img
          src={article.image}
          alt={article.featuredImageAlt || article.title}
          width={article.imageWidth || 1200}
          height={article.imageHeight || 800}
          fetchPriority="high"
          className="aspect-16/9 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <a
          href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}&media=${encodeURIComponent(article.image)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#e60023] px-3.5 py-2 text-xs font-bold text-white opacity-95 shadow-md backdrop-blur-sm transition-transform hover:scale-105 hover:opacity-100"
        >
          <PinterestIcon className="h-3.5 w-3.5" />
          <span>Save Pin</span>
        </a>
      </div>

      {/* Answer-First Executive Summary Box */}
      {article.answer && (
        <div className="mt-6 rounded-2xl border border-primary/25 bg-primary-soft/40 p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Editor's Quick Answer & Recommendation</span>
          </div>
          <p className="mt-2 text-sm font-medium leading-relaxed text-foreground sm:text-base">
            {article.answer}
          </p>
        </div>
      )}
    </header>
  );
}
