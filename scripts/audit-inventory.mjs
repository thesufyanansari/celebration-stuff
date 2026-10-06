import { t as articles } from "../.output/server/_ssr/articles-CNcBhVLS.mjs";

console.log(`Loaded ${articles.length} articles.`);

function dumpCluster(name, filterFn) {
  console.log(`\n==================================================`);
  console.log(`CLUSTER: ${name}`);
  console.log(`==================================================`);
  const list = articles.filter(filterFn);
  list.forEach((a, i) => {
    console.log(`[${i + 1}] SLUG: ${a.slug}`);
    console.log(`    TITLE: "${a.title}"`);
    console.log(`    H1/MetaTitle: "${a.metaTitle || ''}"`);
    console.log(`    PrimaryKW: "${a.primaryKeyword || ''}"`);
    console.log(`    Excerpt: "${a.excerpt?.slice(0, 100)}..."`);
    console.log(`    Category: ${a.category} | Holiday: ${JSON.stringify(a.holiday)} | Occasion: ${JSON.stringify(a.occasion)}`);
    console.log(`    Sections (${a.sections?.length || 0}): ${a.sections?.map(s => s.heading).slice(0, 4).join(" | ")}...`);
    console.log(``);
  });
}

// 1. Baby Halloween Costumes (approx 13)
dumpCluster("BABY HALLOWEEN COSTUMES", a => 
  a.slug.includes("baby-halloween") || a.title.toLowerCase().includes("baby halloween")
);

// 2. Vintage Halloween Decor (approx 21)
dumpCluster("VINTAGE HALLOWEEN DECOR", a =>
  a.slug.includes("vintage-halloween") || a.title.toLowerCase().includes("vintage halloween") ||
  (a.slug.includes("halloween") && (a.slug.includes("vintage") || a.slug.includes("antique") || a.slug.includes("retro") || a.slug.includes("repurposed")))
);

// 3. Outdoor Halloween Decor (approx 15)
dumpCluster("OUTDOOR HALLOWEEN DECOR", a =>
  (a.slug.includes("outdoor-halloween") || (a.slug.includes("halloween") && a.slug.includes("outdoor"))) &&
  !a.slug.includes("vintage")
);

// 4. Halloween Porch Decor (approx 13)
dumpCluster("HALLOWEEN PORCH DECOR", a =>
  a.slug.includes("porch") && a.slug.includes("halloween") && !a.slug.includes("vintage")
);

// 5. Halloween Yard Decor (approx 15)
dumpCluster("HALLOWEEN YARD DECOR", a =>
  a.slug.includes("yard") && a.slug.includes("halloween") && !a.slug.includes("vintage")
);
