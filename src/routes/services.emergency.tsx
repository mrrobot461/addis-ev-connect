import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, MapPin, Phone, MessageCircle, Truck, Zap, Wrench } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/services/emergency")({
  component: Emergency,
});

function Emergency() {
  return (
    <MobileShell>
      <ScreenHeader title="Roadside assistance" subtitle="24/7 EV recovery" back="/services" />

      <div className="px-5">
        <div className="rounded-3xl border border-destructive/40 bg-destructive/15 p-5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-destructive/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-destructive grid place-items-center shadow-card animate-pulse-glow">
              <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div>
              <p className="font-[Space_Grotesk] text-lg font-semibold">Need help now?</p>
              <p className="text-[11.5px] text-muted-foreground">Avg response: 22 min in Addis Ababa</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="px-5 mt-6 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        What's the issue?
      </h2>
      <div className="px-5 grid grid-cols-3 gap-3">
        {[
          { icon: Zap, label: "Out of charge" },
          { icon: Truck, label: "Need a tow" },
          { icon: Wrench, label: "On-spot fix" },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="aspect-square rounded-2xl border border-border bg-surface flex flex-col items-center justify-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center">
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-[11px] font-medium text-center px-1">{label}</span>
          </button>
        ))}
      </div>

      <h2 className="px-5 mt-6 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        Your location
      </h2>
      <div className="px-5">
        <div className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/15 grid place-items-center">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Bole Road, near Edna Mall</p>
            <p className="text-[11px] text-muted-foreground">GPS locked · 9.0102° N, 38.7891° E</p>
          </div>
          <button className="text-[11px] text-primary font-semibold">Edit</button>
        </div>
      </div>

      <div className="px-5 mt-8 space-y-3">
        <Link to="/appointments" className="flex items-center justify-center gap-2 h-13 rounded-2xl bg-destructive text-destructive-foreground font-semibold shadow-card">
          <AlertTriangle className="h-4 w-4" /> Request emergency now
        </Link>
        <div className="grid grid-cols-2 gap-3">
          <a href="tel:+251911000000" className="flex items-center justify-center gap-2 h-12 rounded-2xl border border-border bg-surface text-sm font-medium">
            <Phone className="h-4 w-4" /> Call dispatch
          </a>
          <a href="https://wa.me/251911000000" className="flex items-center justify-center gap-2 h-12 rounded-2xl border border-success/30 bg-success/15 text-success text-sm font-medium">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </MobileShell>
  );
}