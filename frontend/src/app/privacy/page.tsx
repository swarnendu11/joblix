'use client';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pt-36 px-5 md:px-12 font-['Outfit'] flex flex-col">
      <div className="blob left-[-5rem] top-10 h-80 w-80 bg-slate-300/10" />
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-grow flex flex-col gap-10 pb-20">
         <div className="text-center mb-8 z-10">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-[-0.03em]">Privacy Statement</h1>
            <p className="text-gray-500 mt-4 text-base font-medium">Last updated: March 30, 2026</p>
         </div>
         <div className="surface-strong rounded-[40px] p-8 md:p-14 border border-white/80 shadow-sm bg-white/50 backdrop-blur-xl space-y-8 text-gray-600 font-medium z-10">
            <h2 className="text-2xl font-black text-gray-900">1. Information Collection</h2>
            <p>Joblix collects minimal operational data required to render your professional documents. We utilize industry-leading standard secure procedures to gather authentication details through our providers.</p>
            
            <h2 className="text-2xl font-black text-gray-900">2. Usage of Data</h2>
            <p>Your resume data is explicitly kept siloed to your account. We do not sell, rent, or lease your professional data to third-party marketing entities or recruiters without your direct, explicit opt-in via upcoming platform sharing metrics.</p>

            <h2 className="text-2xl font-black text-gray-900">3. Deletion Rights</h2>
            <p>You maintain full ownership of your data. Triggering the account deletion protocol completely wipes all structured inputs globally from our databases within standard processing periods.</p>
         </div>
      </main>
      <Footer />
    </div>
  );
}
