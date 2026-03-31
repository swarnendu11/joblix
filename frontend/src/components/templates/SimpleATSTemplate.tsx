'use client';

import type { ResumeData } from '@/store/useResumeStore';
import { useResumeStore } from '@/store/useResumeStore';
import { formatDateRange, toBulletPoints } from './template-utils';

interface SimpleATSTemplateProps {
  data?: ResumeData;
}

export default function SimpleATSTemplate({ data }: SimpleATSTemplateProps) {
  const storeResumeData = useResumeStore((state) => state.resumeData);
  const resumeData = data ?? storeResumeData;
  const { personalInfo, experiences, education, skills, projects } = resumeData;

  return (
    <div className="min-h-[1120px] bg-white px-12 py-10 font-sans text-slate-900">
      <header className="border-b border-slate-200 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#4577d9]">
              {personalInfo.fullName || 'Taylor Greene'}
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {personalInfo.jobTitle || 'Senior Operations Specialist'}
            </p>
          </div>
          <div className="space-y-1 text-right text-[12px] leading-5 text-slate-500">
            <p>{personalInfo.email || 'name@email.com'}</p>
            <p>{personalInfo.phone || '+1 (555) 111-2222'}</p>
            <p>{personalInfo.address || 'Seattle, Washington'}</p>
          </div>
        </div>
      </header>

      <div className="mt-7 space-y-7">
        {personalInfo.summary && (
          <section>
            <h2 className="border-b border-[#c8d9ff] pb-2 text-sm font-bold uppercase tracking-[0.22em] text-[#4577d9]">
              Professional Summary
            </h2>
            <p className="mt-3 text-[13px] leading-6 text-slate-600">{personalInfo.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="border-b border-[#c8d9ff] pb-2 text-sm font-bold uppercase tracking-[0.22em] text-[#4577d9]">
              Professional Experience
            </h2>
            <div className="mt-4 space-y-5">
              {experiences.map((experience) => (
                <article key={experience.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{experience.role}</h3>
                      <p className="text-sm text-slate-600">{experience.company}</p>
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4577d9]">
                      {formatDateRange(experience.startDate, experience.endDate, experience.current)}
                    </p>
                  </div>
                  <ul className="mt-3 space-y-2 text-[13px] leading-6 text-slate-600">
                    {toBulletPoints(experience.description).map((point) => (
                      <li key={point} className="list-disc pl-1 marker:text-[#4577d9]">
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="grid gap-7 md:grid-cols-[0.9fr_1.1fr]">
          {education.length > 0 && (
            <section>
              <h2 className="border-b border-[#c8d9ff] pb-2 text-sm font-bold uppercase tracking-[0.22em] text-[#4577d9]">
                Education
              </h2>
              <div className="mt-4 space-y-3">
                {education.map((item) => (
                  <article key={item.id}>
                    <h3 className="text-sm font-bold text-slate-900">{item.school}</h3>
                    <p className="text-[13px] text-slate-600">{item.degree}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {formatDateRange(item.startDate, item.endDate, false)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-7">
            {skills.length > 0 && (
              <div>
                <h2 className="border-b border-[#c8d9ff] pb-2 text-sm font-bold uppercase tracking-[0.22em] text-[#4577d9]">
                  Areas of Expertise
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 text-[13px] text-slate-600">
                  {skills.map((skill) => (
                    <div key={skill} className="rounded-xl bg-slate-50 px-3 py-2">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="border-b border-[#c8d9ff] pb-2 text-sm font-bold uppercase tracking-[0.22em] text-[#4577d9]">
                  Selected Project
                </h2>
                {projects.map((project) => (
                  <article key={project.id} className="mt-4 rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-sm font-bold text-slate-900">{project.name}</h3>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4577d9]">
                        {project.link}
                      </p>
                    </div>
                    <p className="mt-2 text-[13px] leading-6 text-slate-600">{project.description}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
