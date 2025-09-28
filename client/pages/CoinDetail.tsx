import DashboardLayout from "@/layouts/DashboardLayout";
import { useParams } from "react-router-dom";

const Stat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="rounded-xl bg-[#0f0f0f] p-4 ring-1 ring-white/10">
    <div className="text-xs text-white/50">{label}</div>
    <div className="mt-2 text-white">{value}</div>
    {sub && <div className="text-xs text-red-400">{sub}</div>}
  </div>
);

export default function CoinDetail() {
  const { symbol = "BTC" } = useParams();
  const name = {
    BTC: "Bitcoin",
    ETH: "Ethereum",
    SOL: "Solana",
    LTC: "Litecoin",
    BNB: "BNB",
    ADA: "Cardano",
  }[symbol as keyof any] || symbol;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-2xl bg-[#101010] p-5 ring-1 ring-white/10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white/90">{name} <span className="text-white/50">({symbol})</span></h1>
            <div className="text-2xl font-extrabold text-yellow-300">$52,241</div>
          </div>
          <div className="mt-4 text-sm text-white/50">Chart</div>
          <div className="relative mt-2 h-[260px] overflow-hidden rounded-xl bg-gradient-to-b from-yellow-300/15 via-yellow-400/10 to-transparent">
            <svg viewBox="0 0 600 200" className="absolute inset-0 h-full w-full opacity-90">
              <defs>
                <linearGradient id="c" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#fde047" offset="0%" />
                  <stop stopColor="transparent" offset="100%" />
                </linearGradient>
              </defs>
              <path d="M0,170 L40,160 L80,140 L120,150 L160,120 L200,135 L240,100 L280,150 L320,140 L360,160 L400,130 L440,110 L480,140 L520,120 L560,130 L600,100" stroke="#fde047" strokeWidth="3" fill="url(#c)" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-24 gap-1 px-3 pb-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="h-[18px] rounded bg-yellow-200/20" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 grid gap-4 sm:grid-cols-2">
            <Stat label="Market cap" value="$2.33T" sub="-0.23%" />
            <Stat label="FDV" value="$2.45T" />
            <Stat label="Volume (24h)" value="$41.81B" sub="-36.5%" />
            <Stat label="Vol/Mkt Cap (24h)" value="1.83%" />
            <Stat label="Max supply" value="21M BTC" />
            <Stat label="Circulating supply" value="19.92M BTC" />
          </div>
          <div className="lg:col-span-7 rounded-2xl bg-[#0f0f0f] ring-1 ring-white/10">
            <div className="border-b border-white/5 px-4 py-3 text-sm text-white/70">News</div>
            <ul className="divide-y divide-white/5">
              {[
                "Bitcoin RGB Developer Blight Labs Secures Major $0.6M Funding for Breakthrough Infrastructure",
                "Bitcoin price $150K target comes as analyst sees weak to all-time highs",
              ].map((t, i) => (
                <li key={i} className="px-4 py-3 text-sm text-white/90">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
