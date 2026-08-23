import { useEffect, useRef } from "react";
import { adConfig } from "./AdConfig";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export type AdSlotProps = {
  slotId?: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
  label?: string;
  minWordCount?: number;
  wordCount?: number;
};

export function AdSlot({
  slotId = adConfig.slots.articleMidContent,
  format = "auto",
  className = "",
  label = "Advertisement",
  minWordCount = adConfig.minWordCountForAds,
  wordCount = 800,
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  // Minimum content guard
  if (!adConfig.enabled || wordCount < minWordCount) {
    return null;
  }

  useEffect(() => {
    if (!adConfig.isDevelopment && !pushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={`my-8 rounded-2xl border border-border/50 bg-background-subtle/50 p-4 text-center ${className}`}
    >
      <span className="mb-2 block text-[0.65rem] font-medium uppercase tracking-wider text-foreground-muted/70">
        {label}
      </span>

      {adConfig.isDevelopment ? (
        <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-border bg-surface text-xs font-semibold text-foreground-muted">
          <span>AdSense Placeholder ({slotId})</span>
        </div>
      ) : (
        <ins
          className="adsbygoogle block"
          data-ad-client={adConfig.publisherId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}

export function ArticleAd({
  placement,
  wordCount = 1000,
}: {
  placement:
    | "after-intro"
    | "after-product-2"
    | "mid-article"
    | "after-product-6"
    | "before-faq"
    | "after-conclusion";
  wordCount?: number;
}) {
  const slotMap = {
    "after-intro": adConfig.slots.articleAfterIntro,
    "after-product-2": adConfig.slots.articleMidContent,
    "mid-article": adConfig.slots.articleMidContent,
    "after-product-6": adConfig.slots.articleAfterProducts,
    "before-faq": adConfig.slots.articleBeforeFaq,
    "after-conclusion": adConfig.slots.articleAfterConclusion,
  };

  return <AdSlot slotId={slotMap[placement]} wordCount={wordCount} />;
}

export function SidebarAd() {
  return (
    <div className="my-6">
      <AdSlot slotId={adConfig.slots.sidebarBanner} format="rectangle" label="Advertisement" />
    </div>
  );
}
