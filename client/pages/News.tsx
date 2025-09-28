import DashboardLayout from "@/layouts/DashboardLayout";
import { Newspaper, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface NewsRecord {
  id: string;
  title: string;
  date: string; // e.g. Aug 4, 2024
  source: string;
  coins: { code: string; pct?: string; up?: boolean }[];
}

const data: NewsRecord[] = [
  {
    id: "1",
    title: "Solana, FLOKI holders eye Rebel Satoshi amid bullish prediction",
    date: "Aug 7, 2024",
    source: "CryptoNews",
    coins: [
      { code: "SOL", pct: "+0.8%", up: true },
      { code: "FLOKI", pct: "+1.5%", up: true },
    ],
  },
  {
    id: "2",
    title: "LINK Poised for 250% Rally: Technicals and Key Levels to Watch",
    date: "Aug 6, 2024",
    source: "TheBlock",
    coins: [{ code: "LINK", pct: "+0.6%", up: true }],
  },
  {
    id: "3",
    title: "Bitcoin whales accumulate as ETF inflows surge",
    date: "Aug 6, 2024",
    source: "Glassnode",
    coins: [{ code: "BTC", pct: "+0.2%", up: true }],
  },
  {
    id: "4",
    title: "NFTs are pumping again after a long bear",
    date: "Aug 4, 2024",
    source: "NFTDaily",
    coins: [
      { code: "ETH", pct: "+1.0%", up: true },
      { code: "SOL", pct: "+0.5%", up: true },
    ],
  },
];

const CoinBadge = ({
  code,
  pct,
  up = true,
}: {
  code: string;
  pct?: string;
  up?: boolean;
}) => (
  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 text-[11px] ring-1 ring-white/10">
    {code}
    {pct && (
      <span
        className={`${up ? "text-emerald-400" : "text-red-400"} inline-flex items-center gap-0.5`}
      >
        {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {pct}
      </span>
    )}
  </span>
);

const NewsItem = ({ item }: { item: NewsRecord }) => (
  <li className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-white/5 px-4 py-3 last:border-0">
    <div>
      <div className="line-clamp-1 text-sm text-white/90">{item.title}</div>
      <div className="mt-1 flex items-center gap-3 text-xs text-white/40">
        <span className="inline-flex items-center gap-1">
          <Clock size={12} /> {item.date}
        </span>
        <span>{item.source}</span>
      </div>
    </div>
    <div className="flex shrink-0 flex-wrap items-center gap-2">
      {item.coins.map((c, i) => (
        <CoinBadge key={i} {...c} />
      ))}
    </div>
  </li>
);

function Gauge() {
  return (
    <div className="relative w-[200px] rounded-xl bg-[#0f0f0f] p-4 text-white ring-1 ring-white/10">
      <div className="text-xs text-white/60">Sentiment</div>
      <div className="mt-2 flex items-center justify-center">
        <svg viewBox="0 0 120 60" className="w-[160px]">
          <defs>
            <linearGradient id="gg" x1="0" x2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <path
            d="M10,50 A50,50 0 0,1 110,50"
            fill="none"
            stroke="url(#gg)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="60" cy="50" r="4" fill="#fde047" />
        </svg>
      </div>
      <div className="text-center text-sm font-semibold text-yellow-300">
        Fear
      </div>
    </div>
  );
}

export default function News() {
  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Gauge />
        </div>
        <div className="lg:col-span-9 rounded-2xl bg-[#0f0f0f] ring-1 ring-white/10">
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 text-sm text-white/70">
            <Newspaper size={16} className="text-yellow-300" /> Crypto News
          </div>
          <ul className="divide-y divide-white/5">
            {data.map((n) => (
              <NewsItem key={n.id} item={n} />
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
