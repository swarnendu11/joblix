'use client';
import { useResumeStore } from '@/store/useResumeStore';

export default function MinimalTemplate() {
  const { resumeData } = useResumeStore();
  const { personalInfo, experiences, education, skills } = resumeData;

  return (
    <div className="space-y-10 font-serif max-w-full text-zinc-900 px-4 py-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 border-zinc-900">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <div className="text-zinc-500 font-medium tracking-wide uppercase text-sm">{personalInfo.jobTitle || 'PROFESSIONAL TITLE'}</div>
        <div className="flex flex-wrap gap-4 text-xs font-sans font-semibold tracking-wider text-zinc-400 mt-2 uppercase">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 border-b border-zinc-100 pb-1">
            Summary
          </h3>
          <p className="text-zinc-700 leading-relaxed text-sm whitespace-pre-wrap font-sans italic">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 border-b border-zinc-100 pb-1">Work</h3>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-sans">
                  <span className="font-bold text-zinc-900 text-sm tracking-wide uppercase">{exp.role}</span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-zinc-500 font-medium text-xs tracking-wider uppercase font-sans mb-2">{exp.company}</div>
                <p className="text-sm text-zinc-600 font-sans border-l-2 border-zinc-100 pl-4">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-12">
        {education.length > 0 && (
            <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 border-b border-zinc-100 pb-1">Education</h3>
            <div className="space-y-4 pt-2">
                {education.map((edu) => (
                <div key={edu.id} className="space-y-1 font-sans">
                    <div className="text-sm font-bold text-zinc-900 tracking-tight">{edu.school}</div>
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wide">{edu.degree}</div>
                    <div className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">{edu.startDate} — {edu.endDate}</div>
                </div>
                ))}
            </div>
            </section>
        )}

        {skills.length > 0 && (
            <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 border-b border-zinc-100 pb-1">Expertise</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 font-sans">
                {skills.map((skill, idx) => (
                <span key={idx} className="text-zinc-600 text-xs font-bold uppercase tracking-tight">
                    {skill}
                </span>
                ))}
            </div>
            </section>
        )}
      </div>
    </div>
  );
}
