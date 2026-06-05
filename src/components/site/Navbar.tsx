import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/licenses", label: "Licenses" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 max-w-7xl px-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-brand glow-pink">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-base">Stella<span className="text-gradient-brand">Ware</span></span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-foreground bg-white/5" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-white/5"
              >
                {n.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/admin" className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
              Admin
            </Link>
            <Link
              to="/products"
              className="rounded-xl bg-gradient-brand px-4 py-1.5 text-sm font-medium text-primary-foreground glow-pink transition-transform hover:scale-[1.03]"
            >
              Get Started
            </Link>
          </div>
          <button
            className="md:hidden rounded-lg p-2 text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {open && (
          <div className="glass mt-2 grid gap-1 rounded-2xl p-2 md:hidden">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5">
              Admin
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}