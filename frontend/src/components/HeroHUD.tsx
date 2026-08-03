'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  LineChart, 
  Activity,
  Layers,
  ChevronRight,
  Eye,
  BarChart2
} from 'lucide-react';

export default function HeroHUD({ onExploreClick }: { onExploreClick?: () => void }) {
  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1M');
  const [activeTab, setActiveTab] = useState<'line' | 'candlestick'>('line');

  // Chart data mock
  const graphPoints = [
    { x: 0, y: 120, label: '9:30 AM', price: '$4,120' },
    { x: 80, y: 95, label: '11:00 AM', price: '$4,280' },
    { x: 160, y: 140, label: '1:00 PM', price: '$4,050' },
    { x: 240, y: 70, label: '2:30 PM', price: '$4,490' },
    { x: 320, y: 40, label: '4:00 PM', price: '$4,810' },
  ];

  const svgPath = `M 0 120 C 40 105, 60 95, 80 95 C 120 95, 140 140, 160 140 C 200 140, 220 70, 240 70 C 280 70, 300 40, 320 40`;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-8 pb-16 px-4 overflow-hidden">
      {/* Background Neon Glowing Particles & Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#2D9CFF]/20 via-[#42E8FF]/10 to-[#4DFFB8]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-[#2D9CFF]/15 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#4DFFB8]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" 
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Heading & CTAs */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#0D1624]/90 border border-white/10 text-xs font-medium backdrop-blur-md shadow-[0_0_15px_rgba(66,232,255,0.2)]">
            <Sparkles className="w-4 h-4 text-[#42E8FF] animate-pulse" />
            <span className="text-[#A0A7B5]">Pulse of Profit</span>
            <span className="text-[#42E8FF] font-semibold">AI Analytics 3.0</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4DFFB8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4DFFB8]"></span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Next-Gen <br />
            <span className="text-cyan-gradient">Financial Intelligence</span> & Market Insights
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#A0A7B5] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Empower your market strategy with real-time AI signal analytics, candlestick tracking, institutional feed updates, and live portfolio telemetry.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button 
              onClick={onExploreClick}
              className="px-8 py-3.5 rounded-[20px] btn-cyan-gradient flex items-center space-x-3 text-sm font-bold shadow-[0_0_25px_rgba(66,232,255,0.4)]"
            >
              <span>Explore AI Insights</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>

            <a 
              href="#bulletins-feed"
              className="px-7 py-3.5 rounded-[20px] bg-[#0D1624]/80 hover:bg-[#141F33] text-white border border-white/10 hover:border-[#42E8FF]/40 text-sm font-semibold transition-all backdrop-blur-md flex items-center space-x-2"
            >
              <Eye className="w-4 h-4 text-[#42E8FF]" />
              <span>Read Bulletins</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
            <div>
              <div className="text-2xl font-bold text-white font-display">+94.8%</div>
              <div className="text-xs text-[#A0A7B5]">AI Signal Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4DFFB8] font-display">2.4M+</div>
              <div className="text-xs text-[#A0A7B5]">Daily Telemetry</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#42E8FF] font-display">&lt;15ms</div>
              <div className="text-xs text-[#A0A7B5]">Latency Grid</div>
            </div>
          </div>

        </div>

        {/* Right Column: Circular AI Analytics HUD + Interactive Financial Graphs */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          
          {/* Main Glassmorphic Dashboard Card */}
          <div className="w-full glass-panel p-6 shadow-2xl relative group overflow-hidden border border-white/10">
            
            {/* Background Radar Scanner Beam */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none opacity-20">
              <div className="w-full h-full rounded-full border border-[#42E8FF]/30 animate-spin-slow flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full border border-dashed border-[#4DFFB8]/40 animate-reverse-spin" />
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2D9CFF]/20 to-[#42E8FF]/20 border border-[#42E8FF]/30 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#42E8FF]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>NIFTY / NASDAQ Alpha Stream</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#4DFFB8]/10 text-[#4DFFB8] border border-[#4DFFB8]/20">LIVE</span>
                  </h3>
                  <p className="text-xs text-[#A0A7B5]">AI Confidence Index: 98.4%</p>
                </div>
              </div>

              {/* View Switchers */}
              <div className="flex items-center space-x-1 bg-[#0D1624] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveTab('line')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${activeTab === 'line' ? 'bg-[#2D9CFF]/20 text-[#42E8FF] border border-[#42E8FF]/30' : 'text-[#A0A7B5] hover:text-white'}`}
                >
                  Line
                </button>
                <button
                  onClick={() => setActiveTab('candlestick')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${activeTab === 'candlestick' ? 'bg-[#2D9CFF]/20 text-[#42E8FF] border border-[#42E8FF]/30' : 'text-[#A0A7B5] hover:text-white'}`}
                >
                  Candle
                </button>
              </div>
            </div>

            {/* Timeframe Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">$24,890.50</span>
                <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-[#4DFFB8]/15 text-[#4DFFB8] flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  +18.4%
                </span>
              </div>
              <div className="flex space-x-1">
                {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setActiveTimeframe(tf)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all ${activeTimeframe === tf ? 'bg-[#42E8FF] text-black font-bold' : 'text-[#A0A7B5] hover:bg-white/5'}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Interactive SVG Chart */}
            {activeTab === 'line' ? (
              <div className="relative h-48 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 320 160">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#42E8FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2D9CFF" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="95" x2="320" y2="95" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="140" x2="320" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {/* Gradient Fill */}
                  <path
                    d={`${svgPath} L 320 160 L 0 160 Z`}
                    fill="url(#chartGradient)"
                  />

                  {/* Glow Line */}
                  <path
                    d={svgPath}
                    fill="none"
                    stroke="#42E8FF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_12px_rgba(66,232,255,0.8)]"
                  />

                  {/* Data Points */}
                  {graphPoints.map((pt, idx) => (
                    <g key={idx} className="group/pt cursor-pointer">
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="5"
                        className="fill-[#050505] stroke-[#42E8FF] stroke-[3] transition-all duration-300 hover:r-7"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="10"
                        className="fill-[#4DFFB8]/20 opacity-0 group-hover/pt:opacity-100 transition-opacity"
                      />
                    </g>
                  ))}
                </svg>

                {/* Bottom Timeline labels */}
                <div className="flex justify-between text-[10px] text-[#A0A7B5] mt-2">
                  {graphPoints.map((pt, i) => (
                    <span key={i}>{pt.label}</span>
                  ))}
                </div>
              </div>
            ) : (
              /* Candlestick Mock Chart */
              <div className="h-48 w-full flex items-end justify-between px-2 pt-4 border-b border-white/10 pb-2">
                {[
                  { open: 80, high: 110, low: 70, close: 100, green: true },
                  { open: 100, high: 120, low: 90, close: 92, green: false },
                  { open: 92, high: 130, low: 88, close: 125, green: true },
                  { open: 125, high: 140, low: 115, close: 138, green: true },
                  { open: 138, high: 145, low: 110, close: 115, green: false },
                  { open: 115, high: 155, low: 112, close: 150, green: true },
                  { open: 150, high: 160, low: 140, close: 158, green: true },
                ].map((c, i) => (
                  <div key={i} className="flex flex-col items-center group/candle relative" style={{ height: `${c.high}px` }}>
                    {/* Wick */}
                    <div 
                      className={`w-[2px] ${c.green ? 'bg-[#4DFFB8]' : 'bg-red-400'}`} 
                      style={{ height: `${c.high - c.low}px` }} 
                    />
                    {/* Body */}
                    <div 
                      className={`w-3 rounded-sm absolute ${c.green ? 'bg-[#4DFFB8] shadow-[0_0_10px_rgba(77,255,184,0.5)]' : 'bg-red-500'}`}
                      style={{ 
                        bottom: `${Math.min(c.open, c.close) - c.low}px`, 
                        height: `${Math.max(Math.abs(c.close - c.open), 6)}px` 
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Floating Telemetry Stats Badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#0D1624]/90 border border-white/10 backdrop-blur-xl p-3.5 rounded-[20px] shadow-2xl flex items-center space-x-3 animate-bounce-slow hidden sm:flex">
              <div className="w-9 h-9 rounded-xl bg-[#4DFFB8]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#4DFFB8]" />
              </div>
              <div>
                <div className="text-xs text-[#A0A7B5]">AI Sentiment</div>
                <div className="text-xs font-bold text-white flex items-center">
                  <span>96% Ultra-Bullish</span>
                </div>
              </div>
            </div>

            {/* Floating HUD Circular Ring */}
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border border-[#42E8FF]/40 bg-[#0D1624]/80 backdrop-blur-md p-1 flex items-center justify-center shadow-[0_0_20px_rgba(66,232,255,0.3)] hidden sm:flex">
              <div className="w-full h-full rounded-full border border-dashed border-[#4DFFB8] animate-spin-slow flex items-center justify-center text-[9px] font-mono text-[#42E8FF]">
                AI HUD
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
