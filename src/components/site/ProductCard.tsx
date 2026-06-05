import { Link } from "@tanstack/react-router";
import { Check, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/stellaware-data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:glow-pink">
      {product.badge && (
        <span className="absolute right-4 top-4 rounded-full bg-gradient-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
          {product.badge}
        </span>
      )}
      <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-brand-soft text-6xl">
        {product.image}
      </div>
      <div className="mt-5">
        <div className="text-xs uppercase tracking-widest text-[color:var(--neon-pink)]">{product.game}</div>
        <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
      </div>
      <ul className="mt-4 grid gap-1.5 text-sm">
        {product.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-center gap-2 text-muted-foreground">
            <Check className="h-4 w-4 text-[color:var(--neon-pink)]" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">30-day license</div>
        </div>
        <Link
          to="/checkout"
          search={{ product: product.id }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground glow-pink transition-transform hover:scale-[1.03]"
        >
          <ShoppingCart className="h-4 w-4" /> Buy
        </Link>
      </div>
    </div>
  );
}