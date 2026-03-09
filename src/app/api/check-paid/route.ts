export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { isPaidUser } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ isPaid: false });

    const paid = await isPaidUser(email.toLowerCase());
    return NextResponse.json({ isPaid: paid });
  } catch {
    return NextResponse.json({ isPaid: false });
  }
}
