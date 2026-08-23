import { useState, useEffect } from "react";
import { Sparkles, Gift, Star } from "lucide-react";
import { getNextUpcomingEvent } from "@/data/events";

export function VisitorArrivalExperience({
  durationSeconds = 1.5,
  particleCount = 12,
}: {
  durationSeconds?: number;
  particleCount?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Accessibility check: prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Check if new visitor
    const hasSeen = localStorage.getItem("has_seen_welcome_experience");
    if (hasSeen) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      localStorage.setItem("has_seen_welcome_experience", "true");
    }, durationSeconds * 1000);

    return () => clearTimeout(timer);
  }, [durationSeconds]);

  if (!visible) return null;

  const nextEvent = getNextUpcomingEvent();
  const eventName = nextEvent?.event.name || "Celebrations";

  // Particle positions
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    top: `${15 + (i * 7) % 70}%`,
    left: `${10 + (i * 13) % 80}%`,
    size: 14 + (i % 3) * 6,
    delay: (i % 4) * 0.15,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background/20 backdrop-blur-[2px] animate-in fade-in duration-300">
      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-primary/70 animate-bounce transition-transform"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: "1.2s",
          }}
        >
          {p.id % 3 === 0 ? (
            <Sparkles style={{ width: p.size, height: p.size }} />
          ) : p.id % 3 === 1 ? (
            <Gift style={{ width: p.size, height: p.size }} />
          ) : (
            <Star style={{ width: p.size, height: p.size }} />
          )}
        </div>
      ))}

      {/* Welcome Banner */}
      <div className="relative rounded-2xl border border-primary/20 bg-surface/95 px-6 py-3 shadow-lift backdrop-blur-md animate-in zoom-in-95 duration-300">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <Sparkles className="h-4 w-4 animate-spin" />
          <span>Welcome to Celebration Stuff • {eventName} Inspiration</span>
        </div>
      </div>
    </div>
  );
}
