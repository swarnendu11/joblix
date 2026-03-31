'use client';

import Link from 'next/link';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AppTemplate, TemplateId } from '@/lib/templates';
import TemplateRenderer from './TemplateRenderer';
import { sampleResumeData } from './template-utils';

interface TemplateShowcaseCardProps {
  active: boolean;
  item: AppTemplate;
  locked: boolean;
  onSelect: (templateId: TemplateId, tier: 'FREE' | 'PRO') => void;
}

export default function TemplateShowcaseCard({ active, item, locked, onSelect }: TemplateShowcaseCardProps) {
  return (
    <div className="surface-panel overflow-hidden p-4 transition-transform duration-300 hover:-translate-y-1">
      <div className="rounded-[32px] border border-[#dae3f2] p-4" style={{ backgroundColor: item.previewTint }}>
        <div className="relative h-[360px] overflow-hidden rounded-[24px] bg-white shadow-[0_22px_50px_rgba(15,23,42,0.08)]">
          <div className="absolute left-1/2 top-0 w-[760px] origin-top -translate-x-1/2 scale-[0.355]">
            <TemplateRenderer templateId={item.id} data={sampleResumeData} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {item.swatches?.map((swatch) => (
              <span
                key={swatch}
                className="h-3.5 w-3.5 rounded-full border border-black/8"
                style={{ backgroundColor: swatch }}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {item.badges?.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/60 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {item.tier}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">{item.name}</h2>
            <p className="mt-2 text-sm text-slate-500">{item.blurb}</p>
            <p className="mt-3 text-sm leading-7 text-slate-500">{item.desc}</p>
          </div>
          {active && (
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Active
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            onClick={() => onSelect(item.id, item.tier)}
            variant={active ? 'secondary' : 'default'}
            className="h-12 flex-1 rounded-full"
          >
            {locked ? <Lock size={16} /> : <Check size={16} />}
            {locked ? 'Upgrade to Use' : active ? 'Selected' : 'Use Template'}
          </Button>
          <Link href={locked ? '/pricing' : '/builder?new=1'}>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
