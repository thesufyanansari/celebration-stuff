export type AdDensity = "light" | "standard" | "high";

export type AdConfig = {
  publisherId: string;
  enabled: boolean;
  isDevelopment: boolean;
  autoAdsEnabled: boolean;
  defaultDensity: AdDensity;
  minWordCountForAds: number;
  slots: {
    homepageBanner: string;
    articleAfterIntro: string;
    articleMidContent: string;
    articleAfterProducts: string;
    articleBeforeFaq: string;
    articleAfterConclusion: string;
    sidebarBanner: string;
  };
};

export const adConfig: AdConfig = {
  publisherId: import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-0000000000000000",
  enabled: true,
  isDevelopment: import.meta.env.DEV || true,
  autoAdsEnabled: true,
  defaultDensity: "standard",
  minWordCountForAds: 300,
  slots: {
    homepageBanner: "1000000001",
    articleAfterIntro: "1000000002",
    articleMidContent: "1000000003",
    articleAfterProducts: "1000000004",
    articleBeforeFaq: "1000000005",
    articleAfterConclusion: "1000000006",
    sidebarBanner: "1000000007",
  },
};
