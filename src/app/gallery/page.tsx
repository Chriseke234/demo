'use client';

import React from 'react';

export default function GalleryPage() {
  const images = [
    { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format&fit=crop", cat: "Suites" },
    { url: "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=600&auto=format&fit=crop", cat: "Architecture" },
    { url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop", cat: "Dining" },
    { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop", cat: "Spa & Pools" },
    { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600&auto=format&fit=crop", cat: "Suites" },
    { url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop", cat: "Dining" },
    { url: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop", cat: "Experiences" },
    { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=600&auto=format&fit=crop", cat: "Suites" }
  ];

  return (
    <div className="bg-aurelia-bg min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold font-semibold">
            Visual Story
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-aurelia-charcoal font-light">
            The Aurelia <span className="italic font-normal">Gallery</span>
          </h1>
          <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
            Take a visual tour of our Dubai Marina residences, seaside wellness chambers, award-winning grill dining rooms, and custom yachts.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="relative overflow-hidden group border border-aurelia-sandDark/40 break-inside-avoid shadow-sm"
            >
              <img 
                src={img.url} 
                alt={`Gallery ${img.cat}`} 
                className="w-full object-cover group-hover:scale-103 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-aurelia-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-[10px] tracking-widest uppercase font-semibold bg-aurelia-gold px-3 py-1">
                  {img.cat}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
