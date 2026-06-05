import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { FAQ } from "@/components/site/FAQ";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — StellaWare" },
      { name: "description", content: "Frequently asked questions about StellaWare licenses, payment, and support." },
    ],
  }),
  component: () => (
    <SiteShell>
      <FAQ />
    </SiteShell>
  ),
});