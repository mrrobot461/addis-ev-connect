import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell, Search, Zap, Wrench, BatteryCharging, ShoppingBag,
  AlertTriangle, MapPin, ChevronRight, Plug, Stethoscope, MessageCircle,
} from "lucide-react";
import { MobileShell, SectionTitle } from "@/components/MobileShell";

export const Route = createFileRoute("/home")({
  component: Home,
});

const services = [
  { to: "/services/charger", label: "Charger Install", icon: Plug, tint: "from-primary to-primary-glow" },
  { to: "/services/repair", label: "EV Repair", icon: Wrench, tint: "from-accent-blue to-primary" },
  { to: "/services/inspection", label: "Inspection", icon: Stethoscope, tint: "from-primary-glow to-accent-blue" },
  { to: "/diagnostics", label: "Battery Health", icon: BatteryCharging, tint: "from-accent-blue to-primary-glow" },
];

function Home() {
  return (
    <MobileShell>
      <header className="px-5 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
            <span className="text-sm font-semibold text-primary-foreground">DT</span>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Selam,</p>
            <p className="text-sm font-semibold">Dawit Tesfaye</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/notifications" className="relative h-11 w-11 grid place-items-center rounded-2xl border border-border bg-surface">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary shadow-glow" />
          </Link>
        </div>
      </header>

      {/* Search */}
      <div className="px-5 mt-5">
        <div className="flex items-center gap-3 h-12 px-4 rounded-2xl bg-surface border border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search services, parts, chargers…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {/* Vehicle / battery card */}
      <div className="px-5 mt-5">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-surface p-5 shadow-card">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground tracking-wider uppercase">My EV</p>
              <p className="font-[Space_Grotesk] text-lg font-semibold mt-0.5">BYD Atto 3 · ET-3 A12345</p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-surface-2 grid place-items-center border border-border">
              <Zap className="h-4 w-4 text-primary" fill="currentColor" />
            </div>
          </div>

          <div className="relative mt-5 flex items-end justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground">Battery health</p>
              <p className="font-[Space_Grotesk] text-4xl font-bold leading-none mt-1">
                92<span className="text-xl text-muted-foreground">%</span>
              </p>
              <p className="text-[11px] text-success mt-1">Excellent · last check 3d ago</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-muted-foreground">Range</p>
              <p className="font-[Space_Grotesk] text-2xl font-semibold mt-1">387<span className="text-sm text-muted-foreground"> km</span></p>
            </div>
          </div>

          <div className="relative mt-4 h-2 rounded-full bg-surface-2 overflow-hidden">
            <div className="h-full w-[92%] bg-gradient-primary rounded-full shadow-glow" />
          </div>

          <div className="relative mt-4 flex gap-2">
            <Link to="/diagnostics" className="flex-1 h-10 rounded-xl bg-gradient-primary text-primary-foreground text-xs font-semibold grid place-items-center shadow-glow">
              Run diagnostic
            </Link>
            <Link to="/appointments" className="flex-1 h-10 rounded-xl border border-border bg-surface text-xs font-semibold grid place-items-center">
              Service history
            </Link>
          </div>
        </div>
      </div>

      {/* Quick services */}
      <SectionTitle action={<Link to="/services" className="text-xs text-muted-foreground">All</Link>}>
        Quick services
      </SectionTitle>
      <div className="px-5 grid grid-cols-4 gap-3">
        {services.map(({ to, label, icon: Icon, tint }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-2">
            <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${tint} grid place-items-center shadow-card`}>
              <Icon className="h-6 w-6 text-primary-foreground" strokeWidth={2} />
            </div>
            <span className="text-[10.5px] text-center text-muted-foreground leading-tight">{label}</span>
          </Link>
        ))}
      </div>

      {/* Emergency */}
      <div className="px-5 mt-6">
        <Link to="/services/emergency" className="block rounded-2xl border border-destructive/40 bg-destructive/10 p-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-destructive grid place-items-center">
              <AlertTriangle className="h-5 w-5 text-destructive-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Roadside assistance</p>
              <p className="text-[11px] text-muted-foreground">24/7 EV recovery across Addis Ababa</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>
      </div>

      {/* Active service tracking */}
      <SectionTitle action={<Link to="/appointments" className="text-xs text-muted-foreground">View all</Link>}>
        Active service
      </SectionTitle>
      <div className="px-5">
        <Link to="/appointments" className="block rounded-2xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center">
                <Wrench className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">Brake & motor service</p>
                <p className="text-[11px] text-muted-foreground">Voltix Garage · Bole branch</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-warning/15 text-warning">In progress</span>
          </div>
          <div className="mt-4 flex items-center gap-1">
            {["Booked", "Inspection", "Repair", "Ready"].map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-1.5 rounded-full ${i <= 1 ? "bg-gradient-primary" : "bg-surface-2"}`} />
                <p className="text-[9.5px] text-muted-foreground mt-1.5">{s}</p>
              </div>
            ))}
          </div>
        </Link>
      </div>

      {/* Nearby garage */}
      <SectionTitle>Nearest garage</SectionTitle>
      <div className="px-5">
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="relative h-32 bg-gradient-surface">
            <MapBackdrop />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-xl opacity-60 animate-pulse-glow rounded-full" />
                <div className="relative h-9 w-9 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
                  <MapPin className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Voltix Bole Service Hub</p>
              <p className="text-[11px] text-muted-foreground">Bole Medhanialem · 2.4 km · open until 9 PM</p>
            </div>
            <a
              href="https://wa.me/251911000000"
              className="h-10 w-10 grid place-items-center rounded-xl bg-success/15 text-success border border-success/30"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function MapBackdrop() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 200" preserveAspectRatio="none">
      <defs>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.65 0.2 270)" />
          <stop offset="100%" stopColor="oklch(0.7 0.18 240)" />
        </linearGradient>
      </defs>
      <g stroke="url(#line)" strokeWidth="1" fill="none">
        <path d="M0 60 L150 80 L220 40 L400 90" />
        <path d="M0 130 L120 110 L240 150 L400 120" />
        <path d="M50 0 L80 80 L60 200" />
        <path d="M280 0 L260 100 L300 200" />
      </g>
    </svg>
  );
}