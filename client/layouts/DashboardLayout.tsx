import { PropsWithChildren, useEffect, useRef, useState } from "react";
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

const SidebarItem = ({
  icon: Icon,
  label,
  to,
  collapsed,
}: {
  icon: any;
  label: string;
  to?: string;
  collapsed: boolean;
}) => {
  const location = useLocation();
  const active = to ? location.pathname.startsWith(to) : false;
  const Comp: any = to ? Link : (props: any) => <div {...props} />;
  return (
    <Comp
      to={to as any}
      title={collapsed ? label : undefined}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${active ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5"}`}
    >
      <Icon size={18} />
      {!collapsed && <span>{label}</span>}
    </Comp>
  );
};

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar:collapsed");
    if (saved === null) setCollapsed(true);
    else setCollapsed(saved === "1");
  }, []);
  useEffect(() => {
    localStorage.setItem("sidebar:collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  const asideRef = useRef<HTMLDivElement | null>(null);
  const hideTimer = useRef<number | null>(null);
  const openSidebar = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setCollapsed(false);
  };
  const scheduleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setCollapsed(true), 180);
  };
  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      if (!asideRef.current) return;
      if (asideRef.current.contains(e.target as Node)) return;
      setCollapsed(true);
    };
    const onScroll = () => setCollapsed(true);
    document.addEventListener("mousedown", handleDown);
    window.addEventListener("scroll", onScroll, { passive: true } as any);
    return () => {
      document.removeEventListener("mousedown", handleDown);
      window.removeEventListener("scroll", onScroll as any);
    };
  }, []);

  const sidebarWidth = collapsed ? 0 : 240;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0a0a0a,rgba(10,10,10,0.95))] text-white">
      <div
        className="mx-auto grid max-w-[1400px] gap-6 px-6 py-6"
        style={{ gridTemplateColumns: `${sidebarWidth}px 1fr` }}
      >
        {/* Sidebar */}
        <aside
          ref={asideRef}
          onMouseEnter={openSidebar}
          onMouseLeave={scheduleHide}
          className={`rounded-2xl bg-[#0f0f0f] p-3 ring-1 ring-white/10 transition-[width,opacity] duration-200 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          style={{ width: sidebarWidth }}
        >
          <div className="mb-4 flex items-center justify-between px-1">
            {!collapsed ? (
              <div className="px-1 text-lg font-semibold text-primary">Dashboard</div>
            ) : null}
            <button
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              className="inline-flex size-8 items-center justify-center rounded-lg bg-white/5 text-white/70 hover:bg-white/10"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav className="grid gap-1">
            <SidebarItem icon={PieChart} label="Dashboard" to="/dashboard" collapsed={collapsed} />
            <SidebarItem icon={User} label="Account" to="/account" collapsed={collapsed} />
            <SidebarItem icon={LineChart} label="Chart" to="/chart" collapsed={collapsed} />
            <SidebarItem icon={Wallet} label="Wallet" to="/wallet" collapsed={collapsed} />
            <SidebarItem icon={Newspaper} label="News" to="/news" collapsed={collapsed} />
            <SidebarItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} />
          </nav>

          <div className="mt-8 rounded-xl bg-background/40 p-3 text-sm ring-1 ring-white/10">
            <div className="mb-2 text-muted-foreground">Quick actions</div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
              <LogOut size={16} /> Log out
            </Link>
          </div>
        </aside>

        {/* Content */}
        <section className="space-y-6">
          {/* Top bar */}
          <div className="flex items-center gap-3">
            {collapsed && (
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-[#0f0f0f] px-3 py-2 text-sm font-semibold text-primary ring-1 ring-white/10">Dashboard</span>
                <button
                  onClick={() => setCollapsed(false)}
                  aria-label="Open sidebar"
                  className="inline-flex size-8 items-center justify-center rounded-lg bg-[#0f0f0f] ring-1 ring-white/10"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
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
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          aria-label="Open sidebar"
          className="fixed left-4 top-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-300 text-black font-bold shadow ring-1 ring-black/10"
        >
          D
        </button>
      )}
      {/* Hover edge reveal zone */}
      <div
        onMouseEnter={openSidebar}
        className="fixed left-0 top-0 z-40 h-screen w-2 md:w-3 bg-transparent"
        aria-hidden
      />
    </main>
  );
}
