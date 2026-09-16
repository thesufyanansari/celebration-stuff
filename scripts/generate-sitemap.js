import fs from "fs";
import path from "path";

const BASE_URL = "https://celebrationsstuff.com";

// 1. Read categories strictly from categories array in src/data/site.ts
const siteTs = fs.readFileSync("src/data/site.ts", "utf8");
const catBlockMatch = siteTs.match(/export const categories:\s*Category\[\]\s*=\s*\[([\s\S]*?)\];/);
const catSlugs = catBlockMatch
  ? [...catBlockMatch[1].matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])
  : [];

// 2. Read authors strictly from authors array in src/data/site.ts
const authorBlockMatch = siteTs.match(/export const authors:\s*Author\[\]\s*=\s*\[([\s\S]*?)\];/);
const authorSlugs = authorBlockMatch
  ? [...authorBlockMatch[1].matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])
  : [];

// 3. Static routes
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

const categoryRoutes = [...new Set(catSlugs)].map((c) => ({
  path: `/category/${c}`,
  lastmod: null,
}));

const authorRoutes = [...new Set(authorSlugs)].map((a) => ({
  path: `/author/${a}`,
  lastmod: null,
}));

// 4. Read articles and their genuine dates
const articlesIndex = fs.readFileSync("src/articles/index.ts", "utf8");
const articleImports = articlesIndex.match(/import article\d+ from "\.\/([^"]+)"/g) || [];

const articleEntries = articleImports
  .map((imp) => {
    const match = imp.match(/import article\d+ from "\.\/([^"]+)"/);
    if (!match) return null;
    const relPath = match[1];
    const fullPath = path.join("src/articles", `${relPath}.ts`);
    if (!fs.existsSync(fullPath)) return null;

    const content = fs.readFileSync(fullPath, "utf8");
    const slugMatch = content.match(/slug:\s*"([^"]+)"/);
    const updatedMatch = content.match(/updated:\s*"([^"]+)"/);
    const publishedMatch = content.match(/published:\s*"([^"]+)"/);

    const slug = slugMatch ? slugMatch[1] : path.basename(relPath);
    const lastmod =
      (updatedMatch ? updatedMatch[1] : null) || (publishedMatch ? publishedMatch[1] : null);

    return {
      path: `/article/${slug}`,
      lastmod,
    };
  })
  .filter(Boolean);

const allEntries = [...staticRoutes, ...categoryRoutes, ...authorRoutes, ...articleEntries];

const urlEntries = allEntries
  .map(({ path: p, lastmod }) => {
    const loc = `${BASE_URL}${p === "" ? "/" : p}`;
    const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
    return `  <url>
    <loc>${loc}</loc>${lastmodTag}
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log(
  `Generated public/sitemap.xml with ${allEntries.length} canonical URLs under ${BASE_URL}.`,
);
