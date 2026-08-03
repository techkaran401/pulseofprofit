'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const defaultTickerItems: TickerItem[] = [
  { symbol: 'NIFTY 50', name: 'Nifty Index', price: '22,419.55', change: '+1.42%', isPositive: true },
  { symbol: 'S&P 500', name: 'US Index', price: '5,088.80', change: '+0.85%', isPositive: true },
  { symbol: 'NASDAQ', name: 'Tech Index', price: '16,091.92', change: '+1.15%', isPositive: true },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$788.17', change: '+16.40%', isPositive: true },
  { symbol: 'RELIANCE', name: 'Reliance Ind', price: '₹2,985.30', change: '+2.10%', isPositive: true },
  { symbol: 'TSLA', name: 'Tesla Inc', price: '$197.40', change: '-1.80%', isPositive: false },
  { symbol: 'BTC/USD', name: 'Bitcoin', price: '$62,450.00', change: '+4.25%', isPositive: true },
  { symbol: 'ETH/USD', name: 'Ethereum', price: '$3,480.10', change: '+3.90%', isPositive: true },
  { symbol: 'AAPL', name: 'Apple Inc', price: '$182.52', change: '-0.45%', isPositive: false },
  { symbol: 'BRENT', name: 'Crude Oil', price: '$82.60', change: '+0.75%', isPositive: true },
];

export default function LiveTickerBar() {
  // Duplicate for seamless infinite loop
  const marqueeItems = [...defaultTickerItems, ...defaultTickerItems];

  return (
    <div className="w-full bg-[#0D1624]/90 backdrop-blur-md border-y border-white/10 py-2.5 overflow-hidden shadow-inner">
      <div className="flex items-center space-x-8 animate-[marquee_35s_linear_infinite] whitespace-nowrap">
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-3 px-3 py-1 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
            <div className="flex items-center space-x-1.5 font-semibold text-white">
              <Activity className="w-3.5 h-3.5 text-[#42E8FF]" />
              <span>{item.symbol}</span>
            </div>
            <span className="text-[#A0A7B5] font-mono">{item.price}</span>
            <div className={`flex items-center space-x-0.5 font-medium ${item.isPositive ? 'text-[#4DFFB8]' : 'text-red-400'}`}>
              {item.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{item.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
