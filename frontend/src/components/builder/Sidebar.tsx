'use client';

import Image from 'next/image';
import { CheckCircle, Briefcase, FolderOpen, GraduationCap, ScrollText, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useResumeStore } from '@/store/useResumeStore';

const steps = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: ScrollText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: CheckCircle },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
];

export default function Sidebar({ className }: { className?: string }) {
  const { currentStep, setCurrentStep } = useResumeStore();

  return (
    <aside className={cn('surface-panel m-4 flex h-[calc(100vh-32px)] w-72 flex-col px-4 py-5', className)}>
      <div className="px-4 pb-7 pt-3">
        <Image src="/logo.png" alt="Joblix logo" width={48} height={48} className="h-12 w-12 rounded-2xl border border-white/70 object-contain shadow-[0_10px_26px_rgba(79,70,229,0.14)]" />
        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-950">Joblix</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">Builder workflow</p>
      </div>

      <div className="space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;

          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                'flex w-full items-center gap-4 rounded-[22px] px-4 py-4 text-left transition-all duration-200',
                isActive
                  ? 'bg-slate-950 text-white shadow-[0_18px_36px_rgba(15,23,42,0.18)]'
                  : 'text-slate-500 hover:bg-white/80 hover:text-slate-900'
              )}
            >
              <div
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-2xl',
                  isActive ? 'bg-white/12 text-white' : 'bg-white/80 text-indigo-600'
                )}
              >
                <Icon size={18} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Step {index + 1}</p>
                <p className="mt-1 text-sm font-medium">{step.label}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
