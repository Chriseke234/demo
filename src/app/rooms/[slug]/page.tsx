'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, Check, Calendar, MessageSquare } from 'lucide-react';
import { mockRooms } from '@/data/mockData';

export default function RoomDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const room = mockRooms.find(r => r.slug === params.slug);

  if (!room) {
    return (
      <div className="bg-aurelia-bg min-h-screen pt-32 pb-20 flex flex-col items-center justify-center space-y-4">
        <h2 className="font-serif text-2xl text-aurelia-charcoal">Suite Not Found</h2>
        <p className="text-sm text-aurelia-text/70">The requested sanctuary could not be located.</p>
        <Link href="/rooms" className="text-xs uppercase tracking-widest text-aurelia-gold hover:underline">
          Return to Suites
        </Link>
      </div>
    );
  }

  const handleContextualConcierge = () => {
    if (typeof window !== 'undefined') {
      // Store contextual detail
      sessionStorage.setItem('aurelia_room_interest', room.name);
      sessionStorage.setItem('aurelia_context_prompt', `I see you're looking at the ${room.name}. Would you like me to compare it with our other rooms, or answer questions about its layout and butler services?`);
      
      const launcher = document.querySelector('button[aria-label="Open Aurelia AI Concierge"]') as HTMLButtonElement;
      if (launcher) launcher.click();
    }
  };

  return (
    <div className="bg-aurelia-bg min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Link */}
        <Link 
          href="/rooms"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-aurelia-gold hover:text-aurelia-charcoal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Suites</span>
        </Link>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-aurelia-gold font-semibold">
              Suite Collection
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-aurelia-charcoal">{room.name}</h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[9px] tracking-widest text-aurelia-text/50 uppercase">Starting From</p>
            <p className="text-2xl md:text-3xl font-serif text-aurelia-gold font-light mt-1">${room.price} <span className="text-xs font-sans text-aurelia-text/70">/ Night</span></p>
          </div>
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="md:col-span-2 h-[320px] md:h-[480px] overflow-hidden">
            <img
              src={room.images[0]}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-4 h-[320px] md:h-[480px]">
            <div className="overflow-hidden">
              <img
                src={room.images[1] || room.images[0]}
                alt={`${room.name} View`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden relative">
              <img
                src={room.images[2] || room.images[0]}
                alt={`${room.name} Details`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Room Specs & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-xl tracking-wider text-aurelia-charcoal">The Sanctuary Experience</h2>
              <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
                {room.description}
              </p>
            </div>

            {/* Spec Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-white border border-aurelia-sandDark/40 p-6 shadow-sm">
              <div className="text-center space-y-1">
                <p className="text-[9px] tracking-widest text-aurelia-text/50 uppercase">View</p>
                <p className="text-xs font-semibold text-aurelia-charcoal">{room.view}</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-[9px] tracking-widest text-aurelia-text/50 uppercase">Size</p>
                <p className="text-xs font-semibold text-aurelia-charcoal">{room.size}</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-[9px] tracking-widest text-aurelia-text/50 uppercase">Occupancy</p>
                <p className="text-xs font-semibold text-aurelia-charcoal">Up to {room.capacity} Guests</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-[9px] tracking-widest text-aurelia-text/50 uppercase">Bedding</p>
                <p className="text-xs font-semibold text-aurelia-charcoal">King Size Bed</p>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg tracking-wider text-aurelia-charcoal">Exclusive Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2.5 text-xs text-aurelia-text/90 font-light">
                    <Check className="w-3.5 h-3.5 text-aurelia-gold" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Booking Panel */}
            <div className="bg-white border border-aurelia-sandDark p-6 space-y-6 shadow-md">
              <h3 className="font-serif text-lg text-aurelia-charcoal text-center">Reservation</h3>
              <p className="text-xs text-aurelia-text/75 text-center font-light leading-relaxed">
                Reserve this room directly with our booking system. Standard cancellations are free up to 48 hours prior to check-in.
              </p>
              
              <Link
                href={{
                  pathname: '/book',
                  query: { roomSlug: room.slug }
                }}
                className="w-full block text-center bg-aurelia-charcoal text-white hover:bg-aurelia-gold py-3 text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Reserve This Suite
              </Link>
            </div>

            {/* Contextual AI Concierge Ask Callout */}
            <div className="bg-aurelia-sand border border-aurelia-gold/30 p-6 space-y-4 text-center">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center mx-auto text-aurelia-gold shadow-sm">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-sm text-aurelia-charcoal">Not sure if this suite is right?</h4>
                <p className="text-[11px] text-aurelia-text/80 leading-relaxed font-light">
                  Ask Aurelia. She can details the layouts, compare rooms, or arrange a private transfers.
                </p>
              </div>
              <button
                onClick={handleContextualConcierge}
                className="w-full bg-transparent hover:bg-aurelia-charcoal/5 border border-aurelia-gold text-aurelia-gold py-2 text-[10px] tracking-widest uppercase transition-all font-semibold"
              >
                Ask Aurelia About This Room
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
