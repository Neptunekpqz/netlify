import { Shield, Zap, Lock, Headphones, RefreshCw, Eye } from "lucide-react";

const FEATURES = [
  { icon: Shield, title: "Undetected", text: "Private builds, HWID spoofing, and same-hour patches." },
  { icon: Zap, title: "Instant Delivery", text: "Crypto confirms, key drops. No waiting around." },
  { icon: Eye, title: "Stream Proof", text: "OBS, Discord and Twitch see a clean screen. Always." },
  { icon: RefreshCw, title: "Free Updates", text: "Lifetime updates for your license duration." },
  { icon: Lock, title: "Anonymous", text: "Crypto only. No KYC, no chargebacks, no traces." },
  { icon: Headphones, title: "24/7 Support", text: "Discord + tickets, average reply under 8 min." },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Why StellaWare"
        title="Engineered for ranked. Trusted by champions."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:glow-pink"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft">
              <f.icon className="h-5 w-5 text-[color:var(--neon-pink)]" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--neon-pink)]">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}