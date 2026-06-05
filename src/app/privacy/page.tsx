import Link from 'next/link';
import Footer from '@/components/landing/Footer';

export const metadata = {
  title: 'Privacy Policy | EulogyWriter',
};

export default function PrivacyPage() {
  return (
    <>
      <header className="bg-[#1D4641] h-16 flex items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Eulogy<span className="text-[#85F199]">Writer</span>
        </Link>
      </header>

      <main className="min-h-screen bg-[#F3F7FA] px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-[#180026] mb-2">Privacy Policy</h1>
          <p className="text-sm text-[#807388] mb-10">Last updated: June 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-[#180026]">

            <section>
              <h2 className="text-xl font-bold mb-3">1. Who we are</h2>
              <p className="text-[#807388] leading-relaxed">
                EulogyWriter is operated by Gaia Digital, an Australian business. This policy explains how we collect, use, and protect your personal information in accordance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
              </p>
              <p className="text-[#807388] leading-relaxed mt-3">
                Contact: <a href="mailto:info@gaiaapp.net" className="text-[#1D4641] hover:underline">info@gaiaapp.net</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. What we collect</h2>
              <p className="text-[#807388] leading-relaxed">When you use EulogyWriter, we may collect:</p>
              <ul className="mt-3 space-y-2 text-[#807388]">
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span><strong className="text-[#180026]">Email address</strong> — provided when you create a eulogy or sign in. Used to identify your account, deliver your eulogy, and (with your knowledge) to send relevant communications from Gaia Digital.</span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span><strong className="text-[#180026]">Eulogy content</strong> — the details you enter (name of the deceased, memories, personality traits, etc.) and the generated eulogy text. Stored so you can access your eulogy later.</span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span><strong className="text-[#180026]">IP address</strong> — collected to enforce the free tier limit and prevent abuse. Not used for tracking or advertising.</span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span><strong className="text-[#180026]">Payment information</strong> — handled entirely by Stripe. We never see or store your card details. We receive only a confirmation that payment was made and your email address.</span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. How we use your information</h2>
              <ul className="mt-3 space-y-2 text-[#807388]">
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span>To generate and save your eulogy</span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span>To verify your account and payment status</span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span>To inform you about other services offered by Gaia Digital that may be relevant to you (you may opt out at any time by emailing <a href="mailto:info@gaiaapp.net" className="text-[#1D4641] hover:underline">info@gaiaapp.net</a>)</span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span>To prevent fraud and enforce fair use of the free tier</span></li>
              </ul>
              <p className="text-[#807388] leading-relaxed mt-4">
                We do not sell your personal information to third parties. We do not use your eulogy content for AI training or marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. Data storage</h2>
              <p className="text-[#807388] leading-relaxed">
                Your data is stored in Supabase, a cloud database platform. Supabase stores data in data centres located in the United States. By using EulogyWriter, you consent to your data being transferred to and stored in the United States for the purpose of providing this service.
              </p>
              <p className="text-[#807388] leading-relaxed mt-3">
                We use industry-standard security practices including encrypted connections (HTTPS), row-level access controls, and environment-separated credentials.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Cookies and session storage</h2>
              <p className="text-[#807388] leading-relaxed">
                We use browser session storage to pass your eulogy between pages during a single session. This data is cleared when you close your browser tab. We also use authentication cookies (set by Supabase) to keep you signed in across visits. We do not use advertising or analytics cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. Your rights</h2>
              <p className="text-[#807388] leading-relaxed">Under the Australian Privacy Act and, where applicable, the GDPR, you have the right to:</p>
              <ul className="mt-3 space-y-2 text-[#807388]">
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span>Access the personal information we hold about you</span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span>Request correction of inaccurate information</span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span>Request deletion of your data ("right to erasure")</span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span>Object to the use of your data for marketing</span></li>
              </ul>
              <p className="text-[#807388] leading-relaxed mt-4">
                To exercise any of these rights, email us at <a href="mailto:info@gaiaapp.net" className="text-[#1D4641] hover:underline">info@gaiaapp.net</a>. We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">7. Third-party services</h2>
              <ul className="mt-3 space-y-2 text-[#807388]">
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span><strong className="text-[#180026]">Stripe</strong> — payment processing. <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1D4641] hover:underline">Stripe Privacy Policy</a></span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span><strong className="text-[#180026]">Supabase</strong> — database and authentication. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1D4641] hover:underline">Supabase Privacy Policy</a></span></li>
                <li className="flex gap-2"><span className="text-[#1D4641] font-bold mt-0.5">•</span><span><strong className="text-[#180026]">OpenAI</strong> — AI model used to generate eulogies. Your inputs are sent to OpenAI for processing. <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#1D4641] hover:underline">OpenAI Privacy Policy</a></span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">8. Changes to this policy</h2>
              <p className="text-[#807388] leading-relaxed">
                We may update this policy from time to time. Material changes will be noted with a new "last updated" date at the top of this page.
              </p>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-[#D4E9CA] flex gap-6 text-sm">
            <Link href="/terms" className="text-[#1D4641] hover:text-[#48705B]">Terms of Service</Link>
            <Link href="/" className="text-[#807388] hover:text-[#180026]">Back to home</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
