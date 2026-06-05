import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F3F7FA] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center flex flex-col gap-6">
        <div>
          <p className="text-6xl font-bold text-[#D4E9CA]">404</p>
          <h1 className="text-2xl font-bold text-[#180026] mt-3">Page not found</h1>
          <p className="text-[#807388] mt-2">
            The page you were looking for does not exist.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary">Back to home</Button>
          </Link>
          <Link href="/generate">
            <Button variant="ghost">Create a eulogy</Button>
          </Link>
        </div>
        <p className="text-xs text-[#807388]">
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
    </div>
  );
}
