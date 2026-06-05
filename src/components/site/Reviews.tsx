import { Star } from "lucide-react";
import { MOCK_REVIEWS } from "@/lib/stellaware-data";
import { SectionHeading } from "./Features";

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Loved by Players"
        title="Real reviews from real lobbies."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_REVIEWS.map((r) => (
          <div key={r.id} className="glass rounded-2xl p-6 transition hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand-soft text-xl">
                {r.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.handle}</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[color:var(--neon-pink)] text-[color:var(--neon-pink)]" />
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">"{r.text}"</p>
            <div className="mt-4 text-xs uppercase tracking-widest text-[color:var(--neon-pink)]">{r.product}</div>
          </div>
        ))}
      </div>
    </section>
  );
}