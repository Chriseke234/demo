import { NextResponse } from 'next/server';
import { getBookings } from '@/lib/db';

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load bookings.' }, { status: 500 });
  }
}
