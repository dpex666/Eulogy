'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Footer from '@/components/landing/Footer';

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

export default function MyEulogiesPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eulogies, setEulogies] = useState<SavedEulogy[] | null>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValid) return;

    setLoading(true);
    setSubmitted(true);

    try {
      const res = await fetch(`/api/eulogies?email=${encodeURIComponent(email)}`);
      const json = await res.json();
      setEulogies(json.eulogies || []);
    } catch {
      setEulogies([]);
    } finally {
      setLoading(false);
    }
  }

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
          <div>
            <h1 className="text-3xl font-bold text-[#180026]">Your saved eulogies</h1>
            <p className="text-[#807388] mt-2">
              Enter the email you used when you created your eulogy.
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex gap-3">
            <div className="flex-1">
              <Input
                label=""
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubmitted(false); setEulogies(null); }}
              />
            </div>
            <div className="pt-0.5">
              <Button
                type="submit"
                variant="primary"
                disabled={!emailValid || loading}
                loading={loading}
              >
                Find
              </Button>
            </div>
          </form>

          {submitted && !loading && eulogies !== null && (
            <>
              {eulogies.length === 0 ? (
                <div className="rounded-xl bg-white border border-[#D4E9CA] px-6 py-8 text-center">
                  <p className="text-[#180026] font-medium">No eulogies found</p>
                  <p className="text-[#807388] text-sm mt-1">
                    No eulogies are saved under that email address.
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
                    {eulogies.length} {eulogies.length === 1 ? 'eulogy' : 'eulogies'} found
                  </p>
                  {eulogies.map((e) => (
                    <EulogyCard key={e.id} eulogy={e} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
