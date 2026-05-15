import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login" }), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-90" />
      <div className="absolute -top-40 -left-20 w-80 h-80 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full bg-accent-blue/20 blur-3xl" />
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-60 animate-pulse-glow rounded-full" />
          <div className="relative h-24 w-24 rounded-3xl bg-gradient-primary grid place-items-center shadow-glow">
            <Zap className="h-12 w-12 text-primary-foreground" strokeWidth={2.4} fill="currentColor" />
          </div>
        </div>
        <h1 className="font-[Space_Grotesk] text-5xl font-bold tracking-tight">
          Voltix
        </h1>
        <p className="mt-2 text-sm text-muted-foreground tracking-[0.3em] uppercase">
          EV Garage · Addis Ababa
        </p>
        <div className="mt-12 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <Link to="/login" className="absolute bottom-10 text-xs text-muted-foreground">
          Tap to continue
        </Link>
      </div>
    </div>
  );
}
