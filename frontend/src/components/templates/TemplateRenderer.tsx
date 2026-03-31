'use client';

import type { ResumeData } from '@/store/useResumeStore';
import { normalizeTemplateId } from '@/lib/templates';
import AnalystTemplate from './AnalystTemplate';
import CorporateTemplate from './CorporateTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import ProfileStoryTemplate from './ProfileStoryTemplate';
import SimpleATSTemplate from './SimpleATSTemplate';
import WarmMinimalTemplate from './WarmMinimalTemplate';

interface TemplateRendererProps {
  templateId: string;
  data?: ResumeData;
}

export default function TemplateRenderer({ templateId, data }: TemplateRendererProps) {
  const resolvedTemplate = normalizeTemplateId(templateId);

  switch (resolvedTemplate) {
    case 'professional':
      return <ProfessionalTemplate data={data} />;
    case 'simple-ats':
      return <SimpleATSTemplate data={data} />;
    case 'corporate':
      return <CorporateTemplate data={data} />;
    case 'profile-story':
      return <ProfileStoryTemplate data={data} />;
    case 'warm-minimal':
      return <WarmMinimalTemplate data={data} />;
    case 'analyst':
      return <AnalystTemplate data={data} />;
    default:
      return <ProfessionalTemplate data={data} />;
  }
}
