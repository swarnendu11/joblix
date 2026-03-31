'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CheckCircle2, Download, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Editor from '@/components/builder/Editor';
import Preview from '@/components/builder/Preview';
import { useResumeStore, ResumeData } from '@/store/useResumeStore';
import { appTemplates, TemplateId } from '@/lib/templates';
import { API_URL, getAuthHeaders, ResumeRecord } from '@/lib/api';
import { useAccount } from '@/hooks/useAccount';

function BuilderPageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
        <p className="text-xl font-bold text-slate-800">Initializing your builder...</p>
      </div>
    </div>
  );
}

function BuilderPageContent() {
  const searchParams = useSearchParams();
  const resumeIdParam = searchParams.get('id');
  const { getToken, userId } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const { account } = useAccount();
  
  const { 
    resumeData, 
    template, 
    setTemplate, 
    resumeId, 
    hydrateResume,
    resetResume 
  } = useResumeStore();
  
  const [downloading, setDownloading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!resumeIdParam);
  const [error, setError] = useState<string | null>(null);
  
  const isFirstRender = useRef(true);

  // Load resume if ID is present
  useEffect(() => {
    const loadResume = async () => {
      if (!resumeIdParam || !userLoaded || !user) return;
      
      setLoading(true);
      try {
        const headers = await getAuthHeaders(getToken, userId);
        const { data } = await axios.get<ResumeRecord[]>(`${API_URL}/api/resumes`, { headers });
        const resume = data.find((r) => r.id.toString() === resumeIdParam);
        
        if (resume) {
          hydrateResume(resume.id.toString(), resume.template as TemplateId, resume.data as ResumeData);
        } else {
          setError('Resume not found or access denied.');
        }
      } catch (err) {
        console.error('Failed to load resume', err);
        setError('Failed to fetch resume details.');
      } finally {
        setLoading(false);
      }
    };

    if (isFirstRender.current) {
        if (resumeIdParam) {
            loadResume();
        } else {
            resetResume();
        }
        isFirstRender.current = false;
    }
  }, [resumeIdParam, userLoaded, user, getToken, hydrateResume, resetResume, userId]);

  // Auto-save logic
  useEffect(() => {
    const saveData = async () => {
      if (!user) return;
      setSaving(true);
      try {
        const headers = await getAuthHeaders(getToken, userId);
        const url = resumeId 
          ? `${API_URL}/api/resumes/${resumeId}`
          : `${API_URL}/api/resumes/latest`;
        
        const method = resumeId ? 'put' : 'put'; // Both use PUT currently
        
        await axios[method](url, {
          data: resumeData,
          template,
          title: resumeData.personalInfo?.fullName 
            ? `${resumeData.personalInfo.fullName} Resume` 
            : 'Untitled Resume'
        }, { headers });
        
      } catch (error) {
        console.error('Auto-save failed', error);
      } finally {
        setTimeout(() => setSaving(false), 800);
      }
    };

    if (loading || !user) return;

    const debounce = setTimeout(() => {
      saveData();
    }, 2000);

    return () => clearTimeout(debounce);
  }, [resumeData, template, resumeId, user, getToken, loading, userId]);

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const previewEl = document.getElementById('resume-preview-container');
      if (!previewEl) return;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
            <style>
              body { font-family: 'Inter', sans-serif; }
              @page { margin: 0; }
            </style>
          </head>
          <body class="bg-white p-10">
            ${previewEl.innerHTML}
          </body>
        </html>
      `;

      const headers = await getAuthHeaders(getToken, userId);
      const response = await axios.post(`${API_URL}/api/pdf/generate`, {
        htmlContent,
      }, { 
        responseType: 'blob',
        headers
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleTemplateChange = (nextTemplate: TemplateId) => {
    const selectedTemplate = appTemplates.find((item) => item.id === nextTemplate);

    if (selectedTemplate?.tier === 'PRO' && account?.plan !== 'PRO') {
      window.location.href = '/pricing';
      return;
    }

    setTemplate(nextTemplate);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-indigo-600" />
          <p className="text-xl font-bold text-slate-800">Initializing your builder...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="max-w-md text-center bg-white p-10 rounded-[40px] shadow-xl border border-red-50">
          <AlertCircle size={64} className="mx-auto text-red-500 mb-6" />
          <h2 className="text-3xl font-black text-slate-950 mb-4">{error}</h2>
          <Button onClick={() => window.location.href = '/dashboard'} className="rounded-full px-8 h-14 font-bold">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mesh-bg min-h-screen overflow-hidden">
      <div className="mx-auto flex max-w-[1700px] flex-col px-4 pb-4 pt-4">
        <header className="surface-panel flex flex-col gap-6 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-9">
          <div className="space-y-4">
            <div className="badge-pill">
              <Sparkles size={14} className="text-indigo-500" />
              Dynamic Engine
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Studio Workspace.</h1>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                Create, refine, and export professional resumes with real-time AI assistance.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:min-w-[420px] lg:items-end">
            <div className="flex flex-wrap items-center gap-4">
               <div className="glass flex items-center px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm bg-white/80">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mr-4">Template</span>
                <select
                  value={template}
                  onChange={(e) => handleTemplateChange(e.target.value as TemplateId)}
                  className="bg-transparent text-sm font-black text-indigo-600 outline-none cursor-pointer pr-5 appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '16px' }}
                >
                  {appTemplates.map((t) => (
                    <option key={t.id} value={t.id} disabled={t.tier === 'PRO' && account?.plan !== 'PRO'}>
                      {t.name}{t.tier === 'PRO' ? ' - Pro' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl bg-white/80 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 shadow-sm border border-gray-100">
                {saving ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={12} className="animate-spin text-indigo-600" />
                    Syncing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    Cloud Saved
                  </span>
                )}
              </div>
              <Button onClick={downloadPDF} disabled={downloading} className="rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-100">
                {downloading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Download size={16} className="mr-2" />}
                Export PDF
              </Button>
            </div>
          </div>
        </header>

        <div className="mt-4 grid flex-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-panel min-h-[calc(100vh-13rem)] overflow-y-auto p-6 lg:p-10 scrollbar-hide">
            <Editor />
          </div>

          <div className="surface-strong relative min-h-[calc(100vh-13rem)] overflow-y-auto rounded-[32px] p-6 lg:p-12">
            <div className="pointer-events-none absolute right-20 top-20 h-40 w-40 rounded-full bg-cyan-300/30 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-20 left-20 h-48 w-48 rounded-full bg-indigo-400/20 blur-[120px]" />

            <div
              id="resume-preview-container"
              className="mx-auto w-[210mm] min-h-[297mm] max-w-full rounded-[4px] bg-white p-14 shadow-[0_40px_100px_rgba(15,23,42,0.12)] selection:bg-indigo-100"
            >
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderPageFallback />}>
      <BuilderPageContent />
    </Suspense>
  );
}
