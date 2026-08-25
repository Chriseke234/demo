'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const sessionId = sessionStorage.getItem('aurelia_session_id') || 'session-contact-' + Date.now();
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          name,
          email,
          interest: `Contact Form Message: ${message.slice(0, 50)}...`,
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
            Inquiries
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-aurelia-charcoal font-light">
            Contact & <span className="italic font-normal">Location</span>
          </h1>
          <p className="text-sm text-aurelia-text/80 leading-relaxed font-light">
            Whether you are booking a suite, planning a private yacht event, or seeking dining suggestions, our guest relations team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8 bg-white border border-aurelia-sandDark/40 p-8 shadow-sm text-xs">
            <h2 className="font-serif text-2xl text-aurelia-charcoal">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-aurelia-gold flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-aurelia-charcoal uppercase tracking-widest text-[9px]">Location</h4>
                  <p className="leading-relaxed text-aurelia-text/80">
                    100 Aurelia Promenade<br />
                    Dubai Marina, P.O. Box 244567<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-aurelia-gold flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-aurelia-charcoal uppercase tracking-widest text-[9px]">Telephone</h4>
                  <p className="leading-relaxed text-aurelia-text/80">
                    Reservations: +971 4 555 0100<br />
                    Concierge Desk: +971 4 555 0102
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-aurelia-gold flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-aurelia-charcoal uppercase tracking-widest text-[9px]">Email Inquiries</h4>
                  <p className="leading-relaxed text-aurelia-text/80">
                    General: info@aureliagrand.com<br />
                    Concierge: concierge@aureliagrand.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-aurelia-sandDark/40 p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-aurelia-sand border border-aurelia-gold flex items-center justify-center mx-auto text-aurelia-gold">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-aurelia-charcoal">Message Sent</h3>
                <p className="text-sm text-aurelia-text/80 max-w-sm mx-auto leading-relaxed font-light">
                  Thank you. Your message has been routed to our guest-relations team. We will review and respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-xl text-aurelia-charcoal">Send an Online Inquiry</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Full Name</label>
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
                </div>

                <div>
                  <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold focus:ring-0 resize-none"
                    placeholder="Describe how we can make your stay exceptional..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-aurelia-charcoal text-white hover:bg-aurelia-gold py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
