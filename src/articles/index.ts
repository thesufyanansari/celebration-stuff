import type { Article } from "@/data/articles";
import article1 from "./gifts/gift-ideas-for-people-who-want-nothing";
import article2 from "./thanksgiving/cozy-thanksgiving-tablescape-ideas";
import article3 from "./christmas/christmas-mantel-decorating-ideas";
import article4 from "./christmas/10-best-christmas-gifts-for-mom";
import article5 from "./christmas/best-christmas-gifts-for-mom-2026";
import article6 from "./christmas/12-christmas-gifts-for-mom-she-will-actually-love";
import article7 from "./christmas/20-christmas-gift-ideas-for-dad-useful-picks";
import article8 from "./christmas/17-practical-christmas-gifts-for-dad-who-has-everything";
import article9 from "./christmas/18-useful-christmas-gifts-for-dad-who-doesnt-need-more-stuff";
import article10 from "./christmas/20-christmas-gifts-for-dad-under-50";
import article11 from "./christmas/23-unique-christmas-gifts-for-dad-practical";

/**
 * Article Registry: Lightweight aggregator of all individual article TSX files.
 * Adding a new article only requires creating a file in `src/articles/` and registering it here.
 */
export const registryArticles: Article[] = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10,
  article11,
];

export default registryArticles;
