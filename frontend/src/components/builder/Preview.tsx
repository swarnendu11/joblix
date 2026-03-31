'use client';

import { useResumeStore } from '@/store/useResumeStore';
import TemplateRenderer from '@/components/templates/TemplateRenderer';

export default function Preview() {
  const { template } = useResumeStore();

  return (
    <div className="h-full w-full animate-in fade-in duration-700">
      <TemplateRenderer templateId={template} />
    </div>
  );
}
