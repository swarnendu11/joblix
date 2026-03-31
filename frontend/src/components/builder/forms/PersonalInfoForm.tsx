'use client';
import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PersonalInfoForm() {
  const { resumeData, setPersonalInfo } = useResumeStore();
  const info = resumeData.personalInfo;

  return (
    <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
        <p className="text-sm text-gray-500">Provide your contact details to help recruiters find you.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input 
            value={info.fullName} 
            onChange={(e) => setPersonalInfo({ fullName: e.target.value })} 
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label>Job Title</Label>
          <Input 
            value={info.jobTitle} 
            onChange={(e) => setPersonalInfo({ jobTitle: e.target.value })} 
            placeholder="Senior Software Engineer"
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input 
            type="email"
            value={info.email} 
            onChange={(e) => setPersonalInfo({ email: e.target.value })} 
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input 
            value={info.phone} 
            onChange={(e) => setPersonalInfo({ phone: e.target.value })} 
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Address</Label>
          <Input 
            value={info.address} 
            onChange={(e) => setPersonalInfo({ address: e.target.value })} 
            placeholder="San Francisco, CA"
          />
        </div>
      </div>
    </div>
  );
}
