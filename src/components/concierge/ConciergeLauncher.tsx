'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import ConciergePanel from './ConciergePanel';

export default function ConciergeLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide concierge launcher on admin panel and dedicated concierge page
  if (pathname.startsWith('/admin') || pathname === '/concierge') {
    return null;
  }

  return (
    <>
      {/* Floating launcher button */}
      <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end">
        {isOpen ? (
          <div className="relative animate-fade-in shadow-2xl">
            <ConciergePanel onClose={() => setIsOpen(false)} />
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-3 bg-aurelia-charcoal hover:bg-aurelia-gold text-white pl-4 pr-5 py-3 rounded-full border border-aurelia-gold/30 shadow-lg hover:scale-102 transition-all duration-300 group focus:outline-none"
            aria-label="Open Aurelia AI Concierge"
          >
            <div className="w-8 h-8 rounded-full border border-aurelia-gold/20 flex items-center justify-center bg-white/5 text-aurelia-gold">
              <svg className="w-4.5 h-4.5 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 14.22V11C19 7.13 15.87 4 12 4C8.13 4 5 7.13 5 11v3.22c0 .41-.16.82-.47 1.13l-1.06 1.06c-.82.82-.24 2.22.92 2.22h15.22c1.16 0 1.74-1.4.92-2.22l-1.06-1.06c-.31-.31-.47-.72-.47-1.13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21v1c0 1.66 1.34 3 3 3s3-1.34 3-3v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-aurelia-gold tracking-widest uppercase font-semibold">Aurelia</p>
              <p className="text-[9px] text-white/70 tracking-wide">Ask Our Concierge</p>
            </div>
          </button>
        )}
      </div>
    </>
  );
}
