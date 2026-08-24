export type AdDensity = "light" | "standard" | "high";

export type AdConfig = {
  publisherId: string;
  enabled: boolean;
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

export const adConfig: AdConfig = {
  publisherId: import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-0000000000000000",
  enabled: true,
  isDevelopment: import.meta.env.DEV ?? false,
  autoAdsEnabled: true,
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
