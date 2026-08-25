'use client';

import React from 'react';
import { Sparkles, Calendar, Clock, Shirt } from 'lucide-react';
import { mockDining } from '@/data/mockData';

export default function DiningPage() {
  const handleDiningConcierge = (venueName: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('aurelia_dining_interest', venueName);
      sessionStorage.setItem('aurelia_context_prompt', `I see you are interested in booking a table at ${venueName}. Would you like me to recommend a signature dish or check the dress code details?`);
      
      const launcher = document.querySelector('button[aria-label="Open Aurelia AI Concierge"]') as HTMLButtonElement;
      if (launcher) launcher.click();
    }
  };

  return (
    <div className="bg-aurelia-bg min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold font-semibold">
            Gastronomy
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-aurelia-charcoal font-light">
            Culinary <span className="italic font-normal">Sanctuaries</span>
          </h1>
          <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
            Explore Aurelia Grand's highly acclaimed dining venues, where artisanal ingredients and theatrical presentation meet panoramic views of Dubai Marina.
          </p>
        </div>

        {/* Dining Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockDining.map((venue) => (
            <div key={venue.id} className="bg-white border border-aurelia-sandDark/40 flex flex-col shadow-sm">
              <div className="h-[280px] md:h-[340px] overflow-hidden relative">
                <img
                  src={venue.images[0]}
                  alt={venue.name}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-aurelia-charcoal text-white text-[9px] tracking-widest uppercase px-3 py-1 font-semibold">
                  {venue.cuisine}
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-aurelia-charcoal">{venue.name}</h3>
                  <p className="text-xs md:text-sm text-aurelia-text/75 font-light leading-relaxed">
                    {venue.description}
                  </p>

                  <div className="space-y-2 border-t border-aurelia-sandDark/35 pt-4 text-xs font-light">
                    <div className="flex items-center space-x-2.5 text-aurelia-text/90">
                      <Clock className="w-4 h-4 text-aurelia-gold flex-shrink-0" />
                      <span>Hours: <strong>{venue.hours}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-aurelia-text/90">
                      <Shirt className="w-4 h-4 text-aurelia-gold flex-shrink-0" />
                      <span>Dress Guidance: <strong>{venue.dressCode}</strong></span>
                    </div>
                    {venue.signatureExperience && (
                      <div className="mt-2 text-[11px] bg-aurelia-sand border border-aurelia-sandDark/40 p-3 leading-relaxed text-aurelia-charcoal italic">
                        Signature: {venue.signatureExperience}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-aurelia-sandDark/35 pt-6">
                  <button
                    onClick={() => handleDiningConcierge(venue.name)}
                    className="bg-aurelia-charcoal text-white hover:bg-aurelia-gold px-6 py-2.5 text-[10px] tracking-widest uppercase font-semibold transition-colors flex items-center space-x-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve a Table</span>
                  </button>
                  
                  <button
                    onClick={() => handleDiningConcierge(venue.name)}
                    className="text-xs uppercase tracking-widest text-aurelia-gold hover:text-aurelia-charcoal transition-colors font-semibold flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask Aurelia</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
