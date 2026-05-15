import { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, Wrench, ShoppingBag, Calendar, User } from "lucide-react";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/parts", label: "Parts", icon: ShoppingBag },
  { to: "/appointments", label: "Track", icon: Calendar },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function MobileShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-background overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-glow opacity-70" />
        <div className={`relative z-10 ${hideNav ? "" : "pb-24"}`}>{children}</div>
        {!hideNav && <BottomNav current={location.pathname} />}
      </div>
    </div>
  );
}

function BottomNav({ current }: { current: string }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50">
      <div className="mx-3 mb-3 glass border border-border rounded-2xl shadow-card px-2 py-2 flex items-center justify-between">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = current === to || (to !== "/home" && current.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <div
                className={`flex items-center justify-center h-9 w-9 rounded-xl transition-all ${
                  active ? "bg-gradient-primary shadow-glow" : "bg-transparent"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 1.8} />
              </div>
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  back,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: string;
  right?: ReactNode;
}) {
  return (
    <header className="px-5 pt-6 pb-4 flex items-start justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {back && (
          <Link
            to={back}
            className="h-10 w-10 grid place-items-center rounded-xl border border-border bg-surface text-foreground shrink-0"
          >
            <span className="text-lg leading-none">‹</span>
          </Link>
        )}
        <div className="min-w-0">
          <h1 className="font-[Space_Grotesk] text-[22px] font-semibold leading-tight truncate">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {right}
    </header>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="px-5 mt-6 mb-3 flex items-center justify-between">
      <h2 className="font-[Space_Grotesk] text-[15px] font-semibold tracking-wide">{children}</h2>
      {action}
    </div>
  );
}