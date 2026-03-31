'use client';

import type { ResumeData } from '@/store/useResumeStore';
import { useResumeStore } from '@/store/useResumeStore';
import { formatDateRange, getInitials, toBulletPoints } from './template-utils';

interface ProfessionalTemplateProps {
  data?: ResumeData;
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const storeResumeData = useResumeStore((state) => state.resumeData);
  const resumeData = data ?? storeResumeData;
  const { personalInfo, experiences, education, skills, projects } = resumeData;

  return (
    <div className="grid min-h-[1120px] grid-cols-[240px_1fr] overflow-hidden bg-white text-slate-900">
      <aside className="bg-[#0f4f49] px-8 py-10 text-white">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/15 bg-white/10 text-2xl font-bold tracking-[0.18em]">
          {getInitials(personalInfo.fullName || 'Joblix Writer')}
        </div>
        <div className="mt-8 space-y-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Details</p>
            <div className="mt-3 space-y-2 text-[12px] leading-6 text-white/85">
              <p>{personalInfo.email || 'name@email.com'}</p>
              <p>{personalInfo.phone || '+1 (555) 111-2222'}</p>
              <p>{personalInfo.address || 'City, Country'}</p>
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Skills</p>
              <div className="mt-3 space-y-2">
                {skills.slice(0, 7).map((skill) => (
                  <div key={skill} className="border-b border-white/15 pb-2 text-[12px] font-medium text-white/88">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {personalInfo.summary && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Profile</p>
              <p className="mt-3 text-[12px] leading-6 text-white/80">{personalInfo.summary}</p>
            </div>
          )}
        </div>
      </aside>

      <main className="px-10 py-10">
        <header className="border-b border-slate-200 pb-6">
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950">
            {personalInfo.fullName || 'Sophia Walton'}
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#0f4f49]">
            {personalInfo.jobTitle || 'Operations Lead'}
          </p>
        </header>

        <div className="mt-7 space-y-7">
          {experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Employment History</h2>
              <div className="mt-4 space-y-5">
                {experiences.map((experience) => (
                  <article key={experience.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-950">{experience.role}</h3>
                        <p className="text-sm font-semibold text-[#0f4f49]">{experience.company}</p>
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {formatDateRange(experience.startDate, experience.endDate, experience.current)}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2 text-[13px] leading-6 text-slate-600">
                      {toBulletPoints(experience.description).map((point) => (
                        <li key={point} className="list-disc pl-1 marker:text-[#0f4f49]">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Education</h2>
              <div className="mt-4 space-y-4">
                {education.map((item) => (
                  <article key={item.id} className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{item.school}</h3>
                      <p className="text-sm text-slate-600">{item.degree}</p>
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {formatDateRange(item.startDate, item.endDate, false)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Projects</h2>
              <div className="mt-4 space-y-3">
                {projects.map((project) => (
                  <article key={project.id}>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base font-bold text-slate-900">{project.name}</h3>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f4f49]">
                        {project.link}
                      </p>
                    </div>
                    <p className="mt-2 text-[13px] leading-6 text-slate-600">{project.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
