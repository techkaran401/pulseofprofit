'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  showToast: (msg: string) => void;
}

export default function ShareModal({ isOpen, onClose, url, title, showToast }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`Check out this bulletin on Pulse of Profit: ${title}`);

  const shareOptions = [
    {
      name: 'WhatsApp',
      color: 'bg-[#25D366] hover:bg-[#20ba5a]',
      textColor: 'text-white',
      link: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.993-1.876-1.879-4.354-2.91-6.993-2.91-5.447 0-9.87 4.417-9.873 9.861-.001 1.777.462 3.51 1.342 5.035l-.986 3.6 3.693-.97c1.472.802 3.12 1.227 4.632 1.227zm10.743-7.5c-.328-.164-1.939-.956-2.239-1.065-.301-.109-.52-.164-.739.164-.218.328-.847 1.066-1.038 1.284-.19.219-.383.245-.71.082-1.802-.903-2.98-1.564-4.125-3.532-.303-.518.303-.481.867-1.607.093-.186.046-.349-.02-.486-.069-.137-.58-1.409-.795-1.928-.21-.505-.445-.436-.61-.444-.158-.007-.339-.009-.521-.009s-.48.069-.731.349c-.252.28-1.01 1.009-1.01 2.46s1.054 2.85 1.202 3.048c.148.197 2.074 3.167 5.025 4.444.702.304 1.25.486 1.677.622.705.224 1.347.193 1.854.117.565-.085 1.939-.792 2.213-1.558.273-.765.273-1.42.191-1.557-.081-.138-.295-.22-.622-.383z"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      color: 'bg-[#0088cc] hover:bg-[#0077b5]',
      textColor: 'text-white',
      link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.91 2.39L20.3 19.46c-.27 1.2-.98 1.5-1.98.94l-5.5-4.05-2.65 2.55c-.29.29-.54.54-1.1.54l.39-5.59 10.18-9.2c.44-.39-.1-.61-.69-.21L6.39 12.8 1 11.1c-1.17-.36-1.19-1.17.24-1.74L21.9 1.76c.96-.36 1.8.22 1.5.63v-.01z"/>
        </svg>
      )
    },
    {
      name: 'Twitter / X',
      color: 'bg-[#0D1624] hover:bg-[#141F33]',
      textColor: 'text-white',
      link: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      color: 'bg-[#0077b5] hover:bg-[#006399]',
      textColor: 'text-white',
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] sm:w-full max-w-md glass-panel border border-white/10 p-5 sm:p-6 rounded-[20px] shadow-2xl text-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-lg text-white">Share Bulletin</h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#A0A7B5] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-3 p-3 rounded-xl ${option.color} ${option.textColor} transition-all hover:scale-[1.02] text-xs font-semibold`}
            >
              {option.icon}
              <span>{option.name}</span>
            </a>
          ))}
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-xs text-[#A0A7B5]">Bulletin URL</label>
          <div className="relative flex items-center">
            <input 
              type="text" 
              readOnly 
              value={url}
              className="w-full glass-input rounded-xl pl-4 pr-12 py-2.5 text-xs text-white"
            />
            <button
              onClick={handleCopyLink}
              className="absolute right-2 p-1.5 rounded-lg btn-cyan-gradient text-black font-bold"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
