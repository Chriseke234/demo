import { NextResponse } from 'next/server';
import { getLeads, updateLeadStatus } from '@/lib/db';

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load leads.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const updated = await updateLeadStatus(id, status);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead.' }, { status: 500 });
  }
}
