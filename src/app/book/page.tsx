'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, ArrowLeft, Calendar, User, Home } from 'lucide-react';
import { mockRooms } from '@/data/mockData';

const STEPS = ['Dates', 'Room', 'Details', 'Confirmation'];

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [guests, setGuests] = useState(searchParams.get('guests') || '2');
  const [selectedRoom, setSelectedRoom] = useState(
    mockRooms.find(r => r.slug === searchParams.get('roomSlug'))?.id || ''
  );
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const selectedRoomData = mockRooms.find(r => r.id === selectedRoom);
  
  // Calculate nights and total
  const nights = checkIn && checkOut 
    ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const total = selectedRoomData ? selectedRoomData.price * nights : 0;

  const handleSubmit = async () => {
    if (!selectedRoomData || !checkIn || !checkOut || !guestName || !email || !phone) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_name: guestName,
          email,
          phone,
          room_id: selectedRoom,
          check_in: checkIn,
          check_out: checkOut,
          guests: Number(guests),
          price_paid: total,
          special_requests: specialRequests
        })
      });
      const data = await res.json();
      if (res.ok) {
        setBookingId(data.bookingId || 'AG-' + Math.random().toString(36).substring(2, 8).toUpperCase());
        setStep(4);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-aurelia-bg min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10 space-y-2">
          <span className="text-[10px] tracking-[0.4em] uppercase text-aurelia-gold font-semibold">
            Demo Booking Experience
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-aurelia-charcoal">Reserve Your Stay</h1>
          <p className="text-xs text-aurelia-text/60 font-light italic">This is a demonstration booking flow. No real payment is processed.</p>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="flex items-center mb-12">
            {STEPS.map((label, i) => {
              const num = i + 1;
              const isComplete = step > num;
              const isCurrent = step === num;
              return (
                <React.Fragment key={label}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${
                      isComplete ? 'bg-aurelia-gold border-aurelia-gold text-white' 
                      : isCurrent ? 'border-aurelia-charcoal bg-aurelia-charcoal text-white'
                      : 'border-aurelia-sandDark bg-aurelia-sand text-aurelia-text/50'
                    }`}>
                      {isComplete ? <Check className="w-3.5 h-3.5" /> : num}
                    </div>
                    <span className={`text-[9px] uppercase tracking-widest mt-1 ${isCurrent ? 'text-aurelia-charcoal font-semibold' : 'text-aurelia-text/50'}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-[1px] mx-2 transition-all ${step > num ? 'bg-aurelia-gold' : 'bg-aurelia-sandDark'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-8">
            
            {/* Step 1: Dates */}
            {step === 1 && (
              <div className="bg-white border border-aurelia-sandDark/40 p-8 space-y-6">
                <h2 className="font-serif text-xl text-aurelia-charcoal">Select Your Dates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-2">Check-in Date</label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-2">Check-out Date</label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-2">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold text-aurelia-text"
                    >
                      {[1,2,3,4].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!checkIn || !checkOut}
                  className="w-full bg-aurelia-charcoal text-white hover:bg-aurelia-gold py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-40 flex items-center justify-center space-x-2"
                >
                  <span>Continue to Room Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Room Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <button onClick={() => setStep(1)} className="flex items-center space-x-2 text-xs text-aurelia-gold hover:text-aurelia-charcoal transition-colors mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dates</span>
                </button>
                <h2 className="font-serif text-xl text-aurelia-charcoal mb-4">Choose Your Suite</h2>
                {mockRooms.filter(r => r.capacity >= Number(guests)).map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`bg-white border p-6 cursor-pointer transition-all flex gap-5 ${
                      selectedRoom === room.id 
                        ? 'border-aurelia-gold ring-1 ring-aurelia-gold' 
                        : 'border-aurelia-sandDark/40 hover:border-aurelia-gold/40'
                    }`}
                  >
                    <div className="w-28 h-20 overflow-hidden flex-shrink-0">
                      <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <h3 className="font-serif text-lg text-aurelia-charcoal">{room.name}</h3>
                        <span className="text-aurelia-gold font-serif text-lg">${room.price}<span className="text-xs font-sans text-aurelia-text/60">/nt</span></span>
                      </div>
                      <p className="text-[11px] text-aurelia-text/70 line-clamp-2 font-light">{room.description}</p>
                      <div className="flex gap-4 text-[10px] text-aurelia-gold font-semibold uppercase tracking-wider pt-1">
                        <span>{room.view}</span>
                        <span>·</span>
                        <span>{room.size}</span>
                        <span>·</span>
                        <span>Sleeps {room.capacity}</span>
                      </div>
                    </div>
                    {selectedRoom === room.id && (
                      <div className="w-5 h-5 rounded-full bg-aurelia-gold flex items-center justify-center flex-shrink-0 self-start mt-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedRoom}
                  className="w-full bg-aurelia-charcoal text-white hover:bg-aurelia-gold py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-40 mt-4"
                >
                  Continue to Guest Details
                </button>
              </div>
            )}

            {/* Step 3: Guest Details */}
            {step === 3 && (
              <div className="bg-white border border-aurelia-sandDark/40 p-8 space-y-6">
                <button onClick={() => setStep(2)} className="flex items-center space-x-2 text-xs text-aurelia-gold hover:text-aurelia-charcoal transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Room Selection</span>
                </button>
                <h2 className="font-serif text-xl text-aurelia-charcoal">Your Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-2">Full Name *</label>
                    <input type="text" required value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-2">Email Address *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-2">Phone / WhatsApp *</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-2">Special Requests</label>
                    <input type="text" value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="Anniversary decoration, dietary needs…" className="w-full bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs focus:outline-none focus:border-aurelia-gold" />
                  </div>
                </div>

                <div className="bg-aurelia-sand border border-aurelia-sandDark/40 p-4 text-[11px] text-aurelia-text/80 italic leading-relaxed">
                  This is a demo booking experience. Your details will be stored for demonstration purposes only. No payment will be charged and no real reservation is created.
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!guestName || !email || !phone || isSubmitting}
                  className="w-full bg-aurelia-charcoal text-white hover:bg-aurelia-gold py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-40"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Demo Reservation'}
                </button>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="bg-white border border-aurelia-sandDark/40 p-10 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-aurelia-sand border-2 border-aurelia-gold flex items-center justify-center mx-auto text-aurelia-gold">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-serif text-3xl text-aurelia-charcoal">Reservation Confirmed</h2>
                  <p className="text-aurelia-gold font-serif text-lg">Booking Reference: {bookingId}</p>
                </div>
                <p className="text-sm text-aurelia-text/80 leading-relaxed max-w-md mx-auto font-light">
                  Thank you, {guestName}. Your reservation at Aurelia Grand has been received. 
                  Our team will reach out to confirm all details via {email}.
                </p>
                <div className="bg-aurelia-sand border border-aurelia-sandDark/40 p-4 text-left text-xs space-y-2 max-w-sm mx-auto">
                  <div className="flex justify-between"><span className="text-aurelia-text/60">Suite:</span><span className="font-semibold">{selectedRoomData?.name}</span></div>
                  <div className="flex justify-between"><span className="text-aurelia-text/60">Check-in:</span><span className="font-semibold">{checkIn}</span></div>
                  <div className="flex justify-between"><span className="text-aurelia-text/60">Check-out:</span><span className="font-semibold">{checkOut}</span></div>
                  <div className="flex justify-between"><span className="text-aurelia-text/60">Guests:</span><span className="font-semibold">{guests}</span></div>
                  <div className="flex justify-between border-t border-aurelia-sandDark/40 pt-2 mt-2"><span className="font-semibold">Total (Demo):</span><span className="font-semibold text-aurelia-gold">${total.toLocaleString()}</span></div>
                </div>
                <Link href="/" className="inline-block mt-4 text-xs uppercase tracking-widest text-aurelia-gold hover:underline">
                  Return to Hotel
                </Link>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          {step < 4 && (
            <div className="lg:col-span-4">
              <div className="bg-white border border-aurelia-sandDark/40 p-6 space-y-4 sticky top-28">
                <h3 className="font-serif text-lg text-aurelia-charcoal">Booking Summary</h3>
                {selectedRoomData ? (
                  <>
                    <img src={selectedRoomData.images[0]} alt={selectedRoomData.name} className="w-full h-32 object-cover" />
                    <div>
                      <p className="font-serif text-base text-aurelia-charcoal">{selectedRoomData.name}</p>
                      <p className="text-[10px] text-aurelia-gold uppercase tracking-widest font-semibold">{selectedRoomData.view}</p>
                    </div>
                  </>
                ) : (
                  <div className="h-32 bg-aurelia-sand flex items-center justify-center text-xs text-aurelia-text/50">No room selected</div>
                )}
                <div className="space-y-2 text-xs border-t border-aurelia-sandDark/40 pt-4">
                  {checkIn && <div className="flex justify-between"><span className="text-aurelia-text/60">Check-in</span><span>{checkIn}</span></div>}
                  {checkOut && <div className="flex justify-between"><span className="text-aurelia-text/60">Check-out</span><span>{checkOut}</span></div>}
                  {nights > 0 && <div className="flex justify-between"><span className="text-aurelia-text/60">Nights</span><span>{nights}</span></div>}
                  <div className="flex justify-between"><span className="text-aurelia-text/60">Guests</span><span>{guests}</span></div>
                  {total > 0 && (
                    <div className="flex justify-between border-t border-aurelia-sandDark/40 pt-2 mt-2 font-semibold">
                      <span>Total (Demo)</span>
                      <span className="text-aurelia-gold">${total.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-aurelia-bg flex items-center justify-center"><div className="text-aurelia-gold text-sm">Loading...</div></div>}>
      <BookingContent />
    </Suspense>
  );
}
