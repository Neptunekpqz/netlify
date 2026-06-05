import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — StellaWare" },
      { name: "description", content: "StellaWare terms of service." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <SiteShell>
      <article className="prose prose-invert mx-auto max-w-3xl px-6 pt-16 pb-24">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-muted-foreground">Last updated: June 2026</p>
        <Section title="1. Acceptance">By purchasing or using any StellaWare product, you agree to these Terms.</Section>
        <Section title="2. License">StellaWare grants you a non-transferable, time-limited license for personal use on a single HWID. Resale, redistribution, or reverse engineering is prohibited.</Section>
        <Section title="3. Refunds">Refunds are available within 24 hours of purchase only if the license key has not been activated. Activated keys are non-refundable.</Section>
        <Section title="4. Acceptable Use">StellaWare software is provided "as is" for educational and research purposes. You are responsible for compliance with any applicable terms, laws, or game policies in your jurisdiction.</Section>
        <Section title="5. Detection">No anti-cheat bypass is permanent. StellaWare offers same-hour patches but cannot guarantee any product remains undetected indefinitely.</Section>
        <Section title="6. Liability">StellaWare is not liable for game bans, account losses, or hardware damage resulting from the use of our software.</Section>
        <Section title="7. Changes">We may update these terms at any time. Continued use of our products after changes constitutes acceptance.</Section>
      </article>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </div>
  );
}