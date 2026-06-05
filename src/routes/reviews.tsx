import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reviews } from "@/components/site/Reviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — StellaWare" },
      { name: "description", content: "Real reviews from real StellaWare users." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-10">
        <Reviews />
      </div>
    </SiteShell>
  ),
});