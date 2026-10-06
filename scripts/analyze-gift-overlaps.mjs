import fs from "fs";
import { t as articles } from "../.output/server/_ssr/articles-CNcBhVLS.mjs";

function checkOverlap(label, filterFn) {
  console.log(`\n=================== ${label} OVERLAP ===================`);
  const list = articles.filter(filterFn);
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a1 = list[i];
      const a2 = list[j];
      const prods1 = new Set((a1.products || a1.items || []).map(p => p.name || p.title));
      const prods2 = new Set((a2.products || a2.items || []).map(p => p.name || p.title));
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

checkOverlap("GIFTS FOR DAD", a => a.slug.includes("dad"));
checkOverlap("GIFTS FOR MOM", a => a.slug.includes("mom"));
checkOverlap("GIFTS FOR WOMEN", a => a.category === "gifts-for-women" || a.slug.includes("women"));
