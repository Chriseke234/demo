'use client';

import React, { useEffect, useState } from 'react';
import { Users, Calendar, Phone, Mail, ExternalLink } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  converted: 'bg-green-100 text-green-700',
  lost: 'bg-stone-100 text-stone-500',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/leads')
      .then(r => r.json())
      .then(data => { setLeads(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <div className="p-8 max-w-6xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-stone-800">Leads</h1>
        <p className="text-xs text-stone-500 mt-1">{leads.length} leads captured via AI concierge and booking forms</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-sm text-stone-400 animate-pulse">Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-16 text-center space-y-3">
          <Users className="w-10 h-10 text-stone-200 mx-auto" />
          <p className="text-sm text-stone-400">Once guests show booking intent, they'll appear here.</p>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Guest</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Interest</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Dates</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Source</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Status</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-stone-800">{lead.name}</p>
                    <p className="text-stone-400">{lead.email}</p>
                    {lead.phone && <p className="text-stone-400">{lead.phone}</p>}
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-aurelia-gold font-medium">{lead.interest || '—'}</span>
                    {lead.guests && <span className="block text-stone-400">{lead.guests} guests</span>}
                  </td>
                  <td className="px-5 py-3 text-stone-600">
                    {lead.check_in ? (
                      <span>{lead.check_in} → {lead.check_out || '?'}</span>
                    ) : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span className="bg-stone-100 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-stone-600">{lead.source}</span>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`text-[9px] uppercase tracking-wider px-2 py-1 rounded border-0 font-semibold focus:outline-none cursor-pointer ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    {lead.phone && (
                      <WhatsAppButton
                        message={`Hi ${lead.name}, I'm following up from Aurelia Grand regarding your interest in ${lead.interest || 'a suite'}. How can I help?`}
                        text="WhatsApp"
                        variant="outline"
                        className="text-[10px] py-1 px-3"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
