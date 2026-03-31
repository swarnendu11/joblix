'use client';
import { useResumeStore } from '@/store/useResumeStore';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SummaryForm from './forms/SummaryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';

export default function Editor() {
  const { currentStep } = useResumeStore();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      {currentStep === 'personal' && <PersonalInfoForm />}
      {currentStep === 'summary' && <SummaryForm />}
      {currentStep === 'experience' && <ExperienceForm />}
      {currentStep === 'education' && <EducationForm />}
      {currentStep === 'skills' && <SkillsForm />}
      {currentStep === 'projects' && <ProjectsForm />}
    </div>
  );
}
