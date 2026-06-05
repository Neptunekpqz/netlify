import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Stats } from "@/components/site/Stats";
import { Reviews } from "@/components/site/Reviews";
import { FAQ } from "@/components/site/FAQ";
import { Discord } from "@/components/site/Discord";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/Features";
import { MOCK_PRODUCTS } from "@/lib/stellaware-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StellaWare — Play Smarter, Not Harder" },
      { name: "description", content: "Premium gaming software marketplace. Undetected, stream-proof, instant crypto delivery." },
      { property: "og:title", content: "StellaWare — Play Smarter, Not Harder" },
      { property: "og:description", content: "Premium gaming software marketplace. Undetected, stream-proof, instant crypto delivery." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = MOCK_PRODUCTS.filter((p) => p.visible).slice(0, 3);
  return (
    <SiteShell>
      <Hero />
      <Stats />
      <Features />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Featured" title="Top sellers this week." />
          <Link to="/products" className="hidden items-center gap-1 text-sm text-[color:var(--neon-pink)] hover:underline md:inline-flex">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <Reviews />
      <Discord />
      <FAQ />
    </SiteShell>
  );
}
