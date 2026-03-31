'use client';

import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { ArrowRight, CheckCircle2, Download, Layers3, ShieldCheck, Sparkles, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '3x', label: 'faster resume creation' },
  { value: '24/7', label: 'AI-assisted writing support' },
  { value: 'ATS', label: 'friendly structure and export' },
];

const features = [
  {
    icon: WandSparkles,
    title: 'Guided by AI, grounded in hiring reality',
    desc: 'Turn rough experience notes into polished summaries, sharper bullets, and clearer positioning.',
  },
  {
    icon: Layers3,
    title: 'Builder and preview in one focused workspace',
    desc: 'Write, refine, and review every section with a live document beside you instead of guessing.',
  },
  {
    icon: Download,
    title: 'Professional exports when you are ready',
    desc: 'Generate clean PDFs that look premium on screen, in inboxes, and in applicant tracking systems.',
  },
  {
    icon: ShieldCheck,
    title: 'Designed for confidence, not clutter',
    desc: 'Thoughtful templates, clear visual hierarchy, and modern surfaces that feel trustworthy.',
  },
];

const steps = [
  'Add your experience, projects, and education in a structured flow.',
  'Choose a visual direction that matches your industry and personality.',
  'Export a polished resume and keep iterating as your career grows.',
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="blob left-[-8rem] top-16 h-72 w-72 bg-cyan-300/35" />
      <div className="blob right-[-6rem] top-28 h-80 w-80 bg-fuchsia-300/30" />
      <div className="blob bottom-20 left-1/3 h-96 w-96 bg-indigo-300/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] grid-fade opacity-70" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-32 md:px-8">
        <Navbar />

        <section className="relative grid flex-1 items-center gap-16 py-18 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="space-y-8">
            <div className="badge-pill">
              <Sparkles size={14} />
              Modern resumes for ambitious professionals
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-slate-950 md:text-7xl">
                Make your next opportunity
                {' '}
                <span className="text-gradient">look inevitable.</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                Joblix helps you craft striking, recruiter-ready resumes with AI guidance, premium templates, and a workspace that feels focused from the first click.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/builder">
                <Button size="lg" className="rounded-full px-8">
                  Build your resume
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Explore templates
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="surface-panel px-5 py-5">
                  <p className="font-display text-3xl font-bold text-slate-950">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="surface-strong relative overflow-hidden p-5 md:p-7">
              <div className="absolute inset-x-8 top-0 h-24 rounded-b-[3rem] bg-gradient-to-r from-cyan-400/20 via-indigo-500/20 to-fuchsia-400/20 blur-3xl" />
              <div className="relative rounded-[28px] border border-white/70 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.26)]">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/60">Live preview</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight">Creative Analyst Resume</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
                    ATS-friendly
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[24px] bg-white/8 p-5">
                    <div className="mb-5 h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-300 to-indigo-400" />
                    <div className="space-y-3">
                      <div className="h-4 w-2/3 rounded-full bg-white/15" />
                      <div className="h-3 w-1/2 rounded-full bg-white/10" />
                      <div className="mt-6 space-y-2">
                        <div className="h-3 w-full rounded-full bg-white/10" />
                        <div className="h-3 w-5/6 rounded-full bg-white/10" />
                        <div className="h-3 w-4/6 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-[24px] bg-white p-5 text-slate-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Snapshot</p>
                        <h3 className="mt-2 text-2xl font-bold">Hiring-ready layout</h3>
                      </div>
                      <div className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">Modern</div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Experience</p>
                        <div className="mt-3 space-y-2">
                          <div className="h-3 rounded-full bg-slate-200" />
                          <div className="h-3 w-4/5 rounded-full bg-slate-200" />
                        </div>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Skills</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {['Strategy', 'Design', 'Data'].map((pill) => (
                            <span key={pill} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-4 text-white">
                      <p className="text-sm font-semibold">Your best work deserves better presentation.</p>
                      <p className="mt-1 text-sm text-white/80">Structure, polish, and export everything from one place.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8 py-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <p className="eyebrow">Why teams and candidates choose Joblix</p>
              <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Professional clarity with color, momentum, and polish.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-500">
              We paired a more editorial visual system with practical resume workflows so the experience feels premium without becoming distracting.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="card-premium">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-[0_14px_34px_rgba(79,70,229,0.22)]">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-950">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-panel p-8 md:p-10">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">A smoother path from rough draft to standout resume.</h2>
            <div className="mt-8 space-y-5">
              {steps.map((step, index) => (
                <div key={step} className="flex items-start gap-4 rounded-[24px] bg-white/70 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 font-display text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-base leading-7 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-strong p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">What you get</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">A launchpad that feels as polished as the resume itself.</h2>
              </div>
              <Link href="/pricing">
                <Button variant="outline" className="rounded-full px-6">View pricing</Button>
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Premium templates with distinctive visual personalities',
                'Live editing and preview to reduce iteration time',
                'Clerk-powered account flow for saved progress',
                'Flexible export workflow for real applications',
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5 text-sm leading-7 text-slate-600">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <CheckCircle2 size={18} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
