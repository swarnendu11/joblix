'use client';

import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Loader2, Lock } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { useAccount } from '@/hooks/useAccount';
import { API_URL, getAuthHeaders } from '@/lib/api';

export default function SummaryForm() {
  const { getToken, userId } = useAuth();
  const { account } = useAccount();
  const { resumeData, setPersonalInfo } = useResumeStore();
  const summary = resumeData.personalInfo.summary;
  const [loading, setLoading] = useState(false);

  const canUseAi = account?.plan === 'PRO';

  const handleGenerate = async () => {
    if (!resumeData.personalInfo.jobTitle) {
      alert('Please enter a job title first for better AI results.');
      return;
    }

    setLoading(true);
    try {
      const headers = await getAuthHeaders(getToken, userId);
      const { data } = await axios.post(
        `${API_URL}/api/ai/generate`,
        {
          role: resumeData.personalInfo.jobTitle,
          company: 'general context',
        },
        { headers },
      );
      setPersonalInfo({ summary: data.content });
    } catch (error) {
      console.error(error);
      alert('AI generation failed. Upgrade to Pro or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-800">Professional Summary</h3>
          <p className="text-sm text-gray-500">Briefly describe your career and key achievements.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleGenerate}
            disabled={loading || !resumeData.personalInfo.jobTitle || !canUseAi}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} className="text-indigo-600" />}
            AI Generate
          </Button>
          {!canUseAi && (
            <Link href="/pricing">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Lock size={16} />
              </Button>
            </Link>
          )}
        </div>
      </div>
      {!canUseAi && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          AI summary generation is available on Joblix Pro.
        </p>
      )}
      <textarea
        className="h-48 w-full rounded-xl border border-gray-200 p-4 text-sm leading-relaxed outline-none transition-all focus:ring-2 focus:ring-indigo-500"
        value={summary}
        onChange={(e) => setPersonalInfo({ summary: e.target.value })}
        placeholder="A results-oriented Software Engineer with 5+ years of experience..."
      />
    </div>
  );
}
