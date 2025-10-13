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
  onClick,
}: {
  icon: any;
  label: string;
  to?: string;
  collapsed: boolean;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const active = to ? location.pathname.startsWith(to) : false;
  const Comp: any = to ? Link : (props: any) => <div {...props} />;
  return (
    <Comp
      to={to as any}
      title={collapsed ? label : undefined}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${active ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5"}`}
    >
      <Icon size={18} />
      {!collapsed && <span>{label}</span>}
    </Comp>
  );
};

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    // Always keep sidebar open and pinned
    setCollapsed(false);
    setPinned(true);
  }, []);
  useEffect(() => {
    localStorage.setItem("sidebar:collapsed", collapsed ? "1" : "0");
  }, [collapsed]);
  useEffect(() => {
    localStorage.setItem("sidebar:pinned", pinned ? "1" : "0");
  }, [pinned]);

  const asideRef = useRef<HTMLDivElement | null>(null);
  const hideTimer = useRef<number | null>(null);
  const pinnedRef = useRef(false);
  useEffect(() => {
    pinnedRef.current = pinned;
  }, [pinned]);
  const openSidebar = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setCollapsed(false);
  };
  const scheduleHide = () => {
    // auto-hide disabled
  };
  useEffect(() => {
    // outside-click and scroll auto-hide disabled
  }, []);

  const sidebarWidth = 240;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0a0a0a,rgba(10,10,10,0.95))] text-white">
      <div
        className="grid w-full gap-6 px-6 py-6"
        style={{ gridTemplateColumns: `${sidebarWidth}px 1fr` }}
      >
        {/* Sidebar */}
        <aside
          ref={asideRef}
          className={`rounded-2xl bg-[#0f0f0f] p-3 ring-1 ring-white/10`}
          style={{ width: sidebarWidth }}
        >
          <div className="mb-4 flex items-center justify-between px-1">
            <div className="px-1 text-lg font-semibold text-primary">Dashboard</div>
          </div>

          <nav className="grid gap-1">
            <SidebarItem icon={PieChart} label="Dashboard" to="/dashboard" collapsed={collapsed} onClick={() => setPinned(true)} />
            <SidebarItem icon={User} label="Account" to="/account" collapsed={collapsed} onClick={() => setPinned(true)} />
            <SidebarItem icon={LineChart} label="Chart" to="/chart" collapsed={collapsed} onClick={() => setPinned(true)} />
            <SidebarItem icon={Wallet} label="Wallet" to="/wallet" collapsed={collapsed} onClick={() => setPinned(true)} />
            <SidebarItem icon={Newspaper} label="News" to="/news" collapsed={collapsed} onClick={() => setPinned(true)} />
            <SidebarItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} onClick={() => setPinned(true)} />
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
                  onClick={() => {
                    setPinned(true);
                    setCollapsed(false);
                  }}
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
    </main>
  );
}
