import { Link } from "@tanstack/react-router";
import { Sparkles, MessageCircle, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-brand glow-pink">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              Stella<span className="text-gradient-brand">Ware</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Premium gaming software for players who refuse to lose.
              Crypto checkout, instant delivery, 24/7 support.
            </p>
            <div className="mt-4 flex gap-2">
              <a className="glass rounded-xl p-2 hover:glow-pink" href="#" aria-label="Discord"><MessageCircle className="h-4 w-4" /></a>
              <a className="glass rounded-xl p-2 hover:glow-pink" href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
              <a className="glass rounded-xl p-2 hover:glow-pink" href="#" aria-label="Github"><Github className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-foreground">Products</Link></li>
              <li><Link to="/licenses" className="hover:text-foreground">Licenses</Link></li>
              <li><Link to="/reviews" className="hover:text-foreground">Reviews</Link></li>
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link to="/admin" className="hover:text-foreground">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} StellaWare. All rights reserved.</div>
          <div>For educational and research purposes. Use responsibly.</div>
        </div>
      </div>
    </footer>
  );
}