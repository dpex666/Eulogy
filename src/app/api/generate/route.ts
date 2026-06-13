export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { generateEulogy, isEulogyRefusal } from '@/lib/ai';
import { checkCanGenerate } from '@/lib/rateLimit';
import { createSupabaseServer } from '@/lib/supabase';
import { EulogyFormData } from '@/types/eulogy';

const SHORT_FIELD_MAX = 200;
const LONG_FIELD_MAX = 3000;

function validateLengths(body: EulogyFormData): string | null {
  const short = ['deceasedName', 'occupation', 'hometown', 'relationship'] as const;
  const long = ['memories', 'personalityTraits', 'achievements', 'familyInfo'] as const;

  for (const field of short) {
    if (body[field] && body[field].length > SHORT_FIELD_MAX) {
      return `"${field}" must be ${SHORT_FIELD_MAX} characters or fewer.`;
    }
  }
  for (const field of long) {
    if (body[field] && body[field].length > LONG_FIELD_MAX) {
      return `"${field}" must be ${LONG_FIELD_MAX} characters or fewer.`;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body: EulogyFormData & { embedded?: boolean } = await req.json();
    const { email, deceasedName } = body;
    // Distinguishes leads arriving via the Gaia website iframe from direct visits.
    const channel = body.embedded ? '-embedded' : '';

    if (!email || !deceasedName) {
      return NextResponse.json(
        { message: 'Email and name are required.' },
        { status: 400 }
      );
    }

    const lengthError = validateLengths(body);
    if (lengthError) {
      return NextResponse.json({ message: lengthError }, { status: 400 });
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

    const canGenerate = await checkCanGenerate(email.toLowerCase(), ip);
    const db = createSupabaseServer();

    if (!canGenerate) {
      await db
        .from('leads')
        .upsert(
          { email: email.toLowerCase(), source: `eulogy-generator-blocked${channel}` },
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
        { email: email.toLowerCase(), source: `eulogy-generator${channel}` },
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

    const { data: eulogyRow, error: eulogyInsertError } = await db
      .from('eulogies')
      .insert({
        email: email.toLowerCase(),
        deceased_name: deceasedName,
        eulogy_text: eulogy,
        form_data: body,
      })
      .select('id')
      .single();

    if (eulogyInsertError) {
      console.error('Eulogies insert error:', eulogyInsertError.message);
      return NextResponse.json({ eulogy, blocked: false, eulogySaved: false });
    }

    return NextResponse.json({
      eulogy,
      eulogyId: eulogyRow.id,
      blocked: false,
      eulogySaved: true,
    });
  } catch (err) {
    console.error('Generate error:', err);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
