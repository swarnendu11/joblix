'use client';
import { useResumeStore } from '@/store/useResumeStore';

export default function ModernTemplate() {
  const { resumeData } = useResumeStore();
  const { personalInfo, experiences, education, skills, projects } = resumeData;

  return (
    <div className="space-y-8 font-sans max-w-full text-black">
      <header className="border-b-4 border-indigo-600 pb-6">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-gray-900">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <h2 className="text-xl text-indigo-600 font-semibold mt-1">{personalInfo.jobTitle || 'PROFESSIONAL TITLE'}</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600 mt-4">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="space-y-2">
          <h3 className="text-lg font-bold uppercase text-gray-800 flex items-center gap-2">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold uppercase text-gray-800 border-b border-gray-100 pb-2">Work Experience</h3>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-800 text-base">{exp.role}</span>
                  <span className="text-xs font-semibold text-gray-500 uppercase">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-indigo-600 font-bold text-sm tracking-wide">{exp.company}</div>
                <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap leading-snug">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold uppercase text-gray-800 border-b border-gray-100 pb-2">Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <div className="font-bold text-gray-800">{edu.school}</div>
                  <div className="text-sm text-indigo-600 font-medium">{edu.degree}</div>
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase">{edu.startDate} — {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-lg font-bold uppercase text-gray-800 border-b border-gray-100 pb-2">Skills</h3>
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-xs font-semibold tracking-wide">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold uppercase text-gray-800 border-b border-gray-100 pb-2">Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="space-y-1">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-bold text-gray-800 text-base">{project.name}</span>
                  {project.link && (
                    <span className="text-xs font-semibold uppercase text-indigo-600">{project.link}</span>
                  )}
                </div>
                <p className="text-sm leading-snug text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
