'use client';

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Pulse of Profit's AI neural signals gave our proprietary trading desk a 14% edge on tech earnings breakouts this quarter. The low latency telemetry is world-class.",
    author: "Alexander Vance",
    role: "Managing Director",
    company: "Vance Alpha Capital",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alexander"
  },
  {
    quote: "The combination of daily bulletins by Shobin Sheikh and real-time candlestick telemetry makes this my go-to morning terminal before market open.",
    author: "Priya Sharma",
    role: "Senior Portfolio Manager",
    company: "Horizon Asset Mgmt",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Priya"
  },
  {
    quote: "Interactive Analytics Studio and heatmap sentiment tracking cut down my research time from hours to minutes. Unmatched dark glass UX!",
    author: "Marcus Chen",
    role: "Quantitative Analyst",
    company: "Apex Algorithmic",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Marcus"
  }
];

export default function TestimonialsSectionWidget() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#4DFFB8] uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-[#4DFFB8]" />
          <span>Institutional Trust</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">Trusted by 50,000+ Analysts & Traders</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {testimonials.map((item, idx) => (
          <div key={idx} className="glass-panel glass-panel-hover p-5 sm:p-6 relative flex flex-col justify-between border border-white/10 group">
            <div>
              <div className="flex items-center space-x-1 text-[#42E8FF] mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#42E8FF]" />
                ))}
              </div>
              <p className="text-xs text-[#A0A7B5] leading-relaxed mb-6 italic">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
              <img src={item.avatar} alt={item.author} className="w-10 h-10 rounded-full bg-[#0D1624] border border-white/10" />
              <div>
                <h4 className="text-xs font-bold text-white font-display">{item.author}</h4>
                <p className="text-[10px] text-[#A0A7B5]">{item.role}, <span className="text-[#42E8FF]">{item.company}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
