export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase';
import { createSupabaseServerAuth } from '@/lib/supabaseAuthServer';

export async function GET() {
  const supabaseAuth = await createSupabaseServerAuth();
  const {
    data: { session },
  } = await supabaseAuth.auth.getSession();

  if (!session) {
    return NextResponse.json({ eulogies: [], requiresAuth: true });
  }

  const db = createSupabaseServer();
  const { data, error } = await db
    .from('eulogies')
    .select('id, deceased_name, eulogy_text, created_at')
    .eq('email', session.user.email!.toLowerCase())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch eulogies error:', error);
    return NextResponse.json({ eulogies: [] });
  }

  return NextResponse.json({ eulogies: data || [] });
}

export async function PUT(req: NextRequest) {
  const supabaseAuth = await createSupabaseServerAuth();
  const {
    data: { session },
  } = await supabaseAuth.auth.getSession();

  if (!session) {
    return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
  }

  const { id, eulogy_text } = await req.json();

  if (!id || !eulogy_text) {
    return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
  }

  if (eulogy_text.length > 10000) {
    return NextResponse.json({ message: 'Eulogy text too long.' }, { status: 400 });
  }

  const db = createSupabaseServer();

  const { data: existing } = await db
    .from('eulogies')
    .select('id')
    .eq('id', id)
    .eq('email', session.user.email!.toLowerCase())
    .single();

  if (!existing) {
    return NextResponse.json({ message: 'Eulogy not found.' }, { status: 404 });
  }

  const { error } = await db.from('eulogies').update({ eulogy_text }).eq('id', id);

  if (error) {
    console.error('Update eulogy error:', error);
    return NextResponse.json({ message: 'Failed to save changes.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
