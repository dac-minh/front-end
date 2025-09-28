import DashboardLayout from "@/layouts/DashboardLayout";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const AssetPill = ({
  name,
  code,
  pct,
  color,
}: {
  name: string;
  code: string;
  pct: number;
  color: string;
}) => (
  <div className="flex items-center justify-between rounded-xl bg-background/40 px-3 py-2 ring-1 ring-white/10">
    <div className="flex items-center gap-3">
      <span
        className="inline-flex size-7 items-center justify-center rounded-full"
        style={{ backgroundColor: color }}
      />
      <div>
        <div className="text-xs text-muted-foreground leading-4">{name}</div>
        <div className="text-[10px] text-muted-foreground/70">{code}</div>
      </div>
    </div>
    <div className="text-sm font-semibold text-white">{pct}%</div>
  </div>
);

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Cards row */}
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-12 rounded-2xl bg-[#101010] p-6 ring-1 ring-white/10">
          <div className="text-sm text-muted-foreground">TOTAL BALANCE</div>
          <div className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight">
            $154,510
            <span className="text-white/40 text-2xl align-top">.00</span>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {[
              {
                name: "Bitcoin",
                code: "BTC",
                value: "$52,291",
                change: "+0.25%",
                color: "#f2b705",
              },
              {
                name: "Litecoin",
                code: "LTC",
                value: "$8,291",
                change: "+0.25%",
                color: "#b0e3ff",
              },
              {
                name: "Ethereum",
                code: "ETH",
                value: "$28,291",
                change: "+0.25%",
                color: "#7cc7ff",
              },
              {
                name: "Solana",
                code: "SOL",
                value: "$14,291",
                change: "+0.15%",
                color: "#16a34a",
              },
              {
                name: "BNB",
                code: "BNB",
                value: "$9,022",
                change: "-0.10%",
                color: "#facc15",
              },
              {
                name: "Cardano",
                code: "ADA",
                value: "$3,991",
                change: "+0.05%",
                color: "#60a5fa",
              },
            ].map((a, idx) => (
              <Link
                key={idx}
                to={`/chart/${a.code}`}
                className="rounded-xl bg-[#0f0f0f] p-4 ring-1 ring-white/10 transition hover:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex size-6 rounded-full"
                      style={{ backgroundColor: a.color }}
                    />
                    <span className="text-sm text-white/90">{a.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-white/30" />
                </div>
                <div className="mt-3 text-white/90">{a.value}</div>
                <div className="text-xs text-green-400">{a.change}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom split */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-3 rounded-2xl bg-[#101010] p-5 ring-1 ring-white/10">
          <div className="text-sm font-semibold">My Portfolio</div>
          <div className="grid gap-3">
            <AssetPill name="Bitcoin" code="BTC" pct={37} color="#f2b705" />
            <AssetPill name="Tether" code="USDT" pct={23} color="#f5f5f5" />
            <AssetPill name="Ethereum" code="ETH" pct={20} color="#7cc7ff" />
            <AssetPill name="Ripple" code="XLA" pct={20} color="#60a5fa" />
          </div>
        </div>
        <div className="lg:col-span-8 rounded-2xl bg-[#101010] p-5 ring-1 ring-white/10">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Chart</div>
            <div className="flex items-center gap-2">
              {["1h", "1d", "1w", "1m"].map((t) => (
                <button
                  key={t}
                  className={`rounded-full px-3 py-1 text-xs ring-1 ring-white/10 ${t === "1w" ? "bg-primary text-black" : "bg-transparent text-white/70"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          {/* Faux line chart */}
          <div className="relative h-[300px] overflow-hidden rounded-xl bg-gradient-to-b from-yellow-300/15 via-yellow-400/10 to-transparent">
            <svg
              viewBox="0 0 600 200"
              className="absolute inset-0 h-full w-full opacity-90"
            >
              <defs>
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#fde047" offset="0%" />
                  <stop stopColor="transparent" offset="100%" />
                </linearGradient>
              </defs>
              <path
                d="M0,170 L40,160 L80,150 L120,155 L160,130 L200,145 L240,120 L280,160 L320,150 L360,170 L400,140 L440,120 L480,150 L520,130 L560,140 L600,110"
                stroke="#fde047"
                strokeWidth="3"
                fill="url(#g)"
              />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-24 gap-1 px-3 pb-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="h-[20px] rounded bg-yellow-200/20" />
              ))}
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">$38,252.02</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
