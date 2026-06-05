import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1D4641] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold">
              Eulogy<span className="text-[#85F199]">Writer</span>
            </span>
            <p className="text-sm text-[#D4E9CA] max-w-xs">
              Helping families find the right words when it matters most.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm">
            <Link href="/generate" className="text-[#D4E9CA] hover:text-white transition-colors">
              Create a eulogy
            </Link>
            <Link href="/pricing" className="text-[#D4E9CA] hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/my-eulogies" className="text-[#D4E9CA] hover:text-white transition-colors">
              My eulogies
            </Link>
            <Link href="/terms" className="text-[#D4E9CA] hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-[#D4E9CA] hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#48705B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#D4E9CA]">
          <p>
            A product by{' '}
            <a
              href="https://gaiaapp.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#85F199] hover:text-white transition-colors font-medium"
            >
              Gaia Digital
            </a>
          </p>
          <p>All prices in AUD. No subscriptions.</p>
        </div>
      </div>
    </footer>
  );
}
