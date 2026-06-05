export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createStripe } from '@/lib/stripe';
import { createSupabaseServer } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ message: 'Missing stripe signature.' }, { status: 400 });
  }

  const stripe = createStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature error:', err);
    return NextResponse.json({ message: 'Invalid signature.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const email =
      session.metadata?.email ||
      session.customer_email ||
      session.customer_details?.email;

    if (!email) {
      console.error('Stripe webhook: no email on session', session.id);
      return NextResponse.json({ message: 'No email found on session.' }, { status: 400 });
    }

    const db = createSupabaseServer();
    await db.from('paid_users').upsert(
      {
        email: email.toLowerCase(),
        stripe_customer_id: session.customer as string,
        stripe_session_id: session.id,
        active: true,
      },
      { onConflict: 'email' }
    );
  }

  return NextResponse.json({ received: true });
}
