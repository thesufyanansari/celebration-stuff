import fs from 'fs';
import path from 'path';

// Complete dictionary of SEO metadata enhancements for the 36 articles and 6 differentiation pairs
const METADATA_UPDATES = {
  // 1. General gifts
  'gift-ideas-for-people-who-want-nothing': {
    primaryKeyword: 'gift ideas for people who want nothing',
    secondaryKeywords: [
      'gifts for people who want nothing',
      'what to get someone who wants nothing',
      'gifts for people who have everything',
      'gifts for minimalists',
      'experience gifts for people who want nothing'
    ],
    focusTopic: 'Gifts for People Who Want Nothing',
    recipient: ['gifts-for-everyone', 'hard-to-shop-for'],
    occasion: ['any-occasion', 'holiday-gifts', 'birthday'],
    holiday: [],
    giftStyle: ['experience-gifts', 'consumable-gifts', 'practical-gifts', 'minimalist-gifts']
  },

  // 2. Christmas Mantel
  'christmas-mantel-decorating-ideas': {
    primaryKeyword: 'Christmas mantel decorating ideas',
    secondaryKeywords: [
      'how to decorate a Christmas mantel',
      'easy Christmas mantel decor',
      'holiday mantel decorating formula',
      'fireplace Christmas decorations',
      'cozy Christmas mantel ideas'
    ],
    focusTopic: 'Christmas Fireplace & Mantel Decorating',
    recipient: ['homeowners', 'holiday-hosts'],
    occasion: ['christmas', 'holiday-decor'],
    holiday: ['christmas'],
    giftStyle: ['decor-guide']
  },

  // 3-36: Christmas Women Guides
  '28-christmas-gifts-for-her-under-50': {
    primaryKeyword: 'Christmas gifts for her under $50',
    secondaryKeywords: [
      'Christmas gifts for women under $50',
      'luxurious gifts under $50 for her',
      'affordable luxury gifts for women',
      'holiday gifts for her under 50 dollars'
    ],
    focusTopic: 'Christmas Gifts for Women Under $50',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['luxury-on-a-budget', 'beauty-gifts', 'lifestyle-gifts']
  },
  '18-christmas-gifts-for-women-under-20-that-dont-look-cheap': {
    primaryKeyword: 'Christmas gifts for women under $20',
    secondaryKeywords: [
      'cheap Christmas gifts for women that look expensive',
      'gifts for her under $20',
      'inexpensive holiday gifts for women',
      'budget Christmas gifts for women under 20'
    ],
    focusTopic: 'Christmas Gifts for Women Under $20',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['budget-gifts', 'luxury-on-a-budget']
  },
  '32-affordable-christmas-gifts-for-women-that-still-feel-special': {
    primaryKeyword: 'affordable Christmas gifts for women',
    secondaryKeywords: [
      'budget Christmas gifts for women',
      'thoughtful affordable gifts for her',
      'inexpensive Christmas gifts for women',
      'special gifts for her on a budget'
    ],
    focusTopic: 'Affordable Christmas Gifts for Women',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['budget-gifts', 'thoughtful-gifts']
  },
  '24-christmas-gifts-for-her-under-100-when-you-want-to-splurge-a-little': {
    primaryKeyword: 'Christmas gifts for her under $100',
    secondaryKeywords: [
      'splurge Christmas gifts for women',
      'luxury gifts for her under 100',
      'holiday gifts for her under $100',
      'premium gifts for women under 100 dollars'
    ],
    focusTopic: 'Christmas Gifts for Her Under $100',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['luxury-gifts', 'premium-gifts']
  },
  '20-last-minute-christmas-gifts-for-women-under-30': {
    primaryKeyword: 'last minute Christmas gifts for women under $30',
    secondaryKeywords: [
      'last minute gifts for her under 30',
      'quick Christmas gifts for women',
      'fast shipping holiday gifts for her',
      'budget last minute gifts for women'
    ],
    focusTopic: 'Last Minute Christmas Gifts for Women Under $30',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['last-minute-gifts', 'budget-gifts']
  },
  'christmas-gifts-for-her-27-ideas-shell-remember-long-after-december': {
    primaryKeyword: 'memorable Christmas gifts for her',
    secondaryKeywords: [
      'Christmas gifts for her she will remember',
      'unforgettable Christmas gifts for women',
      'meaningful gifts for her',
      'special Christmas gifts for women'
    ],
    focusTopic: 'Memorable Christmas Gifts for Her',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['sentimental-gifts', 'luxury-gifts']
  },
  '26-christmas-eve-gift-ideas-for-women': {
    primaryKeyword: 'Christmas Eve gift ideas for women',
    secondaryKeywords: [
      'Christmas Eve box ideas for her',
      'cozy Christmas Eve gifts for women',
      'Christmas Eve presents for her',
      'night before Christmas gifts for women'
    ],
    focusTopic: 'Christmas Eve Gifts for Women',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-eve', 'christmas-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['cozy-gifts', 'tradition-gifts']
  },
  '21-stocking-stuffers-for-women-that-arent-filler': {
    primaryKeyword: 'stocking stuffers for women',
    secondaryKeywords: [
      'best stocking stuffers for women',
      'useful stocking stuffers for her',
      'unique stocking stuffer ideas for women',
      'stocking fillers for her'
    ],
    focusTopic: 'Stocking Stuffers for Women',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-gifts', 'stocking-stuffers'],
    holiday: ['christmas-gifts'],
    giftStyle: ['small-gifts', 'practical-gifts']
  },
  'christmas-morning-gifts-for-her-19-ideas-shell-open-first': {
    primaryKeyword: 'Christmas morning gifts for her',
    secondaryKeywords: [
      'first gifts to open Christmas morning for her',
      'Christmas morning surprises for wife',
      'morning of Christmas gift ideas for women'
    ],
    focusTopic: 'Christmas Morning Gifts for Her',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-morning', 'christmas-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['cozy-gifts', 'morning-routine']
  },
  '33-christmas-gifts-for-the-women-in-your-life-one-list-every-relationship': {
    primaryKeyword: 'Christmas gifts for the women in your life',
    secondaryKeywords: [
      'Christmas gifts for every woman in your life',
      'gifts for women Christmas master guide',
      'holiday gifts for all the women in your family'
    ],
    focusTopic: 'Christmas Gifts for Every Woman in Your Life',
    recipient: ['gifts-for-women', 'gifts-by-relationship'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['curated-guide', 'every-relationship']
  },
  '23-christmas-gifts-for-your-wife-that-arent-boring': {
    primaryKeyword: 'Christmas gifts for wife that arent boring',
    secondaryKeywords: [
      'unique Christmas gifts for wife',
      'thoughtful Christmas gifts for wife',
      'romantic Christmas gifts for wife',
      'what to get wife for Christmas'
    ],
    focusTopic: 'Christmas Gifts for Your Wife',
    recipient: ['gifts-for-wife', 'gifts-for-women'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['romantic-gifts', 'luxury-gifts', 'thoughtful-gifts']
  },
  '29-christmas-gifts-for-your-girlfriend-shell-brag-about': {
    primaryKeyword: 'Christmas gifts for girlfriend',
    secondaryKeywords: [
      'best Christmas gifts for girlfriend',
      'romantic Christmas gifts for girlfriend',
      'trending Christmas gifts for girlfriend',
      'cute Christmas gifts for girlfriend'
    ],
    focusTopic: 'Christmas Gifts for Your Girlfriend',
    recipient: ['gifts-for-girlfriend', 'gifts-for-women'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['romantic-gifts', 'trending-gifts']
  },
  '21-christmas-gifts-for-your-mom-she-wont-return': {
    primaryKeyword: 'Christmas gifts for your mom she wont return',
    secondaryKeywords: [
      'practical Christmas gifts for mom',
      'gifts for mom that she will actually keep',
      'useful Christmas gifts for mom',
      'best Christmas gifts for mom'
    ],
    focusTopic: 'Christmas Gifts for Your Mom',
    recipient: ['gifts-for-mom', 'gifts-for-women'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['practical-gifts', 'thoughtful-gifts']
  },
  '25-christmas-gifts-for-your-sister-based-on-her-actual-personality': {
    primaryKeyword: 'Christmas gifts for your sister',
    secondaryKeywords: [
      'Christmas gift ideas for sister',
      'gifts for sister based on personality',
      'unique Christmas gifts for sister',
      'best gifts for sister Christmas'
    ],
    focusTopic: 'Christmas Gifts for Your Sister',
    recipient: ['gifts-for-sister', 'gifts-for-women'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['personality-gifts', 'fun-gifts']
  },
  '19-christmas-gifts-for-your-best-friend-who-deserves-more-than-a-gift-card': {
    primaryKeyword: 'Christmas gifts for best friend',
    secondaryKeywords: [
      'Christmas gift ideas for female best friend',
      'meaningful gifts for best friend Christmas',
      'gifts for best friend instead of gift card',
      'best friend Christmas presents'
    ],
    focusTopic: 'Christmas Gifts for Your Best Friend',
    recipient: ['gifts-for-best-friend', 'gifts-for-women'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['thoughtful-gifts', 'friendship-gifts']
  },
  '24-christmas-gifts-for-your-mother-in-law-yes-really': {
    primaryKeyword: 'Christmas gifts for mother-in-law',
    secondaryKeywords: [
      'best Christmas gifts for mother in law',
      'thoughtful gifts for mother-in-law Christmas',
      'impressive mother in law Christmas gifts',
      'what to buy mother in law for Christmas'
    ],
    focusTopic: 'Christmas Gifts for Mother-in-Law',
    recipient: ['gifts-for-mother-in-law', 'gifts-for-women'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['elegant-gifts', 'thoughtful-gifts']
  },
  '20-christmas-gifts-for-your-daughter-from-teen-to-adult': {
    primaryKeyword: 'Christmas gifts for daughter',
    secondaryKeywords: [
      'Christmas gifts for adult daughter',
      'Christmas gifts for teen daughter',
      'best Christmas gifts for daughter',
      'thoughtful gifts for daughter Christmas'
    ],
    focusTopic: 'Christmas Gifts for Your Daughter',
    recipient: ['gifts-for-daughter', 'gifts-for-women'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['sentimental-gifts', 'lifestyle-gifts']
  },
  '27-christmas-gifts-for-coworkers-and-female-friends': {
    primaryKeyword: 'Christmas gifts for female coworkers',
    secondaryKeywords: [
      'Christmas gifts for coworkers and friends',
      'office Christmas gifts for women',
      'small gifts for female coworkers',
      'budget Christmas gifts for coworkers'
    ],
    focusTopic: 'Christmas Gifts for Coworkers & Friends',
    recipient: ['gifts-for-coworkers', 'gifts-for-friends'],
    occasion: ['christmas-gifts', 'office-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['office-appropriate', 'budget-gifts']
  },
  '22-christmas-gifts-for-the-woman-who-has-everything': {
    primaryKeyword: 'Christmas gifts for the woman who has everything',
    secondaryKeywords: [
      'gifts for women who have everything',
      'unique gifts for her who has it all',
      'luxury gifts for the woman who has everything',
      'what to get a woman who wants nothing'
    ],
    focusTopic: 'Christmas Gifts for the Woman Who Has Everything',
    recipient: ['gifts-for-women', 'hard-to-shop-for'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['unique-gifts', 'luxury-gifts']
  },
  '26-christmas-gifts-for-women-who-love-cozy-things': {
    primaryKeyword: 'Christmas gifts for women who love cozy things',
    secondaryKeywords: [
      'cozy Christmas gifts for her',
      'hygge gifts for women Christmas',
      'warm and cozy gifts for her',
      'comfort gifts for women'
    ],
    focusTopic: 'Cozy Christmas Gifts for Women',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['cozy-gifts', 'comfort-gifts']
  },
  '20-christmas-gifts-for-the-fitness-loving-woman': {
    primaryKeyword: 'Christmas gifts for fitness lovers women',
    secondaryKeywords: [
      'workout gifts for her Christmas',
      'gym gifts for women Christmas',
      'fitness gifts for her',
      'wellness Christmas gifts for women'
    ],
    focusTopic: 'Christmas Gifts for Fitness-Loving Women',
    recipient: ['gifts-for-women', 'fitness-lovers'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['fitness-gifts', 'wellness-gifts']
  },
  '24-christmas-gifts-for-women-who-love-to-cook-and-bake': {
    primaryKeyword: 'Christmas gifts for women who love to cook',
    secondaryKeywords: [
      'baking gifts for women Christmas',
      'kitchen gifts for her Christmas',
      'gifts for foodies women',
      'culinary Christmas gifts for her'
    ],
    focusTopic: 'Christmas Gifts for Cooks & Bakers',
    recipient: ['gifts-for-women', 'cooks-and-bakers'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['kitchen-gifts', 'culinary-gifts']
  },
  '18-christmas-gifts-for-the-book-loving-woman': {
    primaryKeyword: 'Christmas gifts for book lovers women',
    secondaryKeywords: [
      'reading gifts for her Christmas',
      'literary gifts for women Christmas',
      'bookish gifts for her',
      'gifts for readers women'
    ],
    focusTopic: 'Christmas Gifts for Book-Loving Women',
    recipient: ['gifts-for-women', 'book-lovers'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['literary-gifts', 'cozy-gifts']
  },
  '23-christmas-gifts-for-women-who-love-to-travel': {
    primaryKeyword: 'travel Christmas gifts for women',
    secondaryKeywords: [
      'gifts for women who travel',
      'best travel gifts for her Christmas',
      'travel essentials gifts for women',
      'wanderlust gifts for her'
    ],
    focusTopic: 'Christmas Gifts for Women Who Love to Travel',
    recipient: ['gifts-for-women', 'travelers'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['travel-gear', 'practical-gifts']
  },
  '21-christmas-gifts-for-the-beauty-and-skincare-obsessed': {
    primaryKeyword: 'beauty Christmas gifts for women',
    secondaryKeywords: [
      'skincare gifts for her Christmas',
      'best beauty gift sets for women',
      'luxury beauty Christmas gifts',
      'k-beauty gifts for her'
    ],
    focusTopic: 'Christmas Gifts for Beauty & Skincare Lovers',
    recipient: ['gifts-for-women', 'beauty-lovers'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['beauty-gifts', 'skincare-gifts']
  },
  '25-christmas-gifts-for-moms-and-home-decor-lovers': {
    primaryKeyword: 'home decor Christmas gifts for moms',
    secondaryKeywords: [
      'interior decor gifts for mom Christmas',
      'home lover gifts for her',
      'aesthetic home gifts for mom',
      'cozy home Christmas gifts for women'
    ],
    focusTopic: 'Home Decor Christmas Gifts for Moms',
    recipient: ['gifts-for-mom', 'home-decor-lovers'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['home-decor', 'cozy-gifts']
  },
  '19-christmas-gifts-for-the-modern-woman': {
    primaryKeyword: 'Christmas gifts for the modern woman',
    secondaryKeywords: [
      'minimalist gifts for her Christmas',
      'quiet luxury gifts for women',
      'chic modern gifts for women',
      'contemporary Christmas gifts for her'
    ],
    focusTopic: 'Christmas Gifts for the Modern Woman',
    recipient: ['gifts-for-women', 'modern-woman'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['modern-gifts', 'quiet-luxury']
  },
  '27-christmas-gifts-for-women-who-would-rather-stay-in': {
    primaryKeyword: 'Christmas gifts for women who would rather stay in',
    secondaryKeywords: [
      'homebody gifts for her Christmas',
      'stay at home gifts for women',
      'introvert gifts for her Christmas',
      'cozy loungewear gifts for women'
    ],
    focusTopic: 'Christmas Gifts for Homebodies',
    recipient: ['gifts-for-women', 'homebodies'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['homebody-gifts', 'cozy-gifts']
  },
  '30-christmas-gifts-for-the-woman-whos-impossible-to-shop-for': {
    primaryKeyword: 'Christmas gifts for the woman who is impossible to shop for',
    secondaryKeywords: [
      'gifts for hard to shop for women Christmas',
      'unique gifts for picky women',
      'what to get a woman who doesn\'t know what she wants'
    ],
    focusTopic: 'Gifts for the Impossible-to-Shop-For Woman',
    recipient: ['gifts-for-women', 'hard-to-shop-for'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['unique-gifts', 'problem-solver']
  },
  '20-thoughtful-christmas-gifts-for-women-when-youre-out-of-ideas': {
    primaryKeyword: 'thoughtful Christmas gifts for women when out of ideas',
    secondaryKeywords: [
      'last minute thoughtful gifts for her',
      'meaningful Christmas gifts for women',
      'fail proof Christmas gifts for her',
      'gifts for women when you have no ideas'
    ],
    focusTopic: 'Thoughtful Gifts for Women When Out of Ideas',
    recipient: ['gifts-for-women', 'gifts-for-her'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['thoughtful-gifts', 'foolproof-gifts']
  },
  '24-christmas-gifts-for-women-who-dont-want-more-clutter': {
    primaryKeyword: 'Christmas gifts for women who dont want more clutter',
    secondaryKeywords: [
      'clutter free Christmas gifts for her',
      'consumable Christmas gifts for women',
      'minimalist holiday gifts for her',
      'non material gifts for women'
    ],
    focusTopic: 'Clutter-Free Christmas Gifts for Women',
    recipient: ['gifts-for-women', 'minimalists'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['clutter-free', 'consumable-gifts']
  },
  '21-christmas-gifts-for-a-woman-going-through-a-hard-year': {
    primaryKeyword: 'Christmas gifts for a woman going through a hard year',
    secondaryKeywords: [
      'comforting gifts for her Christmas',
      'care package gifts for women holiday',
      'encouragement gifts for women',
      'thoughtful grief gifts for her'
    ],
    focusTopic: 'Comforting Gifts for a Hard Year',
    recipient: ['gifts-for-women', 'loved-ones-in-need'],
    occasion: ['christmas-gifts', 'care-package'],
    holiday: ['christmas-gifts'],
    giftStyle: ['comfort-gifts', 'care-package']
  },
  '26-christmas-gifts-for-women-that-wont-end-up-in-a-drawer': {
    primaryKeyword: 'Christmas gifts for women that wont end up in a drawer',
    secondaryKeywords: [
      'useful Christmas gifts for women',
      'practical gifts for her she will actually use',
      'drawer proof Christmas gifts',
      'functional holiday gifts for women'
    ],
    focusTopic: 'Drawer-Proof Practical Gifts for Women',
    recipient: ['gifts-for-women', 'practical-women'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['practical-gifts', 'daily-use']
  },
  '18-christmas-gifts-for-women-on-a-tight-budget-this-year': {
    primaryKeyword: 'Christmas gifts for women on a tight budget',
    secondaryKeywords: [
      'affordable gifts for women Christmas',
      'budget holiday gifts for her',
      'cheap Christmas gifts for women',
      'money saving gifts for women'
    ],
    focusTopic: 'Tight-Budget Christmas Gifts for Women',
    recipient: ['gifts-for-women', 'budget-shoppers'],
    occasion: ['christmas-gifts', 'holiday-gifts'],
    holiday: ['christmas-gifts'],
    giftStyle: ['budget-gifts', 'thoughtful-on-a-budget']
  },

  // Differentiation for 6 existing duplicate primary keyword pairs:
  'best-christmas-gifts-for-mom-2026': {
    primaryKeyword: 'best Christmas gifts for mom 2026',
    secondaryKeywords: [
      'Christmas gifts for mom 2026',
      'top Christmas gifts for mother',
      'best holiday gift ideas for mom',
      'annual Christmas gift guide for mom'
    ]
  },
  '12-christmas-gifts-for-mom-she-will-actually-love': {
    primaryKeyword: 'Christmas gifts for mom she will actually love',
    secondaryKeywords: [
      'Christmas gifts for mom tested and reviewed',
      'foolproof Christmas gifts for mom',
      'gifts mom will really love Christmas',
      'practical and loving gifts for mom'
    ]
  },
  'outdoor-halloween-decorations-impress-neighbors': {
    primaryKeyword: 'outdoor Halloween decorations that impress neighbors',
    secondaryKeywords: [
      'neighborhood outdoor Halloween decor',
      'outdoor Halloween decorations to impress the whole neighborhood',
      'impressive outdoor Halloween setup',
      'spectacular exterior Halloween decor'
    ]
  },
  'outdoor-halloween-decorations': {
    primaryKeyword: 'outdoor Halloween decorations',
    secondaryKeywords: [
      'best outdoor Halloween decorations',
      'outdoor Halloween decor guide',
      'exterior Halloween decorating ideas',
      'ultimate outdoor Halloween guide'
    ]
  },
  'halloween-yard-ideas-after-dark': {
    primaryKeyword: 'Halloween yard ideas after dark',
    secondaryKeywords: [
      'nighttime Halloween yard ideas',
      'illuminated Halloween yard displays',
      'spooky yard ideas that look incredible after dark',
      'dark Halloween yard lighting'
    ]
  },
  'halloween-yard-ideas-skeletons-ghosts-gravestones': {
    primaryKeyword: 'Halloween yard ideas with skeletons and gravestones',
    secondaryKeywords: [
      'classic Halloween yard ideas skeletons ghosts gravestones',
      'traditional Halloween yard display',
      'cemetery and skeleton yard scene'
    ]
  },
  'outdoor-halloween-decor-spooky-entrance': {
    primaryKeyword: 'outdoor Halloween decor for spooky entrance',
    secondaryKeywords: [
      'how to create a spooky entrance Halloween',
      'spooky front entrance Halloween decor',
      'haunted entryway outdoor decor'
    ]
  },
  'outdoor-halloween-decor-day-and-night': {
    primaryKeyword: 'outdoor Halloween decor for day and night',
    secondaryKeywords: [
      'outdoor Halloween decor that looks good in daylight and night',
      'day to night Halloween outdoor displays',
      'versatile outdoor Halloween decor'
    ]
  },
  'halloween-front-yard-ideas-trick-or-treaters': {
    primaryKeyword: 'Halloween front yard ideas for trick-or-treaters',
    secondaryKeywords: [
      'delight trick or treaters front yard ideas',
      'kid-friendly Halloween front yard displays',
      'front yard decorations for trick or treaters'
    ]
  },
  'halloween-front-yard-ideas-without-gore': {
    primaryKeyword: 'Halloween front yard ideas without gore',
    secondaryKeywords: [
      'tasteful Halloween front yard ideas without gore',
      'non-gory Halloween yard decorations',
      'family-friendly non-scary front yard Halloween'
    ]
  },
  'vintage-halloween-decorations-classic-october-style': {
    primaryKeyword: 'classic vintage Halloween decorations',
    secondaryKeywords: [
      'classic October style vintage Halloween decor',
      'retro Halloween decorating style',
      'nostalgic October Halloween displays'
    ]
  },
  'vintage-halloween-decorations-treasures-from-the-past': {
    primaryKeyword: 'authentic vintage Halloween decorations from the past',
    secondaryKeywords: [
      'where to find real vintage Halloween decorations',
      'antique Halloween collectibles',
      'authentic retro Halloween treasures'
    ]
  }
};

// Apply updates to article files
let updatedFilesCount = 0;
const articlesIndex = fs.readFileSync('src/articles/index.ts', 'utf8');
const lines = articlesIndex.split('\n').filter(l => l.trim().startsWith('import article'));

for (const line of lines) {
  const m = line.match(/from "\.\/([^"]+)"/);
  if (!m) continue;
  const relPath = m[1];
  const fullPath = path.join('src/articles', `${relPath}.ts`);
  let content = fs.readFileSync(fullPath, 'utf8');

  const slugMatch = content.match(/slug:\s*"([^"]+)"/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];

  const update = METADATA_UPDATES[slug];
  if (!update) continue;

  let modified = false;

  // 1. Update or insert primaryKeyword
  if (content.includes('primaryKeyword:')) {
    content = content.replace(/primaryKeyword:\s*"[^"]*",?/, () => `primaryKeyword: "${update.primaryKeyword}",`);
    modified = true;
  } else {
    if (content.includes('canonicalUrl:')) {
      content = content.replace(/(canonicalUrl:\s*"[^"]*",?)/, (m) => `${m}\n  primaryKeyword: "${update.primaryKeyword}",`);
      modified = true;
    } else if (content.includes('featured:')) {
      content = content.replace(/(featured:\s*(?:true|false),?)/, (m) => `${m}\n  primaryKeyword: "${update.primaryKeyword}",`);
      modified = true;
    }
  }

  // 2. Update or insert secondaryKeywords
  const skFormatted = `secondaryKeywords: [\n    ${update.secondaryKeywords.map(k => `"${k}"`).join(',\n    ')}\n  ],`;
  if (content.includes('secondaryKeywords:')) {
    content = content.replace(/secondaryKeywords:\s*\[[\s\S]*?\],?/, () => skFormatted);
    modified = true;
  } else {
    content = content.replace(/(primaryKeyword:\s*"[^"]*",?)/, (m) => `${m}\n  ${skFormatted}`);
    modified = true;
  }

  // 3. Update focusTopic if provided
  if (update.focusTopic) {
    if (content.includes('focusTopic:')) {
      content = content.replace(/focusTopic:\s*"[^"]*",?/, () => `focusTopic: "${update.focusTopic}",`);
    } else {
      content = content.replace(/(secondaryKeywords:\s*\[[\s\S]*?\],?)/, (m) => `${m}\n  focusTopic: "${update.focusTopic}",`);
    }
    modified = true;
  }

  // 4. Update recipient if provided
  if (update.recipient && update.recipient.length) {
    const recFormatted = `recipient: [${update.recipient.map(r => `"${r}"`).join(', ')}],`;
    if (content.includes('recipient:')) {
      content = content.replace(/recipient:\s*\[[\s\S]*?\],?/, () => recFormatted);
    } else {
      content = content.replace(/(tags:\s*\[[\s\S]*?\],?)/, (m) => `${m}\n  ${recFormatted}`);
    }
    modified = true;
  }

  // 5. Update occasion if provided
  if (update.occasion && update.occasion.length) {
    const occFormatted = `occasion: [${update.occasion.map(o => `"${o}"`).join(', ')}],`;
    if (content.includes('occasion:')) {
      content = content.replace(/occasion:\s*\[[\s\S]*?\],?/, () => occFormatted);
    } else {
      content = content.replace(/(category:\s*"[^"]*",?)/, (m) => `${m}\n  ${occFormatted}`);
    }
    modified = true;
  }

  // 6. Update holiday if provided
  if (update.holiday) {
    const holFormatted = `holiday: [${update.holiday.map(h => `"${h}"`).join(', ')}],`;
    if (content.includes('holiday:')) {
      content = content.replace(/holiday:\s*\[[\s\S]*?\],?/, () => holFormatted);
    } else {
      content = content.replace(/(event:\s*"[^"]*",?)/, (m) => `${m}\n  ${holFormatted}`);
    }
    modified = true;
  }

  // 7. Update giftStyle if provided
  if (update.giftStyle && update.giftStyle.length) {
    const gsFormatted = `giftStyle: [${update.giftStyle.map(g => `"${g}"`).join(', ')}],`;
    if (content.includes('giftStyle:')) {
      content = content.replace(/giftStyle:\s*\[[\s\S]*?\],?/, () => gsFormatted);
    } else {
      content = content.replace(/(season:\s*"[^"]*",?)/, (m) => `${m}\n  ${gsFormatted}`);
    }
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    updatedFilesCount++;
  }
}

console.log(`Updated metadata in ${updatedFilesCount} article files.`);

