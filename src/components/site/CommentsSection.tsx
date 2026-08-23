import { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

export type CommentItem = {
  id: string;
  author: string;
  date: string;
  text: string;
  status: "approved" | "pending";
};

export function CommentsSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<CommentItem[]>([
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
  ]);

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
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
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
        <p className="mt-1 text-caption">Your email address will not be published. Comments are reviewed before publishing.</p>

        {submitted ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-700">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>Thank you! Your comment has been submitted for moderation.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="comment-name" className="sr-only">Name</label>
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
                <label htmlFor="comment-email" className="sr-only">Email</label>
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
              <label htmlFor="comment-text" className="sr-only">Comment</label>
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
