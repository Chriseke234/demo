import { NextResponse } from 'next/server';
import { getConversations, getMessages, updateConversationStatus } from '@/lib/db';

export async function GET() {
  try {
    const conversations = await getConversations();
    return NextResponse.json(conversations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load conversations.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { sessionId, status } = await request.json();
    const updated = await updateConversationStatus(sessionId, status);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status.' }, { status: 500 });
  }
}
