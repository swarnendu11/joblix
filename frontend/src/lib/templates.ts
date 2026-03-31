export interface AppTemplate {
  id: TemplateId;
  base: BaseTemplate;
  name: string;
  desc: string;
  blurb: string;
  tier: TemplateTier;
  previewTint: string;
  swatches: string[];
  badges: string[];
}

export const appTemplates: AppTemplate[] = [
  {
    id: 'professional',
    base: 'professional',
    name: 'Professional',
    desc: 'A polished sidebar layout that feels premium without sacrificing readability.',
    blurb: 'A touch of personality with a well-organized resume structure.',
    tier: 'FREE',
    previewTint: '#eef3fb',
    swatches: ['#0f4f49', '#d57b49', '#2f4158', '#4f3b72'],
    badges: ['PDF', 'DOCX'],
  },
  {
    id: 'simple-ats',
    base: 'simple-ats',
    name: 'Simple ATS',
    desc: 'A scanner-friendly resume with direct section flow and clear blue hierarchy.',
    blurb: 'Clean, modern template design that is easily read by ATS scanners.',
    tier: 'FREE',
    previewTint: '#edf3ff',
    swatches: ['#3c6fdc', '#d2a8b7', '#8b9393', '#9aa08d'],
    badges: ['Gold standard', 'PDF', 'DOCX'],
  },
  {
    id: 'corporate',
    base: 'corporate',
    name: 'Corporate',
    desc: 'A monochrome executive design with a centered masthead and balanced columns.',
    blurb: 'Professional and elegant resume template with a timeline structure.',
    tier: 'FREE',
    previewTint: '#f0f2f7',
    swatches: ['#161b26', '#737b8f', '#c1c8d8'],
    badges: ['Monochrome', 'PDF', 'DOCX'],
  },
  {
    id: 'profile-story',
    base: 'profile-story',
    name: 'Profile Story',
    desc: 'A bright profile-led format that adds warmth while keeping the content structured.',
    blurb: 'A colorful split layout that gives profile and skills more visual presence.',
    tier: 'PRO',
    previewTint: '#eef8f7',
    swatches: ['#27d8b2', '#f0b58a', '#355176', '#0f9f84'],
    badges: ['Featured', 'PDF', 'DOCX'],
  },
  {
    id: 'warm-minimal',
    base: 'warm-minimal',
    name: 'Warm Minimal',
    desc: 'A soft editorial layout with warm accents and generous spacing.',
    blurb: 'Calm, modern typography designed for a clean professional read.',
    tier: 'PRO',
    previewTint: '#fbf4ec',
    swatches: ['#f2a664', '#d6855b', '#8d6a5a', '#c8b29d'],
    badges: ['Editorial', 'PDF', 'DOCX'],
  },
  {
    id: 'analyst',
    base: 'analyst',
    name: 'Analyst',
    desc: 'A crisp business-forward template with compact metrics and side skills.',
    blurb: 'A practical corporate layout that balances detail density with clarity.',
    tier: 'PRO',
    previewTint: '#eef4fb',
    swatches: ['#2f61a8', '#7ca9dd', '#5d6576', '#d2d8e4'],
    badges: ['ATS ready', 'PDF', 'DOCX'],
  },
];

const legacyTemplateAliases = {
  'modern-pro': 'professional',
  'startup-tech': 'simple-ats',
  'product-manager': 'simple-ats',
  'ux-designer': 'profile-story',
  'marketing-lead': 'professional',
  'sales-executive': 'professional',
  'data-scientist': 'analyst',
  'fullstack-dev': 'analyst',
  'cloud-architect': 'simple-ats',
  'ai-engineer': 'analyst',
  'classic-exec': 'corporate',
  'investment-banker': 'analyst',
  'legal-counsel': 'corporate',
  'medical-pro': 'corporate',
  'academic-cv': 'warm-minimal',
  'operations-director': 'corporate',
  'consultant-firm': 'simple-ats',
  'hr-manager': 'profile-story',
  'civil-engineer': 'analyst',
  'c-suite': 'corporate',
  'minimal-focus': 'warm-minimal',
  'indie-hacker': 'warm-minimal',
  'creative-director': 'profile-story',
  'freelancer': 'warm-minimal',
  'game-dev': 'profile-story',
  'copywriter': 'warm-minimal',
  'photographer': 'profile-story',
  'event-planner': 'profile-story',
  'frontend-artist': 'warm-minimal',
  'entry-level': 'simple-ats',
} as const;

export type TemplateId = 'professional' | 'simple-ats' | 'corporate' | 'profile-story' | 'warm-minimal' | 'analyst';
export type TemplateTier = 'FREE' | 'PRO';
export type BaseTemplate = TemplateId;

export const defaultTemplate: TemplateId = 'professional';

function resolveTemplateId(id: string): TemplateId | undefined {
  const directMatch = appTemplates.find((template) => template.id === id);

  if (directMatch) {
    return directMatch.id;
  }

  return legacyTemplateAliases[id as keyof typeof legacyTemplateAliases];
}

export const normalizeTemplateId = (id: string): TemplateId => resolveTemplateId(id) ?? defaultTemplate;

export const getBaseTemplate = (id: string): BaseTemplate => {
  return normalizeTemplateId(id);
};

export const getTemplateById = (id: string) => {
  const resolvedId = resolveTemplateId(id);
  return resolvedId ? appTemplates.find((template) => template.id === resolvedId) : undefined;
};

export const isProTemplate = (id: string) => getTemplateById(id)?.tier === 'PRO';
