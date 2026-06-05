export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { generateAlternatives } from '@/lib/ai';
import { isPaidUser } from '@/lib/rateLimit';
import { EulogyFormData } from '@/types/eulogy';

export async function POST(req: NextRequest) {
  try {
    const body: { formData: EulogyFormData; originalEulogy: string; email: string } =
      await req.json();

    const { formData, originalEulogy, email } = body;

    if (!email || !originalEulogy || !formData) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Verify paid status
    const paid = await isPaidUser(email.toLowerCase());
    if (!paid) {
      return NextResponse.json(
        { message: 'This feature requires a Pro account.' },
        { status: 403 }
      );
    }

    const variations = await generateAlternatives(formData, originalEulogy);
    return NextResponse.json({ variations });
  } catch (err) {
    console.error('Alternatives error:', err);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
