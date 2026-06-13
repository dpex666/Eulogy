import { Video } from 'lucide-react';

// Cross-promotion for Funerals Live, Gaia Digital's funeral live-streaming
// service. Shown at high-context moments: someone writing a eulogy is
// usually planning a service within days.
export default function GaiaCrossSell() {
  return (
    <div className="rounded-2xl border border-[#8B104E]/20 bg-[#8B104E]/[0.04] p-6 flex flex-col sm:flex-row gap-5 items-start">
      <div className="h-11 w-11 rounded-full bg-[#8B104E]/10 flex items-center justify-center flex-shrink-0">
        <Video className="h-5 w-5 text-[#8B104E]" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-[#180026]">
          Family who can&apos;t be there in person?
        </p>
        <p className="text-sm text-[#807388] leading-relaxed">
          Funerals Live by Gaia streams the service privately and respectfully,
          so loved ones interstate or overseas never miss the chance to say
          goodbye.
        </p>
        <a
          href="https://www.funeralslive.com.au/?utm_source=eulogywriter&utm_medium=referral&utm_campaign=cross_sell"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-[#8B104E] hover:text-[#4D1C34] transition-colors"
        >
          Learn about Funerals Live →
        </a>
      </div>
    </div>
  );
}
