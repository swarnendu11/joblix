'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useAccount } from '@/hooks/useAccount';

const freeFeatures = [
  '1 active resume & version',
  '25 professional templates',
  'Authenticated cloud autosave',
  'Standard PDF export',
  'Essential editing tools',
];

const proFeatures = [
  'Unlimited resumes & versions',
  'Full 50+ premium templates',
  'High-performance PDF & DOCX',
  'AI-powered content engine',
  'Priority support & feedback',
  'Advanced design controls',
];

export default function PricingPage() {
  const { isSignedIn } = useAuth();
  const { account } = useAccount();
  const router = useRouter();

  const handleSubscribe = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    router.push('/checkout');
  };

  const isPro = account?.plan === 'PRO';

  return (
    <div className="relative min-h-screen overflow-x-hidden px-5 pb-10 pt-32 font-['Outfit'] md:px-8 flex flex-col">
      <div className="blob left-[-5rem] top-16 h-64 w-64 bg-cyan-300/30" />
      <div className="blob right-[-6rem] top-28 h-80 w-80 bg-fuchsia-300/25" />

      <Navbar />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="badge-pill">
            <Sparkles size={14} />
            Pricing
          </div>
          <h1 className="mt-6 text-5xl font-bold tracking-[-0.05em] text-slate-950 md:text-6xl">
            Flexible access for <span className="text-gradient">every stage of the job search.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Start free, then upgrade when you want premium templates, AI help, and unlimited polished exports.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="surface-panel relative overflow-hidden p-8 md:p-10 flex flex-col">
            <div className="absolute right-8 top-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_12px_28px_rgba(16,185,129,0.26)]">
              Free
            </div>
            <p className="eyebrow">Included at no cost</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Build momentum before you upgrade.</h2>
            <p className="mt-4 text-base leading-7 text-slate-500">
              The free tier gives you a complete feel for the editor, preview flow, and template system.
            </p>

            <div className="mt-8 rounded-[30px] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.28)] flex-1 flex flex-col gap-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white/70 uppercase tracking-wider">Starter</p>
                  <h3 className="mt-2 text-5xl font-bold tracking-tight text-white">$0</h3>
                </div>
                <p className="pb-2 text-sm text-white/60">forever</p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {freeFeatures.map((feature) => (
                  <div key={feature} className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm text-white/82">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white/12 text-cyan-300 shadow-sm">
                      <Check size={16} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-auto mt-8 h-13 w-full rounded-full border-white/20 bg-white/10 text-white shadow-none hover:bg-white/20">
                {isPro ? 'You are on Pro' : 'Current plan'}
              </Button>
            </div>
          </div>

          <div className="surface-strong relative overflow-hidden p-8 md:p-10 flex flex-col">
            <div className="absolute right-8 top-8 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_12px_28px_rgba(79,70,229,0.26)]">
              Pro
            </div>

            <p className="eyebrow">Most popular</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Professional tools for a more competitive application.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
              Upgrade for the full design library, faster content generation, and polished export workflows that save real time.
            </p>

            <div className="mt-8 rounded-[30px] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.28)] flex-1 flex flex-col gap-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white/70">Joblix Pro</p>
                  <h3 className="mt-2 text-5xl font-bold tracking-tight">$9.99</h3>
                </div>
                <p className="pb-2 text-sm text-white/60">per month</p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {proFeatures.map((feature) => (
                  <div key={feature} className="rounded-[22px] border border-white/10 bg-white/8 p-4 text-sm text-white/82">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white/12 text-cyan-300">
                      <Check size={16} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>


              <Button
                onClick={handleSubscribe}
                disabled={isPro}
                className="mt-auto mt-8 h-13 w-full rounded-full bg-white text-slate-950 shadow-none hover:bg-slate-100"
              >
                {isPro ? 'Already on Pro' : 'Upgrade to Pro'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
