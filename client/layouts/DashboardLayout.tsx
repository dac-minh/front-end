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
  LayoutGrid,
  Mail,
  Moon,
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
      className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${active ? "bg-[#1a1a1a] text-white" : "text-white/60 hover:bg-white/5"}`}
    >
      <span className={`inline-flex items-center justify-center rounded-md ${active ? "bg-yellow-300 text-black" : "bg-white/5 text-white/70"} h-5 w-5`}>
        <Icon size={14} />
      </span>
      {!collapsed && <span className="font-medium">{label}</span>}
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
      <header className="sticky top-0 z-40 bg-[#0f0f0f]/70 backdrop-blur ring-1 ring-white/10">
        <div className="flex items-center gap-3 px-6 py-3">
          <div className="text-lg font-semibold text-yellow-300">Dashboard</div>
          <div className="relative mx-auto flex-1 max-w-2xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              placeholder="Search"
              className="h-10 w-full rounded-full bg-[#0f0f0f] pl-10 pr-4 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-muted-foreground"
            />
          </div>
          <button className="inline-flex size-9 items-center justify-center rounded-lg bg-[#0f0f0f] ring-1 ring-white/10"><Mail size={18} /></button>
          <button className="inline-flex size-9 items-center justify-center rounded-lg bg-[#0f0f0f] ring-1 ring-white/10"><Moon size={18} /></button>
          <button className="inline-flex size-9 items-center justify-center rounded-lg bg-[#0f0f0f] ring-1 ring-white/10"><Bell size={18} /></button>
          <div className="inline-flex size-10 items-center justify-center rounded-full bg-yellow-300 text-black font-semibold">A</div>
        </div>
      </header>
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
          {children}
        </section>
      </div>
    </main>
  );
}
