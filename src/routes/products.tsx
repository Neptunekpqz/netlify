import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/stellaware-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — StellaWare" },
      { name: "description", content: "Browse premium gaming software for Valorant, Warzone, Fortnite, Apex, Rust and more." },
      { property: "og:title", content: "Products — StellaWare" },
      { property: "og:description", content: "Browse premium gaming software for Valorant, Warzone, Fortnite, Apex, Rust and more." },
    ],
  }),
  component: Products,
});

function Products() {
  const games = ["All", ...Array.from(new Set(MOCK_PRODUCTS.map((p) => p.game)))];
  const [filter, setFilter] = useState("All");
  const visible = MOCK_PRODUCTS.filter((p) => p.visible && (filter === "All" || p.game === filter));
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--neon-pink)]">Catalog</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Pick your <span className="text-gradient-brand">edge</span>.
          </h1>
          <p className="mt-3 text-muted-foreground">Instant delivery. Crypto only. Stream proof, always.</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {games.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                filter === g
                  ? "bg-gradient-brand text-primary-foreground glow-pink"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </SiteShell>
  );
}