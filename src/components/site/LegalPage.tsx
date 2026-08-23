import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-h1">{title}</h1>
      <p className="text-caption mt-2">Last updated {updated}</p>
      <div className="mt-8 grid gap-6 text-foreground-muted [&_h2]:text-h2 [&_h2]:text-foreground">
        {children}
      </div>
    </div>
  );
}
