import DashboardLayout from "@/layouts/DashboardLayout";

const coins = [
  { code: "BTC", name: "Bitcoin", price: "$37,205", change: "+1.48%", share: 37 },
  { code: "ETH", name: "Ethereum", price: "$2,025", change: "+3.24%", share: 23 },
  { code: "USDT", name: "USDT", price: "$1.00", change: "+0.03%", share: 9 },
  { code: "BNB", name: "BNB", price: "$520", change: "+0.12%", share: 6 },
  { code: "SOL", name: "Solana", price: "$145", change: "+0.85%", share: 5 },
];

export default function ChartOverview() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Treemap-like grid */}
        <div className="grid gap-3 lg:grid-cols-4">
          <div className="lg:col-span-3 grid grid-cols-12 gap-3 rounded-2xl bg-[#0f0f0f] p-4 ring-1 ring-white/10">
            {/* Simple proportional blocks */}
            {coins.map((c) => (
              <div key={c.code} className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10" style={{ gridColumn: `span ${Math.max(2, Math.round((c.share/10)*3))} / span ${Math.max(2, Math.round((c.share/10)*3))}` }}>
                <div className="text-sm text-white/80">{c.name} ({c.code})</div>
                <div className="text-xs text-white/50">{c.price}</div>
                <div className="text-xs text-emerald-400">{c.change}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-[#0f0f0f] p-4 ring-1 ring-white/10">
            <div className="mb-2 text-sm font-semibold text-yellow-300">Top 5 uptrend</div>
            <ul className="space-y-2 text-sm">
              {coins.map((c, i) => (
                <li key={c.code} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                  <span className="text-white/80">{i+1}. {c.name}</span>
                  <span className="text-emerald-400">{c.share}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-[#0f0f0f] ring-1 ring-white/10">
          <div className="border-b border-white/5 px-4 py-3 text-sm text-white/70">Market rank</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-white/50">
                <tr>
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Change</th>
                  <th className="px-4 py-3">Mkt cap</th>
                  <th className="px-4 py-3">Volume</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { code: "BTC", name: "Bitcoin", price: "$63,205", change: "+1.10%", cap: "$1.24T", volume: "$38.0B" },
                  { code: "ETH", name: "Ethereum", price: "$3,025", change: "+0.48%", cap: "$620B", volume: "$22.0B" },
                  { code: "XRP", name: "XRP", price: "$0.52", change: "-1.02%", cap: "$29B", volume: "$2.5B" },
                  { code: "USDT", name: "Tether", price: "$1.00", change: "+0.01%", cap: "$110B", volume: "$40.0B" },
                  { code: "BNB", name: "BNB", price: "$520", change: "+0.35%", cap: "$80B", volume: "$1.7B" },
                  { code: "SOL", name: "Solana", price: "$145", change: "+0.85%", cap: "$70B", volume: "$3.4B" },
                ].map((r) => (
                  <tr key={r.code} className="hover:bg-white/5">
                    <td className="px-4 py-3 text-white/90">{r.name} <span className="text-white/50">({r.code})</span></td>
                    <td className="px-4 py-3">{r.price}</td>
                    <td className={`px-4 py-3 ${r.change.startsWith('-')?'text-red-400':'text-emerald-400'}`}>{r.change}</td>
                    <td className="px-4 py-3">{r.cap}</td>
                    <td className="px-4 py-3">{r.volume}</td>
                    <td className="px-4 py-3">
                      <a className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-semibold text-black" href={`/chart/${r.code}`}>View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
