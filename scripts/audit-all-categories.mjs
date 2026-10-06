import { r as categories } from "../.output/server/_ssr/site-W9-nuzkk.mjs";
import { t as articles, n as byCategory } from "../.output/server/_ssr/articles-Cp4N5CR_.mjs";

console.log("=== SITE-WIDE CATEGORY RELEVANCE AUDIT ===");

const categoryResults = [];

for (const cat of categories) {
  const matched = byCategory(cat.slug);
  const issues = [];

  for (const a of matched) {
    // Check holiday contamination
    if (cat.group === "holidays") {
      // If category is a specific holiday (e.g. thanksgiving, halloween, christmas-gifts)
      if (cat.slug === "thanksgiving") {
        if (a.holiday && !a.holiday.includes("thanksgiving") && (a.holiday.includes("halloween") || a.holiday.includes("christmas"))) {
          issues.push({ slug: a.slug, title: a.title, reason: `Conflicting holiday: ${a.holiday}` });
        }
      } else if (cat.slug === "halloween") {
        if (a.holiday && !a.holiday.includes("halloween") && (a.holiday.includes("thanksgiving") || a.holiday.includes("christmas"))) {
          issues.push({ slug: a.slug, title: a.title, reason: `Conflicting holiday: ${a.holiday}` });
        }
      } else if (cat.slug === "christmas-gifts") {
        if (a.holiday && !a.holiday.includes("christmas-gifts") && !a.holiday.includes("christmas") && a.holiday.includes("halloween")) {
          issues.push({ slug: a.slug, title: a.title, reason: `Conflicting holiday: ${a.holiday}` });
        }
      }
    }

    // Check people / recipient contamination
    if (cat.slug === "gifts-for-dad") {
      if (a.category !== "gifts-for-dad" && !a.recipient?.includes("dad") && !a.recipient?.includes("gifts-for-dad") && !a.slug.includes("dad")) {
        issues.push({ slug: a.slug, title: a.title, reason: `Not for dad (cat: ${a.category}, recipient: ${a.recipient})` });
      }
    } else if (cat.slug === "gifts-for-mom") {
      if (a.category !== "gifts-for-mom" && !a.recipient?.includes("mom") && !a.recipient?.includes("gifts-for-mom") && !a.slug.includes("mom")) {
        issues.push({ slug: a.slug, title: a.title, reason: `Not for mom (cat: ${a.category}, recipient: ${a.recipient})` });
      }
    }
  }

  categoryResults.push({
    slug: cat.slug,
    name: cat.name,
    group: cat.group,
    count: matched.length,
    issues
  });
}

categoryResults.forEach(cr => {
  const status = cr.issues.length > 0 ? `[FAIL - ${cr.issues.length} ISSUES]` : `[OK]`;
  console.log(`${status} /category/${cr.slug} (${cr.name}) -> ${cr.count} articles`);
  cr.issues.forEach(iss => console.log(`   - ${iss.slug}: ${iss.reason}`));
});
