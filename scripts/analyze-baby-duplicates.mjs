import fs from "fs";

const data = JSON.parse(fs.readFileSync("scratch/baby-costumes.json"));

console.log("=== BABY COSTUMES DETAILED OVERLAP ANALYSIS ===");

for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    const a1 = data[i];
    const a2 = data[j];
    const prods1 = new Set(a1.products);
    const prods2 = new Set(a2.products);
    const commonProds = [...prods1].filter(p => prods2.has(p));
    const overlapRatio = commonProds.length / Math.min(prods1.size, prods2.size);

    if (overlapRatio > 0.5) {
      console.log(`[OVERLAP ${(overlapRatio * 100).toFixed(0)}%] (${commonProds.length} shared products)`);
      console.log(`  1: ${a1.slug}`);
      console.log(`  2: ${a2.slug}`);
    }
  }
}
