'use client';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = uuidv4();
    addExperience({
      id: newId,
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setExpandedId(newId);
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-800">Experience</h3>
          <p className="text-sm text-gray-500">Highlight your career journey and achievements.</p>
        </div>
        <Button onClick={handleAdd} variant="secondary" className="gap-2">
          <Plus size={16} /> Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.experiences.map((exp) => (
          <div key={exp.id} className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/30">
            <div 
              className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
              <div className="flex-1">
                <div className="font-bold text-gray-800">{exp.role || "Untitled Role"}</div>
                <div className="text-xs text-gray-500 font-medium">{exp.company || "Company Name"}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }} 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-400 hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
                {expandedId === exp.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </div>
            </div>

            {expandedId === exp.id && (
              <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input 
                    value={exp.company} 
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })} 
                    placeholder="Tech Corp"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input 
                    value={exp.role} 
                    onChange={(e) => updateExperience(exp.id, { role: e.target.value })} 
                    placeholder="Full Stack Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input 
                    value={exp.startDate} 
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} 
                    placeholder="01/2022"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input 
                    value={exp.endDate} 
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} 
                    disabled={exp.current}
                    placeholder="Present"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Description</Label>
                  <textarea
                    className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    placeholder="Describe your focus and major accomplishments..."
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        {resumeData.experiences.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 text-sm italic">Click &quot;Add Experience&quot; to list your work history.</p>
          </div>
        )}
      </div>
    </div>
  );
}
