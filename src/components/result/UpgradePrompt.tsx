'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Check, Sparkles } from 'lucide-react';
import { redirectTopLevel } from '@/lib/embed';

interface UpgradePromptProps {
  email: string;
}

const proFeatures = [
  'Edit the eulogy directly in the app',
  'Generate 2 alternative tone versions',
  'Unlimited regenerations',
  'Lifetime access, pay once',
];

export default function UpgradePrompt({ email }: UpgradePromptProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpgrade() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (!res.ok || !json.url) {
        setError('Could not start checkout. Please try again.');
        setLoading(false);
        return;
      }

      redirectTopLevel(json.url);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-[#1D4641] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#85F199]" />
          <p className="font-bold text-white text-lg">Unlock Pro for $29.99 AUD</p>
        </div>
        <p className="text-[#D4E9CA] text-sm">
          One payment. Lifetime access. Edit this eulogy in the app and get two alternative versions in different tones.
        </p>
        <ul className="flex flex-col gap-2">
          {proFeatures.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white">
              <Check className="h-4 w-4 text-[#85F199] flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        {error && (
          <p className="text-sm text-[#FF4E68]">{error}</p>
        )}
      </div>

      <div className="flex-shrink-0">
        <Button
          variant="secondary"
          size="lg"
          loading={loading}
          onClick={handleUpgrade}
        >
          Get lifetime access
        </Button>
      </div>
    </div>
  );
}
