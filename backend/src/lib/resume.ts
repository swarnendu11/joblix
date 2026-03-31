import { Plan } from '@prisma/client';

export const FREE_TEMPLATE_IDS = new Set([
  'professional',
  'simple-ats',
  'corporate',
  'modern-pro',
  'startup-tech',
  'product-manager',
  'classic-exec',
  'legal-counsel',
  'medical-pro',
  'minimal-focus',
  'indie-hacker',
  'freelancer',
  'entry-level',
  'account-executive',
  'tech-lead',
  'engineering-manager',
  'recruiter-pro',
  'hr-generalist',
  'project-coordinator',
  'customer-success',
  'office-admin',
  'retail-manager',
  'hospitality-lead',
  'education-specialist',
  'public-sector',
]);

export function deriveResumeTitle(input: {
  title?: string | null;
  data?: {
    personalInfo?: {
      fullName?: string;
      jobTitle?: string;
    };
  } | null;
}) {
  const explicitTitle = input.title?.trim();
  if (explicitTitle) {
    return explicitTitle;
  }

  const fullName = input.data?.personalInfo?.fullName?.trim();
  const jobTitle = input.data?.personalInfo?.jobTitle?.trim();

  if (fullName && jobTitle) {
    return `${fullName} - ${jobTitle}`;
  }

  if (fullName) {
    return `${fullName} Resume`;
  }

  if (jobTitle) {
    return `${jobTitle} Resume`;
  }

  return 'Untitled Resume';
}

export function isTemplateAllowedForPlan(templateId: string, plan: Plan) {
  return plan === Plan.PRO || FREE_TEMPLATE_IDS.has(templateId);
}

export function canCreateResume(plan: Plan, activeResumeCount: number) {
  return plan === Plan.PRO || activeResumeCount < 1;
}
