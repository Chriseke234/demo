'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Calendar,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hotel,
  LogOut
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/conversations', label: 'Conversations', icon: MessageSquare },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#F8F6F2] overflow-hidden">
      {/* Sidebar */}
      <aside className={`flex flex-col bg-aurelia-charcoal text-white transition-all duration-300 flex-shrink-0 ${collapsed ? 'w-16' : 'w-60'}`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          {!collapsed && (
            <div>
              <span className="font-serif text-base tracking-[0.15em] uppercase">AURELIA</span>
              <span className="block text-[8px] tracking-[0.3em] uppercase text-aurelia-gold">GRAND · ADMIN</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded hover:bg-white/10 transition-colors text-white/60 hover:text-white ml-auto"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded transition-all text-sm ${
                  isActive
                    ? 'bg-aurelia-gold text-white font-medium'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                {!collapsed && <span className="text-xs tracking-wide">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all text-xs"
          >
            <Hotel className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>View Hotel Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
