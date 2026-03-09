'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EulogyDisplay from '@/components/result/EulogyDisplay';
import ActionButtons from '@/components/result/ActionButtons';
import UpgradePrompt from '@/components/result/UpgradePrompt';
import AlternativesPanel from '@/components/result/AlternativesPanel';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import { EulogyFormData } from '@/types/eulogy';

interface Variation {
  tone: string;
  eulogy: string;
}

export default function ResultPage() {
  const router = useRouter();
  const [eulogy, setEulogy] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [formData, setFormData] = useState<EulogyFormData | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [alternatives, setAlternatives] = useState<Variation[] | null>(null);
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);
  const [editedEulogy, setEditedEulogy] = useState<string>('');

  useEffect(() => {
    const storedEulogy = sessionStorage.getItem('eulogy_text');
    const storedEmail = sessionStorage.getItem('eulogy_email') || '';
    const storedForm = sessionStorage.getItem('eulogy_form');
    const storedBlocked = sessionStorage.getItem('eulogy_blocked') === 'true';

    if (!storedEulogy && !storedBlocked) {
      router.push('/generate');
      return;
    }

    setEulogy(storedEulogy);
    setEditedEulogy(storedEulogy || '');
    setEmail(storedEmail);
    setBlocked(storedBlocked);
    if (storedForm) {
      try {
        setFormData(JSON.parse(storedForm));
      } catch {}
    }

    // Check paid status
    if (storedEmail) {
      fetch('/api/check-paid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: storedEmail }),
      })
        .then((r) => r.json())
        .then((d) => {
          const paid = d.isPaid || false;
          setIsPaid(paid);
          // If the user just paid but was previously blocked, unblock them and
          // redirect to generate so they can create their (first real) eulogy.
          if (paid && storedBlocked) {
            sessionStorage.setItem('eulogy_blocked', 'false');
            router.push('/generate');
          }
        })
        .catch(() => {});
    }
  }, [router]);

  async function handleGenerateAlternatives() {
    if (!formData || !email || !editedEulogy) return;
    setLoadingAlternatives(true);

    try {
      const res = await fetch('/api/generate/alternatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          originalEulogy: editedEulogy,
          email,
        }),
      });

      const json = await res.json();
      if (json.variations) {
        setAlternatives(json.variations);
      }
    } catch {
      // Silent fail - alternatives are a bonus feature
    } finally {
      setLoadingAlternatives(false);
    }
  }

  if (!eulogy && !blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F7FA]">
        <LoadingSpinner size="lg" message="Loading your eulogy..." />
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="min-h-screen bg-[#F3F7FA] flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-[#180026]">
            You have already created a free eulogy
          </h1>
          <p className="text-[#807388]">
            The free plan includes one eulogy generation. Upgrade to Pro for $29.99 AUD to unlock unlimited generations and in-app editing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/pricing">
              <Button variant="primary" size="lg">Upgrade to Pro</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="lg">Back to home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const deceasedName = formData?.deceasedName;

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1D4641] h-16 flex items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Eulogy<span className="text-[#85F199]">Writer</span>
        </Link>
        <Link href="/generate">
          <Button variant="secondary" size="sm">Start a new eulogy</Button>
        </Link>
      </header>

      <main className="min-h-screen bg-[#F3F7FA] pt-24 pb-20 px-4">
        <div className="mx-auto max-w-2xl flex flex-col gap-8">
          {/* Page title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#180026]">
              Your eulogy is ready
            </h1>
            {deceasedName && (
              <p className="text-[#807388] mt-1">In memory of {deceasedName}</p>
            )}
          </div>

          {/* Eulogy */}
          <EulogyDisplay
            eulogy={eulogy!}
            deceasedName={deceasedName}
            isPaid={isPaid}
            onEdit={isPaid ? setEditedEulogy : undefined}
          />

          {/* Actions */}
          <ActionButtons
            eulogy={editedEulogy || eulogy!}
            isPaid={isPaid}
            onGenerateAlternatives={handleGenerateAlternatives}
            loadingAlternatives={loadingAlternatives}
          />

          {/* Alternatives (paid) */}
          {alternatives && alternatives.length > 0 && (
            <AlternativesPanel variations={alternatives} />
          )}

          {/* Upgrade prompt (free users) */}
          {!isPaid && (
            <UpgradePrompt email={email} />
          )}

          {/* Gaia credit */}
          <p className="text-center text-xs text-[#807388]">
            A product by{' '}
            <a
              href="https://gaiaapp.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D4641] hover:text-[#48705B] font-medium"
            >
              Gaia Digital
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
