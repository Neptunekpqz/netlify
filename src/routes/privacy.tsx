import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — StellaWare" },
      { name: "description", content: "StellaWare privacy policy." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: June 2026</p>
        <Section title="1. Data We Collect">We collect only the data required to deliver your license: email address and license/HWID metadata. We do NOT collect names, phone numbers, IP geolocation, or KYC data.</Section>
        <Section title="2. Payments">We use third-party crypto payment processors. We never see, store, or process your wallet keys.</Section>
        <Section title="3. Cookies">We use minimal essential cookies for authentication and cart state. No advertising trackers, ever.</Section>
        <Section title="4. Data Retention">Order metadata is retained for 12 months for support purposes, then permanently deleted.</Section>
        <Section title="5. Your Rights">You can request data deletion at any time via support@stellaware.gg. We will action within 7 days.</Section>
        <Section title="6. Contact">Privacy questions: privacy@stellaware.gg</Section>
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