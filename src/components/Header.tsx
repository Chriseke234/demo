'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Sparkles, MapPin, Phone } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show header in admin dashboard
  const isAdmin = pathname.startsWith('/admin');

  // Scroll listener for sticky header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isAdmin) return null;

  const navLinks = [
    { name: 'Stay', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Wellness', href: '/spa' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHome = pathname === '/';

  return (
    <>
      {/* ── Main Sticky Header Bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-aurelia-bg/95 backdrop-blur-md border-b border-aurelia-sandDark/30 py-3.5 shadow-md'
            : isHome
            ? 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 sm:py-6'
            : 'bg-aurelia-bg/90 backdrop-blur-sm border-b border-aurelia-sandDark/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex flex-col text-left group z-50">
            <span className={`font-serif text-lg sm:text-xl lg:text-2xl tracking-[0.2em] uppercase transition-colors duration-300 ${
              !isScrolled && isHome ? 'text-white' : 'text-aurelia-text'
            }`}>
              AURELIA
            </span>
            <span className={`text-[7px] sm:text-[8px] lg:text-[9px] tracking-[0.4em] uppercase transition-colors duration-300 ${
              !isScrolled && isHome ? 'text-aurelia-gold' : 'text-aurelia-gold'
            }`}>
              GRAND · DUBAI
            </span>
          </Link>

          {/* Desktop Inline Navigation (1024px+) */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-sans transition-colors duration-300 relative py-1 group ${
                    !isScrolled && isHome
                      ? isActive
                        ? 'text-white font-semibold'
                        : 'text-white/80 hover:text-white'
                      : isActive
                      ? 'text-aurelia-gold font-semibold'
                      : 'text-aurelia-text/80 hover:text-aurelia-text'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    !isScrolled && isHome ? 'bg-white' : 'bg-aurelia-gold'
                  } ${isActive ? 'scale-x-100' : ''}`} />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons (1024px+) */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <Link
              href="/concierge"
              className={`flex items-center space-x-2 text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 font-semibold ${
                !isScrolled && isHome
                  ? 'border-white/30 text-white hover:bg-white hover:text-aurelia-charcoal'
                  : 'border-aurelia-gold/30 text-aurelia-gold hover:bg-aurelia-gold hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-aurelia-gold" />
              <span>Aurelia AI</span>
            </Link>

            <Link
              href="/book"
              className={`text-xs uppercase tracking-widest px-5 py-2.5 transition-all duration-300 font-semibold shadow-sm ${
                !isScrolled && isHome
                  ? 'bg-white text-aurelia-charcoal hover:bg-aurelia-gold hover:text-white'
                  : 'bg-aurelia-charcoal text-white hover:bg-aurelia-gold'
              }`}
            >
              Book Your Stay
            </Link>
          </div>

          {/* Mobile & Tablet Action Bar (Below 1024px) */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Link
              href="/book"
              className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded transition-all font-semibold ${
                !isScrolled && isHome
                  ? 'bg-aurelia-gold text-white hover:bg-white hover:text-aurelia-charcoal'
                  : 'bg-aurelia-charcoal text-white hover:bg-aurelia-gold'
              }`}
            >
              Book
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-colors focus:outline-none ${
                !isScrolled && isHome 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-aurelia-text hover:bg-aurelia-sand'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-aurelia-gold" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile & Tablet Full-Screen Slide-over Drawer Overlay ── */}
      <div
        className={`fixed inset-0 z-50 bg-aurelia-charcoal/95 backdrop-blur-xl text-white transition-all duration-500 ease-in-out flex flex-col justify-between p-6 sm:p-10 ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex flex-col"
          >
            <span className="font-serif text-xl tracking-[0.2em] uppercase text-white">AURELIA</span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-aurelia-gold">GRAND · DUBAI</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-aurelia-gold hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links List */}
        <nav className="flex-1 overflow-y-auto py-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center justify-between py-3.5 px-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-aurelia-gold/20 text-aurelia-gold font-semibold border-l-2 border-aurelia-gold'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="font-serif text-lg sm:text-xl tracking-widest uppercase">{link.name}</span>
                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-aurelia-gold' : 'text-white/40'}`} />
              </Link>
            );
          })}
        </nav>

        {/* Drawer Bottom Actions & Hotel Contact Details */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/concierge"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 uppercase tracking-widest text-[10px] sm:text-xs font-semibold rounded transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-aurelia-gold" />
              <span>Aurelia AI</span>
            </Link>

            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 py-3 bg-aurelia-gold hover:bg-white hover:text-aurelia-charcoal text-white uppercase tracking-widest text-[10px] sm:text-xs font-semibold rounded transition-colors shadow-md"
            >
              <span>Book Stay</span>
            </Link>
          </div>

          <div className="flex items-center justify-between text-[10px] text-white/50 pt-2 px-1">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-aurelia-gold" />
              <span>Dubai Marina, UAE</span>
            </span>
            <span className="flex items-center space-x-1">
              <Phone className="w-3 h-3 text-aurelia-gold" />
              <span>+971 4 123 4567</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
