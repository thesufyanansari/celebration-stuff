import fs from "fs";

// Read articles/index.ts
const articlesIndex = fs.readFileSync("src/articles/index.ts", "utf8");
const articleImports = articlesIndex.match(/import article\d+ from "\.\/([^"]+)"/g) || [];
const articleSlugs = articleImports
  .map((imp) => {
    const match = imp.match(/import article\d+ from "\.\/(?:[^/]+\/)?([^"]+)"/);
    return match ? match[1] : null;
  })
  .filter(Boolean);

// Read categories from site.ts
const siteTs = fs.readFileSync("src/data/site.ts", "utf8");
const catMatches = [...siteTs.matchAll(/slug:\s*"([^"]+)"/g)];
const catSlugs = catMatches.map((m) => m[1]);

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

const BASE_URL = "https://celebrationstuff.com";
const categoryRoutes = [...new Set(catSlugs)].map((c) => `/category/${c}`);
const articleRoutes = articleSlugs.map((a) => `/article/${a}`);

const allUrls = [...staticRoutes, ...categoryRoutes, ...articleRoutes];
const today = new Date().toISOString().split("T")[0];

const urlEntries = allUrls
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === "" ? "1.0" : p.startsWith("/article/") ? "0.8" : "0.6"}</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log(`Generated public/sitemap.xml with ${allUrls.length} URLs.`);
console.log(
  `Includes new article: ${xml.includes("outdoor-halloween-decorations-impress-neighbors")}`,
);
