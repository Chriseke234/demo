'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { mockRooms, mockDining } from '@/data/mockData';

// Hero Carousel Slides Data
const HERO_SLIDES = [
  {
    id: 'slide-1',
    subtitle: 'Welcome to Aurelia Grand',
    title: 'Stay somewhere ',
    italicTitle: 'unforgettable.',
    description: 'An elevated sanctuary in the heart of Dubai Marina, where thoughtful hospitality meets contemporary luxury.',
    image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=1600&auto=format&fit=crop',
    alt: 'Dubai Marina luxury twilight view',
    ctaText: 'Explore Rooms',
    ctaHref: '/rooms',
  },
  {
    id: 'slide-2',
    subtitle: 'Sanctuaries in the Sky',
    title: 'Sweeping vistas & ',
    italicTitle: 'private terraces.',
    description: 'Floor-to-ceiling panoramic views over Dubai Marina, marble spa bathrooms, and 24-hour dedicated butler service.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1600&auto=format&fit=crop',
    alt: 'Marina Suite terrace skyline view',
    ctaText: 'View Suites',
    ctaHref: '/rooms/marina-suite',
  },
  {
    id: 'slide-3',
    subtitle: 'Culinary Artistry',
    title: 'Waterfront dining ',
    italicTitle: 'under the stars.',
    description: 'Fresh Mediterranean catches seared to perfection at Aurelia Mare, overlooking the gentle marina breeze.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
    alt: 'Aurelia Mare Mediterranean dining terrace',
    ctaText: 'Discover Dining',
    ctaHref: '/dining',
  },
  {
    id: 'slide-4',
    subtitle: 'Bespoke Curations',
    title: 'Unforgettable ',
    italicTitle: 'experiences.',
    description: 'Private sunset yacht cruises along Palm Jumeirah and vintage Land Rover desert expeditions beneath starry skies.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1600&auto=format&fit=crop',
    alt: 'Private Marina Sunset Cruise',
    ctaText: 'Explore Experiences',
    ctaHref: '/experiences',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const featuredRooms = mockRooms.filter(r => r.featured);

  // Auto-play timer for hero carousel (6 seconds per slide)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Helper to open the floating concierge chat panel
  const handleOpenConcierge = () => {
    if (typeof window !== 'undefined') {
      const launcher = document.querySelector('button[aria-label="Open Aurelia AI Concierge"]') as HTMLButtonElement;
      if (launcher) launcher.click();
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="bg-aurelia-bg text-aurelia-text">
      
      {/* 1. ULTRA-LUXURY HERO CAROUSEL SECTION */}
      <section 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative h-screen min-h-[680px] w-full flex items-center justify-center overflow-hidden bg-aurelia-charcoal select-none"
      >
        {/* Carousel Background Images with Ken Burns Zoom Effect */}
        {HERO_SLIDES.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={s.alt}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-aurelia-charcoal via-aurelia-charcoal/40 to-aurelia-charcoal/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-aurelia-charcoal/60 via-transparent to-aurelia-charcoal/60" />
          </div>
        ))}

        {/* Hero Copy Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white space-y-5 flex flex-col justify-center items-center pt-8 pb-16">
          <div className="flex justify-center">
            <span key={`sub-${currentSlide}`} className="inline-block text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#F3E5AB] font-medium animate-fade-in px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#F3E5AB]/30 shadow-lg">
              {slide.subtitle}
            </span>
          </div>
          <h1 key={`title-${currentSlide}`} className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight font-light text-white animate-fade-in max-w-4xl">
            {slide.title}<span className="italic font-normal">{slide.italicTitle}</span>
          </h1>
          <p key={`desc-${currentSlide}`} className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed tracking-wide animate-fade-in">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-3 animate-fade-in">
            <Link
              href={slide.ctaHref}
              className="w-full sm:w-auto bg-aurelia-gold text-white hover:bg-white hover:text-aurelia-charcoal text-xs uppercase tracking-widest px-8 py-3.5 transition-all duration-300 font-semibold shadow-lg rounded-sm"
            >
              {slide.ctaText}
            </Link>
            <button
              onClick={handleOpenConcierge}
              className="w-full sm:w-auto border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-aurelia-charcoal text-xs uppercase tracking-widest px-8 py-3.5 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg rounded-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-aurelia-gold" />
              <span>Ask Our Concierge</span>
            </button>
          </div>
        </div>

        {/* Navigation Arrows (Desktop & Tablet) */}
        <button
          onClick={handlePrevSlide}
          className="hidden sm:flex absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white items-center justify-center hover:bg-aurelia-gold hover:border-aurelia-gold transition-all duration-300 group"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={handleNextSlide}
          className="hidden sm:flex absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white items-center justify-center hover:bg-aurelia-gold hover:border-aurelia-gold transition-all duration-300 group"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Slide Progress Bar Indicators */}
        <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-30 flex flex-col items-center space-y-3 px-6">
          {/* Progress Indicators */}
          <div className="flex items-center space-x-3 max-w-xs w-full justify-center">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="relative flex-1 h-1 bg-white/20 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/40 focus:outline-none"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <span 
                    className={`absolute inset-0 bg-aurelia-gold transition-all duration-[6000ms] linear ${
                      isPaused ? 'opacity-80' : 'w-full'
                    }`} 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. GLASSMORPHISM QUICK BOOKING BAR */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16">
        <div className="bg-white/95 backdrop-blur-md border border-aurelia-gold/30 p-6 sm:p-8 shadow-2xl rounded-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1.5 flex items-center space-x-1.5">
              <Calendar className="w-3 h-3 text-aurelia-gold" />
              <span>Check-in Date</span>
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold text-aurelia-text font-sans"
            />
          </div>
          
          <div>
            <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1.5 flex items-center space-x-1.5">
              <Calendar className="w-3 h-3 text-aurelia-gold" />
              <span>Check-out Date</span>
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold text-aurelia-text font-sans"
            />
          </div>

          <div>
            <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1.5 flex items-center space-x-1.5">
              <User className="w-3 h-3 text-aurelia-gold" />
              <span>Guests</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold text-aurelia-text font-sans"
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
            className="w-full bg-aurelia-charcoal text-white hover:bg-aurelia-gold text-center py-3.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md flex items-center justify-center space-x-2 group"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 3. PROACTIVE CONCIERGE CALLOUT (THE DEMO HERO MOMENT) */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="w-12 h-12 rounded-full border border-aurelia-gold/30 flex items-center justify-center bg-aurelia-sand mx-auto text-aurelia-gold shadow-sm">
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
              onClick={handleOpenConcierge}
              className="bg-aurelia-sand border border-aurelia-sandDark/80 hover:border-aurelia-gold hover:bg-white px-4 py-2.5 text-xs transition-all text-aurelia-charcoal font-light shadow-sm"
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
