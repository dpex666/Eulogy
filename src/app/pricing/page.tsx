'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Footer from '@/components/landing/Footer';
import Navbar from '@/components/landing/Navbar';
import { Check } from 'lucide-react';

const freeFeatures = [
  'One full eulogy generation',
  'Choose your tone (warm, formal, religious, secular)',
  'Choose your length (short, medium, long)',
  'Copy to clipboard',
  'Ready in under 3 minutes',
];

const proFeatures = [
  'Everything in the free plan',
  'Unlimited eulogy generations',
  'Edit the eulogy directly in the app',
  'Generate 2 alternative tone versions',
  'Lifetime access, pay once',
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  async function handleCheckout() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');
    setLoading(true);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (json.url) {
        window.location.href = json.url;
      } else {
        setEmailError('Could not start checkout. Please try again.');
        setLoading(false);
      }
    } catch {
      setEmailError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F3F7FA] pt-24 pb-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#180026] mb-4">
              Simple, honest pricing
            </h1>
            <p className="text-lg text-[#807388] max-w-xl mx-auto">
              Start for free. Pay once if you want more. No subscriptions, ever.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl bg-white border border-[#D4E9CA] p-8 flex flex-col gap-6">
              <div>
                <Badge label="Free" variant="free" />
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#180026]">$0</span>
                </div>
                <p className="text-[#807388] mt-2 text-sm">
                  No sign-up required. Get started straight away.
                </p>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#00C48C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#180026]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/generate">
                <Button variant="ghost" size="md" className="w-full">
                  Start for free
                </Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl bg-[#1D4641] p-8 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#85F199]/20 translate-x-8 -translate-y-8" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <Badge label="Pro" variant="pro" className="bg-[#85F199] text-[#1D4641]" />
                  <span className="text-xs text-[#D4E9CA]">One-time payment</span>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$29.99</span>
                  <span className="ml-2 text-sm text-[#D4E9CA]">AUD, once off</span>
                </div>
                <p className="text-[#D4E9CA] mt-2 text-sm">
                  Lifetime access. Pay once and it is yours.
                </p>
              </div>
              <ul className="flex flex-col gap-3 flex-1 relative">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#85F199] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Email + checkout */}
              <div className="flex flex-col gap-3 relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#85F199]"
                />
                {emailError && (
                  <p className="text-xs text-[#FF4E68]">{emailError}</p>
                )}
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full"
                  loading={loading}
                  onClick={handleCheckout}
                >
                  Get lifetime access
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-[#807388]">
              Secure payment via Stripe. All prices in AUD. Questions? Email us at{' '}
              <a href="mailto:hello@gaiaapp.net" className="text-[#1D4641] hover:underline">
                hello@gaiaapp.net
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
