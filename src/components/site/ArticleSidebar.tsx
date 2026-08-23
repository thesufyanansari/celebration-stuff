import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Share2, Flame, Gift, Check, Copy } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { articles, Article } from "@/data/articles";
import { categories } from "@/data/site";
import { PinterestIcon } from "./icons";
import { SidebarAd } from "@/components/ads/AdSlot";

export function ArticleSidebar({ currentArticle }: { currentArticle: Article }) {
  const [copied, setCopied] = useState(false);
  const [views, setViews] = useState(currentArticle.views);

  // Track session deduplicated view count
  useEffect(() => {
    const storageKey = `viewed_art_${currentArticle.slug}`;
    if (!sessionStorage.getItem(storageKey)) {
      sessionStorage.setItem(storageKey, "1");
      setViews((prev) => prev + 1);
    }
  }, [currentArticle.slug]);

  const popularArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .filter((a) => a.slug !== currentArticle.slug)
    .slice(0, 4);

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
    <aside className="flex flex-col gap-6 lg:sticky lg:top-20">
      {/* Table of Contents */}
      <TableOfContents />

      {/* Sidebar Ad Placement */}
      <SidebarAd />

      {/* Share Box */}
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
        <div className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
          <Share2 className="h-4 w-4 text-primary" />
          <span>Share This Guide</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#e60023] px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            <PinterestIcon className="h-3.5 w-3.5" />
            <span>Pin</span>
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
        <div className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
          <Flame className="h-4 w-4 text-amber-500" />
          <span>Most Popular Gift Guides</span>
        </div>
        <ul className="mt-4 flex flex-col gap-3.5">
          {popularArticles.map((a) => (
            <li key={a.slug}>
              <Link
                to="/article/$slug"
                params={{ slug: a.slug }}
                className="group flex gap-3 text-xs"
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-12 w-16 shrink-0 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium text-foreground leading-snug line-clamp-2 transition-colors group-hover:text-primary">
                    {a.title}
                  </h4>
                  <span className="mt-1 block text-[0.7rem] text-foreground-muted">
                    {(a.views + (a.slug === currentArticle.slug ? 1 : 0)).toLocaleString()} views
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Gift Category Discovery */}
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
        <div className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
          <Gift className="h-4 w-4 text-primary" />
          <span>Explore Gift Ideas</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="rounded-full border border-border px-3 py-1 text-[0.75rem] font-medium text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
