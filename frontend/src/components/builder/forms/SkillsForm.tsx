'use client';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function SkillsForm() {
  const { resumeData, addSkill, removeSkill } = useResumeStore();
  const [skillInput, setSkillInput] = useState('');

  const handleAdd = () => {
    if (skillInput.trim()) {
      addSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-800">Skills & Expertise</h3>
        <p className="text-sm text-gray-500">List your key technical and soft skills for ATS optimization.</p>
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1 space-y-2">
          <Label>Add a Skill</Label>
          <Input 
            value={skillInput} 
            onChange={(e) => setSkillInput(e.target.value)} 
            placeholder="TypeScript, Project Management, Agile..."
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
        </div>
        <Button onClick={handleAdd} className="h-10 px-6">
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 pt-4">
        {resumeData.skills.map((skill) => (
          <div 
            key={skill} 
            className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-sm font-semibold border border-indigo-100 group hover:bg-indigo-100 transition-colors"
          >
            {skill}
            <button 
              onClick={() => removeSkill(skill)} 
              className="ml-2 text-indigo-400 group-hover:text-indigo-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {resumeData.skills.length === 0 && (
          <div className="w-full text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 text-sm italic">Example: React, Node.js, Python, Team Leadership</p>
          </div>
        )}
      </div>
    </div>
  );
}
