'use client';

import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { useAccount } from '@/hooks/useAccount';
import { appTemplates, TemplateId } from '@/lib/templates';
import { useResumeStore } from '@/store/useResumeStore';
import TemplateShowcaseCard from '@/components/templates/TemplateShowcaseCard';

export default function TemplatesPage() {
  const router = useRouter();
  const { account } = useAccount();
  const { template, setTemplate } = useResumeStore();

  const handleTemplateSelect = (templateId: TemplateId, tier: 'FREE' | 'PRO') => {
    if (tier === 'PRO' && account?.plan !== 'PRO') {
      router.push('/pricing');
      return;
    }

    setTemplate(templateId);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden px-5 pb-10 pt-32 font-['Outfit'] md:px-8">
      <div className="blob left-[-4rem] top-24 h-72 w-72 bg-indigo-300/25" />
      <div className="blob right-[-4rem] top-1/3 h-72 w-72 bg-cyan-300/22" />

      <Navbar />

      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="badge-pill">
            <Sparkles size={14} />
            Template gallery
          </div>
          <h1 className="mt-6 text-5xl font-bold tracking-[-0.05em] text-slate-950 md:text-6xl">
            Browse resume styles that feel <span className="text-gradient">closer to a finished document.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            These layouts now behave like real templates instead of generic placeholders, with distinct structures inspired by the design direction in your reference.
          </p>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-3">
          {appTemplates.map((item) => (
            <TemplateShowcaseCard
              key={item.id}
              active={template === item.id}
              item={item}
              locked={item.tier === 'PRO' && account?.plan !== 'PRO'}
              onSelect={handleTemplateSelect}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
