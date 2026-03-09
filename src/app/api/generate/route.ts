export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { generateEulogy, isEulogyRefusal } from '@/lib/claude';
import { checkCanGenerate } from '@/lib/rateLimit';
import { createSupabaseServer } from '@/lib/supabase';
import { EulogyFormData } from '@/types/eulogy';

export async function POST(req: NextRequest) {
  try {
    const body: EulogyFormData = await req.json();
    const { email, deceasedName } = body;

    if (!email || !deceasedName) {
      return NextResponse.json(
        { message: 'Email and name are required.' },
        { status: 400 }
      );
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

    const canGenerate = await checkCanGenerate(email.toLowerCase(), ip);
    const db = createSupabaseServer();

    if (!canGenerate) {
      await db
        .from('leads')
        .upsert(
          { email: email.toLowerCase(), source: 'eulogy-generator-blocked' },
          { onConflict: 'email' }
        );

      return NextResponse.json(
        {
          blocked: true,
          message:
            'You have already used your free eulogy. Upgrade to Pro for unlimited access.',
        },
        { status: 200 }
      );
    }

    await db
      .from('leads')
      .upsert(
        { email: email.toLowerCase(), source: 'eulogy-generator' },
        { onConflict: 'email' }
      );

    const eulogy = await generateEulogy(body);

    if (isEulogyRefusal(eulogy)) {
      return NextResponse.json(
        {
          needsMoreInfo: true,
          message:
            'Your answers did not have enough detail to write a personal eulogy. Go back and add more specific memories — a real story or moment makes all the difference.',
        },
        { status: 200 }
      );
    }

    await db.from('generations').insert({
      email: email.toLowerCase(),
      ip_address: ip,
    });

    const { error: eulogyInsertError } = await db.from('eulogies').insert({
      email: email.toLowerCase(),
      deceased_name: deceasedName,
      eulogy_text: eulogy,
      form_data: body,
    });
    if (eulogyInsertError) {
      console.error('Eulogies insert error (table may not exist):', eulogyInsertError.message);
    }

    return NextResponse.json({ eulogy, blocked: false });
  } catch (err) {
    console.error('Generate error:', err);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
