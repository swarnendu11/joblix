'use client';

import type { ResumeData } from '@/store/useResumeStore';
import { useResumeStore } from '@/store/useResumeStore';
import { formatDateRange, getInitials, toBulletPoints } from './template-utils';

interface CorporateTemplateProps {
  data?: ResumeData;
}

export default function CorporateTemplate({ data }: CorporateTemplateProps) {
  const storeResumeData = useResumeStore((state) => state.resumeData);
  const resumeData = data ?? storeResumeData;
  const { personalInfo, experiences, education, skills } = resumeData;

  return (
    <div className="min-h-[1120px] bg-white px-12 py-10 text-[#21242b]">
      <header className="border-b border-slate-200 pb-7 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-lg font-semibold tracking-[0.22em] text-slate-700">
          {getInitials(personalInfo.fullName || 'Charlotte Warren')}
        </div>
        <h1 className="mt-4 text-[34px] font-semibold tracking-[-0.04em]">
          {personalInfo.fullName || 'Charlotte Warren'}
        </h1>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
          {personalInfo.jobTitle || 'Recruitment Officer'}
        </p>
      </header>

      <div className="mt-8 grid grid-cols-[170px_1fr] gap-8">
        <aside className="space-y-6 pr-6 text-[12px] leading-6 text-slate-500">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Detail</p>
            <div className="mt-3 space-y-1">
              <p>{personalInfo.phone || '+1 (555) 111-2222'}</p>
              <p>{personalInfo.email || 'name@email.com'}</p>
              <p>{personalInfo.address || 'New York, NY'}</p>
            </div>
          </div>
          {skills.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Languages</p>
              <div className="mt-3 space-y-2">
                {skills.slice(0, 5).map((skill) => (
                  <div key={skill} className="border-b border-slate-200 pb-2 text-slate-600">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        <main className="space-y-7 border-l border-slate-200 pl-8">
          {personalInfo.summary && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.32em] text-slate-400">Profile</h2>
              <p className="mt-3 text-[13px] leading-6 text-slate-600">{personalInfo.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.32em] text-slate-400">Work History</h2>
              <div className="mt-4 space-y-6">
                {experiences.map((experience) => (
                  <article key={experience.id} className="relative pl-6">
                    <div className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-slate-900" />
                    <div className="absolute left-[4px] top-5 h-[calc(100%-0.25rem)] w-px bg-slate-200" />
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{experience.role}</h3>
                        <p className="text-sm text-slate-500">{experience.company}</p>
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {formatDateRange(experience.startDate, experience.endDate, experience.current)}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2 text-[13px] leading-6 text-slate-600">
                      {toBulletPoints(experience.description).map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.32em] text-slate-400">Education</h2>
              <div className="mt-4 space-y-3">
                {education.map((item) => (
                  <article key={item.id} className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{item.school}</h3>
                      <p className="text-[13px] text-slate-600">{item.degree}</p>
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {formatDateRange(item.startDate, item.endDate, false)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
