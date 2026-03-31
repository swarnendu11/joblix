'use client';

import Link from 'next/link';
import { Edit2, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTemplateById } from '@/lib/templates';

interface ResumeCardProps {
  resume: {
    id: string;
    title: string;
    template: string;
    updatedAt: string;
  };
  onDelete: (id: string) => void;
}

export default function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const templateName = getTemplateById(resume.template)?.name ?? resume.template;

  return (
    <div className="surface-panel group overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_46%)]" />
        <div className="relative rounded-[24px] bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition-transform duration-500 group-hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-3 w-20 rounded-full bg-slate-900/80" />
              <div className="mt-2 h-2 w-14 rounded-full bg-slate-300" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="h-16 rounded-2xl bg-slate-100" />
            <div className="grid grid-cols-[0.42fr_0.58fr] gap-3">
              <div className="h-24 rounded-2xl bg-slate-50" />
              <div className="space-y-2 rounded-2xl bg-slate-50 p-3">
                <div className="h-3 rounded-full bg-slate-200" />
                <div className="h-3 w-5/6 rounded-full bg-slate-200" />
                <div className="h-3 w-3/5 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2 pb-2 pt-6">
        <h3 className="text-2xl font-bold tracking-tight text-slate-950">{resume.title || 'Untitled Resume'}</h3>
        <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">
          {templateName} template - {new Date(resume.updatedAt).toLocaleDateString()}
        </p>

        <div className="mt-6 flex gap-3">
          <Link href={`/builder?id=${resume.id}`} className="flex-1">
            <Button className="h-12 w-full rounded-full">
              <Edit2 size={16} />
              Continue editing
            </Button>
          </Link>
          <Button
            onClick={() => onDelete(resume.id)}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-white/80 text-slate-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
