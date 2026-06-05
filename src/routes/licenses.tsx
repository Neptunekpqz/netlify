import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { MOCK_LICENSES, type License } from "@/lib/stellaware-data";
import { Globe, KeyRound, Plus, Trash2, RefreshCw, Copy } from "lucide-react";

export const Route = createFileRoute("/licenses")({
  head: () => ({
    meta: [
      { title: "Domain Licensing — StellaWare" },
      { name: "description", content: "Manage your StellaWare licenses, link domains, and track expirations." },
      { property: "og:title", content: "Domain Licensing — StellaWare" },
      { property: "og:description", content: "Manage your StellaWare licenses, link domains, and track expirations." },
    ],
  }),
  component: Licenses,
});

function statusPill(status: License["status"]) {
  const map = {
    active: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
    paused: "bg-amber-500/15 text-amber-300 border-amber-400/20",
    expired: "bg-rose-500/15 text-rose-300 border-rose-400/20",
  } as const;
  return `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${map[status]}`;
}

function Licenses() {
  const [list, setList] = useState<License[]>(MOCK_LICENSES);
  const [domain, setDomain] = useState("");
  const [product, setProduct] = useState("Stella Valorant");

  const register = () => {
    if (!domain.trim()) return;
    // TODO: replace with real API call to register/link a domain license.
    const newLic: License = {
      id: "L-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
      product,
      domain: domain.trim(),
      key: "STLA-NEW-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
      status: "active",
      expires: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      activatedAt: new Date().toISOString().slice(0, 10),
    };
    setList((l) => [newLic, ...l]);
    setDomain("");
  };

  const remove = (id: string) => setList((l) => l.filter((x) => x.id !== id));
  const reset = (id: string) =>
    setList((l) => l.map((x) => (x.id === id ? { ...x, status: "active", expires: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10) } : x)));

  const active = list.filter((l) => l.status === "active").length;
  const expired = list.filter((l) => l.status === "expired").length;
  const paused = list.filter((l) => l.status === "paused").length;

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--neon-pink)]">Dashboard</div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Domain Licensing</h1>
            <p className="mt-2 text-muted-foreground">Register domains, manage licenses, and reset your HWID.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard label="Active" value={active} accent="emerald" />
          <StatCard label="Paused" value={paused} accent="amber" />
          <StatCard label="Expired" value={expired} accent="rose" />
        </div>

        <div className="mt-8 glass rounded-2xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Register a domain</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="play.your-crew.gg"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm outline-none"
            >
              {["Stella Valorant", "Stella Fortnite", "Stella Apex", "Stella Warzone", "Stella Rust"].map((p) => (
                <option key={p} className="bg-[color:var(--surface-2)]">{p}</option>
              ))}
            </select>
            <button
              onClick={register}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground glow-pink hover:scale-[1.02] transition-transform"
            >
              <Plus className="h-4 w-4" /> Register
            </button>
          </div>
        </div>

        <div className="mt-6 glass overflow-hidden rounded-2xl">
          <div className="grid grid-cols-12 border-b border-white/5 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="col-span-3">Domain</div>
            <div className="col-span-3">Product</div>
            <div className="col-span-3">License Key</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Expires</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          {list.map((l) => (
            <div key={l.id} className="grid grid-cols-12 items-center px-5 py-4 text-sm border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
              <div className="col-span-3 truncate font-medium">{l.domain}</div>
              <div className="col-span-3 text-muted-foreground">{l.product}</div>
              <div className="col-span-3 flex items-center gap-2 text-muted-foreground">
                <KeyRound className="h-3.5 w-3.5 text-[color:var(--neon-pink)]" />
                <span className="truncate font-mono text-xs">{l.key}</span>
                <button onClick={() => navigator.clipboard?.writeText(l.key)} className="text-muted-foreground hover:text-foreground" aria-label="Copy">
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="col-span-1"><span className={statusPill(l.status)}>{l.status}</span></div>
              <div className="col-span-1 text-muted-foreground">{l.expires}</div>
              <div className="col-span-1 flex justify-end gap-1.5">
                <button onClick={() => reset(l.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground" aria-label="Reset"><RefreshCw className="h-3.5 w-3.5" /></button>
                <button onClick={() => remove(l.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-300" aria-label="Remove"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
          {list.length === 0 && <div className="p-10 text-center text-sm text-muted-foreground">No licenses yet. Register your first domain above.</div>}
        </div>
      </section>
    </SiteShell>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: "emerald" | "amber" | "rose" }) {
  const ring = {
    emerald: "shadow-[0_0_40px_oklch(0.7_0.2_160/0.25)]",
    amber: "shadow-[0_0_40px_oklch(0.8_0.2_75/0.25)]",
    rose: "shadow-[0_0_40px_oklch(0.7_0.25_15/0.25)]",
  }[accent];
  return (
    <div className={`glass rounded-2xl p-6 ${ring}`}>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 text-4xl font-bold">{value}</div>
    </div>
  );
}