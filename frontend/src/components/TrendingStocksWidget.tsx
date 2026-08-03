'use client';

import React from 'react';
import { Flame, ArrowUpRight, ArrowDownRight, Activity, Zap, BarChart3 } from 'lucide-react';

interface HeatmapStock {
  ticker: string;
  name: string;
  change: number; // e.g. +4.8
  marketCap: string;
  sentiment: 'Bullish' | 'Strong Bullish' | 'Neutral' | 'Bearish';
}

const heatmapStocks: HeatmapStock[] = [
  { ticker: 'NVDA', name: 'NVIDIA Corp', change: 16.4, marketCap: '$1.96T', sentiment: 'Strong Bullish' },
  { ticker: 'RELIANCE', name: 'Reliance Industries', change: 3.2, marketCap: '₹20.1L Cr', sentiment: 'Bullish' },
  { ticker: 'AMD', name: 'Advanced Micro', change: 8.7, marketCap: '$285B', sentiment: 'Strong Bullish' },
  { ticker: 'TATA MOTORS', name: 'Tata Motors Ltd', change: 4.1, marketCap: '₹3.4L Cr', sentiment: 'Bullish' },
  { ticker: 'TSLA', name: 'Tesla Inc', change: -2.4, marketCap: '$620B', sentiment: 'Bearish' },
  { ticker: 'INFY', name: 'Infosys Limited', change: 1.8, marketCap: '₹6.8L Cr', sentiment: 'Neutral' },
  { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', change: 2.5, marketCap: '₹11.2L Cr', sentiment: 'Bullish' },
  { ticker: 'AAPL', name: 'Apple Inc', change: -0.6, marketCap: '$2.82T', sentiment: 'Neutral' },
];

export default function TrendingStocksWidget() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      
      {/* Section Title */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#4DFFB8] uppercase tracking-wider mb-2">
          <Flame className="w-4 h-4 text-[#4DFFB8]" />
          <span>Market Heatmap & Momentum</span>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Trending Stocks & Sentiment Heatmap</h2>
        <p className="text-sm text-[#A0A7B5] mt-1">Real-time volume clusters, institutional momentum signals, and social buzz density.</p>
      </div>

      {/* Heatmap Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {heatmapStocks.map((stock, idx) => {
          const isHighGainer = stock.change >= 5;
          const isGainer = stock.change > 0;

          return (
            <div 
              key={idx}
              className={`glass-panel p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer border ${
                isHighGainer 
                  ? 'border-[#4DFFB8]/40 bg-gradient-to-br from-[#121826]/90 to-[#4DFFB8]/10 shadow-[0_0_20px_rgba(77,255,184,0.15)]' 
                  : isGainer 
                  ? 'border-[#42E8FF]/30 bg-gradient-to-br from-[#121826]/90 to-[#2D9CFF]/10' 
                  : 'border-red-500/20 bg-gradient-to-br from-[#121826]/90 to-red-500/5'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-bold text-white tracking-wide font-display">{stock.ticker}</span>
                  <div className="text-[11px] text-[#A0A7B5] truncate max-w-[120px]">{stock.name}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-extrabold flex items-center ${
                  isGainer ? 'bg-[#4DFFB8]/20 text-[#4DFFB8]' : 'bg-red-500/20 text-red-400'
                }`}>
                  {isGainer ? '+' : ''}{stock.change}%
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-3 border-t border-white/5">
                <span className="text-[#A0A7B5]">Mcap: {stock.marketCap}</span>
                <span className={`font-semibold ${
                  stock.sentiment.includes('Strong') ? 'text-[#4DFFB8]' : stock.sentiment === 'Bearish' ? 'text-red-400' : 'text-[#42E8FF]'
                }`}>
                  {stock.sentiment}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
