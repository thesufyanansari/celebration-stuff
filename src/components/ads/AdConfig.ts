export type AdDensity = "light" | "standard" | "high";

export type AdConfig = {
  publisherId: string;
  enabled: boolean;
  isRealAdSenseActive: boolean;
  isDevelopment: boolean;
  autoAdsEnabled: boolean;
  defaultDensity: AdDensity;
  minWordCountForAds: number;
  slots: {
    top: string;
    afterIntro: string;
    betweenProducts: string;
    midContent: string;
    beforeRelated: string;
    sidebarPrimary: string;
    sidebarSecondary: string;
    footer: string;
  };
};

const rawPublisherId = (
  import.meta.env.VITE_ADSENSE_CLIENT ||
  import.meta.env.VITE_ADSENSE_PUBLISHER_ID ||
  ""
).trim();

const isPlaceholder =
  !rawPublisherId ||
  rawPublisherId === "ca-pub-0000000000000000" ||
  !rawPublisherId.startsWith("ca-pub-") ||
  rawPublisherId.length < 15;

const isAdsExplicitlyEnabled =
  import.meta.env.VITE_ADS_ENABLED === "true" || import.meta.env.VITE_ENABLE_ADS === "true";

export const isRealAdSenseActive = isAdsExplicitlyEnabled && !isPlaceholder;

export const adConfig: AdConfig = {
  publisherId: rawPublisherId || "ca-pub-0000000000000000",
  enabled: true, // Keep placeholder placement active for deterministic layout reservation
  isRealAdSenseActive,
  isDevelopment: Boolean(import.meta.env.DEV),
  autoAdsEnabled: isRealAdSenseActive,
  defaultDensity: "standard",
  minWordCountForAds: 250,
  slots: {
    top: "1000000001",
    afterIntro: "1000000002",
    betweenProducts: "1000000003",
    midContent: "1000000004",
    beforeRelated: "1000000005",
    sidebarPrimary: "1000000006",
    sidebarSecondary: "1000000007",
    footer: "1000000008",
  },
};
