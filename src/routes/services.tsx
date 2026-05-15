import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plug, Wrench, Stethoscope, BatteryCharging, AlertTriangle, ShoppingBag, MapPin, Sparkles,
} from "lucide-react";
import { MobileShell, ScreenHeader, SectionTitle } from "@/components/MobileShell";

export const Route = createFileRoute("/services")({
  component: Services,
});

const main = [
  { to: "/services/charger", title: "Home charger installation", desc: "7kW & 22kW · certified electricians", icon: Plug, badge: "Popular" },
  { to: "/services/repair", title: "EV repair & maintenance", desc: "Motor, brakes, suspension, software", icon: Wrench },
  { to: "/services/inspection", title: "Inspection appointment", desc: "32-point pre-purchase / annual check", icon: Stethoscope },
  { to: "/diagnostics", title: "Battery diagnostics", desc: "State of health · cell balance report", icon: BatteryCharging },
  { to: "/parts", title: "Spare parts marketplace", desc: "OEM & aftermarket · genuine warranty", icon: ShoppingBag },
  { to: "/services/emergency", title: "Roadside assistance", desc: "Tow, jump-charge & on-spot fix", icon: AlertTriangle, danger: true },
];

function Services() {
  return (
    <MobileShell>
      <ScreenHeader title="Services" subtitle="Everything your EV needs, in one place." />

      <div className="px-5">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-primary p-4 shadow-glow">
          <Sparkles className="absolute right-3 top-3 h-4 w-4 text-primary-foreground/70" />
          <p className="text-[11px] font-medium text-primary-foreground/80 tracking-wider uppercase">Voltix Care</p>
          <p className="mt-1 font-[Space_Grotesk] text-lg font-semibold text-primary-foreground">
            Annual service plan — 15% off
          </p>
          <p className="text-xs text-primary-foreground/80 mt-1">Includes 2 inspections, 1 brake service & roadside assist.</p>
        </div>
      </div>

      <SectionTitle>All services</SectionTitle>
      <div className="px-5 space-y-3">
        {main.map(({ to, title, desc, icon: Icon, badge, danger }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-4 p-4 rounded-2xl border ${
              danger ? "border-destructive/40 bg-destructive/10" : "border-border bg-surface"
            }`}
          >
            <div
              className={`h-12 w-12 rounded-xl grid place-items-center shrink-0 ${
                danger ? "bg-destructive" : "bg-gradient-primary shadow-glow"
              }`}
            >
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold truncate">{title}</p>
                {badge && (
                  <span className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-[11.5px] text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <span className="text-muted-foreground">›</span>
          </Link>
        ))}
      </div>

      <SectionTitle>Garage locations</SectionTitle>
      <div className="px-5 grid grid-cols-2 gap-3">
        {[
          { name: "Bole Hub", area: "Medhanialem", dist: "2.4 km" },
          { name: "CMC Branch", area: "CMC Roundabout", dist: "6.1 km" },
          { name: "Megenagna", area: "near Friendship", dist: "4.8 km" },
          { name: "Ayat Service", area: "Ayat Square", dist: "9.2 km" },
        ].map((g) => (
          <div key={g.name} className="rounded-2xl border border-border bg-surface p-3">
            <div className="h-6 w-6 rounded-lg bg-primary/15 grid place-items-center mb-2">
              <MapPin className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-sm font-semibold">{g.name}</p>
            <p className="text-[11px] text-muted-foreground">{g.area}</p>
            <p className="text-[11px] text-primary mt-1">{g.dist} away</p>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}