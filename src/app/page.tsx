'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, MapPin, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { mockRooms, mockDining } from '@/data/mockData';

export default function Home() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const featuredRooms = mockRooms.filter(r => r.featured);

  // Helper to open the floating concierge chat panel
  const handleOpenConcierge = () => {
    // Dispatch a custom event that ConciergeLauncher listens to
    if (typeof window !== 'undefined') {
      const launcher = document.querySelector('button[aria-label="Open Aurelia AI Concierge"]') as HTMLButtonElement;
      if (launcher) launcher.click();
    }
  };

  return (
    <div className="bg-aurelia-bg text-aurelia-text">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=1600&auto=format&fit=crop"
            alt="Dubai Marina luxury twilight view"
            className="w-full h-full object-cover scale-105 animate-[pulse_6s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aurelia-charcoal via-aurelia-charcoal/40 to-transparent" />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6 pt-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold font-semibold animate-fade-in block">
            Welcome to Aurelia Grand
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight font-light text-white animate-fade-in">
            Stay somewhere <span className="italic font-normal">unforgettable</span>.
          </h1>
          <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed tracking-wide animate-fade-in">
            An elevated stay in the heart of Dubai Marina, where thoughtful hospitality meets contemporary luxury.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 animate-fade-in">
            <Link
              href="/rooms"
              className="w-full sm:w-auto bg-aurelia-gold text-white hover:bg-white hover:text-aurelia-charcoal text-xs uppercase tracking-widest px-8 py-3.5 transition-all duration-300 font-semibold"
            >
              Explore Rooms
            </Link>
            <button
              onClick={handleOpenConcierge}
              className="w-full sm:w-auto border border-white/40 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-aurelia-charcoal text-xs uppercase tracking-widest px-8 py-3.5 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-aurelia-gold" />
              <span>Ask Our Concierge</span>
            </button>
          </div>
        </div>

        {/* Visual Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center space-y-2 text-white/50 text-[9px] tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* 2. QUICK BOOKING BAR */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-16">
        <div className="bg-white border border-aurelia-sandDark/40 p-6 shadow-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Check-in</label>
            <div className="relative">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold text-aurelia-text"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Check-out</label>
            <div className="relative">
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold text-aurelia-text"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold text-aurelia-text"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
          </div>

          <Link
            href={{
              pathname: '/book',
              query: { checkIn, checkOut, guests }
            }}
            className="w-full bg-aurelia-charcoal text-white hover:bg-aurelia-gold text-center py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* 3. PROACTIVE CONCIERGE CALLOUT (THE DEMO HERO MOMENT) */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="w-12 h-12 rounded-full border border-aurelia-gold/20 flex items-center justify-center bg-aurelia-sand mx-auto text-aurelia-gold">
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-aurelia-charcoal">
          A luxury stay shaped <span className="italic">around you</span>.
        </h2>
        <p className="text-sm text-aurelia-text/80 max-w-2xl mx-auto leading-relaxed font-light">
          Skip the standard booking forms. Tell our digital concierge, Aurelia, what you are planning—whether it is a romantic anniversary trip, a family retreat, or dining reservation details. Aurelia is ready to plan your itinerary.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {[
            "Find a romantic suite",
            "Plan a 3-day itinerary",
            "Book a table at Aurelia Mare",
            "Tell me about airport transfer options"
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                handleOpenConcierge();
                // We let it open and the user can click it there, or we can send it directly
              }}
              className="bg-aurelia-sand border border-aurelia-sandDark/80 hover:border-aurelia-gold px-4 py-2 text-xs transition-all text-aurelia-charcoal"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      </section>

      {/* 4. STAY & SUITES FEATURED PANEL */}
      <section className="py-20 bg-aurelia-sand border-y border-aurelia-sandDark/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-aurelia-gold font-semibold">The Accommodations</span>
              <h2 className="font-serif text-3xl md:text-5xl text-aurelia-charcoal mt-2">Suites & Sanctuaries</h2>
            </div>
            <Link href="/rooms" className="text-xs uppercase tracking-widest text-aurelia-gold hover:text-aurelia-charcoal transition-colors flex items-center space-x-2 mt-4 md:mt-0 font-semibold">
              <span>View All Accommodations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {featuredRooms.map((room) => (
              <div key={room.id} className="group bg-white border border-aurelia-sandDark/40 overflow-hidden flex flex-col shadow-sm">
                <div className="relative h-[320px] overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-aurelia-charcoal text-white text-[10px] tracking-widest uppercase px-3 py-1 font-semibold">
                    From ${room.price} / Night
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl text-aurelia-charcoal">{room.name}</h3>
                    <p className="text-xs text-aurelia-text/75 line-clamp-3 font-light leading-relaxed">
                      {room.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-[11px] text-aurelia-gold pt-2 uppercase tracking-wider font-semibold">
                      <span>{room.size}</span>
                      <span>•</span>
                      <span>{room.view}</span>
                      <span>•</span>
                      <span>Sleeps {room.capacity}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-aurelia-sandDark/30 pt-6">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="text-xs uppercase tracking-widest text-aurelia-charcoal hover:text-aurelia-gold transition-colors font-semibold"
                    >
                      Explore Room
                    </Link>
                    <button
                      onClick={handleOpenConcierge}
                      className="text-xs uppercase tracking-widest text-aurelia-gold hover:text-aurelia-charcoal transition-colors font-semibold flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Ask Aurelia</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DINING TEASER */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[9px] tracking-[0.3em] uppercase text-aurelia-gold font-semibold">Culinary Artistry</span>
            <h2 className="font-serif text-3xl md:text-5xl text-aurelia-charcoal leading-tight">
              Dubai Marina's finest dining, <span className="italic font-normal">curated</span>.
            </h2>
            <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
              From fresh Mediterranean catches overlooking the marina at Aurelia Mare, to prime dry-aged Wagyu beef seared tableside at Ember, our collection of dining venues offers a journey of international gastronomy.
            </p>
            <div className="pt-2">
              <Link
                href="/dining"
                className="inline-flex items-center space-x-2 bg-aurelia-charcoal text-white hover:bg-aurelia-gold px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <span>Discover Dining</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-[260px] overflow-hidden">
                <img
                  src={mockDining[0].images[0]}
                  alt="Aurelia Mare Italian Terrace"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="bg-aurelia-sand p-6 border border-aurelia-sandDark/40">
                <h4 className="font-serif text-lg text-aurelia-charcoal">Aurelia Mare</h4>
                <p className="text-[10px] text-aurelia-gold uppercase tracking-widest font-semibold mt-1">Mediterranean Fine Dining</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="h-[260px] overflow-hidden">
                <img
                  src={mockDining[1].images[0]}
                  alt="Ember Charcoal Steakhouse"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="bg-aurelia-sand p-6 border border-aurelia-sandDark/40">
                <h4 className="font-serif text-lg text-aurelia-charcoal">Ember</h4>
                <p className="text-[10px] text-aurelia-gold uppercase tracking-widest font-semibold mt-1">Modern Charcoal Grill</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SPA & WELLNESS BANNER */}
      <section className="relative py-32 bg-aurelia-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury spa bath"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-[9px] tracking-[0.3em] uppercase text-aurelia-gold font-semibold">The Wellness Club</span>
          <h2 className="font-serif text-3xl md:text-5xl text-white">An oasis of unhurried relaxation.</h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto leading-relaxed font-light">
            Indulge in organic body rituals, sound baths, hammams, and therapeutic massages containing 24k gold leaf at the Aurelia Wellness Centre.
          </p>
          <div className="pt-2">
            <Link
              href="/spa"
              className="border border-aurelia-gold text-aurelia-gold hover:bg-aurelia-gold hover:text-white px-8 py-3.5 text-xs uppercase tracking-widest transition-colors font-semibold bg-transparent"
            >
              Explore Treatments
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
