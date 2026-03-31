'use client';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = uuidv4();
    addEducation({
      id: newId,
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    setExpandedId(newId);
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-800">Education</h3>
          <p className="text-sm text-gray-500">Add your degrees, certifications, and academic background.</p>
        </div>
        <Button onClick={handleAdd} variant="secondary" className="gap-2">
          <Plus size={16} /> Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/30 shadow-xs">
            <div 
              className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
            >
              <div className="flex-1">
                <div className="font-bold text-gray-800">{edu.degree || "Untitled Degree"}</div>
                <div className="text-xs text-gray-500 font-medium">{edu.school || "University Name"}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }} 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-400 hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
                {expandedId === edu.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </div>
            </div>

            {expandedId === edu.id && (
              <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-2">
                  <Label>School/University</Label>
                  <Input 
                    value={edu.school} 
                    onChange={(e) => updateEducation(edu.id, { school: e.target.value })} 
                    placeholder="Harvard University"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree/Certificate</Label>
                  <Input 
                    value={edu.degree} 
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} 
                    placeholder="BSc Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input 
                    value={edu.startDate} 
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} 
                    placeholder="2018"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input 
                    value={edu.endDate} 
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} 
                    placeholder="2022"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        {resumeData.education.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 text-sm italic">Add your academic background to build your profile.</p>
          </div>
        )}
      </div>
    </div>
  );
}
