import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — StellaWare" },
      { name: "description", content: "Get in touch with StellaWare support." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--neon-pink)]">Contact</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Talk to the team.</h1>
          <p className="mt-2 text-muted-foreground">We reply faster than your last clutch.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_320px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: wire to real backend (email service, Discord webhook, etc.)
              setSent(true);
            }}
            className="glass rounded-2xl p-6"
          >
            {sent ? (
              <div className="grid place-items-center py-16 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                <div className="mt-4 text-lg font-semibold">Message received</div>
                <p className="mt-1 text-sm text-muted-foreground">We'll get back to you within a few minutes.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <Field label="Name"><input className="input" required placeholder="Your name" /></Field>
                <Field label="Email"><input className="input" type="email" required placeholder="you@proton.me" /></Field>
                <Field label="Subject"><input className="input" required placeholder="License issue, refund, etc." /></Field>
                <Field label="Message"><textarea className="input min-h-32 resize-y" required placeholder="Tell us what's up…" /></Field>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground glow-pink hover:scale-[1.01] transition-transform">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </div>
            )}
          </form>
          <div className="grid gap-4">
            <InfoCard icon={MessageCircle} title="Discord" body="Fastest path to support. Avg reply <8 min." cta="Join server" />
            <InfoCard icon={Mail} title="Email" body="support@stellaware.gg" cta="Copy address" />
          </div>
        </div>
      </section>
      <style>{`
        .input { width:100%; border-radius: 0.75rem; border: 1px solid color-mix(in oklab, white 10%, transparent); background: rgba(0,0,0,0.3); padding: 0.75rem 1rem; font-size: 0.875rem; outline: none; }
        .input:focus { border-color: var(--neon-pink); }
      `}</style>
    </SiteShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ icon: Icon, title, body, cta }: { icon: typeof Mail; title: string; body: string; cta: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <Icon className="h-5 w-5 text-[color:var(--neon-pink)]" />
      <div className="mt-3 text-base font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      <button className="mt-4 text-xs font-semibold text-[color:var(--neon-pink)] hover:underline">{cta} →</button>
    </div>
  );
}