import { NextResponse } from 'next/server';
import { getMessages } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const messages = await getMessages(params.id);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load messages.' }, { status: 500 });
  }
}
