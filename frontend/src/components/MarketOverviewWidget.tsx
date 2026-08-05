'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Globe } from 'lucide-react';

interface MarketItem {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  volume: string;
  category: 'indices' | 'crypto' | 'commodities';
  sparkline: number[];
}

const marketData: MarketItem[] = [
  { name: 'NIFTY 50', symbol: '^NSEI', price: '22,419.55', change: '+1.42%', isPositive: true, volume: '₹34,890 Cr', category: 'indices', sparkline: [40, 55, 48, 62, 75, 90] },
  { name: 'S&P 500', symbol: '^GSPC', price: '5,088.80', change: '+0.85%', isPositive: true, volume: '$42.1B', category: 'indices', sparkline: [60, 50, 65, 70, 85, 95] },
  { name: 'NASDAQ 100', symbol: '^NDX', price: '16,091.92', change: '+1.15%', isPositive: true, volume: '$58.4B', category: 'indices', sparkline: [30, 45, 60, 55, 80, 100] },
  { name: 'SENSEX', symbol: '^BSESN', price: '73,878.15', change: '+1.28%', isPositive: true, volume: '₹28,450 Cr', category: 'indices', sparkline: [50, 58, 62, 70, 88, 92] },
  { name: 'Bitcoin', symbol: 'BTC/USD', price: '$62,450.00', change: '+4.25%', isPositive: true, volume: '$34.2B', category: 'crypto', sparkline: [20, 35, 50, 40, 75, 98] },
  { name: 'Ethereum', symbol: 'ETH/USD', price: '$3,480.10', change: '+3.90%', isPositive: true, volume: '$18.9B', category: 'crypto', sparkline: [45, 40, 55, 65, 80, 88] },
  { name: 'Solana', symbol: 'SOL/USD', price: '$138.45', change: '-1.12%', isPositive: false, volume: '$4.1B', category: 'crypto', sparkline: [80, 75, 60, 65, 50, 45] },
  { name: 'Gold (10g)', symbol: 'XAU/USD', price: '₹65,420.00', change: '+0.45%', isPositive: true, volume: '$12.4B', category: 'commodities', sparkline: [50, 52, 54, 56, 58, 60] },
  { name: 'Brent Crude', symbol: 'UKOIL', price: '$82.60', change: '-0.85%', isPositive: false, volume: '$24.6B', category: 'commodities', sparkline: [70, 65, 68, 60, 55, 52] },
];

export default function MarketOverviewWidget() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'indices' | 'crypto' | 'commodities'>('all');

  const filteredData = selectedTab === 'all' 
    ? marketData 
    : marketData.filter(item => item.category === selectedTab);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#42E8FF] uppercase tracking-wider mb-2">
            <Globe className="w-4 h-4 text-[#42E8FF]" />
            <span>Real-Time Market Matrix</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Live Market Overview</h2>
          <p className="text-sm text-[#A0A7B5] mt-1">Cross-asset telemetry across global indices, digital assets, and commodities.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-1.5 bg-[#0D1624] p-1.5 rounded-[20px] border border-white/10 self-start">
          {(['all', 'indices', 'crypto', 'commodities'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 text-xs font-medium rounded-xl capitalize transition-all ${selectedTab === tab ? 'bg-gradient-to-r from-[#2D9CFF] to-[#42E8FF] text-black font-bold shadow-[0_0_15px_rgba(66,232,255,0.3)]' : 'text-[#A0A7B5] hover:text-white hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Glass Market Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item, idx) => (
          <div 
            key={idx} 
            className="glass-panel glass-panel-hover p-5 relative overflow-hidden group cursor-pointer"
          >
            {/* Soft Ambient Card Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#42E8FF]/5 rounded-full blur-2xl group-hover:bg-[#42E8FF]/15 transition-all" />

            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-semibold text-[#A0A7B5] uppercase tracking-wider">{item.symbol}</span>
                <h3 className="text-base font-bold text-white">{item.name}</h3>
              </div>
              <div className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center space-x-1 ${item.isPositive ? 'bg-[#4DFFB8]/15 text-[#4DFFB8] border border-[#4DFFB8]/20' : 'bg-red-500/15 text-red-400 border border-red-500/20'}`}>
                {item.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                <span>{item.change}</span>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="text-xl font-bold text-white font-display">{item.price}</div>
                <div className="text-[11px] text-[#A0A7B5] mt-0.5">Vol: {item.volume}</div>
              </div>

              {/* Sparkline Visual */}
              <div className="w-24 h-10 flex items-end justify-between space-x-1">
                {item.sparkline.map((val, sIdx) => (
                  <div
                    key={sIdx}
                    className={`w-2 rounded-t-sm transition-all duration-300 ${item.isPositive ? 'bg-[#4DFFB8]/70 group-hover:bg-[#4DFFB8]' : 'bg-red-400/70 group-hover:bg-red-400'}`}
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
