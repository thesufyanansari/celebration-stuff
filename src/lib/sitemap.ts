import { articles } from "@/data/articles";
import { categories, authors, SITE_URL } from "@/data/site";

export function generateSitemapXml(): string {
  const staticRoutes = [
    { path: "", lastmod: null },
    { path: "/explore", lastmod: null },
    { path: "/about", lastmod: null },
    { path: "/contact", lastmod: null },
    { path: "/privacy", lastmod: "2026-08-01" },
    { path: "/terms", lastmod: "2026-08-01" },
    { path: "/affiliate-disclosure", lastmod: "2026-08-01" },
    { path: "/editorial-policy", lastmod: "2026-08-01" },
  ];

  const categoryRoutes = categories.map((c) => ({
    path: `/category/${c.slug}`,
    lastmod: null,
  }));

  const authorRoutes = authors.map((a) => ({
    path: `/author/${a.slug}`,
    lastmod: null,
  }));

  const articleRoutes = articles.map((a) => ({
    path: `/article/${a.slug}`,
    lastmod: a.updated || a.published || null,
  }));

  const allEntries = [...staticRoutes, ...categoryRoutes, ...authorRoutes, ...articleRoutes];

  const urlEntries = allEntries
    .map(({ path, lastmod }) => {
      const loc = `${SITE_URL}${path === "" ? "/" : path}`;
      const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
      return `  <url>
    <loc>${loc}</loc>${lastmodTag}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}
