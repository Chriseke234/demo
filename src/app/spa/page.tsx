'use client';

import React from 'react';
import { Sparkles, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { mockSpaTreatments } from '@/data/mockData';

export default function SpaPage() {
  const handleSpaConcierge = (treatmentName: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('aurelia_spa_interest', treatmentName);
      sessionStorage.setItem('aurelia_context_prompt', `I see you are interested in booking our ${treatmentName}. Would you like me to find treatment openings or describe the health benefits of our gold oils?`);
      
      const launcher = document.querySelector('button[aria-label="Open Aurelia AI Concierge"]') as HTMLButtonElement;
      if (launcher) launcher.click();
    }
  };

  return (
    <div className="bg-aurelia-bg min-h-screen pt-28 pb-20">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold font-semibold">
            Wellness Club
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-aurelia-charcoal font-light">
            Aurelia <span className="italic font-normal">Spa & Sanctuary</span>
          </h1>
          <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
            Step away from the city. Aurelia Spa balances botanical hammams, sound therapies, and restorative treatments designed around unhurried relaxation.
          </p>
        </div>

        {/* Cinematic Backdrop banner */}
        <div className="h-[280px] md:h-[400px] w-full overflow-hidden relative mb-16 border border-aurelia-sandDark/40">
          <img
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop"
            alt="Spa wellness bath"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-aurelia-charcoal/20" />
        </div>

        {/* Spa Amenities grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-xs text-aurelia-text">
          <div className="bg-white border border-aurelia-sandDark/40 p-6 space-y-2">
            <h4 className="font-serif text-base text-aurelia-charcoal">The Thermal Suites</h4>
            <p className="font-light leading-relaxed">Access our aromatic herbal saunas, eucalyptus steam baths, and dynamic hot-cold pools, designed to stimulate healing.</p>
          </div>
          <div className="bg-white border border-aurelia-sandDark/40 p-6 space-y-2">
            <h4 className="font-serif text-base text-aurelia-charcoal">The Infinity Deck</h4>
            <p className="font-light leading-relaxed">Relax in private shaded cabanas by our marina-facing pool deck. Complimented by cold-pressed juices and organic light plates.</p>
          </div>
          <div className="bg-white border border-aurelia-sandDark/40 p-6 space-y-2">
            <h4 className="font-serif text-base text-aurelia-charcoal">Hammam Chambers</h4>
            <p className="font-light leading-relaxed">Experience a traditional deep cleansing hamman ritual using black olive soap, kessa glove scrubs, and calming clay wraps.</p>
          </div>
        </div>

        {/* Treatments List */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-aurelia-charcoal tracking-wide mb-8">Spa Treatment Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockSpaTreatments.map((treatment) => (
              <div 
                key={treatment.name}
                className="bg-white border border-aurelia-sandDark/40 p-6 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] tracking-widest uppercase font-semibold text-aurelia-gold">
                        {treatment.category} · {treatment.duration}
                      </span>
                      <h4 className="font-serif text-xl text-aurelia-charcoal mt-1">{treatment.name}</h4>
                    </div>
                    <span className="font-serif text-lg text-aurelia-gold font-light">${treatment.price}</span>
                  </div>
                  
                  <p className="text-xs text-aurelia-text/75 font-light leading-relaxed">
                    {treatment.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-aurelia-sandDark/35 pt-4">
                  <button
                    onClick={() => handleSpaConcierge(treatment.name)}
                    className="border border-aurelia-gold text-aurelia-gold hover:bg-aurelia-gold hover:text-white px-5 py-2 text-[10px] tracking-widest uppercase font-semibold transition-all bg-transparent"
                  >
                    Request Booking
                  </button>
                  <button
                    onClick={() => handleSpaConcierge(treatment.name)}
                    className="text-xs uppercase tracking-widest text-aurelia-gold hover:text-aurelia-charcoal transition-colors font-semibold flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask Aurelia</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
