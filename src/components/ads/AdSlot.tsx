import { useEffect, useRef } from "react";
import { adConfig } from "./AdConfig";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export type AdSlotType =
  | "top"
  | "after-intro"
  | "between-products"
  | "mid-article"
  | "before-related"
  | "sidebar"
  | "sidebar-secondary"
  | "footer";

export interface AdSlotProps {
  type?: AdSlotType;
  slotId?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  className?: string;
  label?: string;
  minWordCount?: number;
  wordCount?: number;
}

const slotTypeMapping: Record<
  AdSlotType,
  { slot: string; minHeight: string; label: string; format: "auto" | "rectangle" | "horizontal" }
> = {
  top: {
    slot: adConfig.slots.top,
    minHeight: "min-h-[100px] sm:min-h-[120px]",
    label: "Advertisement",
    format: "horizontal",
  },
  "after-intro": {
    slot: adConfig.slots.afterIntro,
    minHeight: "min-h-[120px] sm:min-h-[140px]",
    label: "Sponsored Content",
    format: "auto",
  },
  "between-products": {
    slot: adConfig.slots.betweenProducts,
    minHeight: "min-h-[140px] sm:min-h-[180px]",
    label: "Advertisement",
    format: "auto",
  },
  "mid-article": {
    slot: adConfig.slots.midContent,
    minHeight: "min-h-[180px] sm:min-h-[250px]",
    label: "Advertisement",
    format: "auto",
  },
  "before-related": {
    slot: adConfig.slots.beforeRelated,
    minHeight: "min-h-[120px] sm:min-h-[150px]",
    label: "Advertisement",
    format: "auto",
  },
  sidebar: {
    slot: adConfig.slots.sidebarPrimary,
    minHeight: "min-h-[250px]",
    label: "Advertisement",
    format: "rectangle",
  },
  "sidebar-secondary": {
    slot: adConfig.slots.sidebarSecondary,
    minHeight: "min-h-[250px]",
    label: "Sponsored",
    format: "rectangle",
  },
  footer: {
    slot: adConfig.slots.footer,
    minHeight: "min-h-[100px]",
    label: "Advertisement",
    format: "horizontal",
  },
};

export function AdSlot({
  type = "mid-article",
  slotId,
  format,
  className = "",
  label,
  minWordCount = adConfig.minWordCountForAds,
  wordCount = 800,
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  const slotMeta = slotTypeMapping[type] || slotTypeMapping["mid-article"];
  const finalSlotId = slotId || slotMeta.slot;
  const finalLabel = label || slotMeta.label;
  const finalFormat = format || slotMeta.format;

  const isEligible = adConfig.enabled && wordCount >= minWordCount;

  useEffect(() => {
    if (isEligible && adConfig.isRealAdSenseActive && !pushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (err) {
        console.error("AdSense initialization error:", err);
      }
    }
  }, [isEligible]);

  // Minimum content guard
  if (!isEligible) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={`my-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background-subtle/40 p-4 text-center ${slotMeta.minHeight} ${className}`}
      style={{ contain: "layout" }}
      aria-label={finalLabel}
    >
      <span className="mb-2 block text-[0.65rem] font-bold uppercase tracking-wider text-foreground-muted/60">
        {finalLabel}
      </span>

      {adConfig.isRealAdSenseActive ? (
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={adConfig.publisherId}
          data-ad-slot={finalSlotId}
          data-ad-format={finalFormat}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex h-full w-full min-h-[70px] items-center justify-center rounded-xl bg-surface/60 px-4 text-xs font-medium text-foreground-muted/60">
          <span>Ad Placeholder [{type}]</span>
        </div>
      )}
    </div>
  );
}

// Convenience wrapper functions
export function ArticleAd({
  placement,
  wordCount = 1000,
}: {
  placement: AdSlotType;
  wordCount?: number;
}) {
  return <AdSlot type={placement} wordCount={wordCount} />;
}

export function SidebarAd({ isSecondary = false }: { isSecondary?: boolean }) {
  return <AdSlot type={isSecondary ? "sidebar-secondary" : "sidebar"} className="my-5" />;
}
