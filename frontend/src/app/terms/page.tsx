'use client';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pt-36 px-5 md:px-12 font-['Outfit'] flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-grow flex flex-col gap-10 pb-20">
         <div className="text-center mb-8 z-10">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-[-0.03em]">Terms of Service</h1>
            <p className="text-gray-500 mt-4 text-base font-medium">Last updated: March 30, 2026</p>
         </div>
         <div className="surface-strong rounded-[40px] p-8 md:p-14 border border-white/80 shadow-sm bg-white/50 backdrop-blur-xl space-y-8 text-gray-600 font-medium z-10">
            <h2 className="text-2xl font-black text-gray-900">1. Acceptance of Terms</h2>
            <p>By accessing or using the Joblix Platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            
            <h2 className="text-2xl font-black text-gray-900">2. Pro Subscription</h2>
            <p>Premium templates and AI integrations are available through our Pro subscription. Subscriptions automatically renew unless canceled prior to the next billing cycle. Refunds are governed strictly by our standard cancellation policy.</p>

            <h2 className="text-2xl font-black text-gray-900">3. Platform Misuse</h2>
            <p>Scraping, reverse engineering, or exploiting the PDF generation engines provided by our environment constitutes severe misuse. Accounts identified causing deliberate infrastructure strain will be terminated.</p>
         </div>
      </main>
      <Footer />
    </div>
  );
}
