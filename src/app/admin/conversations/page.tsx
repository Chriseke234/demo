'use client';

import React, { useEffect, useState } from 'react';
import { MessageSquare, ChevronRight, User, Clock } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  interested: 'bg-purple-100 text-purple-700',
  booking_intent: 'bg-amber-100 text-amber-700',
  contacted: 'bg-orange-100 text-orange-700',
  converted: 'bg-green-100 text-green-700',
  closed: 'bg-stone-100 text-stone-500',
};

const STATUS_OPTIONS = ['new', 'interested', 'booking_intent', 'contacted', 'converted', 'closed'];

export default function AdminConversationsPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/conversations')
      .then(r => r.json())
      .then(data => { setConversations(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const loadMessages = async (conv: any) => {
    setSelected(conv);
    const res = await fetch(`/api/admin/conversations/${conv.id}`);
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
  };

  const handleStatusChange = async (sessionId: string, status: string) => {
    await fetch('/api/admin/conversations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, status })
    });
    setConversations(prev => prev.map(c => c.session_id === sessionId ? { ...c, status } : c));
    if (selected?.session_id === sessionId) setSelected((prev: any) => ({ ...prev, status }));
  };

  const getWhatsAppMessage = (conv: any) => {
    const ctx = conv.context || {};
    const nameStr = conv.guest_name ? `Hi, I'm following up with ${conv.guest_name}. ` : '';
    const roomStr = ctx.roomInterest ? `They were interested in the ${ctx.roomInterest}. ` : '';
    const datesStr = ctx.checkIn ? `Dates: ${ctx.checkIn} to ${ctx.checkOut || '...'}. ` : '';
    return `${nameStr}${roomStr}${datesStr}Reaching out from Aurelia Grand team.`;
  };

  return (
    <div className="flex h-full bg-[#F8F6F2]">
      
      {/* Conversation List */}
      <div className="w-80 bg-white border-r border-stone-200 flex flex-col overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-stone-200">
          <h2 className="font-serif text-lg text-stone-800">Conversations</h2>
          <p className="text-[11px] text-stone-400 mt-0.5">{conversations.length} total sessions</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-xs text-stone-400 animate-pulse">Loading...</div>
          ) : conversations.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <MessageSquare className="w-8 h-8 text-stone-200 mx-auto" />
              <p className="text-xs text-stone-400">Your conversations will appear here.</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => loadMessages(conv)}
                className={`w-full text-left p-4 border-b border-stone-100 hover:bg-stone-50 transition-colors ${selected?.id === conv.id ? 'bg-stone-100' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-stone-800 truncate">{conv.guest_name || 'Anonymous Guest'}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5 truncate">{conv.guest_email || conv.session_id}</p>
                    {conv.context?.roomInterest && (
                      <p className="text-[10px] text-aurelia-gold mt-1 truncate">→ {conv.context.roomInterest}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${STATUS_COLORS[conv.status] || STATUS_COLORS.new}`}>
                      {conv.status?.replace('_', ' ')}
                    </span>
                    <span className="text-[9px] text-stone-300">{new Date(conv.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Conversation Detail */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center flex-col space-y-3 text-stone-300">
            <MessageSquare className="w-12 h-12" />
            <p className="text-sm">Select a conversation to view details</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-white border-b border-stone-200 p-5 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base text-stone-800">{selected.guest_name || 'Anonymous Guest'}</h3>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-stone-400">
                  {selected.guest_email && <span>{selected.guest_email}</span>}
                  {selected.guest_phone && <span>· {selected.guest_phone}</span>}
                  {selected.context?.checkIn && <span>· {selected.context.checkIn} → {selected.context.checkOut}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selected.status}
                  onChange={(e) => handleStatusChange(selected.session_id, e.target.value)}
                  className="text-[10px] uppercase tracking-wider border border-stone-200 px-3 py-1.5 rounded focus:outline-none focus:border-aurelia-gold bg-white"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                  ))}
                </select>
                {selected.guest_phone && (
                  <WhatsAppButton
                    message={getWhatsAppMessage(selected)}
                    text="Contact via WhatsApp"
                    variant="outline"
                    className="text-[10px] py-1.5 px-3"
                  />
                )}
              </div>
            </div>

            {/* Context Card */}
            {selected.context && Object.keys(selected.context).length > 0 && (
              <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex flex-wrap gap-4 text-[11px]">
                {Object.entries(selected.context).filter(([k, v]) => v).map(([k, v]) => (
                  <span key={k}><span className="text-stone-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}: </span><span className="font-semibold text-stone-700">{String(v)}</span></span>
                ))}
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-xs text-stone-300 mt-8">No messages in this conversation yet.</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-3 text-xs leading-relaxed rounded ${
                      msg.role === 'user'
                        ? 'bg-stone-800 text-white rounded-l-lg rounded-tr-lg'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-r-lg rounded-tl-lg'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] uppercase tracking-wider font-semibold ${msg.role === 'user' ? 'text-stone-300' : 'text-aurelia-gold'}`}>
                          {msg.role === 'user' ? 'Guest' : 'Aurelia AI'}
                        </span>
                        <span className="text-[9px] opacity-50">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
