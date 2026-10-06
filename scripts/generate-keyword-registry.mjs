import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://celebrationsstuff.com';

// 1. Read active articles from index
const articlesIndex = fs.readFileSync('src/articles/index.ts', 'utf8');
const lines = articlesIndex.split('\n').filter(l => l.trim().startsWith('import article'));

function parseArray(content, key) {
  const match = content.match(new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\]`));
  if (!match) return [];
  return [...match[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
}

function parseString(content, key) {
  const match = content.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  return match ? match[1] : '';
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Tokenize text for semantic similarity
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

const rawArticles = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/from "\.\/([^"]+)"/);
  if (!m) continue;
  const relPath = m[1];
  const fullPath = path.join('src/articles', `${relPath}.ts`);
  const content = fs.readFileSync(fullPath, 'utf8');

  const slug = parseString(content, 'slug');
  const title = parseString(content, 'title');
  const metaTitle = parseString(content, 'metaTitle');
  const primaryKeyword = parseString(content, 'primaryKeyword');
  const secondaryKeywords = parseArray(content, 'secondaryKeywords');
  const category = parseString(content, 'category');
  const event = parseString(content, 'event');
  const season = parseString(content, 'season');
  const tags = parseArray(content, 'tags');
  const recipient = parseArray(content, 'recipient');
  const occasion = parseArray(content, 'occasion');
  const holiday = parseArray(content, 'holiday');
  const giftStyle = parseArray(content, 'giftStyle');
  const focusTopic = parseString(content, 'focusTopic');
  const published = parseString(content, 'published');
  const updated = parseString(content, 'updated');
  const excerpt = parseString(content, 'excerpt');

  rawArticles.push({
    index: i + 1,
    relPath,
    slug,
    title,
    metaTitle,
    primaryKeyword,
    secondaryKeywords,
    category,
    event,
    season,
    tags,
    recipient,
    occasion,
    holiday,
    giftStyle,
    focusTopic,
    published,
    updated,
    excerpt
  });
}

console.log(`Loaded ${rawArticles.length} active articles for registry generation.`);

// Helper to determine pillar URL
function getParentPillar(article) {
  const cat = article.category.toLowerCase();
  const ev = (article.event || '').toLowerCase();

  if (ev === 'thanksgiving' || cat === 'thanksgiving') {
    return `${BASE_URL}/category/thanksgiving`;
  }
  if (ev === 'christmas' || cat === 'christmas' || cat === 'christmas-gifts') {
    return `${BASE_URL}/category/christmas-gifts`;
  }
  if (ev === 'halloween' || cat === 'halloween') {
    return `${BASE_URL}/category/halloween`;
  }
  if (ev === 'new year') {
    return `${BASE_URL}/category/new-year`;
  }
  if (cat === 'gifts-for-women') {
    return `${BASE_URL}/category/gifts-for-women`;
  }
  if (cat === 'gifts-for-dad') {
    return `${BASE_URL}/category/gifts-for-dad`;
  }
  return `${BASE_URL}/category/${cat}`;
}

// Helper to deduce topic
function getTopic(article) {
  const text = `${article.slug} ${article.title} ${article.category} ${article.event}`.toLowerCase();
  if (text.includes('costume')) return 'Costumes';
  if (text.includes('tablescape')) return 'Tablescapes';
  if (text.includes('porch')) return 'Porch Decor';
  if (text.includes('yard')) return 'Yard Decor';
  if (text.includes('mantel')) return 'Mantel Decor';
  if (text.includes('decor')) return 'Decor';
  if (text.includes('party') || text.includes('favor') || text.includes('champagne')) return 'Party Entertaining';
  return 'Gifts';
}

// Helper to deduce subtopic
function getSubtopic(article) {
  if (article.focusTopic) return article.focusTopic;
  const topic = getTopic(article);
  const ev = article.event || article.category;
  return `${ev} ${topic}`;
}

// Helper to deduce audience
function getAudience(article) {
  const text = `${article.slug} ${article.title} ${article.category}`.toLowerCase();
  if (text.includes('baby')) return 'Parents of Infants & Toddlers';
  if (text.includes('dad')) return 'Adult Children & Spouses Shopping for Dads';
  if (text.includes('mom')) return 'Family & Adult Children Shopping for Moms';
  if (text.includes('wife')) return 'Husbands & Spouses';
  if (text.includes('girlfriend')) return 'Boyfriends & Partners';
  if (text.includes('sister')) return 'Siblings Shopping for Sisters';
  if (text.includes('daughter')) return 'Parents Shopping for Daughters';
  if (text.includes('best-friend')) return 'Close Friends';
  if (text.includes('coworker')) return 'Colleagues & Office Gift Exchangers';
  if (text.includes('mother-in-law')) return 'Sons-in-law & Daughters-in-law';
  if (text.includes('women') || text.includes('her')) return 'Holiday Shoppers Buying for Women';
  if (text.includes('yard') || text.includes('porch') || text.includes('decor') || text.includes('outdoor')) return 'Homeowners & Holiday Decorators';
  if (text.includes('tablescape') || text.includes('host')) return 'Holiday Hosts & Dinner Party Planners';
  return 'Celebration & Gift Shoppers';
}

// Helper to deduce recipient
function getRecipient(article) {
  const text = `${article.slug} ${article.title} ${article.category} ${JSON.stringify(article.recipient || [])}`.toLowerCase();
  if (text.includes('baby')) return 'Baby';
  if (text.includes('dad')) return 'Dad';
  if (text.includes('wife')) return 'Wife';
  if (text.includes('girlfriend')) return 'Girlfriend';
  if (text.includes('sister')) return 'Sister';
  if (text.includes('daughter')) return 'Daughter';
  if (text.includes('mother-in-law')) return 'Mother-in-Law';
  if (text.includes('best-friend')) return 'Best Friend';
  if (text.includes('coworker')) return 'Coworkers';
  if (text.includes('host')) return 'Host';
  if (text.includes('mom') || text.includes('mother')) return 'Mom';
  if (text.includes('women') || text.includes('for her') || text.includes('gifts-for-women')) return 'Women';
  if (text.includes('men') || text.includes('gifts-for-men')) return 'Men';
  if (text.includes('decor') || text.includes('tablescape') || text.includes('porch') || text.includes('yard')) return 'N/A';
  return 'General';
}

// Helper to deduce gift type
function getGiftType(article) {
  const text = `${article.slug} ${article.title}`.toLowerCase();
  if (text.includes('decor') || text.includes('tablescape')) return 'Decor Guide';
  if (text.includes('costume')) return 'Costume Guide';
  if (text.includes('stocking-stuffer') || text.includes('stocking filler')) return 'Stocking Stuffers';
  if (text.includes('under-20') || text.includes('under-25') || text.includes('under 30') || text.includes('budget') || text.includes('cheap') || text.includes('affordable')) return 'Budget Gift Guide';
  if (text.includes('luxury') || text.includes('splurge') || text.includes('under-100')) return 'Luxury & Premium Gifts';
  if (text.includes('practical') || text.includes('useful')) return 'Practical Gift Guide';
  if (text.includes('gadget') || text.includes('tech')) return 'Tech & Gadget Gifts';
  if (text.includes('cozy')) return 'Cozy & Comfort Gifts';
  if (text.includes('last-minute')) return 'Last-Minute Gifts';
  if (text.includes('unique') || text.includes('thoughtful')) return 'Curated Thoughtful Gifts';
  return 'Curated Gift Guide';
}

// Price modifier
function getPriceModifier(article) {
  const text = `${article.slug} ${article.title}`.toLowerCase();
  if (text.includes('under 20') || text.includes('under-20')) return 'Under $20';
  if (text.includes('under 25') || text.includes('under-25')) return 'Under $25';
  if (text.includes('under 30') || text.includes('under-30')) return 'Under $30';
  if (text.includes('under 50') || text.includes('under-50')) return 'Under $50';
  if (text.includes('under 100') || text.includes('under-100')) return 'Under $100';
  if (text.includes('budget') || text.includes('affordable') || text.includes('cheap')) return 'Budget';
  if (text.includes('luxury') || text.includes('splurge')) return 'Luxury';
  return 'All Price Tiers';
}

// Style modifier
function getStyleModifier(article) {
  const text = `${article.slug} ${article.title}`.toLowerCase();
  if (text.includes('vintage') || text.includes('antique') || text.includes('retro')) return 'Vintage';
  if (text.includes('cozy')) return 'Cozy';
  if (text.includes('minimalist')) return 'Minimalist';
  if (text.includes('whimsical')) return 'Whimsical';
  if (text.includes('classy') || text.includes('luxury')) return 'Classy / Luxury';
  if (text.includes('spooky') || text.includes('haunted')) return 'Spooky';
  if (text.includes('practical') || text.includes('useful')) return 'Practical';
  if (text.includes('diy') || text.includes('homemade')) return 'DIY';
  return 'General';
}

// DIY / Commercial
function getDiyCommercial(article) {
  const text = `${article.slug} ${article.title}`.toLowerCase();
  if (text.includes('diy') || text.includes('homemade') || text.includes('craft')) return 'DIY';
  return 'Commercial';
}

// Informational / Commercial
function getInfoCommercial(article) {
  const text = `${article.slug} ${article.title} ${article.category}`.toLowerCase();
  if (text.includes('tablescape') || text.includes('how to') || text.includes('guide') && (text.includes('decor') || text.includes('formula'))) {
    return 'Informational';
  }
  return 'Commercial Investigation';
}

// Unique angle
function getUniqueAngle(article) {
  if (article.excerpt) {
    return article.excerpt.replace(/\s+/g, ' ').trim();
  }
  return `Focuses on curated ${article.primaryKeyword} with structured editorial selection and verified product recommendations.`;
}

// Intent Fingerprint: {season}|{topic}|{recipient}|{intent}|{modifier}
function generateFingerprint(article) {
  const ev = (article.event || article.season || 'year-round').toLowerCase();
  const seasonToken = ev.includes('thanksgiving') ? 'thanksgiving'
    : ev.includes('christmas') ? 'christmas'
    : ev.includes('halloween') ? 'halloween'
    : ev.includes('new year') ? 'new-year'
    : 'year-round';

  const topicToken = slugify(getTopic(article));
  const recipientToken = slugify(getRecipient(article));
  const intentToken = getInfoCommercial(article) === 'Informational' ? 'informational' : 'commercial';
  
  // Specific modifier
  let modToken = slugify(getPriceModifier(article));
  if (modToken === 'all-price-tiers') {
    modToken = slugify(getStyleModifier(article));
  }
  if (modToken === 'general') {
    // Check specific slug discriminator
    const slugParts = article.slug.split('-');
    const lastWord = slugParts[slugParts.length - 1];
    if (['neighbors', 'gore', 'treaters', 'dark', 'night', 'vibe', 'entrance', 'clutter', 'drawer', 'sweetest', 'costume', 'costumes'].includes(lastWord)) {
      modToken = lastWord;
    }
  }

  return `${seasonToken}|${topicToken}|${recipientToken}|${intentToken}|${modToken}`;
}

// Build registry entries
const registry = rawArticles.map(article => {
  const articleId = `CS-${String(article.index).padStart(3, '0')}`;
  const url = `${BASE_URL}/article/${article.slug}`;
  const h1 = article.metaTitle || article.title;
  const searchIntent = getInfoCommercial(article);
  const intentFingerprint = generateFingerprint(article);
  const topic = getTopic(article);
  const subtopic = getSubtopic(article);
  const seasonEvent = article.event || article.season || 'Year-round';
  const audience = getAudience(article);
  const recipient = getRecipient(article);
  const giftType = getGiftType(article);
  const priceModifier = getPriceModifier(article);
  const styleModifier = getStyleModifier(article);
  const diyCommercial = getDiyCommercial(article);
  const infoCommercial = searchIntent;
  const primaryCategory = article.category;
  const secondaryTaxonomy = [
    ...(article.tags || []),
    ...(article.holiday || []),
    ...(article.occasion || []),
    ...(article.recipient || [])
  ];
  const parentPillar = getParentPillar(article);
  const uniqueAngle = getUniqueAngle(article);

  return {
    articleId,
    url,
    slug: article.slug,
    title: article.title,
    h1,
    primaryKeyword: article.primaryKeyword,
    secondaryKeywords: article.secondaryKeywords || [],
    searchIntent,
    intentFingerprint,
    topic,
    subtopic,
    seasonEvent,
    audience,
    recipient,
    giftType,
    priceModifier,
    styleModifier,
    diyCommercial,
    infoCommercial,
    primaryCategory,
    secondaryTaxonomy: [...new Set(secondaryTaxonomy)],
    parentPillar,
    childSupportingPages: [],
    uniqueAngle,
    articleStatus: 'Active',
    cannibalizationRisk: 'LOW',
    closestCompetingUrls: [],
    dateAdded: article.published,
    lastSeoReview: article.updated || '2026-10-06'
  };
});

// Now calculate semantic similarity, closest competing URLs, and cannibalization risk
for (let i = 0; i < registry.length; i++) {
  const current = registry[i];
  const currentTokens = tokenize(`${current.primaryKeyword} ${current.title} ${current.intentFingerprint}`);

  const scoredNeighbors = [];

  for (let j = 0; j < registry.length; j++) {
    if (i === j) continue;
    const other = registry[j];

    // Must be in the same season/event or general
    if (current.seasonEvent !== other.seasonEvent && current.seasonEvent !== 'Year-round' && other.seasonEvent !== 'Year-round') {
      continue;
    }

    const otherTokens = tokenize(`${other.primaryKeyword} ${other.title} ${other.intentFingerprint}`);
    const sim = jaccardSimilarity(currentTokens, otherTokens);

    if (sim > 0.25) {
      scoredNeighbors.push({
        url: other.url,
        slug: other.slug,
        title: other.title,
        primaryKeyword: other.primaryKeyword,
        similarity: sim,
        sameRecipient: current.recipient === other.recipient && current.recipient !== 'N/A',
        sameTopic: current.topic === other.topic,
        sameFingerprint: current.intentFingerprint === other.intentFingerprint
      });
    }
  }

  scoredNeighbors.sort((a, b) => b.similarity - a.similarity);

  current.closestCompetingUrls = scoredNeighbors.slice(0, 4).map(n => n.url);

  // Set child supporting pages (pages in same pillar & topic)
  current.childSupportingPages = scoredNeighbors
    .filter(n => n.sameTopic && n.url !== current.parentPillar)
    .slice(0, 5)
    .map(n => n.url);

  // Determine Cannibalization Risk
  const topMatch = scoredNeighbors[0];
  if (!topMatch) {
    current.cannibalizationRisk = 'LOW';
  } else if (topMatch.sameFingerprint) {
    current.cannibalizationRisk = 'HIGH';
  } else if (topMatch.similarity > 0.60 && topMatch.sameRecipient) {
    current.cannibalizationRisk = 'HIGH';
  } else if (topMatch.similarity > 0.40) {
    current.cannibalizationRisk = 'MEDIUM';
  } else {
    current.cannibalizationRisk = 'LOW';
  }
}

// Write the master JSON registry
fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/keyword-registry.json', JSON.stringify(registry, null, 2), 'utf8');

console.log(`\n==================================================`);
console.log(`MASTER KEYWORD REGISTRY GENERATED SUCCESSFULLY`);
console.log(`Location: src/data/keyword-registry.json`);
console.log(`Total active canonical articles: ${registry.length}`);
console.log(`==================================================\n`);

// Cluster statistics
const seasonBreakdown = {};
const riskBreakdown = {};
for (const a of registry) {
  seasonBreakdown[a.seasonEvent] = (seasonBreakdown[a.seasonEvent] || 0) + 1;
  riskBreakdown[a.cannibalizationRisk] = (riskBreakdown[a.cannibalizationRisk] || 0) + 1;
}

console.log('Cluster Breakdown by Season/Event:');
console.table(seasonBreakdown);

console.log('\nCannibalization Risk Breakdown:');
console.table(riskBreakdown);
