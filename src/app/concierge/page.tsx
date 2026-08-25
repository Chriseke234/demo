'use client';

import React from 'react';
import ConciergePanel from '@/components/concierge/ConciergePanel';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';

export default function ConciergePage() {
  return (
    <div className="bg-aurelia-sand min-h-screen pt-28 pb-16 flex flex-col items-center">
      <div className="max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
        
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold font-semibold">
            Digital Hospitality
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-aurelia-charcoal leading-tight">
            Meet Aurelia, <br />
            your digital <span className="italic font-normal">concierge</span>.
          </h1>
          <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
            Aurelia represents the future of premium guest relationships. Grounded in the exact offerings of Aurelia Grand, she is capable of choosing suites, compiling custom itineraries, recommending tables, and seamlessly transferring requests to WhatsApp reservations.
          </p>
          
          <div className="space-y-4 border-t border-aurelia-sandDark pt-6 text-xs text-aurelia-text/90 font-light">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-4 h-4 text-aurelia-gold flex-shrink-0 mt-0.5" />
              <p><strong>Strict Grounding</strong> — Aurelia only references configured hotel knowledge. No pricing or booking hallucinations.</p>
            </div>
            <div className="flex items-start space-x-3">
              <Compass className="w-4 h-4 text-aurelia-gold flex-shrink-0 mt-0.5" />
              <p><strong>Continuous Context</strong> — Conversation details transition directly to our WhatsApp numbers in one click.</p>
            </div>
          </div>
        </div>

        {/* Panel Column */}
        <div className="lg:col-span-7 flex justify-center w-full">
          <ConciergePanel onClose={() => {}} isFullScreen={true} />
        </div>

      </div>
    </div>
  );
}
