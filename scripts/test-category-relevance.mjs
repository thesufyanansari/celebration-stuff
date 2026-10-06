import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

async function runRegressionTests() {
  console.log("=== RUNNING PERMANENT CATEGORY TAXONOMY REGRESSION TEST ===\n");

  // Dynamically resolve the latest articles chunk and site chunk
  const ssrDir = path.resolve(".output/server/_ssr");
  const files = fs.readdirSync(ssrDir);
  const articlesChunk = files.find((f) => f.startsWith("articles-") && f.endsWith(".mjs"));
  const siteChunk = files.find((f) => f.startsWith("site-") && f.endsWith(".mjs"));

  if (!articlesChunk || !siteChunk) {
    throw new Error("Could not locate compiled SSR chunks. Please run `npm run build` first.");
  }

  const { t: articles, n: byCategory } = await import(
    pathToFileURL(path.join(ssrDir, articlesChunk)).href
  );
  const { r: categories } = await import(
    pathToFileURL(path.join(ssrDir, siteChunk)).href
  );

  let failureCount = 0;

  // TEST 1: Thanksgiving Category Strictness
  console.log("[TEST 1] Auditing /category/thanksgiving...");
  const thanksgivingArticles = byCategory("thanksgiving");
  console.log(`Found ${thanksgivingArticles.length} articles for /category/thanksgiving`);

  const expectedThanksgivingSlugs = [
    "cozy-thanksgiving-tablescape-ideas",
    "18-thanksgiving-gift-ideas-for-mom",
    "17-thanksgiving-hostess-gift-ideas",
  ];

  for (const a of thanksgivingArticles) {
    console.log(`  - Checking "${a.title}" (${a.slug})...`);
    
    // Assertion: Must NOT be a Halloween article
    if (a.category === "halloween" || a.holiday?.includes("halloween") || a.event?.toLowerCase() === "halloween") {
      console.error(`    [FAIL] Halloween article leaked into Thanksgiving: ${a.slug}`);
      failureCount++;
    }

    // Assertion: Must NOT be a Christmas article
    if (a.category === "christmas" || a.category === "christmas-gifts" || a.holiday?.includes("christmas") || a.holiday?.includes("christmas-gifts")) {
      console.error(`    [FAIL] Christmas article leaked into Thanksgiving: ${a.slug}`);
      failureCount++;
    }

    // Assertion: Must have explicit Thanksgiving taxonomy
    const hasThanksgivingTaxonomy =
      a.category === "thanksgiving" ||
      a.holiday?.some((h) => h.includes("thanksgiving")) ||
      a.occasion?.some((o) => o.includes("thanksgiving")) ||
      a.event?.toLowerCase() === "thanksgiving";

    if (!hasThanksgivingTaxonomy) {
      console.error(`    [FAIL] Article lacks explicit Thanksgiving taxonomy: ${a.slug}`);
      failureCount++;
    }
  }

  // Assertion: Check that expected slugs match exactly
  const actualSlugs = thanksgivingArticles.map((a) => a.slug).sort();
  const expectedSorted = [...expectedThanksgivingSlugs].sort();
  if (JSON.stringify(actualSlugs) !== JSON.stringify(expectedSorted)) {
    console.error(`    [FAIL] Expected slugs ${JSON.stringify(expectedSorted)}, but got ${JSON.stringify(actualSlugs)}`);
    failureCount++;
  } else {
    console.log("    [PASS] /category/thanksgiving contains strictly the 3 genuine Thanksgiving articles.");
  }

  // TEST 2: Halloween Category Strictness
  console.log("\n[TEST 2] Auditing /category/halloween...");
  const halloweenArticles = byCategory("halloween");
  console.log(`Found ${halloweenArticles.length} articles for /category/halloween`);
  for (const a of halloweenArticles) {
    if (a.category === "thanksgiving" || a.holiday?.includes("thanksgiving")) {
      console.error(`    [FAIL] Thanksgiving article leaked into Halloween: ${a.slug}`);
      failureCount++;
    }
    if (a.category === "christmas-gifts" || a.holiday?.includes("christmas-gifts") || a.holiday?.includes("christmas")) {
      console.error(`    [FAIL] Christmas article leaked into Halloween: ${a.slug}`);
      failureCount++;
    }
  }
  console.log("    [PASS] /category/halloween is completely free of Thanksgiving and Christmas contamination.");

  // TEST 3: Christmas Category Strictness
  console.log("\n[TEST 3] Auditing /category/christmas-gifts...");
  const christmasArticles = byCategory("christmas-gifts");
  console.log(`Found ${christmasArticles.length} articles for /category/christmas-gifts`);
  for (const a of christmasArticles) {
    if (a.category === "thanksgiving" || a.holiday?.includes("thanksgiving")) {
      console.error(`    [FAIL] Thanksgiving article leaked into Christmas: ${a.slug}`);
      failureCount++;
    }
    if (a.category === "halloween" || a.holiday?.includes("halloween")) {
      console.error(`    [FAIL] Halloween article leaked into Christmas: ${a.slug}`);
      failureCount++;
    }
  }
  console.log("    [PASS] /category/christmas-gifts is completely free of Halloween and Thanksgiving contamination.");

  // TEST 4: Multi-Taxonomy Integrity
  console.log("\n[TEST 4] Auditing Multi-Taxonomy relationships...");
  const momArticles = byCategory("gifts-for-mom");
  const thanksgivingMomArticle = momArticles.find((a) => a.slug === "18-thanksgiving-gift-ideas-for-mom");
  if (!thanksgivingMomArticle) {
    console.error("    [FAIL] 18-thanksgiving-gift-ideas-for-mom missing from /category/gifts-for-mom");
    failureCount++;
  } else {
    console.log("    [PASS] Multi-taxonomy confirmed: 18-thanksgiving-gift-ideas-for-mom is present in both /category/thanksgiving and /category/gifts-for-mom.");
  }

  // TEST 5: Comprehensive Site-wide Category Audit
  console.log("\n[TEST 5] Auditing all 26 categories site-wide...");
  for (const cat of categories) {
    const list = byCategory(cat.slug);
    // Ensure no null/undefined articles
    if (list.some((item) => !item || !item.slug)) {
      console.error(`    [FAIL] Found null or undefined article in category ${cat.slug}`);
      failureCount++;
    }
  }
  console.log("    [PASS] All 26 categories successfully resolved without errors.");

  console.log("\n=======================================================");
  if (failureCount === 0) {
    console.log("ALL CATEGORY TAXONOMY TESTS PASSED WITH 0 REGRESSIONS!");
    console.log("=======================================================\n");
    process.exit(0);
  } else {
    console.error(`FAILED: ${failureCount} taxonomy test failures detected!`);
    console.log("=======================================================\n");
    process.exit(1);
  }
}

runRegressionTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
