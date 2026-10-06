import fs from 'fs';
import path from 'path';

// Load Registry and Clusters
const registryPath = path.resolve('src/data/keyword-registry.json');
const clustersPath = path.resolve('src/data/content-clusters.json');

if (!fs.existsSync(registryPath)) {
  console.error('Error: keyword-registry.json not found. Run scripts/generate-keyword-registry.mjs first.');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const clusters = fs.existsSync(clustersPath)
  ? JSON.parse(fs.readFileSync(clustersPath, 'utf8')).clusters
  : [];

// Input argument
const inputQuery = process.argv.slice(2).join(' ').trim();

if (!inputQuery) {
  console.log(`
Usage:
  node scripts/check-new-keyword.mjs "<candidate keyword>"

Examples:
  node scripts/check-new-keyword.mjs "teacher thanksgiving gift ideas"
  node scripts/check-new-keyword.mjs "thanksgiving gift ideas for dad"
  node scripts/check-new-keyword.mjs "DIY thanksgiving gifts for teachers"
`);
  process.exit(0);
}

// 1. Normalization
function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const normalizedQuery = normalize(inputQuery);
const queryTokens = new Set(
  normalizedQuery
    .split(/\s+/)
    .filter(t => !['and', 'for', 'the', 'with', 'that', 'you', 'can', 'are', 'your', 'all', 'from', 'in', 'of', 'to'].includes(t))
);

// Helper token extractors
function detectSeason(text) {
  if (text.includes('thanksgiving')) return 'thanksgiving';
  if (text.includes('christmas') || text.includes('xmas') || text.includes('holiday')) return 'christmas';
  if (text.includes('halloween')) return 'halloween';
  if (text.includes('new year')) return 'new-year';
  if (text.includes('valentine')) return 'valentines-day';
  if (text.includes('ramadan')) return 'ramadan';
  if (text.includes('eid')) return 'eid';
  if (text.includes('mother')) return 'mothers-day';
  if (text.includes('father')) return 'fathers-day';
  if (text.includes('birthday')) return 'birthday';
  if (text.includes('wedding')) return 'wedding';
  if (text.includes('anniversary')) return 'anniversary';
  if (text.includes('housewarming')) return 'housewarming';
  return 'year-round';
}

function detectRecipient(text) {
  if (text.includes('teacher')) return 'teacher';
  if (text.includes('dad') || text.includes('father')) return 'dad';
  if (text.includes('mom') || text.includes('mother')) return 'mom';
  if (text.includes('wife')) return 'wife';
  if (text.includes('girlfriend')) return 'girlfriend';
  if (text.includes('sister')) return 'sister';
  if (text.includes('daughter')) return 'daughter';
  if (text.includes('best friend')) return 'best-friend';
  if (text.includes('mother in law') || text.includes('mother-in-law')) return 'mother-in-law';
  if (text.includes('coworker') || text.includes('client')) return 'coworker-client';
  if (text.includes('host') || text.includes('hostess')) return 'host';
  if (text.includes('baby') || text.includes('infant') || text.includes('toddler')) return 'baby';
  if (text.includes('women') || text.includes('her')) return 'women';
  if (text.includes('men') || text.includes('him')) return 'men';
  if (text.includes('kids') || text.includes('children')) return 'kids';
  return 'general';
}

function detectTopic(text) {
  if (text.includes('costume')) return 'costumes';
  if (text.includes('tablescape') || text.includes('table setting')) return 'tablescapes';
  if (text.includes('mantel')) return 'mantel-decor';
  if (text.includes('porch')) return 'porch-decor';
  if (text.includes('yard')) return 'yard-decor';
  if (text.includes('decor') || text.includes('decoration')) return 'decor';
  if (text.includes('party') || text.includes('favor') || text.includes('champagne')) return 'party-entertaining';
  return 'gifts';
}

function detectIntent(text) {
  if (text.includes('diy') || text.includes('handmade') || text.includes('craft') || text.includes('how to') || text.includes('tutorial')) {
    return 'informational';
  }
  return 'commercial';
}

function detectModifier(text) {
  if (text.includes('diy') || text.includes('handmade')) return 'diy';
  if (text.includes('under 20') || text.includes('under $20')) return 'under-20';
  if (text.includes('under 25') || text.includes('under $25')) return 'under-25';
  if (text.includes('under 30') || text.includes('under $30')) return 'under-30';
  if (text.includes('under 50') || text.includes('under $50')) return 'under-50';
  if (text.includes('under 100') || text.includes('under $100')) return 'under-100';
  if (text.includes('budget') || text.includes('cheap') || text.includes('affordable')) return 'budget';
  if (text.includes('luxury') || text.includes('expensive')) return 'luxury';
  if (text.includes('practical') || text.includes('useful')) return 'practical';
  if (text.includes('cozy')) return 'cozy';
  if (text.includes('vintage') || text.includes('antique') || text.includes('retro')) return 'vintage';
  if (text.includes('cutest') || text.includes('cute')) return 'cute';
  if (text.includes('best')) return 'best';
  if (text.includes('unique')) return 'unique';
  return 'general';
}

const qSeason = detectSeason(normalizedQuery);
const qRecipient = detectRecipient(normalizedQuery);
const qTopic = detectTopic(normalizedQuery);
const qIntent = detectIntent(normalizedQuery);
const qModifier = detectModifier(normalizedQuery);

const candidateFingerprint = `${qSeason}|${qTopic}|${qRecipient}|${qIntent}|${qModifier}`;

// 2. Exact match checks in active registry
let exactPrimaryOwner = null;
let exactSecondaryOwner = null;

for (const a of registry) {
  if (normalize(a.primaryKeyword) === normalizedQuery) {
    exactPrimaryOwner = a;
    break;
  }
  for (const sk of a.secondaryKeywords || []) {
    if (normalize(sk) === normalizedQuery) {
      exactSecondaryOwner = a;
      break;
    }
  }
}

// 3. Check cluster blueprint for existing or planned canonical owner
let clusterOwner = null;
for (const c of clusters) {
  if (c.clusterId === qSeason || c.seasonEvent.toLowerCase() === qSeason) {
    // Check main pillar
    if (normalize(c.mainPillar.primaryKeyword) === normalizedQuery) {
      clusterOwner = { ...c.mainPillar, type: 'Pillar' };
      break;
    }
    // Check recipient pages
    for (const p of c.supportingRecipientPages || []) {
      const normPK = normalize(p.primaryKeyword);
      if (normPK === normalizedQuery || (p.secondaryKeywords || []).map(normalize).includes(normalizedQuery)) {
        clusterOwner = { ...p, type: 'Recipient' };
        break;
      }
      // Check recipient match
      const recNorm = slugify(p.recipient);
      if (recNorm.includes(qRecipient) && qTopic === 'gifts') {
        // e.g. teacher thanksgiving gifts
        clusterOwner = { ...p, type: 'Recipient' };
      }
    }
    // Check gift type pages
    for (const g of c.giftTypePages || []) {
      if (normalize(g.primaryKeyword) === normalizedQuery || (g.secondaryKeywords || []).map(normalize).includes(normalizedQuery)) {
        clusterOwner = { ...g, type: 'GiftType' };
        break;
      }
    }
    // Check informational pages
    for (const inf of c.informationalPages || []) {
      if (normalize(inf.primaryKeyword) === normalizedQuery || (inf.secondaryKeywords || []).map(normalize).includes(normalizedQuery)) {
        clusterOwner = { ...inf, type: 'Informational' };
        break;
      }
    }
  }
}

// 4. Calculate semantic overlap with all active articles
const matches = [];
for (const a of registry) {
  const aNormPK = normalize(a.primaryKeyword);
  const aTokens = new Set(aNormPK.split(/\s+/));
  const intersect = new Set([...queryTokens].filter(x => aTokens.has(x)));
  const union = new Set([...queryTokens, ...aTokens]);
  const tokenJaccard = union.size > 0 ? intersect.size / union.size : 0;

  // Fingerprint match
  const fpExact = a.intentFingerprint === candidateFingerprint;
  const fpPartial = a.intentFingerprint.split('|').slice(0, 3).join('|') === candidateFingerprint.split('|').slice(0, 3).join('|');

  matches.push({
    article: a,
    tokenJaccard,
    fpExact,
    fpPartial,
    sameRecipient: a.recipient && slugify(a.recipient).includes(qRecipient),
    sameSeason: a.seasonEvent.toLowerCase().includes(qSeason),
    sameTopic: slugify(a.topic) === qTopic
  });
}

matches.sort((a, b) => b.tokenJaccard - a.tokenJaccard);
const topMatch = matches[0];

// 5. Decision Logic
let decision = '';
let risk = 'LOW';
let explanation = '';
let recommendation = null;

if (exactPrimaryOwner) {
  decision = 'E. DO NOT CREATE — DUPLICATE INTENT';
  risk = 'CRITICAL';
  explanation = `The exact primary keyword is already canonically owned by: ${exactPrimaryOwner.url} ("${exactPrimaryOwner.title}"). Creating another article would cause direct search cannibalization.`;
} else if (exactSecondaryOwner) {
  decision = 'B. ADD AS SECONDARY KEYWORD';
  risk = 'HIGH';
  explanation = `The query is already registered as an approved secondary keyword for canonical article: ${exactSecondaryOwner.url} ("${exactSecondaryOwner.title}"). This article already fully satisfies the search intent.`;
} else if (clusterOwner && clusterOwner.status === 'Active') {
  decision = 'B. ADD AS SECONDARY KEYWORD';
  risk = 'HIGH';
  explanation = `The query matches active canonical article ${clusterOwner.canonicalUrl} targeting "${clusterOwner.primaryKeyword}". Word reordering or minor modifiers represent the same core search task.`;
} else if (clusterOwner && clusterOwner.status === 'Planned') {
  // If the query is an alias/variation of a planned recipient guide:
  const isExactPlannedPK = normalize(clusterOwner.primaryKeyword) === normalizedQuery;
  if (!isExactPlannedPK && (clusterOwner.secondaryKeywords || []).map(normalize).includes(normalizedQuery)) {
    decision = 'B. ADD AS SECONDARY KEYWORD';
    risk = 'HIGH';
    explanation = `The query represents a secondary phrasing for the planned canonical article "${clusterOwner.primaryKeyword}" (${clusterOwner.canonicalUrl}). Incorporate this keyword into that planned page rather than creating a separate URL.`;
  } else if (!isExactPlannedPK && qModifier !== 'general' && qModifier !== 'diy') {
    decision = 'B. ADD AS SECONDARY KEYWORD';
    risk = 'MEDIUM';
    explanation = `The modifier "${qModifier}" does not justify a distinct URL. Consolidate into the planned canonical guide for ${clusterOwner.recipient} (${clusterOwner.canonicalUrl}).`;
  } else if (qIntent === 'informational' && normalizedQuery.includes('diy')) {
    decision = 'D. MANUAL REVIEW REQUIRED';
    risk = 'MEDIUM';
    explanation = `The query targets DIY/handmade content ("${inputQuery}"). The planned/canonical recipient guide (${clusterOwner.canonicalUrl}) is commercial/product-based. A separate page is justified ONLY IF providing step-by-step handmade craft tutorials rather than product affiliate lists. Otherwise, add as a DIY section to the main guide.`;
  } else {
    // Exact planned owner!
    decision = 'A. SAFE TO CREATE';
    risk = 'LOW';
    explanation = `The keyword represents a planned canonical recipient pillar for ${clusterOwner.recipient} in the ${qSeason.toUpperCase()} cluster. No active canonical URL currently competes for this search intent.`;
    recommendation = {
      primaryKeyword: clusterOwner.primaryKeyword,
      secondaryKeywords: clusterOwner.secondaryKeywords || [],
      title: `15 Thoughtful ${qSeason.charAt(0).toUpperCase() + qSeason.slice(1)} Gift Ideas for ${clusterOwner.recipient}`,
      h1: `15 Thoughtful ${qSeason.charAt(0).toUpperCase() + qSeason.slice(1)} Gift Ideas for ${clusterOwner.recipient}`,
      slug: slugify(clusterOwner.primaryKeyword),
      intent: 'Commercial Investigation',
      audience: `People shopping for ${clusterOwner.recipient} during ${qSeason}`,
      category: qSeason,
      parentPillar: `https://celebrationsstuff.com/category/${qSeason}`,
      internalLinks: [
        `https://celebrationsstuff.com/category/${qSeason}`,
        `Related articles in ${qSeason} cluster`
      ],
      uniqueAngle: `Curated product recommendations tailored specifically to ${clusterOwner.recipient} for ${qSeason}.`
    };
  }
} else if (topMatch && topMatch.fpExact) {
  decision = 'B. ADD AS SECONDARY KEYWORD';
  risk = 'HIGH';
  explanation = `Existing canonical article ${topMatch.article.url} has the identical intent fingerprint (${topMatch.article.intentFingerprint}). Both target ${qSeason} ${qTopic} for ${qRecipient}. Add this query as a secondary keyword to ${topMatch.article.url}.`;
} else if (topMatch && topMatch.fpPartial && topMatch.sameSeason && topMatch.sameRecipient) {
  // Same season, same recipient, but different modifier
  if (qIntent === 'informational' && normalizedQuery.includes('diy')) {
    decision = 'D. MANUAL REVIEW REQUIRED';
    risk = 'MEDIUM';
    explanation = `Intent comparison: Existing page ${topMatch.article.url} is commercial/product-focused. Query "${inputQuery}" requests handmade/DIY instructions. A separate URL is justified only if you produce authentic step-by-step handmade tutorial content. If recommending commercial products, incorporate as a section on ${topMatch.article.url}.`;
  } else if (['best', 'unique', 'cute', 'amazing', 'useful', 'practical', 'small'].includes(qModifier)) {
    decision = 'B. ADD AS SECONDARY KEYWORD';
    risk = 'HIGH';
    explanation = `The adjective modifier "${qModifier}" does not warrant a separate URL. Satisfy this query within existing canonical page ${topMatch.article.url}.`;
  } else if (qModifier.startsWith('under-')) {
    decision = 'C. UPDATE / EXPAND EXISTING ARTICLE';
    risk = 'MEDIUM';
    explanation = `Price-specific modifier "${qModifier}". Recommend expanding ${topMatch.article.url} with a dedicated budget section rather than launching a thin competing page.`;
  } else {
    decision = 'D. MANUAL REVIEW REQUIRED';
    risk = 'MEDIUM';
    explanation = `High lexical overlap with ${topMatch.article.url} (${Math.round(topMatch.tokenJaccard * 100)}% token match). Manual review is required to evaluate SERP intent separation.`;
  }
} else {
  // Truly new distinct search intent!
  decision = 'A. SAFE TO CREATE';
  risk = 'LOW';
  explanation = `The keyword represents a verified unique search intent. No active or planned article in the registry owns this recipient (${qRecipient}) or topic (${qTopic}) for ${qSeason}.`;

  const capSeason = qSeason.charAt(0).toUpperCase() + qSeason.slice(1);
  const capRecipient = qRecipient.charAt(0).toUpperCase() + qRecipient.slice(1);
  const suggestedSlug = slugify(inputQuery);

  recommendation = {
    primaryKeyword: inputQuery.toLowerCase(),
    secondaryKeywords: [
      `${inputQuery.toLowerCase()}`,
      `best ${inputQuery.toLowerCase()}`,
      `unique ${inputQuery.toLowerCase()}`,
      `thoughtful ${inputQuery.toLowerCase()}`
    ],
    title: `15 Thoughtful ${capSeason} Gift Ideas for ${capRecipient}`,
    h1: `15 Thoughtful ${capSeason} Gift Ideas for ${capRecipient}`,
    slug: suggestedSlug,
    intent: qIntent === 'informational' ? 'Informational' : 'Commercial Investigation',
    audience: `Shoppers seeking ${inputQuery.toLowerCase()}`,
    category: qSeason !== 'year-round' ? qSeason : 'gifts',
    parentPillar: `https://celebrationsstuff.com/category/${qSeason !== 'year-round' ? qSeason : 'gifts'}`,
    internalLinks: [
      `https://celebrationsstuff.com/category/${qSeason !== 'year-round' ? qSeason : 'gifts'}`,
      `Reciprocal links to related ${capSeason} cluster guides`
    ],
    uniqueAngle: `Focused specifically on distinct products and considerations tailored to ${capRecipient} for ${capSeason}.`
  };
}

// Format Output Report
console.log(`\n==================================================`);
console.log(`NEW KEYWORD CHECK REPORT`);
console.log(`==================================================`);
console.log(`Input Keyword:           "${inputQuery}"`);
console.log(`Normalized Keyword:      "${normalizedQuery}"`);
console.log(`Detected Season/Event:   ${qSeason}`);
console.log(`Detected Topic:          ${qTopic}`);
console.log(`Detected Recipient:      ${qRecipient}`);
console.log(`Detected Intent:         ${qIntent}`);
console.log(`Detected Modifier:       ${qModifier}`);
console.log(`Candidate Fingerprint:   ${candidateFingerprint}`);
console.log(`Cannibalization Risk:    ${risk}`);
console.log(`==================================================`);
console.log(`DECISION: ${decision}`);
console.log(`==================================================`);
console.log(`RATIONALE / ANALYSIS:`);
console.log(explanation);

if (topMatch && topMatch.article) {
  console.log(`\nClosest Existing URL:    ${topMatch.article.url}`);
  console.log(`Closest Article Title:   "${topMatch.article.title}"`);
  console.log(`Closest Primary Keyword: "${topMatch.article.primaryKeyword}"`);
  console.log(`Lexical Token Overlap:   ${Math.round(topMatch.tokenJaccard * 100)}%`);
}

if (recommendation) {
  console.log(`\nRECOMMENDED ARTICLE SPECIFICATION:`);
  console.log(`- Primary Keyword:       ${recommendation.primaryKeyword}`);
  console.log(`- Secondary Keywords:    ${recommendation.secondaryKeywords.join(', ')}`);
  console.log(`- Proposed Title:        ${recommendation.title}`);
  console.log(`- Proposed H1:           ${recommendation.h1}`);
  console.log(`- Proposed Slug:         ${recommendation.slug}`);
  console.log(`- Search Intent:         ${recommendation.intent}`);
  console.log(`- Target Audience:       ${recommendation.audience}`);
  console.log(`- Primary Category:      ${recommendation.category}`);
  console.log(`- Parent Pillar:         ${recommendation.parentPillar}`);
  console.log(`- Internal Links:        ${recommendation.internalLinks.join(' | ')}`);
  console.log(`- Unique Angle:          ${recommendation.uniqueAngle}`);
}
console.log(`==================================================\n`);
