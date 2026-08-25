import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-aurelia-bg min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold font-semibold">Legal</span>
          <h1 className="font-serif text-4xl text-aurelia-charcoal">Privacy Policy</h1>
          <p className="text-xs text-aurelia-text/60 italic">Demo document — Aurelia Grand is a fictional hotel for demonstration purposes.</p>
        </div>
        <div className="prose prose-sm text-aurelia-text/80 space-y-4 leading-relaxed text-sm font-light">
          <p>Aurelia Grand is committed to protecting your personal information and your right to privacy. This policy outlines how we collect, use, and store your data when you interact with our website and AI concierge service.</p>
          <h3 className="font-serif text-lg text-aurelia-charcoal">Information We Collect</h3>
          <p>We may collect your name, email address, phone number, travel dates, and accommodation preferences when you engage with our AI concierge, submit a contact form, or complete a booking request.</p>
          <h3 className="font-serif text-lg text-aurelia-charcoal">How We Use Your Information</h3>
          <p>Your information is used solely to respond to your enquiries, personalise your experience, and connect you with our reservations team. We do not sell or share your data with third parties for marketing purposes.</p>
          <h3 className="font-serif text-lg text-aurelia-charcoal">Data Retention</h3>
          <p>Conversation data is retained for the duration required to fulfill your request and provide continuity of service. You may request deletion of your information at any time.</p>
        </div>
        <Link href="/" className="inline-block text-xs uppercase tracking-widest text-aurelia-gold hover:underline">← Return to Hotel</Link>
      </div>
    </div>
  );
}
