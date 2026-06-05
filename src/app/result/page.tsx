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
import { Input } from '@/components/ui/Input';
import { EulogyFormData } from '@/types/eulogy';
import { createSupabaseBrowserAuth } from '@/lib/supabaseAuth';

interface Variation {
  tone: string;
  eulogy: string;
}

export default function ResultPage() {
  const router = useRouter();
  const [eulogy, setEulogy] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [eulogyId, setEulogyId] = useState<string>('');
  const [formData, setFormData] = useState<EulogyFormData | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [alternatives, setAlternatives] = useState<Variation[] | null>(null);
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);
  const [editedEulogy, setEditedEulogy] = useState<string>('');
  // Magic link sign-in prompt
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLinkLoading, setMagicLinkLoading] = useState(false);

  useEffect(() => {
    const storedEulogy = sessionStorage.getItem('eulogy_text');
    const storedEmail = sessionStorage.getItem('eulogy_email') || '';
    const storedForm = sessionStorage.getItem('eulogy_form');
    const storedBlocked = sessionStorage.getItem('eulogy_blocked') === 'true';
    const storedId = sessionStorage.getItem('eulogy_id') || '';

    if (!storedEulogy && !storedBlocked) {
      router.push('/generate');
      return;
    }

    setEulogy(storedEulogy);
    setEditedEulogy(storedEulogy || '');
    setEmail(storedEmail);
    setEulogyId(storedId);
    setMagicLinkEmail(storedEmail);
    setBlocked(storedBlocked);
    if (storedForm) {
      try {
        setFormData(JSON.parse(storedForm));
      } catch {}
    }

    // Check paid status and auth session
    const checkStatus = async () => {
      const supabase = createSupabaseBrowserAuth();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setIsAuthed(true);

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
            if (paid && storedBlocked) {
              sessionStorage.setItem('eulogy_blocked', 'false');
              router.push('/generate');
            }
          })
          .catch(() => {});
      }
    };

    checkStatus();
  }, [router]);

  async function handleSendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!magicLinkEmail) return;
    setMagicLinkLoading(true);
    try {
      const supabase = createSupabaseBrowserAuth();
      await supabase.auth.signInWithOtp({
        email: magicLinkEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/my-eulogies`,
        },
      });
      setMagicLinkSent(true);
    } catch {
      // Silent — if it fails, user can try again
    } finally {
      setMagicLinkLoading(false);
    }
  }

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
      // Silent — alternatives are a bonus feature
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
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#180026]">
              Your eulogy is ready
            </h1>
            {deceasedName && (
              <p className="text-[#807388] mt-1">In memory of {deceasedName}</p>
            )}
          </div>

          <EulogyDisplay
            eulogy={eulogy!}
            deceasedName={deceasedName}
            isPaid={isPaid}
            isAuthed={isAuthed}
            eulogyId={eulogyId}
            onEdit={isPaid ? setEditedEulogy : undefined}
          />

          <ActionButtons
            eulogy={editedEulogy || eulogy!}
            isPaid={isPaid}
            onGenerateAlternatives={handleGenerateAlternatives}
            loadingAlternatives={loadingAlternatives}
          />

          {alternatives && alternatives.length > 0 && (
            <AlternativesPanel variations={alternatives} />
          )}

          {/* Magic link sign-in prompt */}
          {!isAuthed && (
            <div className="rounded-xl bg-white border border-[#D4E9CA] px-6 py-5">
              {magicLinkSent ? (
                <p className="text-sm text-[#1D4641] font-medium">
                  Check your inbox. We sent a link to {magicLinkEmail} — click it to access your saved eulogies from any device.
                </p>
              ) : (
                <>
                  <p className="text-sm font-semibold text-[#180026] mb-1">
                    Access your eulogy from any device
                  </p>
                  <p className="text-xs text-[#807388] mb-4">
                    Enter your email to receive a magic link. No password needed.
                  </p>
                  <form onSubmit={handleSendMagicLink} className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={magicLinkEmail}
                        onChange={(e) => setMagicLinkEmail(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      loading={magicLinkLoading}
                      disabled={!magicLinkEmail || magicLinkLoading}
                    >
                      Send link
                    </Button>
                  </form>
                </>
              )}
            </div>
          )}

          {!isPaid && (
            <UpgradePrompt email={email} />
          )}

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
