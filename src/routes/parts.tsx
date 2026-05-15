import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShoppingBag, Star, Filter } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/parts")({
  component: Parts,
});

const cats = ["All", "Battery", "Brakes", "Tires", "Charging", "Body", "Software"];

const items = [
  { name: "BYD Atto 3 brake pads (front)", brand: "OEM Genuine", price: 4_200, rating: 4.8, stock: "In stock" },
  { name: "Type 2 charging cable · 7m", brand: "Voltix Pro", price: 8_900, rating: 4.9, stock: "In stock" },
  { name: "12V auxiliary battery", brand: "VARTA", price: 6_400, rating: 4.6, stock: "Low stock" },
  { name: "Cabin HEPA filter", brand: "Bosch", price: 1_650, rating: 4.7, stock: "In stock" },
  { name: "Tesla Model Y wiper set", brand: "Bosch Aerotwin", price: 2_300, rating: 4.5, stock: "In stock" },
  { name: "Tire 235/45 R19 EV-spec", brand: "Michelin e-Primacy", price: 18_500, rating: 4.9, stock: "Pre-order" },
];

function Parts() {
  const [cat, setCat] = useState("All");
  return (
    <MobileShell>
      <ScreenHeader
        title="Spare parts"
        subtitle="Genuine OEM & trusted brands"
        right={
          <button className="h-10 w-10 grid place-items-center rounded-xl border border-border bg-surface">
            <ShoppingBag className="h-4 w-4" />
          </button>
        }
      />
      <div className="px-5 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-3 h-12 px-4 rounded-2xl bg-surface border border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search parts, brand, model…" className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <button className="h-12 w-12 grid place-items-center rounded-2xl bg-gradient-primary shadow-glow">
          <Filter className="h-4 w-4 text-primary-foreground" />
        </button>
      </div>

      <div className="mt-4 px-5 flex gap-2 overflow-x-auto -mx-1 px-1 pb-1">
        {cats.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 px-4 h-9 rounded-full text-xs font-medium border transition-all ${
                active ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow" : "border-border bg-surface text-muted-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-5 px-5 grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.name} className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="aspect-square bg-gradient-surface relative grid place-items-center">
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-primary/30 blur-2xl" />
              <PartIllustration />
              <span className="absolute top-2 left-2 text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full bg-background/60 backdrop-blur border border-border text-muted-foreground">
                {item.brand}
              </span>
            </div>
            <div className="p-3">
              <p className="text-[12.5px] font-semibold leading-tight line-clamp-2 min-h-[2.5em]">{item.name}</p>
              <div className="mt-1 flex items-center gap-1 text-[10.5px] text-muted-foreground">
                <Star className="h-3 w-3 text-warning" fill="currentColor" /> {item.rating} ·{" "}
                <span className={item.stock === "Low stock" ? "text-warning" : item.stock === "Pre-order" ? "text-accent-blue" : "text-success"}>
                  {item.stock}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-bold">
                  ETB {item.price.toLocaleString()}
                </p>
                <button className="h-8 w-8 grid place-items-center rounded-lg bg-gradient-primary shadow-glow">
                  <ShoppingBag className="h-3.5 w-3.5 text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}

function PartIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-90">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.22 280)" />
          <stop offset="100%" stopColor="oklch(0.7 0.18 240)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="32" fill="none" stroke="url(#g1)" strokeWidth="3" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="url(#g1)" strokeWidth="2" opacity="0.6" />
      <circle cx="50" cy="50" r="8" fill="url(#g1)" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line
          key={a}
          x1="50"
          y1="50"
          x2={50 + 30 * Math.cos((a * Math.PI) / 180)}
          y2={50 + 30 * Math.sin((a * Math.PI) / 180)}
          stroke="url(#g1)"
          strokeWidth="2"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}