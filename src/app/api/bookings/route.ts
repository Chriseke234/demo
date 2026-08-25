import { NextResponse } from 'next/server';
import { createBooking, logAnalyticsEvent, getOrCreateConversation } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { guest_name, email, phone, room_id, check_in, check_out, guests, price_paid } = await request.json();

    if (!guest_name || !email || !phone || !room_id || !check_in || !check_out) {
      return NextResponse.json({ error: 'Missing required booking fields.' }, { status: 400 });
    }

    const booking = await createBooking({
      guest_name,
      email,
      phone,
      room_id,
      check_in,
      check_out,
      guests: Number(guests) || 2,
      price_paid: Number(price_paid) || 0
    });

    // Log analytics
    const sessionId = 'booking-' + Date.now();
    await logAnalyticsEvent('booking_completed', sessionId, {
      room_id,
      nights: Math.ceil((new Date(check_out).getTime() - new Date(check_in).getTime()) / (1000 * 60 * 60 * 24))
    });

    return NextResponse.json({ 
      success: true, 
      bookingId: booking.id || 'AG-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    });
  } catch (error: any) {
    console.error('Bookings Route Error:', error);
    return NextResponse.json({ error: 'Failed to create booking.' }, { status: 500 });
  }
}
