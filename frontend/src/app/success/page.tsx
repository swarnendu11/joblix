'use client';

import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useAccount } from '@/hooks/useAccount';
import { API_URL, getAuthHeaders } from '@/lib/api';

function SuccessPageFallback() {
  return (
    <div className="relative min-h-screen overflow-hidden px-5 pt-32 md:px-8 flex flex-col">
      <Navbar />

      <main className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center">
        <div className="surface-strong w-full p-10 text-center">
          <div className="badge-pill mx-auto">
            <Sparkles size={14} />
            Billing
          </div>
          <div className="mt-6 flex justify-center">
            <Loader2 size={56} className="animate-spin text-indigo-600" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">Finalizing your upgrade...</h1>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SuccessPageContent() {
  const { getToken, userId } = useAuth();
  const { account, refresh } = useAccount();
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const sessionId = searchParams.get('session_id');
      const isMock = searchParams.get('mock') === 'true';

      if (!sessionId && !isMock) {
        setVerifying(false);
        return;
      }

      try {
        if (sessionId) {
          const headers = await getAuthHeaders(getToken, userId);
          await axios.get(`${API_URL}/api/stripe/session/${sessionId}`, { headers });
        }
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [getToken, refresh, searchParams, userId]);

  return (
    <div className="relative min-h-screen overflow-hidden px-5 pt-32 md:px-8 flex flex-col">
      <Navbar />

      <main className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center">
        <div className="surface-strong w-full p-10 text-center">
          <div className="badge-pill mx-auto">
            <Sparkles size={14} />
            Billing
          </div>
          <div className="mt-6 flex justify-center">
            {verifying ? (
              <Loader2 size={56} className="animate-spin text-indigo-600" />
            ) : (
              <CheckCircle2 size={56} className="text-emerald-500" />
            )}
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
            {verifying ? 'Finalizing your upgrade...' : 'Your Joblix plan is ready.'}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
            {verifying
              ? 'We are confirming your checkout session and refreshing your account access.'
              : `Your current plan is ${account?.plan ?? 'FREE'}. You can head back to the builder and continue with premium templates, AI writing, and PDF export.`}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button className="rounded-full px-7">Go to dashboard</Button>
            </Link>
            <Link href="/builder">
              <Button variant="outline" className="rounded-full px-7">Open builder</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessPageFallback />}>
      <SuccessPageContent />
    </Suspense>
  );
}
