import Link from 'next/link';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Cancelled | EulogyWriter',
};

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-[#F3F7FA] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-[#180026]">Payment cancelled</h1>
        <p className="text-[#807388]">
          No payment was taken. You can still use the free plan or try again when you are ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/result">
            <Button variant="primary">Back to my eulogy</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost">View pricing</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
