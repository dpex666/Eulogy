import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Check } from 'lucide-react';

const freePlan = {
  name: 'Free',
  price: '$0',
  description: 'Create one eulogy at no cost. Everything you need to get started.',
  features: [
    'One full eulogy generation',
    'Choose your tone and length',
    'Copy to clipboard',
    'Ready in under 3 minutes',
  ],
  cta: 'Start writing for free',
  href: '/generate',
};

const proPlan = {
  name: 'Pro',
  price: '$29.99',
  priceSuffix: 'AUD, once off',
  description: 'Lifetime access. Edit, refine and generate as many versions as you need.',
  features: [
    'Unlimited eulogy generations',
    'Edit the eulogy directly in the app',
    'Generate 2 alternative tone versions',
    'Access for life, pay once',
  ],
  cta: 'Get lifetime access',
  href: '/pricing',
};

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#F3F7FA] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#180026] mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-lg text-[#807388] max-w-xl mx-auto">
            Start for free. Upgrade once if you need more. No subscriptions, ever.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free */}
          <div className="rounded-2xl bg-white border border-[#D4E9CA] p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Badge label="Free" variant="free" />
            </div>
            <div>
              <span className="text-4xl font-bold text-[#180026]">{freePlan.price}</span>
            </div>
            <p className="text-[#807388]">{freePlan.description}</p>
            <ul className="flex flex-col gap-3 flex-1">
              {freePlan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#00C48C] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#180026]">{f}</span>
                </li>
              ))}
            </ul>
            <Link href={freePlan.href} className="block mt-auto">
              <Button variant="ghost" size="md" className="w-full">
                {freePlan.cta}
              </Button>
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl bg-[#1D4641] p-8 flex flex-col gap-6 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#85F199]/20 translate-x-8 -translate-y-8" />

            <div className="flex items-center justify-between relative">
              <Badge label="Pro" variant="pro" className="bg-[#85F199] text-[#1D4641]" />
              <span className="text-xs text-[#D4E9CA] font-medium">Best value</span>
            </div>
            <div className="relative">
              <span className="text-4xl font-bold text-white">{proPlan.price}</span>
              <span className="ml-2 text-sm text-[#D4E9CA]">{proPlan.priceSuffix}</span>
            </div>
            <p className="text-[#D4E9CA]">{proPlan.description}</p>
            <ul className="flex flex-col gap-3 flex-1 relative">
              {proPlan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#85F199] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">{f}</span>
                </li>
              ))}
            </ul>
            <Link href={proPlan.href} className="block mt-auto relative">
              <Button variant="secondary" size="md" className="w-full">
                {proPlan.cta}
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-[#807388] mt-8">
          Secure payment via Stripe. All prices in AUD.
        </p>
      </div>
    </section>
  );
}
