import type { Metadata } from 'next';
import Link from 'next/link';
import MultiStepForm from '@/components/generator/MultiStepForm';

export const metadata: Metadata = {
  title: 'Create Your Eulogy | EulogyWriter',
  description: 'Share a few details and memories. We will write a heartfelt, personal eulogy for your loved one.',
};

export default function GeneratePage() {
  return (
    <>
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1D4641] h-16 flex items-center px-6">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Eulogy<span className="text-[#85F199]">Writer</span>
        </Link>
      </header>
      <MultiStepForm />
    </>
  );
}
