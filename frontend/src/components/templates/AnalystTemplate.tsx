'use client';

import type { ResumeData } from '@/store/useResumeStore';
import { useResumeStore } from '@/store/useResumeStore';
import { formatDateRange, toBulletPoints } from './template-utils';

interface AnalystTemplateProps {
  data?: ResumeData;
}

export default function AnalystTemplate({ data }: AnalystTemplateProps) {
  const storeResumeData = useResumeStore((state) => state.resumeData);
  const resumeData = data ?? storeResumeData;
  const { personalInfo, experiences, education, skills, projects } = resumeData;

  return (
    <div className="min-h-[1120px] bg-white px-12 py-10 font-sans text-slate-900">
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-[-0.05em] text-slate-950">
            {personalInfo.fullName || 'Matthew Jones'}
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#2f61a8]">
            {personalInfo.jobTitle || 'Financial Analyst'}
          </p>
        </div>
        <div className="space-y-1 text-right text-[12px] leading-5 text-slate-500">
          <p>{personalInfo.email || 'name@email.com'}</p>
          <p>{personalInfo.phone || '+1 (555) 111-2222'}</p>
          <p>{personalInfo.address || 'Kingston, NY'}</p>
        </div>
      </header>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_220px]">
        <main className="space-y-7">
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Profile</h2>
              <p className="mt-3 text-[13px] leading-6 text-slate-600">{personalInfo.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Employment History</h2>
              <div className="mt-4 space-y-5">
                {experiences.map((experience) => (
                  <article key={experience.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-950">{experience.role}</h3>
                        <p className="text-sm text-[#2f61a8]">{experience.company}</p>
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {formatDateRange(experience.startDate, experience.endDate, experience.current)}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2 text-[13px] leading-6 text-slate-600">
                      {toBulletPoints(experience.description).map((point) => (
                        <li key={point} className="list-disc pl-1 marker:text-[#2f61a8]">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Projects</h2>
              {projects.map((project) => (
                <article key={project.id} className="mt-4 rounded-[24px] border border-slate-200 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-bold text-slate-950">{project.name}</h3>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2f61a8]">
                      {project.link}
                    </p>
                  </div>
                  <p className="mt-2 text-[13px] leading-6 text-slate-600">{project.description}</p>
                </article>
              ))}
            </section>
          )}
        </main>

        <aside className="space-y-7">
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Core Skills</h2>
              <div className="mt-4 space-y-3">
                {skills.map((skill, index) => (
                  <div key={skill}>
                    <div className="flex items-center justify-between text-[12px] font-medium text-slate-600">
                      <span>{skill}</span>
                      <span>{95 - index * 6}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-[#5fa0ff]"
                        style={{ width: `${Math.max(48, 95 - index * 6)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Education</h2>
              <div className="mt-4 space-y-4">
                {education.map((item) => (
                  <article key={item.id} className="rounded-[24px] bg-slate-50 p-4">
                    <h3 className="text-sm font-bold text-slate-950">{item.school}</h3>
                    <p className="mt-1 text-[13px] text-slate-600">{item.degree}</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {formatDateRange(item.startDate, item.endDate, false)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
