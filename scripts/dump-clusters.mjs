import fs from "fs";
import { t as articles } from "../.output/server/_ssr/articles-CNcBhVLS.mjs";

function getClusterArticles(filterFn) {
  return articles.filter(filterFn).map(a => ({
    slug: a.slug,
    title: a.title,
    metaTitle: a.metaTitle || "",
    primaryKeyword: a.primaryKeyword || "",
    category: a.category,
    holiday: a.holiday,
    occasion: a.occasion,
    excerpt: a.excerpt,
    sections: a.sections?.map(s => s.heading) || [],
    products: (a.products || a.items || []).map(p => p.name || p.title)
  }));
}

const babyCostumes = getClusterArticles(a =>
  a.slug.includes("baby-halloween") || a.title.toLowerCase().includes("baby halloween")
);

const vintageHalloween = getClusterArticles(a =>
  a.slug.includes("vintage-halloween") || a.title.toLowerCase().includes("vintage halloween") ||
  (a.slug.includes("halloween") && (a.slug.includes("vintage") || a.slug.includes("antique") || a.slug.includes("retro") || a.slug.includes("repurposed")))
);

const outdoorHalloween = getClusterArticles(a =>
  (a.slug.includes("outdoor-halloween") || (a.slug.includes("halloween") && a.slug.includes("outdoor"))) &&
  !a.slug.includes("vintage")
);

const porchHalloween = getClusterArticles(a =>
  a.slug.includes("porch") && a.slug.includes("halloween") && !a.slug.includes("vintage")
);

const yardHalloween = getClusterArticles(a =>
  a.slug.includes("yard") && a.slug.includes("halloween") && !a.slug.includes("vintage")
);

if (!fs.existsSync("scratch")) fs.mkdirSync("scratch");
fs.writeFileSync("scratch/baby-costumes.json", JSON.stringify(babyCostumes, null, 2));
fs.writeFileSync("scratch/vintage-halloween.json", JSON.stringify(vintageHalloween, null, 2));
fs.writeFileSync("scratch/outdoor-halloween.json", JSON.stringify(outdoorHalloween, null, 2));
fs.writeFileSync("scratch/porch-halloween.json", JSON.stringify(porchHalloween, null, 2));
fs.writeFileSync("scratch/yard-halloween.json", JSON.stringify(yardHalloween, null, 2));

console.log(`Saved:
- baby-costumes.json (${babyCostumes.length})
- vintage-halloween.json (${vintageHalloween.length})
- outdoor-halloween.json (${outdoorHalloween.length})
- porch-halloween.json (${porchHalloween.length})
- yard-halloween.json (${yardHalloween.length})
`);
