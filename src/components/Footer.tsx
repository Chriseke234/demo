'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <footer className="bg-aurelia-charcoal text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-white/10">
        
        {/* Brand Details */}
        <div className="md:col-span-1 space-y-4">
          <Link href="/" className="flex flex-col text-left group">
            <span className="font-serif text-2xl tracking-[0.2em] uppercase text-white">
              AURELIA
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold">
              GRAND · DUBAI
            </span>
          </Link>
          <p className="text-white/60 text-xs leading-relaxed max-w-xs pt-2">
            An elevated sanctuary in the heart of Dubai Marina, where thoughtful hospitality meets contemporary luxury.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-aurelia-gold uppercase text-[10px] tracking-[0.2em] font-semibold">Discovery</h4>
          <ul className="space-y-2 text-xs text-white/70">
            <li><Link href="/rooms" className="hover:text-white transition-colors">Stay & Suites</Link></li>
            <li><Link href="/dining" className="hover:text-white transition-colors">Dining Venues</Link></li>
            <li><Link href="/spa" className="hover:text-white transition-colors">Wellness & Spa</Link></li>
            <li><Link href="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
          </ul>
        </div>

        {/* Information */}
        <div className="space-y-4">
          <h4 className="text-aurelia-gold uppercase text-[10px] tracking-[0.2em] font-semibold">Information</h4>
          <ul className="space-y-2 text-xs text-white/70">
            <li><Link href="/events" className="hover:text-white transition-colors">Meetings & Events</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition-colors">Visual Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Location & Contact</Link></li>
            <li><Link href="/book" className="hover:text-white transition-colors">Direct Bookings</Link></li>
          </ul>
        </div>

        {/* Address and Contact info */}
        <div className="space-y-4 text-xs text-white/70">
          <h4 className="text-aurelia-gold uppercase text-[10px] tracking-[0.2em] font-semibold">Contact Us</h4>
          <p className="leading-relaxed">
            100 Aurelia Promenade<br />
            Dubai Marina, P.O. Box 244567<br />
            United Arab Emirates
          </p>
          <div className="space-y-1 pt-2">
            <p>T: +971 4 555 0100</p>
            <p>E: concierge@aureliagrand.com</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-white/40 text-[10px] tracking-widest uppercase space-y-4 md:space-y-0">
        <div>
          © {new Date().getFullYear()} Aurelia Grand. All Rights Reserved.
        </div>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <span className="text-aurelia-gold font-semibold">Demo Experience Mode</span>
        </div>
      </div>
    </footer>
  );
}
