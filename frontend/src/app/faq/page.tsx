'use client';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { HelpCircle } from 'lucide-react';

const faqs = [
  { q: "Is Joblix completely free?", a: "Yes, you can build your resume and export basic formats entirely for free. We also offer a Pro plan for advanced AI generation and premium layouts." },
  { q: "Do templates pass ATS scanners?", a: "Absolutely. Regardless of the visual style, the underlying document structure is rigorously tested against all major modern Applicant Tracking Systems (Workday, Greenhouse, Lever)." },
  { q: "Can I cancel my Pro subscription anytime?", a: "Yes. Simply head to the Account page to cancel. You will retain Pro access until the end of your billing cycle." },
  { q: "Are my details secure?", a: "We utilize Clerk for robust authentication and enterprise-grade encryption for all database records. Your professional history belongs to you alone." }
];

export default function FAQPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pt-36 px-5 md:px-12 font-['Outfit'] flex flex-col">
      <div className="blob left-[20%] top-20 h-[500px] w-[500px] bg-cyan-300/10" />
      <Navbar />

      <main className="mx-auto w-full max-w-4xl flex-grow flex flex-col pb-20">
        <header className="text-center mb-16 z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100/50 text-cyan-700 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
             <HelpCircle size={12} className="text-cyan-500" />
             Support Center
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-950 tracking-[-0.03em] mb-4">
             Frequently Asked.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium">Everything you need to know about the platform.</p>
        </header>

        <section className="grid gap-6 w-full z-10">
           {faqs.map((faq, i) => (
             <div key={i} className="surface-strong rounded-[32px] p-8 border border-white/80 shadow-sm bg-white/50 backdrop-blur-xl group hover:shadow-lg transition-all">
                <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-start gap-4">
                  <span className="text-cyan-400 text-xl">Q.</span> {faq.q}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed pl-8 border-l-2 border-gray-100/50">
                   {faq.a}
                </p>
             </div>
           ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
