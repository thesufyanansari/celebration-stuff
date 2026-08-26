import { articles } from "@/data/articles";
import { categories } from "@/data/site";

const BASE_URL = "https://celebrationsstuff.com";

export function generateSitemapXml(): string {
  const staticRoutes = [
    "",
    "/explore",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
    "/editorial-policy",
  ];

  const categoryRoutes = categories.map((c) => `/category/${c.slug}`);
  const articleRoutes = articles.map((a) => `/article/${a.slug}`);

  const allUrls = [...staticRoutes, ...categoryRoutes, ...articleRoutes];

  const urlEntries = allUrls
    .map(
      (path) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === "" ? "1.0" : path.startsWith("/article/") ? "0.8" : "0.6"}</priority>
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}
