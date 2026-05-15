import { createFileRoute } from "@tanstack/react-router";
import { BatteryCharging, Thermometer, Activity, Zap, ChevronRight } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/diagnostics")({
  component: Diagnostics,
});

const cells = Array.from({ length: 24 }, (_, i) => 92 + ((i * 7) % 8) - 4);

function Diagnostics() {
  return (
    <MobileShell>
      <ScreenHeader title="Battery diagnostics" subtitle="Live cell-level telemetry" back="/home" />

      {/* Big SOH gauge */}
      <div className="px-5">
        <div className="rounded-3xl border border-border bg-gradient-surface p-6 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground tracking-wider uppercase">State of health</p>
              <p className="font-[Space_Grotesk] text-5xl font-bold mt-2">92<span className="text-2xl text-muted-foreground">%</span></p>
              <p className="text-[11px] text-success mt-1">Excellent · within OEM spec</p>
            </div>
            <Gauge value={92} />
          </div>
        </div>
      </div>

      <div className="px-5 mt-4 grid grid-cols-3 gap-3">
        <Stat icon={Zap} label="Voltage" value="396 V" />
        <Stat icon={Activity} label="Current" value="42 A" />
        <Stat icon={Thermometer} label="Pack temp" value="29 °C" />
      </div>

      <h2 className="px-5 mt-7 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        Cell balance · 24 modules
      </h2>
      <div className="px-5">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <div className="grid grid-cols-12 gap-1.5 items-end h-28">
            {cells.map((v, i) => (
              <div key={i} className="flex flex-col items-center justify-end h-full">
                <div
                  className="w-full rounded-sm bg-gradient-to-t from-primary/30 to-primary"
                  style={{ height: `${(v - 80) * 5}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10.5px] text-muted-foreground">
            <span>Min 88%</span>
            <span>Avg 92%</span>
            <span>Max 95%</span>
          </div>
        </div>
      </div>

      <h2 className="px-5 mt-7 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        Charging history
      </h2>
      <div className="px-5">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <Sparkline />
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Last 14 sessions</span>
            <span className="text-success">Avg efficiency 96%</span>
          </div>
        </div>
      </div>

      <h2 className="px-5 mt-7 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        Recommendations
      </h2>
      <div className="px-5 space-y-2.5">
        {[
          { t: "Schedule cooling system flush", d: "Recommended every 40,000 km" },
          { t: "Update BMS firmware to v3.2.1", d: "Improves cell-balancing accuracy" },
        ].map((r) => (
          <button key={r.t} className="w-full p-4 rounded-2xl border border-border bg-surface flex items-center gap-3 text-left">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center">
              <BatteryCharging className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{r.t}</p>
              <p className="text-[11px] text-muted-foreground">{r.d}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </MobileShell>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      <div className="h-7 w-7 rounded-lg bg-primary/15 grid place-items-center">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </div>
      <p className="text-[10.5px] text-muted-foreground mt-2">{label}</p>
      <p className="text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}

function Gauge({ value }: { value: number }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
      <defs>
        <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.22 280)" />
          <stop offset="100%" stopColor="oklch(0.7 0.18 240)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={r} stroke="oklch(0.3 0.04 262)" strokeWidth="8" fill="none" />
      <circle
        cx="50" cy="50" r={r}
        stroke="url(#gg)" strokeWidth="8" fill="none" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={offset}
      />
    </svg>
  );
}

function Sparkline() {
  const points = [70, 82, 75, 88, 80, 92, 85, 95, 90, 96, 91, 94, 96, 95];
  const w = 320, h = 80, max = 100, min = 60;
  const pts = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - ((p - min) / (max - min)) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
      <defs>
        <linearGradient id="sp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.65 0.2 270)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.65 0.2 270)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke="oklch(0.7 0.22 280)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#sp)" />
    </svg>
  );
}