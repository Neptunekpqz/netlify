import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import {
  MOCK_PRODUCTS, MOCK_USERS, MOCK_LICENSES, MOCK_ORDERS,
  type Product, type AdminUser, type License, type Order,
} from "@/lib/stellaware-data";
import {
  LayoutDashboard, Boxes, Users, KeyRound, Receipt, Bitcoin,
  Plus, Edit3, Trash2, Eye, EyeOff, TrendingUp, DollarSign, ShoppingBag, Activity,
} from "lucide-react";

type Tab = "overview" | "products" | "users" | "licenses" | "orders" | "crypto";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — StellaWare" },
      { name: "description", content: "StellaWare admin dashboard." },
    ],
  }),
  component: Admin,
});

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Boxes },
  { id: "users", label: "Users", icon: Users },
  { id: "licenses", label: "Licenses", icon: KeyRound },
  { id: "orders", label: "Orders", icon: Receipt },
  { id: "crypto", label: "Transactions", icon: Bitcoin },
];

function Admin() {
  const [tab, setTab] = useState<Tab>("overview");
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-24">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--neon-pink)]">Admin</div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Control panel</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
          <aside className="glass h-fit rounded-2xl p-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition ${
                  tab === t.id ? "bg-gradient-brand text-primary-foreground glow-pink" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </aside>
          <div>
            {tab === "overview" && <Overview />}
            {tab === "products" && <ProductsPanel />}
            {tab === "users" && <UsersPanel />}
            {tab === "licenses" && <LicensesPanel />}
            {tab === "orders" && <OrdersPanel />}
            {tab === "crypto" && <CryptoPanel />}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Kpi({ icon: Icon, label, value, delta }: { icon: typeof TrendingUp; label: string; value: string; delta: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-[color:var(--neon-pink)]" />
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">{delta}</span>
      </div>
      <div className="mt-4 text-3xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Overview() {
  const totalRev = MOCK_ORDERS.filter(o => o.status === "paid").reduce((s, o) => s + o.amount, 0);
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Kpi icon={DollarSign} label="Revenue (30d)" value={`$${totalRev.toFixed(2)}`} delta="+12.4%" />
        <Kpi icon={ShoppingBag} label="Orders" value={MOCK_ORDERS.length.toString()} delta="+8.1%" />
        <Kpi icon={Users} label="Users" value={MOCK_USERS.length.toString()} delta="+3.2%" />
        <Kpi icon={Activity} label="Active Licenses" value={MOCK_LICENSES.filter(l => l.status === "active").length.toString()} delta="+5.7%" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Revenue (last 12 weeks)</h3>
          <Sparkline values={[12,18,15,22,28,24,32,36,30,42,48,55]} />
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Top products</h3>
          <ul className="mt-4 space-y-3">
            {MOCK_PRODUCTS.slice(0,5).map((p,i) => (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><span className="text-lg">{p.image}</span>{p.name}</span>
                <span className="text-muted-foreground">{120 - i*18} sold</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const points = values.map((v, i) => `${(i / (values.length - 1)) * 100},${100 - (v / max) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-6 h-32 w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.28 340)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.55 0.27 300)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="oklch(0.72 0.28 340)" strokeWidth="1.2" points={points} />
      <polygon fill="url(#g)" points={`0,100 ${points} 100,100`} />
    </svg>
  );
}

function ProductsPanel() {
  const [items, setItems] = useState<Product[]>(MOCK_PRODUCTS);
  const toggle = (id: string) => setItems(l => l.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
  const remove = (id: string) => setItems(l => l.filter(p => p.id !== id));
  const updatePrice = (id: string, price: number) => setItems(l => l.map(p => p.id === id ? { ...p, price } : p));
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Products ({items.length})</h2>
        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground glow-pink hover:scale-[1.02] transition-transform">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>
      <div className="divide-y divide-white/5">
        {items.map((p) => (
          <div key={p.id} className="grid grid-cols-12 items-center gap-3 px-5 py-3 text-sm">
            <div className="col-span-4 flex items-center gap-3">
              <span className="text-2xl">{p.image}</span>
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.game}</div>
              </div>
            </div>
            <div className="col-span-3 truncate text-muted-foreground">{p.tagline}</div>
            <div className="col-span-2">
              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2">
                <span className="text-muted-foreground">$</span>
                <input
                  type="number"
                  defaultValue={p.price}
                  onBlur={(e) => updatePrice(p.id, parseFloat(e.target.value) || 0)}
                  className="w-20 bg-transparent py-1.5 outline-none"
                />
              </div>
            </div>
            <div className="col-span-1">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.visible ? "bg-emerald-500/15 text-emerald-300" : "bg-white/5 text-muted-foreground"}`}>
                {p.visible ? "Live" : "Hidden"}
              </span>
            </div>
            <div className="col-span-2 flex justify-end gap-1.5">
              <button onClick={() => toggle(p.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground" aria-label="Toggle">
                {p.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground" aria-label="Edit"><Edit3 className="h-4 w-4" /></button>
              <button onClick={() => remove(p.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-300" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersPanel() {
  const [items, setItems] = useState<AdminUser[]>(MOCK_USERS);
  const toggleBan = (id: string) => setItems(l => l.map(u => u.id === id ? { ...u, status: u.status === "active" ? "banned" : "active" } : u));
  return (
    <DataTable
      title={`Users (${items.length})`}
      headers={["Email", "Joined", "Spend", "Licenses", "Status", ""]}
      rows={items.map(u => [
        u.email,
        u.joined,
        `$${u.spend.toFixed(2)}`,
        u.licenses.toString(),
        <span key="s" className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${u.status === "active" ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>{u.status}</span>,
        <button key="a" onClick={() => toggleBan(u.id)} className="text-xs text-[color:var(--neon-pink)] hover:underline">{u.status === "active" ? "Ban" : "Unban"}</button>,
      ])}
    />
  );
}

function LicensesPanel() {
  const items: License[] = MOCK_LICENSES;
  return (
    <DataTable
      title={`Licenses (${items.length})`}
      headers={["ID", "Product", "Domain", "Key", "Status", "Expires"]}
      rows={items.map(l => [
        l.id, l.product, l.domain,
        <span key="k" className="font-mono text-xs">{l.key}</span>,
        <span key="s" className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${l.status === "active" ? "bg-emerald-500/15 text-emerald-300" : l.status === "paused" ? "bg-amber-500/15 text-amber-300" : "bg-rose-500/15 text-rose-300"}`}>{l.status}</span>,
        l.expires,
      ])}
    />
  );
}

function OrdersPanel() {
  const items: Order[] = MOCK_ORDERS;
  return (
    <DataTable
      title={`Orders (${items.length})`}
      headers={["Order", "Customer", "Product", "Amount", "Crypto", "Status", "Date"]}
      rows={items.map(o => [
        o.id, o.customer, o.product, `$${o.amount.toFixed(2)}`, o.crypto,
        <span key="s" className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${o.status === "paid" ? "bg-emerald-500/15 text-emerald-300" : o.status === "pending" ? "bg-amber-500/15 text-amber-300" : "bg-rose-500/15 text-rose-300"}`}>{o.status}</span>,
        o.date,
      ])}
    />
  );
}

function CryptoPanel() {
  const totals = MOCK_ORDERS.filter(o => o.status === "paid").reduce<Record<string, number>>((acc, o) => {
    acc[o.crypto] = (acc[o.crypto] ?? 0) + o.amount;
    return acc;
  }, {});
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-5">
        {(["BTC","ETH","LTC","SOL","USDT"] as const).map((c) => (
          <div key={c} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2"><Bitcoin className="h-4 w-4 text-[color:var(--neon-pink)]" /><span className="text-sm font-semibold">{c}</span></div>
            <div className="mt-3 text-2xl font-bold">${(totals[c] ?? 0).toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Received (30d)</div>
          </div>
        ))}
      </div>
      <DataTable
        title="Recent transactions"
        headers={["TxID", "From", "Amount", "Crypto", "Status", "Date"]}
        rows={MOCK_ORDERS.map(o => [
          <span key="t" className="font-mono text-xs">{o.id.replace("ORD","TX")}</span>,
          o.customer, `$${o.amount.toFixed(2)}`, o.crypto,
          <span key="s" className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${o.status === "paid" ? "bg-emerald-500/15 text-emerald-300" : o.status === "pending" ? "bg-amber-500/15 text-amber-300" : "bg-rose-500/15 text-rose-300"}`}>{o.status}</span>,
          o.date,
        ])}
      />
    </div>
  );
}

function DataTable({ title, headers, rows }: { title: string; headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="border-b border-white/5 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {headers.map((h, i) => <th key={i} className="px-5 py-3">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02]">
                {r.map((c, j) => <td key={j} className="px-5 py-3 align-middle">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}