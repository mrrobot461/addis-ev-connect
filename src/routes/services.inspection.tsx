import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, Check } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/services/inspection")({
  component: Inspection,
});

const checks = [
  "High-voltage battery state of health",
  "Charging port & onboard charger",
  "Motor & inverter performance",
  "Brake pads, rotors & regen system",
  "Suspension, steering & alignment",
  "Tires, pressure & tread depth",
  "Lights, sensors & cameras",
  "Software & firmware versions",
];

function Inspection() {
  return (
    <MobileShell>
      <ScreenHeader title="EV Inspection" subtitle="32-point health check" back="/services" />
      <div className="px-5">
        <div className="rounded-3xl border border-border bg-gradient-surface p-5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent-blue/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-[Space_Grotesk] text-lg font-semibold">Annual EV inspection</p>
              <p className="text-[11.5px] text-muted-foreground mt-0.5">~ 90 minutes · ETB 1,800 flat</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="px-5 mt-7 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        What we check
      </h2>
      <ul className="px-5 space-y-2.5">
        {checks.map((c) => (
          <li key={c} className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface">
            <span className="h-6 w-6 rounded-full bg-primary/20 grid place-items-center">
              <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
            </span>
            <span className="text-sm">{c}</span>
          </li>
        ))}
      </ul>

      <div className="px-5 mt-8">
        <Link to="/services/repair" className="block h-13 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-center shadow-glow">
          Book inspection
        </Link>
      </div>
    </MobileShell>
  );
}