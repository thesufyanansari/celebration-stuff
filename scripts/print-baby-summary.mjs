import fs from "fs";

const data = JSON.parse(fs.readFileSync("scratch/baby-costumes.json"));
data.forEach((a, i) => {
  console.log(`[${i + 1}] ${a.slug}`);
  console.log(`    Title: ${a.title}`);
  console.log(`    PrimaryKW: ${a.primaryKeyword}`);
  console.log(`    Sections (${a.sections.length}): ${a.sections.slice(0, 5).join(" | ")}`);
  console.log(`    Products (${a.products.length}): ${a.products.slice(0, 5).join(" | ")}`);
  console.log("");
});
