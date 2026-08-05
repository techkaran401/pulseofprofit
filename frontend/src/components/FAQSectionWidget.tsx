'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How does the AI Neural Signal Generator calculate market accuracy?',
    answer: 'Our proprietary model continuously ingests real-time order book flows, institutional tape sentiment, macroeconomic reports, and corporate earnings telemetry. It outputs high-probability technical setups with backtested accuracy scores above 94%.'
  },
  {
    question: 'Are the daily Pulse of Profit bulletins free to read?',
    answer: 'Yes! All daily Pulse of Profit Bulletins, pinned posts, market updates, and Telegram community highlights are free forever. Pro AI features add live algorithmic signals, interactive charts, and custom alerts.'
  },
  {
    question: 'Can I bookmark posts and save key market bulletins?',
    answer: 'Absolutely. You can save official market bulletins to your private library, bookmark key market updates, and manage your preferences in your Profile Drawer.'
  },
  {
    question: 'How quickly is market data updated on the platform?',
    answer: 'Our infrastructure processes live price feeds with under 15ms latency across US equities, Indian markets (NSE/BSE), crypto pairs, and major commodity futures.'
  }
];

export default function FAQSectionWidget() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#42E8FF] uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-[#42E8FF]" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div 
              key={idx} 
              className="glass-panel border border-white/10 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex justify-between items-center space-x-4 focus:outline-none"
              >
                <span className="text-base font-bold text-white font-display">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#42E8FF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm text-[#A0A7B5] leading-relaxed border-t border-white/5 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
