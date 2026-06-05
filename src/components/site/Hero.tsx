import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl animate-pulse-glow" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at top, black 30%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neon-pink)] animate-pulse-glow" />
          Trusted by 42,000+ gamers worldwide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
        >
          Play <span className="text-gradient-brand animate-gradient-pan bg-gradient-brand">SMARTER</span>,<br />
          not harder.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Watch them rage quit. Premium gaming software, instant crypto checkout,
          stream-proof, undetected — built by gamers, for gamers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground glow-pink transition-transform hover:scale-[1.03]"
          >
            Browse Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/reviews"
            className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            <Star className="h-4 w-4 text-[color:var(--neon-pink)]" />
            View Reviews
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground"
        >
          <Badge>HWID Spoofer Included</Badge>
          <Badge>Stream Proof</Badge>
          <Badge>Instant Delivery</Badge>
          <Badge>24/7 Support</Badge>
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass rounded-full px-3 py-1.5 text-xs">{children}</span>
  );
}