'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BellRing, ChevronRight } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show header in admin dashboard
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Check if current page is homepage (to dictate initial transparent styling)
  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-aurelia-bg/95 backdrop-blur-md border-b border-aurelia-sandDark/30 py-4 shadow-sm'
            : isHome
            ? 'bg-transparent py-6'
            : 'bg-aurelia-bg/90 border-b border-aurelia-sandDark/20 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col text-left group">
            <span className={`font-serif text-xl md:text-2xl tracking-[0.2em] uppercase transition-colors duration-300 ${
              !isScrolled && isHome ? 'text-white' : 'text-aurelia-text'
            }`}>
              AURELIA
            </span>
            <span className={`text-[8px] md:text-[9px] tracking-[0.4em] uppercase transition-colors duration-300 ${
              !isScrolled && isHome ? 'text-white/80' : 'text-aurelia-gold'
            }`}>
              GRAND · DUBAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm uppercase tracking-widest font-sans transition-colors duration-300 relative py-1 group ${
                    !isScrolled && isHome
                      ? isActive
                        ? 'text-white border-b border-white'
                        : 'text-white/80 hover:text-white'
                      : isActive
                      ? 'text-aurelia-gold font-medium'
                      : 'text-aurelia-text/80 hover:text-aurelia-text'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    !isScrolled && isHome ? 'bg-white' : 'bg-aurelia-gold'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/concierge"
              className={`flex items-center space-x-2 text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
                !isScrolled && isHome
                  ? 'border-white/30 text-white hover:bg-white hover:text-aurelia-charcoal'
                  : 'border-aurelia-gold/30 text-aurelia-gold hover:bg-aurelia-gold hover:text-white'
              }`}
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 14.22V11C19 7.13 15.87 4 12 4C8.13 4 5 7.13 5 11v3.22c0 .41-.16.82-.47 1.13l-1.06 1.06c-.82.82-.24 2.22.92 2.22h15.22c1.16 0 1.74-1.4.92-2.22l-1.06-1.06c-.31-.31-.47-.72-.47-1.13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21v1c0 1.66 1.34 3 3 3s3-1.34 3-3v-1M12 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Aurelia AI</span>
            </Link>

            <Link
              href="/book"
              className={`text-xs uppercase tracking-widest px-6 py-2.5 transition-all duration-300 ${
                !isScrolled && isHome
                  ? 'bg-white text-aurelia-charcoal hover:bg-aurelia-gold hover:text-white'
                  : 'bg-aurelia-charcoal text-white hover:bg-aurelia-gold'
              }`}
            >
              Book Your Stay
            </Link>
          </div>

          {/* Mobile Actions Menu */}
          <div className="flex items-center space-x-4 lg:hidden">
            <Link
              href="/concierge"
              className={`p-1.5 transition-colors ${
                !isScrolled && isHome ? 'text-white hover:text-white/80' : 'text-aurelia-text'
              }`}
              aria-label="AI Concierge"
            >
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 14.22V11C19 7.13 15.87 4 12 4C8.13 4 5 7.13 5 11v3.22c0 .41-.16.82-.47 1.13l-1.06 1.06c-.82.82-.24 2.22.92 2.22h15.22c1.16 0 1.74-1.4.92-2.22l-1.06-1.06c-.31-.31-.47-.72-.47-1.13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21v1c0 1.66 1.34 3 3 3s3-1.34 3-3v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 transition-colors focus:outline-none ${
                !isScrolled && isHome ? 'text-white' : 'text-aurelia-text'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-35 bg-aurelia-bg transition-all duration-500 ease-in-out flex flex-col pt-24 px-8 pb-10 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-8 invisible pointer-events-none'
        }`}
      >
        <div className="flex-1 flex flex-col justify-center space-y-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`text-xl font-serif tracking-widest uppercase transition-colors py-2 flex items-center justify-between border-b border-aurelia-sandDark/20 ${
                  isActive ? 'text-aurelia-gold' : 'text-aurelia-text hover:text-aurelia-gold'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-aurelia-gold" />
              </Link>
            );
          })}
        </div>

        <div className="space-y-4 pt-8 border-t border-aurelia-sandDark/40">
          <Link
            href="/concierge"
            onClick={handleLinkClick}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-aurelia-sand text-aurelia-gold border border-aurelia-gold/20 uppercase tracking-widest text-xs font-semibold"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 14.22V11C19 7.13 15.87 4 12 4C8.13 4 5 7.13 5 11v3.22c0 .41-.16.82-.47 1.13l-1.06 1.06c-.82.82-.24 2.22.92 2.22h15.22c1.16 0 1.74-1.4.92-2.22l-1.06-1.06c-.31-.31-.47-.72-.47-1.13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21v1c0 1.66 1.34 3 3 3s3-1.34 3-3v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Ask AI Concierge</span>
          </Link>
          <Link
            href="/book"
            onClick={handleLinkClick}
            className="w-full block text-center py-3 bg-aurelia-charcoal text-white uppercase tracking-widest text-xs font-semibold hover:bg-aurelia-gold transition-colors"
          >
            Book Your Stay
          </Link>
        </div>
      </div>
    </>
  );
}
