import Link from 'next/link';
import Footer from '@/components/landing/Footer';

export const metadata = {
  title: 'Terms of Service | EulogyWriter',
};

export default function TermsPage() {
  return (
    <>
      <header className="bg-[#1D4641] h-16 flex items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Eulogy<span className="text-[#85F199]">Writer</span>
        </Link>
      </header>

      <main className="min-h-screen bg-[#F3F7FA] px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-[#180026] mb-2">Terms of Service</h1>
          <p className="text-sm text-[#807388] mb-10">Last updated: June 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-[#180026]">

            <section>
              <h2 className="text-xl font-bold mb-3">1. About this service</h2>
              <p className="text-[#807388] leading-relaxed">
                EulogyWriter is operated by Gaia Digital, an Australian business. The service generates AI-assisted eulogy drafts to help families find words during difficult times. By using EulogyWriter you agree to these terms.
              </p>
              <p className="text-[#807388] leading-relaxed mt-3">
                Contact: <a href="mailto:info@gaiaapp.net" className="text-[#1D4641] hover:underline">info@gaiaapp.net</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. Free and paid tiers</h2>
              <p className="text-[#807388] leading-relaxed">
                The free plan allows one eulogy generation per email address and IP address. The Pro plan is a one-time payment of $29.99 AUD and provides unlimited generations, in-app editing, and alternative tone versions.
              </p>
              <p className="text-[#807388] leading-relaxed mt-3">
                All prices are in Australian Dollars (AUD) and include any applicable GST. There are no subscriptions or recurring charges.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. Payments and refunds</h2>
              <p className="text-[#807388] leading-relaxed">
                Payments are processed by Stripe. We do not store your card details. The Pro upgrade is a digital product delivered immediately upon payment.
              </p>
              <p className="text-[#807388] leading-relaxed mt-3">
                Under the Australian Consumer Law, you are entitled to a remedy if the service fails to meet a consumer guarantee. If you experience a technical failure that prevents the service from being delivered, contact us at <a href="mailto:info@gaiaapp.net" className="text-[#1D4641] hover:underline">info@gaiaapp.net</a> and we will resolve it promptly.
              </p>
              <p className="text-[#807388] leading-relaxed mt-3">
                Because the eulogy is generated and delivered immediately, we do not offer refunds solely because the content was not to your taste. If the AI fails to produce any output due to a system error, we will regenerate at no charge or issue a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. AI-generated content disclaimer</h2>
              <p className="text-[#807388] leading-relaxed">
                Eulogies are drafted by an AI model based on the information you provide. The output is a starting point, not a finished product. You are responsible for reviewing, editing, and verifying the content before delivering it at a funeral or memorial service.
              </p>
              <p className="text-[#807388] leading-relaxed mt-3">
                Gaia Digital is not liable for any inaccuracies, omissions, or emotional impact of AI-generated content. Always read the eulogy in full before the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Acceptable use</h2>
              <p className="text-[#807388] leading-relaxed">
                You must not use EulogyWriter to generate content that is defamatory, abusive, or intended to harm others. The service is intended for genuine funeral and memorial use. We reserve the right to terminate access for misuse without refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. Intellectual property</h2>
              <p className="text-[#807388] leading-relaxed">
                You own the eulogy content generated for you. You grant Gaia Digital a non-exclusive licence to store and display it to you via the service. We will not use your eulogy content for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">7. Limitation of liability</h2>
              <p className="text-[#807388] leading-relaxed">
                To the maximum extent permitted by Australian law, Gaia Digital is not liable for indirect, incidental, or consequential damages arising from your use of EulogyWriter. Our total liability is limited to the amount you paid for the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">8. Governing law</h2>
              <p className="text-[#807388] leading-relaxed">
                These terms are governed by the laws of Victoria, Australia. Any disputes will be resolved in the courts of Victoria.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">9. Changes to these terms</h2>
              <p className="text-[#807388] leading-relaxed">
                We may update these terms from time to time. Material changes will be noted with a new "last updated" date. Continued use of the service constitutes acceptance of the updated terms.
              </p>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-[#D4E9CA] flex gap-6 text-sm">
            <Link href="/privacy" className="text-[#1D4641] hover:text-[#48705B]">Privacy Policy</Link>
            <Link href="/" className="text-[#807388] hover:text-[#180026]">Back to home</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
