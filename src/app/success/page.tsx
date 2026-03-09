import Link from 'next/link';
import Button from '@/components/ui/Button';
import Footer from '@/components/landing/Footer';
import { Check } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful | EulogyWriter',
};

export default function SuccessPage() {
  return (
    <>
      <header className="bg-[#1D4641] h-16 flex items-center px-6">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Eulogy<span className="text-[#85F199]">Writer</span>
        </Link>
      </header>

      <main className="min-h-screen bg-[#F3F7FA] flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center flex flex-col items-center gap-6">
          {/* Check icon */}
          <div className="h-16 w-16 rounded-full bg-[#00C48C]/15 flex items-center justify-center">
            <Check className="h-8 w-8 text-[#00C48C]" />
          </div>

          <h1 className="text-3xl font-bold text-[#180026]">
            You are all set
          </h1>

          <p className="text-[#807388] max-w-sm leading-relaxed">
            Your Pro account is now active. Go back to your result page to start editing or generating alternative versions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/result">
              <Button variant="primary" size="lg">Back to my eulogy</Button>
            </Link>
            <Link href="/generate">
              <Button variant="ghost" size="lg">Create another eulogy</Button>
            </Link>
          </div>

          <div className="mt-6 rounded-xl bg-[#D4E9CA] p-5 text-left max-w-sm">
            <p className="text-sm font-semibold text-[#1D4641] mb-2">Other services from Gaia Digital</p>
            <p className="text-sm text-[#48705B]">
              Gaia Digital builds thoughtful products for life events. Visit{' '}
              <a
                href="https://gaiaapp.net"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                gaiaapp.net
              </a>{' '}
              to see everything we offer.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
