'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function PricingWidget() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter Bulletin',
      price: isAnnual ? '$0' : '$0',
      period: 'free forever',
      description: 'Daily market bulletins, top news breakdowns, and basic stock telemetry.',
      features: [
        'Daily Pulse of Profit Bulletin',
        'Basic Stock Price Widgets',
        'Public Author Feed Access',
        'Telegram Community Access',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro AI Terminal',
      price: isAnnual ? '$29' : '$39',
      period: '/month billed annually',
      description: 'Full AI Neural Signals, real-time candlestick alerts, and portfolio control.',
      features: [
        'Everything in Starter',
        'Real-time AI Signal Telemetry (94%+ Accuracy)',
        'Unlimited Interactive Analytics Studio',
        'Candlestick Heatmap & Sentiment Radar',
        'Saved Bulletins & Priority Alerts',
      ],
      cta: 'Start Pro Trial',
      popular: true,
    },
    {
      name: 'Institutional Desk',
      price: isAnnual ? '$99' : '$129',
      period: '/month billed annually',
      description: 'Multi-seat algorithmic API access, direct analysts desk, and zero-latency feeds.',
      features: [
        'Everything in Pro AI',
        'Direct Algorithmic API Access',
        'Custom Portfolio Backtesting Studio',
        '1-on-1 Analyst Consultation Desk',
        'Dedicated SLA & 24/7 Priority Support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#42E8FF] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-[#42E8FF]" />
          <span>Flexible Plans</span>
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Simple, Transparent Pricing</h2>
        <p className="text-sm text-[#A0A7B5] mt-2">Unlock professional-grade financial intelligence & AI insights.</p>

        {/* Toggle */}
        <div className="inline-flex items-center space-x-3 bg-[#0D1624] p-1.5 rounded-full border border-white/10 mt-6">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${!isAnnual ? 'bg-gradient-to-r from-[#2D9CFF] to-[#42E8FF] text-black shadow-md' : 'text-[#A0A7B5]'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${isAnnual ? 'bg-gradient-to-r from-[#2D9CFF] to-[#42E8FF] text-black shadow-md' : 'text-[#A0A7B5]'}`}
          >
            <span>Annual</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black text-[#4DFFB8] font-bold">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`glass-panel p-8 relative flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? 'border-[#42E8FF]/60 shadow-[0_0_30px_rgba(66,232,255,0.2)] bg-gradient-to-b from-[#121826] to-[#0D1624] scale-[1.03]'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#2D9CFF] to-[#42E8FF] text-black text-[11px] font-extrabold shadow-md">
                MOST POPULAR
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-xs text-[#A0A7B5] mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white font-display">{plan.price}</span>
                <span className="text-xs text-[#A0A7B5] ml-1">{plan.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs text-[#A0A7B5]">
                    <Check className="w-4 h-4 text-[#4DFFB8] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`w-full py-3.5 rounded-[20px] text-xs font-bold transition-all ${
                plan.popular
                  ? 'btn-cyan-gradient shadow-[0_0_20px_rgba(66,232,255,0.4)]'
                  : 'bg-[#0D1624] text-white border border-white/10 hover:border-[#42E8FF]/40'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
