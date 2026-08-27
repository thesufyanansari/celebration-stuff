import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Share2, Tag, Check, Copy } from "lucide-react";
import type { Article } from "@/data/articles";
import { categories } from "@/data/site";
import { PinterestIcon } from "@/components/site/icons";
import { SidebarAd } from "@/components/ads/AdSlot";
import { ArticleTableOfContents } from "./ArticleTableOfContents";
import { SidebarRelatedProducts } from "./SidebarRelatedProducts";
import { TopicArticles } from "./TopicArticles";
import { PopularArticles } from "./PopularArticles";
import { NewsletterCard } from "./NewsletterCard";

interface ArticleSidebarProps {
  currentArticle: Article;
}

export function ArticleSidebar({ currentArticle }: ArticleSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(currentArticle.title);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Dynamic Table of Contents */}
      <ArticleTableOfContents />

      {/* 2. Contextual Related Products (Compact Cards) */}
      <SidebarRelatedProducts currentArticle={currentArticle} limit={3} />

      {/* 3. Contextual Topic-Specific Articles */}
      <TopicArticles currentArticle={currentArticle} limit={8} />

      {/* 4. Most Popular & Trending Gift Guides */}
      <PopularArticles currentSlug={currentArticle.slug} limit={8} />

      {/* 5. Newsletter Signup Card */}
      <NewsletterCard />

      {/* 6. Quick Share / Save Card */}
      <div className="rounded-3xl border border-border/80 bg-surface p-5 shadow-card">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3 font-display text-sm font-bold text-foreground">
          <Share2 className="h-4 w-4 text-primary" />
          <span>Save & Share Guide</span>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <a
            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#e60023] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#c9001f]"
          >
            <PinterestIcon className="h-3.5 w-3.5" />
            <span>Pin to Board</span>
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface-hover"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* 7. Explore More Categories */}
      <div className="rounded-3xl border border-border/80 bg-surface p-5 shadow-card">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3 font-display text-sm font-bold text-foreground">
          <Tag className="h-4 w-4 text-primary" />
          <span>Explore More Categories</span>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="rounded-full border border-border bg-surface px-3 py-1 text-[0.72rem] font-semibold text-foreground-muted transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 8. Display Ad */}
      <SidebarAd />
    </div>
  );
}

export default ArticleSidebar;
