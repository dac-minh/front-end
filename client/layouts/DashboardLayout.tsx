import { PropsWithChildren, useEffect, useState } from "react";
import {
  Bell,
  LineChart,
  LogOut,
  Newspaper,
  PieChart,
  Settings,
  User,
  Wallet,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function SidebarItem({
  icon: Icon,
  label,
  to,
  collapsed,
}: {
  icon: any;
  label: string;
  to?: string;
  collapsed: boolean;
}) {
  const location = useLocation();
  const active = to ? location.pathname.startsWith(to) : false;
  const Comp: any = to ? Link : (props: any) => <div {...props} />;
  return (
    <Comp
      to={to as any}
      title={collapsed ? label : undefined}
      className={`group flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition-colors ${
        active
          ? "bg-white/10 text-white ring-1 ring-white/10"
          : "text-muted-foreground hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10"
      }`}
    >
      <span
        className={`inline-flex items-center justify-center ${
          active ? "text-white" : "text-white/70"
        }`}
      >
        <Icon size={18} />
      </span>
      {!collapsed && <span className="truncate">{label}</span>}
    </Comp>
  );
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar:collapsed");
    setCollapsed(saved === "1");
  }, []);
  useEffect(() => {
    localStorage.setItem("sidebar:collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  const sidebarWidth = collapsed ? 56 : 176;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0a0a0a,rgba(10,10,10,0.95))] text-white">
      <div
        className="mx-auto grid max-w-[1400px] gap-6 px-6 py-6"
        style={{
          gridTemplateColumns: `${sidebarWidth}px 1fr`,
          transition: "grid-template-columns .2s ease",
        }}
      >
        {/* Sidebar */}
        <aside
          className="sticky top-6 relative flex h-[calc(100vh-48px)] flex-col overflow-hidden rounded-2xl bg-[#0f0f0f] p-3 ring-1 ring-white/10"
          style={{ width: sidebarWidth }}
        >
          <div className="mb-2 flex items-center justify-between px-1">
            {!collapsed ? (
              <div className="px-1 text-lg font-semibold text-primary">Dashboard</div>
            ) : (
              <div className="inline-flex size-6 items-center justify-center rounded-lg bg-yellow-300 text-black font-bold">D</div>
            )}
            <button
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              className="inline-flex size-6 items-center justify-center rounded-lg bg-white/5 text-white/70 hover:bg-white/10"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav className="mt-2 grid flex-1 min-h-0 gap-1 overflow-auto pb-2">
            <SidebarItem icon={PieChart} label="Dashboard" to="/dashboard" collapsed={collapsed} />
            <SidebarItem icon={User} label="Account" to="/account" collapsed={collapsed} />
            <SidebarItem icon={LineChart} label="Chart" to="/chart" collapsed={collapsed} />
            <SidebarItem icon={Wallet} label="Wallet" to="/wallet" collapsed={collapsed} />
            <SidebarItem icon={Newspaper} label="News" to="/news" collapsed={collapsed} />
            <SidebarItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} />
          </nav>

          <div className="mt-3 rounded-xl bg-background/40 p-3 text-sm ring-1 ring-white/10">
            <div className="mb-2 text-muted-foreground">Quick actions</div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline" title={collapsed ? "Log out" : undefined}>
              <LogOut size={16} /> Log out
            </Link>
          </div>
        </aside>

        {/* Content */}
        <section className="space-y-6">
          {/* Top bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                placeholder="Search"
                className="h-10 w-full rounded-xl bg-[#0f0f0f] pl-10 pr-4 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-muted-foreground"
              />
            </div>
            <button className="inline-flex size-10 items-center justify-center rounded-full bg-[#0f0f0f] ring-1 ring-white/10">
              <Bell size={18} />
            </button>
            <div className="inline-flex size-10 items-center justify-center rounded-full bg-yellow-300 text-black font-semibold">
              A
            </div>
          </div>

          {children}
        </section>
      </div>
    </main>
  );
}
