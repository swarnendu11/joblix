'use client';

import type { ResumeData } from '@/store/useResumeStore';
import { useResumeStore } from '@/store/useResumeStore';
import { formatDateRange, toBulletPoints } from './template-utils';

interface WarmMinimalTemplateProps {
  data?: ResumeData;
}

export default function WarmMinimalTemplate({ data }: WarmMinimalTemplateProps) {
  const storeResumeData = useResumeStore((state) => state.resumeData);
  const resumeData = data ?? storeResumeData;
  const { personalInfo, experiences, education, skills, projects } = resumeData;

  return (
    <div className="min-h-[1120px] bg-[#fffdf9] px-12 py-10 text-[#4f3b32]">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#f0a25d]">
          {personalInfo.jobTitle || 'Math Teacher'}
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-[#d68a52]">
            {personalInfo.fullName || 'Alice Hart'}
          </h1>
          <div className="space-y-1 text-right text-[12px] leading-5 text-[#8d6a58]">
            <p>{personalInfo.address || 'Tuscaloosa, Alabama'}</p>
            <p>{personalInfo.email || 'name@email.com'}</p>
            <p>{personalInfo.phone || '+1 (555) 111-2222'}</p>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <main className="space-y-7">
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#d68a52]">Profile</h2>
              <p className="mt-3 text-[13px] leading-6 text-[#75584a]">{personalInfo.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#d68a52]">Employment History</h2>
              <div className="mt-4 space-y-5">
                {experiences.map((experience) => (
                  <article key={experience.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-[#4f3b32]">{experience.role}</h3>
                        <p className="text-sm text-[#8d6a58]">{experience.company}</p>
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c49a82]">
                        {formatDateRange(experience.startDate, experience.endDate, experience.current)}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2 text-[13px] leading-6 text-[#75584a]">
                      {toBulletPoints(experience.description).map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#d68a52]">Project</h2>
              {projects.map((project) => (
                <article key={project.id} className="mt-4 rounded-[24px] border border-[#f1dfcf] bg-[#fff8f1] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-[#4f3b32]">{project.name}</h3>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d68a52]">
                      {project.link}
                    </p>
                  </div>
                  <p className="mt-2 text-[13px] leading-6 text-[#75584a]">{project.description}</p>
                </article>
              ))}
            </section>
          )}
        </main>

        <aside className="space-y-7">
          {education.length > 0 && (
            <section className="rounded-[28px] border border-[#f1dfcf] bg-[#fff8f1] p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#d68a52]">Education</h2>
              <div className="mt-4 space-y-4">
                {education.map((item) => (
                  <article key={item.id}>
                    <h3 className="text-sm font-semibold text-[#4f3b32]">{item.school}</h3>
                    <p className="text-[13px] text-[#75584a]">{item.degree}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c49a82]">
                      {formatDateRange(item.startDate, item.endDate, false)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section className="rounded-[28px] border border-[#f1dfcf] bg-white p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#d68a52]">Strengths</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-[#fff1e5] px-3 py-2 text-[12px] font-medium text-[#75584a]">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
