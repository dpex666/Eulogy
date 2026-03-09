export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ eulogies: [] });
  }

  const db = createSupabaseServer();
  const { data, error } = await db
    .from('eulogies')
    .select('id, deceased_name, eulogy_text, created_at')
    .eq('email', email.toLowerCase())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch eulogies error:', error);
    return NextResponse.json({ eulogies: [] });
  }

  return NextResponse.json({ eulogies: data || [] });
}
