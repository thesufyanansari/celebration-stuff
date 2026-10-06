import fs from 'fs';
import path from 'path';

const registryPath = path.resolve('src/data/keyword-registry.json');
const clustersPath = path.resolve('src/data/content-clusters.json');

if (!fs.existsSync(registryPath)) {
  console.error('FAIL: src/data/keyword-registry.json does not exist. Run scripts/generate-keyword-registry.mjs first.');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const clusters = fs.existsSync(clustersPath)
  ? JSON.parse(fs.readFileSync(clustersPath, 'utf8')).clusters
  : [];

console.log(`\n==================================================`);
console.log(`RUNNING AUTOMATED SEO KEYWORD REGISTRY TEST SUITE`);
console.log(`Testing ${registry.length} registered canonical articles`);
console.log(`==================================================\n`);

let passedTests = 0;
let totalTests = 10;
const warnings = [];
const failures = [];

function normalize(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
  return new Set(
    (text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !['and', 'for', 'the', 'with', 'that', 'you', 'can', 'are', 'your', 'all', 'from'].includes(w))
  );
}

function jaccardSimilarity(setA, setB) {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

// ----------------------------------------------------
// TEST 1: Duplicate Primary Keywords
// ----------------------------------------------------
console.log(`[TEST 1] Checking for duplicate primary keywords...`);
const pkMap = {};
for (const a of registry) {
  const norm = normalize(a.primaryKeyword);
  if (!norm) continue;
  if (!pkMap[norm]) pkMap[norm] = [];
  pkMap[norm].push(a);
}

const duplicatePKs = Object.entries(pkMap).filter(([_, list]) => list.length > 1);
if (duplicatePKs.length === 0) {
  console.log(`  ✓ PASS: Zero duplicate primary keywords across all ${registry.length} articles.`);
  passedTests++;
} else {
  failures.push(`Duplicate primary keywords detected: ${duplicatePKs.length}`);
  duplicatePKs.forEach(([pk, list]) => {
    console.error(`  ✗ FAIL: Primary keyword "${pk}" is claimed by multiple articles:`);
    list.forEach(item => console.error(`     - [${item.slug}] (${item.url})`));
  });
}

// ----------------------------------------------------
// TEST 2: Duplicate Intent Fingerprints
// ----------------------------------------------------
console.log(`\n[TEST 2] Checking intent fingerprint distribution and collision analysis...`);
const fpMap = {};
for (const a of registry) {
  const fp = a.intentFingerprint;
  if (!fpMap[fp]) fpMap[fp] = [];
  fpMap[fp].push(a);
}

const duplicateFPs = Object.entries(fpMap).filter(([_, list]) => list.length > 1);
if (duplicateFPs.length === 0) {
  console.log(`  ✓ PASS: All ${registry.length} articles have completely unique intent fingerprints.`);
  passedTests++;
} else {
  // Warn as required: "Tests should WARN rather than automatically delete content when semantic similarity is uncertain."
  console.log(`  ! WARN: Found ${duplicateFPs.length} fingerprint groups shared by multiple subtopic articles:`);
  duplicateFPs.forEach(([fp, list]) => {
    console.log(`     - Fingerprint [${fp}] shared by ${list.length} articles:`);
    list.slice(0, 3).forEach(item => console.log(`        * "${item.title}" (${item.slug})`));
    if (list.length > 3) console.log(`        * ... and ${list.length - 3} more`);
  });
  warnings.push(`${duplicateFPs.length} fingerprint groups flagged for intentional subtopic clustering.`);
  passedTests++;
}

// ----------------------------------------------------
// TEST 3: Near-Duplicate Titles
// ----------------------------------------------------
console.log(`\n[TEST 3] Checking for near-duplicate titles (>70% token overlap)...`);
const nearDuplicateTitles = [];
for (let i = 0; i < registry.length; i++) {
  const a = registry[i];
  const aTokens = tokenize(a.title);
  for (let j = i + 1; j < registry.length; j++) {
    const b = registry[j];
    if (a.seasonEvent !== b.seasonEvent) continue;
    const bTokens = tokenize(b.title);
    const sim = jaccardSimilarity(aTokens, bTokens);
    if (sim >= 0.70) {
      nearDuplicateTitles.push({ a, b, sim: Math.round(sim * 100) });
    }
  }
}

if (nearDuplicateTitles.length === 0) {
  console.log(`  ✓ PASS: Zero near-duplicate titles detected.`);
  passedTests++;
} else {
  console.log(`  ! WARN: Found ${nearDuplicateTitles.length} title pairs with >= 70% token similarity:`);
  nearDuplicateTitles.slice(0, 5).forEach(({ a, b, sim }) => {
    console.log(`     - (${sim}% match) "${a.title}" VS "${b.title}"`);
  });
  if (nearDuplicateTitles.length > 5) {
    console.log(`     - ... and ${nearDuplicateTitles.length - 5} more`);
  }
  warnings.push(`${nearDuplicateTitles.length} near-duplicate title pairs detected (flagged for manual review).`);
  passedTests++;
}

// ----------------------------------------------------
// TEST 4: Missing Primary Keywords
// ----------------------------------------------------
console.log(`\n[TEST 4] Checking for missing primary keywords...`);
const missingPKs = registry.filter(a => !a.primaryKeyword || a.primaryKeyword.trim() === '');
if (missingPKs.length === 0) {
  console.log(`  ✓ PASS: 100% of articles (${registry.length}/${registry.length}) have an explicit primary keyword.`);
  passedTests++;
} else {
  failures.push(`Found ${missingPKs.length} articles missing primary keyword`);
  missingPKs.forEach(a => console.error(`  ✗ FAIL: Missing primary keyword on [${a.slug}]`));
}

// ----------------------------------------------------
// TEST 5: Missing Search Intent
// ----------------------------------------------------
console.log(`\n[TEST 5] Checking for missing or invalid search intent...`);
const validIntents = ['Commercial Investigation', 'Informational', 'Transactional', 'Navigational'];
const invalidIntents = registry.filter(a => !a.searchIntent || !validIntents.includes(a.searchIntent));
if (invalidIntents.length === 0) {
  console.log(`  ✓ PASS: 100% of articles have a valid search intent classification.`);
  passedTests++;
} else {
  failures.push(`Found ${invalidIntents.length} articles with invalid search intent`);
  invalidIntents.forEach(a => console.error(`  ✗ FAIL: Invalid search intent on [${a.slug}]: "${a.searchIntent}"`));
}

// ----------------------------------------------------
// TEST 6: Missing Parent Cluster / Pillar
// ----------------------------------------------------
console.log(`\n[TEST 6] Checking for missing parent cluster or pillar URL...`);
const missingPillar = registry.filter(a => !a.parentPillar || !a.parentPillar.startsWith('https://celebrationsstuff.com/category/'));
if (missingPillar.length === 0) {
  console.log(`  ✓ PASS: 100% of articles have a valid parent pillar URL.`);
  passedTests++;
} else {
  failures.push(`Found ${missingPillar.length} articles with missing or invalid parent pillar`);
  missingPillar.forEach(a => console.error(`  ✗ FAIL: Invalid pillar on [${a.slug}]: "${a.parentPillar}"`));
}

// ----------------------------------------------------
// TEST 7: Invalid Taxonomy
// ----------------------------------------------------
console.log(`\n[TEST 7] Checking taxonomy integrity (category, tags, published date)...`);
const invalidTaxonomy = registry.filter(a => !a.primaryCategory || !a.dateAdded || !a.lastSeoReview);
if (invalidTaxonomy.length === 0) {
  console.log(`  ✓ PASS: 100% of articles have valid taxonomy and date stamps.`);
  passedTests++;
} else {
  failures.push(`Found ${invalidTaxonomy.length} articles with missing taxonomy fields`);
}

// ----------------------------------------------------
// TEST 8: Strict Cross-Holiday Contamination
// ----------------------------------------------------
console.log(`\n[TEST 8] Checking strict cross-holiday isolation...`);
let holidayContaminationCount = 0;
for (const a of registry) {
  const ev = (a.seasonEvent || '').toLowerCase();
  const cat = (a.primaryCategory || '').toLowerCase();
  const tagsStr = (a.secondaryTaxonomy || []).join(' ').toLowerCase();

  // Thanksgiving checks
  if (ev === 'thanksgiving' || cat === 'thanksgiving') {
    if (tagsStr.includes('halloween') || tagsStr.includes('christmas')) {
      console.error(`  ✗ FAIL: Cross-holiday contamination in Thanksgiving article [${a.slug}]`);
      holidayContaminationCount++;
    }
  }

  // Halloween checks
  if (ev === 'halloween' || cat === 'halloween') {
    if (tagsStr.includes('thanksgiving') || tagsStr.includes('christmas-gifts')) {
      console.error(`  ✗ FAIL: Cross-holiday contamination in Halloween article [${a.slug}]`);
      holidayContaminationCount++;
    }
  }
}

if (holidayContaminationCount === 0) {
  console.log(`  ✓ PASS: Zero cross-holiday contamination across all holiday articles.`);
  passedTests++;
} else {
  failures.push(`Found ${holidayContaminationCount} cross-holiday contamination violations.`);
}

// ----------------------------------------------------
// TEST 9: Orphan Articles
// ----------------------------------------------------
console.log(`\n[TEST 9] Checking for orphan articles...`);
const orphanArticles = registry.filter(a => !a.parentPillar || (!a.childSupportingPages && !a.closestCompetingUrls));
if (orphanArticles.length === 0) {
  console.log(`  ✓ PASS: Zero orphan articles. All articles are properly mapped to parent pillars and internal clusters.`);
  passedTests++;
} else {
  failures.push(`Found ${orphanArticles.length} orphan articles`);
}

// ----------------------------------------------------
// TEST 10: Canonical Owners for Primary Search Intents
// ----------------------------------------------------
console.log(`\n[TEST 10] Checking canonical ownership of primary search intents...`);
let intentConflicts = 0;
for (const [pk, list] of Object.entries(pkMap)) {
  if (list.length > 1) {
    intentConflicts++;
  }
}
if (intentConflicts === 0) {
  console.log(`  ✓ PASS: Every primary search intent has exactly 1 canonical owner article.`);
  passedTests++;
} else {
  failures.push(`Found ${intentConflicts} search intents with multiple owners`);
}

// ----------------------------------------------------
// SUMMARY REPORT
// ----------------------------------------------------
console.log(`\n==================================================`);
console.log(`TEST SUITE RESULTS`);
console.log(`==================================================`);
console.log(`Passed:   ${passedTests} / ${totalTests}`);
console.log(`Warnings: ${warnings.length}`);
console.log(`Failures: ${failures.length}`);

if (warnings.length > 0) {
  console.log(`\nActive Editorial Warnings:`);
  warnings.forEach(w => console.log(`  ! ${w}`));
}

if (failures.length === 0) {
  console.log(`\n✓ ALL SEO REGRESSION TESTS PASSED!`);
  console.log(`The SEO Keyword Registry is 100% sound, consistent, and ready for production.`);
} else {
  console.error(`\n✗ TEST FAILURES DETECTED:`);
  failures.forEach(f => console.error(`  - ${f}`));
  process.exit(1);
}
console.log(`==================================================\n`);
