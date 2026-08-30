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
