import { t as articles } from "../.output/server/_ssr/articles-CNcBhVLS.mjs";

function printCluster(name, filterFn) {
  console.log(`\n=================== ${name} ===================`);
  const list = articles.filter(filterFn);
  list.forEach((a, i) => {
    console.log(`[${i + 1}] SLUG: ${a.slug}`);
    console.log(`    Title: ${a.title}`);
    console.log(`    PrimaryKW: ${a.primaryKeyword || ''}`);
    console.log(`    Category: ${a.category} | Holiday: ${JSON.stringify(a.holiday)} | Occasion: ${JSON.stringify(a.occasion)}`);
    console.log(`    First 3 items: ${(a.products || a.items || []).slice(0, 3).map(p => p.name || p.title).join(", ")}`);
    console.log("");
  });
}

printCluster("THANKSGIVING", a => a.slug.includes("thanksgiving") || a.title.toLowerCase().includes("thanksgiving"));
printCluster("GIFTS FOR DAD", a => a.slug.includes("dad") || a.title.toLowerCase().includes("dad"));
printCluster("GIFTS FOR MOM", a => a.slug.includes("mom") || a.title.toLowerCase().includes("mom"));
printCluster("COUPLES / NEW YEAR", a => a.slug.includes("couple") || a.slug.includes("new-year"));
printCluster("CHRISTMAS", a => (a.slug.includes("christmas") || a.title.toLowerCase().includes("christmas")) && !a.slug.includes("dad") && !a.slug.includes("mom") && !a.slug.includes("women"));
printCluster("GIFTS FOR WOMEN", a => a.slug.includes("women") || a.slug.includes("her") || a.title.toLowerCase().includes("women") || a.title.toLowerCase().includes("for her"));
