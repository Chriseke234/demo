'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import ConciergePanel from './ConciergePanel';

export default function ConciergeLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [hasDismissedTeaser, setHasDismissedTeaser] = useState(false);
  const pathname = usePathname();

  // Auto-trigger proactive teaser bubble after 4 seconds if not opened or dismissed
  useEffect(() => {
    if (isOpen || hasDismissedTeaser) return;

    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen, hasDismissedTeaser]);

  // Hide teaser when opening chat
  const handleOpen = () => {
    setIsOpen(true);
    setShowTeaser(false);
  };

  const handleDismissTeaser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
    setHasDismissedTeaser(true);
  };

  // Hide concierge launcher on admin panel and dedicated concierge page
  if (pathname.startsWith('/admin') || pathname === '/concierge') {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {isOpen ? (
        <div className="relative animate-fade-in shadow-2xl">
          <ConciergePanel onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <div className="relative flex flex-col items-end">
          {/* Proactive Teaser Bubble */}
          {showTeaser && (
            <div 
              onClick={handleOpen}
              className="mb-3 max-w-[280px] sm:max-w-xs bg-aurelia-charcoal text-white border border-aurelia-gold/40 p-4 rounded-2xl shadow-2xl cursor-pointer hover:border-aurelia-gold transition-all duration-300 animate-slide-in-right relative group"
            >
              <button
                onClick={handleDismissTeaser}
                className="absolute top-2 right-2 p-1 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              
              <div className="flex items-center space-x-3 mb-2">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-aurelia-gold/50 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
                    alt="Aurelia AI Concierge" 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-aurelia-charcoal" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-aurelia-gold font-semibold">Aurelia AI Concierge</p>
                  <p className="text-[9px] text-white/50">Online & Ready</p>
                </div>
              </div>

              <p className="text-xs text-white/90 font-light leading-relaxed">
                Good day. Need assistance selecting a suite or reserving dining at Aurelia Grand?
              </p>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-aurelia-gold font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                <span>Start Conversation</span>
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          )}

          {/* Launcher Button (Circular with Notification Badge matching the design) */}
          <button
            onClick={handleOpen}
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-aurelia-charcoal hover:bg-[#1A2536] text-white border-2 border-aurelia-gold/40 hover:border-aurelia-gold shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none"
            aria-label="Open Aurelia AI Concierge"
          >
            {/* Notification Badge Dot (Orange/Gold indicator) */}
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-r from-amber-500 to-orange-600 border-2 border-aurelia-charcoal"></span>
            </span>

            {/* Speech Bubble Icon matching user upload */}
            <svg 
              className="w-6 h-6 sm:w-7 sm:h-7 text-white transform group-hover:scale-110 transition-transform duration-300" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.8214 4.60772 15.4999 5.63604 16.8485L4.5 20.5L8.25838 19.4214C9.55403 20.4307 11.2075 21 12 21C16.4183 21 20 17.4183 20 12Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
