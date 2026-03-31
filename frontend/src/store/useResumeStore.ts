import { create } from 'zustand';
import { TemplateId, defaultTemplate, normalizeTemplateId } from '../lib/templates';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  jobTitle: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

interface ResumeState {
  resumeId: string | null;
  resumeData: ResumeData;
  template: TemplateId;
  currentStep: string;

  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;

  addProject: (proj: Project) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;

  setTemplate: (template: TemplateId) => void;
  setCurrentStep: (step: string) => void;
  setResumeData: (data: ResumeData) => void;
  setResumeId: (resumeId: string | null) => void;
  hydrateResume: (resumeId: string, template: TemplateId, data: ResumeData) => void;
  resetResume: () => void;
}

export const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
};

const createInitialState = () => ({
  resumeId: null,
  resumeData: initialData,
  template: defaultTemplate,
  currentStep: 'personal',
});

export const useResumeStore = create<ResumeState>((set) => ({
  ...createInitialState(),

  setPersonalInfo: (info) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo: { ...state.resumeData.personalInfo, ...info },
      },
    })),

  addExperience: (exp) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experiences: [...state.resumeData.experiences, exp],
      },
    })),

  updateExperience: (id, exp) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experiences: state.resumeData.experiences.map((experience) =>
          experience.id === id ? { ...experience, ...exp } : experience,
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experiences: state.resumeData.experiences.filter((experience) => experience.id !== id),
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [...state.resumeData.education, edu],
      },
    })),

  updateEducation: (id, edu) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((education) =>
          education.id === id ? { ...education, ...edu } : education,
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((education) => education.id !== id),
      },
    })),

  addSkill: (skill) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [...state.resumeData.skills.filter((existingSkill) => existingSkill !== skill), skill],
      },
    })),

  removeSkill: (skill) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter((existingSkill) => existingSkill !== skill),
      },
    })),

  addProject: (proj) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [...state.resumeData.projects, proj],
      },
    })),

  updateProject: (id, proj) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((project) =>
          project.id === id ? { ...project, ...proj } : project,
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((project) => project.id !== id),
      },
    })),

  setTemplate: (template) => set({ template: normalizeTemplateId(template) }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setResumeData: (data) => set({ resumeData: data }),
  setResumeId: (resumeId) => set({ resumeId }),
  hydrateResume: (resumeId, template, data) =>
    set({
      resumeId,
      template: normalizeTemplateId(template),
      resumeData: {
        ...initialData,
        ...data,
        personalInfo: {
          ...initialData.personalInfo,
          ...data.personalInfo,
        },
      },
    }),
  resetResume: () => set(createInitialState()),
}));
