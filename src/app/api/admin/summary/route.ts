import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/db';

export async function GET() {
  try {
    const summary = await getAnalyticsSummary();
    return NextResponse.json(summary);
  } catch (error) {
    console.error('Admin Summary Error:', error);
    return NextResponse.json({ error: 'Failed to load analytics.' }, { status: 500 });
  }
}
