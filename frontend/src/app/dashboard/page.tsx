'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FolderOpenDot, LayoutGrid, Loader2, Plus, Sparkles, Activity, FileLineChart } from 'lucide-react';
import ResumeCard from '@/components/dashboard/ResumeCard';
import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { useAccount } from '@/hooks/useAccount';
import { API_URL, ResumeRecord, getAuthHeaders } from '@/lib/api';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { getToken, userId } = useAuth();
  const { account, loading: accountLoading, refresh } = useAccount();
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');

  const displayedResumes = useMemo(() => {
    if (activeTab === 'active') {
      return resumes.filter((resume) => resume.status !== 'ARCHIVED');
    }

    return resumes.filter((resume) => resume.status === 'ARCHIVED');
  }, [activeTab, resumes]);

  const fetchResumes = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const headers = await getAuthHeaders(getToken, userId);
      const { data } = await axios.get<ResumeRecord[]>(`${API_URL}/api/resumes`, { headers });
      setResumes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [getToken, user, userId]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!user) {
      setLoading(false);
      return;
    }

    fetchResumes();
  }, [fetchResumes, isLoaded, user]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    setResumes((previous) => previous.filter((resume) => resume.id !== id));

    try {
      const headers = await getAuthHeaders(getToken, userId);
      await axios.delete(`${API_URL}/api/resumes/${id}`, { headers });
      await refresh();
    } catch (error) {
      console.error('Failed to delete on server:', error);
      fetchResumes();
      alert('Failed to delete. Please try again.');
    }
  };

  if (!isLoaded || loading || accountLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdfdfd]">
        <div className="surface-panel flex items-center gap-4 rounded-3xl border border-white px-8 py-6 text-slate-800 shadow-2xl">
          <Loader2 className="animate-spin text-indigo-600" size={26} />
          <span className="text-lg font-bold tracking-tight">Loading your workspace...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen overflow-hidden px-5 pt-6 md:px-8">
        <div className="blob left-[-5rem] top-10 h-80 w-80 bg-cyan-300/15" />
        <div className="blob right-[-5rem] top-32 h-96 w-96 bg-indigo-300/10" />

        <Navbar />

        <main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center py-24">
          <div className="surface-strong w-full max-w-2xl px-8 py-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-indigo-700">
              <Sparkles size={14} />
              Sign in required
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-950 md:text-5xl">
              Your dashboard is available after you sign in.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-500">
              Create an account or sign in to access saved resumes, premium templates, and your workspace history.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/sign-in">
                <Button variant="outline" className="h-12 rounded-[18px] px-8 font-bold">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="h-12 rounded-[18px] px-8 font-bold">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const templatesUsed = new Set(resumes.map((resume) => resume.template)).size;
  const resumeLimitReached = account?.plan === 'FREE' && (account.resumeCount ?? 0) >= 1;

  return (
    <div className="relative min-h-screen overflow-x-hidden px-5 pt-36 md:px-12 font-['Outfit'] flex flex-col">
      <div className="blob left-[-5rem] top-10 h-80 w-80 bg-cyan-300/15" />
      <div className="blob right-[-5rem] top-32 h-96 w-96 bg-indigo-300/10" />

      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-10">
        <header className="z-10 flex flex-col justify-between gap-6 border-b border-gray-200/60 pb-8 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100/50 bg-indigo-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-700">
              <Sparkles size={12} className="text-indigo-400" />
              Personal Workspace
            </div>
            <h1 className="text-4xl font-black tracking-[-0.03em] text-gray-950 md:text-5xl">
              Welcome back, {user.firstName || 'Builder'}.
            </h1>
            <p className="mt-2 text-lg font-medium text-gray-500">Manage your resumes, track versions, and access premium templates.</p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
              {account?.plan === 'PRO' ? 'Pro Plan' : 'Free Plan'}
            </div>
            <Link href="/templates" className="w-full sm:w-auto">
              <Button variant="outline" className="glass h-[52px] w-full rounded-[20px] px-8 font-bold text-gray-700 shadow-sm transition-all hover:border-gray-200 hover:bg-white hover:text-black">
                Explore Templates
              </Button>
            </Link>
            <Link href={resumeLimitReached ? '/pricing' : '/builder?new=1'} className="w-full sm:w-auto">
              <Button className="btn-premium h-[52px] w-full rounded-[20px] border border-indigo-400/30 px-8 font-bold shadow-xl shadow-indigo-200/50">
                <Plus size={20} className="mr-2" />
                {resumeLimitReached ? 'Upgrade for More Resumes' : 'New Resume'}
              </Button>
            </Link>
          </div>
        </header>

        <div className="z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass flex cursor-default items-start justify-between rounded-[32px] border-white/80 bg-white/40 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:scale-[1.02]">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Documents</p>
              <h3 className="text-5xl font-black tracking-tighter text-gray-900">{resumes.length}</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white text-indigo-600 shadow-sm">
              <FolderOpenDot size={24} />
            </div>
          </div>

          <div className="glass flex cursor-default items-start justify-between rounded-[32px] border-white/80 bg-white/40 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:scale-[1.02]">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Templates Utilized</p>
              <h3 className="text-5xl font-black tracking-tighter text-gray-900">{templatesUsed}</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white text-cyan-600 shadow-sm">
              <LayoutGrid size={24} />
            </div>
          </div>

          <div className="glass hidden items-start justify-between rounded-[32px] border-white/80 bg-white/40 p-7 opacity-70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:flex">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Platform Status</p>
              <h3 className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-5xl font-black tracking-tighter text-transparent">Live</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white text-emerald-500 shadow-sm">
              <Activity size={24} />
            </div>
          </div>
        </div>

        <section className="z-10 mt-4 flex-grow pb-20">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex w-full gap-8 overflow-x-auto border-b border-gray-200/60 sm:w-auto">
              <button
                onClick={() => setActiveTab('active')}
                className={`whitespace-nowrap pb-3 text-xs font-black uppercase tracking-[0.2em] transition-colors ${activeTab === 'active' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-400 hover:text-gray-700'}`}
              >
                Active Resumes
              </button>
              <button
                onClick={() => setActiveTab('archived')}
                className={`whitespace-nowrap pb-3 text-xs font-black uppercase tracking-[0.2em] transition-colors ${activeTab === 'archived' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-400 hover:text-gray-700'}`}
              >
                Archived
              </button>
            </div>

            <div className="hidden shrink-0 items-center gap-3 rounded-full border border-white/80 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-md md:flex">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">System Operational</span>
            </div>
          </div>

          {displayedResumes.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayedResumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <div className="surface-strong flex flex-col items-center justify-center rounded-[40px] border border-white/80 bg-white/50 px-8 py-28 text-center shadow-sm backdrop-blur-xl">
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-indigo-200 opacity-50 blur-2xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-[32px] border border-white/20 bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)]">
                  <FileLineChart size={40} />
                </div>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-gray-900">
                {activeTab === 'active' ? 'Your workspace is empty' : 'No archived resumes found'}
              </h2>
              <p className="mt-4 max-w-lg text-lg font-medium text-gray-500">
                {activeTab === 'active'
                  ? 'Start your first resume to unlock live previews, premium templates, and a frictionless editing flow.'
                  : 'Archive resumes once you want to keep them out of the active workspace without deleting them.'}
              </p>
              {activeTab === 'active' && (
                <Link href={resumeLimitReached ? '/pricing' : '/builder?new=1'} className="mt-10">
                  <Button className="btn-premium h-14 rounded-[20px] border border-indigo-400/30 px-8 text-[15px] font-bold shadow-xl shadow-indigo-200/50">
                    <Plus size={22} className="mr-2" />
                    {resumeLimitReached ? 'Upgrade to Create Another' : 'Start Building'}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
