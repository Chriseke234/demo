'use client';

import React from 'react';
import { Sparkles, Calendar, Clock, Map } from 'lucide-react';
import { mockExperiences } from '@/data/mockData';

export default function ExperiencesPage() {
  const handleExpConcierge = (expName: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('aurelia_exp_interest', expName);
      sessionStorage.setItem('aurelia_context_prompt', `I see you are interested in booking the ${expName}. Would you like me to describe the itinerary or look into private scheduling?`);
      
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
            Bespoke Activities
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-aurelia-charcoal font-light">
            Curated <span className="italic font-normal">Experiences</span>
          </h1>
          <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
            Beyond our suites, we host experiences configured around the sights, heritage, and landscapes of Dubai. Discover dunes, yachts, and culinary journeys curated by our guest-relations team.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {mockExperiences.map((exp) => (
            <div key={exp.id} className="bg-white border border-aurelia-sandDark/40 flex flex-col justify-between shadow-sm">
              <div>
                <div className="h-[260px] md:h-[320px] overflow-hidden relative">
                  <img
                    src={exp.images[0]}
                    alt={exp.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-aurelia-charcoal text-white text-[9px] tracking-widest uppercase px-3 py-1 font-semibold">
                    {exp.category}
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-serif text-xl md:text-2xl text-aurelia-charcoal">{exp.name}</h3>
                    <span className="font-serif text-base text-aurelia-gold font-light">${exp.price} / person</span>
                  </div>

                  <p className="text-xs md:text-sm text-aurelia-text/75 font-light leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex items-center space-x-2 text-xs text-aurelia-text/60 font-light">
                    <Clock className="w-4 h-4 text-aurelia-gold" />
                    <span>Duration: <strong>{exp.duration}</strong></span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-aurelia-sandDark/35 flex items-center justify-between">
                <button
                  onClick={() => handleExpConcierge(exp.name)}
                  className="bg-aurelia-charcoal hover:bg-aurelia-gold text-white px-6 py-2.5 text-[10px] tracking-widest uppercase font-semibold transition-colors flex items-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Experience</span>
                </button>
                <button
                  onClick={() => handleExpConcierge(exp.name)}
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
  );
}
