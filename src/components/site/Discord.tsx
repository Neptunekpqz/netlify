import { MessageCircle, Users, Zap } from "lucide-react";

export function Discord() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-[color:var(--neon-purple)] opacity-30 blur-3xl" />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--neon-pink)]">Community</div>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Join 42,000+ gamers on Discord.</h2>
            <p className="mt-3 text-muted-foreground">Get instant support, early access to new releases, free giveaways, and direct line to our dev team.</p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground glow-pink transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" /> Join the Discord
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Tile icon={Users} k="42k" v="Members" />
            <Tile icon={MessageCircle} k="<8m" v="Reply time" />
            <Tile icon={Zap} k="24/7" v="Live staff" />
            <Tile icon={Users} k="180" v="Online now" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ icon: Icon, k, v }: { icon: typeof MessageCircle; k: string; v: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <Icon className="h-5 w-5 text-[color:var(--neon-pink)]" />
      <div className="mt-3 text-2xl font-bold">{k}</div>
      <div className="text-xs text-muted-foreground">{v}</div>
    </div>
  );
}