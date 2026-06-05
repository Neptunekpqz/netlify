import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ as FAQ_DATA } from "@/lib/stellaware-data";
import { SectionHeading } from "./Features";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <SectionHeading eyebrow="FAQ" title="Questions, answered." />
      <div className="mt-10 grid gap-3">
        {FAQ_DATA.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-medium">{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-[color:var(--neon-pink)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}