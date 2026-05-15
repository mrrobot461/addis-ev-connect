import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Wrench, Plug, Stethoscope, Check, MessageCircle, MapPin } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/appointments")({
  component: Appointments,
});

const tabs = ["Active", "Upcoming", "History"] as const;

const items = {
  Active: [
    {
      icon: Wrench, title: "Brake & motor service", garage: "Voltix Bole Hub",
      step: 2, code: "VX-2841", status: "Inspection",
    },
  ],
  Upcoming: [
    { icon: Plug, title: "Home charger install · 7kW", garage: "On-site · Bole", step: 0, code: "VX-2987", status: "Survey scheduled" },
    { icon: Stethoscope, title: "Annual inspection", garage: "Voltix CMC", step: 0, code: "VX-3014", status: "Confirmed" },
  ],
  History: [
    { icon: Wrench, title: "Tire rotation", garage: "Voltix Megenagna", step: 4, code: "VX-2701", status: "Completed" },
    { icon: Plug, title: "Charger firmware update", garage: "On-site", step: 4, code: "VX-2654", status: "Completed" },
  ],
};

function Appointments() {
  const [tab, setTab] = useState<typeof tabs[number]>("Active");
  const list = items[tab];

  return (
    <MobileShell>
      <ScreenHeader title="My appointments" subtitle="Track every service in real time" />

      <div className="px-5">
        <div className="glass border border-border rounded-2xl p-1.5 flex">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-medium rounded-xl transition-all ${
                tab === t ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5 space-y-4">
        {list.map((it) => (
          <div key={it.code} className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <it.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{it.title}</p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {it.garage} · #{it.code}
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                it.step === 4 ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
              }`}>{it.status}</span>
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-center">
                {["Booked", "Inspection", "Repair", "Quality", "Ready"].map((s, i, arr) => {
                  const done = i <= it.step;
                  return (
                    <div key={s} className="flex-1 flex items-center">
                      <div className={`h-7 w-7 rounded-full grid place-items-center text-[10px] font-bold ${
                        done ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-surface-2 text-muted-foreground border border-border"
                      }`}>
                        {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                      {i < arr.length - 1 && (
                        <div className={`flex-1 h-0.5 ${i < it.step ? "bg-gradient-primary" : "bg-surface-2"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Booked</span><span>Inspection</span><span>Repair</span><span>Quality</span><span>Ready</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-10 rounded-xl border border-border bg-surface-2 text-xs font-medium flex items-center justify-center gap-2">
                  <Calendar className="h-3.5 w-3.5" /> Reschedule
                </button>
                <a href="https://wa.me/251911000000" className="flex-1 h-10 rounded-xl bg-gradient-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-2 shadow-glow">
                  <MessageCircle className="h-3.5 w-3.5" /> Chat technician
                </a>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">Nothing here yet.</p>
        )}
      </div>
    </MobileShell>
  );
}