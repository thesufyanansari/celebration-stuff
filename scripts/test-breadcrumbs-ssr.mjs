import nitroApp from "../.output/server/index.mjs";

const TEST_URLS = [
  // 5 Articles
  "/article/18-thanksgiving-gift-ideas-for-mom",
  "/article/vintage-repurposed-halloween-decor",
  "/article/10-last-minute-christmas-gifts-for-dad-online",
  "/article/21-new-year-gift-ideas-for-couples",
  "/article/19-christmas-gift-ideas-for-grandma",

  // 3 Categories
  "/category/thanksgiving",
  "/category/halloween",
  "/category/gifts-for-dad",

  // Homepage
  "/",

  // Author & Static Pages
  "/author/sarah-linden",
  "/about",
  "/contact",
  "/explore",
  "/privacy",
];

async function run() {
  console.log("=== BREADCRUMB SSR & SCHEMA AUDIT SUITE ===\n");
  let passed = 0;
  let failed = 0;

  for (const path of TEST_URLS) {
    const req = new Request("https://celebrationsstuff.com" + path, {
      headers: { host: "celebrationsstuff.com" },
    });
    const res = await nitroApp.fetch(req, {}, { waitUntil: () => {} });
    const html = await res.text();

    console.log(`--------------------------------------------------`);
    console.log(`URL: ${path} (Status: ${res.status})`);

    // Extract all JSON-LD scripts
    const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    const breadcrumbSchemas = [];

    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        if (parsed["@type"] === "BreadcrumbList") {
          breadcrumbSchemas.push(parsed);
        }
      } catch (e) {
        console.error(`  [ERROR] Invalid JSON in ld+json script on ${path}:`, e.message);
      }
    }

    if (path === "/") {
      if (breadcrumbSchemas.length === 0) {
        console.log(`  [PASS] Homepage correctly has 0 BreadcrumbList schemas (Root page exclusion).`);
        passed++;
      } else {
        console.error(`  [FAIL] Homepage should NOT have BreadcrumbList schema! Found: ${breadcrumbSchemas.length}`);
        failed++;
      }
      continue;
    }

    if (breadcrumbSchemas.length === 0) {
      console.error(`  [FAIL] Missing BreadcrumbList schema on ${path}`);
      failed++;
      continue;
    }

    if (breadcrumbSchemas.length > 1) {
      console.error(`  [FAIL] Multiple conflicting BreadcrumbList schemas (${breadcrumbSchemas.length}) found on ${path}`);
      failed++;
      continue;
    }

    const schema = breadcrumbSchemas[0];
    console.log(`  [FOUND 1 SCHEMA] Position count: ${schema.itemListElement?.length}`);

    // Verify itemListElement structure
    let valid = true;
    const items = schema.itemListElement || [];

    items.forEach((item, idx) => {
      const pos = idx + 1;
      if (item["@type"] !== "ListItem") {
        console.error(`    [FAIL] Item ${idx} missing @type ListItem:`, item);
        valid = false;
      }
      if (item.position !== pos) {
        console.error(`    [FAIL] Item ${idx} position mismatch: expected ${pos}, got ${item.position}`);
        valid = false;
      }
      if (!item.name || typeof item.name !== "string" || item.name.trim() === "") {
        console.error(`    [FAIL] Item ${idx} has invalid name:`, item.name);
        valid = false;
      }
      if (!item.item || !item.item.startsWith("https://celebrationsstuff.com/")) {
        console.error(`    [FAIL] Item ${idx} URL does not start with https://celebrationsstuff.com/:`, item.item);
        valid = false;
      }
      if (item.item.includes("www.") || item.item.includes("http://")) {
        console.error(`    [FAIL] Item ${idx} URL has non-canonical protocol/host:`, item.item);
        valid = false;
      }
      // Check trailing slash rule: only root URL should end in /
      if (item.item !== "https://celebrationsstuff.com/" && item.item.endsWith("/")) {
        console.error(`    [FAIL] Item ${idx} URL has trailing slash on subpath:`, item.item);
        valid = false;
      }
      console.log(`    Pos ${item.position}: "${item.name}" -> ${item.item}`);
    });

    // Check specific hierarchy rules
    if (path.startsWith("/article/")) {
      if (items.length !== 3) {
        console.error(`    [FAIL] Article breadcrumb must have exactly 3 items: Home -> Category -> Title. Found: ${items.length}`);
        valid = false;
      } else {
        if (items[0].item !== "https://celebrationsstuff.com/") {
          console.error(`    [FAIL] Article Pos 1 must be Home`);
          valid = false;
        }
        if (!items[1].item.includes("/category/")) {
          console.error(`    [FAIL] Article Pos 2 must be a canonical Category URL. Got: ${items[1].item}`);
          valid = false;
        }
        if (!items[2].item.includes("/article/")) {
          console.error(`    [FAIL] Article Pos 3 must be the Article URL. Got: ${items[2].item}`);
          valid = false;
        }
      }
    } else if (path.startsWith("/category/")) {
      if (items.length !== 2) {
        console.error(`    [FAIL] Category breadcrumb must have exactly 2 items: Home -> Category. Found: ${items.length}`);
        valid = false;
      } else {
        if (items[0].item !== "https://celebrationsstuff.com/") {
          console.error(`    [FAIL] Category Pos 1 must be Home`);
          valid = false;
        }
        if (!items[1].item.includes("/category/")) {
          console.error(`    [FAIL] Category Pos 2 must be category URL. Got: ${items[1].item}`);
          valid = false;
        }
      }
    } else {
      // Static / Author
      if (items.length !== 2) {
        console.error(`    [FAIL] Static/Author breadcrumb must have exactly 2 items: Home -> Page. Found: ${items.length}`);
        valid = false;
      }
    }

    // Check visible breadcrumb presence in HTML
    const hasVisibleNav = html.includes('aria-label="Breadcrumb"');
    if (!hasVisibleNav) {
      console.error(`    [FAIL] Missing visible <nav aria-label="Breadcrumb"> in HTML!`);
      valid = false;
    } else {
      console.log(`    [PASS] Visible <nav aria-label="Breadcrumb"> present in SSR HTML.`);
    }

    if (valid) {
      console.log(`  [PASS] All schema and visual validation checks passed!`);
      passed++;
    } else {
      failed++;
    }
  }

  console.log(`\n==================================================`);
  console.log(`TOTAL PASSED: ${passed} / ${TEST_URLS.length}`);
  console.log(`TOTAL FAILED: ${failed} / ${TEST_URLS.length}`);
  if (failed > 0) process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
