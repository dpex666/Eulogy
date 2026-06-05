'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Footer from '@/components/landing/Footer';
import { createSupabaseBrowserAuth } from '@/lib/supabaseAuth';

interface SavedEulogy {
  id: string;
  deceased_name: string;
  eulogy_text: string;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function EulogyCard({ eulogy }: { eulogy: SavedEulogy }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(eulogy.eulogy_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl bg-white border border-[#D4E9CA] overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#F3F7FA] transition-colors"
      >
        <div>
          <p className="font-semibold text-[#180026]">In memory of {eulogy.deceased_name}</p>
          <p className="text-sm text-[#807388] mt-0.5">Created {formatDate(eulogy.created_at)}</p>
        </div>
        {open ? (
          <ChevronUp className="h-5 w-5 text-[#807388] shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#807388] shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-6 flex flex-col gap-4 border-t border-[#D4E9CA]">
          <p className="text-[#180026] leading-relaxed whitespace-pre-wrap pt-5 text-sm">
            {eulogy.eulogy_text}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="self-start flex items-center gap-2 text-sm font-medium text-[#1D4641] hover:text-[#48705B] transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy to clipboard
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function MyEulogiesContent() {
  const searchParams = useSearchParams();
  const authError = searchParams.get('error');

  const [sessionChecked, setSessionChecked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [eulogies, setEulogies] = useState<SavedEulogy[] | null>(null);
  const [loadingEulogies, setLoadingEulogies] = useState(false);

  const [magicEmail, setMagicEmail] = useState('');
  const [magicSent, setMagicSent] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);

  const magicEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(magicEmail);

  useEffect(() => {
    const supabase = createSupabaseBrowserAuth();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
      setSessionChecked(true);
    });
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    setLoadingEulogies(true);
    fetch('/api/eulogies')
      .then((r) => r.json())
      .then((d) => setEulogies(d.eulogies || []))
      .catch(() => setEulogies([]))
      .finally(() => setLoadingEulogies(false));
  }, [userEmail]);

  async function handleSendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!magicEmailValid) return;
    setMagicLoading(true);
    try {
      const supabase = createSupabaseBrowserAuth();
      await supabase.auth.signInWithOtp({
        email: magicEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/my-eulogies`,
        },
      });
      setMagicSent(true);
    } catch {
      // Supabase always returns success even for unknown emails (security best practice)
    } finally {
      setMagicLoading(false);
    }
  }

  async function handleSignOut() {
    const supabase = createSupabaseBrowserAuth();
    await supabase.auth.signOut();
    setUserEmail(null);
    setEulogies(null);
  }

  if (!sessionChecked) {
    return (
      <div className="flex justify-center pt-16">
        <LoadingSpinner size="lg" message="Checking your session..." />
      </div>
    );
  }

  if (userEmail) {
    return (
      <>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#180026]">Your saved eulogies</h1>
            <p className="text-[#807388] mt-1">Signed in as {userEmail}</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-sm text-[#807388] hover:text-[#180026] transition-colors mt-1"
          >
            Sign out
          </button>
        </div>

        {loadingEulogies && (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="md" message="Loading your eulogies..." />
          </div>
        )}

        {!loadingEulogies && eulogies !== null && (
          <>
            {eulogies.length === 0 ? (
              <div className="rounded-xl bg-white border border-[#D4E9CA] px-6 py-8 text-center">
                <p className="text-[#180026] font-medium">No eulogies found</p>
                <p className="text-[#807388] text-sm mt-1">
                  No eulogies are saved under this account yet.
                </p>
                <div className="mt-4">
                  <Link href="/generate">
                    <Button variant="primary" size="sm">Create one now</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-[#807388]">
                  {eulogies.length} {eulogies.length === 1 ? 'eulogy' : 'eulogies'} saved
                </p>
                {eulogies.map((e) => (
                  <EulogyCard key={e.id} eulogy={e} />
                ))}
              </div>
            )}
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-[#180026]">Your saved eulogies</h1>
        <p className="text-[#807388] mt-2">
          Enter your email to receive a sign-in link. No password needed.
        </p>
      </div>

      {authError && (
        <div className="rounded-lg bg-[#FF4E68]/10 border border-[#FF4E68]/30 px-4 py-3">
          <p className="text-sm text-[#FF4E68]">
            The sign-in link may have expired. Request a new one below.
          </p>
        </div>
      )}

      {magicSent ? (
        <div className="rounded-xl bg-[#D4E9CA] border border-[#85F199]/50 px-6 py-6">
          <p className="font-semibold text-[#1D4641]">Check your inbox</p>
          <p className="text-sm text-[#1D4641] mt-1">
            We sent a sign-in link to <strong>{magicEmail}</strong>. Click it to access your saved eulogies.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSendMagicLink} className="flex gap-3">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="your@email.com"
              value={magicEmail}
              onChange={(e) => setMagicEmail(e.target.value)}
            />
          </div>
          <div className="pt-0.5">
            <Button
              type="submit"
              variant="primary"
              disabled={!magicEmailValid || magicLoading}
              loading={magicLoading}
            >
              Send link
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

export default function MyEulogiesPage() {
  return (
    <>
      <header className="bg-[#1D4641] h-16 flex items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Eulogy<span className="text-[#85F199]">Writer</span>
        </Link>
        <Link href="/generate">
          <Button variant="secondary" size="sm">Create a new eulogy</Button>
        </Link>
      </header>

      <main className="min-h-screen bg-[#F3F7FA] px-4 py-16">
        <div className="mx-auto max-w-2xl flex flex-col gap-8">
          <Suspense
            fallback={
              <div className="flex justify-center pt-16">
                <LoadingSpinner size="lg" message="Loading..." />
              </div>
            }
          >
            <MyEulogiesContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
