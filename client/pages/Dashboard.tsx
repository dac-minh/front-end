import DashboardLayout from "@/layouts/DashboardLayout";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

type Asset = { name: string; code: string; value: string; change: string; color: string; trend: "up" | "down" };

const Sparkline = ({ color = "#fde047" }: { color?: string }) => (
  <svg viewBox="0 0 120 40" className="h-10 w-full">
    <defs>
      <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
        <stop stopColor={color} offset="0%" />
        <stop stopColor="transparent" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M0,30 L10,28 L20,24 L30,26 L40,20 L50,23 L60,18 L70,26 L80,22 L90,28 L100,21 L110,19 L120,24"
      stroke={color}
      strokeWidth="2"
      fill="url(#sg)"
    />
  </svg>
);

const MiniAssetCard = ({ a }: { a: Asset }) => (
  <Link
    to={`/chart/${a.code}`}
    className="group rounded-xl bg-[#141414] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/5"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className="inline-flex size-6 rounded-full ring-2 ring-white/10"
          style={{ backgroundColor: a.color }}
        />
        <span className="text-sm text-white/90">{a.name}</span>
      </div>
      <span className="text-white/30">›</span>
    </div>
    <div className="mt-2 flex items-center justify-between">
      <div className="text-white/90">{a.value}</div>
      <span className={`text-xs ${a.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>{a.change}</span>
    </div>
    <div className="mt-2">
      <Sparkline color="#fde047" />
    </div>
  </Link>
);

const PortfolioItem = ({ name, code, pct, color }: { name: string; code: string; pct: number; color: string }) => (
  <div className="flex items-center justify-between rounded-xl bg-black px-3 py-2 text-black ring-1 ring-black/40">
    <div className="flex items-center gap-3">
      <span className="inline-flex size-7 items-center justify-center rounded-full ring-2 ring-yellow-400" style={{ backgroundColor: color }} />
      <div className="leading-4">
        <div className="text-[13px] font-semibold text-yellow-50/90">{name}</div>
        <div className="text-[10px] text-yellow-50/70">{code}</div>
      </div>
    </div>
    <div className="text-sm font-semibold text-yellow-50">{pct}%</div>
  </div>
);

export default function Dashboard() {
  const assets: Asset[] = [
    { name: "Bitcoin", code: "BTC", value: "$52,291", change: "+0.25%", color: "#f2b705", trend: "up" },
    { name: "Litecoin", code: "LTC", value: "$8,291", change: "+0.25%", color: "#b0e3ff", trend: "up" },
    { name: "Ethereum", code: "ETH", value: "$28,291", change: "+0.25%", color: "#7cc7ff", trend: "up" },
    { name: "Solana", code: "SOL", value: "$14,291", change: "+0.15%", color: "#16a34a", trend: "up" },
  ];

  return (
    <DashboardLayout>
      <div className="rounded-3xl bg-[#101010] p-6 ring-1 ring-white/10">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-white/60">TOTAL BALANCE</div>
            <div className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight">
              $154,510<span className="text-white/40 text-2xl align-top">.00</span>
            </div>
          </div>
          <div className="hidden gap-4 sm:flex">
            <div className="rounded-xl bg-[#0c0c0c] px-3 py-2 text-xs text-white/70 ring-1 ring-white/10">To <span className="ml-1 text-red-400">-2.5%</span></div>
            <div className="rounded-xl bg-[#0c0c0c] px-3 py-2 text-xs text-white/70 ring-1 ring-white/10">7 Days <span className="ml-1 text-emerald-400">+4.25%</span></div>
            <div className="rounded-xl bg-[#0c0c0c] px-3 py-2 text-xs text-white/70 ring-1 ring-white/10">30 Days <span className="ml-1 text-emerald-400">+11.5%</span></div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {assets.map((a) => (
            <MiniAssetCard key={a.code} a={a} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-3 rounded-2xl bg-yellow-300 p-5 ring-2 ring-yellow-400/50">
            <div className="mb-1 text-sm font-extrabold tracking-wide text-black">My Portfolio</div>
            <div className="grid gap-3">
              <PortfolioItem name="Bitcoin" code="BTC" pct={37} color="#f2b705" />
              <PortfolioItem name="Tether" code="USDT" pct={23} color="#f5f5f5" />
              <PortfolioItem name="Ethereum" code="ETH" pct={20} color="#7cc7ff" />
              <PortfolioItem name="Ripple" code="XLA" pct={20} color="#60a5fa" />
              <PortfolioItem name="Ethereum" code="ETH" pct={20} color="#7cc7ff" />
            </div>
          </div>

          <div className="lg:col-span-8 rounded-2xl bg-[#0f0f0f] p-5 ring-1 ring-white/10">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-yellow-200/80">Chart</div>
              <div className="flex items-center gap-2">
                {(["1h", "2h", "3h", "1d", "1w", "1m"] as const).map((t) => (
                  <button key={t} className={`rounded-full px-3 py-1 text-xs ring-1 ring-white/10 ${t === "1h" ? "bg-yellow-300 text-black" : "bg-transparent text-white/70"}`}>{t}</button>
                ))}
                <button className="inline-flex items-center rounded-lg bg-white/5 p-2 text-white/70 ring-1 ring-white/10 hover:bg-white/10"><MoreHorizontal size={16} /></button>
              </div>
            </div>
            <div className="relative h-[340px] overflow-hidden rounded-xl bg-gradient-to-b from-yellow-300/10 via-yellow-400/5 to-transparent">
              <svg viewBox="0 0 800 260" className="absolute inset-0 h-full w-full opacity-90">
                <defs>
                  <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="#fde047" offset="0%" />
                    <stop stopColor="transparent" offset="100%" />
                  </linearGradient>
                </defs>
                <path d="M0,210 L40,200 L80,190 L120,195 L160,170 L200,185 L240,160 L280,200 L320,190 L360,210 L400,180 L440,160 L480,190 L520,170 L560,180 L600,150 L640,170 L680,160 L720,175 L760,165 L800,140" stroke="#fde047" strokeWidth="3" fill="url(#cg)" />
              </svg>
              <div className="absolute inset-0 grid grid-rows-6 gap-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-px w-full bg-yellow-200/10" />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-24 gap-1 px-3 pb-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="h-[18px] rounded bg-yellow-200/15" />
                ))}
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">$38,252.02</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
