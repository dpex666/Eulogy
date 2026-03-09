export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, source = 'landing-page' } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const db = createSupabaseServer();
    await db
      .from('leads')
      .upsert(
        { email: email.toLowerCase(), source },
        { onConflict: 'email' }
      );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Leads error:', err);
    return NextResponse.json(
      { message: 'Could not save your email. Please try again.' },
      { status: 500 }
    );
  }
}
