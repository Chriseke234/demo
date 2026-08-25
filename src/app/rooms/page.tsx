'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { mockRooms } from '@/data/mockData';

export default function RoomsPage() {
  const handleOpenConcierge = (roomName: string) => {
    // Save room interest to session storage so Aurelia knows about it when opened
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('aurelia_room_interest', roomName);
      
      const launcher = document.querySelector('button[aria-label="Open Aurelia AI Concierge"]') as HTMLButtonElement;
      if (launcher) launcher.click();
    }
  };

  return (
    <div className="bg-aurelia-bg min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold font-semibold">
            Accommodations
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-aurelia-charcoal font-light">
            Rooms, Suites & <br />
            <span className="italic font-normal">Residences</span>
          </h1>
          <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
            Each sanctuary is designed with a premium, residential feel. Large floor-to-ceiling windows look out over the glittering waters of Dubai Marina or the dramatic city skyline, creating a seamless connection to the city.
          </p>
        </div>

        {/* Filters/Divider */}
        <div className="flex items-center justify-between border-b border-aurelia-sandDark/45 pb-4 mb-10 text-xs">
          <div className="flex space-x-6 text-aurelia-charcoal font-medium">
            <span className="border-b border-aurelia-gold pb-4 text-aurelia-gold font-semibold cursor-pointer">All Sanctuaries</span>
            <span className="text-aurelia-text/60 hover:text-aurelia-charcoal cursor-pointer">Suites</span>
            <span className="text-aurelia-text/60 hover:text-aurelia-charcoal cursor-pointer">Residences</span>
          </div>
          <div className="flex items-center space-x-2 text-aurelia-text/70">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </div>
        </div>

        {/* Rooms List */}
        <div className="space-y-16">
          {mockRooms.map((room, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={room.id}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center bg-white border border-aurelia-sandDark/35 shadow-sm p-4 md:p-8 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 h-[340px] md:h-[420px] overflow-hidden relative">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
                  />
                  {room.featured && (
                    <div className="absolute top-4 left-4 bg-aurelia-gold text-white text-[9px] tracking-widest uppercase px-3 py-1 font-semibold">
                      Featured Suite
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-aurelia-gold font-semibold">
                      From ${room.price} / Night
                    </span>
                    <h3 className="font-serif text-3xl text-aurelia-charcoal mt-2">{room.name}</h3>
                  </div>

                  <p className="text-sm text-aurelia-text/75 leading-relaxed font-light">
                    {room.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-y border-aurelia-sandDark/30 py-4 text-xs">
                    <div className="space-y-1">
                      <p className="text-aurelia-text/50 uppercase tracking-widest text-[9px]">View</p>
                      <p className="font-semibold text-aurelia-charcoal">{room.view}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-aurelia-text/50 uppercase tracking-widest text-[9px]">Dimensions</p>
                      <p className="font-semibold text-aurelia-charcoal">{room.size}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-aurelia-text/50 uppercase tracking-widest text-[9px]">Capacity</p>
                      <p className="font-semibold text-aurelia-charcoal">Up to {room.capacity} guests</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-aurelia-text/50 uppercase tracking-widest text-[9px]">Key Feature</p>
                      <p className="font-semibold text-aurelia-charcoal">{room.amenities[0]}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 pt-2">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="bg-aurelia-charcoal text-white hover:bg-aurelia-gold px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center space-x-2"
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleOpenConcierge(room.name)}
                      className="text-xs uppercase tracking-widest text-aurelia-gold hover:text-aurelia-charcoal transition-colors font-semibold flex items-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Ask Aurelia</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
