import { NextResponse } from 'next/server';
import { createLead, getOrCreateConversation, updateConversationStatus, logAnalyticsEvent } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { 
      sessionId, 
      name, 
      email, 
      phone, 
      interest, 
      checkIn, 
      checkOut, 
      guests, 
      source = 'concierge' 
    } = await request.json();

    if (!sessionId || !name || !email) {
      return NextResponse.json(
        { error: 'sessionId, name, and email are required.' },
        { status: 400 }
      );
    }

    // 1. Get the current conversation to reference it
    const conv = await getOrCreateConversation(sessionId);

    // 2. Create the Lead
    const lead = await createLead({
      conversation_id: conv.id,
      name,
      email,
      phone,
      interest,
      check_in: checkIn,
      check_out: checkOut,
      guests: guests ? Number(guests) : undefined,
      source
    });

    // 3. Mark the conversation status as converted/interested
    await updateConversationStatus(sessionId, 'converted');

    // 4. Log the lead event for analytics
    await logAnalyticsEvent('lead_created', sessionId, {
      interest,
      source,
      has_dates: !!(checkIn && checkOut)
    });

    return NextResponse.json({ success: true, leadId: lead.id });

  } catch (error: any) {
    console.error('Leads Route Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while saving the lead details.' },
      { status: 500 }
    );
  }
}
export async function GET() {
  // Simple read-check for admin fallback
  return NextResponse.json({ message: 'Use admin endpoints to read leads securely.' });
}
