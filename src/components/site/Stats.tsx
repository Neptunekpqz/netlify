import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 42000, suffix: "+", label: "Active Players" },
  { value: 99.97, suffix: "%", label: "Uptime", decimals: 2 },
  { value: 8, suffix: " min", label: "Avg Support Reply" },
  { value: 12, suffix: "+", label: "Supported Games" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-4 md:p-12">
        {STATS.map((s) => (
          <Counter key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

function Counter({ value, suffix = "", label, decimals = 0 }: { value: number; suffix?: string; label: string; decimals?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const dur = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          setN(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold tracking-tight md:text-5xl">
        <span className="text-gradient-brand">
          {n.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
        </span>
        <span className="text-foreground">{suffix}</span>
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}