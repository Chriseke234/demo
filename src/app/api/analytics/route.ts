import { NextResponse } from 'next/server';
import { logAnalyticsEvent } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { eventName, sessionId, metadata = {} } = await request.json();

    if (!eventName || !sessionId) {
      return NextResponse.json(
        { error: 'eventName and sessionId are required.' },
        { status: 400 }
      );
    }

    await logAnalyticsEvent(eventName, sessionId, metadata);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Analytics Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to log event' },
      { status: 500 }
    );
  }
}
