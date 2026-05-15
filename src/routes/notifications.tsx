import { createFileRoute } from "@tanstack/react-router";
import { Bell, Wrench, BatteryCharging, Tag, MapPin, MessageCircle } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
});

const groups = [
  {
    label: "Today",
    items: [
      { icon: Wrench, title: "Inspection complete", body: "Brake pads at 38% — recommend replacing soon.", time: "10m", color: "primary" },
      { icon: MessageCircle, title: "Tech assigned: Mikiyas A.", body: "Will start work in 15 minutes.", time: "32m", color: "accent-blue" },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { icon: BatteryCharging, title: "Battery report ready", body: "SOH 92% · download PDF in your service history.", time: "1d", color: "primary" },
      { icon: Tag, title: "20% off cabin filters", body: "Limited offer in spare parts marketplace.", time: "1d", color: "warning" },
      { icon: MapPin, title: "New branch opening: Ayat", body: "Ayat Square Service Hub now accepting bookings.", time: "1d", color: "accent-blue" },
    ],
  },
];

function Notifications() {
  return (
    <MobileShell>
      <ScreenHeader
        title="Notifications"
        subtitle="Service updates & offers"
        right={<button className="text-[11px] text-primary font-semibold">Mark all read</button>}
      />
      {groups.map((g) => (
        <div key={g.label}>
          <h2 className="px-5 mt-3 mb-3 font-[Space_Grotesk] text-[12px] font-semibold tracking-wide text-muted-foreground uppercase">
            {g.label}
          </h2>
          <div className="px-5 space-y-2.5">
            {g.items.map((n, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-2xl border border-border bg-surface">
                <div className={`h-10 w-10 rounded-xl grid place-items-center shrink-0 ${
                  n.color === "warning" ? "bg-warning/15 text-warning" :
                  n.color === "accent-blue" ? "bg-accent-blue/15 text-accent-blue" :
                  "bg-gradient-primary text-primary-foreground shadow-glow"
                }`}>
                  <n.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold truncate">{n.title}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                  <p className="text-[11.5px] text-muted-foreground mt-0.5">{n.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="px-5 mt-8 text-center">
        <Bell className="h-5 w-5 text-muted-foreground mx-auto" />
        <p className="text-[11px] text-muted-foreground mt-2">You're all caught up.</p>
      </div>
    </MobileShell>
  );
}