export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      console.error('STRIPE_PRICE_ID environment variable is not set');
      return NextResponse.json(
        { message: 'Payment is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const stripe = createStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
      metadata: { email },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { message: 'Could not start checkout. Please try again.' },
      { status: 500 }
    );
  }
}
