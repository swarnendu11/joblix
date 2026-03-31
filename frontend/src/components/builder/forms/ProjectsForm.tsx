'use client';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ChevronDown, ChevronUp, Link as LinkIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = uuidv4();
    addProject({
      id: newId,
      name: '',
      description: '',
      link: '',
    });
    setExpandedId(newId);
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-800">Projects</h3>
          <p className="text-sm text-gray-500">Showcase your side projects, open source, or portfolio.</p>
        </div>
        <Button onClick={handleAdd} variant="secondary" className="gap-2">
          <Plus size={16} /> Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.projects.map((proj) => (
          <div key={proj.id} className="border border-gray-100 rounded-xl bg-gray-50/30">
            <div 
              className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
            >
              <div className="flex-1">
                <div className="font-bold text-gray-800 tracking-tight">{proj.name || "Untitled Project"}</div>
                <div className="text-xs text-gray-500 font-medium">{proj.link || "No project link"}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={(e) => { e.stopPropagation(); removeProject(proj.id); }} 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-400 hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
                {expandedId === proj.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </div>
            </div>

            {expandedId === proj.id && (
              <div className="px-6 pb-6 pt-2 grid grid-cols-1 gap-4 animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input 
                    value={proj.name} 
                    onChange={(e) => updateProject(proj.id, { name: e.target.value })} 
                    placeholder="Resume Builder App"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Project Link</Label>
                  <div className="relative">
                    <Input 
                        value={proj.link} 
                        onChange={(e) => updateProject(proj.id, { link: e.target.value })} 
                        placeholder="https://project-link.com"
                        className="pl-9"
                    />
                    <LinkIcon size={14} className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea
                    className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                    placeholder="Built a full-stack SaaS with Next.js and Stripe..."
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        {resumeData.projects.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 text-sm italic">Example: Open Source Libraries, Portfolio, Case Studies</p>
          </div>
        )}
      </div>
    </div>
  );
}
