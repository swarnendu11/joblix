'use client';
import { useResumeStore } from '@/store/useResumeStore';

export default function ClassicTemplate() {
  const { resumeData } = useResumeStore();
  const { personalInfo, experiences, education, skills } = resumeData;

  return (
    <div className="space-y-6 font-serif max-w-full text-black px-6 py-10 leading-snug">
      <header className="text-center space-y-2 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 uppercase">{personalInfo.fullName || 'YOUR FULL NAME'}</h1>
        <div className="flex justify-center flex-wrap gap-x-4 text-xs font-medium text-gray-800">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
        <div className="text-sm font-bold text-gray-700 uppercase tracking-widest">{personalInfo.jobTitle || 'PROFESSIONAL OBJECTIVE'}</div>
      </header>

      {personalInfo.summary && (
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase border-b border-gray-950 pb-1">Professional Summary</h3>
          <p className="text-gray-800 leading-normal text-sm whitespace-pre-wrap text-justify italic">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase border-b border-gray-950 pb-1">Professional Experience</h3>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold">
                  <span className="text-sm uppercase tracking-tight">{exp.company}</span>
                  <span className="text-xs">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-bold text-gray-700 italic">{exp.role}</div>
                <p className="text-[13px] text-gray-800 mt-1 whitespace-pre-wrap leading-relaxed list-inside">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase border-b border-gray-950 pb-1">Education</h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <div className="text-sm font-bold text-gray-900">{edu.school}</div>
                  <div className="text-xs italic text-gray-700">{edu.degree}</div>
                </div>
                <span className="text-xs font-bold text-gray-800 uppercase tracking-tighter">{edu.startDate} — {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase border-b border-gray-950 pb-1">Skills & Certifications</h3>
          <p className="text-[13px] text-gray-800 leading-relaxed font-sans">
            {skills.join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
}
