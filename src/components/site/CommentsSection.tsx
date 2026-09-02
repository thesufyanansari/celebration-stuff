import { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

export type CommentItem = {
  id: string;
  author: string;
  date: string;
  text: string;
  status: "approved" | "pending";
};

const DEFAULT_COMMENTS_MAP: Record<string, CommentItem[]> = {
  "outdoor-halloween-decorations-impress-neighbors": [
    {
      id: "c-outdoor-1",
      author: "SuburbanSpooks",
      date: "September 1, 2026",
      text: "The Elegear 12-foot ghost was the absolute talk of our cul-de-sac last year! The gauze fabric genuinely looks like it is floating when illuminated at night.",
      status: "approved",
    },
    {
      id: "c-outdoor-2",
      author: "Marcus_H",
      date: "August 30, 2026",
      text: "We invested in the Tekky Soul Harvester and it honestly looks like a theme park prop. Worth every penny if you love going all out for trick-or-treaters.",
      status: "approved",
    },
    {
      id: "c-outdoor-3",
      author: "Claire_Oakwood",
      date: "August 28, 2026",
      text: "The Jack O Lantern lantern set gave our porch walkway the exact warm architectural glow we wanted without looking tacky. Great recommendation!",
      status: "approved",
    },
    {
      id: "c-outdoor-4",
      author: "Todd_DIY",
      date: "August 25, 2026",
      text: "The metal spiderweb holds up through heavy wind and rain. Much better than messy fake webbing that gets ruined in two days.",
      status: "approved",
    },
  ],
  "outdoor-halloween-decor-budget-ideas": [
    {
      id: "c-budget-1",
      author: "SavvyDecorator",
      date: "September 1, 2026",
      text: "The metal stacked ghost looks like something from a boutique home catalog, and it was under $30! Unbelievable value.",
      status: "approved",
    },
    {
      id: "c-budget-2",
      author: "Danielle_P",
      date: "August 29, 2026",
      text: "We ordered the 2-ft spooky tree with the owl for our front stoop. The warm glow is so cozy and looks high-end.",
      status: "approved",
    },
  ],
  "easy-outdoor-halloween-decor-ideas": [
    {
      id: "c-easy-1",
      author: "BusyDad_Mike",
      date: "September 1, 2026",
      text: "The 10FT Grim Reaper inflatable took literally 3 minutes from opening the box to full inflation. My kids went wild!",
      status: "approved",
    },
    {
      id: "c-easy-2",
      author: "Jessica_W",
      date: "August 30, 2026",
      text: "I loathe hot glue crafts. The LED pumpkin flatback and metal spiderweb gave us instant curb appeal with zero stress.",
      status: "approved",
    },
  ],
  "outdoor-halloween-decor-every-vibe": [
    {
      id: "c-vibe-1",
      author: "ModernHomeDesign",
      date: "September 1, 2026",
      text: "The white LED metal cat is stunning! It looks like contemporary sculpture against our modern black porch siding.",
      status: "approved",
    },
    {
      id: "c-vibe-2",
      author: "WhimsicalMama",
      date: "August 31, 2026",
      text: "The 5.6-ft brown rabbit was such a fun, quirky addition. It stood out so refreshingly from standard skeletons!",
      status: "approved",
    },
  ],
  "classy-outdoor-halloween-decorations": [
    {
      id: "c-classy-1",
      author: "Eleanor_Style",
      date: "September 2, 2026",
      text: "Finally, Halloween decor that doesn't scream carnival! The cat & ghost pillar lanterns gave our front walk an elegant candlelit glow.",
      status: "approved",
    },
    {
      id: "c-classy-2",
      author: "David_K",
      date: "August 29, 2026",
      text: "The metal scarecrow was so tasteful that we kept it displayed right through Thanksgiving. True multi-season elegance.",
      status: "approved",
    },
  ],
  "transform-yard-overnight-halloween-decor": [
    {
      id: "c-transform-1",
      author: "WeekendWarrior",
      date: "September 1, 2026",
      text: "We set up the 12FT gauze ghost and the Jack O Lantern trio in one afternoon. Our yard looked like a professional haunted set by nightfall.",
      status: "approved",
    },
    {
      id: "c-transform-2",
      author: "Rachel_Stilts",
      date: "August 30, 2026",
      text: "The 7.2-foot stilt walker is a total traffic stopper! Cars were slowing down to take photos all evening.",
      status: "approved",
    },
  ],
  "outdoor-halloween-decor-every-style": [
    {
      id: "c-style-1",
      author: "VintageLover_88",
      date: "September 1, 2026",
      text: "The 3.3-ft candle blow mold gave me instant childhood nostalgia. It has that classic warm glow you can't find in modern plastic.",
      status: "approved",
    },
    {
      id: "c-style-2",
      author: "GothicManor",
      date: "August 28, 2026",
      text: "The Tekky Soul Harvester is pure cinema quality. Outstanding animatronic mechanics and eerie monologue.",
      status: "approved",
    },
  ],
  "neighborhood-favorite-halloween-decor": [
    {
      id: "c-neighbor-1",
      author: "BlockPartyHost",
      date: "September 2, 2026",
      text: "The suddenly surprise clown had our entire cul-de-sac howling with laughter. Kids kept coming back around the block!",
      status: "approved",
    },
    {
      id: "c-neighbor-2",
      author: "Sarah_B",
      date: "August 31, 2026",
      text: "Our house officially won the neighborhood Halloween crown thanks to this guide. The 12ft gauze ghost was legendary.",
      status: "approved",
    },
  ],
  "halloween-decor-beginners-guide": [
    {
      id: "c-begin-1",
      author: "FirstTimeHomeowner",
      date: "September 2, 2026",
      text: "As someone who had never decorated an outdoor yard before, this guide kept me from getting overwhelmed. The ghost sign and pumpkin flatback were foolproof!",
      status: "approved",
    },
    {
      id: "c-begin-2",
      author: "Lucas_M",
      date: "August 29, 2026",
      text: "Spent under $100 for three pieces and our front porch looked festive and warm without any complicated assembly.",
      status: "approved",
    },
  ],
  "halloween-decor-day-night": [
    {
      id: "c-daynight-1",
      author: "DayNightHost",
      date: "September 1, 2026",
      text: "Such a great point about daytime decor! The gauze ghost looks ethereal in natural sunlight and intensely luminous at night.",
      status: "approved",
    },
    {
      id: "c-daynight-2",
      author: "Amy_CurbAppeal",
      date: "August 28, 2026",
      text: "The Jack O lantern set looks beautiful sitting on our porch steps in broad daylight and guides trick-or-treaters safely after dark.",
      status: "approved",
    },
  ],
  "halloween-yard-ideas-beyond-inflatable": [
    {
      id: "c-beyond-1",
      author: "ArtisticYard_Greg",
      date: "September 2, 2026",
      text: "The 7-foot painting clown is brilliant! It felt like having a museum installation on our front lawn. People stopped constantly to take photos.",
      status: "approved",
    },
    {
      id: "c-beyond-2",
      author: "Maya_Oakland",
      date: "August 31, 2026",
      text: "We were so tired of the same generic inflatables on every lawn. The brown rabbit animatronic was quirky, fun, and completely unforgettable.",
      status: "approved",
    },
  ],
  "walk-through-haunted-yard-experience": [
    {
      id: "c-walkthrough-1",
      author: "HauntBuilder_Dan",
      date: "September 2, 2026",
      text: "Staging our lawn as a directional walk-through was a game changer for trick-or-treaters. The Spooky Jack O Set safely guided everyone straight into the Soul Harvester finale!",
      status: "approved",
    },
    {
      id: "c-walkthrough-2",
      author: "Chloe_West",
      date: "August 30, 2026",
      text: "The suddenly surprise clown at the corner turn had our neighbors screaming and laughing. Fantastic layout recommendations.",
      status: "approved",
    },
  ],
  "family-friendly-halloween-yard-ideas": [
    {
      id: "c-kidfriendly-1",
      author: "MamaOfThree",
      date: "September 2, 2026",
      text: "My 2-year-old and 4-year-old were obsessed with the bear on the rocking horse! It was the first year they didn't cry walking up the front porch.",
      status: "approved",
    },
    {
      id: "c-kidfriendly-2",
      author: "Brendan_H",
      date: "August 29, 2026",
      text: "The Ghost Family is so charming and sweet. It brings Halloween spirit without terrifying the neighborhood toddlers.",
      status: "approved",
    },
  ],
  "minimalist-halloween-yard-ideas": [
    {
      id: "c-minimalist-1",
      author: "DesignInspo_Mia",
      date: "September 2, 2026",
      text: "Finally a guide for people who appreciate architectural clean lines! The laser-cut metal cat with backlit LED is pure modern elegance.",
      status: "approved",
    },
    {
      id: "c-minimalist-2",
      author: "Julian_S",
      date: "August 28, 2026",
      text: "Three well-placed pieces created far more impact than our neighbor's chaotic clutter. The cat & ghost pillar lantern is exceptional quality.",
      status: "approved",
    },
  ],
  "diy-halloween-yard-ideas-home-items": [
    {
      id: "c-diy-1",
      author: "CraftyKelly",
      date: "September 2, 2026",
      text: "We made hanging sheet ghosts and paired them with the Haunted House flatback shortcut. Looked like a custom boutique display for under $50 total!",
      status: "approved",
    },
    {
      id: "c-diy-2",
      author: "Dave_Workbench",
      date: "August 30, 2026",
      text: "The shortcut concept is brilliant. Making tin can lanterns was fun with the kids, and adding the Spooky Jack O Set gave the whole path real polish.",
      status: "approved",
    },
  ],
  "small-space-halloween-yard-ideas": [
    {
      id: "c-smallspace-1",
      author: "TownhouseTara",
      date: "September 2, 2026",
      text: "Living in a brownstone with only three steps makes decorating tough. The flatback pumpkin and LED witch on broom maximized every inch!",
      status: "approved",
    },
    {
      id: "c-smallspace-2",
      author: "UrbanStoop_Sam",
      date: "August 31, 2026",
      text: "The tabletop potion-pouring witch sits neatly on our porch bistro table. Huge animatronic personality with zero floor footprint.",
      status: "approved",
    },
  ],
  "halloween-yard-decorations-light-up-night": [
    {
      id: "c-nightlight-1",
      author: "NightOwl_Decor",
      date: "September 2, 2026",
      text: "The internal lighting on the 12FT gauze ghost is mesmerizing in total darkness. You can spot the ethereal glow from three streets away!",
      status: "approved",
    },
    {
      id: "c-nightlight-2",
      author: "Liam_Lights",
      date: "August 29, 2026",
      text: "The neon purple bat gave our porch entry an electric modern glow. Crisp, vibrant, and impossible to miss.",
      status: "approved",
    },
  ],
  "spooky-graveyard-yard-scene": [
    {
      id: "c-graveyard-1",
      author: "CryptKeeper_Rob",
      date: "September 2, 2026",
      text: "The rising head creepy girl in our fresh mulch bed looked like something out of a horror film! Trick-or-treaters dared each other to walk past.",
      status: "approved",
    },
    {
      id: "c-graveyard-2",
      author: "Heather_Spooky",
      date: "August 30, 2026",
      text: "The triple zombie girls synchronized head turns created an instant cemetery scene across our front yard. Phenomenal presence.",
      status: "approved",
    },
  ],
  "stylish-halloween-porch-decorations": [
    {
      id: "c-stylishporch-1",
      author: "FrontDoorStyle_K",
      date: "September 2, 2026",
      text: "Flanking our front door with the matching cat & ghost pillar lanterns gave our porch the symmetry and elegance of a magazine spread.",
      status: "approved",
    },
    {
      id: "c-stylishporch-2",
      author: "Evelyn_Hostess",
      date: "August 31, 2026",
      text: "Our dinner guests raved about the warm glowing ghost sign. It set such a warm, welcoming tone before anyone even rang the bell.",
      status: "approved",
    },
  ],
  "whimsical-halloween-porch-decorations": [
    {
      id: "c-whimsical-1",
      author: "FairyTaleMama",
      date: "September 2, 2026",
      text: "The girl with the umbrella is enchanting! The music box tune and gentle turning parasol feels straight out of an illustrated fairytale.",
      status: "approved",
    },
    {
      id: "c-whimsical-2",
      author: "GiggleHost_Tom",
      date: "August 28, 2026",
      text: "The neon turkey had all our neighbors laughing out loud! We're leaving it up right through Thanksgiving dinner.",
      status: "approved",
    },
  ],
  "high-end-halloween-porch-decorations": [
    {
      id: "c-highend-1",
      author: "CuratedHome_Elena",
      date: "September 2, 2026",
      text: "The black metal cat sculpture looks like it was purchased at an architectural gallery. Everyone assumes we spent hundreds of dollars on it!",
      status: "approved",
    },
    {
      id: "c-highend-2",
      author: "Marcus_Architect",
      date: "August 30, 2026",
      text: "Flocked pumpkin stacks paired with clean metal silhouettes gave our front entry a tailored, high-end look without the tacky plastic clutter.",
      status: "approved",
    },
  ],
  "pumpkin-hay-bale-porch-ideas": [
    {
      id: "c-haybale-1",
      author: "CountryLiving_Jen",
      date: "September 2, 2026",
      text: "Stacking the Spooky Jack O Set on straw bales was the perfect rustic touch. It gave our front stoop so much height and warm harvest charm.",
      status: "approved",
    },
    {
      id: "c-haybale-2",
      author: "FallLover_Brad",
      date: "August 31, 2026",
      text: "The contrast of the sleek metal cat perched on top of golden straw was stunning. Neighbors constantly stopped to compliment the layout.",
      status: "approved",
    },
  ],
  "halloween-porch-decor-daylight": [
    {
      id: "c-daylight-1",
      author: "SunnyStoop_Claire",
      date: "September 2, 2026",
      text: "So relieved to finally have decorations that look gorgeous at 2 PM! The metal cat and stacked ghost look like fine garden art in direct sunlight.",
      status: "approved",
    },
    {
      id: "c-daylight-2",
      author: "NeighborhoodWalk_Ted",
      date: "August 29, 2026",
      text: "No more deflated inflatable eyesores in the afternoon. The blow mold candle and carved jack-o'-lanterns have bold presence 24 hours a day.",
      status: "approved",
    },
  ],
  "quick-easy-halloween-porch-decor": [
    {
      id: "c-quickdecor-1",
      author: "BusyDad_Kevin",
      date: "September 2, 2026",
      text: "Literally set up the ghost sign, flatback pumpkin, and lantern in under 15 minutes before our dinner party. Zero tools and it looked fantastic!",
      status: "approved",
    },
    {
      id: "c-quickdecor-2",
      author: "NurseMom_Laura",
      date: "August 30, 2026",
      text: "Working 12-hour shifts left me no time for elaborate DIY. These plug-and-play pieces saved Halloween for my kids in half an hour flat.",
      status: "approved",
    },
  ],
  "halloween-porch-decor-statement-not-over-the-top": [
    {
      id: "c-statement-1",
      author: "RestrainedElegance_S",
      date: "September 2, 2026",
      text: "Three well-chosen focal pieces created ten times more curb appeal than our neighbor's chaotic display. The pillar lantern is breathtaking.",
      status: "approved",
    },
    {
      id: "c-statement-2",
      author: "ModernHome_Greg",
      date: "August 31, 2026",
      text: "Bold yet dignified. The warm white LED illumination kept our front entrance feeling inviting and sophisticated rather than like a carnival.",
      status: "approved",
    },
  ],
  "vintage-halloween-yard-decor-ideas": [
    {
      id: "c-vintageyard-1",
      author: "RetroFan_Donna",
      date: "September 2, 2026",
      text: "The blow mold candle brought back so many cherished childhood memories of Halloween in the 1970s. The warm amber glow is pure nostalgia.",
      status: "approved",
    },
    {
      id: "c-vintageyard-2",
      author: "ClassicCollector_Tim",
      date: "August 28, 2026",
      text: "The jack-o'-lantern trio has that authentic carved smile you just don't see in modern props. Truly timeless front yard decor.",
      status: "approved",
    },
  ],
  "creepy-vintage-halloween-decorations": [
    {
      id: "c-creepyvintage-1",
      author: "GothicFolklore_Val",
      date: "September 2, 2026",
      text: "This old-fashioned aesthetic creates genuine spine-tingling atmosphere without relying on fake gore. The haunted village set is hypnotic.",
      status: "approved",
    },
    {
      id: "c-creepyvintage-2",
      author: "GhostStory_Aaron",
      date: "August 30, 2026",
      text: "The flickering candle blow molds and ghost family look like a scene from an antique supernatural novel. Phenomenal mood.",
      status: "approved",
    },
  ],
  "vintage-horror-film-halloween-yard": [
    {
      id: "c-horrorfilm-1",
      author: "CinemaBuff_Nate",
      date: "September 2, 2026",
      text: "The German expressionist shadow lighting advice was brilliant! Casting long chiaroscuro shadows with the candle transformed our whole lawn.",
      status: "approved",
    },
    {
      id: "c-horrorfilm-2",
      author: "SilentFilmFan_Rachel",
      date: "August 29, 2026",
      text: "The antique creepy doll and crooked manor facades made our yard look like the set of The Cabinet of Dr. Caligari. cinephile perfection.",
      status: "approved",
    },
  ],
  "vintage-harvest-halloween-decorations": [
    {
      id: "c-vintageharvest-1",
      author: "FarmhouseFolk_Hannah",
      date: "September 2, 2026",
      text: "The metal scarecrow and warm glowing candle blend seamlessly from October right through Thanksgiving dinner. Beautiful autumn warmth.",
      status: "approved",
    },
    {
      id: "c-vintageharvest-2",
      author: "HarvestHome_Peter",
      date: "August 31, 2026",
      text: "Soft flocked pumpkin stacks and friendly ghost silhouettes captured the nostalgic harvest festival feeling of our small hometown.",
      status: "approved",
    },
  ],
  "authentic-vintage-halloween-decor": [
    {
      id: "c-authenticvintage-1",
      author: "AntiqueAppraiser_Diane",
      date: "September 2, 2026",
      text: "Finally, vintage decor made with substantial materials! The heavy blow mold candle and solid steel cat feel like genuine family heirlooms.",
      status: "approved",
    },
    {
      id: "c-authenticvintage-2",
      author: "MidCenturyLover_Kyle",
      date: "August 28, 2026",
      text: "No flimsy plastic or tacky multi-colored LEDs. The warm amber lighting and authentic retro molds make our house look historically curated.",
      status: "approved",
    },
  ],
  "vintage-repurposed-halloween-decor": [
    {
      id: "c-repurposed-1",
      author: "SalvageQueen_Becca",
      date: "September 2, 2026",
      text: "Leaning our old barn ladder on the porch with the cat pillar lantern and mini pumpkins was an absolute showstopper. Zero waste and looks like a boutique display!",
      status: "approved",
    },
    {
      id: "c-repurposed-2",
      author: "RusticThrifter_Dan",
      date: "August 31, 2026",
      text: "Setting the Haunted House Flatback inside an antique 6-pane window frame turned it into a 3D shadowbox. Our neighbors keep asking where we bought it!",
      status: "approved",
    },
  ],
  "collectible-vintage-halloween-decor": [
    {
      id: "c-collectible-1",
      author: "AmericanaCollector_Sam",
      date: "September 2, 2026",
      text: "The blow mold candle is constructed with the thick, durable plastic of vintage originals, but the modern LED wiring gives total peace of mind in the rain.",
      status: "approved",
    },
    {
      id: "c-collectible-2",
      author: "AntiquesDaily_Rachel",
      date: "August 30, 2026",
      text: "The three-piece haunted manor set looks like an expensive architectural model. It's staying displayed on our mantle through Thanksgiving.",
      status: "approved",
    },
  ],
  "mix-old-new-vintage-halloween-decor": [
    {
      id: "c-mixoldnew-1",
      author: "TransitionalDesign_Amy",
      date: "September 2, 2026",
      text: "Combining the retro blow mold with the crisp laser-cut steel cat completely elevated our front stoop. It feels curated and stylish rather than kitschy.",
      status: "approved",
    },
    {
      id: "c-mixoldnew-2",
      author: "ModernVintage_Leo",
      date: "August 29, 2026",
      text: "Keeping the light temperatures warm across both modern steel and retro blow molds made everything look completely cohesive. Brilliant styling tips!",
      status: "approved",
    },
  ],
  "childhood-nostalgia-vintage-halloween-decor": [
    {
      id: "c-childhood-1",
      author: "80sKid_Jessica",
      date: "September 2, 2026",
      text: "Seeing that glowing blow mold candle lit up at dusk brought back an overwhelming rush of walking home from elementary school in October. Pure comfort.",
      status: "approved",
    },
    {
      id: "c-childhood-2",
      author: "AutumnMemories_Mark",
      date: "August 28, 2026",
      text: "The carved jack-o'-lantern lantern set looks just like the pumpkins my dad and I used to carve on newspaper in the kitchen. My kids love them too.",
      status: "approved",
    },
  ],
  "unforgettable-halloween-party-themes": [
    {
      id: "c-unforgettable-1",
      author: "HostessWithTheMostess_Chloe",
      date: "September 2, 2026",
      text: "We hosted the Vampire Speakeasy theme last weekend! The candle blow molds, velvet runners, and Sazerac cocktails made it the party of the year.",
      status: "approved",
    },
    {
      id: "c-unforgettable-2",
      author: "EventPlanner_Dave",
      date: "August 30, 2026",
      text: "The budget and timeline breakdown was spot-on. Focusing money on lighting rather than plastic knickknacks gave us five times the visual impact.",
      status: "approved",
    },
  ],
  "haunted-house-party-at-home-ideas": [
    {
      id: "c-homehaunt-1",
      author: "ScareMaster_Rob",
      date: "September 2, 2026",
      text: "Hiding the suddenly surprise clown around the hallway corner had our friends screaming at the top of their lungs! The floor path lighting kept everyone safe.",
      status: "approved",
    },
    {
      id: "c-homehaunt-2",
      author: "ThrillerMom_Sarah",
      date: "August 31, 2026",
      text: "The dual-path idea (gentle path for little cousins and scare path for teens) was a genius lifesaver. Everyone had fun without any tears!",
      status: "approved",
    },
  ],
  "spooky-halloween-party-decoration-ideas": [
    {
      id: "c-spookymood-1",
      author: "MoodLightingFan_Olivia",
      date: "September 2, 2026",
      text: "Cutting overhead lights and relying only on the pillar lanterns and blow mold candles transformed our townhouse into an enchanted movie set.",
      status: "approved",
    },
    {
      id: "c-spookymood-2",
      author: "GothicHost_Martin",
      date: "August 29, 2026",
      text: "The animated witch pouring potions on the cocktail cart was an instant guest magnet. Everyone was filming drinks next to her bubbling cauldron.",
      status: "approved",
    },
  ],
  "sophisticated-adult-halloween-party-themes": [
    {
      id: "c-sophisticated-1",
      author: "Sommelier_Julian",
      date: "September 2, 2026",
      text: "The Haunted Masquerade Ball theme was so refreshing. Guests loved dressing up in formal velvet and lace. The black steel cat anchored the bar with pure elegance.",
      status: "approved",
    },
    {
      id: "c-sophisticated-2",
      author: "ChicHostess_Claire",
      date: "August 30, 2026",
      text: "No tacky plastic skeletons in sight. The black and gold table staging with the illuminated owl tree felt like an upscale autumn gala.",
      status: "approved",
    },
  ],
  "halloween-house-party-entertainment-ideas": [
    {
      id: "c-entertainment-1",
      author: "GameNight_Tyler",
      date: "September 2, 2026",
      text: "The mummy wrap relay and photo scavenger hunt had our entire living room in stitches! Pacing games between snacks kept the party rolling past midnight.",
      status: "approved",
    },
    {
      id: "c-entertainment-2",
      author: "SocialButterfly_Hannah",
      date: "August 31, 2026",
      text: "Having the horror movie marathon lounge in the den gave our introverted friends a cozy recharge space while the rest of us danced. Perfect balance.",
      status: "approved",
    },
  ],
  "halloween-party-themes-kids-adults": [
    {
      id: "c-kidsadults-1",
      author: "FamilyFirst_Megan",
      date: "September 2, 2026",
      text: "The Pumpkin Patch party was the easiest party I've ever hosted. Kids painted pumpkins on hay bales while the parents enjoyed hot spiked cider by the fire.",
      status: "approved",
    },
    {
      id: "c-kidsadults-2",
      author: "NeighborhoodDad_Ken",
      date: "August 29, 2026",
      text: "The carnival midway games kept 15 kids happily occupied for two hours straight! Highly recommend the ghost ring toss.",
      status: "approved",
    },
  ],
  "haunted-mansion-living-room-decor": [
    {
      id: "c-hauntedmansion-1",
      author: "ParlorGhost_Eleanor",
      date: "September 2, 2026",
      text: "Swapping our lamps for the Cat & Ghost column lantern and blow mold candle completely transformed our modern living room into an eerie 19th-century parlor. Guests were spellbound!",
      status: "approved",
    },
    {
      id: "c-hauntedmansion-2",
      author: "VictorianLover_Mark",
      date: "September 1, 2026",
      text: "The 3-piece haunted house set looks so high-end on our fireplace mantel. Paired with Spanish moss, it looked like an authentic miniature estate.",
      status: "approved",
    },
  ],
  "extra-halloween-party-themes": [
    {
      id: "c-extrathemes-1",
      author: "MaximalistVibes_Chloe",
      date: "September 2, 2026",
      text: "The Over-the-Top Haunted Carnival with the 7.2-ft stilt walker blew everyone away! Nobody in our friend group will ever settle for a basic costume party again.",
      status: "approved",
    },
    {
      id: "c-extrathemes-2",
      author: "DramaticParty_Derek",
      date: "August 31, 2026",
      text: "We went all-in on the Celestial Witch Gathering. Dark velvet drapes, tarot cards, and the glowing owl tree made the living room look otherworldly.",
      status: "approved",
    },
  ],
  "low-prep-halloween-party-ideas": [
    {
      id: "c-lowprep-1",
      author: "BusyMom_Sarah",
      date: "September 2, 2026",
      text: "The Halloween Game Night idea was a lifesaver. Setting out the ghost sign and two blow mold candles took literally 5 minutes, but the vibe was 100% festive.",
      status: "approved",
    },
    {
      id: "c-lowprep-2",
      author: "HostOnTheFly_Alex",
      date: "August 30, 2026",
      text: "The BYO-Ghost Sheet party was hilarious and required zero costume stress. The floating ghost family on the porch set the mood instantly.",
      status: "approved",
    },
  ],
  "movie-tv-halloween-party-themes": [
    {
      id: "c-movietv-1",
      author: "Cinephile_Sam",
      date: "September 2, 2026",
      text: "Our Stranger Things Upside Down living room was a smash hit! The column lantern provided that gritty retro basement lighting without being pitch black.",
      status: "approved",
    },
    {
      id: "c-movietv-2",
      author: "BurtonFanatic_Jen",
      date: "September 1, 2026",
      text: "Beetlejuice black-and-white stripes paired with the glowing haunted house flatback felt straight out of the film attic scene. Such creative ideas!",
      status: "approved",
    },
  ],
  "outdoor-halloween-decor-party-atmosphere": [
    {
      id: "c-partyatmo-1",
      author: "PatioEntertainer_Greg",
      date: "September 2, 2026",
      text: "Using the jack-o'-lantern trio as pathway lights was brilliant. Guests navigated the dark lawn safely while feeling like they walked into a festival.",
      status: "approved",
    },
    {
      id: "c-partyatmo-2",
      author: "AtmosphereQueen_Tara",
      date: "August 31, 2026",
      text: "The suddenly surprise clown around the patio corner had our entire neighborhood screaming with laughter. The perfect party icebreaker.",
      status: "approved",
    },
  ],
  "indoor-outdoor-halloween-decor-ideas": [
    {
      id: "c-inoutdoor-1",
      author: "PracticalDecorator_Lisa",
      date: "September 2, 2026",
      text: "Being able to bring the candle blow mold and laser-cut cat from the porch directly to the fireplace mantel saved us so much storage space and money.",
      status: "approved",
    },
    {
      id: "c-inoutdoor-2",
      author: "SeamlessStyle_Dave",
      date: "September 1, 2026",
      text: "The flatback haunted house design is pure genius. Looks flush on porch siding and equally sharp on an indoor picture ledge.",
      status: "approved",
    },
  ],
  "halloween-photo-stunning-decor": [
    {
      id: "c-photostun-1",
      author: "InstaShooter_Brittany",
      date: "September 2, 2026",
      text: "Ditching the camera flash and using the warm amber blow molds and column lanterns gave everyone's costume photos that warm, magazine-quality glow.",
      status: "approved",
    },
    {
      id: "c-photostun-2",
      author: "PhotoBoothPro_Leo",
      date: "August 31, 2026",
      text: "The posable LED skeleton and Girl with Umbrella were constant posing companions in our photo corner. Every single guest posted pictures!",
      status: "approved",
    },
  ],
  "halloween-decor-party-combos": [
    {
      id: "c-partycombos-1",
      author: "DesignPairings_Rachel",
      date: "September 2, 2026",
      text: "The Grand Entrance combo (Ghost Sign + Pillar Lantern) took our front stoop from basic to boutique hotel in less than ten minutes.",
      status: "approved",
    },
    {
      id: "c-partycombos-2",
      author: "YardCurator_Marcus",
      date: "September 1, 2026",
      text: "Pairing the Stilt Walker with the laser-cut black cat grounded the display so nicely. Vertical scale plus ground-level polish made all the difference.",
      status: "approved",
    },
  ],
  "halloween-decor-every-space": [
    {
      id: "c-everyspace-1",
      author: "WholeHouseHost_Amanda",
      date: "September 2, 2026",
      text: "Breaking the home into four distinct zones made decorating feel manageable. Guests loved that the festive atmosphere flowed from porch right into the parlor.",
      status: "approved",
    },
    {
      id: "c-everyspace-2",
      author: "EntrywayObsessed_Dan",
      date: "August 30, 2026",
      text: "Continuing the glowing pumpkin path from the steps straight into the foyer tile connected our entire home seamlessly.",
      status: "approved",
    },
  ],
  "spooky-not-scary-halloween-decor": [
    {
      id: "c-spookynotscary-1",
      author: "ToddlerParent_Emily",
      date: "September 2, 2026",
      text: "My 3-year-old was actually excited to walk up to our front porch this year instead of hiding behind my legs. The rocking bear and friendly ghost family are pure magic.",
      status: "approved",
    },
    {
      id: "c-spookynotscary-2",
      author: "NeighborhoodMom_Jessica",
      date: "September 1, 2026",
      text: "Adult neighbors praised the stylish warm amber lighting and vintage blow molds, while all the neighborhood kids loved the smiling pumpkins. Perfect balance!",
      status: "approved",
    },
  ],
  "baby-halloween-costumes-ideas-extra-fun-halloween-night": [
    {
      id: "c-baby-fun-1",
      author: "FunMom",
      date: "October 31, 2026",
      text: "The avocado costume brought so much fun to Halloween night! Everyone was laughing and taking photos.",
      status: "approved",
    },
    {
      id: "c-baby-fun-2",
      author: "DisneyDad",
      date: "October 30, 2026",
      text: "The Pua costume was so much fun! My baby wore it all night and everyone loved it.",
      status: "approved",
    },
    {
      id: "c-baby-fun-3",
      author: "CreativeMom",
      date: "October 29, 2026",
      text: "The glowing octopus costume was the highlight of Halloween night! It brought so much extra fun.",
      status: "approved",
    },
    {
      id: "c-baby-fun-4",
      author: "FirstTimeMom",
      date: "October 28, 2026",
      text: "The pumpkin costume brought classic fun to my baby's first Halloween. So adorable!",
      status: "approved",
    },
    {
      id: "c-baby-fun-5",
      author: "FunnyDad",
      date: "October 27, 2026",
      text: "The shrimp costume brought extra laughs to Halloween night. My son was the funniest baby around!",
      status: "approved",
    },
  ],
  "baby-halloween-costumes-ideas-cute-classic-creative": [
    {
      id: "c-baby-ccc-1",
      author: "CuteMom",
      date: "October 31, 2026",
      text: "The flamingo costume is so cute! My daughter looked adorable. Perfect for photos!",
      status: "approved",
    },
    {
      id: "c-baby-ccc-2",
      author: "ClassicDad",
      date: "October 30, 2026",
      text: "The Mickey Mouse costume is a classic! My baby looked so adorable in it.",
      status: "approved",
    },
    {
      id: "c-baby-ccc-3",
      author: "CreativeMom",
      date: "October 29, 2026",
      text: "The avocado costume was so creative! Everyone loved it. My son was the star!",
      status: "approved",
    },
    {
      id: "c-baby-ccc-4",
      author: "GrandmaJoy",
      date: "October 28, 2026",
      text: "The lamb costume is the sweetest thing ever! My granddaughter looked like a little cloud.",
      status: "approved",
    },
    {
      id: "c-baby-ccc-5",
      author: "FunnyDad",
      date: "October 27, 2026",
      text: "The shrimp costume was hilarious and creative! My son was the talk of the party.",
      status: "approved",
    },
  ],
  "baby-halloween-costumes-ideas-picture-perfect-moments": [
    {
      id: "c-baby-photo-1",
      author: "PhotoMom",
      date: "October 31, 2026",
      text: "The flamingo costume photographed beautifully! I got so many amazing shots of my daughter. She was perfect!",
      status: "approved",
    },
    {
      id: "c-baby-photo-2",
      author: "DisneyDad",
      date: "October 30, 2026",
      text: "The Pua costume was so photogenic! My baby looked adorable in every photo.",
      status: "approved",
    },
    {
      id: "c-baby-photo-3",
      author: "CreativeMom",
      date: "October 29, 2026",
      text: "The glowing octopus costume created magical nighttime photos! My baby was the star of the photo shoot.",
      status: "approved",
    },
    {
      id: "c-baby-photo-4",
      author: "FirstTimeMom",
      date: "October 28, 2026",
      text: "The pumpkin costume gave us the most adorable first Halloween photos. So picture-perfect!",
      status: "approved",
    },
    {
      id: "c-baby-photo-5",
      author: "FunnyDad",
      date: "October 27, 2026",
      text: "The avocado costume was hilarious and made for such fun photos! My son was the star.",
      status: "approved",
    },
  ],
  "baby-halloween-costumes-ideas-steal-the-show": [
    {
      id: "c-baby-steal-1",
      author: "ShowMom",
      date: "October 31, 2026",
      text: "The flamingo costume was a showstopper! Everyone stopped to take photos of my daughter. She was the star!",
      status: "approved",
    },
    {
      id: "c-baby-steal-2",
      author: "DisneyDad",
      date: "October 30, 2026",
      text: "The Pua costume was a hit! My baby looked adorable and everyone recognized it. Best showstopper ever!",
      status: "approved",
    },
    {
      id: "c-baby-steal-3",
      author: "CreativeMom",
      date: "October 29, 2026",
      text: "The glowing octopus costume stole the show! My baby was the star of the Halloween party. The lights were amazing!",
      status: "approved",
    },
    {
      id: "c-baby-steal-4",
      author: "FirstTimeMom",
      date: "October 28, 2026",
      text: "The pumpkin costume is classic and my baby was the star of her first Halloween. So adorable!",
      status: "approved",
    },
    {
      id: "c-baby-steal-5",
      author: "FunnyDad",
      date: "October 27, 2026",
      text: "The avocado costume was a showstopper! My son was the star of the party and everyone laughed!",
      status: "approved",
    },
  ],
  "baby-halloween-costumes-ideas-too-cute-to-spook": [
    {
      id: "c-baby-toocute-1",
      author: "CuteMom",
      date: "October 31, 2026",
      text: "The lamb costume is the cutest thing ever! My baby looked like a little cloud. Everyone said 'aww!'",
      status: "approved",
    },
    {
      id: "c-baby-toocute-2",
      author: "DisneyMom",
      date: "October 30, 2026",
      text: "The Pua costume is so soft and cozy. My cute baby wore it all day without any fussing.",
      status: "approved",
    },
    {
      id: "c-baby-toocute-3",
      author: "FirstTimeMom",
      date: "October 29, 2026",
      text: "The pumpkin costume is classic and perfect for my cute baby's first Halloween. So adorable!",
      status: "approved",
    },
    {
      id: "c-baby-toocute-4",
      author: "GrandmaJoy",
      date: "October 28, 2026",
      text: "The chick costume made my granddaughter look like the cutest little bird. I couldn't stop taking photos!",
      status: "approved",
    },
    {
      id: "c-baby-toocute-5",
      author: "FunnyDad",
      date: "October 27, 2026",
      text: "The avocado costume is so cute! My little one was the star of the party.",
      status: "approved",
    },
  ],
  "baby-halloween-costumes-ideas-sweetest-trick-or-treater": [
    {
      id: "c-baby-sweet-1",
      author: "SweetMom",
      date: "October 31, 2026",
      text: "The lamb costume is the sweetest thing ever! My baby looked like a little cloud. Everyone said 'aww!'",
      status: "approved",
    },
    {
      id: "c-baby-sweet-2",
      author: "DisneyMom",
      date: "October 30, 2026",
      text: "The Pua costume is so soft and cozy. My sweet baby wore it all day without any fussing.",
      status: "approved",
    },
    {
      id: "c-baby-sweet-3",
      author: "FirstTimeMom",
      date: "October 29, 2026",
      text: "The pumpkin costume is classic and perfect for my sweet baby's first Halloween. So adorable!",
      status: "approved",
    },
    {
      id: "c-baby-sweet-4",
      author: "GrandmaJoy",
      date: "October 28, 2026",
      text: "The chick costume made my granddaughter look like the sweetest little bird. I couldn't stop taking photos!",
      status: "approved",
    },
    {
      id: "c-baby-sweet-5",
      author: "FunnyDad",
      date: "October 27, 2026",
      text: "The avocado costume is so cute! My sweet little one was the star of the party.",
      status: "approved",
    },
  ],
  "baby-halloween-costumes-ideas-star-of-halloween": [
    {
      id: "c-baby-star-1",
      author: "StarMom",
      date: "October 30, 2026",
      text: "The flamingo costume made my daughter the star of the neighborhood! Everyone stopped to take pictures. So cute!",
      status: "approved",
    },
    {
      id: "c-baby-star-2",
      author: "DisneyDad",
      date: "October 29, 2026",
      text: "The Pua costume was a hit! My baby looked adorable and everyone recognized it. Best costume ever!",
      status: "approved",
    },
    {
      id: "c-baby-star-3",
      author: "CreativeMom",
      date: "October 28, 2026",
      text: "The glowing octopus costume was amazing! My baby was the star of the Halloween party. The lights were such a hit!",
      status: "approved",
    },
    {
      id: "c-baby-star-4",
      author: "FirstTimeMom",
      date: "October 27, 2026",
      text: "The pumpkin costume is classic and perfect for my baby's first Halloween. So adorable!",
      status: "approved",
    },
    {
      id: "c-baby-star-5",
      author: "FunnyDad",
      date: "October 26, 2026",
      text: "The avocado costume had everyone laughing. My son was the star of the party!",
      status: "approved",
    },
  ],
  "baby-halloween-costumes-ideas-adorable-to-spooktacular": [
    {
      id: "c-baby-spooky-1",
      author: "HappyMom",
      date: "October 30, 2026",
      text: "The flamingo costume is adorable! My daughter looked like a little tropical bird. So cute!",
      status: "approved",
    },
    {
      id: "c-baby-spooky-2",
      author: "SpookyDad",
      date: "October 29, 2026",
      text: "The bat costume was perfect for my little one. Spooky but still adorable!",
      status: "approved",
    },
    {
      id: "c-baby-spooky-3",
      author: "DisneyMom",
      date: "October 28, 2026",
      text: "The Pua costume is so soft and cozy. My baby wore it all day without any fussing.",
      status: "approved",
    },
    {
      id: "c-baby-spooky-4",
      author: "FirstTimeMom",
      date: "October 27, 2026",
      text: "The pumpkin costume is classic and perfect for my baby's first Halloween. So adorable!",
      status: "approved",
    },
    {
      id: "c-baby-spooky-5",
      author: "FunnyDad",
      date: "October 26, 2026",
      text: "The avocado costume had everyone laughing. My son was the star of the party!",
      status: "approved",
    },
  ],
  "baby-halloween-costumes-ideas-youll-want-to-try": [
    {
      id: "c-baby-musttry-1",
      author: "HappyMom",
      date: "October 28, 2026",
      text: "The flamingo costume is adorable! My daughter looked like a little tropical bird. So cute!",
      status: "approved",
    },
    {
      id: "c-baby-musttry-2",
      author: "FunnyDad",
      date: "October 27, 2026",
      text: "The avocado costume had everyone laughing. My son was the star of the party!",
      status: "approved",
    },
    {
      id: "c-baby-musttry-3",
      author: "DisneyMom",
      date: "October 26, 2026",
      text: "The Pua costume is so soft and cozy. My baby wore it all day without any fussing.",
      status: "approved",
    },
    {
      id: "c-baby-musttry-4",
      author: "FirstTimeMom",
      date: "October 25, 2026",
      text: "The pumpkin costume is classic and perfect for my baby's first Halloween. So adorable!",
      status: "approved",
    },
    {
      id: "c-baby-musttry-5",
      author: "TwinMom",
      date: "October 24, 2026",
      text: "We got matching Mickey Mouse costumes for our twins. They looked so cute!",
      status: "approved",
    },
  ],
  "creative-baby-halloween-costume-ideas": [
    {
      id: "c-baby-creative-1",
      author: "CreativeMom",
      date: "October 25, 2026",
      text: "The bubble tea baby costume was a hit at our Halloween party! So creative and easy to make. My baby looked adorable!",
      status: "approved",
    },
    {
      id: "c-baby-creative-2",
      author: "DIY_Dad",
      date: "October 24, 2026",
      text: "I made the dinosaur costume from the tutorial and it turned out amazing! My son was the star of the neighborhood. So worth the effort!",
      status: "approved",
    },
    {
      id: "c-baby-creative-3",
      author: "PunnyParent",
      date: "October 23, 2026",
      text: "The business baby costume cracked everyone up. My daughter as CEO of Drool Operations was the funniest thing I've ever seen!",
      status: "approved",
    },
    {
      id: "c-baby-creative-4",
      author: "HarryPotterMom",
      date: "October 22, 2026",
      text: "The Dobby costume was perfect for my little one. Gave him a sock and everything. Harry Potter fans loved it!",
      status: "approved",
    },
  ],
  "fun-easy-baby-halloween-costumes-ideas-2026": [
    {
      id: "c-baby-funeasy-1",
      author: "BusyMom",
      date: "October 30, 2026",
      text: "The zipper rompers are a lifesaver! My baby doesn't like getting dressed, but these are so easy to put on. Love them!",
      status: "approved",
    },
    {
      id: "c-baby-funeasy-2",
      author: "FunnyDad",
      date: "October 29, 2026",
      text: "The shrimp costume is hilarious! My son was the talk of the neighborhood.",
      status: "approved",
    },
    {
      id: "c-baby-funeasy-3",
      author: "DisneyMom",
      date: "October 28, 2026",
      text: "The Pua costume is so soft and easy to wear. My baby wore it all day!",
      status: "approved",
    },
    {
      id: "c-baby-funeasy-4",
      author: "FirstTimeMom",
      date: "October 27, 2026",
      text: "The pumpkin romper was perfect for my baby's first Halloween. So cute and comfortable!",
      status: "approved",
    },
  ],
  "best-baby-halloween-costume-ideas-cutest-look": [
    {
      id: "c-baby-cutest-1",
      author: "ProudMom",
      date: "October 28, 2026",
      text: "The flamingo costume is adorable! My daughter looked like a little tropical bird. So cute!",
      status: "approved",
    },
    {
      id: "c-baby-cutest-2",
      author: "FunnyDad",
      date: "October 27, 2026",
      text: "The avocado costume had everyone laughing. My son was the star of the party!",
      status: "approved",
    },
    {
      id: "c-baby-cutest-3",
      author: "DisneyMom",
      date: "October 26, 2026",
      text: "The Pua costume is so soft and cozy. My baby wore it all day without any fussing.",
      status: "approved",
    },
    {
      id: "c-baby-cutest-4",
      author: "FirstTimeMom",
      date: "October 25, 2026",
      text: "The pumpkin costume is classic and perfect for my baby's first Halloween. So adorable!",
      status: "approved",
    },
    {
      id: "c-baby-cutest-5",
      author: "TwinMom",
      date: "October 24, 2026",
      text: "We got matching Mickey Mouse costumes for our twins. They looked so cute!",
      status: "approved",
    },
  ],
  "best-baby-halloween-costume-ideas-boys-girls-twins": [
    {
      id: "c-baby-hw-1",
      author: "TwinMom",
      date: "October 25, 2026",
      text: "The twin animal onesies are perfect! My boys looked so cute and matched perfectly. Thank you for including twin options!",
      status: "approved",
    },
    {
      id: "c-baby-hw-2",
      author: "BoyMom",
      date: "October 24, 2026",
      text: "The dinosaur romper is my son's new favorite. He wore it all day and didn't want to take it off. So soft and cute!",
      status: "approved",
    },
    {
      id: "c-baby-hw-3",
      author: "GirlDad",
      date: "October 23, 2026",
      text: "The pink bat costume is adorable. My daughter looked like a little vampire princess — so unique!",
      status: "approved",
    },
    {
      id: "c-baby-hw-4",
      author: "FirstTimeMom",
      date: "October 22, 2026",
      text: "The avocado costume is hilarious! My baby girl was the star of the Halloween party. Everyone loved it!",
      status: "approved",
    },
    {
      id: "c-baby-hw-5",
      author: "TwinDad",
      date: "October 21, 2026",
      text: "We got the Mickey Mouse costumes for our twin boys and they were a huge hit. So cute and comfortable!",
      status: "approved",
    },
  ],
  "18-useful-christmas-gifts-for-dad-who-doesnt-need-more-stuff": [
    {
      id: "c-dad18-1",
      author: "NoClutterKate",
      date: "December 17, 2026",
      text: "This is exactly what I needed! My dad keeps telling me he doesn't want anything, but I got him the HOTO laser measuring tool and he's been measuring everything in the house. He loves it!",
      status: "approved",
    },
    {
      id: "c-dad18-2",
      author: "HandyDaughter",
      date: "December 16, 2026",
      text: "The telescoping magnetic pickup tool set is amazing. My dad dropped a screw behind his workbench and this saved the day. He said it's the best gift he's gotten in years!",
      status: "approved",
    },
    {
      id: "c-dad18-3",
      author: "GrillMasterSon",
      date: "December 15, 2026",
      text: "The Cutluxe brisket knife is a game-changer. My dad smoked a brisket for Christmas dinner and said the knife made slicing so much easier. Quality is excellent.",
      status: "approved",
    },
    {
      id: "c-dad18-4",
      author: "PracticalPete",
      date: "December 14, 2026",
      text: "I was skeptical about the DUDE Wipes, but my dad actually loves them. He uses them all the time and says they're one of the most practical gifts he's ever received. Who knew?",
      status: "approved",
    },
    {
      id: "c-dad18-5",
      author: "GadgetGuy",
      date: "December 13, 2026",
      text: "The phone stand with Bluetooth speaker is so cool! My dad uses it on his desk every day. Great sound quality and the LED lights are a nice touch.",
      status: "approved",
    },
  ],
  "20-christmas-gifts-for-dad-under-50": [
    {
      id: "c-dad50-1",
      author: "PracticalShopper",
      date: "December 16, 2026",
      text: "I was worried about finding something useful under $50, but the Ryker tool bag is perfect for my dad. He's always complaining about his messy toolbox. Thanks for the great recommendation!",
      status: "approved",
    },
    {
      id: "c-dad50-2",
      author: "GrillMasterSon",
      date: "December 15, 2026",
      text: "The 31-piece BBQ set is incredible! My dad hosts cookouts all summer and he's going to love this. Quality looks great for the price.",
      status: "approved",
    },
    {
      id: "c-dad50-3",
      author: "SentimentalDaughter",
      date: "December 14, 2026",
      text: "I got the Dear Dad blanket for my father and he teared up when he opened it. It's so soft and the message is beautiful. This is exactly what I was looking for.",
      status: "approved",
    },
    {
      id: "c-dad50-4",
      author: "TechSavvyKid",
      date: "December 13, 2026",
      text: "The JTEMAN phone stand with Bluetooth speaker is awesome. I got one for myself too — it's surprisingly good quality for under $50. My dad loves it!",
      status: "approved",
    },
    {
      id: "c-dad50-5",
      author: "OutdoorEnthusiast",
      date: "December 12, 2026",
      text: "The AMACOOL waist fan is a lifesaver! My dad works outside in the heat and he said it's the best gift he's ever received. Game-changer.",
      status: "approved",
    },
  ],
  "23-unique-christmas-gifts-for-dad-practical": [
    {
      id: "c-dad23-1",
      author: "CuriousGeorge",
      date: "December 18, 2026",
      text: "The Tesla coil speaker is the coolest thing I've ever seen! My dad is a huge tech nerd and he absolutely lost his mind when he opened it. Thank you for this list!",
      status: "approved",
    },
    {
      id: "c-dad23-2",
      author: "HandyHelper",
      date: "December 17, 2026",
      text: "The screw extractor set saved my dad's weekend project. He stripped a screw and was about to give up — then he remembered this gift. He said it's the best $9 he never spent!",
      status: "approved",
    },
    {
      id: "c-dad23-3",
      author: "GardenGuru",
      date: "December 16, 2026",
      text: "My dad loves his garden, so I got him the solar gnome. He thinks it's hilarious and it actually looks great at night. Win-win!",
      status: "approved",
    },
    {
      id: "c-dad23-4",
      author: "GadgetQueen",
      date: "December 15, 2026",
      text: "The endoscope camera is so cool. My dad used it to check inside his wall for a leak and was amazed at how clear the image was. Such a unique gift!",
      status: "approved",
    },
    {
      id: "c-dad23-5",
      author: "GrillMasterDaughter",
      date: "December 14, 2026",
      text: "The meat thermometer is a game-changer. My dad used to overcook everything — now his steaks are perfect every time. Highly recommend!",
      status: "approved",
    },
  ],
  "25-thoughtful-christmas-gifts-for-dad": [
    {
      id: "c-dad25-1",
      author: "ThoughtfulDaughter",
      date: "December 19, 2026",
      text: "The Dad's Life Story Journal is the best gift I've ever given my dad. He's been filling it out every night and sharing stories with me. Thank you for this recommendation!",
      status: "approved",
    },
    {
      id: "c-dad25-2",
      author: "FunnySon",
      date: "December 18, 2026",
      text: "The Toilet Timer is hilarious! My dad loves it and keeps using it as a conversation starter. Best $16 I've ever spent!",
      status: "approved",
    },
    {
      id: "c-dad25-3",
      author: "GrillMasterDaughter",
      date: "December 17, 2026",
      text: "The rolling grill basket changed my dad's grilling game. He uses it every weekend now. Such a simple but thoughtful gift.",
      status: "approved",
    },
    {
      id: "c-dad25-4",
      author: "WhiskeyLoverKid",
      date: "December 16, 2026",
      text: "The whiskey decanter globe set is stunning. My dad put it on his bar cart and it looks like a million bucks. He loves it!",
      status: "approved",
    },
    {
      id: "c-dad25-5",
      author: "ProudDadKid",
      date: "December 15, 2026",
      text: "The 'Awesome Like My Daughter' shirt is my dad's new favorite. He wore it to dinner and showed everyone. Such a fun gift!",
      status: "approved",
    },
  ],
};

const GENERIC_DEFAULT_COMMENTS: CommentItem[] = [
  {
    id: "c1",
    author: "Emily Watson",
    date: "August 15, 2026",
    text: "Loved the single-origin coffee subscription recommendation! Ordered it for my mom's birthday and she was thrilled.",
    status: "approved",
  },
  {
    id: "c2",
    author: "Marcus Chen",
    date: "August 18, 2026",
    text: "The Turkish waffle towels idea is super practical. Perfect for family gifts.",
    status: "approved",
  },
];

export function CommentsSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<CommentItem[]>(() => {
    return DEFAULT_COMMENTS_MAP[articleSlug] || GENERIC_DEFAULT_COMMENTS;
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: name.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      text: text.trim(),
      status: "pending",
    };

    setComments((prev) => [newComment, ...prev]);
    setName("");
    setEmail("");
    setText("");
    setSubmitted(true);
  };

  const visibleComments = comments.filter((c) => c.status === "approved");

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-card" id="comments">
      <div className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2>Reader Comments ({visibleComments.length})</h2>
      </div>

      <div className="mt-6 flex flex-col gap-4 divide-y divide-border">
        {visibleComments.map((c) => (
          <div key={c.id} className="pt-4 first:pt-0">
            <div className="flex items-center justify-between text-caption">
              <span className="font-semibold text-foreground">{c.author}</span>
              <span>{c.date}</span>
            </div>
            <p className="mt-2 text-sm text-foreground-muted">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h3 className="font-display text-base font-semibold text-foreground">Leave a Comment</h3>
        <p className="mt-1 text-caption">
          Your email address will not be published. Comments are reviewed before publishing.
        </p>

        {submitted ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-700">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>Thank you! Your comment has been submitted for moderation.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="comment-name" className="sr-only">
                  Name
                </label>
                <input
                  id="comment-name"
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-4 text-xs outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <div>
                <label htmlFor="comment-email" className="sr-only">
                  Email
                </label>
                <input
                  id="comment-email"
                  type="email"
                  placeholder="Your Email (Optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-4 text-xs outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>
            <div>
              <label htmlFor="comment-text" className="sr-only">
                Comment
              </label>
              <textarea
                id="comment-text"
                rows={3}
                required
                placeholder="Share your thoughts or gift recommendations..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-4 text-xs outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <span>Submit Comment</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
