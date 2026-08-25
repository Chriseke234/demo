'use client';

import React, { useState } from 'react';
import { Sparkles, Calendar, Users, MapPin, Check } from 'lucide-react';

export default function EventsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('corporate');
  const [guests, setGuests] = useState('50');
  const [submitted, setSubmitted] = useState(false);

  const spaces = [
    {
      name: "The Grand Aurelia Ballroom",
      capacity: "Up to 500 Guests",
      features: "Stunning floor-to-ceiling marina view terrace, customizable crystal chandeliers, full AV integration.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop"
    },
    {
      name: "Marina Terrace Boardroom",
      capacity: "Up to 24 Guests",
      features: "Executive leather finishes, smart video conferencing setups, dedicated catering sideboard.",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const sessionId = sessionStorage.getItem('aurelia_session_id') || 'session-events-' + Date.now();
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          name,
          email,
          interest: `Events request: ${eventType}`,
          guests: Number(guests),
          source: 'contact_form'
        })
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-aurelia-bg min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold font-semibold">
            Social & Corporate
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-aurelia-charcoal font-light">
            Meetings & <span className="italic font-normal">Celebrations</span>
          </h1>
          <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
            Host refined corporate gatherings, elegant marina-view product launches, or grand ballroom celebrations. Our event planning team provides personalized catering and technical setups.
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {spaces.map((space) => (
            <div key={space.name} className="bg-white border border-aurelia-sandDark/40 flex flex-col shadow-sm">
              <div className="h-[280px] overflow-hidden">
                <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-serif text-xl md:text-2xl text-aurelia-charcoal">{space.name}</h3>
                <div className="flex items-center space-x-2 text-xs text-aurelia-gold font-semibold">
                  <Users className="w-4 h-4" />
                  <span>{space.capacity}</span>
                </div>
                <p className="text-xs md:text-sm text-aurelia-text/75 font-light leading-relaxed">
                  {space.features}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Form */}
        <div className="max-w-3xl mx-auto bg-white border border-aurelia-sandDark/40 p-8 shadow-md">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-aurelia-sand border border-aurelia-gold flex items-center justify-center mx-auto text-aurelia-gold">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-aurelia-charcoal">Request Received</h3>
              <p className="text-sm text-aurelia-text/80 max-w-sm mx-auto leading-relaxed">
                Thank you for your inquiry. Our event planning team will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="font-serif text-2xl text-aurelia-charcoal">Submit a Request for Proposal</h2>
                <p className="text-xs text-aurelia-text/70">Let us help orchestrate your next event in Dubai Marina.</p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold text-aurelia-text"
                  >
                    <option value="corporate">Corporate Meeting</option>
                    <option value="wedding">Grand Wedding</option>
                    <option value="banquet">Private Banquet</option>
                    <option value="social">Social Celebration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Estimated Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold text-aurelia-text"
                  >
                    <option value="20">Less than 20</option>
                    <option value="50">20 - 50 guests</option>
                    <option value="150">50 - 150 guests</option>
                    <option value="300">150+ guests</option>
                  </select>
                </div>
                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-aurelia-charcoal text-white hover:bg-aurelia-gold py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    Submit Proposal Request
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
