'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Check, X } from 'lucide-react';
import { mockRooms } from '@/data/mockData';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then(r => r.json())
      .then(data => { setBookings(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const getRoomName = (roomId: string) => {
    return mockRooms.find(r => r.id === roomId)?.name || roomId;
  };

  return (
    <div className="p-8 max-w-6xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-stone-800">Bookings</h1>
        <p className="text-xs text-stone-500 mt-1">{bookings.length} demo reservations recorded</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-sm text-stone-400 animate-pulse">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-16 text-center space-y-3">
          <Calendar className="w-10 h-10 text-stone-200 mx-auto" />
          <p className="text-sm text-stone-400">No demo bookings yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Guest</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Suite</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Dates</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Guests</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Total</th>
                <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-stone-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-stone-800">{b.guest_name}</p>
                    <p className="text-stone-400">{b.email}</p>
                  </td>
                  <td className="px-5 py-4 text-aurelia-gold font-medium">{getRoomName(b.room_id)}</td>
                  <td className="px-5 py-4 text-stone-600">{b.check_in} → {b.check_out}</td>
                  <td className="px-5 py-4 text-stone-600">{b.guests}</td>
                  <td className="px-5 py-4 font-semibold text-stone-800">${Number(b.price_paid || 0).toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider ${
                      b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{b.status}</span>
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
