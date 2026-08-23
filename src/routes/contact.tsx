import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${site.name} — Pitches & Partnerships` },
      {
        name: "description",
        content:
          "Get in touch with the Celebration Stuff team about story ideas, corrections, and brand partnerships.",
      },
      { property: "og:title", content: `Contact ${site.name}` },
      {
        property: "og:description",
        content: "Story ideas, corrections and partnership enquiries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-h1">Contact us</h1>
      <p className="mt-4 text-foreground-muted">
        Story ideas, corrections or partnerships — email{" "}
        <a href={`mailto:${site.email}`} className="text-primary hover:underline">
          {site.email}
        </a>{" "}
        or use the form below.
      </p>

      {sent ? (
        <p className="mt-8 rounded-2xl bg-accent-soft p-6 text-accent">
          Thanks — we've got your message and will reply within a few days.
        </p>
      ) : (
        <form
          className="mt-8 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Field id="name" label="Your name" />
          <Field id="email" label="Email address" type="email" />
          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              className="rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button
            type="submit"
            className="h-12 justify-self-start rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        className="h-12 rounded-full border border-border bg-background px-5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
