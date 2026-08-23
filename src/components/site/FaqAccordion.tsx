import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import type { Faq } from "@/data/articles";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="mt-12 rounded-3xl border border-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          const answerId = `faq-answer-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <div
              key={f.q}
              className="rounded-2xl border border-border/80 bg-background-subtle/50 transition-colors hover:border-border"
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleFaq(i)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left font-display text-sm font-semibold text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
              >
                <span>{f.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-foreground-muted transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              <div
                id={answerId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={`px-4 pb-4 text-xs text-foreground-muted leading-relaxed transition-all ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                {f.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
