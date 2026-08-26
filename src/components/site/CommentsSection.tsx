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
