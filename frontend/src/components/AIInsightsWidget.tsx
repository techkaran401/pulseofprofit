'use client';

import React from 'react';
import { Sparkles, Brain, CheckCircle2, ShieldCheck, Zap, ArrowUpRight, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIInsight {
  ticker: string;
  action: 'STRONG BUY' | 'ACCUMULATE' | 'HOLD';
  confidence: number;
  entryPrice: string;
  targetPrice: string;
  stopLoss: string;
  timeframe: string;
  catalyst: string;
  status: 'Bullish' | 'Breakout';
}

const aiInsights: AIInsight[] = [
  {
    ticker: 'NVDA (NVIDIA)',
    action: 'STRONG BUY',
    confidence: 96,
    entryPrice: '$788.17',
    targetPrice: '$940.00',
    stopLoss: '$740.00',
    timeframe: '2-4 Weeks',
    catalyst: 'AI Server rack demand surge + Q1 Datacenter revenue guidance beat + 18% volume influx.',
    status: 'Breakout'
  },
  {
    ticker: 'RELIANCE IND',
    action: 'ACCUMULATE',
    confidence: 91,
    entryPrice: '₹2,985.30',
    targetPrice: '₹3,250.00',
    stopLoss: '₹2,860.00',
    timeframe: '1-3 Months',
    catalyst: 'Jio Telecom ARPU hike rumors + Retail sector spin-off valuation unlock.',
    status: 'Bullish'
  },
  {
    ticker: 'TATA MOTORS',
    action: 'STRONG BUY',
    confidence: 88,
    entryPrice: '₹985.00',
    targetPrice: '₹1,150.00',
    stopLoss: '₹920.00',
    timeframe: '3-6 Weeks',
    catalyst: 'JLR free cashflow guidance upgraded by 24% + EV battery localized assembly.',
    status: 'Breakout'
  }
];

export default function AIInsightsWidget() {
  return (
    <section id="ai-insights" className="py-12 px-4 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#42E8FF] uppercase tracking-wider mb-2">
            <Brain className="w-4 h-4 text-[#42E8FF] animate-pulse" />
            <span>AI Neural Signal Generator</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">AI Investment Insights</h2>
          <p className="text-sm text-[#A0A7B5] mt-1">Autonomous multi-factor algorithmic recommendations powered by neural sentiment models.</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiInsights.map((insight, idx) => (
          <div key={idx} className="glass-panel p-6 relative overflow-hidden group hover:border-[#42E8FF]/40 transition-all">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-white font-display uppercase tracking-wider">{insight.ticker}</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#42E8FF]/20 text-[#42E8FF] border border-[#42E8FF]/30 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>{insight.action}</span>
              </span>
            </div>

            {/* Confidence Score Bar */}
            <div className="mb-5 bg-[#0D1624] p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#A0A7B5] font-medium">Neural Confidence</span>
                <span className="text-[#4DFFB8] font-bold">{insight.confidence}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#2D9CFF] via-[#42E8FF] to-[#4DFFB8] rounded-full shadow-[0_0_10px_rgba(77,255,184,0.5)]"
                  style={{ width: `${insight.confidence}%` }}
                />
              </div>
            </div>

            {/* Targets Grid */}
            <div className="grid grid-cols-3 gap-2 text-center mb-5 bg-[#0D1624]/60 p-3 rounded-xl border border-white/5">
              <div>
                <div className="text-[10px] text-[#A0A7B5]">Entry</div>
                <div className="text-xs font-bold text-white mt-0.5">{insight.entryPrice}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#4DFFB8]">Target</div>
                <div className="text-xs font-bold text-[#4DFFB8] mt-0.5">{insight.targetPrice}</div>
              </div>
              <div>
                <div className="text-[10px] text-red-400">Stop Loss</div>
                <div className="text-xs font-bold text-red-400 mt-0.5">{insight.stopLoss}</div>
              </div>
            </div>

            {/* Catalyst summary */}
            <div className="text-xs text-[#A0A7B5] mb-5 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <strong className="text-white block mb-1">AI Thesis:</strong>
              {insight.catalyst}
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
              <span className="text-[#A0A7B5]">Horizon: {insight.timeframe}</span>
              <button className="text-[#42E8FF] font-semibold flex items-center space-x-1 hover:underline">
                <span>View Full Telemetry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
