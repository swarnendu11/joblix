'use client';

import type { ResumeData } from '@/store/useResumeStore';
import { useResumeStore } from '@/store/useResumeStore';
import { formatDateRange, getInitials, toBulletPoints } from './template-utils';

interface ProfileStoryTemplateProps {
  data?: ResumeData;
}

export default function ProfileStoryTemplate({ data }: ProfileStoryTemplateProps) {
  const storeResumeData = useResumeStore((state) => state.resumeData);
  const resumeData = data ?? storeResumeData;
  const { personalInfo, experiences, education, skills, projects } = resumeData;

  return (
    <div className="min-h-[1120px] bg-white text-slate-900">
      <header className="mx-8 mt-8 rounded-[28px] bg-gradient-to-r from-[#29ddb8] to-[#6bf0d2] px-8 py-7 text-slate-900">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white/70 text-xl font-bold tracking-[0.18em] text-[#0f4f49]">
            {getInitials(personalInfo.fullName || 'Patricia Giordano')}
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.04em]">{personalInfo.fullName || 'Patricia Giordano'}</h1>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">
              {personalInfo.jobTitle || 'Receptionist'}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-[210px_1fr] gap-8 px-8 py-8">
        <aside className="space-y-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Contact</p>
            <div className="mt-3 space-y-2 text-[12px] leading-6 text-slate-600">
              <p>{personalInfo.email || 'name@email.com'}</p>
              <p>{personalInfo.phone || '+1 (555) 111-2222'}</p>
              <p>{personalInfo.address || 'Los Angeles, CA'}</p>
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Skills</p>
              <div className="mt-3 space-y-2">
                {skills.slice(0, 6).map((skill) => (
                  <div key={skill} className="rounded-full bg-slate-100 px-3 py-2 text-[12px] font-medium text-slate-600">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Education</p>
              <div className="mt-3 space-y-3 text-[12px] text-slate-600">
                {education.map((item) => (
                  <div key={item.id}>
                    <p className="font-semibold text-slate-800">{item.school}</p>
                    <p>{item.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

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
                  <article key={experience.id} className="rounded-[24px] border border-slate-200 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{experience.role}</h3>
                        <p className="text-sm text-[#0f8d78]">{experience.company}</p>
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {formatDateRange(experience.startDate, experience.endDate, experience.current)}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2 text-[13px] leading-6 text-slate-600">
                      {toBulletPoints(experience.description).map((point) => (
                        <li key={point} className="list-disc pl-1 marker:text-[#0f8d78]">
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
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Highlighted Project</h2>
              {projects.map((project) => (
                <article key={project.id} className="mt-4 rounded-[24px] bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-bold text-slate-900">{project.name}</h3>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f8d78]">
                      {project.link}
                    </p>
                  </div>
                  <p className="mt-2 text-[13px] leading-6 text-slate-600">{project.description}</p>
                </article>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
