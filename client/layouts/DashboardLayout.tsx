import { PropsWithChildren } from "react";
import { Bell, LineChart, LogOut, Newspaper, PieChart, Settings, User, Wallet, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, to }: { icon: any; label: string; to?: string }) => {
  const location = useLocation();
  const active = to ? location.pathname.startsWith(to) : false;
  const Comp: any = to ? Link : (props: any) => <div {...props} />;
  return (
    <Comp
      to={to as any}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${active ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5"}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Comp>
  );
};

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0a0a0a,rgba(10,10,10,0.95))] text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[240px_1fr] gap-6 px-6 py-6">
        {/* Sidebar */}
        <aside className="rounded-2xl bg-[#0f0f0f] p-4 ring-1 ring-white/10">
          <div className="mb-6 px-2 text-lg font-semibold text-primary">Dashboard</div>
          <nav className="grid gap-1">
            <SidebarItem icon={PieChart} label="Dashboard" to="/dashboard" />
            <SidebarItem icon={User} label="Account" to="/account" />
            <SidebarItem icon={LineChart} label="Chart" />
            <SidebarItem icon={Wallet} label="Wallet" to="/wallet" />
            <SidebarItem icon={Newspaper} label="News" />
            <SidebarItem icon={Settings} label="Settings" to="/settings" />
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
            <div className="inline-flex size-10 items-center justify-center rounded-full bg-yellow-300 text-black font-semibold">A</div>
          </div>

          {children}
        </section>
      </div>
    </main>
  );
}
