'use client';

import React, { useEffect, useState } from 'react';
import { MessageSquare, Users, Calendar, TrendingUp, ArrowUpRight, Zap } from 'lucide-react';

interface Summary {
  totalConversations: number;
  uniqueVisitors: number;
  conciergeOpens: number;
  leadsCount: number;
  qualifiedLeads: number;
  whatsappClicks: number;
  bookingsCount: number;
  humanHandoffs: number;
  conversionRate: number;
  roomInterests: { name: string; count: number }[];
  conversationTrend: { date: string; count: number }[];
  recentLeads: any[];
}

function StatCard({ title, value, sub, icon: Icon, accent = false }: { title: string; value: string | number; sub?: string; icon: any; accent?: boolean }) {
  return (
    <div className={`rounded-lg p-6 border ${accent ? 'bg-aurelia-charcoal text-white border-aurelia-charcoal' : 'bg-white border-stone-200'}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={`text-[10px] uppercase tracking-widest font-semibold ${accent ? 'text-aurelia-gold' : 'text-stone-500'}`}>{title}</p>
          <p className={`text-3xl font-serif ${accent ? 'text-white' : 'text-stone-800'}`}>{value}</p>
          {sub && <p className={`text-[11px] ${accent ? 'text-white/60' : 'text-stone-400'}`}>{sub}</p>}
        </div>
        <div className={`p-2 rounded ${accent ? 'bg-white/10' : 'bg-stone-100'}`}>
          <Icon className={`w-5 h-5 ${accent ? 'text-aurelia-gold' : 'text-stone-500'}`} />
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/summary')
      .then(r => r.json())
      .then(d => { setSummary(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-aurelia-gold text-sm animate-pulse">Loading dashboard...</div>
    </div>
  );

  const s = summary;

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <div>
        <h1 className="font-serif text-2xl text-stone-800">Dashboard Overview</h1>
        <p className="text-xs text-stone-500 mt-1">Real-time guest intelligence for Aurelia Grand</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="AI Conversations" value={s?.totalConversations ?? 0} sub="Total sessions" icon={MessageSquare} accent />
        <StatCard title="Leads Captured" value={s?.leadsCount ?? 0} sub={`${s?.qualifiedLeads ?? 0} qualified`} icon={Users} />
        <StatCard title="WhatsApp Clicks" value={s?.whatsappClicks ?? 0} sub="Handoff initiated" icon={Zap} />
        <StatCard title="Demo Bookings" value={s?.bookingsCount ?? 0} sub="Booking flow" icon={Calendar} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Conversation Trend */}
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <h3 className="font-serif text-base text-stone-800 mb-4">Conversations — Last 7 Days</h3>
          <div className="flex items-end space-x-2 h-32">
            {(s?.conversationTrend || []).map((d) => {
              const max = Math.max(...(s?.conversationTrend || []).map(x => x.count), 1);
              const height = Math.max((d.count / max) * 100, 4);
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center space-y-1">
                  <div className="w-full bg-aurelia-gold/20 relative" style={{ height: '100px' }}>
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-aurelia-gold transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-[8px] text-stone-400 rotate-45 origin-left">{d.date.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Room Interest */}
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <h3 className="font-serif text-base text-stone-800 mb-4">Suite Interest</h3>
          {(s?.roomInterests || []).length > 0 ? (
            <div className="space-y-3">
              {s?.roomInterests.map((r) => {
                const max = Math.max(...(s.roomInterests || []).map(x => x.count), 1);
                return (
                  <div key={r.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-700">{r.name}</span>
                      <span className="text-aurelia-gold font-semibold">{r.count}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5">
                      <div className="bg-aurelia-gold h-1.5 transition-all" style={{ width: `${(r.count / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-24 text-xs text-stone-400">
              Room interests will appear here as guests explore suites.
            </div>
          )}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg border border-stone-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-base text-stone-800">Recent Leads</h3>
          <a href="/admin/leads" className="text-xs text-aurelia-gold hover:underline flex items-center space-x-1">
            <span>View all</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        {(s?.recentLeads || []).length > 0 ? (
          <div className="space-y-3">
            {s?.recentLeads.map((lead: any) => (
              <div key={lead.id} className="flex items-center justify-between p-3 bg-stone-50 rounded text-xs">
                <div>
                  <span className="font-semibold text-stone-800">{lead.name}</span>
                  <span className="text-stone-400 ml-2">{lead.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  {lead.interest && <span className="text-aurelia-gold">{lead.interest}</span>}
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    lead.status === 'contacted' ? 'bg-amber-100 text-amber-700' :
                    lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                    'bg-stone-100 text-stone-600'
                  }`}>{lead.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-400 text-center py-8">
            Once guests show booking intent, leads will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
