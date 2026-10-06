import fs from "fs";

console.log("=== VINTAGE HALLOWEEN DECOR (21) ===");
const vintage = JSON.parse(fs.readFileSync("scratch/vintage-halloween.json"));
vintage.forEach((a, i) => {
  console.log(`[${i + 1}] ${a.slug}`);
  console.log(`    Title: ${a.title}`);
  console.log(`    PrimaryKW: ${a.primaryKeyword}`);
  console.log(`    First 3 items: ${(a.products || []).slice(0, 3).join(", ")}`);
});

console.log("\n=== OUTDOOR HALLOWEEN DECOR (15) ===");
const outdoor = JSON.parse(fs.readFileSync("scratch/outdoor-halloween.json"));
outdoor.forEach((a, i) => {
  console.log(`[${i + 1}] ${a.slug}`);
  console.log(`    Title: ${a.title}`);
  console.log(`    PrimaryKW: ${a.primaryKeyword}`);
  console.log(`    First 3 items: ${(a.products || []).slice(0, 3).join(", ")}`);
});
