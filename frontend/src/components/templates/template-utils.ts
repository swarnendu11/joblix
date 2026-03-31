import type { ResumeData } from '@/store/useResumeStore';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Charlotte Warren',
    email: 'charlotte.warren@email.com',
    phone: '+1 (555) 240-8172',
    address: 'Brooklyn, New York',
    jobTitle: 'Operations and Recruitment Lead',
    summary:
      'Recruitment and operations leader with 8+ years of experience building efficient hiring systems, coaching managers, and improving candidate experience across fast-moving teams.',
  },
  experiences: [
    {
      id: 'exp-1',
      company: 'Huxley Partners',
      role: 'Recruitment Officer',
      startDate: '2022',
      endDate: '',
      current: true,
      description:
        'Managed full-cycle recruiting for corporate and customer success roles.\nImproved offer acceptance by refreshing interview scorecards and stakeholder communication.\nPartnered with hiring managers to reduce time to hire while maintaining candidate quality.',
    },
    {
      id: 'exp-2',
      company: 'Bright Recruit',
      role: 'Talent and Operations Specialist',
      startDate: '2019',
      endDate: '2022',
      current: false,
      description:
        'Coordinated scheduling, onboarding, and pipeline reporting.\nBuilt weekly reporting templates that gave leadership clearer hiring visibility.\nSupported employee relations and internal process improvements.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Maryland',
      degree: 'B.A. in Communications',
      startDate: '2014',
      endDate: '2018',
      description: 'Focus in business communication and organizational behavior.',
    },
  ],
  skills: [
    'Stakeholder Management',
    'ATS Optimization',
    'Interview Design',
    'Process Improvement',
    'Workday',
    'Candidate Experience',
    'Reporting',
    'Onboarding',
  ],
  projects: [
    {
      id: 'project-1',
      name: 'Hiring Playbook Refresh',
      description:
        'Redesigned hiring rubrics and interview templates to create a more consistent process across departments.',
      link: 'Internal initiative',
    },
  ],
};

export function formatDateRange(startDate: string, endDate: string, current: boolean) {
  const start = startDate || 'Start';
  const end = current ? 'Present' : endDate || 'End';

  return `${start} - ${end}`;
}

export function getInitials(fullName: string) {
  const parts = fullName
    .split(' ')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return 'JW';
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function toBulletPoints(text: string) {
  if (!text.trim()) {
    return [];
  }

  if (text.includes('\n')) {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return text
    .split('. ')
    .map((line) => line.trim().replace(/\.$/, ''))
    .filter(Boolean);
}
