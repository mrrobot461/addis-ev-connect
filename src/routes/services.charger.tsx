import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Zap, Home, Building, Check, Plug } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/services/charger")({
  component: Charger,
});

const chargers = [
  { name: "AC Wallbox 7 kW", price: "ETB 78,000", time: "Full charge ~ 8h", tag: "Recommended" },
  { name: "AC Wallbox 11 kW", price: "ETB 112,000", time: "Full charge ~ 5h" },
  { name: "DC Fast 22 kW", price: "ETB 245,000", time: "0–80% in 90 min" },
];

function Charger() {
  const [property, setProperty] = useState<"home" | "business">("home");
  const [selected, setSelected] = useState(0);

  return (
    <MobileShell>
      <ScreenHeader title="Charger installation" subtitle="Certified electricians · 2-year warranty" back="/services" />

      {/* Hero */}
      <div className="px-5">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-surface p-5">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
              <Plug className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="font-[Space_Grotesk] text-lg font-semibold">Charge from home</p>
              <p className="text-[11.5px] text-muted-foreground mt-1">Free site survey · installation in 3–5 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property type */}
      <div className="px-5 mt-5 grid grid-cols-2 gap-3">
        {([
          { id: "home", label: "Residential", icon: Home },
          { id: "business", label: "Business", icon: Building },
        ] as const).map(({ id, label, icon: Icon }) => {
          const active = property === id;
          return (
            <button
              key={id}
              onClick={() => setProperty(id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                active ? "border-primary bg-primary/15" : "border-border bg-surface"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-sm font-semibold mt-2">{label}</p>
            </button>
          );
        })}
      </div>

      <h2 className="px-5 mt-7 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        Choose a charger
      </h2>
      <div className="px-5 space-y-3">
        {chargers.map((c, i) => {
          const active = selected === i;
          return (
            <button
              key={c.name}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-4 rounded-2xl border flex items-center gap-4 ${
                active ? "border-primary bg-primary/10" : "border-border bg-surface"
              }`}
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                <Zap className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{c.name}</p>
                  {c.tag && (
                    <span className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">{c.tag}</span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{c.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{c.price}</p>
                <span
                  className={`mt-2 inline-grid place-items-center h-5 w-5 rounded-full border ${
                    active ? "border-primary bg-primary" : "border-border bg-surface-2"
                  }`}
                >
                  {active && <Check className="h-3 w-3 text-primary-foreground" />}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <h2 className="px-5 mt-7 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        Installation address
      </h2>
      <div className="px-5 space-y-3">
        <input
          placeholder="Subcity (e.g. Bole, Yeka, Kirkos)"
          className="w-full h-12 px-4 rounded-xl border border-border bg-surface outline-none text-sm placeholder:text-muted-foreground/60 focus:border-primary"
        />
        <input
          placeholder="Woreda / building name"
          className="w-full h-12 px-4 rounded-xl border border-border bg-surface outline-none text-sm placeholder:text-muted-foreground/60 focus:border-primary"
        />
        <input
          placeholder="Distance from electrical panel (m)"
          className="w-full h-12 px-4 rounded-xl border border-border bg-surface outline-none text-sm placeholder:text-muted-foreground/60 focus:border-primary"
        />
      </div>

      <div className="px-5 mt-8">
        <Link to="/appointments" className="block h-13 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-center shadow-glow">
          Request free site survey
        </Link>
      </div>
    </MobileShell>
  );
}