import React from 'react';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConciergeLauncher from '@/components/concierge/ConciergeLauncher';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aurelia Grand | Luxury Hotel in Dubai Marina',
  description:
    'Experience ultra-premium contemporary luxury in the heart of Dubai Marina. Award-winning suites, fine dining, private yacht cruises, and bespoke wellness — guided by our intelligent digital concierge.',
  openGraph: {
    title: 'Aurelia Grand | Luxury Hotel in Dubai Marina',
    description:
      'An elevated sanctuary in Dubai Marina where thoughtful hospitality meets contemporary luxury.',
    type: 'website',
    url: 'https://aureliagrand.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Aurelia Grand — Marina Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurelia Grand | Luxury Hotel in Dubai Marina',
    description: 'An elevated sanctuary in Dubai Marina.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1A1A1A" />
      </head>
      <body
        className="flex flex-col min-h-screen bg-aurelia-bg"
        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ConciergeLauncher />
      </body>
    </html>
  );
}
