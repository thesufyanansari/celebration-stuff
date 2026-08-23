import { site } from "@/data/site";
import { PinterestIcon } from "./icons";

export function PinterestCta({ label }: { label?: string }) {
  return (
    <section className="rounded-2xl border border-primary/15 bg-primary-soft p-8 text-center sm:p-10">
      <PinterestIcon className="mx-auto h-8 w-8 text-primary" />
      <h2 className="mt-4 text-h2">{label ?? "Save these ideas for later"}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-foreground-muted">
        We pin fresh celebration inspiration every day — seasonal boards for holidays, gifts,
        parties and decorating.
      </p>
      <a
        href={site.social.pinterest}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
      >
        <PinterestIcon className="h-4 w-4" />
        Follow Celebration Stuff on Pinterest
      </a>
    </section>
  );
}

export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <div
      className="grid min-h-[100px] place-items-center rounded-xl border border-dashed border-border bg-background-subtle text-caption"
      data-ad-slot
      aria-label={label}
    >
      {label}
    </div>
  );
}
