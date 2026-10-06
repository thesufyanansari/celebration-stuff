import fs from "fs";
import server from "../.output/server/index.mjs";

async function runTests() {
  console.log("=== RUNNING AUTOMATED SEO & REDIRECT TESTS ===");

  const redirectTests = [
    {
      src: "https://celebrationsstuff.com/article/outdoor-halloween-decor-every-style",
      expectedDest: "https://celebrationsstuff.com/article/outdoor-halloween-decor-every-vibe",
    },
    {
      src: "https://celebrationsstuff.com/article/baby-halloween-costumes-ideas-steal-the-show",
      expectedDest: "https://celebrationsstuff.com/article/baby-halloween-costumes-ideas-picture-perfect-moments",
    },
    {
      src: "https://celebrationsstuff.com/article/baby-halloween-costumes-ideas-too-cute-to-spook",
      expectedDest: "https://celebrationsstuff.com/article/baby-halloween-costumes-ideas-sweetest-trick-or-treater",
    },
    {
      src: "https://celebrationsstuff.com/article/creepy-vintage-halloween-decorations",
      expectedDest: "https://celebrationsstuff.com/article/vintage-horror-film-halloween-yard",
    },
    {
      src: "https://celebrationsstuff.com/article/10-best-christmas-gifts-for-mom",
      expectedDest: "https://celebrationsstuff.com/article/12-christmas-gifts-for-mom-she-will-actually-love",
    },
    // Also test uppercase & trailing slash normalization
    {
      src: "https://celebrationsstuff.com/article/Outdoor-Halloween-Decor-Every-Style/",
      expectedDest: "https://celebrationsstuff.com/article/outdoor-halloween-decor-every-vibe",
    },
    // Also test www normalization
    {
      src: "https://www.celebrationsstuff.com/article/outdoor-halloween-decor-every-vibe",
      expectedDest: "https://celebrationsstuff.com/article/outdoor-halloween-decor-every-vibe",
    },
  ];

  let redirectFailures = 0;
  for (const t of redirectTests) {
    const req = new Request(t.src, {
      headers: { host: new URL(t.src).host, "x-forwarded-proto": "https" },
    });
    const ctx = { waitUntil: () => {} };
    const res = await server.fetch(req, {}, ctx);
    const loc = res.headers.get("Location");
    if (res.status === 301 && loc === t.expectedDest) {
      console.log(`[PASS] ${t.src} -> 301 -> ${loc}`);
    } else {
      console.error(`[FAIL] ${t.src} -> status: ${res.status}, Location: ${loc}, expected: ${t.expectedDest}`);
      redirectFailures++;
    }
  }

  // Check sitemap contents
  console.log("\n=== CHECKING SITEMAP CANONICALITY ===");
  const sitemapXml = fs.readFileSync("public/sitemap.xml", "utf8");
  const urlsInSitemap = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`Total URLs in sitemap: ${urlsInSitemap.length}`);

  const mergedUrls = [
    "https://celebrationsstuff.com/article/outdoor-halloween-decor-every-style",
    "https://celebrationsstuff.com/article/baby-halloween-costumes-ideas-steal-the-show",
    "https://celebrationsstuff.com/article/baby-halloween-costumes-ideas-too-cute-to-spook",
    "https://celebrationsstuff.com/article/creepy-vintage-halloween-decorations",
    "https://celebrationsstuff.com/article/10-best-christmas-gifts-for-mom",
  ];

  let sitemapFailures = 0;
  for (const u of mergedUrls) {
    if (urlsInSitemap.includes(u)) {
      console.error(`[FAIL] Merged URL found in sitemap: ${u}`);
      sitemapFailures++;
    } else {
      console.log(`[PASS] Merged URL successfully excluded from sitemap: ${u}`);
    }
  }

  // Check that winner URLs ARE in sitemap
  const winnerUrls = [
    "https://celebrationsstuff.com/article/outdoor-halloween-decor-every-vibe",
    "https://celebrationsstuff.com/article/baby-halloween-costumes-ideas-picture-perfect-moments",
    "https://celebrationsstuff.com/article/baby-halloween-costumes-ideas-sweetest-trick-or-treater",
    "https://celebrationsstuff.com/article/vintage-horror-film-halloween-yard",
    "https://celebrationsstuff.com/article/12-christmas-gifts-for-mom-she-will-actually-love",
  ];

  for (const u of winnerUrls) {
    if (urlsInSitemap.includes(u)) {
      console.log(`[PASS] Winner URL present in sitemap: ${u}`);
    } else {
      console.error(`[FAIL] Winner URL missing from sitemap: ${u}`);
      sitemapFailures++;
    }
  }

  // Check for trailing slashes in sitemap
  const invalidSlash = urlsInSitemap.filter(u => u !== "https://celebrationsstuff.com/" && u.endsWith("/"));
  if (invalidSlash.length > 0) {
    console.error(`[FAIL] Found URLs with trailing slashes in sitemap:`, invalidSlash);
    sitemapFailures++;
  } else {
    console.log(`[PASS] No trailing slashes found in sitemap (only root / has slash).`);
  }

  console.log(`\nTEST SUMMARY: ${redirectFailures === 0 && sitemapFailures === 0 ? "ALL TESTS PASSED!" : "FAILURES DETECTED"}`);
}

runTests().catch(console.error);
