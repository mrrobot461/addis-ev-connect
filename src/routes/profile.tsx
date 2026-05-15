import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Car, CreditCard, MapPin, Bell, Shield, HelpCircle, LogOut, ChevronRight, MessageCircle, Globe, Moon,
} from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  return (
    <MobileShell>
      <ScreenHeader title="Profile" />

      <div className="px-5">
        <div className="rounded-3xl border border-border bg-gradient-surface p-5 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
              <span className="text-lg font-bold text-primary-foreground">DT</span>
            </div>
            <div className="flex-1">
              <p className="font-[Space_Grotesk] text-lg font-semibold">Dawit Tesfaye</p>
              <p className="text-[11.5px] text-muted-foreground">+251 911 23 45 67 · Bole, Addis Ababa</p>
              <span className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                Voltix Care · Gold member
              </span>
            </div>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-3 text-center">
            {[
              ["Vehicles", "1"], ["Services", "12"], ["Saved", "8"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl bg-surface-2/60 border border-border py-2.5">
                <p className="font-[Space_Grotesk] text-lg font-bold">{v}</p>
                <p className="text-[10px] text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My EV */}
      <h2 className="px-5 mt-7 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        My vehicles
      </h2>
      <div className="px-5">
        <div className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">BYD Atto 3 · 2024</p>
            <p className="text-[11px] text-muted-foreground">ET-3 A12345 · 18,420 km</p>
          </div>
          <button className="text-[11px] text-primary font-semibold">Edit</button>
        </div>
        <button className="mt-2 w-full p-3 rounded-2xl border border-dashed border-border text-xs text-muted-foreground">
          + Add another vehicle
        </button>
      </div>

      {/* Settings groups */}
      <Group title="Account">
        <Item icon={CreditCard} label="Payment methods" sub="Telebirr, Visa, CBE Birr" />
        <Item icon={MapPin} label="Saved addresses" sub="Home, Office" />
        <Item icon={Bell} label="Notifications" sub="Push, SMS, WhatsApp" />
      </Group>

      <Group title="Preferences">
        <Item icon={Moon} label="Appearance" sub="Dark" />
        <Item icon={Globe} label="Language" sub="English · አማርኛ" />
      </Group>

      <Group title="Support">
        <Item icon={MessageCircle} label="Chat with Voltix" sub="Mon–Sat · 8 AM – 8 PM" />
        <Item icon={Shield} label="Privacy & data" />
        <Item icon={HelpCircle} label="Help center" />
      </Group>

      <div className="px-5 mt-6">
        <Link to="/login" className="w-full h-12 rounded-2xl border border-destructive/40 bg-destructive/10 text-destructive font-semibold text-sm flex items-center justify-center gap-2">
          <LogOut className="h-4 w-4" /> Sign out
        </Link>
        <p className="text-center text-[10px] text-muted-foreground mt-4">Voltix v1.4.0 · Addis Ababa, Ethiopia</p>
      </div>
    </MobileShell>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className="px-5 mt-7 mb-3 font-[Space_Grotesk] text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="px-5">
        <div className="rounded-2xl border border-border bg-surface divide-y divide-border">
          {children}
        </div>
      </div>
    </>
  );
}

function Item({ icon: Icon, label, sub }: { icon: any; label: string; sub?: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-4 text-left">
      <div className="h-9 w-9 rounded-xl bg-primary/15 grid place-items-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}