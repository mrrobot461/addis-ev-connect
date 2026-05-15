import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Zap, Phone, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-80" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10 flex flex-col min-h-screen px-6 pt-14 pb-8">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Zap className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-[Space_Grotesk] text-xl font-semibold">Voltix</span>
          </div>

          <div className="mt-12">
            <h1 className="font-[Space_Grotesk] text-3xl font-bold leading-tight">
              Power up your <span className="text-gradient">EV journey</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Service, parts and charging — built for Ethiopia's electric future.
            </p>
          </div>

          <div className="mt-8 glass border border-border rounded-2xl p-1.5 flex">
            {(["signin", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  tab === t ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground"
                }`}
              >
                {t === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {tab === "signup" && (
              <Field icon={<Mail className="h-4 w-4" />} label="Full name" placeholder="Dawit Tesfaye" />
            )}
            <Field icon={<Phone className="h-4 w-4" />} label="Phone number" placeholder="+251 9** *** ***" />
            <Field icon={<Lock className="h-4 w-4" />} label="Password" type="password" placeholder="••••••••" />
          </div>

          <Link
            to="/home"
            className="mt-6 h-13 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-center shadow-glow"
          >
            {tab === "signin" ? "Sign in" : "Create account"}
          </Link>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] text-muted-foreground tracking-wider uppercase">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="h-12 rounded-xl border border-border bg-surface text-sm font-medium">Google</button>
            <button className="h-12 rounded-xl border border-border bg-surface text-sm font-medium">Telebirr</button>
          </div>

          <p className="mt-auto pt-8 text-center text-xs text-muted-foreground">
            By continuing you agree to Voltix's Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium text-muted-foreground tracking-wider uppercase">{label}</span>
      <div className="mt-1.5 flex items-center gap-3 h-13 px-4 py-3.5 rounded-xl border border-border bg-surface focus-within:border-primary transition-colors">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/60"
        />
      </div>
    </label>
  );
}