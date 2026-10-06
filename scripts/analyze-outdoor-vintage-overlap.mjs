import fs from "fs";

function analyzeCluster(filename, label) {
  console.log(`\n=================== ${label} OVERLAP ===================`);
  const data = JSON.parse(fs.readFileSync(filename));
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const a1 = data[i];
      const a2 = data[j];
      const prods1 = new Set(a1.products);
      const prods2 = new Set(a2.products);
      const common = [...prods1].filter(p => prods2.has(p));
      const minSize = Math.min(prods1.size, prods2.size);
      if (minSize > 0) {
        const ratio = common.length / minSize;
        if (ratio > 0.4) {
          console.log(`[${(ratio * 100).toFixed(0)}% OVERLAP] (${common.length} shared)`);
          console.log(`  1: ${a1.slug}`);
          console.log(`  2: ${a2.slug}`);
        }
      }
    }
  }
}

analyzeCluster("scratch/outdoor-halloween.json", "OUTDOOR HALLOWEEN");
analyzeCluster("scratch/vintage-halloween.json", "VINTAGE HALLOWEEN");
analyzeCluster("scratch/porch-halloween.json", "PORCH HALLOWEEN");
analyzeCluster("scratch/yard-halloween.json", "YARD HALLOWEEN");
