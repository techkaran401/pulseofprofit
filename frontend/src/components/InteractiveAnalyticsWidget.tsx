'use client';

import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

export default function InteractiveAnalyticsWidget() {
  const [selectedIndicator, setSelectedIndicator] = useState<'RSI' | 'MACD' | 'Volume'>('RSI');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="glass-panel p-6 border border-white/10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#42E8FF] uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4 text-[#42E8FF]" />
              <span>Institutional Studio</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Interactive Analytics Studio</h3>
          </div>

          {/* Indicator Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#A0A7B5] mr-2 hidden sm:inline">Indicators:</span>
            {(['RSI', 'MACD', 'Volume'] as const).map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndicator(ind)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedIndicator === ind 
                    ? 'bg-[#2D9CFF]/20 text-[#42E8FF] border border-[#42E8FF]/40 shadow-[0_0_12px_rgba(66,232,255,0.2)]' 
                    : 'bg-[#0D1624] text-[#A0A7B5] border border-white/5 hover:text-white'
                }`}
              >
                {ind}
              </button>
            ))}

            <div className="h-5 w-[1px] bg-white/10 mx-2 hidden sm:block" />

            {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedTimeframe === tf 
                    ? 'bg-gradient-to-r from-[#2D9CFF] to-[#42E8FF] text-black font-bold' 
                    : 'text-[#A0A7B5] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Analytics Display Box */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Visual Chart */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white font-semibold">Technical Reading: <span className="text-[#4DFFB8]">Bullish Momentum</span></span>
              <span className="text-[#A0A7B5]">Active Indicator: {selectedIndicator} (14-period)</span>
            </div>

            {/* Indicator Chart View */}
            <div className="h-52 bg-[#0D1624]/80 rounded-[20px] border border-white/5 p-4 relative overflow-hidden flex flex-col justify-end">
              {selectedIndicator === 'RSI' && (
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="text-[10px] text-red-400 border-b border-red-500/20 pb-1">Overbought (70)</div>
                  {/* RSI Wave */}
                  <svg className="w-full h-28 overflow-visible" viewBox="0 0 300 100">
                    <path
                      d="M 0 60 Q 50 20, 100 70 T 200 30 T 300 40"
                      fill="none"
                      stroke="#42E8FF"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="text-[10px] text-[#4DFFB8] border-t border-[#4DFFB8]/20 pt-1">Oversold (30)</div>
                </div>
              )}

              {selectedIndicator === 'MACD' && (
                <div className="w-full h-full flex items-center">
                  <svg className="w-full h-32 overflow-visible" viewBox="0 0 300 100">
                    {/* Signal Line */}
                    <path d="M 0 50 Q 75 10, 150 80 T 300 30" fill="none" stroke="#2D9CFF" strokeWidth="2.5" />
                    {/* MACD Line */}
                    <path d="M 0 65 Q 75 25, 150 60 T 300 20" fill="none" stroke="#4DFFB8" strokeWidth="2.5" />
                  </svg>
                </div>
              )}

              {selectedIndicator === 'Volume' && (
                <div className="w-full h-full flex items-end justify-between space-x-1.5 pt-4">
                  {[40, 65, 80, 45, 90, 100, 75, 85, 60, 95, 110, 70, 85, 120, 105].map((v, i) => (
                    <div 
                      key={i} 
                      className={`w-full rounded-t-sm ${i % 2 === 0 ? 'bg-[#4DFFB8]/75' : 'bg-[#2D9CFF]/75'}`} 
                      style={{ height: `${(v / 120) * 100}%` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Table */}
          <div className="lg:col-span-4 space-y-3 bg-[#0D1624] p-5 rounded-[20px] border border-white/5">
            <h4 className="text-sm font-bold text-white mb-2">Technical Matrix Metrics</h4>
            <div className="flex justify-between py-2 border-b border-white/5 text-xs">
              <span className="text-[#A0A7B5]">Relative Strength (RSI)</span>
              <span className="text-[#4DFFB8] font-bold">64.2 (Bullish)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5 text-xs">
              <span className="text-[#A0A7B5]">MACD Crossover</span>
              <span className="text-[#42E8FF] font-bold">+12.8 (Positive)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5 text-xs">
              <span className="text-[#A0A7B5]">Bollinger Band Width</span>
              <span className="text-white font-bold">Squeezing (Expansion Imminent)</span>
            </div>
            <div className="flex justify-between py-2 text-xs">
              <span className="text-[#A0A7B5]">200-Day EMA Alignment</span>
              <span className="text-[#4DFFB8] font-bold">Above Support</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
