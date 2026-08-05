'use client';

import React from 'react';
import { PieChart, TrendingUp } from 'lucide-react';

export default function PortfolioDashboardWidget() {
  const holdings = [
    { name: 'US Tech Equities (NVDA, AAPL)', allocation: 45, color: '#42E8FF', value: '$84,250' },
    { name: 'Indian LargeCap (Nifty Bluechips)', allocation: 30, color: '#2D9CFF', value: '$56,100' },
    { name: 'Crypto Alpha (BTC, ETH)', allocation: 15, color: '#4DFFB8', value: '$28,050' },
    { name: 'Cash & Yield Reserves', allocation: 10, color: '#A0A7B5', value: '$18,700' },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#4DFFB8] uppercase tracking-wider mb-2">
          <PieChart className="w-4 h-4 text-[#4DFFB8]" />
          <span>Telemetry & Portfolio Control</span>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Portfolio Performance Dashboard</h2>
        <p className="text-sm text-[#A0A7B5] mt-1">Real-time valuation tracking, alpha risk metrics, and asset distribution.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Valuation Cards & Metrics */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 border border-white/10">
            <span className="text-xs text-[#A0A7B5] font-medium">Total Portfolio Valuation</span>
            <div className="text-3xl font-bold text-white font-display mt-1">$187,100.00</div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-[#4DFFB8]/15 text-[#4DFFB8] mt-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+$42,850.50 (+29.6% YTD)</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <div className="text-xs text-[#A0A7B5]">Sharpe Ratio</div>
                <div className="text-lg font-bold text-white mt-0.5">2.48 <span className="text-xs text-[#4DFFB8] font-normal">(Optimal)</span></div>
              </div>
              <div>
                <div className="text-xs text-[#A0A7B5]">Max Drawdown</div>
                <div className="text-lg font-bold text-white mt-0.5">-4.2% <span className="text-xs text-[#42E8FF] font-normal">(Low Risk)</span></div>
              </div>
            </div>
          </div>

          {/* Allocation Progress Breakdown */}
          <div className="glass-panel p-6 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4">Asset Class Distribution</h3>
            <div className="space-y-3">
              {holdings.map((h, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">{h.name}</span>
                    <span className="text-[#A0A7B5] font-mono">{h.value} ({h.allocation}%)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${h.allocation}%`, backgroundColor: h.color }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Historical Performance Chart Visual */}
        <div className="lg:col-span-7 glass-panel p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-white">Cumulative Return Curve</h3>
                <p className="text-xs text-[#A0A7B5]">Benchmarked against S&P 500 & NIFTY 50</p>
              </div>
              <span className="px-3 py-1 bg-[#42E8FF]/15 text-[#42E8FF] rounded-xl text-xs font-bold border border-[#42E8FF]/30">
                Alpha Generated: +14.2%
              </span>
            </div>

            {/* Custom SVG Performance Chart */}
            <div className="relative h-60 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 180">
                <defs>
                  <linearGradient id="portGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4DFFB8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2D9CFF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="110" x2="400" y2="110" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                
                {/* Portfolio Curve */}
                <path
                  d="M 0 140 C 80 130, 120 90, 180 95 C 240 100, 300 40, 400 30"
                  fill="none"
                  stroke="#4DFFB8"
                  strokeWidth="3.5"
                  className="drop-shadow-[0_0_12px_rgba(77,255,184,0.8)]"
                />

                {/* Benchmark S&P 500 Curve */}
                <path
                  d="M 0 150 C 80 145, 120 120, 180 125 C 240 130, 300 90, 400 80"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                <path
                  d="M 0 140 C 80 130, 120 90, 180 95 C 240 100, 300 40, 400 30 L 400 180 L 0 180 Z"
                  fill="url(#portGradient)"
                />
              </svg>
            </div>
          </div>

          <div className="flex justify-between text-xs text-[#A0A7B5] pt-4 border-t border-white/10">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
            <span className="text-[#4DFFB8] font-bold">Today</span>
          </div>

        </div>

      </div>

    </section>
  );
}
