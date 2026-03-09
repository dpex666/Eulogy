import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="bg-gaia-gradient min-h-screen flex items-center pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-3xl">
          {/* Subtle label */}
          <p className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
            Free to start. No account needed.
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Write a eulogy that{' '}
            <span className="text-[#85F199]">truly honours</span>{' '}
            them
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-white/85 mb-10 max-w-2xl leading-relaxed">
            Losing someone is hard enough. We help you find the right words. Share a few memories and details, and we will craft a personal, heartfelt eulogy ready for the service.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/generate">
              <Button variant="secondary" size="lg">
                Start writing for free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="ghost"
                size="lg"
                className="border-white text-white hover:bg-white/10 hover:text-white"
              >
                See how it works
              </Button>
            </Link>
          </div>

          {/* Social proof hint */}
          <p className="mt-8 text-sm text-white/60">
            Ready in under 3 minutes. No sign-up required.
          </p>
        </div>
      </div>
    </section>
  );
}
