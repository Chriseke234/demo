'use client';

import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, MessageSquare, Users, Zap, ArrowUpRight } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/summary')
      .then(r => r.json())
      .then(d => { setSummary(d); setLoading(false); });
  }, []);

  if (loading) return <div className="p-8 text-center text-sm text-stone-400 animate-pulse">Loading analytics...</div>;

  const s = summary || {};

  const kpis = [
    { label: 'Total Sessions', value: s.uniqueVisitors || 0, icon: Users, note: 'Unique visitors' },
    { label: 'Concierge Opens', value: s.conciergeOpens || 0, icon: MessageSquare, note: 'AI interactions started' },
    { label: 'WhatsApp Clicks', value: s.whatsappClicks || 0, icon: Zap, note: 'Handoff to WhatsApp' },
    { label: 'Conversion Rate', value: `${s.conversionRate || 0}%`, icon: TrendingUp, note: 'Bookings / Sessions' },
    { label: 'Human Handoffs', value: s.humanHandoffs || 0, icon: Users, note: 'Escalated to staff' },
    { label: 'Leads Captured', value: s.leadsCount || 0, icon: BarChart3, note: 'With contact info' },
  ];

  return (
    <div className="p-8 max-w-6xl space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-stone-800">Analytics</h1>
        <p className="text-xs text-stone-500 mt-1">Performance metrics — architecture ready for AskMyData integration</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map(({ label, value, icon: Icon, note }) => (
          <div key={label} className="bg-white border border-stone-200 rounded-lg p-5 space-y-2">
            <div className="flex items-center justify-between">
              <Icon className="w-4.5 h-4.5 text-aurelia-gold" />
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-300" />
            </div>
            <p className="text-3xl font-serif text-stone-800">{value}</p>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-stone-500">{label}</p>
              <p className="text-[10px] text-stone-300 mt-0.5">{note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Conversation trend */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <h3 className="font-serif text-base text-stone-800 mb-6">Conversation Volume — Last 7 Days</h3>
        <div className="flex items-end gap-3 h-40">
          {(s.conversationTrend || []).map((d: any) => {
            const max = Math.max(...(s.conversationTrend || []).map((x: any) => x.count), 1);
            const height = Math.max((d.count / max) * 100, 3);
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-stone-500 font-medium">{d.count}</span>
                <div className="w-full bg-aurelia-sand relative" style={{ height: '120px' }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-aurelia-gold transition-all duration-700" style={{ height: `${height}%` }} />
                </div>
                <span className="text-[8px] text-stone-400">{d.date.slice(5)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Interest */}
      {(s.roomInterests || []).length > 0 && (
        <div className="bg-white border border-stone-200 rounded-lg p-6">
          <h3 className="font-serif text-base text-stone-800 mb-4">Suite Interest Distribution</h3>
          <div className="space-y-4">
            {s.roomInterests.map((r: any) => {
              const max = Math.max(...s.roomInterests.map((x: any) => x.count), 1);
              return (
                <div key={r.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-700 font-medium">{r.name}</span>
                    <span className="text-aurelia-gold font-semibold">{r.count} interest{r.count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full">
                    <div className="bg-aurelia-gold h-2 rounded-full transition-all duration-700" style={{ width: `${(r.count / max) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AskMyData readiness note */}
      <div className="bg-aurelia-charcoal text-white rounded-lg p-6 flex items-start gap-4">
        <BarChart3 className="w-6 h-6 text-aurelia-gold flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-serif text-base">AskMyData Integration Ready</h4>
          <p className="text-xs text-white/70 leading-relaxed">
            All structured events (concierge_opened, message_sent, room_recommended, lead_created, booking_completed, whatsapp_clicked, human_handoff) are stored with full metadata. This architecture enables natural-language business intelligence queries like <em>"What room generates the most WhatsApp leads?"</em>
          </p>
        </div>
      </div>
    </div>
  );
}
