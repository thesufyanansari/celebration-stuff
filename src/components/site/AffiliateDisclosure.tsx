import { Info } from "lucide-react";

export function AffiliateDisclosure({
  text = "Celebration Stuff is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, we earn from qualifying purchases at no additional cost to you.",
}: {
  text?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background-subtle px-4 py-2.5 text-xs text-foreground-muted">
      <Info className="h-4 w-4 shrink-0 text-primary" />
      <span>{text}</span>
    </div>
  );
}
