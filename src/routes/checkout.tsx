import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { MOCK_PRODUCTS } from "@/lib/stellaware-data";
import { Bitcoin, CheckCircle2, Copy, XCircle, Wallet, Loader2 } from "lucide-react";

type Step = "select" | "summary" | "invoice" | "success" | "failed";
type Crypto = { id: "BTC" | "ETH" | "LTC" | "SOL" | "USDT"; name: string; rate: number; address: string };

const CRYPTOS: Crypto[] = [
  { id: "BTC", name: "Bitcoin", rate: 67000, address: "bc1qstellaware7f3xz9k0p2vex9k2j7s8h9d4f5c6w" },
  { id: "ETH", name: "Ethereum", rate: 3500, address: "0xSteLLawARE9F31aB02CcDE9991A2bf7E6dB0Ca12" },
  { id: "LTC", name: "Litecoin", rate: 90, address: "ltc1qstellaware7f3xz9k0p2vex9k2j7s8h9d4f5c6w" },
  { id: "SOL", name: "Solana", rate: 165, address: "StelLA7wAr3Sol9F31aB02CcDE9991A2bf7E6dB0Ca" },
  { id: "USDT", name: "USDT (ERC-20)", rate: 1, address: "0xUSDTsTeLLawARE9F31aB02CcDE9991A2bf7E6dB0" },
];

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>) => ({ product: typeof s.product === "string" ? s.product : "stella-valorant" }),
  head: () => ({
    meta: [
      { title: "Checkout — StellaWare" },
      { name: "description", content: "Pay with Bitcoin, Ethereum, Litecoin, Solana or USDT. Instant license delivery." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { product: productId } = Route.useSearch();
  const product = useMemo(() => MOCK_PRODUCTS.find((p) => p.id === productId) ?? MOCK_PRODUCTS[0], [productId]);
  const [step, setStep] = useState<Step>("select");
  const [crypto, setCrypto] = useState<Crypto>(CRYPTOS[0]);
  const [email, setEmail] = useState("");

  const cryptoAmount = (product.price / crypto.rate).toFixed(crypto.id === "USDT" ? 2 : 6);

  // TODO: Replace with a real payment gateway integration
  // (NOWPayments, BitPay, Coinbase Commerce, etc.) on the server side.
  // Confirm tx, then fulfill the license.
  const simulate = (outcome: "success" | "failed") => {
    setStep("invoice");
    setTimeout(() => setStep(outcome), 1800);
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--neon-pink)]">Checkout</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Pay with <span className="text-gradient-brand">crypto</span>.</h1>
          <p className="mt-2 text-muted-foreground">Anonymous. Instant. No chargebacks.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="glass rounded-2xl p-6">
            {step === "select" && (
              <>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Select payment method</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {CRYPTOS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCrypto(c)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                        crypto.id === c.id
                          ? "border-[color:var(--neon-pink)] bg-gradient-brand-soft glow-pink"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand-soft">
                          <Bitcoin className="h-4 w-4 text-[color:var(--neon-pink)]" />
                        </span>
                        <div>
                          <div className="text-sm font-semibold">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.id}</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">${c.rate.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Delivery email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@proton.me"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-[color:var(--neon-pink)]"
                  />
                </div>
                <button
                  onClick={() => setStep("summary")}
                  disabled={!email}
                  className="mt-6 w-full rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground glow-pink disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] transition-transform"
                >
                  Continue
                </button>
              </>
            )}

            {step === "summary" && (
              <>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Confirm order</h2>
                <div className="mt-4 space-y-3 text-sm">
                  <Row k="Product" v={product.name} />
                  <Row k="Delivery" v={email} />
                  <Row k="Payment" v={`${crypto.name} (${crypto.id})`} />
                  <Row k="Amount" v={`${cryptoAmount} ${crypto.id} ≈ $${product.price.toFixed(2)}`} />
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep("select")} className="glass flex-1 rounded-xl px-5 py-3 text-sm font-semibold hover:bg-white/10">Back</button>
                  <button onClick={() => simulate(Math.random() > 0.15 ? "success" : "failed")} className="flex-1 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground glow-pink hover:scale-[1.01] transition-transform">
                    Generate Invoice
                  </button>
                </div>
              </>
            )}

            {step === "invoice" && (
              <div className="grid place-items-center py-16 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-[color:var(--neon-pink)]" />
                <div className="mt-5 text-lg font-semibold">Waiting for transaction…</div>
                <div className="mt-1 text-sm text-muted-foreground">Send <span className="text-foreground">{cryptoAmount} {crypto.id}</span> to</div>
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs">
                  <Wallet className="h-3.5 w-3.5 text-[color:var(--neon-pink)]" />
                  <span className="truncate max-w-[280px]">{crypto.address}</span>
                  <button onClick={() => navigator.clipboard?.writeText(crypto.address)} className="text-muted-foreground hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="grid place-items-center py-16 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 glow-pink">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="mt-5 text-2xl font-bold">Payment confirmed</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">Your license key has been delivered to <span className="text-foreground">{email}</span>. Manage it from your dashboard.</p>
                <Link to="/licenses" className="mt-6 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground glow-pink">Go to Dashboard</Link>
              </div>
            )}

            {step === "failed" && (
              <div className="grid place-items-center py-16 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-rose-500/15">
                  <XCircle className="h-8 w-8 text-rose-400" />
                </div>
                <h3 className="mt-5 text-2xl font-bold">Payment failed</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">We couldn't confirm your transaction. No funds were captured. You can retry below.</p>
                <button onClick={() => setStep("select")} className="mt-6 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground glow-pink">Try again</button>
              </div>
            )}
          </div>

          <aside className="glass h-fit rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Order summary</div>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-brand-soft text-3xl">{product.image}</div>
              <div>
                <div className="font-semibold">{product.name}</div>
                <div className="text-xs text-muted-foreground">{product.game} · 30-day license</div>
              </div>
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <Row k="Subtotal" v={`$${product.price.toFixed(2)}`} />
              <Row k="Network fee" v="~$0.40" />
              <div className="my-2 border-t border-white/5" />
              <Row k="Total" v={`$${product.price.toFixed(2)}`} bold />
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={bold ? "font-semibold text-foreground" : "text-foreground"}>{v}</span>
    </div>
  );
}