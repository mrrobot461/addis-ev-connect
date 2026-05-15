import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, MapPin, Check, MessageCircle } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/services/repair")({
  component: Repair,
});

const issues = [
  "Motor / drivetrain", "Brakes & suspension", "Battery cooling",
  "Charging port fault", "Software update", "Body & paint",
];
const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function Repair() {
  const [selectedIssue, setSelectedIssue] = useState("Brakes & suspension");
  const [selectedSlot, setSelectedSlot] = useState("10:30");

  return (
    <MobileShell>
      <ScreenHeader title="Book EV repair" subtitle="Step 2 of 3" back="/services" />

      <div className="px-5">
        <div className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <span className="text-xs font-bold text-primary-foreground">EV</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">BYD Atto 3 · 2024</p>
            <p className="text-[11px] text-muted-foreground">ET-3 A12345 · 18,420 km</p>
          </div>
          <button className="text-[11px] text-primary font-semibold">Change</button>
        </div>
      </div>

      <Section title="What's the issue?">
        <div className="px-5 grid grid-cols-2 gap-2.5">
          {issues.map((i) => {
            const active = i === selectedIssue;
            return (
              <button
                key={i}
                onClick={() => setSelectedIssue(i)}
                className={`text-left text-xs font-medium p-3 rounded-xl border transition-all ${
                  active
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border bg-surface text-muted-foreground"
                }`}
              >
                {i}
                {active && <Check className="inline h-3.5 w-3.5 ml-1 text-primary" />}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Describe (optional)">
        <div className="px-5">
          <textarea
            rows={3}
            placeholder="e.g. Squeaking from rear brakes when slowing under 30 km/h…"
            className="w-full rounded-2xl border border-border bg-surface p-3.5 text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary"
          />
        </div>
      </Section>

      <Section title="Pick a date" right={<button className="text-[11px] text-primary">This week</button>}>
        <div className="px-5 flex gap-2 overflow-x-auto -mx-1 px-1">
          {[
            ["MON", "12"], ["TUE", "13"], ["WED", "14"],
            ["THU", "15"], ["FRI", "16"], ["SAT", "17"], ["SUN", "18"],
          ].map(([d, n], i) => {
            const active = i === 2;
            return (
              <button
                key={d}
                className={`shrink-0 w-14 py-3 rounded-2xl border text-center transition-all ${
                  active ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow" : "border-border bg-surface text-muted-foreground"
                }`}
              >
                <p className="text-[10px] font-medium">{d}</p>
                <p className="font-[Space_Grotesk] text-lg font-bold mt-0.5">{n}</p>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Available slots">
        <div className="px-5 grid grid-cols-3 gap-2.5">
          {slots.map((s) => {
            const active = s === selectedSlot;
            return (
              <button
                key={s}
                onClick={() => setSelectedSlot(s)}
                className={`py-2.5 rounded-xl text-sm font-medium border ${
                  active ? "border-primary bg-primary/15 text-foreground" : "border-border bg-surface text-muted-foreground"
                }`}
              >
                <Clock className="inline h-3 w-3 mr-1 -mt-0.5" />
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Garage">
        <div className="px-5">
          <div className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/15 grid place-items-center">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Voltix Bole Service Hub</p>
              <p className="text-[11px] text-muted-foreground">Bole Medhanialem · 2.4 km</p>
            </div>
            <button className="text-[11px] text-primary font-semibold">Switch</button>
          </div>
        </div>
      </Section>

      {/* Summary CTA */}
      <div className="px-5 mt-8">
        <div className="rounded-2xl bg-gradient-surface border border-border p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated cost</span>
            <span className="font-semibold">ETB 2,400 – 3,800</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-semibold">~ 2 hrs</span>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <a href="https://wa.me/251911000000" className="h-13 w-13 grid place-items-center rounded-2xl border border-success/30 bg-success/15 text-success">
            <MessageCircle className="h-5 w-5" />
          </a>
          <Link to="/appointments" className="flex-1 h-13 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold grid place-items-center shadow-glow">
            Confirm booking · Wed 14 · {selectedSlot}
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}

function Section({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <div className="px-5 mt-6 mb-3 flex items-center justify-between">
        <h2 className="font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">{title}</h2>
        {right}
      </div>
      {children}
    </>
  );
}